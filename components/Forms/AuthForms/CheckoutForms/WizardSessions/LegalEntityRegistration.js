import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classnames from "classnames";
import useCNPJ from 'hooks/RecordsHooks/useCNPJ.js';
import useCEP from 'hooks/RecordsHooks/useCEP.js';
import InputMask from 'react-input-mask';
import useCreateClientCompany from 'hooks/RecordsHooks/customer/useCreateClientCompany.js';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { handleSelectionEmploymentContractData } from 'util/handleSelectionEmploymentContractData.js';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

export function LegalEntityRegistration({ data, updateData }) {

  const {
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
    customerBusinessSector,
    setCustomerBusinessSector,
    customerBusinessSectorState,
    setCustomerBusinessSectorState,
    customerWebSite,
    setCustomerWebSite,
    customerWebSiteState,
    setCustomerWebSiteState,
    idHeadOfficeBranch,
    setIdHeadOfficeBranch,
    idHeadOfficeBranchState,
    setIdHeadOfficeBranchState,
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
    handleFormFieldsAutocomplete,
    hasValuesChangedWithAPIData,
    handleValuesChangedWithAPIData,
    validateAddClientCompanyForm,
    validateAddCustomerAddressForm,
    handleValidateAddClientCompanyForm,
    isCustomerCompanyFormValidated,
    validatePhoneNumber,
    validateWebSite,
    validateCompanyEmail
  } = useCreateClientCompany();

  const {
    brasilAPICNPJData,
    loadingCNPJValidation,
    errorCNPJValidation,
    handleCPNJValidationLoading,
    individualEmployerIdNumber,
    handleSaveCNPJ,
    individualEmployerIdNumberState,
    setIndividualEmployerIdNumberState
  } = useCNPJ();

  const {
    brasilAPICEPData,
    loadingCEPValidation,
    errorCEPValidation,
    handleCEPValidationLoading,
    handleSaveCEP,
    zipCode,
    setZipCode,
    zipCodeState,
    setZipCodeState,
    handleErrorCEPValidation
  } = useCEP();

  const handleInputChange = (value, setValue, setState) => {
    setValue(value);
    setState(value.trim() === "" ? "invalid" : "valid");
  };

  useEffect(() => {
    if (brasilAPICEPData) {
      if (brasilAPICEPData.state) handleInputChange(brasilAPICEPData.state, setFederatedUnit, setFederatedUnitState);
      if (brasilAPICEPData.street) handleInputChange(brasilAPICEPData.street, setCompanyAddress, setCompanyAddressState);
      if (brasilAPICEPData.neighborhood) handleInputChange(brasilAPICEPData.neighborhood, setCompanyDistrict, setCompanyDistrictState);
      if (brasilAPICEPData.city) handleInputChange(brasilAPICEPData.city, setCompanyCity, setCompanyCityState);
    }
  }, [brasilAPICEPData]);

  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState('');
  const [selectedCompanyTypesState, setSelectedCompanyTypesState] = useState('');
  const [companyTypesDataList, setCompanyTypesDataList] = useState([
    { id: "0", text: "EI" },
    { id: "1", text: "MEI" },
    { id: "2", text: "Ltda" },
    { id: "3", text: "SLU" },
    { id: "4", text: "SS" },
    { id: "5", text: "S/A" },
  ]);
  const handleCompanyTypesDataList = (companyTypes) => {
    setCompanyTypesDataList(companyTypes);
  }

  const handleNumberChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, '');
    setnumber(filteredValue);

    if (filteredValue === "") {
      setnumberState("invalid");
    } else {
      setnumberState("valid");
    }
  };

  const [selectedCompanySector, setSelectedCompanySector] = useState('');
  const [selectedCompanySectorState, setSelectedCompanySectorState] = useState('');
  const [companySectorDataList, setCompanySectorDataList] = useState([
    { id: "0", text: "Privado" },
    { id: "1", text: "Público" },
  ]);
  const handleCompanySectorDataList = (companySector) => {
    setCompanySectorDataList(companySector);
  }

  useEffect(() => {
    if (federatedUnit !== "") {
      updateData('federatedUnit', federatedUnit);
      setFederatedUnitState("valid");
      updateData('federatedUnitState', "valid");
    }
  }, [federatedUnit]);

  useEffect(() => {
    if (companyAddress !== "") {
      updateData('companyAddress', companyAddress);
      setCompanyAddressState("valid");
      updateData('companyAddressState', "valid");
    }
  }, [companyAddress]);

  useEffect(() => {
    if (companyDistrict !== "") {
      updateData('companyDistrict', companyDistrict);
      setCompanyDistrictState("valid");
      updateData('companyDistrictState', "valid");
    }
  }, [companyDistrict]);

  useEffect(() => {
    if (companyCity !== "") {
      updateData('companyCity', companyCity);
      setCompanyCityState("valid");
      updateData('companyCityState', "valid");
    }
  }, [companyCity]);

  const handleindividualEmployerIdNumberChange = (e) => {
    updateData('individualEmployerIdNumber', e.target.value);
    handleSaveCNPJ(e.target.value)
    if (errorCNPJValidation !== null) {
      updateData('individualEmployerIdNumberState', "invalid");
    } else {
      updateData('individualEmployerIdNumberState', "valid");
    }
  };

  const handleCompanyNameChange = (e) => {
    updateData('companyName', e.target.value);
    setCompanyName(e.target.value);
    if (e.target.value === "") {
      setCompanyNameState("invalid");
      updateData('companyNameState', "invalid");
    } else {
      setCompanyNameState("valid");
      updateData('companyNameState', "valid");
    }
  };

  const handleRegistrationNameChange = (e) => {
    updateData('registrationName', e.target.value);
    setRegistrationName(e.target.value);
    if (e.target.value === "") {
      setRegistrationNameState("invalid");
      updateData('registrationNameState', "invalid");
    } else {
      setRegistrationNameState("valid");
      updateData('registrationNameState', "valid");
    }
  };

  const handleCustomerBusinessPhoneNumberChange = (e) => {
    updateData('customerBusinessPhoneNumber', e.target.value);
    const value = e.target.value;
    setCustomerBusinessPhoneNumber(value);
    if (value === "" || !validatePhoneNumber(value, 'business')) {
      setCustomerBusinessPhoneNumberState("invalid");
      updateData('customerBusinessPhoneNumberState', "invalid");
    } else {
      setCustomerBusinessPhoneNumberState("valid");
      updateData('customerBusinessPhoneNumberState', "valid");
    }
  };

  const handleCustomerPhoneNumberChange = (e) => {
    updateData('customerPhoneNumber', e.target.value);
    const value = e.target.value;
    setCustomerPhoneNumber(value);
    if (value !== "" && !validatePhoneNumber(value, 'personal')) {
      setCustomerPhoneNumberState("invalid");
      updateData('customerPhoneNumberState', "invalid");
    } else {
      setCustomerPhoneNumberState(value === "" ? null : "valid");
      updateData('customerPhoneNumberState', "valid");
    }
  };

  const handleCompanyEmailAddressChange = (e) => {
    updateData('companyEmailAddress', e.target.value);
    const email = e.target.value;
    setCompanyEmailAddress(email);
    if (validateCompanyEmail(email)) {
      setCompanyEmailAddressState("valid");
      updateData('companyEmailAddressState', "valid");
    } else {
      setCompanyEmailAddressState("invalid");
      updateData('companyEmailAddressState', "invalid");
    }
  };

  const handleCustomerWebSiteStateChange = (e) => {
    updateData('customerWebSite', e.target.value);
    setCustomerWebSite(e.target.value);
    if (e.target.value !== "" && !validateWebSite(e.target.value)) {
      setCustomerWebSiteState("invalid");
      updateData('customerWebSiteState', "invalid");
    } else {
      setCustomerWebSiteState(e.target.value === "" ? null : "valid");
      updateData('customerWebSiteState', "valid");
    }
  };

  const handleidHeadOfficeBranchChange = (e) => {
    updateData('idHeadOfficeBranch', e.target.value);
    setIdHeadOfficeBranch(e.target.value);
    if (e.target.value === "") {
      setIdHeadOfficeBranchState("invalid");
      updateData('idHeadOfficeBranchState', "invalid");
    } else {
      setIdHeadOfficeBranchState("valid");
      updateData('idHeadOfficeBranchState', "valid");
    }
  };

  const handlezipCodeChange = (e) => {
    updateData('zipCode', e.target.value);
    handleSaveCEP(e.target.value)
    if (errorCEPValidation !== null || e.target.value === "") {
      updateData('zipCodeState', "invalid");
    } else {
      updateData('zipCodeState', "valid");
    }
  };

  const handleCompanyNumberChange = (e) => {
    updateData('companyAddressNumber', e.target.value);
    setCompanyAddressNumber(e.target.value);
    if (e.target.value === "") {
      setCompanyAddressNumberState("invalid");
      updateData('companyAddressNumberState', "invalid");
    } else {
      setCompanyAddressNumberState("valid");
      updateData('companyAddressNumberState', "valid");
    }
  };

  const handleCompanyAddressComplementChange = (e) => {
    const value = e.target.value;
    updateData('companyAddressComplement', value);
    setCompanyAddressComplement(value);
    if (value === "") {
      setCompanyAddressComplementState("invalid");
      updateData('companyAddressComplementState', "invalid");
    } else {
      setCompanyAddressComplementState("valid");
      updateData('companyAddressComplementState', "valid");
    }
  };

  const handleSelectedCompanyTypesChange = (e) => {
    const value = e.target.value;
    setSelectedCompanyTypes(value);
    updateData('selectedCompanyTypes', value);
    if(value === "") {
      setSelectedCompanyTypesState("invalid");
      updateData('selectedCompanyTypesState', "invalid");
    } else {
      setSelectedCompanyTypesState("valid");
      updateData('selectedCompanyTypesState', "valid");
    }
  };

  const handleSelectedCompanySectorChange = (e) => {
    const value = e.target.value;
    setSelectedCompanyTypes(value);
    updateData('selectedCompanySector', value);
    if(value === "") {
      setSelectedCompanySectorState("invalid");
      updateData('selectedCompanySectorState', "invalid");
    } else {
      setSelectedCompanySectorState("valid");
      updateData('selectedCompanySectorState', "valid");
    }
  };

  return (
    <div>
      <div>
        <h2>Informe os dados da sua empresa (serão usados para cobrança)</h2>
        <Form className="needs-validation" noValidate>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerIndividualEmployerIdnNumber"
              >
                CNPJ
              </label>
              <InputMask
                valid={data.individualEmployerIdNumberState === "valid" || individualEmployerIdNumberState === "valid"}
                invalid={data.individualEmployerIdNumberState === "invalid" || individualEmployerIdNumberState === "invalid"}
                placeholder="99.999.999/9999-99"
                mask="99.999.999/9999-99"
                maskChar="_"
                value={data.individualEmployerIdNumber || individualEmployerIdNumber}
                onChange={handleindividualEmployerIdNumberChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerIndividualEmployerIdnNumber" />}
              </InputMask>
              {
                errorCNPJValidation !== null ? <div className="invalid-feedback">Ocorreu um erro ao validar o CNPJ.</div> : (
                  brasilAPICNPJData ? <div className="valid-feedback">CNPJ válido!</div> : <div className="invalid-feedback">CNPJ inválido!</div>
                )
              }
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerCompanyName"
              >
                Nome da Empresa
              </label>
              <Input
                id="validationCustomerCompanyName"
                placeholder="Nome popular de título de estabelecimento"
                value={data.companyName || companyName}
                type="text"
                valid={data.companyNameState === "valid" || companyNameState === "valid"}
                invalid={data.companyNameState === "invalid" || companyNameState === "invalid"}
                onChange={handleCompanyNameChange}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerRegistrationName"
              >
                Razão Social
              </label>
              <Input
                id="validationCustomerRegistrationName"
                placeholder="Nome ou termo de registro"
                value={data.registrationName || registrationName}
                type="text"
                valid={data.registrationNameState === "valid" || registrationNameState === "valid"}
                invalid={data.registrationNameState === "invalid" || registrationNameState === "invalid"}
                onChange={handleRegistrationNameChange}
              />
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerCompanyTypes"
              >
                Segmento
              </label>
              <Select2
                id="validationCustomerCompanyTypes"
                className="form-control"
                data-minimum-results-for-search="Infinity"
                options={{
                  placeholder: "Selecione o tipo",
                }}
                value={data.selectedCompanyTypes || selectedCompanyTypes}
                onChange={handleSelectedCompanyTypesChange}
                data={companyTypesDataList}
                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, companyTypesDataList, setSelectedCompanyTypes, setCompanyTypes, setCompanyTypesState, null)}
              />
               <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerBusinessPhoneNumber"
              >
                Telefone
              </label>
              <InputMask
                placeholder="+55 (99) 9999-9999"
                mask="+55 (99) 9999-9999"
                maskChar=" "
                value={data.customerBusinessPhoneNumber || customerBusinessPhoneNumber}
                valid={data.customerBusinessPhoneNumberState === "valid" || customerBusinessPhoneNumberState === "valid"}
                invalid={data.customerBusinessPhoneNumberState === "invalid" || customerBusinessPhoneNumberState === "invalid"}
                onChange={handleCustomerBusinessPhoneNumberChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerBusinessPhoneNumber" type="text" />}
              </InputMask>
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerPhoneNumber"
              >
                Celular
              </label>
              <InputMask
                placeholder="+55 (99) 9 9999-9999"
                mask="+55 (99) 9 9999-9999"
                maskChar=" "
                value={data.customerPhoneNumber || customerPhoneNumber}
                onChange={handleCustomerPhoneNumberChange}
              >
                {(inputProps) => <Input {...inputProps}
                  id="validationCustomerPhoneNumber"
                  type="text"
                  valid={data.customerPhoneNumberState === "valid" || customerPhoneNumberState === "valid"}
                  invalid={data.customerPhoneNumberState === "invalid" || customerPhoneNumberState === "invalid"}
                />}
              </InputMask>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <div className="form-row">
            <Col md="6">
              <label
                className="form-control-label"
                htmlFor="validationCompanyEmailAddress"
              >
                E-mail (utilizará como login)
              </label>
              <Input
                aria-describedby="inputGroupPrepend"
                id="validationCompanyEmailAddress"
                placeholder="Endereço de e-mail"
                type="email"
                value={data.companyEmailAddress || companyEmailAddress}
                valid={data.companyEmailAddressState === "valid" || companyEmailAddressState === "valid"}
                invalid={data.companyEmailAddressState === "invalid" || companyEmailAddressState === "invalid"}
                onChange={handleCompanyEmailAddressChange}
              />
              <div className="invalid-feedback">
                {companyEmailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerWebSite"
              >
                Web Site
              </label>
              <Input
                id="validationCustomerWebSite"
                placeholder="www.site.com.br"
                value={data.customerWebSite || customerWebSite}
                type="text"
                valid={data.customerWebSiteState === "valid" || customerWebSiteState === "valid"}
                invalid={data.customerWebSiteState === "invalid" || customerWebSiteState === "invalid"}
                onChange={handleCustomerWebSiteStateChange}
              />
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerIdHeadOfficeBranch"
              >
                Matriz
              </label>
              <Input
                id="validationCustomerIdHeadOfficeBranch"
                placeholder="Matriz ou Filial"
                value={data.idHeadOfficeBranch || idHeadOfficeBranch}
                type="text"
                valid={data.idHeadOfficeBranchState === "valid" || idHeadOfficeBranchState === "valid"}
                invalid={data.idHeadOfficeBranchState === "invalid" || idHeadOfficeBranchState === "invalid"}
                onChange={handleidHeadOfficeBranchChange}
              />
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerBusinessSector"
              >
                Setor
              </label>
              <Select2
                id="validationCustomerBusinessSector"
                className="form-control"
                data-minimum-results-for-search="Infinity"
                options={{
                  placeholder: "Selecione o setor",
                }}
                value={data.selectedCompanySector || selectedCompanySector}
                onChange={handleSelectedCompanySectorChange}
                data={companySectorDataList}
                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, companySectorDataList, setSelectedCompanySector, setCustomerBusinessSector, setCustomerBusinessSectorState, null)}
              />
               <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustomerZipCode"
              >
                CEP
              </label>
              <InputMask
                placeholder="99999-999"
                mask="99999-999"
                maskChar=" "
                valid={data.zipCodeState === "valid" || zipCodeState === "valid"}
                invalid={data.zipCodeState === "invalid" || zipCodeState === "invalid"}
                value={data.zipCode || zipCode}
                onChange={handlezipCodeChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerZipCode" type="text" />}
              </InputMask>
              {
                loadingCEPValidation ? <div style={{ display: 'none', width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#5e72e4' }}>Validando CEP...</div> : (
                  errorCEPValidation !== null ? <div className="invalid-feedback">Ocorreu um erro ao validar o CEP.</div> : (
                    brasilAPICEPData ? <div className="valid-feedback">CEP válido!</div> : <div className="invalid-feedback">CEP inválido!</div>
                  )
                )
              }
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCompanyState"
              >
                Estado
              </label>
              <Input
                value={data.federatedUnit || federatedUnit}
                id="validationCompanyState"
                placeholder="Estado"
                type="text"
                valid={data.federatedUnitState === "valid" || federatedUnitState === "valid"}
                invalid={data.federatedUnitState === "invalid" || federatedUnitState === "invalid"}
                onChange={(e) => {
                  handleInputChange(e.target.value, setFederatedUnit, setFederatedUnitState);
                  updateData('federatedUnit', e.target.value);
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="8">
              <label
                className="form-control-label"
                htmlFor="validationCompanyStreet"
              >
                Endereço
              </label>
              <Input
                value={data.companyAddress || companyAddress}
                id="validationCompanyStreet"
                placeholder="Rua, Avenida..."
                type="text"
                valid={data.companyAddressState === "valid" || companyAddressState === "valid"}
                invalid={data.companyAddressState === "invalid" || companyAddressState === "invalid"}
                onChange={(e) => {
                  handleInputChange(e.target.value, setCompanyAddress, setCompanyAddressState)
                  updateData('companyAddress', e.target.value);
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
            <Col className="mb-3" md="4">
              <label
                className="form-control-label"
                htmlFor="validationCompanyNumber"
              >
                Número
              </label>
              <Input
                value={data.companyAddressNumber || companyAddressNumber}
                id="validationCompanyNumber"
                placeholder="xxxx"
                type="text"
                valid={data.companyAddressNumberState === "valid" || companyAddressNumberState === "valid"}
                invalid={data.companyAddressNumberState === "invalid" || companyAddressNumberState === "invalid"}
                onChange={handleCompanyNumberChange}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                Não é necessário preencher este campo.
              </div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="12">
              <label
                className="form-control-label"
                htmlFor="validationCompanyComplemento"
              >
                Complemento (opcional)
              </label>
              <Input
                value={data.companyAddressComplement || companyAddressComplement}
                id="validationCompanyComplemento"
                placeholder="xxxx"
                type="text"
                valid={data.companyAddressComplementState === "valid" || companyAddressComplementState === "valid"}
                invalid={data.companyAddressComplementState === "invalid" || companyAddressComplementState === "invalid"}
                onChange={handleCompanyAddressComplementChange}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                Não é necessário preencher este campo.
              </div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCompanyNeighborhood"
              >
                Bairro
              </label>
              <Input
                value={data.companyDistrict || companyDistrict}
                id="validationCompanyNeighborhood"
                placeholder="Bairro"
                type="text"
                valid={data.companyDistrictState === "valid" || companyDistrictState === "valid"}
                invalid={data.companyDistrictState === "invalid" || companyDistrictState === "invalid"}
                onChange={(e) => {
                  handleInputChange(e.target.value, setCompanyDistrict, setCompanyDistrictState)
                  updateData('companyDistrict', e.target.value);
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCompanyCity"
              >
                Cidade
              </label>
              <Input
                value={data.companyCity || companyCity}
                id="validationCompanyCity"
                placeholder="Cidade"
                type="text"
                valid={data.companyCityState === "valid" || companyCityState === "valid"}
                invalid={data.companyCityState === "invalid" || companyCityState === "invalid"}
                onChange={(e) => {
                  handleInputChange(e.target.value, setCompanyCity, setCompanyCityState)
                  updateData('companyCity', e.target.value);
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
          </div>
        </Form>
      </div >
    </div >
  )
}