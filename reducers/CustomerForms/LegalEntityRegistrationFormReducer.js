export const initialStateLegalEntityRegistrationForm = {
    legalEntityRegistrationData: {
        companyName: '',
        companyNameState: null,
        registrationName: '',
        registrationNameState: null,
        companyTypes: '',
        companyTypesState: null,
        selectedCompanyTypes: '',
        selectedCompanyTypesState: '',
        companyTypesDataList: [
            { id: "0", text: "EI" },
            { id: "1", text: "MEI" },
            { id: "2", text: "LTDA" },
            { id: "3", text: "SLU" },
            { id: "4", text: "SS" },
            { id: "5", text: "S/A" },
        ],
        customerBusinessPhoneNumber: '',
        customerBusinessPhoneNumberState: null,
        customerPhoneNumber: '',
        customerPhoneNumberState: null,
        companyEmailAddress: '',
        companyEmailAddressState: null,
        customerBusinessSector: '',
        customerBusinessSectorState: null,
        selectedCompanySector: '',
        selectedCompanySectorState: '',
        companySectorDataList: [
            { id: "0", text: "Privado" },
            { id: "1", text: "Público" },
        ],
        customerWebSite: '',
        customerWebSiteState: null,
        customerStatus: false,
        customerAccessionDate: '',
        idHeadOfficeBranch: '',
        idHeadOfficeBranchState: null,
        federatedUnit: '',
        federatedUnitState: null,
        companyCity: '',
        companyCityState: null,
        companyAddress: '',
        companyAddressState: null,
        companyAddressNumber: '',
        companyAddressNumberState: null,
        companyAddressComplement: '',
        companyAddressComplementState: null,
        companyDistrict: '',
        companyDistrictState: null,
        companyCountry: '',
        companyCountryState: null,
        isCustomerCompanyFormValidated: false,
        isCustomerCompanyAddressFormValidated: false,
        isClientCompanySaved: false,
        isCompanyAddressSaved: false,
        customerUserIdToCreateAddress: '',
    }
}

export const legalEntityRegistrationFormReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_LEGAL_ENTITY_REGISTRATION_DATA':
            return {
                ...state,
                legalEntityRegistrationData: { ...action.payload },
            };
        case 'LOAD_SAVED_LEGAL_ENTITY_REGISTRATION_DATA':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    ...action.payload,
                },
            };
        case 'RESET_LEGAL_ENTITY_REGISTRATION_DATA':
            return initialStateLegalEntityRegistrationForm;
        case 'SET_COMPANY_NAME':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyName: action.payload,
                },
            };
        case 'SET_COMPANY_NAME_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyNameState: action.payload,
                },
            };
        case 'SET_REGISTRATION_NAME':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    registrationName: action.payload,
                },
            };
        case 'SET_REGISTRATION_NAME_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    registrationNameState: action.payload,
                },
            };
        case 'SET_COMPANY_TYPES':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyTypes: action.payload,
                },
            };
        case 'SET_COMPANY_TYPES_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyTypesState: action.payload,
                },
            };
        case 'SET_SELECTED_COMPANY_TYPES':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    selectedCompanyTypes: action.payload,
                },
            };
        case 'SET_SELECTED_COMPANY_TYPES_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    selectedCompanyTypesState: action.payload,
                },
            };
        case 'SET_COMPANY_TYPES_DATA_LIST':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyTypesDataList: action.payload,
                },
            };
        case 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerBusinessPhoneNumber: action.payload,
                },
            };
        case 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerBusinessPhoneNumberState: action.payload,
                },
            };
        case 'SET_CUSTOMER_PHONE_NUMBER':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerPhoneNumber: action.payload,
                },
            };
        case 'SET_CUSTOMER_PHONE_NUMBER_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerPhoneNumberState: action.payload,
                },
            };
        case 'SET_COMPANY_EMAIL_ADDRESS':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyEmailAddress: action.payload,
                },
            };
        case 'SET_COMPANY_EMAIL_ADDRESS_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyEmailAddressState: action.payload,
                },
            };
        case 'SET_CUSTOMER_BUSINESS_SECTOR':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerBusinessSector: action.payload,
                },
            };
        case 'SET_CUSTOMER_BUSINESS_SECTOR_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerBusinessSectorState: action.payload,
                },
            };
        case 'SET_SELECTED_COMPANY_SECTOR':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    selectedCompanySector: action.payload,
                },
            };
        case 'SET_SELECTED_COMPANY_SECTOR_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    selectedCompanySectorState: action.payload,
                },
            };
        case 'SET_COMPANY_SECTOR_DATA_LIST':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companySectorDataList: action.payload,
                },
            };
        case 'SET_CUSTOMER_WEBSITE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerWebSite: action.payload,
                },
            };
        case 'SET_CUSTOMER_WEBSITE_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerWebSiteState: action.payload,
                },
            };
        case 'SET_CUSTOMER_STATUS':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerStatus: action.payload,
                },
            };
        case 'SET_CUSTOMER_ACCESSION_DATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerAccessionDate: action.payload,
                },
            };
        case 'SET_ID_HEAD_OFFICE_BRANCH':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    idHeadOfficeBranch: action.payload,
                },
            };
        case 'SET_ID_HEAD_OFFICE_BRANCH_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    idHeadOfficeBranchState: action.payload,
                },
            };
        case 'SET_FEDERATED_UNIT':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    federatedUnit: action.payload,
                },
            };
        case 'SET_FEDERATED_UNIT_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    federatedUnitState: action.payload,
                },
            };
        case 'SET_COMPANY_CITY':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyCity: action.payload,
                },
            };
        case 'SET_COMPANY_CITY_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyCityState: action.payload,
                },
            };
        case 'SET_COMPANY_ADDRESS':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyAddress: action.payload,
                },
            };
        case 'SET_COMPANY_ADDRESS_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyAddressState: action.payload,
                },
            };
        case 'SET_COMPANY_ADDRESS_NUMBER':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyAddressNumber: action.payload,
                },
            };
        case 'SET_COMPANY_ADDRESS_NUMBER_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyAddressNumberState: action.payload,
                },
            };
        case 'SET_COMPANY_ADDRESS_COMPLEMENT':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyAddressComplement: action.payload,
                },
            };
        case 'SET_COMPANY_ADDRESS_COMPLEMENT_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyAddressComplementState: action.payload,
                },
            };
        case 'SET_COMPANY_DISTRICT':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyDistrict: action.payload,
                },
            };
        case 'SET_COMPANY_DISTRICT_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyDistrictState: action.payload,
                },
            };
        case 'SET_COMPANY_COUNTRY':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyCountry: action.payload,
                },
            };
        case 'SET_COMPANY_COUNTRY_STATE':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    companyCountryState: action.payload,
                },
            };
        case 'SET_IS_CUSTOMER_COMPANY_FORM_VALIDATED':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    isCustomerCompanyFormValidated: action.payload,
                },
            };
        case 'SET_IS_CUSTOMER_COMPANY_ADDRESS_FORM_VALIDATED':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    isCustomerCompanyAddressFormValidated: action.payload,
                },
            };
        case 'SET_IS_CLIENT_COMPANY_SAVED':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    isClientCompanySaved: action.payload,
                },
            };
        case 'SET_IS_COMPANY_ADDRESS_SAVED':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    isCompanyAddressSaved: action.payload,
                },
            };
        case 'SET_CUSTOMER_USER_ID_TO_CREATE_ADDRESS':
            return {
                ...state,
                legalEntityRegistrationData: {
                    ...state.legalEntityRegistrationData,
                    customerUserIdToCreateAddress: action.payload,
                },
            };
        default:
            return state;
    }
};