export const initialStateReviewParticipantsSelectionForm = {
    reviewParticipantsSelectionData: {
        isAllEmployeesSelectedToParticipate: false,
        listAllEmployeesSelectedToReview: [],

        listEmployeeDataToReview: [],

        listLeaderEmployeeDataToReview: [],
        listLeaderEmployeeDataToReviewState: '',

        listLedEmployeeDataToReview: [],
        listLedEmployeeDataToReviewState: '',

        employeesSelectedAmount: 0,

        isRandomSelectionParticipantsToReview: false,
        isShouldPresentParticipantSelectionButtons: false,

        isSholdPresentNamesSelectedLeaders: false,
        isSholdPresentNamesSelectedSelfReview: false,
        isSholdPresentNamesSelectedPairs: false,

        leadersNumberToDrawn: 0,
        selfReviewsNumberToDrawn: 0,
        pairsNumberToDrawn: 0,

        listLeaderEmployeeDataSelectedToReview: [],
        listLeaderEmployeeDataSelectedToReviewState: '',
        leaderTagsInput: [],
        removedLeaderItems: [],

        listEmployeeDataToSelfReview: [],
        listEmployeeDataToSelfReviewState: '',
        selfReviewTagsInput: [],
        removedLedItems: [],

        listRandomPairEmployeeDataToReview: {},
        listRandomPairEmployeeDataToReviewState: '',
        randomPairTagsInput: {},
        removedRandomPairItems: {},

        listPairEmployeeDataToReview: {},
        listPairEmployeeDataToReviewState: '',
        pairTagsInput: {},
        removedPairItems: {},

        listPairEmployeeDataToReviewDataSelect: {},

        isHandPickedSelectionParticipantsToReview: false,

    },
};

export const reviewParticipantsSelectionFormReducer = (state, action) => {
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
            return initialStateReviewParticipantsSelectionForm;
        case 'SET_ALL_EMPLOYEE_SELECTED':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    isAllEmployeesSelectedToParticipate: action.payload,
                },
            };
        case 'SET_LIST_ALL_EMPLOYEE_SELECTED_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listAllEmployeesSelectedToReview: action.payload,
                },
            };
        case 'SET_LIST_EMPLOYEE_DATA_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listEmployeeDataToReview: action.payload,
                },
            };
        case 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listLeaderEmployeeDataToReview: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_LIST_LEADER_EMPLOYEE_DATA_TO_REVIEW_STATE':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listLeaderEmployeeDataToReviewState: action.payload,
                },
            };
        case 'SET_LIST_LED_EMPLOYEE_DATA_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listLedEmployeeDataToReview: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_EMPLOYEES_SELECTED_AMOUNT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    employeesSelectedAmount: action.payload,
                },
            };
        case 'SET_RANDOM_SELECTION_PARTICIPANTS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    isRandomSelectionParticipantsToReview: action.payload,
                },
            };
        case 'SET_SHOULD_PRESENT_PARTICIPANT_SELECTION_BUTTONS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    isShouldPresentParticipantSelectionButtons: action.payload,
                },
            };

        case 'SET_SHOULD_PRESENT_NAMES_SELECTED_LEADERS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    isSholdPresentNamesSelectedLeaders: action.payload,
                },
            };
        case 'SET_SHOULD_PRESENT_NAMES_SELECTED_SELF_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    isSholdPresentNamesSelectedSelfReview: action.payload,
                },
            };
        case 'SET_SHOULD_PRESENT_NAMES_SELECTED_PAIRS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    isSholdPresentNamesSelectedPairs: action.payload,
                },
            };
        case 'SET_LEADERS_NUMBER_TO_DRAWN':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    leadersNumberToDrawn: action.payload,
                },
            };
        case 'SET_SELF_REVIEW_NUMBER_TO_DRAWN':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selfReviewsNumberToDrawn: action.payload,
                },
            };
        case 'SET_PAIRS_NUMBER_TO_DRAWN':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    pairsNumberToDrawn: action.payload,
                },
            };
        case 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listLeaderEmployeeDataSelectedToReview: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_LIST_LEADER_EMPLOYEE_DATA_SELECTED_TO_REVIEW_STATE_STATE':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listLeaderEmployeeDataSelectedToReviewState: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_LEADER_TAGS_INPUT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    leaderTagsInput: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_REMOVED_LEADER_ITEMS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    removedLeaderItems: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listEmployeeDataToSelfReview: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_LIST_EMPLOYEE_DATA_TO_SELF_REVIEW_STATE':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listEmployeeDataToSelfReviewState: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_SELF_REVIEW_TAGS_INPUT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selfReviewTagsInput: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_REMOVED_LED_ITEMS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    removedLedItems: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_LIST_RANDOM_PAIR_EMPLOYEE_DATA_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listRandomPairEmployeeDataToReview: action.payload,
                },
            };
        case 'SET_LIST_RANDOM_PAIR_EMPLOYEE_DATA_TO_REVIEW_STATE':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listRandomPairEmployeeDataToReviewState: action.payload,
                },
            };
        case 'SET_RANDOM_PAIR_TAGS_INPUT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    randomPairTagsInput: {
                        ...state.reviewParticipantsSelectionData.pairTagsInput,
                        ...action.payload,
                    },
                },
            };
        case 'SET_REMOVED_RANDOM_PAIR_ITEMS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    removedRandomPairItems: {
                        ...state.reviewParticipantsSelectionData.removedPairItems,
                        ...action.payload,
                    },
                },
            };
        case 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listPairEmployeeDataToReview: {
                        ...state.reviewParticipantsSelectionData.listPairEmployeeDataToReview,
                        [action.payload.lideradoId]: action.payload.pairs,
                    },
                },
            };
        case 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW_STATE':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listPairEmployeeDataToReviewState: action.payload,
                },
            };
        case 'SET_PAIR_TAGS_INPUT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    pairTagsInput: {
                        ...state.reviewParticipantsSelectionData.pairTagsInput,
                        [action.payload.lideradoId]: action.payload.tags,
                    },
                },
            };
        case 'SET_REMOVED_PAIR_ITEMS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    removedPairItems: {
                        ...state.reviewParticipantsSelectionData.removedPairItems,
                        [action.payload.lideradoId]: action.payload.items,
                    },
                },
            };
        case 'SET_HAND_PICKED_SELECTION_PARTICIPANTS_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    isHandPickedSelectionParticipantsToReview: action.payload,
                },
            };
        case 'SET_LIST_EMPLOYEE_DATA_TO_SELECT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listPairEmployeeDataToReviewDataSelect: {
                        ...state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                        ...action.payload,
                    },
                },
            };
        case 'SET_LIST_PAIR_EMPLOYEE_DATA_TO_SELECT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listPairEmployeeDataToReviewDataSelect: {
                        ...state.reviewParticipantsSelectionData.listPairEmployeeDataToReviewDataSelect,
                        [action.payload.lideradoId]: action.payload.pairs,
                    },
                },
            };
        case 'SET_ALL_PAIR_TAGS_INPUT':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    pairTagsInput: action.payload,
                },
            };

        case 'SET_ALL_REMOVED_PAIR_ITEMS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    removedPairItems: action.payload,
                },
            };

        case 'SET_ALL_LIST_PAIR_EMPLOYEE_DATA_TO_REVIEW':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    listPairEmployeeDataToReview: action.payload,
                },
            };
        default:
            return state;
    }
};