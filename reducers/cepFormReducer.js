export const initialStateCEPForm = {
    cepData: {
        zipCode: '',
        zipCodeState: null,
        brasilAPICEPData: null,
        loadingCEPValidation: false,
        errorCEPValidation: null,
        hasValuesChangedWithAPIDataCEP: false
    }
}

export const cepFormReducer = (state, action) => {
    switch (action.type) {
        case 'RESET_CEP_DATA':
            return initialStateCEPForm;
        case 'SET_ZIP_CODE':
            return {
                ...state,
                cepData: {
                    ...state.cepData,
                    zipCode: action.payload,
                },
            };
        case 'SET_ZIP_CODE_STATE':
            return {
                ...state,
                cepData: {
                    ...state.cepData,
                    zipCodeState: action.payload,
                },
            };
        case 'SET_BRASIL_API_CEP_DATA':
            return {
                ...state,
                cepData: {
                    ...state.cepData,
                    brasilAPICEPData: action.payload,
                },
            };
        case 'SET_LOADING_CEP_VALIDATION':
            return {
                ...state,
                cepData: {
                    ...state.cepData,
                    loadingCEPValidation: action.payload,
                },
            };
        case 'SET_ERROR_CEP_VALIDATION':
            return {
                ...state,
                cepData: {
                    ...state.cepData,
                    errorCEPValidation: action.payload,
                },
            };
        case 'SET_HAS_VALUES_CHANGED_WITH_CEP_API_DATA':
            return {
                ...state,
                cepData: {
                    ...state.cepData,
                    hasValuesChangedWithAPIDataCEP: action.payload,
                },
            };
        default:
            return state;
    }
};