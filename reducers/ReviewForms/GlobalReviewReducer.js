import { initialStateReviewIdentityForm } from '../../reducers/ReviewForms/ReviewIdentityFormReducer';
import { initialStateReviewModelAndDeadlineForm } from '../../reducers/ReviewForms/ReviewModelAndDeadlineFormReducer';
import { initialStateReviewScaleAndCriteriaForm } from '../../reducers/ReviewForms/ReviewScaleAndCriteriaFormReducer';
import { initialStateReviewGenerationSetupForm } from '../../reducers/ReviewForms/ReviewCreationSetupFormReducer';
import { initialStateReviewParticipantsSelectionForm } from '../../reducers/ReviewForms/ReviewParticipantSelectionFormReducer';

const initialState = {
    reviewIdentityData: initialStateReviewIdentityForm.reviewIdentityData,
    reviewModelData: initialStateReviewModelAndDeadlineForm.reviewModelData,
    reviewScaleAndCriteriaData: initialStateReviewScaleAndCriteriaForm.reviewScaleAndCriteriaData,
    reviewGenerationSetupData: initialStateReviewGenerationSetupForm.reviewGenerationSetupData,
    reviewParticipantsSelectionData: initialStateReviewParticipantsSelectionForm.reviewParticipantsSelectionData,
};

function globalReviewReducer(state, action) {
    switch (action.type) {
        case "UPDATE_REVIEW_IDENTITY":
            return { ...state, reviewIdentityData: action.payload };
        case "UPDATE_REVIEW_MODEL":
            return { ...state, reviewModelData: action.payload };
        case "UPDATE_REVIEW_SCALE_CRITERIA":
            return { ...state, reviewScaleAndCriteriaData: action.payload };
        case "UPDATE_REVIEW_SETUP":
            return { ...state, reviewGenerationSetupData: action.payload };
        case "UPDATE_REVIEW_PARTICIPANTS":
            return { ...state, reviewParticipantsSelectionData: action.payload };
        case "RESET_ALL":
            return initialState;
        default:
            return state;
    }
}

export { globalReviewReducer, initialState };