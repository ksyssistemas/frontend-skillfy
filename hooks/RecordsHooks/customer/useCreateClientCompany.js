import React from 'react';
import useCEP from '../useCEP';
import useCNPJ from '../useCNPJ';
import useCreateCustomer from './useCreateCustomerAccountHolder';

const useCreateClientCompany = () => {

  const {
    brasilAPICNPJData,
    individualEmployerIdNumber,
    handleSaveCNPJ,
    individualEmployerIdNumberState,
    setIndividualEmployerIdNumberState
  } = useCNPJ("");

  const {
    brasilAPICEPData,
    loadingCEPValidation,
    errorCEPValidation,
    handleCEPValidationLoading,
    handleSaveCEP,
    zipCode,
    setZipCode,
    zipCodeState,
    setZipCodeState
  } = useCEP("");

  const { resetCreateCustomer } = useCreateCustomer();

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
  const [companyEmailAddress, setCompanyEmailAddress] = React.useState("");
  const [companyEmailAddressState, setCompanyEmailAddressState] = React.useState(null);
  const [customerBusinessSector, setCustomerBusinessSector] = React.useState("");
  const [customerBusinessSectorState, setCustomerBusinessSectorState] = React.useState(null);
  const [customerWebSite, setCustomerWebSite] = React.useState("");
  const [customerWebSiteState, setCustomerWebSiteState] = React.useState(null);
  const [customerStatus, setCustomerStatus] = React.useState(false);
  const [customerAccessionDate, setCustomerAccessionDate] = React.useState("");

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
  const [companyCountry, setCompanyCountry] = React.useState("");
  const [companyCountryState, setCompanyCountryState] = React.useState(null);
  const [isCustomerCompanyFormValidated, setIsCustomerCompanyFormValidated] = React.useState(false);
  const [isClientCompanySaved, setIsClientCompanySaved] = React.useState(false);
  const [isCompanyAddressSaved, setIsCompanyAddressSaved] = React.useState(false);
  const [customerUserIdToCreateAddress, setCustomerUserIdToCreateAddress] = React.useState('');

  const [hasValuesChangedWithAPIData, setHasValuesChangedWithAPIData] = React.useState(false);
  const handleValuesChangedWithAPIData = () => setHasValuesChangedWithAPIData(!hasValuesChangedWithAPIData);

  const [hasValuesChangedWithAPIDataCEP, setHasValuesChangedWithAPIDataCEP] = React.useState(false);
  const handleValuesChangedWithAPIDataCEP = () => setHasValuesChangedWithAPIDataCEP(!hasValuesChangedWithAPIDataCEP);

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
    if (customerBusinessPhoneNumber === "" || !validatePhoneNumber(customerBusinessPhoneNumber, 'business')) {
      setCustomerBusinessPhoneNumberState("invalid");
    } else {
      setCustomerBusinessPhoneNumberState("valid");
    }
    if (customerPhoneNumber !== "" && !validatePhoneNumber(customerPhoneNumber, 'personal')) {
      setCustomerPhoneNumberState("invalid");
    } else {
      setCustomerPhoneNumberState(customerPhoneNumber === "" ? null : "valid");
    }
    if (companyEmailAddress === "") {
      setCompanyEmailAddressState("invalid");
    } else {
      setCompanyEmailAddressState("valid");
    }
    if (customerBusinessSector === "") {
      setCustomerBusinessSectorState("invalid");
    } else {
      setCustomerBusinessSectorState("valid");
    }
    if (customerWebSite !== "" && !validateWebSite(customerWebSite)) {
      setCustomerWebSiteState("invalid");
    } else {
      setCustomerWebSiteState(customerWebSite === "" ? null : "valid");
    }
  }

  function validateAddCustomerAddressForm() {
    if (idHeadOfficeBranch === "") {
      setIdHeadOfficeBranchState("invalid");
    } else {
      setIdHeadOfficeBranchState("valid");
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
      setCompanyAddressComplementState(null);
    } else if (companyAddressComplementState === null) {
      setCompanyAddressComplementState("invalid");
    }
    if (companyDistrict === "") {
      setCompanyDistrictState("invalid");
    } else {
      setCompanyDistrictState("valid");
    }
  };

  function handleFormFieldsAutocomplete(cnpj) {
    if (cnpj.cnpj) {
      handleSaveCNPJ(cnpj.cnpj)
    }
    if (cnpj.nome_fantasia) {
      setCompanyName(cnpj.nome_fantasia)
    }
    if (cnpj.razao_social) {
      setRegistrationName(cnpj.razao_social)
    }
    if (cnpj.ddd_telefone_1) {
      setCustomerBusinessPhoneNumber(formatPhoneNumber(cnpj.ddd_telefone_1, 'business'));
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

  function handleFormFieldsAutocompleteCEP(cep) {
    if (cep.cep) {
      console.log(cep.cep);
      setCustomerZipCode(cep.cep);
    }
    if (cep.state) {
      console.log(cep.state);
      setFederatedUnit(cep.state)
    }
    if (cep.city) {
      console.log(cep.city);
      setCompanyCity(cep.city)
    }
    if (cep.neighborhood) {
      console.log(cep.neighborhood);
      setCompanyDistrict(cep.neighborhood)
    }
    if (cep.street) {
      console.log(cep.street);
      setCompanyAddress(cep.street);
    }
    handleValuesChangedWithAPIDataCEP();
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

  async function handleValidateAddClientCompanyForm(handleShowCustomerUserRegister) {
    validateAddClientCompanyForm();
    validateAddCustomerAddressForm();
    if (
      individualEmployerIdNumberState === "valid" &&
      companyNameState === "valid" &&
      registrationNameState === "valid" &&
      companyTypesState === "valid" &&
      customerBusinessPhoneNumberState === "valid" &&
      customerBusinessSectorState === "valid" &&
      companyEmailAddressState === "valid"
    ) {
      setIsCustomerCompanyFormValidated(!isCustomerCompanyFormValidated);
      const customerUserIdCreated = await handleSubmitCompany(individualEmployerIdNumber, companyName, registrationName, companyTypes, customerBusinessPhoneNumber, customerPhoneNumber, companyEmailAddress, customerBusinessSector, customerWebSite);
      //console.log("1", isClientCompanySaved);
      //setIsClientCompanySaved(!isClientCompanySaved);
      if (
        idHeadOfficeBranchState === "valid" &&
        customerZipCodeState === "valid" &&
        federatedUnitState === "valid" &&
        companyCityState === "valid" &&
        companyAddressState === "valid" &&
        companyAddressNumberState === "valid" &&
        companyDistrictState === "valid" &&
        customerUserIdCreated
      ) {
        await handleSubmitCompanyAddress(idHeadOfficeBranch, customerZipCode, federatedUnit, companyCity, companyAddress, companyAddressNumber, companyAddressComplement, companyDistrict, customerUserIdCreated);
        //console.log("1", isCompanyAddressSaved);
        //setIsCompanyAddressSaved(!isCompanyAddressSaved);
        goBackToCustomerUserList(handleShowCustomerUserRegister);
      }
    }
  }

  function goBackToCustomerUserList(handleShowCustomerUserRegister) {
    //console.log("2", isClientCompanySaved, "2", isCompanyAddressSaved);
    //if (isClientCompanySaved && isCompanyAddressSaved) {
    resetCreateCustomer();
    resetCreateCustomerAddress();
    handleShowCustomerUserRegister();
    //}
  }

  const handleSubmitCompany = async (individualEmployerIdNumber, companyName, registrationName, companyTypes, customerBusinessPhoneNumber, customerPhoneNumber, companyEmailAddress, customerBusinessSector, customerWebSite) => {
    console.log(individualEmployerIdNumber, companyName, registrationName, companyTypes, customerBusinessPhoneNumber, customerPhoneNumber, companyEmailAddress, customerBusinessSector, customerWebSite);
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

          console.log('Data sent successfully!');

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
    console.log(idHeadOfficeBranch, customerZipCode, federatedUnit, companyCity, companyAddress, companyAddressNumber, companyAddressComplement, companyDistrict, customerUserIdCreated);
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
          console.log('Data sent successfully!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  function resetCreateCustomerAddress() {
    setCompanyName("");
    setCompanyNameState(null);
    setRegistrationName("");
    setRegistrationNameState(null);
    setCompanyTypes("");
    setCompanyTypesState(null);
    setCustomerBusinessPhoneNumber("");
    setCustomerBusinessPhoneNumberState(null);
    setCustomerPhoneNumber("");
    setCustomerPhoneNumberState(null);
    setCompanyEmailAddress("");
    setCompanyEmailAddressState(null);
    setCustomerBusinessSector("");
    setCustomerBusinessSectorState(null);
    setCustomerWebSite("");
    setCustomerWebSiteState(null);
    setIdHeadOfficeBranch("");
    setIdHeadOfficeBranchState(null);
    setCustomerZipCode("");
    setCustomerZipCodeState(null);
    setFederatedUnit("");
    setFederatedUnitState(null);
    setCompanyCity("");
    setCompanyCityState(null);
    setCompanyAddress("");
    setCompanyAddressState(null);
    setCompanyAddressNumber("");
    setCompanyAddressNumberState(null);
    setCompanyAddressComplement("");
    setCompanyAddressComplementState(null);
    setCompanyDistrict("");
    setCompanyDistrictState(null);
    setHasValuesChangedWithAPIData(false);
    setIsCustomerCompanyFormValidated(false);
    setIsClientCompanySaved(false);
    setIsCompanyAddressSaved(false);
  }

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
    companyEmailAddress,
    setCompanyEmailAddress,
    companyEmailAddressState,
    setCompanyEmailAddressState,
    customerWebSite,
    setCustomerWebSite,
    customerWebSiteState,
    setCustomerWebSiteState,
    customerStatus,
    setCustomerStatus,
    customerAccessionDate,
    setCustomerAccessionDate,
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
    companyCountry,
    setCompanyCountry,
    companyCountryState,
    setCompanyCountryState,
    handleSaveCNPJ,
    handleValidateAddClientCompanyForm,
    handleFormFieldsAutocomplete,
    hasValuesChangedWithAPIData,
    handleValuesChangedWithAPIData,
    validateAddClientCompanyForm,
    isCustomerCompanyFormValidated,
    validatePhoneNumber,
    validateWebSite,
    validateCompanyEmail,
    resetCreateCustomerAddress,
    hasValuesChangedWithAPIDataCEP,
    handleValuesChangedWithAPIDataCEP,
    validateAddCustomerAddressForm,
    handleFormFieldsAutocompleteCEP,
  };
};

export default useCreateClientCompany;
