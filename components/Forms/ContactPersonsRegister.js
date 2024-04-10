import React, { useState, useEffect } from 'react';

import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col, Table } from "reactstrap";
import useDepartmentSelect from "../../hooks/department/useDepartmentSelect";
import useDepartmentForm from "../../hooks/department/useDepartmentForm";

function ContactPersonsRegister() {

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        if (selectedDepartment) {
            console.log("Selected Department updated:", selectedDepartment);
            // Você pode adicionar lógica adicional aqui, se necessário
        }
    }, [selectedDepartment]);


    /** back a list of departments*/
    const departments = useDepartmentSelect();

    const { formData, handleDepartmentChange, onSubmit } = useDepartmentForm();

    return (
        <Form>
            <Card className="mb-4">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Pessoa de Contato</h3>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="DepartmentNameInput"
                                >
                                    Nome
                                </label>
                                <Input
                                    defaultValue="Mark"
                                    id="validationDefault01"
                                    placeholder="First name"
                                    required
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="DepartmentNameInput"
                                >
                                    E-mail
                                </label>
                                <Input
                                    defaultValue="seu@email.com"
                                    id="validationDefault01"
                                    placeholder="E-mail"
                                    required
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="DepartmentNameInput"
                                >
                                    Telefone
                                </label>
                                <Input
                                    defaultValue="+00 (00) 00000-0000"
                                    id="validationDefault01"
                                    placeholder="Telefone"
                                    required
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="reportToDepartmentInput">
                                    Cliente
                                </label>
                                <Form>
                                    <Select2
                                        className="form-control"
                                        defaultValue="0"
                                        options={{
                                            placeholder: "Selecione um cliente",
                                        }}
                                        data={[
                                            { id: "0", text: "Selecione o cliente" },
                                            { id: "1", text: "Alerts" },
                                            { id: "2", text: "Badges" },
                                            { id: "3", text: "Buttons" },
                                            { id: "4", text: "Cards" },
                                            { id: "5", text: "Forms" },
                                            { id: "6", text: "Modals" },
                                        ]}
                                    />
                                </Form>
                            </FormGroup>

                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="DepartmentNameInput"
                                >
                                    Ocupação
                                </label>
                                <Input
                                    defaultValue="Financeiro"
                                    id="validationDefault01"
                                    placeholder="Occupation"
                                    required
                                    type="text"
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md="4" />
                        <Col className="d-flex justify-content-end align-items-center" md="8" >
                            <Button className="px-5" color="primary" size="lg" type="button">
                                <span className="btn-inner--text">Adicionar</span>
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Form>
    );
}

export default ContactPersonsRegister;
