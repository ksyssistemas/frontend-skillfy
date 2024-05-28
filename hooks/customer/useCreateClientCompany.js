import React, { useState } from 'react';
import useCNPJ from '../useCNPJ';

const useCreateClientCompany = () => {

  const {
    brasilAPICNPJData,
    individualEmployerIdNumber,
    handleSaveCNPJ,
    individualEmployerIdNumberState,
    setIndividualEmployerIdNumberState
  } = useCNPJ("");

  const [companyName, setCompanyName] = React.useState("");
  const [companyNameState, setCompanyNameState] = React.useState(null);
  const [registrationName, setRegistrationName] = React.useState("");
  const [registrationNameState, setRegistrationNameState] = React.useState(null);
  const [companyTypes, setCompanyTypes] = React.useState("");
  const [companyTypesState, setCompanyTypesState] = React.useState(null);
  const [customerBusinessPhoneNumber, setCustomerBusinessPhoneNumber] = React.useState("");
  const [customerBusinessPhoneNumberState, setCustomerBusinessPhoneNumberState] = React.useState(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = React.useState("");
  const [customerPhoneNumberState, setCustomerPhoneNumberState] = React.useState(null);
  const [customerBusinessSector, setCustomerBusinessSector] = React.useState("");
  const [customerBusinessSectorState, setCustomerBusinessSectorState] = React.useState(null);
  const [customerWebSite, setCustomerWebSite] = React.useState("");
  const [customerWebSiteState, setCustomerWebSiteState] = React.useState(null);
  const [idHeadOfficeBranch, setIdHeadOfficeBranch] = React.useState("");
  const [idHeadOfficeBranchState, setIdHeadOfficeBranchState] = React.useState(null);
  const [customerZipCode, setCustomerZipCode] = React.useState("");
  const [customerZipCodeState, setCustomerZipCodeState] = React.useState(null);
  const [federatedUnit, setFederatedUnit] = React.useState("");
  const [federatedUnitState, setFederatedUnitState] = React.useState(null);
  const [companyCity, setCompanyCity] = React.useState("");
  const [companyCityState, setCompanyCityState] = React.useState(null);
  const [companyAddress, setCompanyAddress] = React.useState("");
  const [companyAddressState, setCompanyAddressState] = React.useState(null);
  const [companyAddressNumber, setCompanyAddressNumber] = React.useState("");
  const [companyAddressNumberState, setCompanyAddressNumberState] = React.useState(null);
  const [companyAddressComplement, setCompanyAddressComplement] = React.useState("");
  const [companyAddressComplementState, setCompanyAddressComplementState] = React.useState(null);
  const [companyDistrict, setCompanyDistrict] = React.useState("");
  const [companyDistrictState, setCompanyDistrictState] = React.useState(null);
  const [hasValuesChangedWithAPIData, setHasValuesChangedWithAPIData] = React.useState(false);
  const [isCustomerCompanyFormValidated, setIsCustomerCompanyFormValidated] = React.useState(false);

  const handleValuesChangedWithAPIData = () => setHasValuesChangedWithAPIData(!hasValuesChangedWithAPIData);

  const validateAddClientCompanyForm = () => {
    if (individualEmployerIdNumber !== "") {
      setIndividualEmployerIdNumberState("invalid");
    } else {
      setIndividualEmployerIdNumberState("valid");
    }
    if (companyName === "") {
      setCompanyNameState("invalid");
    } else {
      setCompanyNameState("valid");
    }
    if (registrationName === "") {
      setRegistrationNameState("invalid");
    } else {
      setRegistrationNameState("valid");
    }
    if (companyTypes === "") {
      setCompanyTypesState("invalid");
    } else {
      setCompanyTypesState("valid");
    }
    if (customerBusinessPhoneNumber === "") {
      setCustomerBusinessPhoneNumberState("invalid");
    } else {
      setCustomerBusinessPhoneNumberState("valid");
    }
    if (customerPhoneNumber === "") {
      setCustomerPhoneNumberState("invalid");
    } else {
      setCustomerPhoneNumberState("valid");
    }
    if (customerWebSite === "") {
      setCustomerWebSiteState("invalid");
    } else {
      setCustomerWebSiteState("valid");
    }
    if (idHeadOfficeBranch === "") {
      setIdHeadOfficeBranchState("invalid");
    } else {
      setIdHeadOfficeBranchState("valid");
    }
    if (customerBusinessSector === "") {
      setCustomerBusinessSectorState("invalid");
    } else {
      setCustomerBusinessSectorState("valid");
    }
    if (customerZipCode === "") {
      setCustomerZipCodeState("invalid");
    } else {
      setCustomerZipCodeState("valid");
    }
    if (federatedUnit === "") {
      setFederatedUnitState("invalid");
    } else {
      setFederatedUnitState("valid");
    }
    if (companyCity === "") {
      setCompanyCityState("invalid");
    } else {
      setCompanyCityState("valid");
    }
    if (companyAddress === "") {
      setCompanyAddressState("invalid");
    } else {
      setCompanyAddressState("valid");
    }
    if (companyAddressNumber === "") {
      setCompanyAddressNumberState("invalid");
    } else {
      setCompanyAddressNumberState("valid");
    }
    if (companyAddressComplement === "") {
      setCompanyAddressComplementState("invalid");
    } else {
      setCompanyAddressComplementState("valid");
    }
    if (companyDistrict === "") {
      setCompanyDistrictState("invalid");
    } else {
      setCompanyDistrictState("valid");
    }
  };

  function handleFormFieldsAutocomplete(cnpj) {
    if (cnpj.nome_fantasia) {
      setCompanyName(cnpj.nome_fantasia)
    }
    if (cnpj.razao_social) {
      setRegistrationName(cnpj.razao_social)
    }
    if (cnpj.ddd_telefone_1) {
      setCustomerBusinessPhoneNumber(cnpj.ddd_telefone_1)
    }
    if (cnpj.descricao_identificador_matriz_filial) {
      if (cnpj.descricao_identificador_matriz_filial === "MATRIZ" || cnpj.descricao_identificador_matriz_filial === "Matriz") {
        setIdHeadOfficeBranch("Matriz")
      } else {
        setIdHeadOfficeBranch("Filial")
      }
    }
    if (cnpj.cep) {
      setCustomerZipCode(cnpj.cep)
    }
    if (cnpj.uf) {
      setFederatedUnit(cnpj.uf)
    }
    if (cnpj.municipio) {
      setCompanyCity(cnpj.municipio)
    }
    if (cnpj.logradouro && cnpj.descricao_tipo_de_logradouro) {
      setCompanyAddress(`${cnpj.descricao_tipo_de_logradouro} ${cnpj.logradouro}`)
    }
    if (cnpj.numero) {
      setCompanyAddressNumber(cnpj.numero)
    }
    if (cnpj.complemento) {
      setCompanyAddressComplement(cnpj.complemento)
    }
    if (cnpj.bairro) {
      setCompanyDistrict(cnpj.bairro)
    }
    handleValuesChangedWithAPIData();
  }

  function handleValidateAddClientCompanyForm() {
    validateAddClientCompanyForm();
    console.log(individualEmployerIdNumberState === "valid",
      companyNameState === "valid",
      registrationNameState === "valid",
      companyTypesState === "valid",
      customerBusinessPhoneNumberState === "valid",
      idHeadOfficeBranchState === "valid",
      customerBusinessSectorState === "valid",
      customerZipCodeState === "valid",
      federatedUnitState === "valid",
      companyCityState === "valid",
      companyAddressState === "valid",
      companyAddressNumberState === "valid",
      companyDistrictState === "valid")
    if (
      individualEmployerIdNumberState === "valid" &&
      companyNameState === "valid" &&
      registrationNameState === "valid" &&
      companyTypesState === "valid" &&
      customerBusinessPhoneNumberState === "valid" &&
      idHeadOfficeBranchState === "valid" &&
      customerBusinessSectorState === "valid" &&
      customerZipCodeState === "valid" &&
      federatedUnitState === "valid" &&
      companyCityState === "valid" &&
      companyAddressState === "valid" &&
      companyAddressNumberState === "valid" &&
      companyDistrictState === "valid"
    ) {
      console.log(
        individualEmployerIdNumber,
        companyName,
        registrationName,
        companyTypes,
        customerBusinessPhoneNumber,
        idHeadOfficeBranch,
        customerBusinessSector,
        customerZipCode,
        federatedUnit,
        companyCity,
        companyAddress,
        companyAddressNumber,
        companyDistrict
      );
      setIsCustomerCompanyFormValidated(!isCustomerCompanyFormValidated);
    } else {
      return null;
    }
  }

  const handleSubmitCompany = async (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms = true) => {
    return console.log(firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms);
    if (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms) {
      try {
        const response = await fetch(`http://localhost:3010/checkout/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: firstName,
            lastname: lastName,
            cpf: taxIdentificationNumber,
            birthdate: birthdate,
            email: emailAddress,
            phone: phoneNumber,
            terms: terms
          }),
        });

        if (response.ok) {
          reset();
          handleShowAdminUserRegister();
          console.log('Data sent successfully!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  return {
    individualEmployerIdNumberState,
    setIndividualEmployerIdNumberState,
    companyName,
    setCompanyName,
    companyNameState,
    setCompanyNameState,
    registrationName,
    setRegistrationName,
    registrationNameState,
    setRegistrationNameState,
    companyTypes,
    setCompanyTypes,
    companyTypesState,
    setCompanyTypesState,
    customerBusinessPhoneNumber,
    setCustomerBusinessPhoneNumber,
    customerBusinessPhoneNumberState,
    setCustomerBusinessPhoneNumberState,
    customerPhoneNumber,
    setCustomerPhoneNumber,
    customerPhoneNumberState,
    setCustomerPhoneNumberState,
    customerWebSite,
    setCustomerWebSite,
    customerWebSiteState,
    setCustomerWebSiteState,
    idHeadOfficeBranch,
    setIdHeadOfficeBranch,
    idHeadOfficeBranchState,
    setIdHeadOfficeBranchState,
    customerBusinessSector,
    setCustomerBusinessSector,
    customerBusinessSectorState,
    setCustomerBusinessSectorState,
    customerZipCode,
    setCustomerZipCode,
    customerZipCodeState,
    setCustomerZipCodeState,
    federatedUnit,
    setFederatedUnit,
    federatedUnitState,
    setFederatedUnitState,
    companyCity,
    setCompanyCity,
    companyCityState,
    setCompanyCityState,
    companyAddress,
    setCompanyAddress,
    companyAddressState,
    setCompanyAddressState,
    companyAddressNumber,
    setCompanyAddressNumber,
    companyAddressNumberState,
    setCompanyAddressNumberState,
    companyAddressComplement,
    setCompanyAddressComplement,
    companyAddressComplementState,
    setCompanyAddressComplementState,
    companyDistrict,
    setCompanyDistrict,
    companyDistrictState,
    setCompanyDistrictState,
    handleSaveCNPJ,
    handleValidateAddClientCompanyForm,
    handleFormFieldsAutocomplete,
    hasValuesChangedWithAPIData,
    handleValuesChangedWithAPIData,
    validateAddClientCompanyForm,
    isCustomerCompanyFormValidated
  };
};

export default useCreateClientCompany;
