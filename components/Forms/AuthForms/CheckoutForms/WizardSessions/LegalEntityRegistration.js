import React, { useState, useEffect, useReducer, useRef, useContext } from 'react';
// nodejs library that concatenates classes
import InputMask from 'react-input-mask';
import useCreateClientCompany from 'hooks/RecordsHooks/customer/useCreateClientCompany.js';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { handleSelectionEmploymentContractData } from 'util/handleSelectionEmploymentContractData.js';
// reactstrap components
import { useFindValidCNPJ } from '../../../../../hooks/RecordsHooks/useFindValidCNPJ';
import { useFindValidCEP } from '../../../../../hooks/RecordsHooks/useFindValidCEP';
import {
  Form,
  Input,
  Col,
} from "reactstrap";
import { ModelSelectionCustomerRecordContext } from '../../../../../contexts/PerformanceContext/ModelSelectionCustomerRecordContext';
import PageChange from '../../../../PageChange/PageChange';
import { resetFormAndLocalStorage } from '../../../../../util/resetReviewFormData'

export function LegalEntityRegistration({ data, updateData }) {

  const {
    clearStepIndex,
    handleClearStepIndex,
    stateLegalEntityRegistration,
    dispatchLegalEntityRegistration,
    stateCNPJ,
    dispatchCNPJ,
    stateCEP,
    dispatchCEP,
    stateGlobalCustomerRegisterReducer,
    dispatchGlobalCustomerRegisterReducer
  } = useContext(ModelSelectionCustomerRecordContext);

  const latestLegalEntityRegistrationData = useRef(stateLegalEntityRegistration.legalEntityRegistrationData);

  const [isLoadingLegalEntityRegistrationData, setIsLoadingLegalEntityRegistrationData] = useState(true);

  // Ref para armazenar o estado anterior em formato de string
  const previousStateRef = useRef(null);

  const {
    handleFormFieldsAutocomplete,
    validateAddCustomerCompanyForm,
    validateAddCustomerAddressForm,
    handleFormFieldsAutocompleteCEP,
    handleValidateAddCustomerCompanyForm,
    isCustomerCompanyFormValidated,
    validatePhoneNumber,
    validateWebSite,
    validateCompanyEmail
  } = useCreateClientCompany();

  const handleIndividualEmployerIdNumberChange = (e) => {
    const value = e.target.value;
    dispatchCNPJ({ type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER', payload: value });
  };

  const handleCompanyNameChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_NAME', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_NAME_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleRegistrationNameChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_REGISTRATION_NAME', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_REGISTRATION_NAME_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleSelectedCompanyTypesChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_SELECTED_COMPANY_TYPES', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_SELECTED_COMPANY_TYPES_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCustomerBusinessPhoneNumberChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER', payload: value });
    const isValid = value !== '' && validatePhoneNumber(value, 'business');
    dispatchLegalEntityRegistration({ type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER_STATE', payload: isValid ? 'valid' : 'invalid' });
  };

  const handleCustomerPhoneNumberChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_CUSTOMER_PHONE_NUMBER', payload: value });
    const isValid = value === '' ? null : validatePhoneNumber(value, 'personal') ? 'valid' : 'invalid';
    dispatchLegalEntityRegistration({ type: 'SET_CUSTOMER_PHONE_NUMBER_STATE', payload: isValid });
  };

  const handleCompanyEmailAddressChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_EMAIL_ADDRESS', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_EMAIL_ADDRESS_STATE', payload: validateCompanyEmail(value) ? 'valid' : 'invalid' });
  };

  const handleCustomerWebSiteStateChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_CUSTOMER_WEBSITE', payload: value });
    const isValid = value === '' ? null : validateWebSite(value) ? 'valid' : 'invalid';
    dispatchLegalEntityRegistration({ type: 'SET_CUSTOMER_WEBSITE_STATE', payload: isValid });
  };

  const handleIdHeadOfficeBranchChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_ID_HEAD_OFFICE_BRANCH', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_ID_HEAD_OFFICE_BRANCH_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleSelectedCompanySectorChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_SELECTED_COMPANY_SECTOR', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_SELECTED_COMPANY_SECTOR_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    dispatchCEP({ type: 'SET_ZIP_CODE', payload: value });
  };

  const handleFederatedUnitChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_FEDERATED_UNIT', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_FEDERATED_UNIT_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  }

  const handleCompanyAddressChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_ADDRESS', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_ADDRESS_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  }

  const handleCompanyNumberChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_ADDRESS_NUMBER', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_ADDRESS_NUMBER_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCompanyAddressComplementChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCompanyDistrictChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_DISTRICT', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_DISTRICT_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCompanyCityChange = (e) => {
    const value = e.target.value;
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_CITY', payload: value });
    dispatchLegalEntityRegistration({ type: 'SET_COMPANY_CITY_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleSelectionEmploymentContractDataWrapper = (
    selectedId,
    dataList,
    setSelectedAction,
    setFieldAction,
    setStateAction,
    setSelectedDepartmentIdAction = null,
    setHasDepartmentSelectedAction = null,
    savedDataType = 'id'
  ) => {
    // Despache o estado 'valid' antes de iniciar o processo de seleção
    if (setStateAction) dispatchLegalEntityRegistration({ type: setStateAction, payload: 'valid' });
    if (setHasDepartmentSelectedAction) dispatchLegalEntityRegistration({ type: setHasDepartmentSelectedAction, payload: true });
    // Chama a função de processamento de seleção de dados
    handleSelectionEmploymentContractData(
      selectedId,
      dataList,
      (value) => dispatchLegalEntityRegistration({ type: setSelectedAction, payload: value }),
      (value) => dispatchLegalEntityRegistration({ type: setFieldAction, payload: value }), // Agora definirá o valor correto
      (state) => dispatchLegalEntityRegistration({ type: setStateAction, payload: state }),
      (id) => dispatchLegalEntityRegistration({ type: setSelectedDepartmentIdAction, payload: id }),
      () => dispatchLegalEntityRegistration({ type: setHasDepartmentSelectedAction, payload: true }),
      savedDataType
    );
  };

  useEffect(() => {
    const validateCnpj = () => {
      dispatchCNPJ({
        type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER_STATE',
        payload: stateCNPJ.cnpjData.individualEmployerIdNumber !== "" ? 'valid' : 'invalid'
      });
    };

    const fetchData = async (cnpj) => {
      const result = await useFindValidCNPJ(cnpj);
      if (result?.error) {
        dispatchCNPJ({ type: 'SET_ERROR_CNPJ_VALIDATION', payload: result.message || 'Erro ao validar CNPJ' });
        dispatchCNPJ({ type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER_STATE', payload: 'invalid' });
        return;
      }

      // Se não for erro, assume sucesso
      dispatchCNPJ({ type: 'SET_BRASIL_API_CNPJ_DATA', payload: result });
      validateCnpj();
    };
    const cnpj = (stateCNPJ.cnpjData.individualEmployerIdNumber || "").replace(/[^\d]+/g, '');
    if (cnpj && cnpj !== "" && cnpj.length === 14) {
      dispatchCNPJ({
        type: 'SET_LOADING_CNPJ_VALIDATION',
        payload: !stateCNPJ.cnpjData.loadingCNPJValidation
      });
      fetchData(cnpj);
    }
  }, [stateCNPJ.cnpjData.individualEmployerIdNumber]);

  useEffect(() => {
    const validateCep = () => {
      dispatchCEP({
        type: 'SET_ZIP_CODE_STATE',
        payload: stateCEP.cepData.zipCode !== "" ? 'valid' : 'invalid'
      });
    };

    const fetchData = async (cep) => {
      const result = await useFindValidCEP(cep);
      if (!result) {
        dispatchCEP({ type: 'SET_ERROR_CEP_VALIDATION', payload: 'Erro ao buscar CEP' });
        return;
      }

      if (!result.message) {
        dispatchCEP({ type: 'SET_BRASIL_API_CEP_DATA', payload: result });
        validateCep();
      } else if (result.type === "not_found") {
        dispatchCEP({ type: 'SET_ERROR_CEP_VALIDATION', payload: result.message });
      } else {
        dispatchCEP({ type: 'SET_ERROR_CEP_VALIDATION', payload: 'Erro desconhecido ao validar CEP' });
      }
    }

    const cep = (stateCEP.cepData.zipCode || "").replace(/[^\d]+/g, '');
    if (cep && cep !== "" && cep.length === 8) {
      dispatchCEP({
        type: 'SET_LOADING_CEP_VALIDATION',
        payload: !stateCEP.cepData.loadingCEPValidation
      });
      fetchData(cep);
    }
  }, [stateCEP.cepData.zipCode]);

  // Função utilitária para salvar os dados formatados no localStorage
  const saveDataToLocalStorage = (data) => {
    const dataToSave = {
      ...data,
      individualEmployerIdNumber: stateCNPJ.cnpjData.individualEmployerIdNumber,
      customerZipCode: stateCEP.cepData.zipCode
    };
    localStorage.setItem('legalEntityRegistrationData', JSON.stringify(dataToSave));
  };

  // Execute o carregamento dos dados ao montar o componente
  useEffect(() => {
    // Função para carregar os dados do localStorage
    const loadLegalEntityRegistrationData = async () => {
      try {
        const rawData = localStorage.getItem('legalEntityRegistrationData');
        if (rawData) {
          const parsedData = JSON.parse(rawData);
          if (parsedData && typeof parsedData === 'object') {
            dispatchLegalEntityRegistration({
              type: 'LOAD_SAVED_LEGAL_ENTITY_REGISTRATION_DATA',
              payload: {
                ...parsedData,
                individualEmployerIdNumber: parsedData.individualEmployerIdNumber ? stateCNPJ.cnpjData.individualEmployerIdNumber : '',
                customerZipCode: parsedData.zipCode ? stateCEP.cepData.zipCode : '',
              },
            });
            latestLegalEntityRegistrationData.current = parsedData; // Atualiza a ref para os dados carregados
          }
        } else {
          dispatchLegalEntityRegistration({ type: 'RESET_LEGAL_ENTITY_REGISTRATION_DATA' }); // Limpa o estado para evitar inconsistências
        }
      } catch (error) {
        console.error('Failed to parse legalEntityRegistrationData from localStorage:', error);
      } finally {
        setIsLoadingLegalEntityRegistrationData(false); // Marque como carregado
      }
    };

    loadLegalEntityRegistrationData();
  }, []);

  // Salvar no Contexto Global antes de sair
  useEffect(() => {
    return () => {
      dispatchGlobalCustomerRegisterReducer({
        type: "UPDATE_LEGAL_ENTITY_REGISTRATION",
        payload: stateLegalEntityRegistration.legalEntityRegistrationData,
      });
    };
  }, [stateLegalEntityRegistration.legalEntityRegistrationData, dispatchGlobalCustomerRegisterReducer]);

  // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
  useEffect(() => {
    const currentStateString = JSON.stringify(stateLegalEntityRegistration.legalEntityRegistrationData);

    if (previousStateRef.current !== currentStateString) {
      previousStateRef.current = currentStateString;
      latestLegalEntityRegistrationData.current = { ...stateLegalEntityRegistration.legalEntityRegistrationData };
      saveDataToLocalStorage(stateLegalEntityRegistration.legalEntityRegistrationData);
    }
  }, [stateLegalEntityRegistration.legalEntityRegistrationData]);

  useEffect(() => {
    if (clearStepIndex === 2) {
      resetFormAndLocalStorage(
        true,
        2,
        clearStepIndex,
        'legalEntityRegistrationData',
        'RESET_LEGAL_ENTITY_REGISTRATION_DATA',
        handleClearStepIndex,
        dispatchLegalEntityRegistration
      );
    }
  }, [clearStepIndex, dispatchLegalEntityRegistration]);

  const hasHandledCNPJ = useRef(false);

  useEffect(() => {
    if (stateCNPJ.cnpjData.brasilAPICNPJData !== null && !hasHandledCNPJ.current) {
      if (stateCNPJ.cnpjData.loadingCNPJValidation === true) {
        hasHandledCNPJ.current = true;
        dispatchCNPJ({
          type: 'SET_LOADING_CNPJ_VALIDATION',
          payload: false
        });
        handleFormFieldsAutocomplete(
          stateCNPJ,
          dispatchCNPJ,
          stateLegalEntityRegistration,
          dispatchLegalEntityRegistration,
          stateCEP,
          dispatchCEP
        );
      }
    }
  }, [stateCNPJ.cnpjData.brasilAPICNPJData]);

  const hasHandledCEP = useRef(false);

  useEffect(() => {
    if (stateCEP.cepData.brasilAPICEPData !== null && !hasHandledCEP.current) {
      if (stateCEP.cepData.loadingCEPValidation === true) {
        hasHandledCEP.current = true;
        dispatchCEP({
          type: 'SET_LOADING_CEP_VALIDATION',
          payload: false
        });
        handleFormFieldsAutocompleteCEP(
          stateCEP,
          dispatchCEP,
          stateLegalEntityRegistration,
          dispatchLegalEntityRegistration
        );
      }
    }
  }, [stateCEP.cepData.brasilAPICEPData]);

  useEffect(() => {
    if (stateCNPJ.cnpjData.hasValuesChangedWithCNPJAPIData) {
      if (stateCEP.cepData.hasValuesChangedWithCEPAPIData) {
        dispatchCNPJ({ type: 'SET_HAS_VALUES_CHANGED_WITH_CNPJ_API_DATA', payload: false });
        dispatchCNPJ({ type: 'SET_HAS_VALUES_CHANGED_WITH_CEP_API_DATA', payload: false });
        validateAddCustomerCompanyForm(
          stateCNPJ,
          dispatchCNPJ,
          stateLegalEntityRegistration,
          dispatchLegalEntityRegistration
        );
        validateAddCustomerAddressForm(
          stateCEP,
          dispatchCEP,
          stateLegalEntityRegistration,
          dispatchLegalEntityRegistration
        );
      }
    }
  }, [
    stateCNPJ.cnpjData.hasValuesChangedWithCNPJAPIData,
    stateCEP.cepData.hasValuesChangedWithCEPAPIData,
    validateAddCustomerCompanyForm,
    validateAddCustomerAddressForm
  ]);

  if (isLoadingLegalEntityRegistrationData) {
    return (
      <PageChange />
    );
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
                valid={stateCNPJ.cnpjData.individualEmployerIdNumberState === "valid"}
                invalid={stateCNPJ.cnpjData.individualEmployerIdNumberState === "invalid"}
                placeholder="99.999.999/9999-99"
                mask="99.999.999/9999-99"
                maskChar="_"
                value={stateCNPJ.cnpjData.individualEmployerIdNumber || ''}
                onChange={handleIndividualEmployerIdNumberChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerIndividualEmployerIdnNumber" />}
              </InputMask>
              {stateCNPJ.cnpjData.individualEmployerIdNumberState === 'invalid' && (
                <div className="invalid-feedback">
                  {stateCNPJ.cnpjData.errorCNPJValidation || 'CNPJ inválido!'}
                </div>
              )}
              {stateCNPJ.cnpjData.individualEmployerIdNumberState === 'valid' && (
                <div className="valid-feedback">CNPJ válido!</div>
              )}
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
                value={stateLegalEntityRegistration.legalEntityRegistrationData.companyName || ''}
                type="text"
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.companyNameState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.companyNameState === "invalid"}
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
                value={stateLegalEntityRegistration.legalEntityRegistrationData.registrationName || ''}
                type="text"
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.registrationNameState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.registrationNameState === "invalid"}
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
                value={stateLegalEntityRegistration.legalEntityRegistrationData.selectedCompanyTypes || ''}
                onChange={handleSelectedCompanyTypesChange}
                data={stateLegalEntityRegistration.legalEntityRegistrationData.companyTypesDataList}
                onSelect={(e) => {
                  const selectedValue = e.target.value;
                  handleSelectionEmploymentContractDataWrapper(
                    selectedValue,
                    Array.isArray(stateLegalEntityRegistration.legalEntityRegistrationData.companyTypesDataList)
                      ? stateLegalEntityRegistration.legalEntityRegistrationData.companyTypesDataList
                      : [],
                    'SET_SELECTED_COMPANY_TYPES',
                    'SET_COMPANY_TYPES',
                    'SET_COMPANY_TYPES_STATE',
                    null,
                    null,
                    'id'
                  );
                }}
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
                value={stateLegalEntityRegistration.legalEntityRegistrationData.customerBusinessPhoneNumber || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.customerBusinessPhoneNumberState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.customerBusinessPhoneNumberState === "invalid"}
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
                value={stateLegalEntityRegistration.legalEntityRegistrationData.customerPhoneNumber || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.customerPhoneNumberState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.customerPhoneNumberState === "invalid"}
                onChange={handleCustomerPhoneNumberChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerPhoneNumber" type="text" />}
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
                value={stateLegalEntityRegistration.legalEntityRegistrationData.companyEmailAddress || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.companyEmailAddressState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.companyEmailAddressState === "invalid"}
                onChange={handleCompanyEmailAddressChange}
              />
              <div className="invalid-feedback">
                {stateLegalEntityRegistration.legalEntityRegistrationData.companyEmailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
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
                value={stateLegalEntityRegistration.legalEntityRegistrationData.customerWebSite || ''}
                type="text"
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.customerWebSiteState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.customerWebSiteState === "invalid"}
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
                type="text"
                value={stateLegalEntityRegistration.legalEntityRegistrationData.idHeadOfficeBranch || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.idHeadOfficeBranchState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.idHeadOfficeBranchState === "invalid"}
                onChange={handleIdHeadOfficeBranchChange}
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
                options={{ placeholder: "Selecione o setor" }}
                value={stateLegalEntityRegistration.legalEntityRegistrationData.selectedCompanySector || ''}
                onChange={handleSelectedCompanySectorChange}
                data={stateLegalEntityRegistration.legalEntityRegistrationData.companySectorDataList}
                onSelect={(e) => {
                  const selectedValue = e.target.value;
                  handleSelectionEmploymentContractDataWrapper(
                    selectedValue,
                    Array.isArray(stateLegalEntityRegistration.legalEntityRegistrationData.companySectorDataList)
                      ? stateLegalEntityRegistration.legalEntityRegistrationData.companySectorDataList
                      : [],
                    'SET_SELECTED_COMPANY_SECTOR',
                    'SET_CUSTOMER_BUSINESS_SECTOR',
                    'SET_CUSTOMER_BUSINESS_SECTOR_STATE',
                    null,
                    null,
                    'id'
                  );
                }}
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
                maskChar="_"
                valid={stateCEP.cepData.zipCodeState === "valid"}
                invalid={stateCEP.cepData.zipCodeState === "invalid"}
                value={stateCEP.cepData.zipCode || ''}
                onChange={handleZipCodeChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationCustomerZipCode" type="text" />}
              </InputMask>
              {stateCEP.cepData.zipCodeState === 'invalid' && (
                <div className="invalid-feedback">
                  {stateCEP.cepData.errorCEPValidation || 'CEP inválido!'}
                </div>
              )}
              {stateCEP.cepData.zipCodeState === 'valid' && (
                <div className="valid-feedback">CEP válido!</div>
              )}
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
                id="validationCompanyState"
                placeholder="Estado"
                type="text"
                value={stateLegalEntityRegistration.legalEntityRegistrationData.federatedUnit || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.federatedUnitState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.federatedUnitState === "invalid"}
                onChange={handleFederatedUnitChange}
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
                id="validationCompanyStreet"
                placeholder="Rua, Avenida..."
                type="text"
                value={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddress || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressState === "invalid"}
                onChange={handleCompanyAddressChange}
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
                id="validationCompanyNumber"
                placeholder="xxxx"
                type="text"
                value={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressNumber || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressNumberState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressNumberState === "invalid"}
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
                id="validationCompanyComplemento"
                placeholder="xxxx"
                type="text"
                value={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressComplement || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressComplementState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.companyAddressComplementState === "invalid"}
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
                id="validationCompanyNeighborhood"
                placeholder="Bairro"
                type="text"
                value={stateLegalEntityRegistration.legalEntityRegistrationData.companyDistrict || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.companyDistrictState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.companyDistrictState === "invalid"}
                onChange={handleCompanyDistrictChange}
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
                id="validationCompanyCity"
                placeholder="Cidade"
                type="text"
                value={stateLegalEntityRegistration.legalEntityRegistrationData.companyCity || ''}
                valid={stateLegalEntityRegistration.legalEntityRegistrationData.companyCityState === "valid"}
                invalid={stateLegalEntityRegistration.legalEntityRegistrationData.companyCityState === "invalid"}
                onChange={handleCompanyCityChange}
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