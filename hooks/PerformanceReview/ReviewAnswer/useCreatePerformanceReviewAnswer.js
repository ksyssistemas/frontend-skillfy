import { useContext } from "react";
import { ReviewContext } from "../../../contexts/PerformanceContext/PerformanceReviewContext";

const useCreatePerformanceReviewAnswer = () => {

    const {
        handlePerformanceIdStatusCleanupToUpdate,
        reviewStatus,
        updateReviewStatus,
        handleSaveReviewToExecuteListData
    } = useContext(ReviewContext);

    /**
   * Gera a chave única de identificação de uma avaliação
   * Exemplo: "76_76_81" (avaliador 76, avaliado 76, avaliação 81)
   */
    const buildReviewKey = (reviewerId, reviewedId, performanceReviewId) =>
        `${reviewerId}_${reviewedId}_${performanceReviewId}`;

    /**
   * Extrai o ID do participante avaliado, independentemente do tipo de avaliação
   * - Líder, Par → reviewedIdOnPerformanceReview
   * - Autoavaliação → reviewerIdOnPerformanceReview
   */
    function extractReviewedParticipantId(answer) {
        return (
            answer?.answeredAsLeaderOf?.reviewedIdOnPerformanceReview ||
            answer?.answeredAsPairOf?.reviewedIdOnPerformanceReview ||
            answer?.answeredAsSelfEvaluationOf?.reviewedIdOnPerformanceReview ||
            answer?.answeredAsSelfEvaluationOf?.reviewerIdOnPerformanceReview ||
            null
        );
    }

    async function handleValidateAddReviewAnswerForm(finalData) {
        await handleSubmit(finalData);
    }

    const handleSubmit = async (finalData) => {
        try {
            const payload = {
                performanceReviewId: finalData.performanceReview,
                evaluationRulerId: finalData.evaluationRulerId,
                reviewParticipantId: String(finalData.reviewParticipantId),
                reviewParticipantComment: finalData.reviewParticipantComment || null,
                answeredAsLeaderOf: finalData.answeredAsLeaderOf || {},
                answeredAsSelfEvaluationOf: finalData.answeredAsSelfEvaluationOf || {},
                answeredAsPairOf: finalData.answeredAsPairOf || {},
                status: "completed",
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_ANSWER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error("❌ Erro na resposta da API:", response.status);
                return;
            }

            const savedAnswer = await response.json();
            console.log("✅ Resposta salva com sucesso:", savedAnswer);

            const reviewedParticipantId = extractReviewedParticipantId(savedAnswer);

            if (!reviewedParticipantId) {
                console.warn("⚠️ Não foi possível determinar o reviewedParticipantId. Ignorando atualização de status.");
                return;
            }

            const key = buildReviewKey(
                savedAnswer.reviewParticipantId,
                reviewedParticipantId,
                savedAnswer.performanceReviewId
            );

            // ✅ Atualiza o status no contexto global
            updateReviewStatus(key, savedAnswer.status);

            // ✅ Atualiza a lista de avaliações em execução
            handleSaveReviewToExecuteListData((prevList) =>
                prevList.map((item) =>
                    item.uniqueKey === key
                        ? {
                            ...item,
                            reviewStatus: savedAnswer.status?.toLowerCase(),
                            id: savedAnswer.id,
                        }
                        : item
                )
            );

            // Reseta estados internos relacionados ao formulário
            handlePerformanceIdStatusCleanupToUpdate();
            console.log("Avaliação registrada e status atualizado com sucesso!");
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };
    return {
        handleValidateAddReviewAnswerForm
    };
};

export default useCreatePerformanceReviewAnswer;