export const initialStateReviewGenerationSetupForm = {
    reviewGenerationSetupData: {
        autoSendEmailNotifications: false,
        evaluatorCommentsOnMandatoryCriteria: false,
        appraiseeCommentsOnMandatoryCriteria: false,
        editAnswersOnReviewsCarriedOut: false,
        reportFeedbackStatus: false,
        reportFeedbackStatusToManager: false,
        reportFeedbackStatusToParticipants: false,
        autoSendReviewResultsToManagers: false,
        applyLeadershipCriteriaToUser: false,
        applyLeadershipCriteriaToUserManagers: false,
        applyLeadershipCriteriaToUserParticipants: false,
        participantsResultsToManagersPreview: false,
        conceptualResults: false
    },
};

export const reviewGenerationSetupFormReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_REVIEW_DATA':
            return {
                ...state,
                reviewGenerationSetupData: { ...action.payload },
            };
        case 'LOAD_SAVED_REVIEW_DATA':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    ...action.payload,
                },
            };
        case 'SET_AUTO_SEND_EMAIL_NOTIFICATIONS':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    autoSendEmailNotifications: action.payload,
                },
            };
        case 'SET_EVALUATOR_COMMENTS_ON_MANDATORY_CRITERIA':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    evaluatorCommentsOnMandatoryCriteria: action.payload,
                },
            };
        case 'SET_APPRAISEE_COMMENTS_ON_MANDATORY_CRITERIA':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    appraiseeCommentsOnMandatoryCriteria: action.payload,
                },
            };
        case 'SET_EDIT_ANSWERS_ON_REVIEWS_CARRIED_OUT':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    editAnswersOnReviewsCarriedOut: action.payload,
                },
            };
        case 'SET_REPORT_FEEDBACK_STATUS':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    reportFeedbackStatus: action.payload,
                },
            };
        case 'SET_REPORT_FEEDBACK_STATUS_TO_MANAGER':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    reportFeedbackStatusToManager: action.payload,
                },
            };
        case 'SET_REPORT_FEEDBACK_STATUS_TO_PARTICIPANTS':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    reportFeedbackStatusToParticipants: action.payload,
                },
            };
        case 'SET_AUTO_SEND_REVIEW_RESULTS_TO_MANAGERS':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    autoSendReviewResultsToManagers: action.payload,
                },
            };
        case 'SET_APPLY_LEADERSHIP_CRITERIA_TO_USER':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    applyLeadershipCriteriaToUser: action.payload,
                },
            };
        case 'SET_APPLY_LEADERSHIP_CRITERIA_TO_USER_MANAGERS':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    applyLeadershipCriteriaToUserManagers: action.payload,
                },
            };
        case 'SET_APPLY_LEADERSHIP_CRITERIA_TO_USER_PARTICIPANTS':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    applyLeadershipCriteriaToUserParticipants: action.payload,
                },
            };
        case 'SET_PARTICIPANTS_RESULTS_TO_MANAGERS_PREVIEW':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    participantsResultsToManagersPreview: action.payload,
                },
            };
        case 'SET_CONCEPTUAL_RESULTS':
            return {
                ...state,
                reviewGenerationSetupData: {
                    ...state.reviewGenerationSetupData,
                    conceptualResults: action.payload,
                },
            };
        case 'RESET_REVIEW_DATA':
            return initialStateReviewGenerationSetupForm;
        default:
            return state;
    }
};