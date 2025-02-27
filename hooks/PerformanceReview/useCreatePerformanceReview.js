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
                allRegisteredParticipants: reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate,
                participantsSelectedRandom: reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview,
                handPickedParticipants: reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview
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
                console.log('Performance review data sent successfully!');
                const reviewData = await response.json();
                return reviewData.id;
            } else {
                console.error('Error in response:', response.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    }

    const handleSetEvidenceAndRulerToPerformanceReview = async (reviewId, reviewScaleAndCriteriaData) => {
        if (reviewId) {
            try {
                const requests = [];
                let successfulCompetenceIds = new Set(); // Usado para contar competências únicas salvas
                let successfulEvidenceCount = 0; // Contador de evidências salvas com sucesso

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

                console.log('Evidence and ruler data sent successfully!!');
                return {
                    amountEvidenceIncluded: successfulCompetenceIds.size, // Total de competências únicas salvas
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

    const handleAddParticipantsToPerformanceReview = async (reviewId, reviewParticipantsSelectionData) => {
        if (!reviewId) return;
        if (reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate) {
            try {
                const requests = [];
                let successfulParticipantsCount = 0; // Contador de participantes salvos com sucesso
                reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.forEach(participant => {
                    const { id: reviewParticipantId, isLead, LeaderName, departmentId } = participant;

                    // Verifica se participa como líder
                    // Garante que `participateAsLeader` seja booleano
                    const participateAsLeader = Boolean(isLead && LeaderName && LeaderName.trim());
                    // Verifica se participa como par
                    const hasPairInSameDepartment = reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.some(otherParticipant =>
                        otherParticipant.departmentId === departmentId && otherParticipant.id !== reviewParticipantId
                    );

                    const participateAsPair = hasPairInSameDepartment && !isLead;

                    const payload = {
                        reviewParticipantId: Number(reviewParticipantId),
                        performanceReviewId: Number(reviewId),
                        participateAsLeader,
                        participateAsPair,
                        participatesAsSelfEvaluator: true
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
                            requests.push(response.json());
                        }).then(() => {
                            successfulParticipantsCount++; // Incrementa o contador ao salvar um participante
                        }).catch(error => {
                            console.error("Erro em uma requisição de participante:", error);
                        });
                });

                // Aguarda todas as requisições serem concluídas
                const results = await Promise.all(requests);

                console.log('All participants have been successfully added!', results);
                return { amountParticipantsIncluded: successfulParticipantsCount };
            } catch (error) {
                console.error('Erro ao adicionar participantes:', error);
                throw error;
            }
        }

        if (reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview) {
            const listRandomPairs = Object.values(reviewParticipantsSelectionData.listRandomPairEmployeeDataToReview);

            // Verifica se todos os pares são inválidos (sem pares e com a mensagem de erro)
            const allPairsInvalid = listRandomPairs.every(
                obj => obj.pairs.length === 0 && obj.insufficientPairNumbers
            );

            if (allPairsInvalid) {
                console.warn("Nenhum participante válido para adicionar. Operação cancelada.");
                return { amountParticipantsIncluded: 0 };
            }

            try {
                const savedParticipants = new Set(); // Para evitar participantes duplicados
                const successCount = new Map(); // Armazena o número de inserções bem-sucedidas por ID

                // Criar conjuntos para verificar participantes de forma eficiente
                const leadersSet = new Set(reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview.map(emp => emp.id));
                const selfReviewSet = new Set(reviewParticipantsSelectionData.listEmployeeDataToSelfReview.map(emp => emp.id));
                const pairSet = new Set(listRandomPairs.map(obj => obj.employeeId));

                // Função auxiliar para obter os pares no formato esperado
                const getPairedEmployees = (participantId) => {
                    return listRandomPairs
                        .flatMap(obj =>
                            obj.pairs
                                .filter(pair => pair.pairIdOnReview === participantId)
                                .map(pair => ({ employeeToWhomIsPairedId: obj.employeeId })) // Retorna objetos no formato esperado
                        );
                };

                const addParticipant = async (participant) => {
                    const { id } = participant;
                    if (savedParticipants.has(id)) return;
                    savedParticipants.add(id);

                    // Definir valores com base nas listas
                    const participateAsLeader = leadersSet.has(id);
                    const participatesAsSelfEvaluator = selfReviewSet.has(id);
                    const participateAsPair = pairSet.has(id);
                    const participateAsEmployeePeerTo = getPairedEmployees(id);

                    const payload = {
                        reviewParticipantId: Number(id),
                        performanceReviewId: Number(reviewId),
                        participateAsLeader,
                        participateAsPair,
                        participateAsEmployeePeerTo,
                        participatesAsSelfEvaluator
                    };

                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (response.ok) {
                            successCount.set(id, (successCount.get(id) || 0) + 1);
                        }
                    } catch (error) {
                        console.error(`Erro ao adicionar participante ${id}:`, error);
                    }
                };

                // Iterar sobre cada lista e adicionar os participantes
                await Promise.all([
                    ...reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview.map(addParticipant),
                    ...reviewParticipantsSelectionData.listEmployeeDataToSelfReview.map(addParticipant),
                    ...listRandomPairs.flatMap(obj => obj.pairs.map(pair => addParticipant({ id: pair.pairIdOnReview })))
                ]);

                const amountParticipantsIncluded = successCount.size;
                console.log(`Total de participantes adicionados com sucesso: ${amountParticipantsIncluded}`);
                return { amountParticipantsIncluded };
            } catch (error) {
                console.error('Erro ao adicionar participantes:', error);
                return { amountParticipantsIncluded: 0 };
            }
        }

        if (reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview) {
            try {
                const uniqueParticipants = new Map(); // Para evitar participantes duplicados

                // Função auxiliar para verificar se um ID está presente em um array de objetos
                const isIdInArray = (id, array) => array.some(item => item.id === id);

                // Função auxiliar para verificar pares e coletar os IDs dos pares
                const getPairsForParticipant = (participantId) => {
                    let pairedIds = [];
                    for (const [peerId, peerArray] of Object.entries(reviewParticipantsSelectionData.listPairEmployeeDataToReview)) {
                        if (peerArray.some(peer => peer.id == participantId)) {
                            pairedIds.push({ employeeToWhomIsPairedId: parseInt(peerId) });
                        }
                    }
                    return pairedIds.length > 0 ? pairedIds : null;
                };

                // Itera sobre os líderes selecionados
                reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview.forEach(participant => {
                    const { id, isLead, LeaderName } = participant;

                    if (!uniqueParticipants.has(id)) {
                        uniqueParticipants.set(id, {
                            reviewParticipantId: Number(id),
                            performanceReviewId: Number(reviewId),
                            participateAsLeader: isLead && LeaderName.trim() !== "",
                            participateAsPair: getPairsForParticipant(id) !== null,
                            participateAsEmployeePeerTo: getPairsForParticipant(id) || [],
                            participatesAsSelfEvaluator: isIdInArray(id, reviewParticipantsSelectionData.listEmployeeDataToSelfReview)
                        });
                    }
                });

                // Itera sobre os participantes da autoavaliação
                reviewParticipantsSelectionData.listEmployeeDataToSelfReview.forEach(participant => {
                    const { id } = participant;

                    if (!uniqueParticipants.has(id)) {
                        uniqueParticipants.set(id, {
                            reviewParticipantId: Number(id),
                            performanceReviewId: Number(reviewId),
                            participateAsLeader: false,
                            participateAsPair: getPairsForParticipant(id) !== null,
                            participateAsEmployeePeerTo: getPairsForParticipant(id) || [],
                            participatesAsSelfEvaluator: true
                        });
                    }
                });

                // Itera sobre os pares
                Object.values(reviewParticipantsSelectionData.listPairEmployeeDataToReview).forEach(pairList => {
                    pairList.forEach(participant => {
                        const { id } = participant;

                        if (!uniqueParticipants.has(id)) {
                            uniqueParticipants.set(id, {
                                reviewParticipantId: Number(id),
                                performanceReviewId: Number(reviewId),
                                participateAsLeader: false,
                                participateAsPair: getPairsForParticipant(id) !== null,
                                participateAsEmployeePeerTo: getPairsForParticipant(id) || [],
                                participatesAsSelfEvaluator: false
                            });
                        }
                    });
                });

                // Enviar os dados para a API
                const requests = Array.from(uniqueParticipants.values()).map(payload =>
                    fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    })
                        .then(response => {
                            if (!response.ok) throw new Error(`Erro ao enviar participante: ${response.status}`);
                            return response.json();
                        })
                );

                const results = await Promise.all(requests);

                console.log('Todos os participantes foram adicionados com sucesso!', results);
                return { amountParticipantsIncluded: results.length };

            } catch (error) {
                console.error('Erro ao adicionar participantes:', error);
                throw error;
            }
        }
    }

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
                    console.log('The review configuration data has been sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_PERFORMANCE_REVIEW}/${reviewId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            console.log('response update: ', response);

            if (response.ok) {
                console.log('Performance review data changed successfully!');
                const reviewData = await response.json();
                return reviewData.id;
            } else {
                console.error('Error in response:', response.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
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
