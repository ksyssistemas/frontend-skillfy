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

export function CompetenciesRegister() {
    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Adicionar Competências</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
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
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmailAddress"
                            >
                                Descrição
                            </label>
                            <Input
                            // aria-describedby="inputGroupPrepend"
                            // id="validationEmailAddress"
                            // placeholder="Endereço de e-mail"
                            // type="email"
                            // valid={emailAddressState === "valid"}
                            // invalid={emailAddressState === "invalid"}
                            // onChange={(e) => {
                            //     const email = e.target.value;
                            //     setEmailAddress(email);
                            //     if (validateEmail(email)) {
                            //         setEmailAddressState("valid");
                            //     } else {
                            //         setEmailAddressState("invalid");
                            //     }
                            // }}
                            />
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