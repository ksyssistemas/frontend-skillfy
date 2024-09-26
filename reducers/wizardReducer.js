const ActionTypes = {
    NEXT_STEP: 'NEXT_STEP',
    PREV_STEP: 'PREV_STEP',
    VALIDATE_STEP: 'VALIDATE_STEP',
};

export function wizardReducer(state, action) {
    switch (action.type) {
        case ActionTypes.NEXT_STEP: {
            if (state.currentStep < state.stepsNumber) {
                return { ...state, currentStep: state.currentStep + 1 };
            }
            return state;
        }
        case ActionTypes.PREV_STEP: {
            if (state.currentStep > 1) {
                return { ...state, currentStep: state.currentStep - 1 };
            }
            return state;
        }
        case ActionTypes.VALIDATE_STEP: {
            let isValid = false;

            switch (state.currentStep) {
                case 1:
                    isValid = handleValidateAddPerformanceReviewForm();
                    break;
                case 2:
                    isValid = handleValidateAddReviewModelAndDeadlineForm();
                    break;
                case 3:
                    isValid = handleValidateAddReviewScaleAndCriteriaForm();
                    break;
                case 4:
                    isValid = handleValidateAddReviewCreationSetupForm();
                    break;
                case 5:
                    isValid = handleValidateAddReviewParticipantSelectionForm();
                    break;
                default:
                    isValid = true;
            }

            return isValid ? { ...state, isValidStep: true } : { ...state, isValidStep: false };
        }
        default:
            return state;
    }
}
