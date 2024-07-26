import React, { useContext, useEffect, useState } from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import InputMask from 'react-input-mask';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import useCreateAdmin from '../../hooks/RecordsHooks/admin/useCreateAdmin';
import { AdminContext } from "../../contexts/RecordsContext/AdminContext";
import { useFindAdmin } from "../../hooks/RecordsHooks/admin/useFindAdmin";
import { handleDateFormatting } from "../../util/handleDateFormatting";

function AdminUserRegister({ handleShowAdminUserRegister }) {

    const {
        firstName,
        setFirstName,
        firstNameState,
        setFirstNameState,
        lastName,
        setLastName,
        lastNameState,
        setLastNameState,
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
        adminStatus,
        setAdminStatus,
        adminStatusState,
        setAdminStatusState,
        adminPrivilege,
        setAdminPrivilege,
        adminPrivilegeState,
        setAdminPrivilegeState,
        handleValidateAddAdminForm,
        handleBirthdateChange,
        validateEmail
    } = useCreateAdmin(handleShowAdminUserRegister);

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Adicionar Administrador</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationFirstName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationFirstName"
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
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustomLastName"
                            >
                                Sobrenome
                            </label>
                            <Input
                                id="validationCustomLastName"
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
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="8">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmailAddress"
                            >
                                Email
                            </label>
                            <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationEmailAddress"
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
                        </Col>
                        <Col className="mb-3" md="4">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationBirthdate"
                                >
                                    Data de Nascimento
                                </label>
                                <ReactDatetime
                                    inputProps={{
                                        placeholder: "__/__/__",
                                    }}
                                    timeFormat={false}
                                    onChange={(e) => handleDateFormatting(e, setBirthdate, setBirthdateState)}
                                />
                                {/* <div className="invalid-feedback">
                                    É necessário selecionar uma data.
                                </div> */}
                            </FormGroup>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-4" md="4">
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
                        </Col>
                        <Col className="mb-4" md="4">
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
                        </Col>
                        <Col className="mb-4" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationPhoneNumber"
                            >
                                Número de Telefone
                            </label>
                            <InputMask
                                placeholder="+55 (99) 9 9999-9999"
                                mask="+55 (99) 9 9999-9999"
                                maskChar=" "
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    if (e.target.value === "") {
                                        setPhoneNumberState("invalid");
                                    } else {
                                        setPhoneNumberState("valid");
                                    }
                                }}
                            >
                                {(inputProps) => <Input {...inputProps} id="validationPhoneNumber" type="text" valid={phoneNumberState === "valid"} invalid={phoneNumberState === "invalid"} />}
                            </InputMask>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleValidateAddAdminForm}>
                                <span className="btn-inner--text">Salvar</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    );
}

AdminUserRegister.propTypes = {
    handleShowAdminUserRegister: () => { },
};

AdminUserRegister.propTypes = {
    handleShowAdminUserRegister: PropTypes.func,
}

export default AdminUserRegister;
