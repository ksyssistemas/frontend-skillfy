import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Badge, Button, Card, CardBody, CardHeader, Col, Form, Input, Row, Table, UncontrolledTooltip } from "reactstrap";
import dynamic from "next/dynamic";
import { handleSelectionEmploymentContractData } from "../../../../../../util/handleSelectionEmploymentContractData";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin that creates an input with badges
import TagsInput from "components/TagsInput/TagsInput.js";
import { useFindAllEmployee } from "../../../../../../hooks/RecordsHooks/employee/useFindAllEmployee";
import EmployeePairsInput from "../EmployeePairsInput";
import { initialStateReviewParticipantsSelectionForm, reviewParticipantsSelectionFormReducer } from '../../../../../../reducers/ReviewForms/ReviewParticipantSelectionFormReducer';
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import PageChange from "../../../../../PageChange/PageChange";
import { useFindDepartment } from "../../../../../../hooks/RecordsHooks/department/useFindDepartment";
import { useFindClientCompany } from "../../../../../../hooks/RecordsHooks/customer/useFindClientCompany";
import { useFindEmployeeContractDetails } from "../../../../../../hooks/RecordsHooks/featuresEmploymentContract/useFindEmployeeContractDetails";
import { useFindRole } from "../../../../../../hooks/RecordsHooks/role/useFindRole";
import useCreatePerformanceReview from "../../../../../../hooks/PerformanceReview/useCreatePerformanceReview";
import { resetFormAndLocalStorage } from "../../../../../../util/resetReviewFormData";

export function ReviewParticipantSelectionForm() {

    const [state, dispatch] = useReducer(reviewParticipantsSelectionFormReducer, initialStateReviewParticipantsSelectionForm);

    const latestReviewParticipantsSelectionData = useRef(state.reviewParticipantsSelectionData);

    const [isLoadingReviewParticipantsSelectionData, setIsLoadingReviewParticipantsSelectionData] = useState(true);

    const {
        selectedReview,
        clearStepIndex,
        handleClearStepIndex,
        stateGlobalReviewReducer,
        dispatchGlobalReviewReducer
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

    let contador = 0;

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem('reviewParticipantsSelectionData', JSON.stringify(data));
    };

    // Função para selecionar todos os usuários registrados
    async function handleSelectionAllRegisteredUsers() {
        const isSelectingAll = !state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate;

        dispatch({
            type: 'SET_ALL_EMPLOYEE_SELECTED',
            payload: isSelectingAll,
        });

        const updatedEmployees = state.reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.map(employee => ({
            ...employee,
            isCheckedToEmployeeList: isSelectingAll,
        }));

        dispatch({
            type: 'SET_LIST_ALL_EMPLOYEE_SELECTED_TO_REVIEW',
            payload: updatedEmployees,
        });

        dispatch({
            type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
            payload: isSelectingAll ? updatedEmployees.length : 0,
        });
    }

    // Função para desmarcar todos os usuários registrados
    function handleUnselectAllRegisteredUsers() {
        dispatch({
            type: 'SET_ALL_EMPLOYEE_SELECTED',
            payload: !state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate,
        });
        dispatch({
            type: 'SET_LIST_ALL_EMPLOYEE_SELECTED_TO_REVIEW',
            payload: [],
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

    function handleRandomUnselectRegisteredUsers() {
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

            // Atualiza os estados via reducer
            await dispatch({ type: 'SET_LIST_RANDOM_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: newPairs });
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
                listRandomPairEmployeeDataToReview,
                randomPairTagsInput,
                removedRandomPairItems,
            } = state.reviewParticipantsSelectionData;

            if (!employeeId) {
                console.warn("ID do colaborador inválido para remoção.");
                return;
            }

            // Obtém os dados do led
            const employeeData = listRandomPairEmployeeDataToReview[employeeId] || {};
            const employeeName = employeeData.employeeName;

            if (!employeeName) {
                console.warn("Nome do colaborador não encontrado.");
                return;
            }

            const currentTags = randomPairTagsInput[employeeId] || [];
            if (!Array.isArray(currentTags)) {
                console.error("Erro: randomPairTagsInput[employeeId] não é um array.", currentTags);
                return;
            }

            // Caso a tag a ser removida seja a mensagem de insuficiência, remove diretamente o liderado
            const isInsufficientMessage = tagToRemove === employeeData.insufficientPairNumbers;

            // Obtém os pares atuais (se existirem)
            const currentPairs = employeeData.pairs || [];

            // Obtém os pares removidos atuais
            const currentRemovedPairs = removedRandomPairItems[employeeId] || [];

            // Verifica se a tag a ser removida corresponde a um par real
            let removedItem = currentPairs.find(pair => pair.pairNameOnReview === tagToRemove)
                || currentRemovedPairs.find(item => item.text === tagToRemove);

            // Se a tag removida for a mensagem de insuficiência OU não houver mais pares, remover o liderado por completo
            const shouldRemoveEmployee = isInsufficientMessage || currentPairs.length === 0;

            let updatedListRandomPairEmployeeDataToReview = { ...listRandomPairEmployeeDataToReview };
            let updatedRandomPairTagsInput = { ...randomPairTagsInput };
            let updatedRemovedRandomPairItems = { ...removedRandomPairItems };

            if (isInsufficientMessage || (currentPairs.length === 1 && removedItem)) {
                // Remover completamente o colaborador e seus pares se não houver mais pares ou for mensagem de insuficiência
                delete updatedRandomPairTagsInput[employeeId]; // Remove do objeto
                delete updatedRemovedRandomPairItems[employeeId]; // Remove do objeto
                // Criar um novo objeto sem a chave do `employeeId` para garantir que o React detecte a mudança
                updatedListRandomPairEmployeeDataToReview = Object.keys(updatedListRandomPairEmployeeDataToReview)
                    .filter(key => key !== String(employeeId))
                    .reduce((obj, key) => {
                        obj[key] = updatedListRandomPairEmployeeDataToReview[key];
                        return obj;
                    }, {});
            } else if (removedItem) {
                // Caso contrário, apenas remover o par específico

                // Atualizar a lista de pares
                updatedListRandomPairEmployeeDataToReview[employeeId] = {
                    ...employeeData,
                    pairs: currentPairs.filter(pair => pair.pairNameOnReview !== tagToRemove),
                };

                // Atualizar o array de `randomPairTagsInput`
                updatedRandomPairTagsInput[employeeId] = currentTags.filter(tag => tag !== tagToRemove);

                // Atualizar `removedRandomPairItems`
                updatedRemovedRandomPairItems[employeeId] = currentRemovedPairs.filter(item => item.text !== tagToRemove);
            }

            // Atualiza os estados no reducer
            await dispatch({ type: 'SET_LIST_RANDOM_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: updatedListRandomPairEmployeeDataToReview });
            await dispatch({ type: 'SET_RANDOM_PAIR_TAGS_INPUT', payload: updatedRandomPairTagsInput });
            await dispatch({ type: 'SET_REMOVED_RANDOM_PAIR_ITEMS', payload: updatedRemovedRandomPairItems });
            await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: Math.max(0, state.reviewParticipantsSelectionData.employeesSelectedAmount - 1) });

        } catch (error) {
            console.error("Erro ao remover par aleatório:", error);
        }
    }

    async function handleCleanupRandomSelectionRegisteredUsers(dispatch) {
        await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: 0 });
        await dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_LEADERS', payload: false });
        await dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_SELF_REVIEW', payload: false });
        await dispatch({ type: 'SET_SHOULD_PRESENT_NAMES_SELECTED_PAIRS', payload: true });
        await dispatch({ type: 'SET_LEADERS_NUMBER_TO_DRAWN', payload: 0 });
        await dispatch({ type: 'SET_SELF_REVIEW_NUMBER_TO_DRAWN', payload: 0 });
        await dispatch({ type: 'SET_PAIRS_NUMBER_TO_DRAWN', payload: 0 });
        await dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW', payload: [] });
        await dispatch({ type: 'SET_LEADER_TAGS_INPUT', payload: [] });
        await dispatch({ type: 'SET_REMOVED_LEADER_ITEMS', payload: [] });
        await dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW', payload: [] });
        await dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: [] });
        await dispatch({ type: 'SET_REMOVED_LED_ITEMS', payload: [] });
        await dispatch({ type: 'SET_LIST_RANDOM_PAIR_EMPLOYEE_DATA_TO_REVIEW', payload: {} });
        await dispatch({ type: 'SET_RANDOM_PAIR_TAGS_INPUT', payload: {} });
        await dispatch({ type: 'SET_REMOVED_RANDOM_PAIR_ITEMS', payload: {} });
    }

    async function handleHandPickedSelectionParticipantsToReview() {
        dispatch({
            type: 'SET_HAND_PICKED_SELECTION_PARTICIPANTS_TO_REVIEW',
            payload: !state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview,
        });
    }

    async function handleHandPickedUnselectParticipantsToReview() {
        dispatch({
            type: 'SET_HAND_PICKED_SELECTION_PARTICIPANTS_TO_REVIEW',
            payload: !state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview,
        });
    }

    async function handleLeaderSelection(
        selectedId,
        dataList,
        leaderTagsInput,
        removedLeaderItems,
        listLeaderEmployeeDataSelectedToReview,
        employeesSelectedAmount,
        listLedEmployeeDataToReview,
        selfReviewTagsInput,
        removedLedItems,
        listEmployeeDataToReview,
        listPairEmployeeDataToReviewDataSelect,
        listEmployeeDataToSelfReview,
        dispatch
    ) {
        try {
            if (!Array.isArray(dataList) || !Array.isArray(listLedEmployeeDataToReview)) {
                console.error("Erro: dataList ou listLedEmployeeDataToReview não são arrays.");
                return;
            }

            const selectedLeader = dataList.find((item) => item.id === selectedId);
            if (!selectedLeader) {
                console.error("Erro: Líder selecionado não encontrado.");
                return;
            }

            // Atualiza estado dos líderes
            const updatedLeaderTags = [...leaderTagsInput, selectedLeader.text];
            const updatedLeaderDataList = dataList.filter((item) => item.id !== selectedId);
            const updatedRemovedLeaderItems = [...removedLeaderItems, selectedLeader];
            const updatedLeaderList = [...listLeaderEmployeeDataSelectedToReview, selectedLeader];

            const ledTeamOfLeader = listLedEmployeeDataToReview.filter((item) =>
                Array.isArray(item.headedBy) &&
                item.headedBy.some((head) => head.leaderId === selectedId)
            );

            // Adiciona cada liderado encontrado (equivalente à lógica do handleLedSelection)
            let updatedSelfReviewTagsInput = [...selfReviewTagsInput];
            let updatedRemovedLedItems = [...removedLedItems];
            let updatedLedEmployeeDataToReview = [...listLedEmployeeDataToReview];
            let updatedEmployeeDataToSelfReview = [...listEmployeeDataToSelfReview];
            let updatedListPairSelect = { ...listPairEmployeeDataToReviewDataSelect };
            let updatedEmployeesSelectedAmount = employeesSelectedAmount + 1;

            for (const led of ledTeamOfLeader) {
                const sameDepartmentEmployees = listEmployeeDataToReview
                    .filter(
                        (employee) =>
                            employee.departmentId === led.departmentId &&
                            employee.id !== led.employeeId
                    )
                    .map((employee, index) => ({
                        id: (index + 1).toString(),
                        text: `${employee.name} ${employee.lastName}`,
                        employeePairId: employee.id,
                        originalIndex: index,
                    }));
                updatedListPairSelect[led.id] = sameDepartmentEmployees;

                updatedSelfReviewTagsInput.push(led.text);
                updatedRemovedLedItems.push(led);
                updatedLedEmployeeDataToReview = updatedLedEmployeeDataToReview.filter((item) => item.id !== led.id);
                updatedEmployeeDataToSelfReview.push(led);
                updatedEmployeesSelectedAmount++;
            }

            // Dispatch dos líderes
            await dispatch({ type: 'SET_LEADER_TAGS_INPUT', payload: updatedLeaderTags });
            await dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW', payload: updatedLeaderDataList });
            await dispatch({ type: 'SET_REMOVED_LEADER_ITEMS', payload: updatedRemovedLeaderItems });
            await dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW', payload: updatedLeaderList });

            // Dispatch dos liderados
            await dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: updatedSelfReviewTagsInput });
            await dispatch({ type: 'SET_REMOVED_LED_ITEMS', payload: updatedRemovedLedItems });
            await dispatch({ type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW', payload: updatedLedEmployeeDataToReview });
            await dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW', payload: updatedEmployeeDataToSelfReview });
            await dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELECT', payload: updatedListPairSelect });
            for (const led of ledTeamOfLeader) {
                await dispatch({ type: 'SET_PAIR_TAGS_INPUT', payload: { ledId: led.id, tags: [] } });
                await dispatch({ type: 'SET_REMOVED_PAIR_ITEMS', payload: { ledId: led.id, items: [] } });
            }

            await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: updatedEmployeesSelectedAmount });

        } catch (error) {
            console.error("Erro ao processar a seleção de líderes e seus liderados:", error);
        }
    }

    async function handleTagLeaderRemoval(
        tagToRemove,
        leaderTagsInput,
        removedLeaderItems,
        dataList,
        listLeaderEmployeeDataSelectedToReview,
        employeesSelectedAmount,
        dispatch
    ) {
        try {
            if (!tagToRemove || !Array.isArray(removedLeaderItems)) return;

            // Atualiza as tags removendo a tag específica
            const updatedTags = leaderTagsInput.filter((tag) => tag !== tagToRemove);

            // Busca o item removido anteriormente na lista de removidos
            const removedItem = removedLeaderItems.find((item) => item.text === tagToRemove);

            if (!removedItem) {
                console.warn("Tag removida não encontrada na lista original.");
                return;
            }

            // Remove o item da lista de removidos
            const updatedRemovedItems = removedLeaderItems.filter((item) => item.text !== tagToRemove);

            // Adiciona o item de volta na lista original na posição correta
            const updatedDataList = [...dataList];
            updatedDataList.splice(removedItem.originalIndex, 0, removedItem);

            // Remove o item da lista de líderes selecionados
            const updatedLeaderList = listLeaderEmployeeDataSelectedToReview.filter(
                (item) => item.id !== removedItem.id
            );

            // Atualiza a contagem de participantes selecionados (subtrai 1)
            const updatedEmployeesSelectedAmount = Math.max(employeesSelectedAmount - 1, 0);

            // Disparando as atualizações no estado global
            await dispatch({ type: 'SET_LEADER_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LEADER_ITEMS', payload: updatedRemovedItems });
            await dispatch({ type: 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW', payload: updatedLeaderList });
            await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: updatedEmployeesSelectedAmount });

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
        listEmployeeDataToSelfReview,
        employeesSelectedAmount,
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
                .map((employee, index) => {
                    return {
                        id: (index + 1).toString(),
                        text: `${employee.name} ${employee.lastName}`,
                        employeePairId: employee.id,
                        originalIndex: index,
                    }
                });

            const updatedListPair = {
                ...listPairEmployeeDataToReviewDataSelect,
                [selectedId]: sameDepartmentEmployees,
            };

            const updatedTags = [...selfReviewTagsInput, selectedItem.text];
            const updatedDataList = dataList.filter((item) => item.id !== selectedId);
            const updatedRemovedItems = [...removedLedItems, selectedItem];
            const updatedSelfReviewList = [...listEmployeeDataToSelfReview, selectedItem];

            // Atualiza a contagem de funcionários selecionados
            const updatedEmployeesSelectedAmount = employeesSelectedAmount + 1;

            await dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LED_ITEMS', payload: updatedRemovedItems });

            await dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW', payload: updatedSelfReviewList });
            await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: updatedEmployeesSelectedAmount });

            await dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELECT', payload: updatedListPair });
            await dispatch({ type: 'SET_PAIR_TAGS_INPUT', payload: { lideradoId: selectedId, tags: [] } });
            await dispatch({ type: 'SET_REMOVED_PAIR_ITEMS', payload: { lideradoId: selectedId, items: [] } });
        } catch (error) {
            console.error("Erro ao processar a seleção de liderados:", error);
        }
    }

    async function handleTagLedRemoval(
        indexToRemove,
        lideradoId,
        tagToRemove,
        selfReviewTagsInput,
        removedLedItems,
        dataList,
        pairTagsInput,
        removedPairItems,
        listPairEmployeeDataToReviewDataSelect,
        employeesSelectedAmount,
        dispatch
    ) {
        try {
            if (!tagToRemove || !Array.isArray(removedLedItems)) return;

            // Remove a tag da lista de self-review
            const updatedTags = [
                ...selfReviewTagsInput.slice(0, indexToRemove),
                ...selfReviewTagsInput.slice(indexToRemove + 1)
            ];

            // Recupera o item removido
            const removedItem = removedLedItems[indexToRemove];

            // Remove o item da lista de removidos
            const updatedRemovedItems = [
                ...removedLedItems.slice(0, indexToRemove),
                ...removedLedItems.slice(indexToRemove + 1)
            ];

            // Reinsere o item removido na lista original
            const updatedDataList = [...dataList];

            // 🔥 Verifica se o item já está presente antes de adicionar
            const itemAlreadyExists = updatedDataList.some(item => item.id === removedItem.id);

            if (!itemAlreadyExists) {
                updatedDataList.splice(removedItem.originalIndex, 0, removedItem);
            }

            // Atualiza a contagem de funcionários selecionados (-1)
            const updatedEmployeesSelectedAmount = Math.max(0, employeesSelectedAmount - 1);

            // Remover pares associados ao lideradoId
            const updatedPairTagsInput = { ...pairTagsInput };
            delete updatedPairTagsInput[lideradoId];

            const updatedRemovedPairItems = { ...removedPairItems };
            delete updatedRemovedPairItems[lideradoId];

            // Remover o objeto correspondente em listPairEmployeeDataToReviewDataSelect
            const updatedListPairEmployeeDataToReviewDataSelect = { ...listPairEmployeeDataToReviewDataSelect };
            delete updatedListPairEmployeeDataToReviewDataSelect[lideradoId];

            // Disparando os dispatchs
            await dispatch({ type: 'SET_SELF_REVIEW_TAGS_INPUT', payload: updatedTags });
            await dispatch({ type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW', payload: updatedDataList });
            await dispatch({ type: 'SET_REMOVED_LED_ITEMS', payload: updatedRemovedItems });
            await dispatch({ type: 'SET_ALL_PAIR_TAGS_INPUT', payload: updatedPairTagsInput });
            await dispatch({ type: 'SET_ALL_REMOVED_PAIR_ITEMS', payload: updatedRemovedPairItems });
            await dispatch({ type: 'SET_LIST_EMPLOYEE_DATA_TO_SELECT', payload: updatedListPairEmployeeDataToReviewDataSelect });
            await dispatch({ type: 'SET_EMPLOYEES_SELECTED_AMOUNT', payload: updatedEmployeesSelectedAmount });

        } catch (error) {
            console.error("Erro ao remover tag de liderados:", error);
        }
    }

    async function handlePairSelection(
        lideradoId,
        selectedPairId,
        pairTagsInput,
        removedPairItems,
        listPairEmployeeDataToReviewDataSelect,
        listPairEmployeeDataToReview,
        employeesSelectedAmount,
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
            if (!listPairEmployeeDataToReviewDataSelect || typeof listPairEmployeeDataToReviewDataSelect !== "object") {
                console.error("Erro: listPairEmployeeDataToReviewDataSelect inválido ou ausente.", listPairEmployeeDataToReviewDataSelect);
                return;
            }

            const availablePairs = listPairEmployeeDataToReviewDataSelect[lideradoId] || [];
            const selectedPair = availablePairs.find(item => String(item.id) === String(selectedPairId));

            if (!selectedPair) {
                console.error("Erro: Par selecionado não encontrado para o liderado:", lideradoId);
                return;
            }

            // Atualizando a lista de pares disponíveis
            const updatedAvailablePairs = availablePairs.filter(item => item.id !== selectedPairId);
            const updatedListPairDataSelect = {
                ...listPairEmployeeDataToReviewDataSelect,
                [lideradoId]: updatedAvailablePairs
            };

            // Atualizando os pares já selecionados
            const currentSelectedPairs = listPairEmployeeDataToReview[lideradoId] || [];
            const updatedSelectedPairs = [...currentSelectedPairs, selectedPair];

            // Atualizando as tags de pares
            const currentPairTags = pairTagsInput[lideradoId] || [];
            const updatedPairTags = [...currentPairTags, selectedPair.text];

            // Atualizando os pares removidos
            const currentRemovedPairItems = removedPairItems[lideradoId] || [];
            const updatedRemovedPairItems = [...currentRemovedPairItems, selectedPair];

            // Atualizando a contagem de funcionários selecionados
            const updatedEmployeesSelectedAmount = employeesSelectedAmount + 1;


            await dispatch({
                type: 'SET_LIST_EMPLOYEE_DATA_TO_SELECT',
                payload: updatedListPairDataSelect
            });

            await dispatch({
                type: 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW',
                payload: { lideradoId, pairs: updatedSelectedPairs }
            });

            await dispatch({
                type: 'SET_PAIR_TAGS_INPUT',
                payload: { lideradoId, tags: updatedPairTags }
            });

            await dispatch({
                type: 'SET_REMOVED_PAIR_ITEMS',
                payload: { lideradoId, items: updatedRemovedPairItems }
            });

            await dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload: updatedEmployeesSelectedAmount
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
        employeesSelectedAmount,
        dispatch,
    }) {
        try {
            if (!tagToRemove) {
                console.warn("Nenhuma tag informada para remoção");
                return;
            }

            const currentPairTags = pairTagsInput[lideradoId] || [];
            const updatedPairTags = currentPairTags.filter((tag) => tag !== tagToRemove);

            const currentRemovedItems = removedPairItems[lideradoId] || [];
            const removedItem = currentRemovedItems.find((item) => item.text === tagToRemove);

            if (!removedItem) {
                console.warn("Par removido não encontrado para o liderado", lideradoId);
                return;
            }

            const updatedRemovedItems = currentRemovedItems.filter((item) => item.text !== tagToRemove);

            const currentSelectedPairs = listPairEmployeeDataToReview[lideradoId] || [];
            const updatedSelectedPairs = currentSelectedPairs.filter((item) => item.text !== tagToRemove);

            const currentAvailablePairs = listPairEmployeeDataToReviewDataSelect[lideradoId] || [];
            const updatedAvailablePairs = [...currentAvailablePairs, removedItem]
                .sort((a, b) => a.originalIndex - b.originalIndex);

            //  Atualizar a contagem de funcionários selecionados (-1)
            const updatedEmployeesSelectedAmount = Math.max(0, employeesSelectedAmount - 1);

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

            await dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload: updatedEmployeesSelectedAmount
            });


        } catch (error) {
            console.error("Erro ao remover tag de pares:", error);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
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

    useEffect(() => { }, [
        state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
        state.reviewParticipantsSelectionData.pairTagsInput,
        state.reviewParticipantsSelectionData.removedPairItems,
        state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect
    ]);

    const mockLeader = [
        {
            id: "1",
            name: "Alex",
            lastName: "Doe",
            text: "Alex Doe",
            customerId: 26,
            departmentId: 7,
            isLead: true,
            functionId: null,
            privileges: "3",
            rolesId: 13,
            sector: null,
            status: true
        },
        {
            id: "2",
            name: "Brutus",
            lastName: "Doe",
            text: "Brutus Doe",
            customerId: 26,
            departmentId: 7,
            isLead: true,
            functionId: null,
            privileges: "3",
            rolesId: 13,
            sector: null,
            status: true
        },
    ];

    const mockLedEmployee = [
        {
            id: "3",
            name: "John",
            lastName: "Doe",
            text: "John Doe",
            customerId: 26,
            departmentId: 7,
            isLead: false,
            functionId: null,
            privileges: "2",
            rolesId: 8,
            sector: null,
            status: true,
            headedBy: [
                {
                    leaderId: "1",
                    name: "Alex",
                    lastName: "Doe",
                    text: "Alex Doe",
                    rolesId: 13,
                    departmentId: 7,
                }
            ],
        },
        {
            id: "5",
            name: "James",
            lastName: "Doe",
            text: "James Doe",
            customerId: 26,
            departmentId: 7,
            isLead: false,
            functionId: null,
            privileges: "2",
            rolesId: 8,
            sector: null,
            status: true,
            headedBy: [
                {
                    leaderId: "1",
                    name: "Alex",
                    lastName: "Doe",
                    text: "Alex Doe",
                    rolesId: 13,
                    departmentId: 7,
                },
                {
                    leaderId: "2",
                    name: "Brutus",
                    lastName: "Doe",
                    text: "Brutus Doe",
                    rolesId: 13,
                    departmentId: 7,
                }
            ],
        },
    ];

    useEffect(() => {
        dispatch({
            type: 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW',
            payload: mockLeader,
        });
        dispatch({
            type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW',
            payload: mockLedEmployee,
        });
    }, []);

    // useEffect(() => {
    //     const fetchCompanyNamesAndRoles = async (employees) => {
    //         const updatedEmployees = await Promise.all(
    //             employees.map(async (employee, i) => {
    //                 try {
    //                     const companyData = await useFindClientCompany(employee.customerId);
    //                     const foundEmployeeContract = await useFindEmployeeContractDetails(employee.id);
    //                     const foundRoleName = await useFindRole(foundEmployeeContract.rolesId);
    //                     const foundDepartmentName = await useFindDepartment(foundEmployeeContract.departmentId);
    //                     return {
    //                         ...employee,
    //                         companyName: companyData.companyName,
    //                         departmentName: foundDepartmentName.departmentName,
    //                         roleName: foundRoleName.roleName,
    //                         adimissionDate: foundEmployeeContract.adimissionDate
    //                     };
    //                 } catch (error) {
    //                     console.error(`Error fetching employee data for customerId ${employee.customerId}:`, error);
    //                     return {
    //                         ...employee,
    //                         companyName: 'N/A',
    //                         departmentName: 'N/A',
    //                         roleName: 'N/A',
    //                         adimissionDate: 'N/A'
    //                     };
    //                 }
    //             })
    //         );
    //         dispatch({
    //             type: 'SET_LIST_EMPLOYEE_DATA_TO_REVIEW',
    //             payload: updatedEmployees,
    //         });
    //     };

    //     const fetchEmployees = async () => {
    //         try {
    //             const foundEmployees = await useFindAllEmployee();

    //             await fetchCompanyNamesAndRoles(foundEmployees);

    //             const leaderData = foundEmployees
    //                 .filter((employee) => employee.isLead)
    //                 .map((employee, index) => ({
    //                     id: (index + 1).toString(),
    //                     text: `${employee.name} ${employee.lastName}`,
    //                     employeeLeaderId: employee.id,
    //                     originalIndex: index,
    //                 }));
    //             dispatch({
    //                 type: 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW',
    //                 payload: leaderData,
    //             });

    //             const ledData = foundEmployees
    //                 .filter((employee) => !employee.isLead)
    //                 .map((employee, index) => ({
    //                     id: (index + 1).toString(),
    //                     text: `${employee.name} ${employee.lastName}`,
    //                     originalIndex: index,
    //                     employeeId: employee.id,
    //                     departmentId: employee.departmentId
    //                 }));
    //             dispatch({
    //                 type: 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW',
    //                 payload: ledData,
    //             });
    //         } catch (error) {
    //             console.error('Error fetching employees:', error);
    //         }
    //     }
    //     fetchEmployees();
    // }, []);

    useEffect(() => {
        const handleSetStatusFromCheckedToEmployeeList = async (employees) => {
            const updatedEmployees = employees.map(employee => ({
                ...employee,
                isCheckedToEmployeeList: true,
            }));

            dispatch({
                type: 'SET_LIST_ALL_EMPLOYEE_SELECTED_TO_REVIEW',
                payload: updatedEmployees,
            });

            dispatch({
                type: 'SET_EMPLOYEES_SELECTED_AMOUNT',
                payload: updatedEmployees.length,
            });
        };

        if (state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate) {
            handleSetStatusFromCheckedToEmployeeList(state.reviewParticipantsSelectionData.listEmployeeDataToReview);
        }
    }, [
        state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate,
        state.reviewParticipantsSelectionData.listEmployeeDataToReview,
    ]);

    const isAllChecked = state.reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.every(
        (employee) => employee.isCheckedToEmployeeList
    );

    // Atualiza a quantidade de colaboradores selecionados
    const updateEmployeesSelectedAmount = (updatedList) => {
        const selectedCount = updatedList.filter(employee => employee.isCheckedToEmployeeList).length;
        dispatch({
            type: "SET_EMPLOYEES_SELECTED_AMOUNT",
            payload: selectedCount,
        });
    };

    // Função para alternar o estado do checkbox de um funcionário específico
    const handleToggleEmployeeCheck = (index) => {
        const updatedList = state.reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.map((employee, i) =>
            i === index
                ? { ...employee, isCheckedToEmployeeList: !employee.isCheckedToEmployeeList }
                : employee
        );

        dispatch({
            type: "SET_LIST_ALL_EMPLOYEE_SELECTED_TO_REVIEW",
            payload: updatedList,
        });

        updateEmployeesSelectedAmount(updatedList);
    };

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

    // Salvar no Contexto Global antes de sair
    useEffect(() => {
        const stateParticipants = state.reviewParticipantsSelectionData;
        if (stateParticipants.isAllEmployeesSelectedToParticipate || stateParticipants.isRandomSelectionParticipantsToReview || stateParticipants.isHandPickedSelectionParticipantsToReview) {
            dispatchGlobalReviewReducer({
                type: "UPDATE_REVIEW_PARTICIPANTS",
                payload: state.reviewParticipantsSelectionData,
            });
        };
    }, [state.reviewParticipantsSelectionData, dispatchGlobalReviewReducer]);

    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(state.reviewParticipantsSelectionData);

        if (previousStateRef.current !== currentStateString) {
            previousStateRef.current = currentStateString;
            latestReviewParticipantsSelectionData.current = { ...state.reviewParticipantsSelectionData };
            // Aguarde a atualização do estado antes de salvar
            setTimeout(() => {
                saveDataToLocalStorage(state.reviewParticipantsSelectionData);
            }, 0);
        }
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
                    <h3 className="mb-0">Área de Seleção</h3>
                </CardHeader>
                <CardBody>
                    <div className="mb-4">
                        {/* <Card>
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
                            {
                                state.reviewParticipantsSelectionData.isAllEmployeesSelectedToParticipate &&
                                state.reviewParticipantsSelectionData.listAllEmployeesSelectedToReview &&
                                state.reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.length > 0 && (
                                    <Card>
                                        <CardHeader className="border-0">
                                            <Row>
                                                <Col xs="6">
                                                    <h3 className="mb-0">Participantes</h3>
                                                </Col>
                                            </Row>
                                        </CardHeader>

                                        <Table className="align-items-center table-flush" hover responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                className="custom-control-input"
                                                                id="table-check-all"
                                                                type="checkbox"
                                                                checked={isAllChecked}
                                                                onChange={() => {
                                                                    const newCheckedState = !isAllChecked;

                                                                    // Atualiza todos os funcionários com base no novo estado do checkbox principal
                                                                    const updatedList = state.reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.map((employee) => ({
                                                                        ...employee,
                                                                        isCheckedToEmployeeList: newCheckedState,
                                                                    }));

                                                                    dispatch({
                                                                        type: "SET_LIST_ALL_EMPLOYEE_SELECTED_TO_REVIEW",
                                                                        payload: updatedList,
                                                                    });

                                                                    // Atualiza a quantidade correta de funcionários selecionados
                                                                    dispatch({
                                                                        type: "SET_EMPLOYEES_SELECTED_AMOUNT",
                                                                        payload: newCheckedState ? updatedList.length : 0,
                                                                    });
                                                                }}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="table-check-all"
                                                            />
                                                        </div>
                                                    </th>
                                                    <th>Nome</th>
                                                    <th>Admissão</th>
                                                    <th>Empresa</th>
                                                    <th>Departamento</th>
                                                    <th>Cargo</th>
                                                    <th>Líder</th>
                                                    <th>Nome do Líder</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    state.reviewParticipantsSelectionData.listAllEmployeesSelectedToReview.map((employee, index) => (
                                                        <tr key={index}>
                                                            <th>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input
                                                                        checked={employee.isCheckedToEmployeeList}
                                                                        className="custom-control-input"
                                                                        id={`table-check-${index}`}
                                                                        type="checkbox"
                                                                        onChange={() => handleToggleEmployeeCheck(index)}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`table-check-${index}`}
                                                                    />
                                                                </div>
                                                            </th>
                                                            <td className="table-user">
                                                                <b>{`${employee.name} ${employee.lastName}`}</b>
                                                            </td>
                                                            <td>
                                                                <span className="text-muted">
                                                                    {formatDate(employee.adimissionDate)}
                                                                </span>
                                                            </td>
                                                            <td className="table-user">
                                                                <b>{employee.companyName}</b>
                                                            </td>
                                                            <td className="text-muted">
                                                                <span>{employee.departmentName}</span>
                                                            </td>
                                                            <td className="text-muted">
                                                                <span>{employee.roleName}</span>
                                                            </td>
                                                            <td>
                                                                {
                                                                    employee.isLead ? (
                                                                        <Badge color="success" pill>
                                                                            Sim
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge color="danger" pill>
                                                                            Não
                                                                        </Badge>
                                                                    )
                                                                }
                                                            </td>
                                                            <td className="table-user text-center">
                                                                <b>{employee.LeaderName ? employee.LeaderName : "-"}</b>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </Card>
                                )
                            }
                        </Card> */}
                        {/* <Card>
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
                                                        onClick={() => handleCleanupRandomSelectionRegisteredUsers(dispatch)}
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
                                            Object.keys(state.reviewParticipantsSelectionData.listRandomPairEmployeeDataToReview || {}).length > 0 &&
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
                        </Card> */}
                        <Card>
                            <CardBody>
                                <Row className="align-items-center mb-3">
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Selecionar Participantes
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-3">
                                            Selecione todos os usuários registrados no Skillfy.
                                        </p>
                                        {
                                            state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview &&
                                            state.reviewParticipantsSelectionData.employeesSelectedAmount > 0 && (
                                                <span className="text-muted text-md">
                                                    <span className="font-weigh-bold text-lg text-dark">
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
                                                        onClick={handleHandPickedUnselectParticipantsToReview}
                                                    >
                                                        Remove
                                                    </Button>
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        type="button"
                                                        onClick={() => handleCleanupRandomSelectionRegisteredUsers(dispatch)}
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
                                                                state.reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview,
                                                                state.reviewParticipantsSelectionData.employeesSelectedAmount,
                                                                state.reviewParticipantsSelectionData.listLedEmployeeDataToReview,
                                                                state.reviewParticipantsSelectionData.selfReviewTagsInput,
                                                                state.reviewParticipantsSelectionData.removedLedItems,
                                                                state.reviewParticipantsSelectionData.listEmployeeDataToReview,
                                                                state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                                                                state.reviewParticipantsSelectionData.listEmployeeDataToSelfReview,
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
                                                                state.reviewParticipantsSelectionData.listLeaderEmployeeDataSelectedToReview,
                                                                state.reviewParticipantsSelectionData.employeesSelectedAmount,
                                                                dispatch
                                                            );
                                                        }
                                                    }}
                                                    value={state.reviewParticipantsSelectionData.leaderTagsInput}
                                                    tagProps={{ className: "tag badge mr-1 bg-orange" }}
                                                    inputProps={{
                                                        readOnly: true,
                                                        placeholder: "",
                                                        style: { display: "none" },
                                                    }}
                                                />
                                            </Col>
                                        )
                                    }
                                </Row>
                                {
                                    state.reviewParticipantsSelectionData.selfReviewTagsInput.length > 0 &&
                                    state.reviewParticipantsSelectionData.removedLedItems.length > 0 &&
                                    state.reviewParticipantsSelectionData.isHandPickedSelectionParticipantsToReview && (
                                        <div>
                                            <label className="form-control-label" htmlFor="validationReviewName">
                                                Liderados
                                            </label>
                                            {state.reviewParticipantsSelectionData.selfReviewTagsInput.map((tag, index) => {
                                                const led = state.reviewParticipantsSelectionData.removedLedItems[index];
                                                if (!led) return null;
                                                const ledId = led.id;
                                                const currentPairItems = state.reviewParticipantsSelectionData.removedPairItems[ledId] || [];
                                                return (
                                                    <Row key={ledId} className="align-items-center mb-3">
                                                        <Col className="d-flex flex-column align-items-start justify-content-start mb-2" md="2">
                                                            <TagsInput
                                                                onlyUnique
                                                                className="bootstrap-tagsinput"
                                                                onChange={async (updatedTags) => {
                                                                    if (updatedTags.length < state.reviewParticipantsSelectionData.selfReviewTagsInput.length) {
                                                                        await handleTagLedRemoval(
                                                                            index,
                                                                            ledId,
                                                                            tag,
                                                                            state.reviewParticipantsSelectionData.selfReviewTagsInput,
                                                                            state.reviewParticipantsSelectionData.removedLedItems,
                                                                            state.reviewParticipantsSelectionData.listLedEmployeeDataToReview,
                                                                            state.reviewParticipantsSelectionData.pairTagsInput,
                                                                            state.reviewParticipantsSelectionData.removedPairItems,
                                                                            state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                                                                            state.reviewParticipantsSelectionData.employeesSelectedAmount,
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

                                                        {/* <Col className="mb-2" md="4">
                                                            <label className="form-control-label" htmlFor={`handPickedPairsSelectionInput-${lideradoId}`}>
                                                                Selecionar pares
                                                            </label>
                                                            <Select2
                                                                id={`handPickedPairsSelectionInput-${lideradoId}`}
                                                                className="form-control"
                                                                data-minimum-results-for-search="Infinity"
                                                                options={{ placeholder: "Selecionar usuários:" }}
                                                                data={
                                                                    lideradoId &&
                                                                        state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect[lideradoId]
                                                                        ? state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect[lideradoId].map(
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
                                                                            state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
                                                                            state.reviewParticipantsSelectionData.employeesSelectedAmount,
                                                                            dispatch
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </Col>

                                                        <Col className="d-flex flex-column align-items-start justify-content-start mb-3" md="6">
                                                            <label className="form-control-label" htmlFor={`pairTags-${lideradoId}`}>
                                                                Pares para {liderado.text}
                                                            </label>
                                                            <TagsInput
                                                                onlyUnique
                                                                className="bootstrap-tagsinput"
                                                                value={currentPairItems.map(pair => pair.text)}
                                                                onChange={async (updatedTags) => {
                                                                    const removedTagItem = currentPairItems.find(pair => !updatedTags.includes(pair.text));
                                                                    if (removedTagItem) {
                                                                        await handleTagPairRemoval({
                                                                            lideradoId,
                                                                            tagToRemove: removedTagItem.text,
                                                                            pairTagsInput: state.reviewParticipantsSelectionData.pairTagsInput,
                                                                            removedPairItems: state.reviewParticipantsSelectionData.removedPairItems,
                                                                            listPairEmployeeDataToReviewDataSelect: state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                                                                            listPairEmployeeDataToReview: state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
                                                                            employeesSelectedAmount: state.reviewParticipantsSelectionData.employeesSelectedAmount,
                                                                            dispatch,
                                                                        });
                                                                    }
                                                                }}
                                                                tagProps={{ className: "tag badge mr-1 bg-default" }}
                                                                inputProps={{ readOnly: true, placeholder: "", style: { display: "none" } }}
                                                            />
                                                        </Col> */}
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
                                                                Object.keys(state.reviewParticipantsSelectionData.listRandomPairEmployeeDataToReview || {}).length > 0 &&
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
                                                );
                                            })}
                                        </div>
                                    )}
                            </CardBody>
                        </Card>
                    </div>
                </CardBody>
            </Card>
        </Form >
    );
}