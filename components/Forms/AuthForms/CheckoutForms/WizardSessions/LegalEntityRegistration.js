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

export function LegalEntityRegistration() {

  const [estado, setestado] = React.useState("");
  const [estadoState, setestadoState] = React.useState(null);
  const [address, setaddress] = React.useState("");
  const [addressState, setaddressState] = React.useState(null);
  const [number, setnumber] = React.useState("");
  const [numberState, setnumberState] = React.useState(null);
  const [complemento, setcomplemento] = React.useState("");
  const [complementoState, setcomplementoState] = React.useState(null);
  const [bairro, setbairro] = React.useState("");
  const [bairroState, setbairroState] = React.useState(null);
  const [cidade, setcidade] = React.useState("");
  const [cidadeState, setcidadeState] = React.useState(null);

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
      if (brasilAPICEPData.state) handleInputChange(brasilAPICEPData.state, setestado, setestadoState);
      if (brasilAPICEPData.street) handleInputChange(brasilAPICEPData.street, setaddress, setaddressState);
      if (brasilAPICEPData.neighborhood) handleInputChange(brasilAPICEPData.neighborhood, setbairro, setbairroState);
      if (brasilAPICEPData.city) handleInputChange(brasilAPICEPData.city, setcidade, setcidadeState);
    }
  }, [brasilAPICEPData]);

  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState('');
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
                placeholder="99.999.999/9999-99"
                mask="99.999.999/9999-99"
                maskChar="_"
                value={individualEmployerIdNumber}
                onChange={(e) => handleSaveCNPJ(e.target.value)}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerIndividualEmployerIdnNumber" valid={individualEmployerIdNumberState === "valid"} invalid={individualEmployerIdNumberState === "invalid"} />}
              </InputMask>
              {
                loadingCNPJValidation ? <div style={{ display: 'none', width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#5e72e4' }}>Validando CNPJ...</div> : (
                  errorCNPJValidation !== null ? <div className="invalid-feedback">Ocorreu um erro ao validar o CNPJ.</div> : (
                    brasilAPICNPJData ? <div className="valid-feedback">CNPJ válido!</div> : <div className="invalid-feedback">CNPJ inválido!</div>
                  )
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
                value={companyName}
                type="text"
                valid={companyNameState === "valid"}
                invalid={companyNameState === "invalid"}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (e.target.value === "") {
                    setCompanyNameState("invalid");
                  } else {
                    setCompanyNameState("valid");
                  }
                }}
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
                value={registrationName}
                type="text"
                valid={registrationNameState === "valid"}
                invalid={registrationNameState === "invalid"}
                onChange={(e) => {
                  setRegistrationName(e.target.value);
                  if (e.target.value === "") {
                    setRegistrationNameState("invalid");
                  } else {
                    setRegistrationNameState("valid");
                  }
                }}
              />
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
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
                value={selectedCompanyTypes}
                onChange={(e) => setSelectedCompanyTypes(e.target.value)}
                data={companyTypesDataList}
                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, companyTypesDataList, setSelectedCompanyTypes, setCompanyTypes, setCompanyTypesState, null)}
              />
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
              >
                Telefone
              </label>
              <InputMask
                placeholder="+55 (99) 9999-9999"
                mask="+55 (99) 9999-9999"
                maskChar=" "
                value={customerBusinessPhoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomerBusinessPhoneNumber(value);
                  if (value === "" || !validatePhoneNumber(value, 'business')) {
                    setCustomerBusinessPhoneNumberState("invalid");
                  } else {
                    setCustomerBusinessPhoneNumberState("valid");
                  }
                }}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerBusinessPhoneNumber" type="text" valid={customerBusinessPhoneNumberState === "valid"} invalid={customerBusinessPhoneNumberState === "invalid"} />}
              </InputMask>
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
              >
                Celular
              </label>
              <InputMask
                placeholder="+55 (99) 9 9999-9999"
                mask="+55 (99) 9 9999-9999"
                maskChar=" "
                value={customerPhoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomerPhoneNumber(value);
                  if (value !== "" && !validatePhoneNumber(value, 'personal')) {
                    setCustomerPhoneNumberState("invalid");
                  } else {
                    setCustomerPhoneNumberState(value === "" ? null : "valid");
                  }
                }}
              >
                {(inputProps) => <Input {...inputProps}
                  id="validationCustomerPhoneNumber"
                  type="text"
                  valid={customerPhoneNumberState === "valid"}
                  invalid={customerPhoneNumberState === "invalid"}
                />}
              </InputMask>
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
                htmlFor="validationCustom01"
              >
                CEP
              </label>
              <InputMask
                placeholder="99999-999"
                mask="99999-999"
                maskChar=" "
                value={zipCode}
                onChange={(e) => handleSaveCEP(e.target.value)}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerZipCode" type="text" valid={zipCodeState === "valid"} invalid={zipCodeState === "invalid"} />}
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
                htmlFor="validationCustom01"
              >
                Estado
              </label>
              <Input
                value={brasilAPICEPData?.state || estado}
                id="validationCustom01"
                placeholder="Estado"
                type="text"
                valid={estadoState === "valid"}
                invalid={estadoState === "invalid"}
                onChange={(e) => handleInputChange(e.target.value, setestado, setestadoState)}
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
                htmlFor="validationCustom01"
              >
                Endereço
              </label>
              <Input
                value={brasilAPICEPData?.street || address}
                id="validationCustom01"
                placeholder="Rua, Avenida..."
                type="text"
                valid={addressState === "valid"}
                invalid={addressState === "invalid"}
                onChange={(e) => handleInputChange(e.target.value, setaddress, setaddressState)}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
            <Col className="mb-3" md="4">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
              >
                Número
              </label>
              <Input
                value={number}
                id="validationCustom01"
                placeholder="xxxx"
                type="text"
                valid={numberState === "valid"}
                invalid={numberState === "invalid"}
                onChange={(e) => {
                  setnumber(e.target.value);
                  if (e.target.value === "") {
                    setnumberState("invalid");
                  } else {
                    setnumberState("valid");
                  }
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="12">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
              >
                Complemento (opcional)
              </label>
              <Input
                value={complemento}
                id="validationCustom01"
                placeholder="xxxx"
                type="text"
                valid={complementoState === "valid"}
                invalid={complementoState === "invalid"}
                onChange={(e) => {
                  setcomplemento(e.target.value);
                  if (e.target.value === "") {
                    setcomplementoState("invalid");
                  } else {
                    setcomplementoState("valid");
                  }
                }}
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
                htmlFor="validationCustom01"
              >
                Bairro
              </label>
              <Input
                value={brasilAPICEPData?.neighborhood || bairro}
                id="validationCustom01"
                placeholder="Bairro"
                type="text"
                valid={bairroState === "valid"}
                invalid={bairroState === "invalid"}
                onChange={(e) => handleInputChange(e.target.value, setbairro, setbairroState)}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
              >
                Cidade
              </label>
              <Input
                value={brasilAPICEPData?.city || cidade}
                id="validationCustom01"
                placeholder="Cidade"
                type="text"
                valid={cidadeState === "valid"}
                invalid={cidadeState === "invalid"}
                onChange={(e) => handleInputChange(e.target.value, setcidade, setcidadeState)}
              />
              <div className="valid-feedback">Parece bom!</div>
              <div className="invalid-feedback">
                É necessário preencher este campo corretamente.
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </div>
  )
}