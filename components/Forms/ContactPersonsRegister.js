import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col, Table } from "reactstrap";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import useCreateCustomerAccountHolder from '../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import { useFindAllClientCompany } from '../../hooks/RecordsHooks/customer/useFindAllClientCompany';
import { employmentContractDataSearchAndProcess } from '../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../util/handleSelectionEmploymentContractData';

function ContactPersonsRegister({ handleShowContactPersonsUserRegister }) {

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
    } = useCreateCustomerAccountHolder(handleShowContactPersonsUserRegister);

    const [selectedBelongingToClientCompany, setSelectedBelongingToClientCompany] = useState('');
    const [clientCompanyDataList, setClientCompanyDataList] = useState([]);
    const handleClientCompanyDataList = (customerUser) => {
        setClientCompanyDataList(customerUser);
    }

    useEffect(() => {
        if (clientCompanyDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllClientCompany, handleClientCompanyDataList, 'client-company', 'EmployeeUserRegister');
        }
    }, []);

    return (
        <Form>
            <Card className="mb-4">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Pessoa de Contato</h3>
                </CardHeader>
                <CardBody>
                    <Form className="needs-validation" noValidate>
                        <div className="form-row">
                            <Col className="mb-3" md="4">
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
                            </Col>
                            <Col className="mb-3" md="4">
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
                            </Col>
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationContactPersonTaxIdNumber"
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
                                    {(inputProps) => <Input {...inputProps} id="validationContactPersonTaxIdNumber" invalid={taxIdentificationNumberState === "invalid"} />}
                                </InputMask>
                                <div className="invalid-feedback">
                                    {taxIdentificationNumberState === "invalid" && "Forneça um número de CPF válido."}
                                </div>
                            </Col>
                        </div>
                        <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationContactPersonBirthdate"
                                >
                                    Data de Nascimento
                                </label>
                                <ReactDatetime
                                    inputProps={{
                                        placeholder: "__/__/__",
                                    }}
                                    timeFormat={false}
                                    onChange={handleBirthdateChange}

                                />
                            </Col>
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationContactPersonPhoneNumber"
                                >
                                    Celular
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
                            </Col>
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationContactPersonOccupation"
                                >
                                    Ocupação
                                </label>
                                <Input
                                    id="validationContactPersonOccupation"
                                    placeholder="Ocupação"
                                    type="text"
                                    valid={contactPersonOccupationState === "valid"}
                                    invalid={contactPersonOccupationState === "invalid"}
                                    onChange={(e) => {
                                        setContactPersonOccupation(e.target.value);
                                        if (e.target.value === "") {
                                            setContactPersonOccupationState("invalid");
                                        } else {
                                            setContactPersonOccupationState("valid");
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                            </Col>
                        </div>
                        <div className="form-row">
                            <Col className="mb-4" md="6">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationContactPersonEmailAddress"
                                >
                                    E-mail
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
                            </Col>
                            <Col className="mb-3" md="6">
                                <label className="form-control-label" htmlFor="validationContactPersonBelonging">
                                    Cliente
                                </label>
                                <Select2
                                    id="validationContactPersonBelonging"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{
                                        placeholder: "Selecione um cliente",
                                    }}
                                    value={selectedBelongingToClientCompany}
                                    onChange={(e) => setSelectedBelongingToClientCompany(e.target.value)}
                                    data={clientCompanyDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(
                                        e.target.value,
                                        clientCompanyDataList,
                                        setSelectedBelongingToClientCompany,
                                        setContactPersonBelongsToClientCompany,
                                        setContactPersonBelongsToClientCompanyState,
                                        null,
                                        null,
                                        'id'
                                    )}
                                />
                            </Col>
                        </div>
                        <Row>
                            <Col md="4" />
                            <Col className="d-flex justify-content-end align-items-center" md="8" >
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={() => handleValidateAddCustomerAccountHolderForm(true)}>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Form >
    );
}

export default ContactPersonsRegister;
