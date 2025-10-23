import { useState, useEffect, useMemo, useRef, useReducer, useCallback } from "react";
import { useFindReviewEvidenceRulerPerformanceReview } from "../../../hooks/PerformanceReview/ReviewEvidenceRuler/useFindReviewEvidenceRulerPerformanceReview";
import { useFindAllReviewEvidenceRuler } from "../../../hooks/PerformanceReview/ReviewEvidenceRuler/useFindAllReviewEvidenceRuler";
import { useFindAllOccupationalGroups } from "../../DefinitionOptionsReview/OccupationalGroups/useFindAllOccupationalGroups";
import { useFindAllSkillClassifications } from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindAllSkillClassifications";
import { useFindRuleOptionEvaluationRuler } from "../../../hooks/PerformanceReview/RuleOption/useFindRuleOptionEvaluationRuler";
import { useFindEvidences } from "../../../hooks/PerformanceReview/EvidencesReview/useFindEvidences";
import { useFindEvaluationRoler } from "../../../hooks/PerformanceReview/EvaluationRoler/useFindEvaluationRoler";
import { useFindSkillType } from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindSkillType";
import { useFindCaptionOptionByCaptionId } from '../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId';
import { useFindCaptionOptionByCaptionType } from '../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionType';
import { initialStateReviewAnswer, reviewAnswerReducer } from '../../../reducers/ReviewForms/ReviewAnswerReducer';

export function usePerformanceReviewData(performanceReviewData) {
  const [state, dispatch] = useReducer(reviewAnswerReducer, initialStateReviewAnswer);
  const [loading, setLoading] = useState(false);

  // ============================================================
  // 1️⃣ Buscar dados principais (baseados em performanceReviewData.id)
  // ============================================================
  useEffect(() => {
    if (!performanceReviewData?.id) return;
    let isCancelled = false;

    (async () => {
      setLoading(true);
      try {
        const [
          foundAppraisal,
          foundReviewEvidenceRuler,
          foundOccupationalGroups,
          foundSkillClassifications,
        ] = await Promise.all([
          useFindReviewEvidenceRulerPerformanceReview(performanceReviewData.id),
          useFindAllReviewEvidenceRuler(),
          useFindAllOccupationalGroups(),
          useFindAllSkillClassifications(),
        ]);

        if (isCancelled) return;

        const newRulerId = foundAppraisal?.[0]?.reviewRulerId || null;

        dispatch({ type: "SET_PERFORMANCE_APPRAISAL_DATA", payload: performanceReviewData });
        dispatch({ type: "SET_REVIEW_RULER_OF_PERFORMANCE", payload: foundAppraisal });
        dispatch({ type: "SET_PERFORMANCE_REVIEW_EVIDENCE_RULER_DATA", payload: foundReviewEvidenceRuler });
        dispatch({ type: "SET_OCCUPATIONAL_GROUPS_DATA", payload: foundOccupationalGroups });
        dispatch({ type: "SET_SKILL_CLASSIFICATIONS_DATA", payload: foundSkillClassifications });

        // ✅ só atualiza se mudou
        if (state.reviewAnswerData.reviewRulerId !== newRulerId) {
          dispatch({ type: "SET_REVIEW_RULER_ID", payload: newRulerId });
        }
      } catch (error) {
        console.error("Erro ao carregar dados iniciais da avaliação:", error);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    })();
    return () => { isCancelled = true };
    // ✅ Importante: remova o `state` das dependências
  }, [performanceReviewData?.id]);

  // ============================================================
  // 2️⃣ Filtrar dados da performanceReview atual
  // ============================================================
  const performanceReviewCreationContentData = useMemo(() => {
    const { performanceReviewEvidenceRulerData } = state.reviewAnswerData;
    if (!performanceReviewEvidenceRulerData?.length || !performanceReviewData?.id)
      return [];
    return performanceReviewEvidenceRulerData.filter(
      (e) => Number(e.performanceReviewId) === Number(performanceReviewData.id)
    );
  }, [state, performanceReviewData?.id]);

  // ============================================================
  // 3️⃣ Buscar evidências, réguas e competências relacionadas
  // ============================================================
  useEffect(() => {
    if (!performanceReviewCreationContentData.length) return;
    let isCancelled = false;

    const fetchDetails = async () => {
      try {
        const [ruleOptions, evaluationRolers, evidences, skillTypes] = await Promise.all([
          Promise.all(performanceReviewCreationContentData.map((i) => useFindRuleOptionEvaluationRuler(i.reviewRulerId))),
          Promise.all(performanceReviewCreationContentData.map((i) => useFindEvaluationRoler(i.reviewRulerId))),
          Promise.all(performanceReviewCreationContentData.map((i) => useFindEvidences(i.reviewEvidenceId))),
          Promise.all(performanceReviewCreationContentData.map((i) => useFindSkillType(i.reviewCompetenceId))),
        ]);

        if (isCancelled) return;

        dispatch({ type: "SET_PERFORMANCE_RULE_OPTION_DATA", payload: ruleOptions });
        dispatch({ type: "SET_PERFORMANCE_EVALUATION_ROLE_DATA", payload: evaluationRolers });
        dispatch({ type: "SET_PERFORMANCE_EVIDENCE_DATA", payload: evidences });
        dispatch({ type: "SET_PERFORMANCE_SKILL_TYPE_DATA", payload: skillTypes.filter(Boolean), });
      } catch (error) {
        console.error("Erro ao buscar detalhes da régua/evidência:", error);
      }
    };

    fetchDetails();
    return () => { isCancelled = true };
    // ✅ não depende do `state`
  }, [performanceReviewCreationContentData.map((i) => i.reviewRulerId).join(",")]);

  // ============================================================
  // 4️⃣ Processar dados agrupados (sem duplicação)
  // ============================================================
  const newGroupedData = useMemo(() => {
    const {
      occupationalGroupsData,
      skillClassificationsData,
      performanceSkillTypeData,
      performanceEvidenceData,
    } = state.reviewAnswerData;

    if (
      !Array.isArray(occupationalGroupsData) ||
      !Array.isArray(skillClassificationsData) ||
      !Array.isArray(performanceSkillTypeData) ||
      !Array.isArray(performanceEvidenceData)
    ) {
      return [];
    }

    const groupsMap = new Map(
      occupationalGroupsData.map((g) => [g.id, { ...g }])
    );

    groupsMap.set("no-group", {
      id: "no-group",
      competencieName: "Sem grupo ocupacional",
    });

    const grouped = Array.from(groupsMap.values()).map((group) => {
      const groupSkills = performanceSkillTypeData.filter((skill) => {
        if (!skill) return false;
        return group.id === "no-group"
          ? !skill.occupationalGroupId
          : Number(skill.occupationalGroupId) === Number(group.id)
      });

      const classificationData = skillClassificationsData.map((classification) => {
        // Filtra skills por classificação
        const classificationSkills = groupSkills.filter(
          (skill) =>
            Number(skill.skillClassificationId) === Number(classification.id)
        );

        // Remove duplicadas (pelo id)
        const uniqueSkills = Array.from(
          new Map(classificationSkills.map((s) => [s.id, s])).values()
        );

        // Adiciona evidências relacionadas
        const skillsWithEvidences = uniqueSkills.map((s) => ({
          ...s,
          evidences: performanceEvidenceData.filter(
            (e) => Number(e.evidenceName) === Number(s.id)
          ),
        }));

        // Mantém apenas skills com evidências
        const filteredSkills = skillsWithEvidences.filter(
          (s) => s.evidences?.length > 0
        );

        return filteredSkills.length
          ? {
            classificationId: classification.id,
            classificationName: classification.competenceClassificationName,
            skills: filteredSkills,
          }
          : null;
      })
        .filter(Boolean);

      return classificationData.length
        ? {
          groupId: group.id,
          groupName: group.competencieName,
          classificationData,
        }
        : null;
    })
      .filter(Boolean);

    return grouped;
  }, [
    state.reviewAnswerData.occupationalGroupsData,
    state.reviewAnswerData.skillClassificationsData,
    state.reviewAnswerData.performanceSkillTypeData,
    state.reviewAnswerData.performanceEvidenceData,
  ]);

  // ============================================================
  // 5️⃣ Dados combinados (evidências + réguas + classificações)
  // ============================================================
  const combinedData = useMemo(() => {
    const {
      performanceEvidenceData,
      performanceEvaluationRoleData,
      performanceRuleOptionData,
    } = state.reviewAnswerData;

    if (!Array.isArray(performanceEvidenceData)) return [];

    return performanceEvidenceData.map((evidence, i) => ({
      evidence,
      evaluationRoler: performanceEvaluationRoleData[i] || null,
      ruleOptions: performanceRuleOptionData[i] || [],
      skillTypes: newGroupedData,
    }));
  }, [
    state.reviewAnswerData.performanceEvidenceData,
    state.reviewAnswerData.performanceEvaluationRoleData,
    state.reviewAnswerData.performanceRuleOptionData,
    newGroupedData,
  ]);

  // 🔹 Função auxiliar para buscar opções de uma régua
  const fetchCaptionOption = useCallback(async (rulers) => {
    const list = Array.isArray(rulers) ? rulers : [rulers];
    const updated = await Promise.all(
      list.map(async (ruler) => {
        try {
          // ✅ Busca real das opções da régua
          const options = await useFindCaptionOptionByCaptionId(ruler.id);

          return { ...ruler, options };
        } catch (error) {
          console.error(`Erro ao buscar opções da régua ${ruler.id}:`, error);
          return { ...ruler, options: [] };
        }
      })
    );

    dispatch({
      type: 'SET_DETAILED_RULER_TYPE_DATA',
      payload: updated,
    });

  }, [dispatch]);

  const fetchedRulerRef = useRef(null);

  // 🔹 Busca principal das réguas e opções
  useEffect(() => {
    const rulerId = state.reviewAnswerData.reviewRulerId;
    if (!rulerId || fetchedRulerRef.current === rulerId) return;
    fetchedRulerRef.current = rulerId;
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const ruler = await useFindEvaluationRoler(state.reviewAnswerData.reviewRulerId);
        if (cancelled) return;
        if (ruler?.ruleType) {
          await fetchCaptionOption(ruler);
        } else {
          dispatch({
            type: 'SET_DETAILED_RULER_TYPE_DATA',
            payload: [],
          });

        }
      } catch (error) {
        console.error("Erro em detailedRulerTypeData:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, [state.reviewAnswerData.reviewRulerId]);

  // ============================================================
  // 8️⃣ Retorno memoizado
  // ============================================================
  return useMemo(
    () => ({
      loading,
      ...state,
      newGroupedData,
      combinedData,
    }),
    [loading, state, newGroupedData, combinedData]
  );
}