import React, { useContext } from 'react';
import useFindValidCEP from '../useFindValidCEP';
import useFindValidCNPJ from '../useFindValidCNPJ';
import useCreateCustomer from './useCreateCustomerAccountHolder';
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';

const useCreateClientCompany = () => {

  const {
    idAccountHolderToLinkToCustomer,
    handleCleaningIdAccountHolderToLinkToCustomer,
    handleShowCustomerUserRegister
  } = useContext(CustomerContext);

  const { resetCreateCustomer } = useCreateCustomer();

  const validateAddClientCompanyForm = (stateCNPJ, dispatchCNPJ, state, dispatch) => {
    const stateCNPJData = stateCNPJ.cnpjData;
    const stateData = state.legalEntityRegistrationData;

    dispatchCNPJ({
      type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER_STATE',
      payload: stateCNPJData.individualEmployerIdNumber !== "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_COMPANY_NAME_STATE',
      payload: stateData.companyName === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_REGISTRATION_NAME_STATE',
      payload: stateData.registrationName === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_COMPANY_TYPES_STATE',
      payload: stateData.companyTypes === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER_STATE',
      payload: stateData.customerBusinessPhoneNumber === ""
        || !validatePhoneNumber(stateData.customerBusinessPhoneNumber, 'business')
        ? 'invalid' : 'valid'
    });

    let validationCustomerPhoneNumberState;

    if (stateData.customerPhoneNumber === "") {
      validationCustomerPhoneNumberState = null;
    } else if (!validatePhoneNumber(stateData.customerPhoneNumber, 'personal')) {
      validationCustomerPhoneNumberState = 'invalid';
    } else {
      validationCustomerPhoneNumberState = 'valid';
    }
    dispatch({
      type: 'SET_CUSTOMER_PHONE_NUMBER_STATE',
      payload: validationCustomerPhoneNumberState
    });
    dispatch({
      type: 'SET_COMPANY_EMAIL_ADDRESS_STATE',
      payload: stateData.companyEmailAddress === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_CUSTOMER_BUSINESS_SECTOR_STATE',
      payload: stateData.customerBusinessSector === "" ? 'invalid' : 'valid'
    });

    let validationCustomerWebSiteState;

    if (stateData.customerWebSite === "") {
      validationCustomerWebSiteState = null;
    } else if (!validateWebSite(stateData.customerWebSite)) {
      validationCustomerWebSiteState = 'invalid';
    } else {
      validationCustomerWebSiteState = 'valid';
    }
    dispatch({
      type: 'SET_CUSTOMER_WEBSITE_STATE',
      payload: validationCustomerWebSiteState
    });
    dispatch({
      type: 'SET_ID_HEAD_OFFICE_BRANCH_STATE',
      payload: stateData.customerBusinessSector === "" ? 'invalid' : 'valid'
    });
  }

  function validateAddCustomerAddressForm(stateCEP, dispatchCEP, state, dispatch) {
    const stateCEPData = stateCEP.cepData;
    const stateData = state.legalEntityRegistrationData;

    dispatchCEP({
      type: 'SET_ZIP_CODE_STATE',
      payload: stateCEPData.zipCode === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_FEDERATED_UNIT_STATE',
      payload: stateData.federatedUnit === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_COMPANY_CITY_STATE',
      payload: stateData.companyCity === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_COMPANY_ADDRESS_STATE',
      payload: stateData.companyAddress === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_COMPANY_ADDRESS_NUMBER_STATE',
      payload: stateData.companyAddressNumber === "" ? 'invalid' : 'valid'
    });
    dispatch({
      type: 'SET_COMPANY_DISTRICT_STATE',
      payload: stateData.companyDistrict === "" ? 'invalid' : 'valid'
    });
    let validationCompanyAddressComplementState;

    if (stateData.companyAddressComplement === "") {
      validationCompanyAddressComplementState = null;
    } else if (stateData.companyAddressComplementState === null) {
      validationCompanyAddressComplementState = 'invalid';
    } else {
      validationCompanyAddressComplementState = 'valid';
    }
    dispatch({
      type: 'SET_COMPANY_ADDRESS_COMPLEMENT_STATE',
      payload: validationCompanyAddressComplementState
    });
  };

  function handleFormFieldsAutocomplete(stateCNPJ, dispatchCNPJ, state, dispatch, stateCEP, dispatchCEP,) {
    const apiData = stateCNPJ.cnpjData.brasilAPICNPJData;
    if (apiData.cnpj) {
      dispatchCNPJ({ type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER', payload: apiData.cnpj });
    }
    if (apiData.nome_fantasia) {
      dispatch({ type: 'SET_COMPANY_NAME', payload: apiData.nome_fantasia });
    }
    if (apiData.razao_social) {
      dispatch({ type: 'SET_REGISTRATION_NAME', payload: apiData.razao_social });
    }
    if (apiData.ddd_telefone_1) {
      dispatch({ type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER', payload: formatPhoneNumber(apiData.ddd_telefone_1, 'business') });
    }
    if (apiData.descricao_identificador_matriz_filial) {
      if (apiData.descricao_identificador_matriz_filial === "MATRIZ"
        || apiData.descricao_identificador_matriz_filial === "Matriz"
      ) {
        dispatch({ type: 'SET_ID_HEAD_OFFICE_BRANCH', payload: "Matriz" });
      } else {
        dispatch({ type: 'SET_ID_HEAD_OFFICE_BRANCH', payload: "Filial" });
      }
    }
    if (apiData.cep) {
      dispatchCEP({ type: 'SET_ZIP_CODE', payload: apiData.cep });
    }
    if (apiData.uf) {
      dispatch({ type: 'SET_FEDERATED_UNIT', payload: apiData.uf });
    }
    if (apiData.municipio) {
      dispatch({ type: 'SET_COMPANY_CITY', payload: apiData.municipio });
    }
    if (apiData.logradouro && apiData.descricao_tipo_de_logradouro) {
      dispatch({ type: 'SET_COMPANY_ADDRESS', payload: `${apiData.descricao_tipo_de_logradouro} ${apiData.logradouro}` });
    }
    if (apiData.numero) {
      dispatch({ type: 'SET_COMPANY_ADDRESS_NUMBER', payload: apiData.numero });
    }
    if (apiData.complemento) {
      dispatch({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT', payload: apiData.complemento });
    }
    if (apiData.bairro) {
      dispatch({ type: 'SET_COMPANY_DISTRICT', payload: apiData.bairro });
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
    }
    if (apiData.city) {
      dispatch({ type: 'SET_COMPANY_CITY', payload: apiData.city });
    }
    if (apiData.neighborhood) {
      dispatch({ type: 'SET_COMPANY_DISTRICT', payload: apiData.neighborhood });
    }
    if (apiData.street) {
      dispatch({ type: 'SET_COMPANY_ADDRESS', payload: apiData.street });
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

  async function handleValidateAddClientCompanyForm(state, dispatch) {
    const stateLegalEntityData = state.legalEntityRegistrationData;
    const stateCNPJData = state.cnpjData;
    const stateCEPData = state.cepData;

    validateAddClientCompanyForm();
    validateAddCustomerAddressForm();
    if (
      stateCNPJData.individualEmployerIdNumberState === "valid" &&
      stateLegalEntityData.companyNameState === "valid" &&
      stateLegalEntityData.registrationNameState === "valid" &&
      stateLegalEntityData.companyTypesState === "valid" &&
      stateLegalEntityData.customerBusinessPhoneNumberState === "valid" &&
      stateLegalEntityData.customerBusinessSectorState === "valid" &&
      stateLegalEntityData.companyEmailAddressState === "valid"
    ) {
      dispatch({
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
      dispatch({
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
        dispatch({
          type: 'LEGAL_ENTITY_SET_IS_COMPANY_ADDRESS_SAVED',
          payload: true
        });
        await handleLinkingAccountHolderToCustomer(customerUserIdCreated);
        goBackToCustomerUserList(handleShowCustomerUserRegister);
      }
    }
  }

  function goBackToCustomerUserList(handleShowCustomerUserRegister) {
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
          status: true
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
          console.log('O titular da conta pertence a uma pessoa jurídica agora!\n', data);

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
    handleValidateAddClientCompanyForm,
    handleFormFieldsAutocomplete,
    validateAddClientCompanyForm,
    validatePhoneNumber,
    validateWebSite,
    validateCompanyEmail,
    validateAddCustomerAddressForm,
    handleFormFieldsAutocompleteCEP,
  };
};

export default useCreateClientCompany;
