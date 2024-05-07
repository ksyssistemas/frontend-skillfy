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

  const handleValuesChangedWithAPIData = () => setHasValuesChangedWithAPIData(!hasValuesChangedWithAPIData);

  const validateAddClientCompanyForm = () => {
    if (individualEmployerIdNumber === "") {
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

  function handleValidateAddCustomerAccountHolderForm() {
    validateAddClientCompanyForm();
    if (
      individualEmployerIdNumberState === "valid" &&
      companyName === "valid" &&
      registrationName === "valid" &&
      companyTypes === "valid" &&
      customerBusinessPhoneNumber === "valid" &&
      customerPhoneNumber === "valid" &&
      customerBusinessSector === "valid" &&
      customerZipCode === "valid" &&
      federatedUnit === "valid" &&
      companyCity === "valid" &&
      companyAddress === "valid" &&
      companyAddressNumber === "valid" &&
      companyAddressComplement === "valid" &&
      companyDistrict === "valid"
    ) {
      handleSubmit(
        individualEmployerIdNumberState,
        companyName,
        registrationName,
        companyTypes,
        customerBusinessPhoneNumber,
        customerPhoneNumber,
        customerBusinessSector,
        customerZipCode,
        federatedUnit,
        companyCity,
        companyAddress,
        companyAddressNumber,
        companyAddressComplement,
        companyDistrict);
    } else {
      return null;
    }
  }

  // const handleInputChange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     [field]: value
  //   });
  // };

  // const handleFormSubmit = () => {
  //   console.log(formData);
  //   // Adicione a lógica para salvar os dados onde for necessário
  //   // Por exemplo, você pode fazer uma chamada a uma API ou salvar localmente
  //   console.log("Dados salvos. Lógica de salvamento aqui.");
  // };

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
    handleValidateAddCustomerAccountHolderForm,
    handleFormFieldsAutocomplete,
    hasValuesChangedWithAPIData,
    handleValuesChangedWithAPIData,
    validateAddClientCompanyForm
  };
};

export default useCreateClientCompany;
