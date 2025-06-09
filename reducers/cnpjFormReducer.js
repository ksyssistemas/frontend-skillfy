export const initialStateCNPJForm = {
    cnpjData: {
        individualEmployerIdNumber: "",
        individualEmployerIdNumberState: null,
        brasilAPICNPJData: null,
        loadingCNPJValidation: false,
        errorCNPJValidation: null,
        hasValuesChangedWithCNPJAPIData: false
    }
}

export const cnpjFormReducer = (state, action) => {
    switch (action.type) {
        case 'RESET_CNPJ_DATA':
            return initialStateCNPJForm;
        case 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER':
            return {
                ...state,
                cnpjData: {
                    ...state.cnpjData,
                    individualEmployerIdNumber: action.payload,
                },
            };
        case 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER_STATE':
            return {
                ...state,
                cnpjData: {
                    ...state.cnpjData,
                    individualEmployerIdNumberState: action.payload,
                },
            };
        case 'SET_BRASIL_API_CNPJ_DATA':
            return {
                ...state,
                cnpjData: {
                    ...state.cnpjData,
                    brasilAPICNPJData: action.payload,
                },
            };
        case 'SET_LOADING_CNPJ_VALIDATION':
            return {
                ...state,
                cnpjData: {
                    ...state.cnpjData,
                    loadingCNPJValidation: action.payload,
                },
            };
        case 'SET_ERROR_CNPJ_VALIDATION':
            return {
                ...state,
                cnpjData: {
                    ...state.cnpjData,
                    errorCNPJValidation: action.payload,
                },
            };
        case 'SET_HAS_VALUES_CHANGED_WITH_CNPJ_API_DATA':
            return {
                ...state,
                cnpjData: {
                    ...state.cnpjData,
                    hasValuesChangedWithCNPJAPIData: action.payload,
                },
            };
        default:
            return state;
    }
};