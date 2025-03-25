import React, { useMemo, useState, useEffect, useContext, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Badge,
    ListGroup,
    ListGroupItem,
    Progress
} from "reactstrap";
import 'quill/dist/quill.snow.css';
import 'assets/css/styles/appraisalastable.css';
import { useRouter } from 'next/router';
import { useFindAllEvidences } from '../../../hooks/PerformanceReview/EvidencesReview/useFindAllEvidences';
import { useFindAllEvaluationRoler } from '../../../hooks/PerformanceReview/EvaluationRoler/useFindAllEvaluationRoler';
import { useFindAllRuleOption } from '../../../hooks/PerformanceReview/RuleOption/useFindAllRuleOption';
import { useFindEvidences } from '../../../hooks/PerformanceReview/EvidencesReview/useFindEvidences';
import { useFindSkillType } from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindSkillType";
import { useFindAllOccupationalGroups } from "../../../hooks/DefinitionOptionsReview/OccupationalGroups/useFindAllSkillClassifications";
import { useFindAllSkillClassifications } from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindAllSkillClassifications";
import { useFindEvaluationRoler } from '../../../hooks/PerformanceReview/EvaluationRoler/useFindEvaluationRoler';
import { useFindRuleOption } from '../../../hooks/PerformanceReview/RuleOption/useFindRuleOption';
import { useFindPerformanceReview } from '../../../hooks/PerformanceReview/useFindPerformanceReview';
import { ReviewContext } from '../../../contexts/PerformanceContext/PerformanceReviewContext';
import { useFindAllReviewEvidenceRuler } from '../../../hooks/PerformanceReview/ReviewEvidenceRuler/useFindAllReviewEvidenceRuler';
import { useFindRuleOptionEvaluationRuler } from '../../../hooks/PerformanceReview/RuleOption/useFindRuleOptionEvaluationRuler';
import { AuthContext } from '../../../contexts/AuthContext';
import { useFindReviewEvidenceRulerPerformanceReview } from '../../../hooks/PerformanceReview/ReviewEvidenceRuler/useFindReviewEvidenceRulerPerformanceReview';
import { useFindCaptionOptionByCaptionType } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionType";
import { useFindCaptionOptionByCaptionId } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId";
import { initialStateReviewScaleAndCriteriaForm, reviewScaleAndCriteriaFormReducer } from '../../../reducers/ReviewForms/ReviewScaleAndCriteriaFormReducer'

export function AppraisalsSkillsRegister() {

    const [reviewObjective, setReviewObjective] = useState('');
    const quillRef = useRef(null);

    const { performanceIdToEvaluation,
        evaluationRulerId,
        reviewParticipantId,
        reviewModel,
        participatesAsSelfEvaluator,
        participateAsPair,
        participateAsLeader,
        handlePerformanceIdStatusCleanupToUpdate } = useContext(ReviewContext);

    // console.log("performanceIdToEvaluation :", performanceIdToEvaluation , "evaluationRulerId :" ,evaluationRulerId ,
    //     "reviewParticipantId :", reviewParticipantId , "reviewModel :", reviewModel , "participatesAsSelfEvaluator :", participatesAsSelfEvaluator ,
    //     "participateAsPair :", participateAsPair , "participateAsLeader :", participateAsLeader 
    // );

    const handleBackToList = () => {
        handlePerformanceIdStatusCleanupToUpdate();
    };

    const { authenticationDataLoggedInUser } = useContext(AuthContext);
    // console.log("AuthContex", authenticationDataLoggedInUser);

    // const userLoggedId = authenticationDataLoggedInUser?.data?.id;
    const userLoggedId = 5;

    const [performanceAppraisalData, setPerformanceAppraisalData] = useState([]);
    // console.log(performanceAppraisalData);
    useEffect(() => {
        const fetchPerformanceAppraisal = async () => {
            if (!performanceAppraisalData.length) {
                const foundAppraisal = await useFindPerformanceReview(performanceIdToEvaluation);
                setPerformanceAppraisalData(foundAppraisal);
            }
        };

        if (performanceIdToEvaluation) {
            fetchPerformanceAppraisal();
        }
    }, [performanceIdToEvaluation]);

    const [reviewRulerofPerformance, setReviewRulerofPerformance] = useState([]);
    const [reviewRulerId, setReviewRulerId] = useState(null);
    
    useEffect(() => {
        const fetchPerformanceAppraisal = async () => {
            if (!performanceAppraisalData.length) {
                const foundAppraisal = await useFindReviewEvidenceRulerPerformanceReview(performanceIdToEvaluation);
                setReviewRulerofPerformance(foundAppraisal);
    
                if (foundAppraisal.length > 0) {
                    setReviewRulerId(foundAppraisal[0].reviewRulerId);
                }
            }
        };
    
        if (performanceIdToEvaluation) {
            fetchPerformanceAppraisal();
        }
    }, [performanceIdToEvaluation]);

    const [performanceEvidenceData, setPerformanceEvidenceData] = useState([]);
    // console.log("performanceEvidenceData :", performanceEvidenceData); 

    const [performanceSkillTypeData, setPerformanceSkillTypeData] = useState([]);
    // console.log("performanceSkillTypeData :", performanceSkillTypeData);

    const [performanceEvaluationRolerData, setPerformanceEvaluationRolerData] = useState([]);
    // console.log("Evidências da Evaluation Roler :", performanceEvaluationRolerData);

    const [performanceRuleOptionData, setPerformanceRuleOptionData] = useState([]);
    // console.log("Opções da RuleOptions :", performanceRuleOptionData);

    const [performanceReviewEvidenceRulerData, setPerformanceReviewEvidenceRulerData] = useState([]);
    useEffect(() => {
        const fetchReviewEvidenceRuler = async () => {
            const foundReviewEvidenceRuler = await useFindAllReviewEvidenceRuler();
            setPerformanceReviewEvidenceRulerData(foundReviewEvidenceRuler);
        };
        if (performanceIdToEvaluation) {
            fetchReviewEvidenceRuler();
        }
    }, [performanceIdToEvaluation]);
    // console.log("performanceReviewEvidenceRulerData :", performanceReviewEvidenceRulerData);

    const [occupationalGroupsData, setOccupationalGroupsData] = useState([]);
    useEffect(() => {
        const fetchOccupationalGroups = async () => {
            const foundOccupationalGroups = await useFindAllOccupationalGroups();
            setOccupationalGroupsData(foundOccupationalGroups);
        };
        if (performanceIdToEvaluation) {
            fetchOccupationalGroups();
        }
    }, [performanceIdToEvaluation]);
    // console.log("occupationalGroupsData :", occupationalGroupsData);

    const [skillClassificationsData, setSkillClassificationsData] = useState([]);
    useEffect(() => {
        const fetchSkillClassifications = async () => {
            const foundSkillClassifications = await useFindAllSkillClassifications();
            setSkillClassificationsData(foundSkillClassifications);
        };
        if (performanceIdToEvaluation) {
            fetchSkillClassifications();
        }
    }, [performanceIdToEvaluation]);
    // console.log("skillClassificationsData :", skillClassificationsData);

    const memoizedReviewEvidenceRulerIgualsEvaluationIdData = useMemo(() => {
        return performanceReviewEvidenceRulerData.filter(
            (evidenceRuler) =>
                Number(evidenceRuler.performanceReviewId) === Number(performanceIdToEvaluation)
        );
    }, [performanceReviewEvidenceRulerData, performanceIdToEvaluation]);

    useEffect(() => {
        if (memoizedReviewEvidenceRulerIgualsEvaluationIdData.length > 0) {
            Promise.all(
                memoizedReviewEvidenceRulerIgualsEvaluationIdData.map((evidenceRuler) =>
                    useFindRuleOptionEvaluationRuler(evidenceRuler.reviewRulerId)
                )
            )
                .then((details) => setPerformanceRuleOptionData(details))
                .catch((error) =>
                    console.error("Erro ao buscar opções :", error)
                );
        } else {
            setPerformanceRuleOptionData([]);
        }
    }, [memoizedReviewEvidenceRulerIgualsEvaluationIdData.length]);

    useEffect(() => {
        if (memoizedReviewEvidenceRulerIgualsEvaluationIdData.length > 0) {
            Promise.all(
                memoizedReviewEvidenceRulerIgualsEvaluationIdData.map((evidenceRuler) =>
                    useFindEvaluationRoler(evidenceRuler.reviewRulerId)
                )
            )
                .then((details) => setPerformanceEvaluationRolerData(details))
                .catch((error) =>
                    console.error("Erro ao buscar as evidências comportamentais :", error)
                );
        } else {
            setPerformanceEvaluationRolerData([]);
        }
    }, [memoizedReviewEvidenceRulerIgualsEvaluationIdData.length]);

    useEffect(() => {
        if (memoizedReviewEvidenceRulerIgualsEvaluationIdData.length > 0) {
            Promise.all(
                memoizedReviewEvidenceRulerIgualsEvaluationIdData.map((evidenceRuler) =>
                    useFindEvidences(evidenceRuler.reviewEvidenceId)
                )
            )
                .then((details) => setPerformanceEvidenceData(details))
                .catch((error) =>
                    console.error("Erro ao buscar evidências :", error)
                );
        } else {
            setPerformanceEvidenceData([]);
        }
    }, [memoizedReviewEvidenceRulerIgualsEvaluationIdData.length]);

    useEffect(() => {
        if (memoizedReviewEvidenceRulerIgualsEvaluationIdData.length > 0) {
            Promise.all(
                memoizedReviewEvidenceRulerIgualsEvaluationIdData.map((evidenceRuler) =>
                    useFindSkillType(evidenceRuler.reviewCompetenceId)
                )
            )
                .then((details) => setPerformanceSkillTypeData(details))
                .catch((error) =>
                    console.error("Erro ao buscar competências :", error)
                );
        } else {
            setPerformanceSkillTypeData([]);
        }
    }, [memoizedReviewEvidenceRulerIgualsEvaluationIdData.length]);

    useEffect(() => {
        let quillInstance;
        const initializeQuill = async () => {
            if (typeof window !== 'undefined' && document) {
                if (!quillRef.current) {
                    try {
                        const Quill = (await import("quill")).default;
                        const quillElement = document.querySelector('[data-toggle="quill"]');

                        if (quillElement && !quillElement.__quill) {
                            quillInstance = new Quill(quillElement, {
                                modules: {
                                    toolbar: [
                                        ['bold', 'italic'],
                                        ['link', 'blockquote', 'code', 'image'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                                    ]
                                },
                                placeholder: "Escreva aqui o objetivo da avaliação...",
                                theme: 'snow'
                            });
                            quillRef.current = quillInstance;

                            quillInstance.on('text-change', () => {
                                const text = quillInstance.root.innerText;
                                setReviewObjective(text);
                            });
                        }
                    } catch (error) {
                        console.error("Erro ao carregar o QuillJS:", error);
                    }
                }
            }
        };

        initializeQuill();
        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change');
                quillRef.current = null;
            }
        };
    }, []);

    const [selectedStatus, setSelectedStatus] = useState({});
    const handleRadioChange = (e, evidenceId, weight, evaluationRulerId) => {
        const { value } = e.target;
        setSelectedStatus((prev) => ({
            ...prev,
            [evidenceId]: {
                selectedOption: value,
                weight: weight,
                evidenceId: evidenceId,
                evaluationRulerId: evaluationRulerId,
            },
        }));
    };

    // console.log("selectedStatus :", selectedStatus);

    const [evidencias, setEvidencias] = useState([]);

    useEffect(() => {
        if (!Array.isArray(performanceEvaluationRolerData)) {
            setEvidencias([]);
            return;
        }

        const novasEvidencias = performanceEvaluationRolerData.reduce((acc, item) => {
            if (item?.ruleType) {
                acc.push(item.ruleType);
            }
            return acc;
        }, []);

        setEvidencias(novasEvidencias);
    }, []);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (!Array.isArray(performanceRuleOptionData)) {
            setOptions([]);
            return;
        }

        const newOptions = [];

        performanceRuleOptionData.forEach(innerArray => {
            if (Array.isArray(innerArray)) {
                innerArray.forEach(item => {
                    if (item?.label) {
                        newOptions.push(item.label);
                    }
                });
            }
        });

        setOptions(newOptions);
    }, [performanceRuleOptionData]);

    const [newGroupedData, setNewGroupedData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        if (
            !Array.isArray(occupationalGroupsData) ||
            !Array.isArray(skillClassificationsData) ||
            !Array.isArray(performanceSkillTypeData) ||
            !Array.isArray(performanceEvidenceData)
        ) {
            setNewGroupedData([]);
            return;
        }

        const grouped = occupationalGroupsData.map((group) => {
            const { id: groupId, competencieName: groupName } = group;

            const groupSkills = (performanceSkillTypeData || []).filter(
                (skill) => Number(skill?.occupationalGroupId) === Number(groupId)
            );

            const classificationData = skillClassificationsData.map((classification) => {
                const { id: classificationId, competenceClassificationName } = classification;

                const classificationSkills = groupSkills.filter(
                    (skill) => Number(skill.skillClassificationId) === Number(classificationId)
                );

                const skillsWithEvidences = classificationSkills.map((skill) => {
                    const evidences = performanceEvidenceData.filter(
                        (evidence) => Number(evidence.evidenceName) === Number(skill.id)
                    );
                    return { ...skill, evidences };
                });

                return {
                    classificationId,
                    classificationName: competenceClassificationName,
                    skills: skillsWithEvidences,
                };
            });


            return {
                groupId,
                groupName,
                classificationData
            };
        });
        // console.log(grouped);
        setNewGroupedData(grouped);
    }, [occupationalGroupsData, skillClassificationsData, performanceSkillTypeData]);

    useEffect(() => {
        if (
            !Array.isArray(performanceEvidenceData) ||
            !Array.isArray(performanceEvaluationRolerData) ||
            !Array.isArray(performanceRuleOptionData)
        ) {
            setCombinedData([]);
            return;
        }

        const newCombined = performanceEvidenceData.map((evidence, index) => {
            const evaluationRoler = performanceEvaluationRolerData[index];
            const ruleOptions = performanceRuleOptionData[index];

            return {
                evidence,
                evaluationRoler,
                ruleOptions,
                skillTypes: newGroupedData
            };
        });

        setCombinedData(newCombined);
    }, [
        performanceEvidenceData,
        performanceEvaluationRolerData,
        performanceRuleOptionData,
        newGroupedData
    ]);

    // console.log("newGroupedData :", newGroupedData);
    // console.log("combinedData :", combinedData);

    const handleSalvar = () => {
        const reviewObjective = document.getElementById("validationDescriptionReviewObjective")?.innerText.trim() || "";
        const finalData = {
            performanceReview: performanceIdToEvaluation,
            evaluationRulerId: evaluationRulerId,
            reviewParticipantId: reviewParticipantId || userLoggedId,
            reviewModel: reviewModel,
            answeredAsLeaderOf: participateAsLeader,
            answeredAsSelfEvaluationOf: participatesAsSelfEvaluator,
            answeredAsPairOf: participateAsPair,
            reviewObjective: reviewObjective,
            reviewAnswers: []
        };

        newGroupedData.forEach((group) => {
            const occupationalGroup = {
                occupationalGroup: group.groupName,
                skillClassification: []
            };

            group.classificationData.forEach((classification) => {
                const classificationEntry = {
                    classificationId: classification.classificationId,
                    classificationName: classification.classificationName,
                    skills: []
                };

                classification.skills.forEach((skill) => {
                    const evidences = skill.evidences
                        .map((evidence) => {
                            const status = selectedStatus[evidence.id];
                            if (status) {
                                return {
                                    evidenceId: evidence.id,
                                    selectedOption: status.selectedOption,
                                    weight: status.weight
                                };
                            }
                            return null;
                        })
                        .filter((item) => item !== null);

                    if (evidences.length > 0) {
                        classificationEntry.skills.push({
                            competenceId: skill.id,
                            description: skill.competencieTypeName || "",
                            evidences: evidences
                        });
                    }
                });

                if (classificationEntry.skills.length > 0) {
                    occupationalGroup.skillClassification.push(classificationEntry);
                }
            });

            if (occupationalGroup.skillClassification.length > 0) {
                finalData.reviewAnswers.push(occupationalGroup);
            }
        });

        console.log("Dados para salvar:", finalData);
    };

    const handleLimpar = () => {
        const objectiveField = document.querySelector("#validationDescriptionReviewObjective .ql-editor");
        if (objectiveField) {
            objectiveField.innerHTML = "<p><br></p>"; 
        }
    
        const newSelectedStatus = { ...selectedStatus };
    
        performanceEvidenceData.forEach((evidence) => {
            if (newSelectedStatus[evidence.id]) {
                newSelectedStatus[evidence.id] = {
                    selectedOption: null,
                    weight: null
                };
            }
        });
    
        setSelectedStatus(newSelectedStatus);
    };

    const [detailedRulerTypeData, setDetailedRulerTypeData] = useState([]);
    const [state, dispatch] = useReducer(reviewScaleAndCriteriaFormReducer, initialStateReviewScaleAndCriteriaForm);
    
    const fetchCaptionOption = async (rulers) => {
        let updatedRulers = [];

        if (!Array.isArray(rulers)) {
            rulers = [rulers];
        }

        updatedRulers = await Promise.all(
            rulers.map(async (ruler) => {
                try {
                    const rulerOptionData = await useFindCaptionOptionByCaptionId(ruler.id);
                    console.log("rulerOptionData", rulerOptionData);
                    return {
                        ...ruler,
                        options: rulerOptionData
                    };
                } catch (error) {
                    console.error(`Error fetching ruler options data for id ${ruler.id}:`, error);
                    return {
                        ...ruler,
                        options: 'Unknown',
                    };
                }
            })
        );
        setDetailedRulerTypeData(updatedRulers);
    };
   
    const fetchCapitons = async () => {
        if (!detailedRulerTypeData.length) {
            try {
                // Encontre o objeto no array que corresponde a selectedRulerType
                const foundRuler = state.reviewScaleAndCriteriaData.rulerTypeDataList.find(ruler => ruler.id === String(reviewRulerId));
                if (foundRuler) {
                    
                    // Pegue o valor do campo 'text' correspondente
                    const captionType = foundRuler.text;
                    // Use o valor de 'captionType' como parâmetro para o hook
                    const foundCaption = await useFindCaptionOptionByCaptionType(captionType);
                    // Chame fetchCaptionOption com o resultado do hook
                    await fetchCaptionOption(foundCaption);
                } else {
                    console.error('Ruler type not found');
                }
            } catch (error) { 
                  console.error('Error fetching types:', error);
            }
        }
    };

   useEffect(() => {
        if (reviewRulerId != null) {
            console.log("CHAMOU AQUI");
            fetchCapitons();
        }
    }, [reviewRulerId]);

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">{performanceAppraisalData.reviewName}</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-7" md="12">
                            <label htmlFor="validationDescriptionReviewObjective">
                                Objetivo
                            </label>
                            <p>{performanceAppraisalData.reviewObjective}</p>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <label htmlFor="validationPDIStatus">
                                Legenda
                            </label>
                             {detailedRulerTypeData && detailedRulerTypeData.length > 0 ? (
                                                    detailedRulerTypeData.map((rulerType) => (
                                                        <>
                                                            <CardBody className="py-1" key={rulerType.id}>
                                                                <Row>
                                                                    <Col className="my-2" md="4">
                                                                        <Row className="flex-column">
                                                                            <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                                                Régua do tipo{' '}
                                                                            </h6>
                                                                            <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.ruleType}</h5>
                                                                        </Row>
                                                                        <Row className="flex-column">
                                                                            <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                                                Alternativas{' '}
                                                                            </h6>
                                                                            <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.optionsCount}</h5>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col className="mb-2 d-flex flex-row justify-content-start align-items-center" md="8">
                                                                        {rulerType.options && rulerType.options.length > 0 ? (
                                                                            rulerType.options.map((option, index) => (
                                                                                <Card key={index} className="bg-orange m-2" style={{ width: 96, height: 96 }}>
                                                                                    <CardBody className="d-flex flex-column justify-content-start align-items-center">
                                                                                        <div>
                                                                                            <h3 className="mb-0 text-lighter text-center">{option.label}</h3>
                                                                                        </div>
                                                                                        <div className="mb-2 d-flex">
                                                                                            <h4 className="text-lighter mr-2">Nota</h4>
                                                                                            <h4 className="mb-0 text-lighter">{option.weight}</h4>
                                                                                        </div>
                                                                                    </CardBody>
                                                                                </Card>
                                                                            ))
                                                                        ) : (
                                                                            <Col md="12">
                                                                                <small>Nenhuma opção encontrada.</small>
                                                                            </Col>
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </>
                                                    ))
                                                ) : (
                                                    <ListGroupItem className="px-0">
                                                        <div className="col">
                                                            <small>Nenhum dado de régua de avaliação encontrado.</small>
                                                        </div>
                                                    </ListGroupItem>
                                                )}
                        </Col>
                    </div>
                    <div>
                        {newGroupedData.map((group) => {
                            const hasSkills = group.classificationData.some(
                                (c) => c.skills && c.skills.length > 0
                            );
                            if (!hasSkills) return null;

                            return (
                                <Card key={group.groupId} className="mb-4">
                                    <CardHeader>
                                        Grupo Ocupacional: {group.groupName || "Sem grupo"}
                                    </CardHeader>
                                    <CardBody>
                                        {group.classificationData
                                            .filter((classification) => classification.skills.length > 0)
                                            .map((classification) => (
                                                <div key={classification.classificationId} style={{ marginBottom: "2rem" }}>
                                                    <Col className="py-3 d-flex justify-content-center" md="12">
                                                        <p className="lead text-black">
                                                            Competência(s): {classification.classificationName}
                                                        </p>
                                                    </Col>

                                                    {classification.skills.map((skill) => {
                                                        const relevantItems = combinedData.filter(
                                                            (cd) =>
                                                                Number(cd.evidence?.evidenceName) === Number(skill.id)
                                                        );
                                                        if (!relevantItems.length) {
                                                            return (
                                                                <Card key={skill.id} className="mb-3">
                                                                    <CardHeader>
                                                                        {skill.competencieTypeName || "Não Encontrado"}
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <p>Nenhuma evidência encontrada para esta competência</p>
                                                                    </CardBody>
                                                                </Card>
                                                            );
                                                        }
                                                        return relevantItems.map((ri, idx) => (
                                                            <Card key={`${skill.id}-${idx}`} className="mb-3">
                                                                <CardHeader>
                                                                    {skill.competencieTypeName || "Não Encontrado"}
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <table className="table table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Evidência Comportamental</th>
                                                                                {(ri.ruleOptions || []).map((option, i) => (
                                                                                    <th key={i}>{option.label}</th>
                                                                                ))}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>{ri.evidence?.description || "Não Encontrado"}</td>
                                                                                {(ri.ruleOptions || []).map((option, j) => (
                                                                                    <td key={j} align="center">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name={`status-${ri.evidence?.id}`}
                                                                                            value={option.label}
                                                                                            checked={
                                                                                                selectedStatus[ri.evidence?.id]
                                                                                                    ?.selectedOption === option.label
                                                                                            }
                                                                                            onChange={(e) =>
                                                                                                handleRadioChange(
                                                                                                    e,
                                                                                                    ri.evidence?.id,
                                                                                                    option.weight,
                                                                                                    ri.evaluationRoler.id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </td>
                                                                                ))}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </CardBody>
                                                            </Card>
                                                        ));
                                                    })}
                                                </div>
                                            ))}
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                    <div className="form-row">
                        <Col className="mb-7" md="12">
                            <label htmlFor="validationDescriptionReviewObjective">
                                Objetivo
                            </label>
                            <div
                                data-quill-placeholder="Escreva aqui o objetivo da avaliação..."
                                data-toggle="quill"
                                id="validationDescriptionReviewObjective"
                            />
                            <div className="valid-feedback">Parece bom!</div>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4">
                            <Button className="px-5" color="primary" size="lg" onClick={handleBackToList}>
                                Voltar
                            </Button>
                            <Button
                                className="px-5"
                                color="secundary"
                                size="lg"
                                type="button"
                            onClick={handleLimpar}
                            >
                                <span className="btn-inner--text">Limpar</span>
                            </Button>
                            <Button
                                className="px-5"
                                color="primary"
                                size="lg"
                                type="button"
                                onClick={handleSalvar}
                            >
                                <span className="btn-inner--text">Salvar</span>
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </CardBody>
        </Card>
    )
}

export default AppraisalsSkillsRegister;