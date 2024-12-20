export const initialState = {
    reviewScaleAndCriteriaData: {
        rulerTypeDataList: [
            { id: "1", text: "Conceitual" },
            { id: "2", text: "Numérica" },
            { id: "3", text: "Percentual" },
            { id: "4", text: "Cor" },
            { id: "5", text: "Emoji" },
        ],
        selectedRulerType: '',
        employeeContractType: null,
        employeeContractTypeState: '',
        showSelectRulerOptionsButton: false,
        rulerOptionData: [],
        rulerOptionSelected: null,
        performanceReviewRulerTypeSelected: null,
        performanceReviewRulerOptionSelected: null,
        performanceReviewRulerOptionSelectedState: null,
    },
};

export const formReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_REVIEW_DATA':
            return {
                ...state,
                reviewScaleAndCriteriaData: { ...action.payload },
            };
        case 'LOAD_SAVED_REVIEW_DATA':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    ...action.payload,
                },
            };
        case 'RESET_REVIEW_DATA':
            return initialState;
        case 'SET_EMPLOYEE_CONTRACT_TYPE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    employeeContractType: action.payload,
                },
            };
        case 'SET_EMPLOYEE_CONTRACT_TYPE_STATE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    employeeContractTypeState: action.payload,
                },
            };
        case 'SET_SELECTED_RULER_TYPE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    selectedRulerType: action.payload
                },
            };
        case 'RESET_SELECTED_RULER_TYPE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    selectedRulerType: initialState.reviewScaleAndCriteriaData.selectedRulerType
                }
            };
        case 'SET_SHOW_SELECT_RULER_OPTIONS_BUTTON':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    showSelectRulerOptionsButton: action.payload,
                },
            };

        case 'SET_PERFORMANCE_REVIEW_RULER_TYPE_SELECTED':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    performanceReviewRulerTypeSelected: action.payload,
                },
            };
        case 'SET_PERFORMANCE_REVIEW_RULER_OPTION_SELECTED':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    performanceReviewRulerOptionSelected: action.payload,
                },
            };
        case 'SET_PERFORMANCE_REVIEW_RULER_OPTION_SELECTED_STATE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    performanceReviewRulerOptionSelectedState: action.payload,
                },
            };
        case 'SET_RULER_TYPE_DATA_LIST':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    rulerTypeDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_RULER_OPTION_DATA_LIST':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    rulerOptionData: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_RULER_OPTION_SELECTED_LIST':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    rulerOptionSelected: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'CLEAR_FORM':
            return initialState;

        default:
            return state;
    }
};