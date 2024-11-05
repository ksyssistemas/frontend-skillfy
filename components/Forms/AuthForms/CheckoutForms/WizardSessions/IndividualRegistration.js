import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classnames from "classnames";
import ReactDatetime from 'react-datetime';
import InputMask from 'react-input-mask';
import useCPF from 'hooks/RecordsHooks/useCPF.js';
import useCreateCustomerAccountHolder from 'hooks/RecordsHooks/customer/useCreateCustomerAccountHolder.js';
import moment from 'moment';

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Col,
  Button,
} from "reactstrap";

export function IndividualRegistration({ handleShowIndividualRegistration, data, updateData }) {

  const {
    firstName,
    setFirstName,
    firstNameState,
    setFirstNameState,
    lastName,
    setLastName,
    lastNameState,
    setLastNameState,
    taxIdentificationNumber,
    setTaxIdentificationNumber,
    taxIdentificationNumberState,
    setTaxIdentificationNumberState,
    emailAddress,
    setEmailAddress,
    emailAddressState,
    setEmailAddressState,
    birthdate,
    setBirthdate,
    birthdateState,
    setBirthdateState,
    password,
    setPassword,
    passwordState,
    setPasswordState,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordState,
    setConfirmPasswordState,
    phoneNumber,
    setPhoneNumber,
    phoneNumberState,
    setPhoneNumberState,
    contactStatus,
    setContactStatus,
    contactStatusState,
    setContactStatusState,
    checkbox,
    setCheckbox,
    checkboxState,
    setCheckboxState,
    isCustomerAccountHolderFormValidated,
    setIsCustomerAccountHolderFormValidated,
    validateCheckboxIsChecked,
    handleBirthdateChange,
    handleChangeCPF,
    validateEmail,
    handleValidateAddCustomerAccountHolderForm,
    resetCreateCustomer,
    contactPersonOccupation,
    setContactPersonOccupation,
    contactPersonOccupationState,
    setContactPersonOccupationState,
    contactPersonBelongsToClientCompany,
    setContactPersonBelongsToClientCompany,
    contactPersonBelongsToClientCompanyState,
    setContactPersonBelongsToClientCompanyState,
  } = useCreateCustomerAccountHolder(handleShowIndividualRegistration);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCheckbox(isChecked);
    updateData('checkbox', isChecked);

    if (isChecked) {
      updateData('checkboxState', "valid");
      setCheckboxState("valid");
    } else {
      updateData('checkboxState', "invalid");
      setCheckboxState("invalid");
    }
  };

  const handleChange = (inputDate) => {
    const date = typeof inputDate === 'string' ? inputDate : inputDate.format('DD/MM/YYYY');

    const isDateValid = (dateStr) => {
      const formattedDate = moment(dateStr, 'DD/MM/YYYY', true);
      return formattedDate.isValid() && dateStr.length === 10;
    };

    if (isDateValid(date)) {
      setBirthdate(date);
      setBirthdateState("valid");
      updateData('birthdate', date);
      updateData('birthdateState', "valid");
    } else {
      setBirthdate(date);
      setBirthdateState("invalid");
      updateData('birthdate', date);
      updateData('birthdateState', "invalid");
    }
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
    updateData('firstName', value);
    const filteredValue = value.replace(/[^a-zA-Z]/g, '');
    setFirstName(filteredValue);

    if (filteredValue === "") {
      setFirstNameState("invalid");
    } else {
      setFirstNameState("valid");
    }
    updateData('firstNameState', firstNameState);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    updateData('lastName', value);
    const filteredValue = value.replace(/[^a-zA-Z]/g, '');
    setLastName(filteredValue);

    if (filteredValue === "") {
      setLastNameState("invalid");
    } else {
      setLastNameState("valid");
    }
    updateData('lastNameState', lastNameState);
  };

  const handlephoneNumberChange = (e) => {
    const value = e.target.value;
    updateData('phoneNumber', value);
    const filteredValue = value.replace(/\D/g, '');
    setPhoneNumber(filteredValue);

    if (filteredValue.length !== 13) {
      setPhoneNumberState("invalid");
      updateData('phoneNumberState', "invalid");
    } else {
      setPhoneNumberState("valid");
      updateData('phoneNumberState', "valid");
    }
  };

  const handletaxIdentificationNumberChange = (e) => {
    const value = e.target.value;
    handleChangeCPF(value);
    updateData('taxIdentificationNumber', value);
    const isValid = value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    if (!isValid) {
      updateData('taxIdentificationNumberState', "invalid");
    } else {
      updateData('taxIdentificationNumberState', "valid");
    }
  };

  const handleemailChange = (e) => {
    const emailAddress = e.target.value;
    updateData('emailAddress', emailAddress);
    setEmailAddress(emailAddress);
    if (validateEmail(emailAddress)) {
      setEmailAddressState("valid");
    } else {
      setEmailAddressState("invalid");
    }
    updateData('emailAddressState', emailAddressState);
  };

  const handlepassWordChange = (e) => {
    updateData('password', e.target.value);
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordState("invalid");
    } else {
      setPasswordState("valid");
    }
    updateData('passwordState', passwordState);
  };

  const handlepassWordConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    updateData('confirmPassword', value);

    let newConfirmPasswordState = "valid";
    if (value === "") {
      newConfirmPasswordState = "invalid";
    } else if (value !== password) {
      newConfirmPasswordState = "invalid";
    }

    setConfirmPasswordState(newConfirmPasswordState);
    updateData('confirmPasswordState', newConfirmPasswordState);
  };

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
                value={data.firstName || firstName}
                id="validationContactPersonFirstName"
                placeholder="Nome"
                type="text"
                valid={data.firstNameState === "valid" || firstNameState === "valid"}
                invalid={data.firstNameState === "invalid" || firstNameState === "invalid"}
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
                value={data.lastName || lastName}
                id="validationContactPersonLastName"
                placeholder="Sobrenome"
                type="text"
                valid={data.lastNameState === "valid" || lastNameState === "valid"}
                invalid={data.lastNameState === "invalid" || lastNameState === "invalid"}
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
                placeholder='999.999.999-99'
                mask="999.999.999-99"
                maskChar="_"
                valid={data.taxIdentificationNumberState === "valid" || taxIdentificationNumberState === "valid"}
                invalid={data.taxIdentificationNumberState === "invalid" || taxIdentificationNumberState === "invalid"}
                value={data.taxIdentificationNumber || taxIdentificationNumber}
                onChange={handletaxIdentificationNumberChange}
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
                valid={data.birthdateState === "valid" || birthdateState === "valid"}
                invalid={data.birthdateState === "invalid" || birthdateState === "invalid"}
                inputProps={{
                  placeholder: 'DD/MM/YYYY',
                  value: formatInput(data.birthdate || birthdate),
                }}
                timeFormat={false}
                dateFormat="DD/MM/YYYY"
                onChange={handleChange}
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
                value={data.phoneNumber || phoneNumber}
                valid={data.phoneNumberState === "valid" || phoneNumberState === "valid"}
                invalid={data.phoneNumberState === "invalid" || phoneNumberState === "invalid"}
                onChange={handlephoneNumberChange}
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
                value={data.emailAddress || emailAddress}
                valid={data.emailAddressState === "valid" || emailAddressState === "valid"}
                invalid={data.emailAddressState === "invalid" || emailAddressState === "invalid"}
                onChange={handleemailChange}
              />
              <div className="invalid-feedback">
                {emailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
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
                value={data.password || password}
                id="validationPassword"
                placeholder="Senha de acesso ao sistema"
                type="password"
                valid={data.passwordState === "valid" || passwordState === "valid"}
                invalid={data.passwordState === "invalid" || passwordState === "invalid"}
                onChange={handlepassWordChange}
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
                value={data.confirmPassword}
                id="validationConfirmPassword"
                placeholder="Confirme a senha digitada"
                type="password"
                valid={data.confirmPasswordState === "valid" || confirmPasswordState === "valid"}
                invalid={data.confirmPasswordState === "invalid" || confirmPasswordState === "invalid"}
                onChange={handlepassWordConfirmChange}
              />
              <div className="invalid-feedback">
                {confirmPasswordState === "invalid" && "As senhas não coincidem."}
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
          <FormGroup>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className={`custom-control-input ${checkboxState === "invalid" ? "is-invalid" : ""}`}
                id="checkUseTerms"
                type="checkbox"
                checked={data.checkbox || checkbox}
                onChange={handleCheckboxChange}
              />
              <label className="custom-control-label" htmlFor="checkUseTerms">
                Declaro que estou ciente e de acordo com os termos de uso: Skillfy
              </label>
              {checkboxState === "invalid" && (
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