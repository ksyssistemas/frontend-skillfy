export const initialStateReviewModelAndDeadlineForm = {
    reviewModelData: {
        hasPerformanceReviewOfLeaders: true,
        deadlineToLeadersToRespondToPerformanceReview: '',
        deadlineToLeadersToRespondToPerformanceReviewState: '',
        hasSelfReviewOfPerformance: true,
        deadlineToRespondToPerformanceSelfReview: '',
        deadlineToRespondToPerformanceSelfReviewState: '',
        hasPerformanceReviewOfEvaluators: true,
        deadlineToEvaluatorsToRespondToPerformanceReview: '',
        deadlineToEvaluatorsToRespondToPerformanceReviewState: '',
        weightOfPerformanceReviewOfLeaders: 98,
        weightOfSelfReviewOfPerformance: 1,
        weightOfEvaluatorsPerformanceReview: 1,
        isFullPerformanceReviewWeigth: null,
    },
};

export const reviewModelAndDeadlineFormReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_REVIEW_DATA':
            return {
                ...state,
                reviewModelData: { ...action.payload },
            };
        case 'LOAD_SAVED_REVIEW_DATA':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    ...action.payload,
                },
            };
        case 'RESET_REVIEW_DATA':
            return initialStateReviewModelAndDeadlineForm;
        case 'SET_HAS_PERFORMANCE_REVIEW_OF_LEADERS':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    hasPerformanceReviewOfLeaders: action.payload,
                },
            };
        case 'SET_DEADLINE_TO_LEADERS_TO_RESPOND_TO_PERFORMANCE_REVIEW':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    deadlineToLeadersToRespondToPerformanceReview: action.payload,
                },
            };
        case 'SET_DEADLINE_TO_LEADERS_TO_RESPOND_TO_PERFORMANCE_REVIEW_STATE':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    deadlineToLeadersToRespondToPerformanceReviewState: action.payload
                },
            };
        case 'SET_HAS_SELF_REVIEW_OF_PERFORMANCE':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    hasSelfReviewOfPerformance: action.payload,
                },
            };
        case 'SET_DEADLINE_TO_RESPOND_TO_PERFORMANCE_SELF_REVIEW':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    deadlineToRespondToPerformanceSelfReview: action.payload,
                },
            };
        case 'SET_DEADLINE_TO_RESPOND_TO_PERFORMANCE_SELF_REVIEW_STATE':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    deadlineToRespondToPerformanceSelfReviewState: action.payload
                },
            };
        case 'SET_HAS_PERFORMANCE_REVIEW_OF_EVALUATORS':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    hasPerformanceReviewOfEvaluators: action.payload,
                },
            };
        case 'SET_DEADLINE_TO_EVALUATORS_TO_RESPOND_TO_PERFORMANCE_REVIEW':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    deadlineToEvaluatorsToRespondToPerformanceReview: action.payload,
                },
            };
        case 'SET_DEADLINE_TO_EVALUATORS_TO_RESPOND_TO_PERFORMANCE_REVIEW_STATE':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    deadlineToEvaluatorsToRespondToPerformanceReviewState: action.payload
                },
            };
        case 'SET_WEIGHT_SLIDER_OF_PERFORMANCE_REVIEW_OF_LEADERS':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    weightOfPerformanceReviewOfLeaders: action.payload,
                },
            };
        case 'SET_WEIGHT_SLIDER_OF_SELF_REVIEW_OF_PERFORMANCE':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    weightOfSelfReviewOfPerformance: action.payload,
                },
            };
        case 'SET_WEIGHT_SLIDER_OF_EVALUATORS_PERFORMANCE_REVIEW':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    weightOfEvaluatorsPerformanceReview: action.payload,
                },
            };
        case 'SET_IS_FULL_PERFORMANCE_REVIEW_WEIGHT':
            return {
                ...state,
                reviewModelData: {
                    ...state.reviewModelData,
                    isFullPerformanceReviewWeigth: action.payload,
                },
            };
        case 'CLEAR_FORM':
            return initialStateReviewModelAndDeadlineForm;

        default:
            return state;
    }
};