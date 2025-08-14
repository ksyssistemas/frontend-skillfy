import { handleSelectionEmploymentContractData } from "./handleSelectionEmploymentContractData";

export function handleSelectionEmploymentContractDataWithReducer(
        dispatch,
        selectedId,
        dataList,
        setSelectedAction,
        setFieldAction,
        setStateAction,
        setSelectedDepartmentIdAction = null,
        setHasDepartmentSelectedAction = null,
        savedDataType = 'id'
    ) {
        // Despache o estado 'valid' antes de iniciar o processo de seleção
        if (setStateAction) dispatch({ type: setStateAction, payload: 'valid' });
        if (setHasDepartmentSelectedAction) dispatch({ type: setHasDepartmentSelectedAction, payload: true });
        // Chama a função de processamento de seleção de dados
        handleSelectionEmploymentContractData(
            selectedId,
            dataList,
            (value) => dispatch({ type: setSelectedAction, payload: value }),
            (value) => dispatch({ type: setFieldAction, payload: value }), // Agora definirá o valor correto
            (state) => dispatch({ type: setStateAction, payload: state }),
            (id) => dispatch({ type: setSelectedDepartmentIdAction, payload: id }),
            () => dispatch({ type: setHasDepartmentSelectedAction, payload: true }),
            savedDataType
        );
    };