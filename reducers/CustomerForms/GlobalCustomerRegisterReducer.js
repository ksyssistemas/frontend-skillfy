import { initialStateIndividualRegistrationForm, individualRegistrationFormReducer } from '../CustomerForms/IndividualRegistrationFormReducer';
import { initialStateLegalEntityRegistrationForm } from '../CustomerForms/LegalEntityRegistrationFormReducer';
import { initialStateCNPJForm } from '../cnpjFormReducer';
import { initialStateCEPForm } from '../cepFormReducer';
import { initialStateReviewScaleAndCriteriaForm } from '../ReviewForms/ReviewScaleAndCriteriaFormReducer';

const initialState = {
    individualRegistrationData: initialStateIndividualRegistrationForm.individualRegistrationData,
    legalEntityRegistrationData: initialStateLegalEntityRegistrationForm.legalEntityRegistrationData,
    cnpjData: initialStateCNPJForm.cnpjData,
    cepData: initialStateCEPForm.cepData,
    reviewScaleAndCriteriaData: initialStateReviewScaleAndCriteriaForm.reviewScaleAndCriteriaData,
};

function globalCustomerRegisterReducer(state, action) {
    if (action.type.startsWith("INDIVIDUAL_")) {
        const updatedIndividual = individualRegistrationFormReducer(
            { individualRegistrationData: state.individualRegistrationData },
            { type: action.type.replace("INDIVIDUAL_", ""), payload: action.payload }
        );
        return { ...state, individualRegistrationData: updatedIndividual.individualRegistrationData };
    }
    if (action.type.startsWith("LEGAL_ENTITY_")) {
        const updated = legalEntityRegistrationFormReducer(
            state.legalEntityRegistrationData,
            { type: action.type.replace("LEGAL_ENTITY_", ""), payload: action.payload }
        );
        return { ...state, legalEntityRegistrationData: updated };
    }

    if (action.type.startsWith("CNPJ_")) {
        const updated = cnpjFormReducer(
            state.cnpjData,
            { type: action.type.replace("CNPJ_", ""), payload: action.payload }
        );
        return { ...state, cnpjData: updated };
    }

    if (action.type.startsWith("CEP_")) {
        const updated = cepFormReducer(
            state.cepData,
            { type: action.type.replace("CEP_", ""), payload: action.payload }
        );
        return { ...state, cepData: updated };
    }

    switch (action.type) {
        case "UPDATE_INDIVIDUAL_REGISTRATION":
            return { ...state, individualRegistrationData: action.payload };
        case "UPDATE_LEGAL_ENTITY_REGISTRATION":
            return { ...state, legalEntityRegistrationData: action.payload };
        case "UPDATE_REVIEW_SCALE_CRITERIA":
            return { ...state, reviewScaleAndCriteriaData: action.payload };
        case "RESET_ALL":
            return initialState;
        default:
            return state;
    }
}

export { globalCustomerRegisterReducer, initialState };