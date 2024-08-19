/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
// nodejs library that concatenates classes
import classnames from "classnames";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import useCreateCustomerAccountHolder from '../../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import useCreateClientCompany from '../../../hooks/RecordsHooks/customer/useCreateClientCompany';
import useCNPJ from '../../../hooks/RecordsHooks/useCNPJ';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';

function CustomerUserRegister({ handleShowCustomerUserRegister }) {

    const {
        firstNameState,
        lastNameState,
        taxIdentificationNumber,
        taxIdentificationNumberState,
        emailAddressState,
        birthdateState,
        password,
        passwordState,
        confirmPasswordState,
        phoneNumber,
        phoneNumberState,
        checkbox,
        checkboxState,
        setCheckbox,
        setCheckboxState,
        setFirstName,
        setFirstNameState,
        setLastName,
        setLastNameState,
        setTaxIdentificationNumber,
        setTaxIdentificationNumberState,
        setEmailAddress,
        setEmailAddressState,
        setPassword,
        setPasswordState,
        setConfirmPassword,
        setConfirmPasswordState,
        setPhoneNumber,
        setPhoneNumberState,
        handleValidateAddCustomerAccountHolderForm,
        handleBirthdateChange,
        validateEmail,
        handleChangeCPF,
        validateCheckboxIsChecked,
        isCustomerAccountHolderFormValidated
    } = useCreateCustomerAccountHolder();

    const {
        companyName,
        setCompanyName,
        companyNameState,
        setCompanyNameState,
        registrationName,
        setRegistrationName,
        registrationNameState,
        setRegistrationNameState,
        companyTypes,
        setCompanyTypes,
        companyTypesState,
        setCompanyTypesState,
        customerBusinessPhoneNumber,
        setCustomerBusinessPhoneNumber,
        customerBusinessPhoneNumberState,
        setCustomerBusinessPhoneNumberState,
        customerPhoneNumber,
        setCustomerPhoneNumber,
        customerPhoneNumberState,
        setCustomerPhoneNumberState,
        companyEmailAddress,
        setCompanyEmailAddress,
        companyEmailAddressState,
        setCompanyEmailAddressState,
        customerBusinessSector,
        setCustomerBusinessSector,
        customerBusinessSectorState,
        setCustomerBusinessSectorState,
        customerWebSite,
        setCustomerWebSite,
        customerWebSiteState,
        setCustomerWebSiteState,
        idHeadOfficeBranch,
        setIdHeadOfficeBranch,
        idHeadOfficeBranchState,
        setIdHeadOfficeBranchState,
        customerZipCode,
        setCustomerZipCode,
        customerZipCodeState,
        setCustomerZipCodeState,
        federatedUnit,
        setFederatedUnit,
        federatedUnitState,
        setFederatedUnitState,
        companyCity,
        setCompanyCity,
        companyCityState,
        setCompanyCityState,
        companyAddress,
        setCompanyAddress,
        companyAddressState,
        setCompanyAddressState,
        companyAddressNumber,
        setCompanyAddressNumber,
        companyAddressNumberState,
        setCompanyAddressNumberState,
        companyAddressComplement,
        setCompanyAddressComplement,
        companyAddressComplementState,
        setCompanyAddressComplementState,
        companyDistrict,
        setCompanyDistrict,
        companyDistrictState,
        setCompanyDistrictState,
        handleFormFieldsAutocomplete,
        hasValuesChangedWithAPIData,
        handleValuesChangedWithAPIData,
        validateAddClientCompanyForm,
        validateAddCustomerAddressForm,
        handleValidateAddClientCompanyForm,
        isCustomerCompanyFormValidated,
        validatePhoneNumber,
        validateWebSite,
        validateCompanyEmail
    } = useCreateClientCompany();

    const {
        brasilAPICNPJData,
        loadingCNPJValidation,
        errorCNPJValidation,
        handleCPNJValidationLoading,
        individualEmployerIdNumber,
        handleSaveCNPJ,
        individualEmployerIdNumberState,
        setIndividualEmployerIdNumberState
    } = useCNPJ();

    const [step, setStep] = useState(1);

    const [nameOnCard, setnameOnCard] = React.useState(false);
    const [cardNumber, setcardNumber] = React.useState(false);
    const [date, setdate] = React.useState(false);
    const [ccv, setccv] = React.useState(false);

    const [selectedCompanySector, setSelectedCompanySector] = useState('');
    const [companySectorDataList, setCompanySectorDataList] = useState([
        { id: "0", text: "Privado" },
        { id: "1", text: "Público" },
    ]);
    const handleCompanySectorDataList = (companySector) => {
        setCompanySectorDataList(companySector);
    }

    const [selectedCompanyTypes, setSelectedCompanyTypes] = useState('');
    const [companyTypesDataList, setCompanyTypesDataList] = useState([
        { id: "0", text: "EI" },
        { id: "1", text: "MEI" },
        { id: "2", text: "Ltda" },
        { id: "3", text: "SLU" },
        { id: "4", text: "SS" },
        { id: "5", text: "S/A" },
    ]);
    const handleCompanyTypesDataList = (companyTypes) => {
        setCompanyTypesDataList(companyTypes);
    }

    const handleCheckboxChange = (e) => {
        if (checkbox === null) {
            setCheckbox(true);
        } else {
            setCheckbox(!checkbox);
        }
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (checkbox === null) {
                setCheckbox(false);
            }
            handleValidateAddCustomerAccountHolderForm();
        }
        if (step === 1 && checkboxState === "valid") {
            setStep(step + 1);
        }
        if (step === 2 && individualEmployerIdNumberState === "valid" && checkboxState === "valid") {
            handleValidateAddClientCompanyForm(handleShowCustomerUserRegister);
        }
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        if (checkbox !== null) {
            validateCheckboxIsChecked();
        }
    }, [checkbox])

    useEffect(() => {
        if (brasilAPICNPJData !== null) {
            handleCPNJValidationLoading();
            handleFormFieldsAutocomplete(brasilAPICNPJData);
        }
    }, [brasilAPICNPJData])

    useEffect(() => {
        if (hasValuesChangedWithAPIData) {
            handleValuesChangedWithAPIData(!hasValuesChangedWithAPIData);
            validateAddClientCompanyForm();
            validateAddCustomerAddressForm();
        }
    }, [hasValuesChangedWithAPIData, validateAddClientCompanyForm]);

    return (
        <Row>
            <div className="col">
                <div className="card-wrapper">
                    <Card>
                        <CardHeader className="d-md-flex flex-column flex-md-row align-items-center justify-content-center px-8 pt-5 pb-5 bg-default">
                            <div className="d-md-flex flex-column align-items-center justify-content-center mb-3 mb-md-0">
                                <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 1 ? 'badge-success' : 'badge-default'}`}>1</span>
                                <span className={`text-center font-weight-bold ${step >= 1 ? 'text-success' : 'text-primary'}`}>Criar sua Conta</span>
                            </div>
                            <div className="col">
                                <Progress
                                    color={`${step > 1 ? 'success' : 'light'}`}
                                    className={`progress-xs mb-3 mb-md-0`}
                                    max="100"
                                    value="100"
                                />
                            </div>
                            <div className="d-md-flex flex-column align-items-center justify-content-center mb-3 mb-md-0">
                                <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 2 ? 'badge-success' : 'badge-default'}`}>2</span>
                                <span className={`text-center font-weight-bold ${step >= 2 ? 'text-success' : 'text-primary'}`}>Sua Empresa</span>
                            </div>
                            <div className="col">
                                <Progress
                                    color={`${step > 2 ? 'success' : 'light'}`}
                                    className={`progress-xs mb-3 mb-md-0`}
                                    max="100"
                                    value="100"
                                />
                            </div>
                            <div className="d-md-flex flex-column align-items-center justify-content-center mb-3 mb-md-0">
                                <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 3 ? 'badge-success' : 'badge-default'}`}>3</span>
                                <span className={`text-center font-weight-bold ${step >= 3 ? 'text-success' : 'text-primary'}`}>Pagamento</span>
                            </div>
                        </CardHeader>
                        <CardBody>

                            <Row className="justify-content-center">
                                <Col lg="6" md="6">
                                    <CardBody className="bg-white">
                                        <div>
                                            {step === 1 && (
                                                <div>
                                                    <div>
                                                        <h2>Informe seus dados</h2>
                                                        <Form className="needs-validation" noValidate>
                                                            <div className="form-row">
                                                                <Col className="mb-3" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerFirstName"
                                                                    >
                                                                        Nome
                                                                    </label>
                                                                    <Input
                                                                        id="validationCustomerFirstName"
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
                                                                        htmlFor="validationCustomerLastName"
                                                                    >
                                                                        Sobrenome
                                                                    </label>
                                                                    <Input
                                                                        id="validationCustomerLastName"
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
                                                                <Col className="mb-3" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerTaxIdNumber"
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
                                                                        {(inputProps) => <Input {...inputProps} id="validationCustomerTaxIdNumber" invalid={taxIdentificationNumberState === "invalid"} />}
                                                                    </InputMask>
                                                                    <div className="invalid-feedback">
                                                                        {taxIdentificationNumberState === "invalid" && "Forneça um número de CPF válido."}
                                                                    </div>
                                                                </Col>
                                                                <Col className="mb-3" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerBirthdate"
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
                                                            </div>
                                                            <div className="form-row">
                                                                <Col className="mb-3" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerPhoneNumber"
                                                                    >
                                                                        Número de Telefone
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
                                                                        {(inputProps) => <Input {...inputProps} id="validationCustomerPhoneNumber" type="text" valid={phoneNumberState === "valid"} invalid={phoneNumberState === "invalid"} />}
                                                                    </InputMask>
                                                                    <div className="invalid-feedback">
                                                                        É necessário preencher este campo.
                                                                    </div>
                                                                </Col>
                                                                <Col className="mb-4" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerEmailAddress"
                                                                    >
                                                                        E-mail
                                                                    </label>
                                                                    <Input
                                                                        aria-describedby="inputGroupPrepend"
                                                                        id="validationCustomerEmailAddress"
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
                                            )}

                                            {step === 2 && (
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
                                                                        placeholder="99.999.999/9999-99"
                                                                        mask="99.999.999/9999-99"
                                                                        maskChar="_"
                                                                        value={individualEmployerIdNumber}
                                                                        onChange={(e) => handleSaveCNPJ(e.target.value)}
                                                                    >
                                                                        {(inputProps) => <Input {...inputProps} id="validationCustomerIndividualEmployerIdnNumber" valid={individualEmployerIdNumberState === "valid"} invalid={individualEmployerIdNumberState === "invalid"} />}
                                                                    </InputMask>
                                                                    {
                                                                        loadingCNPJValidation ? <div style={{ display: 'none', width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#5e72e4' }}>Validando CNPJ...</div> : (
                                                                            errorCNPJValidation !== null ? <div className="invalid-feedback">Ocorreu um erro ao validar o CNPJ.</div> : (
                                                                                brasilAPICNPJData ? <div className="valid-feedback">CNPJ válido!</div> : <div className="invalid-feedback">CNPJ inválido!</div>
                                                                            )
                                                                        )
                                                                    }
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
                                                                        value={companyName}
                                                                        type="text"
                                                                        valid={companyNameState === "valid"}
                                                                        invalid={companyNameState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setCompanyName(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setCompanyNameState("invalid");
                                                                            } else {
                                                                                setCompanyNameState("valid");
                                                                            }
                                                                        }}
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
                                                                        htmlFor="validationCustomerRegistrationName"
                                                                    >
                                                                        Razão Social
                                                                    </label>
                                                                    <Input
                                                                        defaultValue="Nome ou termo de registro"
                                                                        id="validationCustomerRegistrationName"
                                                                        placeholder="Nome ou termo de registro"
                                                                        value={registrationName}
                                                                        type="text"
                                                                        valid={registrationNameState === "valid"}
                                                                        invalid={registrationNameState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setRegistrationName(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setRegistrationNameState("invalid");
                                                                            } else {
                                                                                setRegistrationNameState("valid");
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
                                                                        htmlFor="validationCustomerCompanyTypes"
                                                                    >
                                                                        Tipo de Empresa
                                                                    </label>
                                                                    <Select2
                                                                        id="validationCustomerCompanyTypes"
                                                                        className="form-control"
                                                                        data-minimum-results-for-search="Infinity"
                                                                        options={{
                                                                            placeholder: "Selecione o tipo",
                                                                        }}
                                                                        value={selectedCompanyTypes}
                                                                        onChange={(e) => setSelectedCompanyTypes(e.target.value)}
                                                                        data={companyTypesDataList}
                                                                        onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, companyTypesDataList, setSelectedCompanyTypes, setCompanyTypes, setCompanyTypesState, null)}
                                                                    />
                                                                </Col>
                                                            </div>
                                                            <div className="form-row">
                                                                <Col className="mb-3" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerBusinessPhoneNumber"
                                                                    >
                                                                        Número de Telefone
                                                                    </label>
                                                                    <InputMask
                                                                        placeholder="+55 (99) 9999-9999"
                                                                        mask="+55 (99) 9999-9999"
                                                                        maskChar=" "
                                                                        value={customerBusinessPhoneNumber}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            setCustomerBusinessPhoneNumber(value);
                                                                            if (value === "" || !validatePhoneNumber(value, 'business')) {
                                                                                setCustomerBusinessPhoneNumberState("invalid");
                                                                            } else {
                                                                                setCustomerBusinessPhoneNumberState("valid");
                                                                            }
                                                                        }}
                                                                    >
                                                                        {(inputProps) => <Input {...inputProps} id="validationCustomerBusinessPhoneNumber" type="text" valid={customerBusinessPhoneNumberState === "valid"} invalid={customerBusinessPhoneNumberState === "invalid"} />}
                                                                    </InputMask>
                                                                    <div className="invalid-feedback">
                                                                        É necessário preencher este campo.
                                                                    </div>
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
                                                                        value={customerPhoneNumber}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            setCustomerPhoneNumber(value);
                                                                            if (value !== "" && !validatePhoneNumber(value, 'personal')) {
                                                                                setCustomerPhoneNumberState("invalid");
                                                                            } else {
                                                                                setCustomerPhoneNumberState(value === "" ? null : "valid");
                                                                            }
                                                                        }}
                                                                    >
                                                                        {(inputProps) => <Input {...inputProps}
                                                                            id="validationCustomerPhoneNumber"
                                                                            type="text"
                                                                            valid={customerPhoneNumberState === "valid"}
                                                                            invalid={customerPhoneNumberState === "invalid"}
                                                                        />}
                                                                    </InputMask>
                                                                    <div className="invalid-feedback">
                                                                        É necessário preencher este campo corretamente.
                                                                    </div>
                                                                </Col>
                                                            </div>
                                                            <div className="form-row">
                                                                <Col className="mb-4" md="12">
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
                                                                        valid={companyEmailAddressState === "valid"}
                                                                        invalid={companyEmailAddressState === "invalid"}
                                                                        onChange={(e) => {
                                                                            const email = e.target.value;
                                                                            setCompanyEmailAddress(email);
                                                                            if (validateCompanyEmail(email)) {
                                                                                setCompanyEmailAddressState("valid");
                                                                            } else {
                                                                                setCompanyEmailAddressState("invalid");
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        {companyEmailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
                                                                    </div>
                                                                </Col>
                                                            </div>
                                                            <div className="form-row">
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
                                                                        value={customerWebSite}
                                                                        type="text"
                                                                        valid={customerWebSiteState === "valid"}
                                                                        invalid={customerWebSiteState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setCustomerWebSite(e.target.value);
                                                                            if (e.target.value !== "" && !validateWebSite(e.target.value)) {
                                                                                setCustomerWebSiteState("invalid");
                                                                            } else {
                                                                                setCustomerWebSiteState(e.target.value === "" ? null : "valid");
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        É necessário preencher este campo corretamente.
                                                                    </div>
                                                                </Col>
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
                                                                        value={idHeadOfficeBranch}
                                                                        type="text"
                                                                        valid={idHeadOfficeBranchState === "valid"}
                                                                        invalid={idHeadOfficeBranchState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setIdHeadOfficeBranch(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setIdHeadOfficeBranchState("invalid");
                                                                            } else {
                                                                                setIdHeadOfficeBranchState("valid");
                                                                            }
                                                                        }}
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
                                                                        htmlFor="validationCustomerBusinessSector"
                                                                    >
                                                                        Setor
                                                                    </label>
                                                                    <Select2
                                                                        id="validationCustomerBusinessSector"
                                                                        className="form-control"
                                                                        data-minimum-results-for-search="Infinity"
                                                                        options={{
                                                                            placeholder: "Selecione o setor",
                                                                        }}
                                                                        value={selectedCompanySector}
                                                                        onChange={(e) => setSelectedCompanySector(e.target.value)}
                                                                        data={companySectorDataList}
                                                                        onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, companySectorDataList, setSelectedCompanySector, setCustomerBusinessSector, setCustomerBusinessSectorState, null)}
                                                                    />
                                                                </Col>
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
                                                                        maskChar=" "
                                                                        value={customerZipCode}
                                                                        onChange={(e) => {
                                                                            setCustomerZipCode(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setCustomerZipCodeState("invalid");
                                                                            } else {
                                                                                setCustomerZipCodeState("valid");
                                                                            }
                                                                        }}
                                                                    >
                                                                        {(inputProps) => <Input {...inputProps} id="validationCustomerZipCode" type="text" valid={customerZipCodeState === "valid"} invalid={customerZipCodeState === "invalid"} />}
                                                                    </InputMask>
                                                                    <div className="invalid-feedback">
                                                                        É necessário selecionar uma opção.
                                                                    </div>
                                                                </Col>
                                                            </div>
                                                            <div className="form-row">
                                                                <Col className="mb-3" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerFederatedUnit"
                                                                    >
                                                                        Estado
                                                                    </label>
                                                                    <Input
                                                                        defaultValue=""
                                                                        id="validationCustomerFederatedUnit"
                                                                        placeholder=""
                                                                        value={federatedUnit}
                                                                        type="text"
                                                                        valid={federatedUnitState === "valid"}
                                                                        invalid={federatedUnitState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setFederatedUnit(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setFederatedUnitState("invalid");
                                                                            } else {
                                                                                setFederatedUnitState("valid");
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        É necessário selecionar uma opção.
                                                                    </div>
                                                                </Col>
                                                                <Col className="mb-3" md="6">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerCompanyCity"
                                                                    >
                                                                        Cidade
                                                                    </label>
                                                                    <Input
                                                                        defaultValue=""
                                                                        id="validationCustomerCompanyCity"
                                                                        placeholder=""
                                                                        value={companyCity}
                                                                        type="text"
                                                                        valid={companyCityState === "valid"}
                                                                        invalid={companyCityState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setCompanyCity(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setCompanyCityState("invalid");
                                                                            } else {
                                                                                setCompanyCityState("valid");
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        É necessário preencher este campo.
                                                                    </div>
                                                                </Col>
                                                            </div>
                                                            <div className="form-row">
                                                                <Col className="mb-3" md="10">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerCompanyAddress"
                                                                    >
                                                                        Endereço
                                                                    </label>
                                                                    <Input
                                                                        defaultValue=""
                                                                        id="validationCustomerCompanyAddress"
                                                                        placeholder=""
                                                                        value={companyAddress}
                                                                        type="text"
                                                                        valid={companyAddressState === "valid"}
                                                                        invalid={companyAddressState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setCompanyAddress(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setCompanyAddressState("invalid");
                                                                            } else {
                                                                                setCompanyAddressState("valid");
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        É necessário preencher este campo.
                                                                    </div>
                                                                </Col>
                                                                <Col className="mb-3" md="2">
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="validationCustomerCompanyAddressNumber"
                                                                    >
                                                                        Número
                                                                    </label>
                                                                    <Input
                                                                        defaultValue="0000"
                                                                        id="validationCustomerCompanyAddressNumber"
                                                                        placeholder="0000"
                                                                        value={companyAddressNumber}
                                                                        type="text"
                                                                        valid={companyAddressNumberState === "valid"}
                                                                        invalid={companyAddressNumberState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setCompanyAddressNumber(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setCompanyAddressNumberState("invalid");
                                                                            } else {
                                                                                setCompanyAddressNumberState("valid");
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
                                                                        htmlFor="validationCustomerCompanyAddressComplement"
                                                                    >
                                                                        Complemento (opcional)
                                                                    </label>
                                                                    <Input
                                                                        id="validationCustomerCompanyAddressComplement"
                                                                        placeholder=""
                                                                        value={companyAddressComplement}
                                                                        type="text"
                                                                        valid={companyAddressComplementState === "valid"}
                                                                        invalid={companyAddressComplementState === "invalid"}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            setCompanyAddressComplement(value);
                                                                            if (value === "") {
                                                                                setCompanyAddressComplementState(null);
                                                                            } else {
                                                                                setCompanyAddressComplementState("valid");
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
                                                                        htmlFor="validationCustomerCompanyDistrict"
                                                                    >
                                                                        Bairro
                                                                    </label>
                                                                    <Input
                                                                        defaultValue=""
                                                                        id="validationCustomerCompanyDistrict"
                                                                        placeholder=""
                                                                        value={companyDistrict}
                                                                        type="text"
                                                                        valid={companyDistrictState === "valid"}
                                                                        invalid={companyDistrictState === "invalid"}
                                                                        onChange={(e) => {
                                                                            setCompanyDistrict(e.target.value);
                                                                            if (e.target.value === "") {
                                                                                setCompanyDistrictState("invalid");
                                                                            } else {
                                                                                setCompanyDistrictState("valid");
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">
                                                                        É necessário preencher este campo.
                                                                    </div>
                                                                </Col>

                                                            </div>
                                                        </Form>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 3 && (
                                                <div>
                                                    <div>
                                                        <h2>Informações de pagamento</h2>
                                                        {/* <div className="custom-control custom-radio mb-4">
                                                            <input
                                                                className="custom-control-input"
                                                                defaultChecked
                                                                id="customRadio6"
                                                                name="custom-radio-1"
                                                                type="radio"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio6"
                                                            >
                                                                Cartão de crédito
                                                            </label>
                                                        </div> */}
                                                        <Card className="bg-gradient-default">
                                                            <CardBody>
                                                                <Row className="justify-content-between align-items-center">
                                                                    <div className="col">
                                                                        <img
                                                                            alt="..."
                                                                            src={require("assets/img/icons/cards/mastercard.png")}
                                                                        />
                                                                    </div>
                                                                    <Col className="col-auto">
                                                                        <div className="d-flex align-items-center">
                                                                            <small className="text-white font-weight-bold mr-3">
                                                                                Make default
                                                                            </small>
                                                                            <div>
                                                                                <label className="custom-toggle custom-toggle-white">
                                                                                    <input defaultChecked type="checkbox" />
                                                                                    <span
                                                                                        className="custom-toggle-slider rounded-circle"
                                                                                        data-label-off="No"
                                                                                        data-label-on="Yes"
                                                                                    />
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <div className="mt-4">
                                                                    <Form className="form-primary" role="form">
                                                                        <FormGroup>
                                                                            <InputGroup
                                                                                className={classnames("input-group-alternative mb-3", {
                                                                                    focused: nameOnCard,
                                                                                })}
                                                                            >
                                                                                <InputGroupAddon addonType="prepend">
                                                                                    <InputGroupText>
                                                                                        <i className="ni ni-single-02" />
                                                                                    </InputGroupText>
                                                                                </InputGroupAddon>
                                                                                <Input
                                                                                    placeholder="Name on card"
                                                                                    type="text"
                                                                                    onFocus={(e) => setnameOnCard(true)}
                                                                                    onBlur={(e) => setnameOnCard(false)}
                                                                                />
                                                                            </InputGroup>
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <InputGroup
                                                                                className={classnames("input-group-alternative mb-3", {
                                                                                    focused: cardNumber,
                                                                                })}
                                                                            >
                                                                                <InputGroupAddon addonType="prepend">
                                                                                    <InputGroupText>
                                                                                        <i className="ni ni-credit-card" />
                                                                                    </InputGroupText>
                                                                                </InputGroupAddon>
                                                                                <Input
                                                                                    placeholder="Card number"
                                                                                    type="text"
                                                                                    onFocus={(e) => setcardNumber(true)}
                                                                                    onBlur={(e) => setcardNumber(false)}
                                                                                />
                                                                            </InputGroup>
                                                                        </FormGroup>
                                                                        <Row>
                                                                            <Col xs="6">
                                                                                <FormGroup>
                                                                                    <InputGroup
                                                                                        className={classnames(
                                                                                            "input-group-alternative mb-3",
                                                                                            {
                                                                                                focused: date,
                                                                                            }
                                                                                        )}
                                                                                    >
                                                                                        <InputGroupAddon addonType="prepend">
                                                                                            <InputGroupText>
                                                                                                <i className="ni ni-calendar-grid-58" />
                                                                                            </InputGroupText>
                                                                                        </InputGroupAddon>
                                                                                        <Input
                                                                                            placeholder="MM/YY"
                                                                                            type="text"
                                                                                            onFocus={(e) => setdate(true)}
                                                                                            onBlur={(e) => setdate(false)}
                                                                                        />
                                                                                    </InputGroup>
                                                                                </FormGroup>
                                                                            </Col>
                                                                            <Col xs="6">
                                                                                <FormGroup>
                                                                                    <InputGroup
                                                                                        className={classnames("input-group-alternative", {
                                                                                            focused: ccv,
                                                                                        })}
                                                                                    >
                                                                                        <InputGroupAddon addonType="prepend">
                                                                                            <InputGroupText>
                                                                                                <i className="ni ni-lock-circle-open" />
                                                                                            </InputGroupText>
                                                                                        </InputGroupAddon>
                                                                                        <Input
                                                                                            placeholder="CCV"
                                                                                            type="text"
                                                                                            onFocus={(e) => setccv(true)}
                                                                                            onBlur={(e) => setccv(false)}
                                                                                        />
                                                                                    </InputGroup>
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                        <Button block color="info" type="button">
                                                                            Save new card
                                                                        </Button>
                                                                    </Form>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                        {/* <div className="custom-control custom-radio mb-3">
                                                            <input
                                                                className="custom-control-input"
                                                                id="customRadio5"
                                                                name="custom-radio-1"
                                                                type="radio"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio5"
                                                            >
                                                                Boleto
                                                            </label>
                                                        </div>
                                                        <div className="custom-control custom-radio mb-3">
                                                            <input
                                                                className="custom-control-input"
                                                                id="customRadio5"
                                                                name="custom-radio-1"
                                                                type="radio"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio5"
                                                            >
                                                                Pix
                                                            </label>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            )}

                                            {step > 1 &&
                                                <Button
                                                    color="primary"
                                                    type="button"
                                                    // onClick={validateCustomStylesForm}
                                                    onClick={handlePrevStep}
                                                >
                                                    Voltar
                                                </Button>
                                            }
                                        </div>
                                    </CardBody>
                                </Col>
                                {/* Componente OfertaSelecionada com botão para avançar */}
                                {/* <OfertaSelecionada onNextStep={handleNextStep} /> */}
                                <Col lg="6" md="6">
                                    <div className="pricing card-group flex-column flex-md-row mb-3">
                                        <Card className="card-pricing border-0 text-center mb-4">
                                            <CardHeader className="bg-lighter">
                                                <h4 className="text-uppercase ls-1 text-info py-3 mb-0">
                                                    Plano Básico
                                                </h4>
                                            </CardHeader>
                                            <CardBody className="px-lg-5 bg-lighter">
                                                <div className="display-2">R$99</div>
                                                <span className="text-muted">por empresa</span>
                                                <ul className="list-unstyled my-4">
                                                    <li>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                                                    <i className="fas fa-chart-line" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="pl-2">Pesquisas de Desempenho Individual</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                                                    <i className="fas fa-trophy" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="pl-2">
                                                                    Avaliações de Competências
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                                                    <i className="fas fa-comments" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="pl-2">Feedback 360 Graus</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                                                    <i className="fas fa-poll" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="pl-2">Enquetes de Engajamento</span>
                                                            </div>
                                                        </div>
                                                    </li>

                                                </ul>
                                                <Button className="mb-3" color="info" type="button" onClick={handleNextStep}>
                                                    Próximo
                                                </Button>
                                            </CardBody>
                                            <CardFooter className="bg-lighter">
                                                <a
                                                    className="text-light"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Falar com um consultor
                                                </a>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Row>
    );
}

export default CustomerUserRegister;
