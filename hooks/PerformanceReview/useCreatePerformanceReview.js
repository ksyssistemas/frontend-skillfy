const useCreatePerformanceReview = () => {

    const handleCreationPerformanceReviewSubmit = async (
        selectedReview,
        reviewIdentityData,
        reviewModelData,
        reviewParticipantsSelectionData
    ) => {
        try {
            const payload = {
                reviewName: reviewIdentityData.reviewName,
                reviewObjective: reviewIdentityData.reviewObjective,
                reviewModel: selectedReview,
                reviewPeriod: reviewIdentityData.reviewPeriod,
                reviewCycle: reviewIdentityData.reviewCycle,
                hasPerformanceReviewOfLeaders: reviewModelData.hasPerformanceReviewOfLeaders,
                deadlineToLeadersToRespondToPerformanceReview: reviewModelData.deadlineToLeadersToRespondToPerformanceReview,
                hasSelfReviewOfPerformance: reviewModelData.hasSelfReviewOfPerformance,
                deadlineToRespondToPerformanceSelfReview: reviewModelData.deadlineToRespondToPerformanceSelfReview,
                hasPerformanceReviewOfEvaluators: reviewModelData.hasPerformanceReviewOfEvaluators,
                deadlineToEvaluatorsToRespondToPerformanceReview: reviewModelData.deadlineToEvaluatorsToRespondToPerformanceReview,
                weightOfPerformanceReviewOfLeaders: reviewModelData.weightOfPerformanceReviewOfLeaders,
                weightOfSelfReviewOfPerformance: reviewModelData.weightOfSelfReviewOfPerformance,
                weightOfEvaluatorsPerformanceReview: reviewModelData.weightOfEvaluatorsPerformanceReview,
                reviewRulerId: 0,
                amountEvidenceIncluded: 0,
                allRegisteredParticipants: false, // remove
                participantsSelectedRandom: false, // remove
                handPickedParticipants: false // remove
            };

            if (reviewIdentityData.isIntercurrentReviewCycle) {
                payload.reviewDate = reviewIdentityData.reviewDate;

                if (reviewIdentityData.isUserDefinedDateToReview) {
                    payload.realizationDate = reviewIdentityData.realizationDate;
                }
            }

            if (reviewIdentityData.isReviewCyclePerPeriod) {
                payload.startDate = reviewIdentityData.startDate;
                payload.endDate = reviewIdentityData.endDate;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_PERFORMANCE_REVIEW}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Os dados da avaliação de desempenho foram enviados com sucesso!');
                const reviewData = await response.json();
                return reviewData.id;
            } else {
                console.error('Erro na resposta de criação de avaliação:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição de criação de avaliação:', error);
        }
    }

    const handleSetEvidenceAndRulerToPerformanceReview = async (reviewId, reviewScaleAndCriteriaData) => {
        console.log('handleSetEvidenceAndRulerToPerformanceReview: reviewId - ', reviewId);
        if (reviewId) {
            try {
                const requests = [];
                let successfulCompetenceIds = new Set(); // Usado para contar competências únicas salvas
                let successfulEvidenceCount = 0; // Contador de evidências salvas com sucesso

                console.log('reviewScaleAndCriteriaData.reviewCompetenceEvidenceData: ', reviewScaleAndCriteriaData.reviewCompetenceEvidenceData);

                // Itera sobre cada competência dentro do array principal
                reviewScaleAndCriteriaData.reviewCompetenceEvidenceData.forEach(({ competenceId, evidence }) => {
                    // Itera sobre cada evidência dentro do objeto evidence
                    evidence.forEach(({ id: reviewEvidenceId }) => {
                        const payload = {
                            performanceReviewId: reviewId,
                            reviewRulerId: reviewScaleAndCriteriaData.reviewRulerOptionSelected,
                            reviewCompetenceId: competenceId,
                            reviewEvidenceId
                        };

                        console.log('Payload para envio de reviewCompetenceEvidenceData:', payload);

                        // Cria uma promise para a requisição e adiciona ao array de requests
                        const request = fetch(`${process.env.NEXT_PUBLIC_REVIEW_EVIDENCE_RULER}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error(`Erro na resposta do envio dos dados de competências, evidências e régua da avaliação: ${response.status}`);
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

                console.log('Dados de competências, evidências e régua da avaliação enviados com sucesso!');
                return {
                    amountEvidenceIncluded: successfulCompetenceIds.size, // Total de competências únicas salvas
                    amountSkillsIncluded: successfulEvidenceCount // Total de evidências salvas
                };
            } catch (error) {
                console.error('Erro ao enviar os dados de competências, evidências e régua da avaliação:', error);
                throw error;
            }
        } else {
            console.error('Erro ao enviar os dados . Não contém o identificador da avaliação.');
        }
    };

    const handleAddParticipantsToPerformanceReview = async (reviewId, reviewParticipantsSelectionData) => {
        if (!reviewId) return;
        try {
            const requests = [];
            const savedParticipants = new Set();
            let successfulParticipantsCount = 0;

            // 🔹 Helper para sempre retornar array
            const normalizePeers = (entry) => {
                if (!entry) return [];
                if (Array.isArray(entry)) return entry;
                if (typeof entry === "object") return Object.values(entry).flat();
                return [];
            };

            // 🔹 Participantes consolidados
            const allParticipants = new Set();

            // Cenário 1: líderes
            (reviewParticipantsSelectionData.selectedLeaders || []).forEach((leader) => {
                allParticipants.add(Number(leader.value));
            });

            // Cenário 3: liderados
            Object.values(reviewParticipantsSelectionData.selectedLedEmployees || {}).forEach((employees) => {
                employees.forEach((emp) => allParticipants.add(Number(emp)));
            });

            // Cenário 2: pares de líderes
            Object.values(reviewParticipantsSelectionData.selectedLeaderPeers || {}).forEach((arr) => {
                normalizePeers(arr).forEach((peerId) => allParticipants.add(Number(peerId)));
            });

            // Cenário 4: pares de liderados
            Object.values(reviewParticipantsSelectionData.selectedPeers || {}).forEach((arr) => {
                normalizePeers(arr).forEach((peerId) => allParticipants.add(Number(peerId)));
            });

            // 🔹 Montar payload de acordo com o cenário
            for (const participantId of allParticipants) {
                if (savedParticipants.has(participantId)) continue;

                let payload = {
                    reviewParticipantId: participantId,
                    performanceReviewId: Number(reviewId),
                    participateAsLeader: false,
                    participatesAsSelfEvaluator: false,
                    participateAsPair: false,
                    participateAsEmployeePeerTo: [],
                };

                // 🎯 Cenário 1: líderes
                if ((reviewParticipantsSelectionData.selectedLeaders || []).some((l) => Number(l.value) === participantId)) {
                    payload.participateAsLeader = true;
                }

                // 🎯 Cenário 3: liderados
                Object.entries(reviewParticipantsSelectionData.selectedLedEmployees || {}).forEach(([leaderId, emps]) => {
                    emps.forEach((empId) => {
                        if (Number(empId) === participantId) {
                            payload.participatesAsSelfEvaluator = true;
                        }
                    });
                });

                // 🎯 Cenário 2: pares de líderes
                Object.entries(reviewParticipantsSelectionData.selectedLeaderPeers || {}).forEach(([leaderId, peers]) => {
                    normalizePeers(peers).forEach((peerId) => {
                        if (Number(peerId) === participantId) {
                            payload.participateAsPair = true;
                            payload.participateAsEmployeePeerTo.push({
                                employeeToWhomIsPairedId: Number(leaderId),
                            });
                        }
                    });
                });

                // 🎯 Cenário 4: pares de liderados
                Object.entries(reviewParticipantsSelectionData.selectedPeers || {}).forEach(([participantKey, peers]) => {
                    normalizePeers(peers).forEach((peerId) => {
                        if (Number(peerId) === participantId) {
                            payload.participateAsPair = true;
                            payload.participateAsEmployeePeerTo.push({
                                employeeToWhomIsPairedId: Number(participantKey),
                            });
                        }
                    });
                });

                console.log("📦 Payload para envio:", payload);

                // Enviar para API
                const request = fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `Erro na resposta ao enviar participante ${participantId}: ${response.status}`
                            );
                        }
                        savedParticipants.add(participantId);
                        successfulParticipantsCount++;
                        return response.json();
                    })
                    .catch((error) => {
                        console.error("❌ Erro na requisição de um participante:", error);
                    });

                requests.push(request);
            }

            await Promise.all(requests);

            console.log("✅ Todos os participantes foram adicionados!");
            return { amountParticipantsIncluded: successfulParticipantsCount };
        } catch (error) {
            console.error("❌ Erro ao adicionar participantes:", error);
            throw error;
        }
    };

    const handleReviewGenerationSettings = async (reviewId, reviewGenerationSetupData) => {
        if (reviewId) {
            try {
                const payload = {
                    review_evidence_ruler_id: String(reviewId),
                    auto_send_e_mail_notifications: Boolean(reviewGenerationSetupData.autoSendEmailNotifications),
                    evaluator_comments_on_mandatory_criteria: Boolean(reviewGenerationSetupData.evaluatorCommentsOnMandatoryCriteria),
                    appraisee_comments_on_mandatory_criteria: Boolean(reviewGenerationSetupData.appraiseeCommentsOnMandatoryCriteria),
                    edit_answers_on_reviews_carried_out: Boolean(reviewGenerationSetupData.editAnswersOnReviewsCarriedOut),
                    report_feedback_status_to_manager: Boolean(reviewGenerationSetupData.reportFeedbackStatusToManager),
                    report_feedback_status_to_participants: Boolean(reviewGenerationSetupData.reportFeedbackStatusToParticipants),
                    auto_send_review_results_to_managers: Boolean(reviewGenerationSetupData.autoSendReviewResultsToManagers),
                    apply_leadership_criteria_to_user_managers: Boolean(reviewGenerationSetupData.applyLeadershipCriteriaToUserManagers),
                    apply_leadership_criteria_to_user_participants: Boolean(reviewGenerationSetupData.applyLeadershipCriteriaToUserParticipants),
                    participants_results_to_managers_preview: Boolean(reviewGenerationSetupData.participantsResultsToManagersPreview),
                    conceptual_results: Boolean(reviewGenerationSetupData.conceptualResults)
                };

                const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_GENERATION_SETTINGS}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Os dados de configuração da avaliação foram enviados com sucesso!');
                } else {
                    console.error('Erro na resposta de configurações da avaliação:', response.status);
                }
            } catch (error) {
                console.error('Erro na requisição para salvar configurações da avaliação:', error);
            }
        }
    }

    const updatePerformanceReviewData = async (
        reviewId,
        amountEvidenceIncluded,
        amountSkillsIncluded,
        amountParticipantsIncluded
    ) => {
        try {
            const payload = {};

            if (amountEvidenceIncluded) {
                payload.amountEvidenceIncluded = amountEvidenceIncluded;
            }

            if (amountSkillsIncluded) {
                payload.amountSkillsIncluded = amountSkillsIncluded;
            }

            if (amountParticipantsIncluded) {
                payload.amountParticipantsIncluded = amountParticipantsIncluded;
            }

            console.log('Payload para atualização:', payload);

            const response = await fetch(`${process.env.NEXT_PUBLIC_PERFORMANCE_REVIEW}/${reviewId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Os dados da avaliação de desempenho foram alterados com êxito!');
                const reviewData = await response.json();
                return reviewData.id;
            } else {
                console.error('Erro na resposta ao alterar avaliação de desempenho:', response.status);
            }
        } catch (error) {
            console.error('Erro na requesição para alterar dados de avaliação de desempenho:', error);
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
