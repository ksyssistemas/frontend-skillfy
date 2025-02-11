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
        const { selfReviewsNumberToDrawn, listEmployeeDataToReview, employeesSelectedAmount } =
            state.reviewParticipantsSelectionData;

        if (selfReviewsNumberToDrawn > 0 && selfReviewsNumberToDrawn <= listEmployeeDataToReview.length) {

            const shuffled = [...listEmployeeDataToReview].sort(() => 0.5 - Math.random());
            const selectedEmployees = shuffled.slice(0, selfReviewsNumberToDrawn);

            dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW', payload: selectedEmployees });

            dispatch({
                type: 'SET_SELF_REVIEW_TAGS_INPUT',
                payload: selectedEmployees.map((employee) => employee.name),
            });
            dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload: employeesSelectedAmount + selectedEmployees.length,
            });
            dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_SELF_REVIEW', payload: true });
        } else {
            console.warn("Número de participantes inválido para autoavaliação.");
        }
    }

    async function handleRandomSelectionPairsEmployees(state, dispatch) {
        try {
            const {
                listEmployeeDataToReview,
                listEmployeeDataToSelfReview,
                pairsNumberToDrawn,
                randomPairTagsInput,
                employeesSelectedAmount,
                removedRandomPairItems
            } = state.reviewParticipantsSelectionData;

            if (pairsNumberToDrawn <= 0 && listEmployeeDataToSelfReview.length === 0) {
                console.warn("Número de pares inválido ou lista de autoavaliação vazia.");
                return;
            }

            let newPairs = {};
            let newRandomPairTagsInput = {};
            let newRemovedRandomPairItems = { ...removedRandomPairItems };
            let totalSelected = 0;

            for (const selfReviewEmployee of listEmployeeDataToSelfReview) {
                // Filtra colaboradores do mesmo departamento e remove o próprio colaborador
                const availableEmployees = listEmployeeDataToReview.filter(
                    (employee) =>
                        employee.departmentId === selfReviewEmployee.departmentId &&
                        employee.id !== selfReviewEmployee.id
                );

                // Embaralha os colaboradores do mesmo departamento
                const shuffled = [...availableEmployees].sort(() => 0.5 - Math.random());

                // Inicializa objeto para o funcionário atual
                newPairs[selfReviewEmployee.id] = {
                    employeeId: selfReviewEmployee.id,
                    employeeName: `${selfReviewEmployee.name} ${selfReviewEmployee.lastName}`,
                    pairs: [],
                };

                if (shuffled.length < pairsNumberToDrawn) {
                    // Se não houver pares suficientes, salvar employeeId e employeeName no `randomPairTagsInput`
                    newPairs[selfReviewEmployee.id].insufficientPairNumbers = "Não há colaboradores suficientes para sortear.";

                    newRandomPairTagsInput[selfReviewEmployee.id] = [`${selfReviewEmployee.name} ${selfReviewEmployee.lastName}`];

                    newRemovedRandomPairItems[selfReviewEmployee.id] = [{
                        id: selfReviewEmployee.id,
                        text: `${selfReviewEmployee.name} ${selfReviewEmployee.lastName}`,
                    }];
                } else {
                    // Seleciona a quantidade de pares solicitada
                    const selectedPairs = shuffled.slice(0, pairsNumberToDrawn);

                    newPairs[selfReviewEmployee.id].pairs = selectedPairs.map((pair) => ({
                        pairIdOnReview: pair.id,
                        pairNameOnReview: `${pair.name} ${pair.lastName}`,
                    }));

                    newRandomPairTagsInput[selfReviewEmployee.id] = selectedPairs.map(
                        (pair) => `${pair.name} ${pair.lastName}`
                    );

                    newRemovedRandomPairItems[selfReviewEmployee.id] = selectedPairs.map((pair) => ({
                        id: pair.id,
                        text: `${pair.name} ${pair.lastName}`,
                    }));

                    totalSelected += selectedPairs.length;
                }
            }

            console.log("newPairs: ", newPairs);
            console.log("newRandomPairTagsInput: ", newRandomPairTagsInput);
            console.log("newRemovedRandomPairItems: ", newRemovedRandomPairItems);

            // Atualiza os estados via reducer
            await dispatch({ type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: newPairs });
            await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: employeesSelectedAmount + totalSelected });
            await dispatch({ type: 'SET_RANDOM_PAIR_TAGS_INPUT', payload: newRandomPairTagsInput });
            await dispatch({ type: 'SET_REMOVED_RANDOM_PAIR_ITEMS', payload: newRemovedRandomPairItems });
            await dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_PAIRS', payload: true });

        } catch (error) {
            console.error("Erro ao processar a seleção aleatória de pares:", error);
        }
    }

    async function handleTagRandomPairRemoval(
        employeeId,
        tagToRemove,
        state,
        dispatch
    ) {
        try {
            const {
                listPairEmployeeDataToReview,
                randomPairTagsInput,
                removedRandomPairItems,
            } = state.reviewParticipantsSelectionData;

            if (!employeeId || !tagToRemove) {
                console.warn("Parâmetros inválidos ao remover par aleatório.");
                return;
            }

            const currentTags = randomPairTagsInput[employeeId] || [];
            if (!Array.isArray(currentTags)) {
                console.error("Erro: randomPairTagsInput[lideradoId] não é um array.", currentTags);
                return;
            }

            // Remove a tag da lista
            const updatedTags = currentTags.filter(tag => tag !== tagToRemove);

            // Obtém os pares atuais do liderado
            const employeeData = listPairEmployeeDataToReview[employeeId] || {};
            const currentPairs = employeeData.pairs || [];
            const insufficientPairNumbers = employeeData.insufficientPairNumbers;

            // Obtém os pares removidos atuais do colaborador
            const currentRemovedPairs = removedRandomPairItems[employeeId] || [];
            console.log("currentRemovedPairs: ", currentRemovedPairs);
            console.log("tagToRemove: ", tagToRemove);
            let removedItem = null;

            if (currentPairs.length === 0 && insufficientPairNumbers) {
                // Se não há pares e há um aviso de insuficiência, encontrar pelo nome do colaborador
                removedItem = { employeeName: tagToRemove };
            } else {
                // Busca normal pelo nome do par na lista de pares
                removedItem = currentPairs.find(pair => pair.pairNameOnReview === tagToRemove);
            }
    
            if (!removedItem) {
                console.warn("Par removido não encontrado na lista original.");
                return;
            }
    
            // Remove o item da lista de pares do liderado (caso existam pares)
            const updatedPairs = currentPairs.filter(pair => pair.pairNameOnReview !== tagToRemove);
    
            // Atualiza a lista de pares do liderado
            const updatedListPairEmployeeDataToReview = {
                ...listPairEmployeeDataToReview,
                [employeeId]: {
                    ...employeeData,
                    pairs: updatedPairs,
                },
            };
    
            // Remove o item correto da lista de removidos, sempre considerando `text`
            const updatedRemovedRandomPairItems = {
                ...removedRandomPairItems,
                [employeeId]: (removedRandomPairItems[employeeId] || []).filter(item => item.text !== tagToRemove),
            };    

            console.log("Updated Removed Items:", updatedRemovedRandomPairItems);

            // Atualiza os estados no reducer
            await dispatch({ type: 'SET_RANDOM_PAIR_TAGS_INPUT', payload: { [employeeId]: updatedTags } });
            await dispatch({ type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: updatedListPairEmployeeDataToReview });
            await dispatch({ type: 'SET_REMOVED_RANDOM_PAIR_ITEMS', payload: updatedRemovedRandomPairItems });
            await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: Math.max(0, state.reviewParticipantsSelectionData.employeesSelectedAmount - 1) });

        } catch (error) {
            console.error("Erro ao remover par aleatório:", error);
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
        listPairEmployeeDataToReview,
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
                ...listPairEmployeeDataToReview,
                [selectedId]: sameDepartmentEmployees,
            };

            const updatedTags = [...selfReviewTagsInput, selectedItem.text];
            const updatedDataList = dataList.filter((item) => item.id !== selectedId);
            const updatedRemovedItems = [...removedLedItems, selectedItem];

            await dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LED_ITEMS', payload: updatedRemovedItems });

            await dispatch({ type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: updatedListPair });
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
        tagToRemove,
        pairTagsInput,
        removedPairItems,
        dataList,
        dispatch
    ) {
        try {
            if (!pairTagsInput || typeof pairTagsInput !== "object") {
                console.error("Erro: pairTagsInput inválido ou ausente.", pairTagsInput);
                return;
            }

            if (!removedPairItems || typeof removedPairItems !== "object") {
                console.error("Erro: removedPairItems inválido ou ausente.", removedPairItems);
                return;
            }

            const currentTags = pairTagsInput[lideradoId] || [];
            if (!Array.isArray(currentTags)) {
                console.error("Erro: pairTagsInput[lideradoId] não é um array.", currentTags);
                return;
            }

            const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);

            const removedItemsForLiderado = removedPairItems[lideradoId] || [];
            const removedItem = removedItemsForLiderado.find((item) => item.text === tagToRemove);

            if (!removedItem) {
                console.warn("Tag removida não encontrada na lista original.", { tagToRemove, removedItemsForLiderado });
                return;
            }

            const updatedRemovedItems = removedItemsForLiderado.filter((item) => item.text !== tagToRemove);

            const updatedDataList = { ...dataList };
            const pairList = updatedDataList[lideradoId] || [];
            pairList.splice(removedItem.originalIndex, 0, removedItem);

            const updatedPairTagsInput = {
                ...pairTagsInput,
                [lideradoId]: updatedTags,
            };

            const updatedRemovedPairItems = {
                ...removedPairItems,
                [lideradoId]: updatedRemovedItems,
            };

            await dispatch({ type: 'SET_PAIR_TAGS_INPUT', payload: updatedPairTagsInput });
            await dispatch({ type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_PAIR_ITEMS', payload: updatedRemovedPairItems });

        } catch (error) {
            console.error("Erro ao processar a seleção de pares:", error);
        }
    }

    async function handleTagPairRemoval(
        tagToRemove,
        pairTagsInput,
        removedPairItems,
        dataList,
        dispatch
    ) {
        try {
            if (!tagToRemove || !Array.isArray(removedPairItems)) return;

            // Atualiza a lista de pares removidos
            const updatedTags = pairTagsInput.filter((tag) => tag !== tagToRemove);

            // Encontra o item removido
            const removedItem = removedPairItems.find((item) => item.text === tagToRemove);
            if (!removedItem) {
                console.warn("Tag removida não encontrada na lista original.");
                return;
            }

            const updatedRemovedItems = removedPairItems.filter((item) => item.text !== tagToRemove);

            // Atualiza a lista de pares disponíveis
            const updatedDataList = dataList.map((pairList) => {
                if (pairList.length > 0 && pairList[0].departmentId === removedItem.departmentId) {
                    return [...pairList, removedItem];
                }
                return pairList;
            });

            // Atualiza o número total de pares selecionados
            await dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload: Math.max(0, state.reviewParticipantsSelectionData.employeesSelectedAmount - 1),
            });

            await dispatch({ type: 'SET_PAIR_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_PAIR_ITEMS', payload: updatedRemovedItems });

        } catch (error) {
            console.error("Erro ao remover tag de liderados:", error);
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
    }, [
        state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
        state.reviewParticipantsSelectionData.pairTagsInput,
        state.reviewParticipantsSelectionData.removedPairItems
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
                                                    min="0"
                                                    max={state.reviewParticipantsSelectionData.listEmployeeDataToReview.length}
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
                                                            const { leaderTagsInput, listLeaderEmployeeDataSelectedToReview, employeesSelectedAmount } = state.reviewParticipantsSelectionData;

                                                            const removedLeaders = leaderTagsInput.filter(tag => !updatedTags.includes(tag));

                                                            const updatedLeadersList = listLeaderEmployeeDataSelectedToReview.filter(leader => updatedTags.includes(leader.name));

                                                            dispatch({ type: 'SET_LEADER_TAGS_INPUT', payload: updatedTags });

                                                            dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW', payload: updatedLeadersList });

                                                            dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: employeesSelectedAmount - removedLeaders.length });

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
                                                    min="0"
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
                                                            const {
                                                                selfReviewTagsInput,
                                                                listEmployeeDataToSelfReview,
                                                                employeesSelectedAmount
                                                            } = state.reviewParticipantsSelectionData;

                                                            const removedEmployees = selfReviewTagsInput.filter(tag => !updatedTags.includes(tag));

                                                            const updatedSelfReviewList = listEmployeeDataToSelfReview.filter(employee =>
                                                                updatedTags.includes(employee.name)
                                                            );

                                                            dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: updatedTags, });

                                                            dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW', payload: updatedSelfReviewList, });

                                                            dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: employeesSelectedAmount - removedEmployees.length });

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
                                                    onClick={async (e) => handleRandomSelectionPairsEmployees(state, dispatch)}
                                                    size="sm"
                                                    style={{ width: 150, textAlign: "center" }}
                                                >
                                                    Sortear pares
                                                </Button>
                                                <Input
                                                    id="pairsInput"
                                                    type="number"
                                                    defaultValue="0"
                                                    min="0"
                                                    max={state.reviewParticipantsSelectionData.listEmployeeDataToReview.length}
                                                    className="form-control"
                                                    value={state.reviewParticipantsSelectionData.pairsNumberToDrawn}
                                                    onChange={(e) => dispatch({ type: 'SET_PAIRS_NUMBER_TO_DRAWN', payload: Number(e.target.value) })}
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
                                                        handleTagRandomPairRemoval={handleTagRandomPairRemoval}
                                                        state={state}
                                                        dispatch={dispatch}
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
                                                                state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
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
                                                console.log("lideradoId: ", lideradoId);
                                                console.log("listPairEmployeeDataToReview[lideradoId]: ", state.reviewParticipantsSelectionData.listPairEmployeeDataToReview[lideradoId]);

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
                                                                    lideradoId && state.reviewParticipantsSelectionData.listPairEmployeeDataToReview[lideradoId]
                                                                        ? state.reviewParticipantsSelectionData.listPairEmployeeDataToReview[lideradoId]?.map(
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
                                                                            state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
                                                                            state.reviewParticipantsSelectionData.pairTagsInput,
                                                                            state.reviewParticipantsSelectionData.removedPairItems,
                                                                            dispatch
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </Col>

                                                        {
                                                            state.reviewParticipantsSelectionData.removedLedItems.length > 0 &&
                                                            state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview &&
                                                            state.reviewParticipantsSelectionData.removedLedItems.map((liderado, index) => {
                                                                const lideradoId = liderado.id;
                                                                const currentPairTagsInput = state.reviewParticipantsSelectionData.pairTagsInput[lideradoId] || [];
                                                                <Col className="d-flex flex-column align-items-start justify-content-start mb-3" md="6" key={lideradoId}>
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor={`pairTags-${lideradoId}`}
                                                                    >
                                                                        Pares
                                                                    </label>
                                                                    <TagsInput
                                                                        onlyUnique
                                                                        className="bootstrap-tagsinput"
                                                                        onChange={async (updatedTags) => {
                                                                            const removedTag = currentPairTagsInput.find((tag) => !updatedTags.includes(tag));

                                                                            if (removedTag) {
                                                                                await handleTagPairRemoval(
                                                                                    lideradoId,
                                                                                    removedTag,
                                                                                    currentPairTagsInput,
                                                                                    state.reviewParticipantsSelectionData.removedPairItems,
                                                                                    state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
                                                                                    dispatch
                                                                                );
                                                                            } else {
                                                                                const updatedTagsInput = {
                                                                                    ...state.reviewParticipantsSelectionData.pairTagsInput,
                                                                                    [lideradoId]: updatedTags,
                                                                                };
                                                                                dispatch({
                                                                                    type: 'SET_PAIR_TAGS_INPUT',
                                                                                    payload: updatedTagsInput,
                                                                                });
                                                                            }
                                                                        }}
                                                                        value={currentPairTagsInput}
                                                                        tagProps={{ className: "tag badge mr-1 bg-default" }}
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                            placeholder: "",
                                                                            style: { display: "none" },
                                                                        }}
                                                                    />
                                                                </Col>
                                                            }
                                                            )
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