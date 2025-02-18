export const initialStateReviewIdentityForm = {
    reviewIdentityData: {
        reviewName: '',
        reviewNameState: null,
        reviewObjective: '',
        reviewObjectiveState: null,
        isIntercurrentReviewCycle: false,
        isIntercurrentReviewCycleState: null,
        isUserDefinedDateToReview: false,
        isUserDefinedDateToReviewState: null,
        startDate: '',
        startDateState: null,
        endDate: '',
        endDateState: null,
        reviewCycle: '',
        reviewCycleState: null,
        selectedCycle: '',
        selectedPeriod: '',
        selectedDateOnReviewWasCarriedOut: '',
        reviewCycleDataList: [
            { id: "1", text: "Intercorrente" },
            { id: "2", text: "Anual" },
            { id: "3", text: "Semestral" },
            { id: "4", text: "Trimestral" },
            { id: "5", text: "Mensal" },
            { id: "6", text: "Quinzenal" },
        ],
        reviewPeriod: '',
        reviewPeriodState: null,
        reviewPeriodDataList: [
            { id: "1", text: "Anual" },
            { id: "2", text: "Semestral" },
            { id: "3", text: "Trimestral" },
            { id: "4", text: "Mensal" },
            { id: "5", text: "Quinzenal" },
        ],
        reviewDate: '',
        reviewDateState: null,
        dateOnReviewWasCarriedOutDataList: [
            { id: "1", text: "Data de Admissão" },
            { id: "2", text: "Data de Aniversário" },
            { id: "3", text: "Definir uma Data" },
        ],
        realizationDate: '',
        realizationDateState: null,
        isReviewCyclePerPeriod: null,
    },
};

export const reviewIdentityFormReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_REVIEW_DATA':
            return {
                ...state,
                reviewIdentityData: { ...action.payload },
            };
        case 'LOAD_SAVED_REVIEW_DATA':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    ...action.payload,
                },
            };
        case 'RESET_REVIEW_DATA':
            return initialStateReviewIdentityForm;
        case 'SET_REVIEW_NAME':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewName: action.payload,
                },
            };
        case 'SET_REVIEW_NAME_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewNameState: action.payload
                },
            };
        case 'SET_REVIEW_OBJECTIVE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewObjective: action.payload,
                },
            };
        case 'SET_REVIEW_OBJECTIVE_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewObjectiveState: action.payload,
                },
            };
        case 'SET_IS_INTERCURRENT_REVIEW_CYCLE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    isIntercurrentReviewCycle: action.payload,
                },
            };
        case 'SET_IS_INTERCURRENT_REVIEW_CYCLE_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    isIntercurrentReviewCycleState: action.payload,
                },
            };
        case 'SET_IS_USER_DEFINED_DATE_TO_REVIEW':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    isUserDefinedDateToReview: action.payload,
                },
            };
        case 'SET_IS_USER_DEFINED_DATE_TO_REVIEW_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    isUserDefinedDateToReviewState: action.payload,
                },
            };
        case 'SET_START_DATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    startDate: action.payload,
                },
            };
        case 'SET_START_DATE_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    startDateState: action.payload,
                },
            };
        case 'SET_END_DATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    endDate: action.payload,
                },
            };
        case 'SET_END_DATE_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    endDateState: action.payload,
                },
            };
        case 'SET_REALIZATION_DATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    realizationDate: action.payload,
                },
            };
        case 'SET_REALIZATION_DATE_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    realizationDateState: action.payload,
                },
            };
        case 'SET_REVIEW_CYCLE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewCycle: action.payload,
                },
            };
        case 'SET_REVIEW_CYCLE_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewCycleState: action.payload,
                },
            };
        case 'SET_SELECTED_CYCLE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    selectedCycle: action.payload
                },
            };
        case 'SET_SELECTED_PERIOD':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    selectedPeriod: action.payload,
                },
            };
        case 'SET_SELECTED_DATE_ON_REVIEW_WAS_CARRIED_OUT':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    selectedDateOnReviewWasCarriedOut: action.payload,
                },
            };
        case 'SET_REVIEW_PERIOD':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewPeriod: action.payload,
                },
            };
        case 'SET_REVIEW_PERIOD_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewPeriodState: action.payload,
                },
            };
        case 'SET_REVIEW_DATE':
            console.log("action.payload: ", action.payload);
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewDate: action.payload,
                },
            };
        case 'SET_REVIEW_DATE_STATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewDateState: action.payload,
                },
            };
        case 'SET_IS_REVIEW_CYCLE_PER_PERIOD':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    isReviewCyclePerPeriod: action.payload,
                },
            };
        case 'SET_REVIEW_CYCLE_DATA_LIST':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewCycleDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_REVIEW_PERIOD_DATA_LIST':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewPeriodDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_DATA_ON_REVIEW_WAS_CARRIEF_OUT_DATA_LIST':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    dateOnReviewWasCarriedOutDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'RESET_START_DATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    startDate: initialStateReviewIdentityForm.reviewIdentityData.startDate
                }
            };
        case 'RESET_END_DATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    endDate: initialStateReviewIdentityForm.reviewIdentityData.endDate
                }
            };
        case 'RESET_REVIEW_PERIOD':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    selectedPeriod: initialStateReviewIdentityForm.reviewIdentityData.selectedPeriod
                }
            };
        case 'RESET_DATE_ON_REVIEW_WAS_CARRIED_OUT':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    selectedDateOnReviewWasCarriedOut: initialStateReviewIdentityForm.reviewIdentityData.selectedDateOnReviewWasCarriedOut
                }
            };
        case 'RESET_REVIEW_DATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    reviewDate: initialStateReviewIdentityForm.reviewIdentityData.reviewDate
                }
            };
        case 'RESET_REALIZATION_DATE':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    realizationDate: initialStateReviewIdentityForm.reviewIdentityData.realizationDate
                }
            };
        default:
            return state;
    }
};