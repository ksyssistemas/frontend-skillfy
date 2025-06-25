import React, { useContext } from 'react';
import useFindValidCEP from '../useFindValidCEP';
import useFindValidCNPJ from '../useFindValidCNPJ';
import useCreateCustomer from './useCreateCustomerAccountHolder';
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { validateFieldWithReducer } from '../../../util/validateFieldWithReducer';

const useCreateClientCompany = () => {

  const {
    idAccountHolderToLinkToCustomer,
    handleCleaningIdAccountHolderToLinkToCustomer,
    handleShowCustomerUserRegister
  } = useContext(CustomerContext);

  const { resetCreateCustomer } = useCreateCustomer();

  const validateAddCustomerCompanyForm = (stateCNPJ, dispatchCNPJ, state, dispatch) => {
    const cnpj = stateCNPJ.cnpjData;
    const data = state.legalEntityRegistrationData;

    let isFormValid = true;

    const fieldsToValidate = [
      {
        dispatch,
        name: "COMPANY_NAME",
        value: data.companyName,
      },
      {
        dispatch,
        name: "REGISTRATION_NAME",
        value: data.registrationName,
      },
      {
        dispatch,
        name: "COMPANY_TYPES",
        value: data.companyTypes,
      },
      {
        dispatch,
        name: "CUSTOMER_BUSINESS_PHONE_NUMBER",
        value: data.customerBusinessPhoneNumber,
        validate: (v) => v !== "" && validatePhoneNumber(v, "business"),
      },
      {
        dispatch,
        name: "COMPANY_EMAIL_ADDRESS",
        value: data.companyEmailAddress,
      },
      {
        dispatch,
        name: "CUSTOMER_BUSINESS_SECTOR",
        value: data.customerBusinessSector,
      },
      {
        dispatch,
        name: "ID_HEAD_OFFICE_BRANCH",
        value: data.customerBusinessSector,
      },
      {
        dispatch: dispatchCNPJ,
        name: "INDIVIDUAL_EMPLOYER_ID_NUMBER",
        value: cnpj.individualEmployerIdNumber,
      },
      {
        dispatch,
        name: "CUSTOMER_PHONE_NUMBER",
        value: data.customerPhoneNumber,
        validate: (v) => validatePhoneNumber(v, "personal"),
        allowNull: true,
      },
      {
        dispatch,
        name: "CUSTOMER_WEBSITE",
        value: data.customerWebSite,
        validate: (v) => validateWebSite(v),
        allowNull: true,
      },
    ];

    for (const field of fieldsToValidate) {
      const isValid = validateFieldWithReducer(field);
      if (!isValid) isFormValid = false;
    }

    dispatch({
      type: "SET_IS_CUSTOMER_COMPANY_FORM_VALIDATED",
      payload: isFormValid,
    });

    return isFormValid;
  };

  function validateAddCustomerAddressForm(stateCEP, dispatchCEP, state, dispatch) {
    const cep = stateCEP.cepData;
    const data = state.legalEntityRegistrationData;

    let isFormValid = true;

    const fieldsToValidate = [
      {
        dispatch: dispatchCEP,
        name: "ZIP_CODE",
        value: cep.zipCode,
      },
      {
        dispatch,
        name: "FEDERATED_UNIT",
        value: data.federatedUnit,
      },
      {
        dispatch,
        name: "COMPANY_CITY",
        value: data.companyCity,
      },
      {
        dispatch,
        name: "COMPANY_ADDRESS",
        value: data.companyAddress,
      },
      {
        dispatch,
        name: "COMPANY_ADDRESS_NUMBER",
        value: data.companyAddressNumber,
      },
      {
        dispatch,
        name: "COMPANY_DISTRICT",
        value: data.companyDistrict,
      },
      {
        dispatch,
        name: "COMPANY_ADDRESS_COMPLEMENT",
        value: data.companyAddressComplement,
        allowNull: true,
      },
    ];

    for (const field of fieldsToValidate) {
      const isValid = validateFieldWithReducer(field);
      if (!isValid) isFormValid = false;
    }

    dispatch({
      type: "SET_IS_CUSTOMER_COMPANY_ADDRESS_FORM_VALIDATED",
      payload: isFormValid,
    });

    return isFormValid;
  }

  function handleFormFieldsAutocomplete(stateCNPJ, dispatchCNPJ, state, dispatch, stateCEP, dispatchCEP,) {
    const apiData = stateCNPJ.cnpjData.brasilAPICNPJData;
    if (apiData.cnpj) {
      dispatchCNPJ({ type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER', payload: apiData.cnpj });
    }
    if (apiData.nome_fantasia) {
      dispatch({ type: 'SET_COMPANY_NAME', payload: apiData.nome_fantasia });
      dispatch({ type: 'SET_COMPANY_NAME_STATE', payload: 'valid' });
    }
    if (apiData.razao_social) {
      dispatch({ type: 'SET_REGISTRATION_NAME', payload: apiData.razao_social });
      dispatch({ type: 'SET_REGISTRATION_NAME_STATE', payload: 'valid' });
    }
    if (apiData.ddd_telefone_1) {
      dispatch({
        type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER',
        payload: formatPhoneNumber(apiData.ddd_telefone_1, 'business')
      });
      dispatch({
        type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER_STATE',
        payload: validatePhoneNumber(formatPhoneNumber(apiData.ddd_telefone_1, 'business'), 'business') ? 'valid' : 'invalid'
      });
    }
    if (apiData.descricao_identificador_matriz_filial) {
      const valor = apiData.descricao_identificador_matriz_filial.toLowerCase().includes('matriz') ? 'Matriz' : 'Filial';
      dispatch({ type: 'SET_ID_HEAD_OFFICE_BRANCH', payload: valor });
      dispatch({ type: 'SET_ID_HEAD_OFFICE_BRANCH_STATE', payload: 'valid' });
    }
    if (apiData.cep) {
      dispatchCEP({ type: 'SET_ZIP_CODE', payload: apiData.cep });
    }
    if (apiData.uf) {
      dispatch({ type: 'SET_FEDERATED_UNIT', payload: apiData.uf });
      dispatch({ type: 'SET_FEDERATED_UNIT_STATE', payload: 'valid' });
    }
    if (apiData.municipio) {
      dispatch({ type: 'SET_COMPANY_CITY', payload: apiData.municipio });
      dispatch({ type: 'SET_COMPANY_CITY_STATE', payload: 'valid' });
    }
    if (apiData.logradouro && apiData.descricao_tipo_de_logradouro) {
      dispatch({
        type: 'SET_COMPANY_ADDRESS',
        payload: `${apiData.descricao_tipo_de_logradouro} ${apiData.logradouro}`
      });
      dispatch({ type: 'SET_COMPANY_ADDRESS_STATE', payload: 'valid' });
    }
    if (apiData.numero) {
      dispatch({ type: 'SET_COMPANY_ADDRESS_NUMBER', payload: apiData.numero });
      dispatch({ type: 'SET_COMPANY_ADDRESS_NUMBER_STATE', payload: 'valid' });
    }
    if (apiData.complemento) {
      dispatch({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT', payload: apiData.complemento });
      dispatch({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT_STATE', payload: 'valid' });
    }
    if (apiData.bairro) {
      dispatch({ type: 'SET_COMPANY_DISTRICT', payload: apiData.bairro });
      dispatch({ type: 'SET_COMPANY_DISTRICT_STATE', payload: 'valid' });
    }

    dispatchCNPJ({ type: 'SET_HAS_VALUES_CHANGED_WITH_CNPJ_API_DATA', payload: true });
  }

  function handleFormFieldsAutocompleteCEP(stateCEP, dispatchCEP, state, dispatch) {
    const apiData = stateCEP.cepData.brasilAPICEPData;
    if (apiData.cep) {
      dispatchCEP({ type: 'SET_ZIP_CODE', payload: apiData.cep });
    }
    if (apiData.state) {
      dispatch({ type: 'SET_FEDERATED_UNIT', payload: apiData.state });
      dispatch({ type: 'SET_FEDERATED_UNIT_STATE', payload: 'valid' });
    }
    if (apiData.city) {
      dispatch({ type: 'SET_COMPANY_CITY', payload: apiData.city });
      dispatch({ type: 'SET_COMPANY_CITY_STATE', payload: 'valid' });
    }
    if (apiData.neighborhood) {
      dispatch({ type: 'SET_COMPANY_DISTRICT', payload: apiData.neighborhood });
      dispatch({ type: 'SET_COMPANY_DISTRICT_STATE', payload: 'valid' });
    }
    if (apiData.street) {
      dispatch({ type: 'SET_COMPANY_ADDRESS', payload: apiData.street });
      dispatch({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT_STATE', payload: 'valid' });
    }

    dispatchCEP({ type: 'SET_HAS_VALUES_CHANGED_WITH_CEP_API_DATA', payload: true });
  }

  const formatPhoneNumber = (phone, type) => {
    if (type === 'business') {
      // Formato para "+55 (99) 9999-9999"
      return `+55 (${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`;
    } else if (type === 'personal') {
      // Formato para "+55 (99) 9 9999-9999"
      return `+55 (${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
    }
    return phone;
  };

  const validatePhoneNumber = (phone, type) => {
    const businessPhoneRegex = /^\+55 \(\d{2}\) \d{4}-\d{4}$/; // Regex para "+55 (99) 9999-9999"
    const personalPhoneRegex = /^\+55 \(\d{2}\) 9 \d{4}-\d{4}$/; // Regex para "+55 (99) 9 9999-9999"
    if (type === 'business') {
      return businessPhoneRegex.test(phone);
    } else if (type === 'personal') {
      return personalPhoneRegex.test(phone);
    }
    return false;
  };

  const validateWebSite = (webSite) => {
    const webSiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-_]+)(\.[a-zA-Z]{2,})+$/;
    return webSiteRegex.test(webSite);
  };

  const validateCompanyEmail = (email) => {
    if (email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  };

  async function handleValidateAddCustomerCompanyForm(
    stateGlobalCustomerRegisterReducer,
    dispatchGlobalCustomerRegisterReducer,
    stateLegalEntityRegistration,
    dispatchLegalEntityRegistration,
    stateCNPJ,
    dispatchCNPJ,
    stateCEP,
    dispatchCEP
  ) {
    const stateLegalEntityData = stateLegalEntityRegistration.legalEntityRegistrationData;
    const stateCNPJData = stateCNPJ.cnpjData;
    const stateCEPData = stateCEP.cepData;

    if (
      stateCNPJData.individualEmployerIdNumberState === "valid" &&
      stateLegalEntityData.companyNameState === "valid" &&
      stateLegalEntityData.registrationNameState === "valid" &&
      stateLegalEntityData.companyTypesState === "valid" &&
      stateLegalEntityData.customerBusinessPhoneNumberState === "valid" &&
      stateLegalEntityData.customerBusinessSectorState === "valid" &&
      stateLegalEntityData.companyEmailAddressState === "valid"
    ) {
      dispatchGlobalCustomerRegisterReducer({
        type: 'LEGAL_ENTITY_SET_IS_CUSTOMER_COMPANY_FORM_VALIDATED',
        payload: true
      });
      const customerUserIdCreated = await handleSubmitCompany(
        stateCNPJData.individualEmployerIdNumber,
        stateLegalEntityData.companyName,
        stateLegalEntityData.registrationName,
        stateLegalEntityData.companyTypes,
        stateLegalEntityData.customerBusinessPhoneNumber,
        stateLegalEntityData.customerPhoneNumber,
        stateLegalEntityData.companyEmailAddress,
        stateLegalEntityData.customerBusinessSector,
        stateLegalEntityData.customerWebSite
      );
      dispatchGlobalCustomerRegisterReducer({
        type: 'LEGAL_ENTITY_SET_IS_CLIENT_COMPANY_SAVED',
        payload: true
      });
      if (
        stateLegalEntityData.idHeadOfficeBranchState === "valid" &&
        stateCEPData.zipCodeState === "valid" &&
        stateLegalEntityData.federatedUnitState === "valid" &&
        stateLegalEntityData.companyCityState === "valid" &&
        stateLegalEntityData.companyAddressState === "valid" &&
        stateLegalEntityData.companyAddressNumberState === "valid" &&
        stateLegalEntityData.companyDistrictState === "valid" &&
        customerUserIdCreated
      ) {
        await handleSubmitCompanyAddress(
          stateLegalEntityData.idHeadOfficeBranch,
          stateCEPData.zipCode,
          stateLegalEntityData.federatedUnit,
          stateLegalEntityData.companyCity,
          stateLegalEntityData.companyAddress,
          stateLegalEntityData.companyAddressNumber,
          stateLegalEntityData.companyAddressComplement,
          stateLegalEntityData.companyDistrict,
          customerUserIdCreated
        );
        dispatchGlobalCustomerRegisterReducer({
          type: 'LEGAL_ENTITY_SET_IS_COMPANY_ADDRESS_SAVED',
          payload: true
        });
        await handleLinkingAccountHolderToCustomer(customerUserIdCreated);
        goBackToCustomerUserList(
          handleShowCustomerUserRegister,
          stateCNPJ,
          dispatchCNPJ,
          stateCEP,
          dispatchCEP
        );
      }
    }
  }

  function goBackToCustomerUserList(
    handleShowCustomerUserRegister,
    stateCNPJ,
    dispatchCNPJ,
    stateCEP,
    dispatchCEP
  ) {
    dispatchCNPJ({ type: 'SET_HAS_VALUES_CHANGED_WITH_CNPJ_API_DATA', payload: false });
    dispatchCEP({ type: 'SET_HAS_VALUES_CHANGED_WITH_CEP_API_DATA', payload: false });
    handleShowCustomerUserRegister();
  }

  const handleSubmitCompany = async (individualEmployerIdNumber, companyName, registrationName, companyTypes, customerBusinessPhoneNumber, customerPhoneNumber, companyEmailAddress, customerBusinessSector, customerWebSite) => {
    if (individualEmployerIdNumber && companyName && registrationName && companyTypes && customerBusinessPhoneNumber && companyEmailAddress && customerBusinessSector) {
      try {
        const payload = {
          companyName: companyName,
          brandName: registrationName,
          identificationNumber: individualEmployerIdNumber,
          phoneNumber: customerBusinessPhoneNumber,
          email: companyEmailAddress,
          type: companyTypes,
          sector: customerBusinessSector,
          status: true,
          paper: 'EMPRESA'
        };

        if (customerPhoneNumber) {
          payload.phone = customerPhoneNumber;
        }

        if (customerWebSite) {
          payload.webSite = customerWebSite;
        }


        const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMER}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {

          const data = await response.json();
          console.log('Dados de entidade enviados com sucesso!');

          return data.id;
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const handleSubmitCompanyAddress = async (idHeadOfficeBranch, customerZipCode, federatedUnit, companyCity, companyAddress, companyAddressNumber, companyAddressComplement, companyDistrict, customerUserIdCreated) => {
    if (idHeadOfficeBranch && customerZipCode && federatedUnit && companyCity && companyAddress && companyAddressNumber && companyDistrict && customerUserIdCreated) {
      try {
        const payload = {
          country: "Brasil",
          state: federatedUnit,
          city: companyCity,
          address: companyAddress,
          neighborhood: companyDistrict,
          zipCode: customerZipCode,
          addressNumber: companyAddressNumber,
          isBranche: idHeadOfficeBranch === "Matriz" ? false : true,
          customerId: customerUserIdCreated
        };

        if (companyAddressComplement) {
          payload.complement = companyAddressComplement;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMER}-address`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log('Dados de endereço da entidade enviados com sucesso!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const handleLinkingAccountHolderToCustomer = async (customerUserIdCreated) => {
    if (idAccountHolderToLinkToCustomer && idAccountHolderToLinkToCustomer !== '' &&
      customerUserIdCreated && customerUserIdCreated !== '') {

      const payload = {
        customerId: customerUserIdCreated
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_PERSON}/${idAccountHolderToLinkToCustomer}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          handleCleaningIdAccountHolderToLinkToCustomer();
          console.log('O titular da conta pertence a uma pessoa jurídica agora!');

          return data.id;
        } else {
          console.error('Error in response:', response.status);
        }
      } catch {
        console.error('Error in request:', error);
      }
    }
  };

  return {
    handleValidateAddCustomerCompanyForm,
    handleFormFieldsAutocomplete,
    validateAddCustomerCompanyForm,
    validatePhoneNumber,
    validateWebSite,
    validateCompanyEmail,
    validateAddCustomerAddressForm,
    handleFormFieldsAutocompleteCEP,
  };
};

export default useCreateClientCompany;
