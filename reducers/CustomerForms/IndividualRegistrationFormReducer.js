export const initialStateIndividualRegistrationForm = {
    individualRegistrationData: {
        firstName: '',
        firstNameState: null,
        lastName: '',
        lastNameState: null,
        taxIdentificationNumber: '',
        taxIdentificationNumberState: null,
        emailAddress: '',
        emailAddressState: null,
        birthdate: '',
        birthdateState: null,
        password: '',
        passwordState: null,
        confirmPassword: '',
        confirmPasswordState: null,
        phoneNumber: '',
        phoneNumberState: null,
        contactStatus: '',
        contactStatusState: null,
        checkbox: null,
        checkboxState: null,
        isCustomerAccountHolderFormValidated: false,
        contactPersonOccupation: '',
        contactPersonOccupationState: null,
        contactPersonBelongsToClientCompany: '',
        contactPersonBelongsToClientCompanyState: null,
        selectedBelongingToClientCompany: '',
        selectedBelongingToClientCompanyState: null,
    }
}

export const individualRegistrationFormReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_INDIVIDUAL_REGISTRATION_DATA':
            return {
                ...state,
                individualRegistrationData: { ...action.payload },
            };
        case 'LOAD_SAVED_INDIVIDUAL_REGISTRATION_DATA':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    ...action.payload,
                },
            };
        case 'RESET_INDIVIDUAL_REGISTRATION_DATA':
            return initialStateIndividualRegistrationForm;
        case 'SET_FIRST_NAME':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    firstName: action.payload,
                },
            };
        case 'SET_FIRST_NAME_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    firstNameState: action.payload,
                },
            };

        case 'SET_LAST_NAME':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    lastName: action.payload,
                },
            };
        case 'SET_LAST_NAME_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    lastNameState: action.payload,
                },
            };

        case 'SET_TAX_IDENTIFICATION_NUMBER':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    taxIdentificationNumber: action.payload,
                },
            };
        case 'SET_TAX_IDENTIFICATION_NUMBER_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    taxIdentificationNumberState: action.payload,
                },
            };

        case 'SET_EMAIL_ADDRESS':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    emailAddress: action.payload,
                },
            };
        case 'SET_EMAIL_ADDRESS_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    emailAddressState: action.payload,
                },
            };

        case 'SET_BIRTHDATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    birthdate: action.payload,
                },
            };
        case 'SET_BIRTHDATE_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    birthdateState: action.payload,
                },
            };

        case 'SET_PASSWORD':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    password: action.payload,
                },
            };
        case 'SET_PASSWORD_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    passwordState: action.payload,
                },
            };

        case 'SET_CONFIRM_PASSWORD':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    confirmPassword: action.payload,
                },
            };
        case 'SET_CONFIRM_PASSWORD_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    confirmPasswordState: action.payload,
                },
            };

        case 'SET_PHONE_NUMBER':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    phoneNumber: action.payload,
                },
            };
        case 'SET_PHONE_NUMBER_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    phoneNumberState: action.payload,
                },
            };

        case 'SET_CONTACT_STATUS':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    contactStatus: action.payload,
                },
            };
        case 'SET_CONTACT_STATUS_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    contactStatusState: action.payload,
                },
            };
        case 'SET_CHECKBOX':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    checkbox: action.payload,
                },
            };
        case 'SET_CHECKBOX_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    checkboxState: action.payload,
                },
            };
        case 'SET_IS_CUSTOMER_ACCOUNT_HOLDER_FORM_VALIDATED':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    isCustomerAccountHolderFormValidated: action.payload,
                },
            };

        case 'SET_CONTACT_PERSON_OCCUPATION':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    contactPersonOccupation: action.payload,
                },
            };
        case 'SET_CONTACT_PERSON_OCCUPATION_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    contactPersonOccupationState: action.payload,
                },
            };

        case 'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    contactPersonBelongsToClientCompany: action.payload,
                },
            };
        case 'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    contactPersonBelongsToClientCompanyState: action.payload,
                },
            };
        case 'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    selectedBelongingToClientCompany: action.payload,
                },
            };
        case 'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY_STATE':
            return {
                ...state,
                individualRegistrationData: {
                    ...state.individualRegistrationData,
                    selectedBelongingToClientCompanyState: action.payload,
                },
            };
        default:
            return state;
    }
};
