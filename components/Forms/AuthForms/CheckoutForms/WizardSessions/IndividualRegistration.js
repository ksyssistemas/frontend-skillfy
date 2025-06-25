import React, { useState, useEffect, useReducer, useRef, useContext } from 'react';
// nodejs library that concatenates classes
import ReactDatetime from 'react-datetime';
import InputMask from 'react-input-mask';
import useCPF from 'hooks/RecordsHooks/useCPF.js';
import moment from 'moment';
import { initialStateIndividualRegistrationForm, individualRegistrationFormReducer } from '../../../../../reducers/CustomerForms/IndividualRegistrationFormReducer';
import { ModelSelectionCustomerRecordContext } from '../../../../../contexts/PerformanceContext/ModelSelectionCustomerRecordContext';
import { resetFormAndLocalStorage } from "../../../../../util/resetReviewFormData";
import PropTypes from "prop-types";
// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Col,
} from "reactstrap";
import PageChange from '../../../../PageChange/PageChange';

export function IndividualRegistration() {
  const {
    clearStepIndex,
    handleClearStepIndex,
    stateIndividualRegistration,
    dispatchIndividualRegistration,
    stateGlobalCustomerRegisterReducer,
    dispatchGlobalCustomerRegisterReducer
  } = useContext(ModelSelectionCustomerRecordContext);

  const latestIndividualRegistrationData = useRef(stateIndividualRegistration.individualRegistrationData);

  const [isLoadingIndividualRegistrationData, setIsLoadingIndividualRegistrationData] = useState(true);

  // Ref para armazenar o estado anterior em formato de string
  const previousStateRef = useRef(null);

  const {
    validateCPF
  } = useCPF();

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    dispatchIndividualRegistration({ type: 'SET_CHECKBOX', payload: isChecked });
    dispatchIndividualRegistration({ type: 'SET_CHECKBOX_STATE', payload: isChecked ? 'valid' : 'invalid' });
  };

  const handleChangeBirthdate = (inputDate) => {
    const date = typeof inputDate === 'string' ? inputDate : inputDate.format('DD/MM/YYYY');

    const isDateValid = (dateStr) => {
      const formattedDate = moment(dateStr, 'DD/MM/YYYY', true);
      return formattedDate.isValid() && dateStr.length === 10;
    };

    dispatchIndividualRegistration({ type: 'SET_BIRTHDATE', payload: date });
    dispatchIndividualRegistration({ type: 'SET_BIRTHDATE_STATE', payload: isDateValid(date) ? 'valid' : 'invalid' });
  };

  const formatInput = (input) => {
    if (typeof input !== 'string') {
      return '';
    }
    const numbers = input.replace(/\D/g, '');
    if (numbers.length >= 2 && numbers.length < 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else if (numbers.length >= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
    return numbers;
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^\p{L}\s'-]/gu, '');
    dispatchIndividualRegistration({ type: 'SET_FIRST_NAME', payload: filteredValue });
    dispatchIndividualRegistration({ type: 'SET_FIRST_NAME_STATE', payload: filteredValue ? 'valid' : 'invalid' });
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^\p{L}\s'-]/gu, '');
    dispatchIndividualRegistration({ type: 'SET_LAST_NAME', payload: filteredValue });
    dispatchIndividualRegistration({ type: 'SET_LAST_NAME_STATE', payload: filteredValue ? 'valid' : 'invalid' });
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/\D/g, '');
    dispatchIndividualRegistration({ type: 'SET_PHONE_NUMBER', payload: filteredValue });
    dispatchIndividualRegistration({ type: 'SET_PHONE_NUMBER_STATE', payload: filteredValue.length === 13 || filteredValue.length === 12 ? 'valid' : 'invalid' });
  };

  const handleTaxIdentificationNumberChange = (e) => {
    const value = e.target.value;
    dispatchIndividualRegistration({ type: 'SET_TAX_IDENTIFICATION_NUMBER', payload: value });
    const isValid = value !== '' && validateCPF(value);
    dispatchIndividualRegistration({ type: 'SET_TAX_IDENTIFICATION_NUMBER_STATE', payload: isValid ? 'valid' : 'invalid' });
  };

  const handleEmailChange = (e) => {
    const emailAddress = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    dispatchIndividualRegistration({ type: 'SET_EMAIL_ADDRESS', payload: emailAddress });
    dispatchIndividualRegistration({ type: 'SET_EMAIL_ADDRESS_STATE', payload: regex.test(emailAddress) ? 'valid' : 'invalid' });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    dispatchIndividualRegistration({ type: 'SET_PASSWORD', payload: password });
    dispatchIndividualRegistration({ type: 'SET_PASSWORD_STATE', payload: password !== "" ? 'valid' : 'invalid' });
  };

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    dispatchIndividualRegistration({ type: 'SET_CONFIRM_PASSWORD', payload: value });
    const isValid = value !== '' && value === stateIndividualRegistration.individualRegistrationData.password;
    dispatchIndividualRegistration({ type: 'SET_CONFIRM_PASSWORD_STATE', payload: isValid ? 'valid' : 'invalid' });
  };

  // Função utilitária para salvar os dados formatados no localStorage
  const saveDataToLocalStorage = (data) => {
    const dataToSave = {
      ...data
    };
    localStorage.setItem('individualRegistrationData', JSON.stringify(dataToSave));
  };

  // Execute o carregamento dos dados ao montar o componente
  useEffect(() => {
    // Função para carregar os dados do localStorage
    const loadIndividualRegistrationData = async () => {
      try {
        const rawData = localStorage.getItem('individualRegistrationData');
        if (rawData) {
          const parsedData = JSON.parse(rawData);
          if (parsedData && typeof parsedData === 'object') {
            dispatchIndividualRegistration({
              type: 'LOAD_SAVED_REVIEW_DATA',
              payload: parsedData,
            });
            latestIndividualRegistrationData.current = parsedData; // Atualiza a ref para os dados carregados
          }
        } else {
          dispatchIndividualRegistration({ type: 'RESET_INDIVIDUAL_REGISTRATION_DATA' }); // Limpa o estado para evitar inconsistências
        }
      } catch (error) {
        console.error('Failed to parse individualRegistrationData from localStorage:', error);
      } finally {
        setIsLoadingIndividualRegistrationData(false); // Marque como carregado
      }
    };

    loadIndividualRegistrationData();
  }, []);

  // Salvar no Contexto Global antes de sair
  useEffect(() => {
    return () => {
      dispatchGlobalCustomerRegisterReducer({
        type: "UPDATE_INDIVIDUAL_REGISTRATION",
        payload: stateIndividualRegistration.individualRegistrationData,
      });
    };
  }, [stateIndividualRegistration.individualRegistrationData, dispatchGlobalCustomerRegisterReducer]);

  // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
  useEffect(() => {
    const currentStateString = JSON.stringify(stateIndividualRegistration.individualRegistrationData);

    if (previousStateRef.current !== currentStateString) {
      previousStateRef.current = currentStateString;
      latestIndividualRegistrationData.current = { ...stateIndividualRegistration.individualRegistrationData };
      saveDataToLocalStorage(stateIndividualRegistration.individualRegistrationData);
    }
  }, [stateIndividualRegistration.individualRegistrationData]);

  useEffect(() => {
    if (clearStepIndex === 1) {
      resetFormAndLocalStorage(
        true,
        1,
        clearStepIndex,
        'individualRegistrationData',
        'RESET_INDIVIDUAL_REGISTRATION_DATA',
        handleClearStepIndex,
        dispatchIndividualRegistration
      );
    }
  }, [clearStepIndex, dispatchIndividualRegistration]);

  useEffect(() => {
    if (stateIndividualRegistration.individualRegistrationData.checkbox !== null) {
      dispatchIndividualRegistration({
        type: 'SET_CHECKBOX_STATE',
        payload: stateIndividualRegistration.individualRegistrationData.checkbox === false ? 'invalid' : 'valid'
      });
    }
  }, [stateIndividualRegistration.individualRegistrationData.checkbox]);

  if (isLoadingIndividualRegistrationData) {
    return (
      <PageChange />
    );
  }

  return (
    <div>
      <div>
        <h2>Informe seus dados</h2>
        <Form className="needs-validation" noValidate>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationContactPersonFirstName"
              >
                Nome
              </label>
              <Input
                value={stateIndividualRegistration.individualRegistrationData.firstName || ''}
                id="validationContactPersonFirstName"
                placeholder="Nome"
                type="text"
                valid={stateIndividualRegistration.individualRegistrationData.firstNameState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.firstNameState === "invalid"}
                onChange={handleFirstNameChange}
              />
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationContactPersonLastName"
              >
                Sobrenome
              </label>
              <Input
                value={stateIndividualRegistration.individualRegistrationData.lastName || ''}
                id="validationContactPersonLastName"
                placeholder="Sobrenome"
                type="text"
                valid={stateIndividualRegistration.individualRegistrationData.lastNameState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.lastNameState === "invalid"}
                onChange={handleLastNameChange}
              />
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label className="form-control-label" htmlFor="validationPersonCPF">
                CPF
              </label>
              <InputMask
                value={stateIndividualRegistration.individualRegistrationData.taxIdentificationNumber || ''}
                placeholder='999.999.999-99'
                mask="999.999.999-99"
                maskChar="_"
                valid={stateIndividualRegistration.individualRegistrationData.taxIdentificationNumberState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.taxIdentificationNumberState === "invalid"}
                onChange={handleTaxIdentificationNumberChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationContactPersonTaxIdNumber" />}
              </InputMask>
              <div className="invalid-feedback">
                Forneça um número de CPF válido
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label className="form-control-label" htmlFor="validationPersonBirthDate">
                Data de Nascimento
              </label>
              <ReactDatetime
                valid={stateIndividualRegistration.individualRegistrationData.birthdateState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.birthdateState === "invalid"}
                inputProps={{
                  placeholder: 'DD/MM/YYYY',
                  value: formatInput(stateIndividualRegistration.individualRegistrationData.birthdate || ''),
                }}
                timeFormat={false}
                dateFormat="DD/MM/YYYY"
                onChange={handleChangeBirthdate}
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
                htmlFor="validationPersonPhoneNumber"
              >
                Telefone
              </label>
              <InputMask
                placeholder='+55 (99) 9 9999-9999'
                mask="+55 (99) 9 9999-9999"
                maskChar=" "
                value={stateIndividualRegistration.individualRegistrationData.phoneNumber || ''}
                valid={stateIndividualRegistration.individualRegistrationData.phoneNumberState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.phoneNumberState === "invalid"}
                onChange={handlePhoneNumberChange}
              >
                {(inputProps) => <Input {...inputProps} id="validationContactPersonPhoneNumber" type="text" />}
              </InputMask>
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationPersonEmail"
              >
                E-mail (será usado como login)
              </label>
              <Input
                aria-describedby="inputGroupPrepend"
                id="validationContactPersonEmailAddress"
                placeholder="Endereço de e-mail"
                type="email"
                value={stateIndividualRegistration.individualRegistrationData.emailAddress || ''}
                valid={stateIndividualRegistration.individualRegistrationData.emailAddressState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.emailAddressState === "invalid"}
                onChange={handleEmailChange}
              />
              <div className="invalid-feedback">
                {stateIndividualRegistration.individualRegistrationData.emailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationPassword"
              >
                Senha
              </label>
              <Input
                value={stateIndividualRegistration.individualRegistrationData.password || ''}
                id="validationPassword"
                placeholder="Senha de acesso ao sistema"
                type="password"
                valid={stateIndividualRegistration.individualRegistrationData.passwordState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.passwordState === "invalid"}
                onChange={handlePasswordChange}
              />
              <div className="invalid-feedback">
                É necessário preencher este campo.
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label className="form-control-label" htmlFor="validationConfirmPassword">
                Confirmar Senha
              </label>
              <Input
                value={stateIndividualRegistration.individualRegistrationData.confirmPassword || ''}
                id="validationConfirmPassword"
                placeholder="Confirme a senha digitada"
                type="password"
                valid={stateIndividualRegistration.individualRegistrationData.confirmPasswordState === "valid"}
                invalid={stateIndividualRegistration.individualRegistrationData.confirmPasswordState === "invalid"}
                onChange={handlePasswordConfirmChange}
              />
              <div className="invalid-feedback">
                {stateIndividualRegistration.individualRegistrationData.confirmPasswordState === "invalid" && "As senhas não coincidem."}
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <FormGroup>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className={`custom-control-input ${stateIndividualRegistration.individualRegistrationData.checkboxState === "invalid" ? "is-invalid" : ""}`}
                id="checkUseTerms"
                type="checkbox"
                checked={stateIndividualRegistration.individualRegistrationData.checkbox}
                onChange={handleCheckboxChange}
              />
              <label className="custom-control-label" htmlFor="checkUseTerms">
                Declaro que estou ciente e de acordo com os termos de uso: Skillfy
              </label>
              {stateIndividualRegistration.individualRegistrationData.checkboxState === "invalid" && (
                <div className="invalid-feedback mt-3">
                  Você deve concordar antes de enviar.
                </div>
              )}
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  )
}

IndividualRegistration.defaultProps = {
  handleShowCustomerUserRegister: () => { }
};

IndividualRegistration.propTypes = {
  handleShowCustomerUserRegister: PropTypes.func
};