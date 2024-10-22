import React, { useState } from 'react';
// nodejs library that concatenates classes
import classnames from "classnames";
import ReactDatetime from 'react-datetime';
import InputMask from 'react-input-mask';
import useCPF from 'hooks/RecordsHooks/useCPF.js';
import useCreateCustomerAccountHolder from 'hooks/RecordsHooks/customer/useCreateCustomerAccountHolder.js';
// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Col,
} from "reactstrap";

export function IndividualRegistration({ handleShowIndividualRegistration }) {

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
    if (checkbox === null) {
      setCheckbox(true);
    } else {
      setCheckbox(!checkbox);
    }
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
                id="validationContactPersonFirstName"
                placeholder="Nome"
                type="text"
                valid={firstNameState === "valid"}
                invalid={firstNameState === "invalid"}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (e.target.value === "") {
                    setFirstNameState("invalid");
                  } else {
                    setFirstNameState("valid");
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
                htmlFor="validationContactPersonLastName"
              >
                Sobrenome
              </label>
              <Input
                id="validationContactPersonLastName"
                placeholder="Sobrenome"
                type="text"
                valid={lastNameState === "valid"}
                invalid={lastNameState === "invalid"}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (e.target.value === "") {
                    setLastNameState("invalid");
                  } else {
                    setLastNameState("valid");
                  }
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
                htmlFor="validationPersonCPF"
              >
                CPF
              </label>
              <InputMask
                placeholder='999.999.999-99'
                mask="999.999.999-99"
                maskChar="_"
                value={taxIdentificationNumber}
                onChange={(e) => handleChangeCPF(e.target.value)}
              >
                {(inputProps) => <Input {...inputProps} id="validationContactPersonTaxIdNumber" valid={taxIdentificationNumberState === "valid"} invalid={taxIdentificationNumberState === "invalid"} />}
              </InputMask>
              <div className="invalid-feedback">
                {taxIdentificationNumberState === "invalid" && "Forneça um número de CPF válido."}
              </div>
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationPersonBirthDate"
              >
                Data de Nascimento
              </label>
              <ReactDatetime
                inputProps={{
                  placeholder: '__/__/__',
                }}
                timeFormat={false}
                dateFormat="DD/MM/YYYY"
                value={birthdate}
                onChange={setBirthdate}
              />
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
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (e.target.value === "") {
                    setPhoneNumberState("invalid");
                  } else {
                    setPhoneNumberState("valid");
                  }
                }}
              >
                {(inputProps) => <Input {...inputProps} id="validationContactPersonPhoneNumber" type="text" valid={phoneNumberState === "valid"} invalid={phoneNumberState === "invalid"} />}
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
                valid={emailAddressState === "valid"}
                invalid={emailAddressState === "invalid"}
                onChange={(e) => {
                  const email = e.target.value;
                  setEmailAddress(email);
                  if (validateEmail(email)) {
                    setEmailAddressState("valid");
                  } else {
                    setEmailAddressState("invalid");
                  }
                }}
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
                id="validationPassword"
                placeholder="Senha de acesso ao sistema"
                type="password"
                valid={passwordState === "valid"}
                invalid={passwordState === "invalid"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value === "") {
                    setPasswordState("invalid");
                  } else {
                    setPasswordState("valid");
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
                htmlFor="validationConfirmPassword"
              >
                Confirmar Senha
              </label>
              <Input
                id="validationConfirmPassword"
                placeholder="Confirme a senha digitada"
                type="password"
                valid={confirmPasswordState === "valid"}
                invalid={confirmPasswordState === "invalid"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value === "") {
                    setConfirmPasswordState("invalid");
                  } else if (e.target.value === password) {
                    setConfirmPasswordState("valid");
                  } else {
                    setConfirmPasswordState("invalid");
                  }
                }}
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
                defaultValue=""
                id="checkUseTerms"
                type="checkbox"
                onChange={handleCheckboxChange}
              />
              <label
                className="custom-control-label"
                htmlFor="checkUseTerms"
              >
                Declaro que estou ciente e de acordo com os termos de uso: Skillfy
              </label>
              <div className={`invalid-feedback mt-3 mt-sm-4 mt-md-4 mt-lg-3 mt-xl-2 mt-xxl-2 py-2`}>
                Você deve concordar antes de enviar.
              </div>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  )
}