import React, { useState, useEffect, useReducer, useRef, useContext } from 'react';
// nodejs library that concatenates classes
import classnames from "classnames";
import InputMask from 'react-input-mask';
import useCreateClientCompany from 'hooks/RecordsHooks/customer/useCreateClientCompany.js';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { handleSelectionEmploymentContractData } from 'util/handleSelectionEmploymentContractData.js';
import { initialStateLegalEntityRegistrationForm, legalEntityRegistrationFormReducer } from '../../../../../reducers/CustomerForms/LegalEntityRegistrationFormReducer';
import { initialStateCNPJForm, cnpjFormReducer } from '../../../../../reducers/cnpjFormReducer';
import { initialStateCEPForm, cepFormReducer } from '../../../../../reducers/cepFormReducer';
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

export function LegalEntityRegistration({ data, updateData }) {

  const [state, dispatch] = useReducer(legalEntityRegistrationFormReducer, initialStateLegalEntityRegistrationForm);

  const [stateCNPJ, dispatchCNPJ] = useReducer(cnpjFormReducer, initialStateCNPJForm);

  const [stateCEP, dispatchCEP] = useReducer(cepFormReducer, initialStateCEPForm);

  const latestLegalEntityRegistrationData = useRef(state.legalEntityRegistrationData);

  const [isLoadingLegalEntityRegistrationData, setIsLoadingLegalEntityRegistrationData] = useState(true);

  const {
    clearStepIndex,
    handleClearStepIndex,
    stateGlobalCustomerRegisterReducer,
    dispatchGlobalCustomerRegisterReducer
  } = useContext(ModelSelectionCustomerRecordContext);

  // Ref para armazenar o estado anterior em formato de string
  const previousStateRef = useRef(null);

  const {
    handleFormFieldsAutocomplete,
    validateAddClientCompanyForm,
    validateAddCustomerAddressForm,
    handleFormFieldsAutocompleteCEP,
    handleValidateAddClientCompanyForm,
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
    dispatch({ type: 'SET_COMPANY_NAME', payload: value });
    dispatch({ type: 'SET_COMPANY_NAME_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleRegistrationNameChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_REGISTRATION_NAME', payload: value });
    dispatch({ type: 'SET_REGISTRATION_NAME_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleSelectedCompanyTypesChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SELECTED_COMPANY_TYPES', payload: value });
    dispatch({ type: 'SET_SELECTED_COMPANY_TYPES_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCustomerBusinessPhoneNumberChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER', payload: value });
    const isValid = value !== '' && validatePhoneNumber(value, 'business');
    dispatch({ type: 'SET_CUSTOMER_BUSINESS_PHONE_NUMBER_STATE', payload: isValid ? 'valid' : 'invalid' });
  };

  const handleCustomerPhoneNumberChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_CUSTOMER_PHONE_NUMBER', payload: value });
    const isValid = value === '' ? null : validatePhoneNumber(value, 'personal') ? 'valid' : 'invalid';
    dispatch({ type: 'SET_CUSTOMER_PHONE_NUMBER_STATE', payload: isValid });
  };

  const handleCompanyEmailAddressChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_COMPANY_EMAIL_ADDRESS', payload: value });
    dispatch({ type: 'SET_COMPANY_EMAIL_ADDRESS_STATE', payload: validateCompanyEmail(value) ? 'valid' : 'invalid' });
  };

  const handleCustomerWebSiteStateChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_CUSTOMER_WEBSITE', payload: value });
    const isValid = value === '' ? null : validateWebSite(value) ? 'valid' : 'invalid';
    dispatch({ type: 'SET_CUSTOMER_WEBSITE_STATE', payload: isValid });
  };

  const handleIdHeadOfficeBranchChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_ID_HEAD_OFFICE_BRANCH', payload: value });
    dispatch({ type: 'SET_ID_HEAD_OFFICE_BRANCH_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleSelectedCompanySectorChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SELECTED_COMPANY_SECTOR', payload: value });
    dispatch({ type: 'SET_SELECTED_COMPANY_SECTOR_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    dispatchCEP({ type: 'SET_ZIP_CODE', payload: value });
    //const isValid = value === '' || stateCEP.cepData.errorCEPValidation !== null ? 'invalid' : 'valid';
    //dispatchCEP({ type: 'SET_ZIPCODE_STATE', payload: isValid });
  };

  const handleFederatedUnitChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_FEDERATED_UNIT', payload: value });
    dispatch({ type: 'SET_FEDERATED_UNIT_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  }

  const handleCompanyAddressChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_COMPANY_ADDRESS', payload: value });
    dispatch({ type: 'SET_COMPANY_ADDRESS_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  }

  const handleCompanyNumberChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_COMPANY_ADDRESS_NUMBER', payload: value });
    dispatch({ type: 'SET_COMPANY_ADDRESS_NUMBER_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCompanyAddressComplementChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT', payload: value });
    dispatch({ type: 'SET_COMPANY_ADDRESS_COMPLEMENT_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCompanyDistrictChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_COMPANY_DISTRICT', payload: value });
    dispatch({ type: 'SET_COMPANY_DISTRICT_STATE', payload: value !== "" ? 'valid' : 'invalid' });
  };

  const handleCompanyCityChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_COMPANY_CITY', payload: value });
    dispatch({ type: 'SET_COMPANY_CITY_STATE', payload: value !== "" ? 'valid' : 'invalid' });
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
    if (setStateAction) dispatch({ type: setStateAction, payload: 'valid' });
    if (setHasDepartmentSelectedAction) dispatch({ type: setHasDepartmentSelectedAction, payload: true });
    // Chama a função de processamento de seleção de dados
    handleSelectionEmploymentContractData(
      selectedId,
      dataList,
      (value) => dispatch({ type: setSelectedAction, payload: value }),
      (value) => dispatch({ type: setFieldAction, payload: value }), // Agora definirá o valor correto
      (state) => dispatch({ type: setStateAction, payload: state }),
      (id) => dispatch({ type: setSelectedDepartmentIdAction, payload: id }),
      () => dispatch({ type: setHasDepartmentSelectedAction, payload: true }),
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
            dispatch({
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
          dispatch({ type: 'RESET_LEGAL_ENTITY_REGISTRATION_DATA' }); // Limpa o estado para evitar inconsistências
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
        payload: state.legalEntityRegistrationData,
      });
    };
  }, [state.legalEntityRegistrationData, dispatchGlobalCustomerRegisterReducer]);

  // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
  useEffect(() => {
    const currentStateString = JSON.stringify(state.legalEntityRegistrationData);

    if (previousStateRef.current !== currentStateString) {
      previousStateRef.current = currentStateString;
      latestLegalEntityRegistrationData.current = { ...state.legalEntityRegistrationData };
      saveDataToLocalStorage(state.legalEntityRegistrationData);
    }
  }, [state.legalEntityRegistrationData]);

  useEffect(() => {
    if (clearStepIndex === 2) {
      resetFormAndLocalStorage(
        true,
        2,
        clearStepIndex,
        'legalEntityRegistrationData',
        'RESET_LEGAL_ENTITY_REGISTRATION_DATA',
        handleClearStepIndex,
        dispatch
      );
    }
  }, [clearStepIndex, dispatch]);

  const hasHandledCNPJ = useRef(false);

  useEffect(() => {
    if (stateCNPJ.cnpjData.brasilAPICNPJData !== null && !hasHandledCNPJ.current) {
      if (stateCNPJ.cnpjData.loadingCNPJValidation === true) {
        hasHandledCNPJ.current = true;
        dispatchCNPJ({
          type: 'SET_LOADING_CNPJ_VALIDATION',
          payload: false
        });
        handleFormFieldsAutocomplete(stateCNPJ, dispatchCNPJ, state, dispatch, stateCEP, dispatchCEP,);
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
        handleFormFieldsAutocompleteCEP(stateCEP, dispatchCEP, state, dispatch);
      }
    }
  }, [stateCEP.cepData.brasilAPICEPData]);

  useEffect(() => {
    if (stateCNPJ.cnpjData.hasValuesChangedWithCNPJAPIData) {
      if (stateCEP.cepData.hasValuesChangedWithCEPAPIData) {
        dispatchCNPJ({ type: 'SET_HAS_VALUES_CHANGED_WITH_CNPJ_API_DATA', payload: false });
        dispatchCNPJ({ type: 'SET_HAS_VALUES_CHANGED_WITH_CEP_API_DATA', payload: false });
        validateAddClientCompanyForm(stateCNPJ, dispatchCNPJ, state, dispatch);
        validateAddCustomerAddressForm(stateCEP, dispatchCEP, state, dispatch);
      }
    }
  }, [
    stateCNPJ.cnpjData.hasValuesChangedWithCNPJAPIData,
    stateCEP.cepData.hasValuesChangedWithCEPAPIData,
    validateAddClientCompanyForm,
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
                value={state.legalEntityRegistrationData.companyName || ''}
                type="text"
                valid={state.legalEntityRegistrationData.companyNameState === "valid"}
                invalid={state.legalEntityRegistrationData.companyNameState === "invalid"}
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
                value={state.legalEntityRegistrationData.registrationName || ''}
                type="text"
                valid={state.legalEntityRegistrationData.registrationNameState === "valid"}
                invalid={state.legalEntityRegistrationData.registrationNameState === "invalid"}
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
                value={state.legalEntityRegistrationData.selectedCompanyTypes || ''}
                onChange={handleSelectedCompanyTypesChange}
                data={state.legalEntityRegistrationData.companyTypesDataList}
                onSelect={(e) => {
                  const selectedValue = e.target.value;
                  handleSelectionEmploymentContractDataWrapper(
                    selectedValue,
                    Array.isArray(state.legalEntityRegistrationData.companyTypesDataList)
                      ? state.legalEntityRegistrationData.companyTypesDataList
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
                value={state.legalEntityRegistrationData.customerBusinessPhoneNumber || ''}
                valid={state.legalEntityRegistrationData.customerBusinessPhoneNumberState === "valid"}
                invalid={state.legalEntityRegistrationData.customerBusinessPhoneNumberState === "invalid"}
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
                value={state.legalEntityRegistrationData.customerPhoneNumber || ''}
                valid={state.legalEntityRegistrationData.customerPhoneNumberState === "valid"}
                invalid={state.legalEntityRegistrationData.customerPhoneNumberState === "invalid"}
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
                value={state.legalEntityRegistrationData.companyEmailAddress || ''}
                valid={state.legalEntityRegistrationData.companyEmailAddressState === "valid"}
                invalid={state.legalEntityRegistrationData.companyEmailAddressState === "invalid"}
                onChange={handleCompanyEmailAddressChange}
              />
              <div className="invalid-feedback">
                {state.legalEntityRegistrationData.companyEmailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
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
                value={state.legalEntityRegistrationData.customerWebSite || ''}
                type="text"
                valid={state.legalEntityRegistrationData.customerWebSiteState === "valid"}
                invalid={state.legalEntityRegistrationData.customerWebSiteState === "invalid"}
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
                value={state.legalEntityRegistrationData.idHeadOfficeBranch || ''}
                valid={state.legalEntityRegistrationData.idHeadOfficeBranchState === "valid"}
                invalid={state.legalEntityRegistrationData.idHeadOfficeBranchState === "invalid"}
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
                value={state.legalEntityRegistrationData.selectedCompanySector || ''}
                onChange={handleSelectedCompanySectorChange}
                data={state.legalEntityRegistrationData.companySectorDataList}
                onSelect={(e) => {
                  const selectedValue = e.target.value;
                  handleSelectionEmploymentContractDataWrapper(
                    selectedValue,
                    Array.isArray(state.legalEntityRegistrationData.companySectorDataList)
                      ? state.legalEntityRegistrationData.companySectorDataList
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
                value={state.legalEntityRegistrationData.federatedUnit || ''}
                valid={state.legalEntityRegistrationData.federatedUnitState === "valid"}
                invalid={state.legalEntityRegistrationData.federatedUnitState === "invalid"}
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
                value={state.legalEntityRegistrationData.companyAddress || ''}
                valid={state.legalEntityRegistrationData.companyAddressState === "valid"}
                invalid={state.legalEntityRegistrationData.companyAddressState === "invalid"}
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
                value={state.legalEntityRegistrationData.companyAddressNumber || ''}
                valid={state.legalEntityRegistrationData.companyAddressNumberState === "valid"}
                invalid={state.legalEntityRegistrationData.companyAddressNumberState === "invalid"}
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
                value={state.legalEntityRegistrationData.companyAddressComplement || ''}
                valid={state.legalEntityRegistrationData.companyAddressComplementState === "valid"}
                invalid={state.legalEntityRegistrationData.companyAddressComplementState === "invalid"}
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
                value={state.legalEntityRegistrationData.companyDistrict || ''}
                valid={state.legalEntityRegistrationData.companyDistrictState === "valid"}
                invalid={state.legalEntityRegistrationData.companyDistrictState === "invalid"}
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
                value={state.legalEntityRegistrationData.companyCity || ''}
                valid={state.legalEntityRegistrationData.companyCityState === "valid"}
                invalid={state.legalEntityRegistrationData.companyCityState === "invalid"}
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