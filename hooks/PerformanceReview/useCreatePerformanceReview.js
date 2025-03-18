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

    async function saveParticipantToReview(participant) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(participant),
            })
                .then(response => {
                    if (!response.ok) throw new Error(`Erro ao enviar um participante selecionado manualmente: ${response.status}`);
                    return response.json();
                })
        } catch (error) {
            console.error('Erro ao adicionar participantes:', error);
            throw error;
        }
    }


    const handleAddParticipantsToPerformanceReview = async (reviewId, reviewParticipantsSelectionData) => {
        if (!reviewId) return;
        if (reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate) {
            try {
                const requests = [];
                let successfulParticipantsCount = 0; // Contador de participantes salvos com sucesso

                // Filtra apenas os participantes marcados para serem incluídos
                const selectedParticipants = reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.filter(
                    participant => participant.isCheckedToEmployeeList
                );

                selectedParticipants.forEach(participant => {
                    const { id: reviewParticipantId, isLead, LeaderName, departmentId } = participant;

                    // Verifica se participa como líder
                    // Garante que `participateAsLeader` seja booleano
                    const participateAsLeader = Boolean(isLead && LeaderName && LeaderName.trim());
                    // Verifica se participa como par
                    const hasPairInSameDepartment = selectedParticipants.some(otherParticipant =>
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

                    const requestResponse = fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Erro na resposta ao enviar um participante: ${response.status}`);
                            }
                            requests.push(response.json());
                        }).then(() => {
                            successfulParticipantsCount++; // Incrementa o contador ao salvar um participante
                        }).catch(error => {
                            console.error("Erro na requisição de um participante:", error);
                        });
                });

                // Aguarda todas as requisições serem concluídas
                const results = await Promise.all(requests);

                console.log('Todos os participantes foram adicionados com sucesso!');
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
                console.warn("Nenhum participante sorteado válido para adicionar. Operação cancelada.");
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
                        console.error(`Erro ao adicionar o participante sorteado ${id}:`, error);
                    }
                };

                // Iterar sobre cada lista e adicionar os participantes
                await Promise.all([
                    ...reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview.map(addParticipant),
                    ...reviewParticipantsSelectionData.listEmployeeDataToSelfReview.map(addParticipant),
                    ...listRandomPairs.flatMap(obj => obj.pairs.map(pair => addParticipant({ id: pair.pairIdOnReview })))
                ]);

                const amountParticipantsIncluded = successCount.size;
                console.log(`Total de participantes sorteados adicionados com sucesso: ${amountParticipantsIncluded}`);
                return { amountParticipantsIncluded };
            } catch (error) {
                console.error('Erro ao adicionar participantes sorteados:', error);
                return { amountParticipantsIncluded: 0 };
            }
        }

        if (reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview) {
            const savedParticipants = new Set();
            let amountParticipantsIncluded = 0;

            const saveParticipantToReview = async (participantData) => {
                if (!savedParticipants.has(participantData.reviewParticipantId)) {
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_PARTICIPANTS}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(participantData),
                        })
                            .then(response => {
                                if (!response.ok) throw new Error(`Erro ao enviar um participante selecionado manualmente: ${response.status}`);
                                savedParticipants.add(participantData.reviewParticipantId);
                                amountParticipantsIncluded++;
                            })

                    } catch (error) {
                        console.error('Erro ao adicionar participantes:', error);
                        throw error;
                    }
                }
            }

            // Função para mapear pares corretamente
            const getPairedEmployees = (participantId) => {
                return Object.entries(reviewParticipantsSelectionData.listPairEmployeeDataToReview).reduce((acc, [key, value]) => {
                    const foundPairs = value.filter(pair => Number(pair.employeePairId) === participantId);

                    if (foundPairs.length > 0) {
                        const foundEmployee = reviewParticipantsSelectionData.listEmployeeDataToSelfReview
                            .find(emp => Number(emp.id) === Number(key));

                        if (foundEmployee) {
                            acc.push({ employeeToWhomIsPairedId: foundEmployee.employeeId });
                        }
                    }

                    return acc;
                }, []);
            };

            for (const leader of reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview) {
                const reviewParticipantId = Number(leader.employeeLeaderId);
                if (savedParticipants.has(reviewParticipantId)) continue;

                // Verificar se o líder participa como autoavaliador
                const participates_as_self_evaluator = reviewParticipantsSelectionData.listEmployeeDataToSelfReview
                    .some(emp => Number(emp.employeeId) === reviewParticipantId);

                // Buscar os dados do líder dentro da lista geral de participantes
                const employeeData = reviewParticipantsSelectionData.listEmployeeDataToReview
                    .find(emp => Number(emp.id) === reviewParticipantId);

                // Determinar se o líder participa como líder
                const participate_as_leader = employeeData?.isLead || false;

                // Determinar se o líder participa como par
                const participate_as_pair = Object.values(reviewParticipantsSelectionData.listPairEmployeeDataToReview)
                    .flat()
                    .some(pair => Number(pair.employeePairId) === reviewParticipantId);

                // Determinar os IDs dos colaboradores aos quais ele é par
                const employeeToWhomIsPairedId = getPairedEmployees(reviewParticipantId);

                // Salvar os dados do participante na avaliação de desempenho
                await saveParticipantToReview({
                    reviewParticipantId,
                    performanceReviewId: reviewId,
                    participateAsLeader: participate_as_leader,
                    participateAsPair: participate_as_pair,
                    participateAsEmployeePeerTo: employeeToWhomIsPairedId,
                    participatesAsSelfEvaluator: participates_as_self_evaluator,
                });
            }

            // Laço para salvar os participantes liderados
            for (const selfReview of reviewParticipantsSelectionData.listEmployeeDataToSelfReview) {
                const reviewParticipantId = Number(selfReview.employeeId);
                if (savedParticipants.has(reviewParticipantId)) continue;

                // Verifica se esse participante já está salvo como líder
                const isAlreadyLeader = reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview
                    .some(leader => Number(leader.employeeLeaderId) === reviewParticipantId);

                if (isAlreadyLeader) continue; // Se for líder, pula para o próximo

                // Determina se esse participante é um par (está em algum `employeePairId`)
                const participate_as_pair = Object.values(reviewParticipantsSelectionData.listPairEmployeeDataToReview)
                    .flat()
                    .some(pair => Number(pair.employeePairId) === reviewParticipantId);

                // Captura os IDs de quem esse participante está emparelhado
                const employeeToWhomIsPairedId = getPairedEmployees(reviewParticipantId);

                // Salvar os dados do participante na avaliação de desempenho
                await saveParticipantToReview({
                    reviewParticipantId,
                    performanceReviewId: reviewId,
                    participateAsLeader: false, // Não é líder
                    participateAsPair: participate_as_pair,
                    participateAsEmployeePeerTo: employeeToWhomIsPairedId,
                    participatesAsSelfEvaluator: true, // Sempre true para esse laço
                });
            }

            // Laço para salvar os participantes pares
            for (const [key, pairs] of Object.entries(reviewParticipantsSelectionData.listPairEmployeeDataToReview)) {
                for (const pair of pairs) {
                    const reviewParticipantId = Number(pair.employeePairId);
                    if (savedParticipants.has(reviewParticipantId)) continue;

                    const isAlreadyProcessed = reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview
                        .some(leader => Number(leader.employeeLeaderId) === reviewParticipantId) ||
                        reviewParticipantsSelectionData.listEmployeeDataToSelfReview
                            .some(emp => Number(emp.employeeId) === reviewParticipantId);

                    if (isAlreadyProcessed) continue;

                    const participate_as_pair = Object.values(reviewParticipantsSelectionData.listPairEmployeeDataToReview)
                        .flat()
                        .some(p => Number(p.employeePairId) === reviewParticipantId);

                    const employeeToWhomIsPairedId = getPairedEmployees(reviewParticipantId);

                    await saveParticipantToReview({
                        reviewParticipantId,
                        performanceReviewId: reviewId,
                        participateAsLeader: false,
                        participateAsPair: participate_as_pair,
                        participateAsEmployeePeerTo: employeeToWhomIsPairedId,
                        participatesAsSelfEvaluator: false,
                    });
                }
            }

            return { amountParticipantsIncluded };
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
