import React, { useContext, useState, useReducer } from 'react';
import { initialStateReviewIdentityForm, reviewIdentityFormReducer } from '../../reducers/ReviewForms/ReviewIdentityFormReducer';
import { initialStateReviewModelAndDeadlineForm, reviewModelAndDeadlineFormReducer } from '../../reducers/ReviewForms/ReviewModelAndDeadlineFormReducer';
import { initialStateReviewScaleAndCriteriaForm, reviewScaleAndCriteriaFormReducer } from '../../reducers/ReviewForms/ReviewScaleAndCriteriaFormReducer';
import { initialStateReviewGenerationSetupForm, reviewGenerationSetupFormReducer } from '../../reducers/ReviewForms/ReviewCreationSetupFormReducer';
import { initialStateReviewParticipantsSelectionForm, reviewParticipantsSelectionFormReducer } from '../../reducers/ReviewForms/ReviewParticipantSelectionFormReducer';

const useCreatePerformanceReview = () => {
    const [reviewIdentityState, reviewIdentityDispatch] = useReducer(reviewIdentityFormReducer, initialStateReviewIdentityForm);
    const [reviewModelAndDeadlineState, reviewModelAndDeadlineDispatch] = useReducer(reviewModelAndDeadlineFormReducer, initialStateReviewModelAndDeadlineForm);
    const [reviewScaleAndCriteriaState, reviewScaleAndCriteriaDispatch] = useReducer(reviewScaleAndCriteriaFormReducer, initialStateReviewScaleAndCriteriaForm);
    const [reviewGenerationSetupState, reviewGenerationSetupDispatch] = useReducer(reviewGenerationSetupFormReducer, initialStateReviewGenerationSetupForm);
    const [reviewParticipantsSelectionState, reviewParticipantsSelectionDispatch] = useReducer(reviewParticipantsSelectionFormReducer, initialStateReviewParticipantsSelectionForm);

    const {
        reviewName,
        reviewObjective,
        isIntercurrentReviewCycle,
        isUserDefinedDateToReview,
        startDate,
        endDate,
        reviewCycle,
        reviewPeriod,
        reviewDate,
        realizationDate,
    } = reviewIdentityState.reviewIdentityData;

    const {
        hasPerformanceReviewOfLeaders,
        deadlineToLeadersToRespondToPerformanceReview,
        hasSelfReviewOfPerformance,
        deadlineToRespondToPerformanceSelfReview,
        hasPerformanceReviewOfEvaluators,
        deadlineToEvaluatorsToRespondToPerformanceReview,
        weightOfPerformanceReviewOfLeaders,
        weightOfSelfReviewOfPerformance,
        weightOfEvaluatorsPerformanceReview,
    } = reviewModelAndDeadlineState.reviewModelData;

    const {
        reviewRulerType,
        reviewRulerOptionSelected,
        rulerOptionData,
        reviewCompetenceEvidenceData,
    } = reviewScaleAndCriteriaState.reviewScaleAndCriteriaData;

    const {
        isAllEmployeesSelectedToParticipate,
        isRandomSelectionParticipantsToReview,
        isHandPickedSelectionParticipantsToReview,
        leadersNumberToDrawn,
        selfReviewsNumberToDrawn,
        pairsNumberToDrawn,
        listAllEmployeesSelectedToReview,
        listLeaderEmployeeDataSelectedToReview,
        listEmployeeDataToSelfReview,
        listRandomPairEmployeeDataToReview
    } = reviewParticipantsSelectionState.reviewParticipantsSelectionData;

    const {
        autoSendEmailNotifications,
        evaluatorCommentsOnMandatoryCriteria,
        appraiseeCommentsOnMandatoryCriteria,
        editAnswersOnReviewsCarriedOut,
        reportFeedbackStatus,
        reportFeedbackStatusToManager,
        reportFeedbackStatusToParticipants,
        autoSendReviewResultsToManagers,
        applyLeadershipCriteriaToUser,
        applyLeadershipCriteriaToUserManagers,
        applyLeadershipCriteriaToUserParticipants,
        participantsResultsToManagersPreview,
        conceptualResults
    } = reviewGenerationSetupState.reviewGenerationSetupData;

    const handleCreationPerformanceReviewSubmit = async (selectedReview) => {
        try {
            const payload = {
                reviewName,
                reviewObjective,
                reviewModel: selectedReview,
                reviewCycle,
                hasPerformanceReviewOfLeaders,
                deadlineToLeadersToRespondToPerformanceReview,
                hasSelfReviewOfPerformance,
                deadlineToRespondToPerformanceSelfReview,
                hasPerformanceReviewOfEvaluators,
                deadlineToEvaluatorsToRespondToPerformanceReview,
                weightOfPerformanceReviewOfLeaders,
                weightOfSelfReviewOfPerformance,
                weightOfEvaluatorsPerformanceReview,
                // amount_evidences_included: 10,
                // amount_skills_included: 10,
                // amount_participants_included: 10,
                all_registered_participants: isAllEmployeesSelectedToParticipate,
                participants_selected_random: isRandomSelectionParticipantsToReview,
                hand_picked_participants: isHandPickedSelectionParticipantsToReview
            };

            if (isIntercurrentReviewCycle) {
                payload.reviewPeriod = reviewPeriod;
                payload.reviewDate = reviewDate;

                if (isUserDefinedDateToReview) {
                    payload.realizationDate = realizationDate;
                }
            }

            if (isReviewCyclePerPeriod) {
                payload.reviewPeriod = reviewPeriod;
                payload.startDate = startDate;
                payload.endDate = endDate;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_PERFORMANCE_REVIEW}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Performance review data sent successfully!');
                if (response.data) {
                    const reviewData = response.data;
                    return reviewData.id;
                }
            } else {
                console.error('Error in response:', response.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    }

    const handleSetEvidenceAndRulerToPerformanceReview = async (reviewId) => {
        if (reviewId) {
            try {
                const requests = [];
                let successfulCompetenceIds = new Set(); // Usado para contar competências únicas salvas
                let successfulEvidenceCount = 0; // Contador de evidências salvas com sucesso

                // Itera sobre cada competência dentro do array principal
                reviewCompetenceEvidenceData.forEach(({ competenceId, evidence }) => {
                    // Itera sobre cada evidência dentro do objeto evidence
                    evidence.forEach(({ id: reviewEvidenceId }) => {
                        const payload = {
                            performanceReviewId: reviewId,
                            reviewRulerId: reviewRulerOptionSelected,
                            reviewCompetenceId: competenceId,
                            reviewEvidenceId
                        };

                        // Cria uma promise para a requisição e adiciona ao array de requests
                        const request = fetch(`${process.env.NEXT_PUBLIC_REVIEW_EVIDENCE_RULER}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error(`Erro ao enviar dados: ${response.status}`);
                            }
                            return response.json();
                        }).then(() => {
                            successfulCompetenceIds.add(competenceId); // Adiciona a competência ao conjunto
                            successfulEvidenceCount++; // Incrementa o contador de evidências salvas
                        });

                        requests.push(request);
                    });
                });

                // Aguarda todas as requisições serem concluídas
                await Promise.all(requests);

                console.log('Todos os dados foram enviados com sucesso!');
                return {
                    amountEvidencesIncluded: successfulCompetenceIds.size, // Total de competências únicas salvas
                    amountSkillsIncluded: successfulEvidenceCount // Total de evidências salvas
                };
            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
                throw error;
            }
        } else {
            console.error('Erro ao enviar os dados. Não contém o identificador da avaliação.');
        }
    };

    const updatePerformanceReviewData = async (amountEvidencesIncluded, amountSkillsIncluded, amountParticipantsIncluded) => {
        if (amountEvidencesIncluded || amountSkillsIncluded || amountParticipantsIncluded) {
            try {
                const payload = {};

                if (amountEvidencesIncluded) {
                    payload.amount_evidences_included: amountEvidencesIncluded
                }

                if (amountSkillsIncluded) {
                    payload.amount_skills_included: amountSkillsIncluded
                }

                if (amountParticipantsIncluded) {
                    payload.amount_participants_included: amountParticipantsIncluded
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_EVIDENCES_PERFORMANCE}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Performance review data sent successfully!');
                    if (response.data) {
                        const reviewData = response.data;
                        return reviewData.id;
                    }
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    }

    const handleAddParticipantsToPerformanceReview = async (reviewId) => {
        if (reviewId) {
            if (isAllEmployeesSelectedToParticipate) {
                try {

                    const requests = [];
                    let successfulParticipantsCount = 0; // Contador de participantes salvos com sucesso

                    listAllEmployeesSelectedToReview.forEach(participant => {
                        const { id: review_participant_id, isLead, LeaderName, departmentId } = participant;

                        // Verifica se participa como líder
                        const participate_as_leader = isLead && LeaderName && LeaderName.trim() !== "";

                        // Verifica se participa como par
                        const hasPairInSameDepartment = listAllEmployeesSelectedToReview.some(otherParticipant =>
                            otherParticipant.departmentId === departmentId && otherParticipant.id !== review_participant_id
                        );

                        const participate_as_pair = hasPairInSameDepartment && !isLead;

                        const payload = {
                            review_participant_id,
                            performance_review_id: reviewId,
                            participate_as_leader,
                            participate_as_pair,
                            participates_as_self_evaluator: true
                        };

                        const request = fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`Erro ao enviar participante: ${response.status}`);
                                }
                                return response.json();
                            }).then(() => {
                                successfulParticipantsCount++; // Incrementa o contador ao salvar um participante
                            }).catch(error => {
                                console.error("Erro em uma requisição de participante:", error);
                            });

                        requests.push(request);
                    });

                    // Aguarda todas as requisições serem concluídas
                    const results = await Promise.all(requests);

                    console.log('Todos os participantes foram adicionados com sucesso!', results);
                    return { amountParticipantsIncluded: successfulParticipantsCount };
                } catch (error) {
                    console.error('Erro ao adicionar participantes:', error);
                    throw error;
                }
            }

            if (isRandomSelectionParticipantsToReview) {
                try {
                    const savedParticipants = new Set(); // Para evitar participantes duplicados
                    const requests = [];

                    // Função auxiliar para verificar se um participante está na lista de pares
                    const getPairedEmployees = (participantId) => {
                        return Object.values(listRandomPairEmployeeDataToReview)
                            .flatMap(obj => obj.pairs)
                            .filter(pair => pair.pairIdOnReview === participantId)
                            .map(pair => ({ employeeToWhomIsPairedId: obj.employeeId }));
                    };

                    // 1. Iterar sobre listLeaderEmployeeDataSelectedToReview
                    for (const participant of listLeaderEmployeeDataSelectedToReview) {
                        const { id, isLead, LeaderName, departmentId } = participant;
                        if (savedParticipants.has(id)) continue;
                        savedParticipants.add(id);

                        const participates_as_self_evaluator = listEmployeeDataToSelfReview.some(emp => emp.id === id);
                        const participate_as_leader = isLead && LeaderName.trim() !== "";
                        const participate_as_pair = Object.values(listRandomPairEmployeeDataToReview).some(obj => obj.pairs.some(pair => pair.pairIdOnReview === id));
                        const participateAsEmployeePeerTo = getPairedEmployees(id);

                        const payload = {
                            reviewParticipantId: id,
                            performanceReviewId: reviewId,
                            participateAsLeader: participate_as_leader,
                            participateAsPair: participate_as_pair,
                            participateAsEmployeePeerTo,
                            participates_as_self_evaluator
                        };

                        requests.push(fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        }));
                    }

                    // 2. Iterar sobre listEmployeeDataToSelfReview
                    for (const participant of listEmployeeDataToSelfReview) {
                        const { id } = participant;
                        if (savedParticipants.has(id)) continue;
                        savedParticipants.add(id);

                        const participate_as_pair = Object.values(listRandomPairEmployeeDataToReview).some(obj => obj.pairs.some(pair => pair.pairIdOnReview === id));
                        const participateAsEmployeePeerTo = getPairedEmployees(id);

                        const payload = {
                            reviewParticipantId: id,
                            performanceReviewId: reviewId,
                            participateAsLeader: false,
                            participateAsPair: participate_as_pair,
                            participateAsEmployeePeerTo,
                            participates_as_self_evaluator: true
                        };

                        requests.push(fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        }));
                    }

                    // 3. Iterar sobre listRandomPairEmployeeDataToReview
                    for (const obj of Object.values(listRandomPairEmployeeDataToReview)) {
                        for (const pair of obj.pairs) {
                            const { pairIdOnReview } = pair;
                            if (savedParticipants.has(pairIdOnReview)) continue;
                            savedParticipants.add(pairIdOnReview);

                            const participate_as_pair = true;
                            const participateAsEmployeePeerTo = getPairedEmployees(pairIdOnReview);

                            const payload = {
                                reviewParticipantId: pairIdOnReview,
                                performanceReviewId: reviewId,
                                participateAsLeader: false,
                                participateAsPair: participate_as_pair,
                                participateAsEmployeePeerTo,
                                participates_as_self_evaluator: false
                            };

                            requests.push(fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            }));
                        }
                    }

                    // Executar todas as requisições em paralelo
                    await Promise.all(requests);
                    console.log('Todos os participantes foram adicionados com sucesso!');
                } catch (error) {
                    console.error('Erro ao adicionar participantes:', error);
                }
            }

            if (isHandPickedSelectionParticipantsToReview) {

            }
        }
    }

    const handleReviewGenerationSettings = async (reviewId) => {
        if (reviewId) {
            try {
                const payload = {
                    review_evidence_ruler_id: reviewId
                };

                if (autoSendEmailNotifications) {
                    payload.auto_send_e_mail_notifications = autoSendEmailNotifications;
                }

                if (evaluatorCommentsOnMandatoryCriteria) {
                    payload.evaluator_comments_on_mandatory_criteria = evaluatorCommentsOnMandatoryCriteria;
                }

                if (appraiseeCommentsOnMandatoryCriteria) {
                    payload.appraisee_comments_on_mandatory_criteria = appraiseeCommentsOnMandatoryCriteria;
                }

                if (editAnswersOnReviewsCarriedOut) {
                    payload.edit_answers_on_reviews_carried_out = editAnswersOnReviewsCarriedOut;
                }

                if (reportFeedbackStatus) {
                    if (reportFeedbackStatusToManager) {
                        payload.report_feedback_status_to_manager = reportFeedbackStatusToManager;
                    }
                    if (reportFeedbackStatusToParticipants) {
                        payload.report_feedback_status_to_participants = reportFeedbackStatusToParticipants;
                    }
                }

                if (autoSendReviewResultsToManagers) {
                    payload.auto_send_review_results_to_managers = autoSendReviewResultsToManagers;
                }

                if (applyLeadershipCriteriaToUser) {
                    if (applyLeadershipCriteriaToUserManagers) {
                        payload.apply_leadership_criteria_to_user_managers = applyLeadershipCriteriaToUserManagers;
                    }
                    if (applyLeadershipCriteriaToUserParticipants) {
                        payload.apply_leadership_criteria_to_user_participants = applyLeadershipCriteriaToUserParticipants;
                    }
                }

                if (participantsResultsToManagersPreview) {
                    payload.participants_results_to_managers_preview = participantsResultsToManagersPreview;
                }

                if (conceptualResults) {
                    payload.conceptual_results = conceptualResults;
                }

                const response = fetch(`${process.env.NEXT_PUBLIC_REVIEW_GENERATION_SETTINGS}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Performance review data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    }

    return {
        handleCreationPerformanceReviewSubmit,
        handleSetEvidenceAndRulerToPerformanceReview,
        updatePerformanceReviewData,
        handleAddParticipantsToPerformanceReview,
        handleReviewGenerationSettings
    };
};

export default useCreatePerformanceReview;
