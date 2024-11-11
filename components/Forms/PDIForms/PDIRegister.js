import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes

// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    Col,
    Button,
    Card,
    CardBody,
    CardHeader,
    Row
} from "reactstrap";
import ReactDatetime from "react-datetime";
import PropTypes from "prop-types";
import InputMask from 'react-input-mask';
export function PDIRegister() {
   
    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Adicionar PDI</h3>
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
                            // id="validationFirstName"
                            // placeholder="Nome"
                            // type="text"
                            // valid={firstNameState === "valid"}
                            // invalid={firstNameState === "invalid"}
                            // onChange={(e) => {
                            //     setFirstName(e.target.value);
                            //     if (e.target.value === "") {
                            //         setFirstNameState("invalid");
                            //     } else {
                            //         setFirstNameState("valid");
                            //     }
                            // }}
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
                                Descrição
                            </label>
                            <Input
                            // id="validationCustomLastName"
                            // placeholder="Sobrenome"
                            // type="text"
                            // valid={lastNameState === "valid"}
                            // invalid={lastNameState === "invalid"}
                            // onChange={(e) => {
                            //     setLastName(e.target.value);
                            //     if (e.target.value === "") {
                            //         setLastNameState("invalid");
                            //     } else {
                            //         setLastNameState("valid");
                            //     }
                            // }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmailAddress"
                            >
                                Data de início
                            </label>
                            <ReactDatetime
                                // inputProps={{
                                //     placeholder: "__/__/__",
                                // }}
                                // timeFormat={false}
                                // onChange={(e) => handleDateFormatting(e, setBirthdate, setBirthdateState)}
                                />
                                {/* <div className="invalid-feedback">
                            É necessário selecionar uma data.
                        </div> */}
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationBirthdate"
                                >
                                    Data de Fim
                                </label>
                                <ReactDatetime
                                // inputProps={{
                                //     placeholder: "__/__/__",
                                // }}
                                // timeFormat={false}
                                // onChange={(e) => handleDateFormatting(e, setBirthdate, setBirthdateState)}
                                />
                                {/* <div className="invalid-feedback">
                            É necessário selecionar uma data.
                        </div> */}
                            </FormGroup>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationPassword"
                            >
                                Avaliador
                            </label>
                            <Input
                            // id="validationPassword"
                            // placeholder="Senha de acesso ao sistema"
                            // type="password"
                            // valid={passwordState === "valid"}
                            // invalid={passwordState === "invalid"}
                            // onChange={(e) => {
                            //     setPassword(e.target.value);
                            //     if (e.target.value === "") {
                            //         setPasswordState("invalid");
                            //     } else {
                            //         setPasswordState("valid");
                            //     }
                            // }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationConfirmPassword"
                            >
                                Avaliado
                            </label>
                            <Input
                            // id="validationConfirmPassword"
                            // placeholder="Confirme a senha digitada"
                            // type="password"
                            // valid={confirmPasswordState === "valid"}
                            // invalid={confirmPasswordState === "invalid"}
                            // onChange={(e) => {
                            //     setConfirmPassword(e.target.value);
                            //     if (e.target.value === "") {
                            //         setConfirmPasswordState("invalid");
                            //     } else if (e.target.value === password) {
                            //         setConfirmPasswordState("valid");
                            //     } else {
                            //         setConfirmPasswordState("invalid");
                            //     }
                            // }}
                            />
                            <div className="invalid-feedback">
                            </div>
                        </Col>
                    </div>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" type="button" >
                                <span className="btn-inner--text">Salvar</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}