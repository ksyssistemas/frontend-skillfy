import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Row, Table } from "reactstrap";
import dynamic from "next/dynamic";
import { handleSelectionEmploymentContractData } from "../../../../../../util/handleSelectionEmploymentContractData";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin that creates an input with badges
import TagsInput from "components/TagsInput/TagsInput.js";
import { useFindAllEmployee } from "../../../../../../hooks/RecordsHooks/employee/useFindAllEmployee";
import EmployeePairsInput from "../EmployeePairsInput";
import { initialState, formReducer } from '../../../../../../reducers/ReviewForms/ReviewParticipantSelectionFormReducer';
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import PageChange from "../../../../../PageChange/PageChange";

export function ReviewParticipantSelectionForm() {

    const [state, dispatch] = useReducer(formReducer, initialState);

    const latestReviewParticipantsSelectionData = useRef(state.reviewParticipantsSelectionData);

    const [isLoadingReviewParticipantsSelectionData, setIsLoadingReviewParticipantsSelectionData] = useState(true);

    const {
        selectedReview,
        clearStepIndex,
        handleClearStepIndex
    } = useContext(ModelSelectionReviewContext);

    // Ref para armazenar o estado anterior em formato de string
    const previousStateRef = useRef(null);

    // Verificações para habilitar/desabilitar os botões
    const isLeadersButtonEnabled =
        state.reviewParticipantsSelectionData.leadersNumberToDrawn > 0 &&
        state.reviewParticipantsSelectionData.leadersNumberToDrawn <=
        state.reviewParticipantsSelectionData.listEmployeeDataToReview
            .filter((employee) => employee.isLead === true).length;

    const isSelfReviewsButtonEnabled =
        state.reviewParticipantsSelectionData.selfReviewsNumberToDrawn > 0 &&
        state.reviewParticipantsSelectionData.selfReviewsNumberToDrawn <=
        state.reviewParticipantsSelectionData.listEmployeeDataToReview.length;

    const isPairsButtonEnabled =
        state.reviewParticipantsSelectionData.pairsNumberToDrawn > 0 &&
        state.reviewParticipantsSelectionData.pairsNumberToDrawn <=
        state.reviewParticipantsSelectionData.listEmployeeDataToReview.length;

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        const dataToSave = { ...data };
        localStorage.setItem('reviewParticipantsSelectionData', JSON.stringify(dataToSave));
    };

    // Função para selecionar todos os usuários registrados
    async function handleSelectionAllRegisteredUsers() {
        dispatch({
            type: 'SET_ALL_EMPLOYEE_SELECTED',
            payload: !state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate,
        });
        dispatch({
            type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
            payload: state.reviewParticipantsSelectionData.listEmployeeDataToReview.length,
        });
    }

    // Função para desmarcar todos os usuários registrados
    function handleUnselectionAllRegisteredUsers() {
        dispatch({
            type: 'SET_ALL_EMPLOYEE_SELECTED',
            payload: !state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate,
        });
        dispatch({
            type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
            payload: 0,
        });
    }

    // Função para seleção aleatória de usuários registrados
    async function handleRandomSelectionRegisteredUsers() {
        dispatch({
            type: 'SET_RANDOM_SELECTION_PARTICIPANTS',
            payload: !state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview,
        });
        dispatch({
            type: 'SET_SHOULD_PRESENT_PARTICIPANT_SELECTION_BUTTONS',
            payload: !state.reviewParticipantsSelectionData.isShouldPresentParticipantSelectionButtons,
        });
    }

    function handleRandomUnselectionRegisteredUsers() {
        dispatch({
            type: 'SET_RANDOM_SELECTION_PARTICIPANTS',
            payload: false,
        });
        dispatch({
            type: 'SET_SHOULD_PRESENT_PARTICIPANT_SELECTION_BUTTONS',
            payload: false,
        });
        dispatch({
            type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_LEADERS',
            payload: false,
        });
        dispatch({
            type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_SELF_REVIEW',
            payload: false,
        });
        dispatch({
            type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_PAIRS',
            payload: false,
        });
    }

    function handleRandomSelectionLeaderEmployees() {
        if (state.reviewParticipantsSelectionData.leadersNumberToDrawn > 0) {
            // Filtrar apenas os colaboradores que possuem "isLead: true"
            const eligibleLeaders = state.reviewParticipantsSelectionData.listEmployeeDataToReview.filter(
                (employee) => employee.isLead === true
            );

            // Garantir que não sorteamos mais do que o total disponível
            const drawCount = Math.min(state.reviewParticipantsSelectionData.leadersNumberToDrawn, eligibleLeaders.length);

            // Embaralhar a lista de elegíveis
            const shuffledLeaders = [...eligibleLeaders].sort(() => 0.5 - Math.random());

            // Selecionar os primeiros "drawCount" elementos da lista embaralhada
            const selectedLeaders = shuffledLeaders.slice(0, drawCount);

            dispatch({
                type: 'SET_LEADER_TAGS_INPUT',
                payload: selectedLeaders.map((leader) => leader.name),
            });

            dispatch({
                type: 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW',
                payload: selectedLeaders,
            });

            dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload:
                    state.reviewParticipantsSelectionData.employeesSelectedAmount +
                    selectedLeaders.length,
            });

            dispatch({
                type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_LEADERS',
                payload: true,
            });
        }
    }

    function handleRandomSelectionSelfReviews() {
        if (state.reviewParticipantsSelectionData.selfReviewsNumberToDrawn > 0 &&
            state.reviewParticipantsSelectionData.selfReviewsNumberToDrawn <=
            state.reviewParticipantsSelectionData.listEmployeeDataToReview.length) {
            // Realiza o sorteio de colaboradores
            const shuffled = [...listEmployeeDataToReview].sort(() => 0.5 - Math.random()); // Embaralha os colaboradores
            const selectedEmployees = shuffled.slice(0, selfReviewsNumberToDrawn); // Seleciona o número solicitado

            dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW', payload: selectedEmployees });

            dispatch({
                type: 'SET_SELF_REVIEW_TAGS_INPUT',
                payload: selectedEmployees.map((employee) => employee.name),
            });
            dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload: state.reviewParticipantsSelectionData.employeesSelectedAmount + selectedEmployees.length,
            });
            dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_SELF_REVIEW', payload: true });
        } else {
            console.warn("Número de participantes inválido para autoavaliação.");
        }
    }

    function handleRandomSelectionPairsEmployees() {
        if (state.reviewParticipantsSelectionData.pairsNumberToDrawn > 0 &&
            state.reviewParticipantsSelectionData.listEmployeeDataToSelfReview.length > 0) {
            let newPairs = [];
            let totalSelected = 0;

            handleSelectionAllRegisteredUserslistEmployeeDataToSelfReview.forEach((selfReviewEmployee) => {
                // Filtra os colaboradores do mesmo departamento
                const sameDepartmentEmployees = listEmployeeDataToReview.filter(
                    (employee) => employee.departmentId === selfReviewEmployee.departmentId
                );

                // Embaralha os colaboradores do mesmo departamento
                const shuffled = [...sameDepartmentEmployees].sort(() => 0.5 - Math.random());

                // Seleciona a quantidade de pares solicitada
                const selectedPairs = shuffled.slice(0, pairsNumberToDrawn);

                newPairs.push({
                    employeeId: selfReviewEmployee.id,
                    employeeName: `${selfReviewEmployee.name} ${selfReviewEmployee.lastName}`,
                    pairs: selectedPairs.map((pair) => ({
                        pairIdOnReview: pair.id,
                        pairNameOnReview: `${pair.name} ${pair.lastName}`,
                    })),
                });

                // Incrementa o total selecionado
                totalSelected += selectedPairs.length;
            });

            dispatch({ type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: newPairs });
            dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload: state.reviewParticipantsSelectionData.employeesSelectedAmount + totalSelected,
            });
            dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_PAIRS', payload: true });
        } else {
            console.warn("Número de pares inválido ou lista de autoavaliação vazia.");
        }
    }

    function handleCleanupRandomSelectionRegisteredUsers() {
        // setEmployeesSelectedAmount(0);
        // setIsSholdPresentNamesSelectedLeaders(false);
        // setIsSholdPresentNamesSelectedSelfReview(false);
        // setIsSholdPresentNamesSelectedPairs(false);
        // setleadersNumberToDrawn(0);
        // setSelfReviewsNumberToDrawn(0);
        // setPairsNumberToDrawn(0);
        // setListLeaderEmployeeDataSelectedToReview([]);
        // setLeaderTagsInput([]);
        // setListEmployeeDataToSelfReview([]);
        // setSelfReviewTagsInput([]);
        // setListPairEmployeeDataToReview([]);
        dispatch({ type: 'SET_LEADERS_NUMBER_TO_DRAWN', payload: 0 });
        dispatch({ type: 'SET_SELF_REVIEW_NUMBER_TO_DRAWN', payload: 0 });
        dispatch({ type: 'SET_PAIRS_NUMBER_TO_DRAWN', payload: 0 });
        dispatch({ type: 'RESET_REVIEW_DATA' });
    }

    async function handleHandPickedSelectionParticipantsToReview() {
        dispatch({
            type: 'SET_HAND_PICKED_SELECTION_PARTICIPANTS_TO_REVIEW',
            payload: !state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview,
        });
        //setIsShouldPresentParticipantSelectionButtons(!isShouldPresentParticipantSelectionButtons);
    }

    async function handleHandPickedUnselectionParticipantsToReview() {
        dispatch({
            type: 'SET_HAND_PICKED_SELECTION_PARTICIPANTS_TO_REVIEW',
            payload: !state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview,
        });
        //setIsShouldPresentParticipantSelectionButtons(!isShouldPresentParticipantSelectionButtons);
    }

    async function handleLeaderSelection(
        selectedId,
        dataList,
        leaderTagsInput,
        removedLeaderItems,
        dispatch
    ) {
        try {
            if (!Array.isArray(dataList)) {
                console.error("Erro: dataList não é um array.", dataList);
                return;
            }

            if (typeof selectedId !== "string" || selectedId.trim() === "") {
                console.error("Erro: ID selecionado inválido.", selectedId);
                return;
            }

            const selectedItem = dataList.find((item) => item.id === selectedId);
            if (!selectedItem) {
                console.error("Erro: Item selecionado não encontrado na lista.");
                return;
            }

            const updatedTags = [...leaderTagsInput, selectedItem.text];

            const updatedDataList = dataList.filter((item) => item.id !== selectedId);
            const updatedRemovedItems = [...removedLeaderItems, selectedItem];

            await dispatch({ type: 'SET_LEADER_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LEADER_ITEMS', payload: updatedRemovedItems });

        } catch (error) {
            console.error("Erro ao processar a seleção de líderes:", error);
        }
    }

    async function handleTagLeaderRemoval(
        tagToRemove,
        leaderTagsInput,
        removedLeaderItems,
        dataList,
        dispatch
    ) {
        try {

            if (!tagToRemove || !Array.isArray(removedLeaderItems)) return;

            const updatedTags = leaderTagsInput.filter((tag) => tag !== tagToRemove);

            const removedItem = removedLeaderItems.find((item) => item.text === tagToRemove);

            if (!removedItem) {
                console.warn("Tag removida não encontrada na lista original.");
                return;
            }

            const updatedRemovedItems = removedLeaderItems.filter((item) => item.text !== tagToRemove);

            const updatedDataList = [...dataList];
            updatedDataList.splice(removedItem.originalIndex, 0, removedItem);

            await dispatch({ type: 'SET_LEADER_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LEADER_ITEMS', payload: updatedRemovedItems });

        } catch (error) {
            console.error("Erro ao remover tag de líderes:", error);
        }
    }

    async function handleLedSelection(
        selectedId,
        dataList,
        selfReviewTagsInput,
        removedLedItems,
        listEmployeeDataToReview,
        listPairEmployeeDataToReviewDataSelect,
        dispatch
    ) {
        try {
            if (!Array.isArray(dataList)) {
                console.error("Erro: dataList não é um array.", dataList);
                return;
            }

            if (typeof selectedId !== "string" || selectedId.trim() === "") {
                console.error("Erro: ID selecionado inválido.", selectedId);
                return;
            }

            const selectedItem = dataList.find((item) => item.id === selectedId);
            if (!selectedItem) {
                console.error("Erro: Item selecionado não encontrado na lista.");
                return;
            }

            const sameDepartmentEmployees = listEmployeeDataToReview
                .filter(
                    (employee) =>
                        employee.departmentId === selectedItem.departmentId &&
                        employee.id !== selectedItem.employeeId
                )
                .map((employee, index) => ({
                    id: (index + 1).toString(),
                    text: `${employee.name} ${employee.lastName}`,
                    originalIndex: index,
                }));

            const updatedListPair = {
                ...listPairEmployeeDataToReviewDataSelect,
                [selectedId]: sameDepartmentEmployees,
            };

            console.log("updatedListPair :", updatedListPair);

            const updatedTags = [...selfReviewTagsInput, selectedItem.text];
            const updatedDataList = dataList.filter((item) => item.id !== selectedId);
            const updatedRemovedItems = [...removedLedItems, selectedItem];

            await dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LED_ITEMS', payload: updatedRemovedItems });

            await dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELECT', payload: updatedListPair });
            await dispatch({ type: 'SET_PAIR_TAGS_INPUT', payload: { lideradoId: selectedId, tags: [] } });
            await dispatch({ type: 'SET_REMOVED_PAIR_ITEMS', payload: { lideradoId: selectedId, items: [] } });
        } catch (error) {
            console.error("Erro ao processar a seleção de liderados:", error);
        }
    }

    async function handleTagLedRemoval(
        tagToRemove,
        selfReviewTagsInput,
        removedLedItems,
        dataList,
        dispatch
    ) {
        try {
            if (!tagToRemove || !Array.isArray(removedLedItems)) return;

            const updatedTags = selfReviewTagsInput.filter((tag) => tag !== tagToRemove);

            const removedItem = removedLedItems.find((item) => item.text === tagToRemove);

            if (!removedItem) {
                console.warn("Tag removida não encontrada na lista original.");
                return;
            }

            const updatedRemovedItems = removedLedItems.filter((item) => item.text !== tagToRemove);

            const updatedDataList = [...dataList];
            updatedDataList.splice(removedItem.originalIndex, 0, removedItem);

            await dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LED_ITEMS', payload: updatedRemovedItems });

        } catch (error) {
            console.error("Erro ao remover tag de liderados:", error);
        }
    }

    async function handlePairSelection(
        lideradoId,
        selectedPairId, // identificador do par selecionado
        pairTagsInput,
        removedPairItems,
        listPairEmployeeDataToReviewDataSelect,
        listPairEmployeeDataToReview, // objeto com os pares já selecionados, exemplo: { lideradoId1: [par1, par2], lideradoId2: [par3] }
        dispatch
    ) {
        try {
            // Validações iniciais
            if (!pairTagsInput || typeof pairTagsInput !== "object") {
                console.error("Erro: pairTagsInput inválido ou ausente.", pairTagsInput);
                return;
            }
            if (!removedPairItems || typeof removedPairItems !== "object") {
                console.error("Erro: removedPairItems inválido ou ausente.", removedPairItems);
                return;
            }
            if (!listPairEmployeeDataToReviewDataSelect || typeof listPairEmployeeDataToReviewDataSelect !== "object") {
                console.error("Erro: listPairEmployeeDataToReviewDataSelect inválido ou ausente.", listPairEmployeeDataToReviewDataSelect);
                return;
            }

            // Obtém os pares disponíveis para o liderado
            const availablePairs = listPairEmployeeDataToReviewDataSelect[lideradoId] || [];

            // Encontra o par selecionado na lista de disponíveis
            const selectedPair = availablePairs.find(item => item.id === selectedPairId);
            if (!selectedPair) {
                console.error("Erro: Par selecionado não encontrado para o liderado:", lideradoId);
                return;
            }

            // Remove o par selecionado da lista de disponíveis
            const updatedAvailablePairs = availablePairs.filter(item => item.id !== selectedPairId);
            const updatedListPairDataSelect = {
                ...listPairEmployeeDataToReviewDataSelect,
                [lideradoId]: updatedAvailablePairs
            };

            // Recupera os pares já selecionados para esse liderado (caso haja)
            const currentSelectedPairs = listPairEmployeeDataToReview[lideradoId] || [];
            // Adiciona o novo par sem sobrescrever os anteriores
            const updatedSelectedPairs = [...currentSelectedPairs, selectedPair];
            console.log("updatedSelectedPairs :", updatedSelectedPairs);
            // Atualiza os pairTagsInput adicionando o nome completo do par (campo "text")
            const currentPairTags = pairTagsInput[lideradoId] || [];
            const updatedPairTags = [...currentPairTags, selectedPair.text];

            // Atualiza os removedPairItems adicionando o par removido da lista de seleção
            const currentRemovedPairItems = removedPairItems[lideradoId] || [];
            const updatedRemovedPairItems = [...currentRemovedPairItems, selectedPair];

            // Dispara os dispatches para atualizar os estados

            // Atualiza a lista de pares disponíveis para seleção (remove o par selecionado)
            await dispatch({
                type: 'SET_LIST_EMPLOYEE_DATA_TO_SELECT',
                payload: updatedListPairDataSelect
            });

            // Atualiza o objeto com os pares selecionados, garantindo que a chave lideradoId receba o array atualizado
            await dispatch({
                type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW',
                payload: { lideradoId, pairs: updatedSelectedPairs }
            });

            // Atualiza os pairTagsInput para o liderado
            await dispatch({
                type: 'SET_PAIR_TAGS_INPUT',
                payload: { lideradoId, tags: updatedPairTags }
            });

            // Atualiza os removedPairItems para o liderado
            await dispatch({
                type: 'SET_REMOVED_PAIR_ITEMS',
                payload: { lideradoId, items: updatedRemovedPairItems }
            });

        } catch (error) {
            console.error("Erro ao processar a seleção de pares:", error);
        }
    }

    async function handleTagPairRemoval({
        lideradoId,
        tagToRemove,
        pairTagsInput,
        removedPairItems,
        listPairEmployeeDataToReviewDataSelect,
        listPairEmployeeDataToReview,
        dispatch,
    }) {
        try {
            console.log("Iniciando remoção para liderado:", lideradoId, "tag:", tagToRemove);
            if (!tagToRemove) {
                console.warn("Nenhuma tag informada para remoção");
                return;
            }

            // Atualiza os pairTagsInput para o liderado removendo a tag do par
            const currentPairTags = pairTagsInput[lideradoId] || [];
            const updatedPairTags = currentPairTags.filter((tag) => tag !== tagToRemove);
            console.log("Tags atualizadas:", updatedPairTags);

            // Recupera o par removido dos removedPairItems para o liderado
            const currentRemovedItems = removedPairItems[lideradoId] || [];
            const removedItem = currentRemovedItems.find((item) => item.text === tagToRemove);
            if (!removedItem) {
                console.warn("Par removido não encontrado para o liderado", lideradoId);
                return;
            }
            const updatedRemovedItems = currentRemovedItems.filter((item) => item.text !== tagToRemove);
            console.log("RemovedPairItems atualizados:", updatedRemovedItems);

            // Atualiza os pares selecionados removendo o par removido
            const currentSelectedPairs = listPairEmployeeDataToReview[lideradoId] || [];
            const updatedSelectedPairs = currentSelectedPairs.filter((item) => item.text !== tagToRemove);
            console.log("Selected pairs atualizados:", updatedSelectedPairs);

            // Atualiza a lista de pares disponíveis (select) para o liderado:
            // Adiciona o par removido de volta à lista de seleção e reordena pela propriedade originalIndex
            const currentAvailablePairs = listPairEmployeeDataToReviewDataSelect[lideradoId] || [];
            const updatedAvailablePairs = [...currentAvailablePairs, removedItem]
                .sort((a, b) => a.originalIndex - b.originalIndex);
            console.log("Available pairs atualizados (ordenados):", updatedAvailablePairs);

            // Dispara os dispatches para atualizar os estados
            await dispatch({
                type: 'SET_PAIR_TAGS_INPUT',
                payload: { lideradoId, tags: updatedPairTags }
            });
            await dispatch({
                type: 'SET_REMOVED_PAIR_ITEMS',
                payload: { lideradoId, items: updatedRemovedItems }
            });
            await dispatch({
                type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW',
                payload: { lideradoId, pairs: updatedSelectedPairs }
            });
            await dispatch({
                type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_SELECT',
                payload: { lideradoId, pairs: updatedAvailablePairs }
            });

            console.log("Remoção concluída para a tag:", tagToRemove);
        } catch (error) {
            console.error("Erro ao remover tag de pares:", error);
        }
    }


    useEffect(() => { }, [
        state.reviewParticipantsSelectionData.listLeaderEmployeeDataToReview,
        state.reviewParticipantsSelectionData.leaderTagsInput,
        state.reviewParticipantsSelectionData.removedLeaderItems
    ]);

    useEffect(() => { }, [
        state.reviewParticipantsSelectionData.listLedEmployeeDataToReview,
        state.reviewParticipantsSelectionData.selfReviewTagsInput,
        state.reviewParticipantsSelectionData.removedLedItems
    ]);

    useEffect(() => {
        // console.log("listPairEmployeeDataToReview: ", state.reviewParticipantsSelectionData.listPairEmployeeDataToReview);
        // console.log("pairTagsInput: ", state.reviewParticipantsSelectionData.pairTagsInput);
        // console.log("removedPairItems: ", state.reviewParticipantsSelectionData.removedPairItems);
    }, [
        state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
        state.reviewParticipantsSelectionData.pairTagsInput,
        state.reviewParticipantsSelectionData.removedPairItems,
        state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect
    ]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const foundEmployees = await useFindAllEmployee();
                dispatch({
                    type: 'SET_LIST_EMPLOYEE_DATA_TO_REVIEW',
                    payload: foundEmployees,
                });


                const leaderData = foundEmployees
                    .filter((employee) => employee.isLead)
                    .map((employee, index) => ({
                        id: (index + 1).toString(),
                        text: `${employee.name} ${employee.lastName}`,
                    }));
                dispatch({
                    type: 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW',
                    payload: leaderData,
                });

                const ledData = foundEmployees
                    .filter((employee) => !employee.isLead)
                    .map((employee, index) => ({
                        id: (index + 1).toString(),
                        text: `${employee.name} ${employee.lastName}`,
                        originalIndex: index,
                        employeeId: employee.id,
                        departmentId: employee.departmentId
                    }));
                dispatch({
                    type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW',
                    payload: ledData,
                });
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
        fetchEmployees();
    }, []);

    // Execute o carregamento dos dados ao montar o componente
    useEffect(() => {
        // Função para carregar os dados do localStorage
        const loadReviewParticipantsSelectionData = async () => {
            try {
                const rawData = localStorage.getItem('reviewParticipantsSelectionData');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && typeof parsedData === 'object') {
                        // Verifique se selectedCycle está presente
                        dispatch({
                            type: 'LOAD_SAVED_REVIEW_DATA',
                            payload: { ...parsedData },
                        });
                        latestReviewParticipantsSelectionData.current = parsedData; // Atualiza a ref para os dados carregados
                    }
                } else {
                    dispatch({ type: 'RESET_REVIEW_STATE' }); // Limpa o estado para evitar inconsistências
                }
            } catch (error) {
                console.error('Failed to parse reviewParticipantsSelectionData from localStorage:', error);
            } finally {
                setIsLoadingReviewParticipantsSelectionData(false); // Marque como carregado
            }
        };

        loadReviewParticipantsSelectionData();
    }, []);

    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(state.reviewParticipantsSelectionData);

        if (previousStateRef.current !== currentStateString) {
            // Salva o estado atualizado, preservando o ciclo selecionado
            const currentSelectedCycle = state.reviewParticipantsSelectionData.selectedCycle;
            const dataToSave = {
                ...state.reviewParticipantsSelectionData,
                selectedCycle: currentSelectedCycle || state.reviewParticipantsSelectionData.selectedCycle,
            };

            saveDataToLocalStorage(dataToSave);
            latestReviewParticipantsSelectionData.current = dataToSave;

            previousStateRef.current = currentStateString;
        }

        return () => {
            saveDataToLocalStorage(latestReviewParticipantsSelectionData.current);
        };
    }, [state.reviewParticipantsSelectionData]);

    useEffect(() => {
        if (clearStepIndex === 5) {
            resetFormAndLocalStorage(
                true,
                5,
                clearStepIndex,
                'reviewParticipantsSelectionData',
                'RESET_REVIEW_DATA',
                handleClearStepIndex,
                dispatch);
        }
    }, [clearStepIndex, dispatch]);

    if (isLoadingReviewParticipantsSelectionData) {
        return (
            <PageChange />
        );
    }

    return (
        <Form>
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Selecionar Participantes</h3>
                </CardHeader>
                <CardBody>
                    <div className="mb-4">
                        <Card>
                            <CardBody>
                                <Row className="align-items-center">
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <p className="font-weight-bold" >
                                                Toda a empresa
                                            </p>
                                        </h4>
                                        <p className="text-sm text-muted mb-3">
                                            Selecione todos os usuários registrados no Skillfy.
                                        </p>
                                        {
                                            state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate && (
                                                <span className="text-muted text-md">
                                                    <span className="font-weith-bold text-lg text-dark">
                                                        {state.reviewParticipantsSelectionData.employeesSelectedAmount}
                                                    </span>{'  '}
                                                    usuários foram selecionados entre líderes e liderados
                                                </span>
                                            )
                                        }
                                    </div>
                                    <Col className="col-auto">
                                        {
                                            state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate ? (
                                                <Button
                                                    color="secondary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleUnselectionAllRegisteredUsers}
                                                >
                                                    Remove
                                                </Button>

                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleSelectionAllRegisteredUsers}
                                                >
                                                    Selecionar
                                                </Button>

                                            )
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Row className="align-items-center">
                                    <div className="col ml--2 mb-3">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Randomicamente
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-3">
                                            Selecione todos os usuários registrados como funcionários na empresa.
                                        </p>
                                        {
                                            state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview &&
                                            state.reviewParticipantsSelectionData.employeesSelectedAmount > 0 && (
                                                <span className="text-muted text-md">
                                                    <span className="font-weith-bold text-lg text-dark">
                                                        {state.reviewParticipantsSelectionData.employeesSelectedAmount}
                                                    </span>{'  '}
                                                    usuários foram selecionados entre líderes e liderados
                                                </span>
                                            )
                                        }
                                    </div>
                                    <Col className="col-auto">
                                        {
                                            state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview ? (
                                                <>
                                                    <Button
                                                        color="secondary"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleRandomUnselectionRegisteredUsers}
                                                    >
                                                        Remove
                                                    </Button>
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleCleanupRandomSelectionRegisteredUsers}
                                                    >
                                                        Limpar
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleRandomSelectionRegisteredUsers}
                                                >
                                                    Selecionar
                                                </Button>

                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        state.reviewParticipantsSelectionData.isShouldPresentParticipantSelectionButtons &&
                                        state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview && (
                                            <Col className="mb-3 d-flex align-items-center justify-content-start" md="4">
                                                <Button
                                                    className="btn-darker"
                                                    color="darker"
                                                    disabled={!isLeadersButtonEnabled}
                                                    onClick={handleRandomSelectionLeaderEmployees}
                                                    size="sm"
                                                    style={{ width: 150, textAlign: "center" }}
                                                >
                                                    Sortear líderes
                                                </Button>
                                                <Input
                                                    id="leadersInput"
                                                    type="number"
                                                    defaultValue="0"
                                                    min="1"
                                                    max={state.reviewParticipantsSelectionData.listEmployeeDataToReview.length - 1}
                                                    className="form-control"
                                                    value={state.reviewParticipantsSelectionData.leadersNumberToDrawn}
                                                    onChange={(e) => dispatch({ type: 'SET_LEADERS_NUMBER_TO_DRAWN', payload: Number(e.target.value) })}
                                                    size="sm"
                                                    style={{ width: 72 }}
                                                />
                                            </Col>
                                        )
                                    }
                                    <Col className="mb-3 d-flex flex-column" md="8">
                                        {
                                            state.reviewParticipantsSelectionData.isSholdPresentNamesSelectedLeaders &&
                                            state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview && (
                                                <>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="validationReviewName"
                                                    >
                                                        Líderes
                                                    </label>
                                                    <TagsInput
                                                        onlyUnique
                                                        className="bootstrap-tagsinput"
                                                        value={state.reviewParticipantsSelectionData.leaderTagsInput}
                                                        tagProps={{ className: "tag badge mr-1 bg-orange" }}
                                                        inputProps={{
                                                            className: "",
                                                            placeholder: "",
                                                        }}
                                                        onChange={(updatedTags) => {
                                                            dispatch({ type: 'SET_LEADER_TAGS_INPUT', payload: updatedTags });

                                                            // Atualizar a lista original com base nos nomes selecionados
                                                            const updatedLeaders = state.reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview
                                                                .filter((leader) => updatedTags.includes(leader.name));

                                                            dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW', payload: updatedLeaders });

                                                            // Verificação do tamanho de leaderTagsInput
                                                            if (updatedTags.length < 1) {
                                                                dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_LEADERS', payload: false });
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        state.reviewParticipantsSelectionData.isShouldPresentParticipantSelectionButtons &&
                                        state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview && (
                                            <Col className="mb-3 d-flex align-items-center justify-content-start" md="4">
                                                <Button
                                                    className="btn-darker"
                                                    color="darker"
                                                    disabled={!isSelfReviewsButtonEnabled}
                                                    onClick={handleRandomSelectionSelfReviews}
                                                    size="sm"
                                                    style={{ width: 150, textAlign: "center" }}
                                                >
                                                    Sortear liderados
                                                </Button>
                                                <Input
                                                    id="selfReviewsInput"
                                                    type="number"
                                                    defaultValue="0"
                                                    min="1"
                                                    max={state.reviewParticipantsSelectionData.listEmployeeDataToReview.length}
                                                    className="form-control"
                                                    value={state.reviewParticipantsSelectionData.selfReviewsNumberToDrawn}
                                                    onChange={(e) => dispatch({
                                                        type: 'SET_SELF_REVIEW_NUMBER_TO_DRAWN',
                                                        payload: Number(e.target.value),
                                                    })}
                                                    size="sm"
                                                    style={{ width: 72 }}
                                                />
                                            </Col>
                                        )
                                    }
                                    <Col className="mb-3 d-flex flex-column" md="8">
                                        {
                                            state.reviewParticipantsSelectionData.isSholdPresentNamesSelectedSelfReview &&
                                            state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview && (
                                                <>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="validationReviewName"
                                                    >
                                                        Autoavaliação
                                                    </label>
                                                    <TagsInput
                                                        onlyUnique
                                                        className="bootstrap-tagsinput"
                                                        onChange={(updatedTags) => {
                                                            dispatch({
                                                                type: 'SET_SELF_REVIEW_TAGS_INPUT',
                                                                payload: updatedTags,
                                                            });

                                                            // Atualiza a lista original com base nos nomes selecionados
                                                            const updatedSelfReviewList = state.reviewParticipantsSelectionData.listEmployeeDataToSelfReview.filter((employee) =>
                                                                updatedTags.includes(employee.name)
                                                            );
                                                            dispatch({
                                                                type: 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW',
                                                                payload: updatedSelfReviewList,
                                                            });

                                                            // Verifica se não há mais tags
                                                            if (updatedTags.length < 1) {
                                                                dispatch({
                                                                    type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_SELF_REVIEW',
                                                                    payload: false,
                                                                });
                                                            }
                                                        }}
                                                        value={state.reviewParticipantsSelectionData.selfReviewTagsInput}
                                                        tagProps={{ className: "tag badge mr-1  bg-secondary text-dark" }}
                                                        inputProps={{
                                                            className: "",
                                                            placeholder: "",
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        state.reviewParticipantsSelectionData.isShouldPresentParticipantSelectionButtons &&
                                        state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview && (
                                            <Col className="mb-3 d-flex align-items-center justify-content-start" md="4">
                                                <Button
                                                    className="btn-darker"
                                                    color="darker"
                                                    disabled={!isPairsButtonEnabled}
                                                    onClick={handleRandomSelectionPairsEmployees}
                                                    size="sm"
                                                    style={{ width: 150, textAlign: "center" }}
                                                >
                                                    Sortear pares
                                                </Button>
                                                <Input
                                                    id="pairsInput"
                                                    type="number"
                                                    defaultValue="0"
                                                    min="1"
                                                    max={state.reviewParticipantsSelectionData.listEmployeeDataToReview.length}
                                                    className="form-control"
                                                    value={state.reviewParticipantsSelectionData.pairsNumberToDrawn}
                                                    onChange={(e) => dispatch({
                                                        type: 'SET_PAIRS_NUMBER_TO_DRAWN',
                                                        payload: Number(e.target.value),
                                                    })}
                                                    size="sm"
                                                    style={{ width: 72 }}
                                                />
                                            </Col>
                                        )
                                    }
                                    <Col className="mb-3 d-flex flex-column" md="8">
                                        {
                                            state.reviewParticipantsSelectionData.isSholdPresentNamesSelectedPairs &&
                                            state.reviewParticipantsSelectionData.isRandomSelectionParticipantsToReview && (
                                                <>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="validationReviewName"
                                                    >
                                                        Pares
                                                    </label>
                                                    <EmployeePairsInput
                                                        listPairEmployeeDataToReview={state.reviewParticipantsSelectionData.listPairEmployeeDataToReview}
                                                        setListPairEmployeeDataToReview={(payload) =>
                                                            dispatch({
                                                                type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW',
                                                                payload,
                                                            })}
                                                    />
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Row className="align-items-center mb-3">
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Manual
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-3">
                                            Selecione todos os usuários registrados como funcionários na empresa.
                                        </p>
                                        {
                                            state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview &&
                                            state.reviewParticipantsSelectionData.employeesSelectedAmount > 0 && (
                                                <span className="text-muted text-md">
                                                    <span className="font-weith-bold text-lg text-dark">
                                                        {state.reviewParticipantsSelectionData.employeesSelectedAmount}
                                                    </span>{'  '}
                                                    usuários foram selecionados entre líderes e liderados
                                                </span>
                                            )
                                        }
                                    </div>
                                    <Col className="col-auto">
                                        {
                                            state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview ? (
                                                <>
                                                    <Button
                                                        color="secondary"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleHandPickedUnselectionParticipantsToReview}
                                                    >
                                                        Remove
                                                    </Button>
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleCleanupRandomSelectionRegisteredUsers}
                                                    >
                                                        Limpar
                                                    </Button>
                                                </>

                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleHandPickedSelectionParticipantsToReview}
                                                >
                                                    Selecionar
                                                </Button>

                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview && (
                                            <Col className="mb-3" md="4">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="handPickedLeaderSelectionInput"
                                                >
                                                    Selecionar líderes
                                                </label>
                                                <Select2
                                                    id="handPickedLeaderSelectionInput"
                                                    className="form-control"
                                                    data-minimum-results-for-search="Infinity"
                                                    options={{ placeholder: "Selecionar usuários:" }}
                                                    data={state.reviewParticipantsSelectionData.listLeaderEmployeeDataToReview.map(({ id, text }) => (
                                                        { id, text }
                                                    )) || []}
                                                    onSelect={async (e) => {
                                                        const selectedValue = e.target.value;
                                                        if (selectedValue && selectedValue !== "") {
                                                            await handleLeaderSelection(
                                                                selectedValue,
                                                                state.reviewParticipantsSelectionData.listLeaderEmployeeDataToReview,
                                                                state.reviewParticipantsSelectionData.leaderTagsInput,
                                                                state.reviewParticipantsSelectionData.removedLeaderItems,
                                                                dispatch
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Col>
                                        )
                                    }
                                    {
                                        state.reviewParticipantsSelectionData.leaderTagsInput.length > 0 &&
                                        state.reviewParticipantsSelectionData.removedLeaderItems.length > 0 &&
                                        state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview && (
                                            <Col className="d-flex flex-column align-items-start justify-content-start mb-3" md="8">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="validationReviewName"
                                                >
                                                    Líderes
                                                </label>
                                                <TagsInput
                                                    onlyUnique
                                                    className="bootstrap-tagsinput"
                                                    onChange={async (updatedTags) => {
                                                        const removedTag = state.reviewParticipantsSelectionData.leaderTagsInput.find(
                                                            (tag) => !updatedTags.includes(tag)
                                                        );

                                                        if (removedTag) {
                                                            await handleTagLeaderRemoval(
                                                                removedTag,
                                                                state.reviewParticipantsSelectionData.leaderTagsInput,
                                                                state.reviewParticipantsSelectionData.removedLeaderItems,
                                                                state.reviewParticipantsSelectionData.listLeaderEmployeeDataToReview,
                                                                dispatch
                                                            );
                                                        }
                                                    }}
                                                    value={state.reviewParticipantsSelectionData.leaderTagsInput}
                                                    tagProps={{ className: "tag badge mr-1 bg-orange" }}
                                                    inputProps={{
                                                        readOnly: true, // Torna o campo não editável
                                                        placeholder: "", // Remove o placeholder
                                                        style: { display: "none" }, // Remove visualmente o input
                                                    }}
                                                />
                                            </Col>
                                        )
                                    }
                                </Row>
                                {
                                    state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview && (
                                        <Row>
                                            <Col className="mb-3" md="4">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="handPickedParticipantsSelectionInput"
                                                >
                                                    Selecionar liderados
                                                </label>
                                                <Select2
                                                    id="handPickedParticipantsSelectionInput"
                                                    className="form-control"
                                                    data-minimum-results-for-search="Infinity"
                                                    options={{ placeholder: "Selecionar usuários:" }}
                                                    data={state.reviewParticipantsSelectionData.listLedEmployeeDataToReview.map(({ id, text }) => (
                                                        { id, text }
                                                    )) || []}
                                                    onSelect={async (e) => {
                                                        const selectedValue = e.target.value;
                                                        if (selectedValue && selectedValue !== "") {
                                                            await handleLedSelection(
                                                                selectedValue,
                                                                state.reviewParticipantsSelectionData.listLedEmployeeDataToReview,
                                                                state.reviewParticipantsSelectionData.selfReviewTagsInput,
                                                                state.reviewParticipantsSelectionData.removedLedItems,
                                                                state.reviewParticipantsSelectionData.listEmployeeDataToReview,
                                                                state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                                                                dispatch
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                {
                                    state.reviewParticipantsSelectionData.selfReviewTagsInput.length > 0 &&
                                    state.reviewParticipantsSelectionData.removedLedItems.length > 0 &&
                                    state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview && (
                                        <div>
                                            <label
                                                className="form-control-label"
                                                htmlFor={`validationReviewName`}
                                            >
                                                Autoavaliação
                                            </label>
                                            {state.reviewParticipantsSelectionData.selfReviewTagsInput.map((tag, index) => {
                                                const lideradoId = state.reviewParticipantsSelectionData.removedLedItems[index]?.id;
                                                // console.log("lideradoId: ", lideradoId);
                                                // console.log("listPairEmployeeDataToReview[lideradoId]: ", state.reviewParticipantsSelectionData.listPairEmployeeDataToReview[lideradoId]);

                                                return (
                                                    <Row key={index} className="align-items-center mb-3">
                                                        <Col className="d-flex flex-column align-items-start justify-content-start mb-2 " md="2">
                                                            <TagsInput
                                                                onlyUnique
                                                                className="bootstrap-tagsinput"
                                                                onChange={async (updatedTags) => {
                                                                    const removedTag = state.reviewParticipantsSelectionData.selfReviewTagsInput.find(
                                                                        (tag) => !updatedTags.includes(tag)
                                                                    );

                                                                    if (removedTag) {
                                                                        await handleTagLedRemoval(
                                                                            removedTag,
                                                                            state.reviewParticipantsSelectionData.selfReviewTagsInput,
                                                                            state.reviewParticipantsSelectionData.removedLedItems,
                                                                            state.reviewParticipantsSelectionData.listLedEmployeeDataToReview,
                                                                            dispatch
                                                                        );
                                                                    }
                                                                }}
                                                                value={[tag]}
                                                                tagProps={{ className: "tag badge mr-1 bg-secondary text-dark" }}
                                                                inputProps={{
                                                                    readOnly: true,
                                                                    placeholder: "",
                                                                    style: { display: "none" },
                                                                }}
                                                            />
                                                        </Col>

                                                        <Col className="mb-2" md="4">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor={`handPickedPairsSelectionInput-${index}`}
                                                            >
                                                                Selecionar pares
                                                            </label>
                                                            <Select2
                                                                id={`handPickedPairsSelectionInput-${index}`}
                                                                className="form-control"
                                                                data-minimum-results-for-search="Infinity"
                                                                options={{ placeholder: "Selecionar usuários:" }}
                                                                data={
                                                                    lideradoId && state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect[lideradoId]
                                                                        ? state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect[lideradoId]?.map(
                                                                            ({ id, text }) => ({ id, text })
                                                                        )
                                                                        : []
                                                                }
                                                                onSelect={async (e) => {
                                                                    const selectedValue = e.target.value;
                                                                    if (selectedValue && selectedValue !== "") {
                                                                        await handlePairSelection(
                                                                            lideradoId,
                                                                            selectedValue,
                                                                            state.reviewParticipantsSelectionData.pairTagsInput,
                                                                            state.reviewParticipantsSelectionData.removedPairItems,
                                                                            state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                                                                            state.reviewParticipantsSelectionData.listPairEmployeeDataToReview, // Lista dos pares já selecionados
                                                                            dispatch
                                                                        );
                                                                    }
                                                                }}
                                                            />

                                                        </Col>
                                                        {
                                                            state.reviewParticipantsSelectionData.removedLedItems.length > 0 &&
                                                            state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview &&
                                                            Object.keys(state.reviewParticipantsSelectionData.removedPairItems).map((lideradoId) => {
                                                                const liderado = state.reviewParticipantsSelectionData.removedLedItems.find(item => item.id === lideradoId);
                                                                if (!liderado) return null;  // Ignora se não encontrar o liderado correspondente

                                                                const currentPairs = state.reviewParticipantsSelectionData.removedPairItems[lideradoId] || [];

                                                                return (
                                                                    <Col className="d-flex flex-column align-items-start justify-content-start mb-3" md="6" key={lideradoId}>
                                                                        <label className="form-control-label" htmlFor={`pairTags-${lideradoId}`}>
                                                                            Pares para {liderado.text}
                                                                        </label>
                                                                        <TagsInput
                                                                            onlyUnique
                                                                            className="bootstrap-tagsinput"
                                                                            value={currentPairs.map(pair => pair.text)}
                                                                            onChange={async (updatedTags) => {
                                                                                const removedTag = currentPairs.find(pair => !updatedTags.includes(pair.text));
                                                                                if (removedTag) {
                                                                                    await handleTagPairRemoval({
                                                                                        lideradoId,
                                                                                        tagToRemove: removedTag.text,
                                                                                        pairTagsInput: state.reviewParticipantsSelectionData.pairTagsInput,
                                                                                        removedPairItems: state.reviewParticipantsSelectionData.removedPairItems,
                                                                                        listPairEmployeeDataToReviewDataSelect: state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                                                                                        listPairEmployeeDataToReview: state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
                                                                                        dispatch,
                                                                                    });
                                                                                }
                                                                            }}
                                                                            tagProps={{ className: "tag badge mr-1 bg-default" }}
                                                                            inputProps={{ readOnly: true, placeholder: "", style: { display: "none" } }}
                                                                        />
                                                                    </Col>
                                                                );
                                                            })
                                                        }
                                                    </Row>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            </CardBody>
                        </Card>
                    </div>
                </CardBody>
            </Card>
        </Form >
    );
}