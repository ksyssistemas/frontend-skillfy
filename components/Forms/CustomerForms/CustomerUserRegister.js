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
import { IndividualRegistration } from "components/Forms/AuthForms/CheckoutForms/WizardSessions/IndividualRegistration";
import { LegalEntityRegistration } from "components/Forms/AuthForms/CheckoutForms/WizardSessions/LegalEntityRegistration";
import { RegisteringPaymentData } from "components/Forms/AuthForms/CheckoutForms/WizardSessions/RegisteringPaymentData";
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

function CustomerUserRegister() {

    // const {
    //     firstNameState,
    //     lastNameState,
    //     taxIdentificationNumber,
    //     taxIdentificationNumberState,
    //     emailAddressState,
    //     birthdateState,
    //     password,
    //     passwordState,
    //     confirmPasswordState,
    //     phoneNumber,
    //     phoneNumberState,
    //     checkbox,
    //     checkboxState,
    //     setCheckbox,
    //     setCheckboxState,
    //     setFirstName,
    //     setFirstNameState,
    //     setLastName,
    //     setLastNameState,
    //     setTaxIdentificationNumber,
    //     setTaxIdentificationNumberState,
    //     setEmailAddress,
    //     setEmailAddressState,
    //     setPassword,
    //     setPasswordState,
    //     setConfirmPassword,
    //     setConfirmPasswordState,
    //     setPhoneNumber,
    //     setPhoneNumberState,
    //     handleValidateAddCustomerAccountHolderForm,
    //     handleBirthdateChange,
    //     validateEmail,
    //     handleChangeCPF,
    //     validateCheckboxIsChecked,
    //     isCustomerAccountHolderFormValidated
    // } = useCreateCustomerAccountHolder();

    // const {
    //     companyName,
    //     setCompanyName,
    //     companyNameState,
    //     setCompanyNameState,
    //     registrationName,
    //     setRegistrationName,
    //     registrationNameState,
    //     setRegistrationNameState,
    //     companyTypes,
    //     setCompanyTypes,
    //     companyTypesState,
    //     setCompanyTypesState,
    //     customerBusinessPhoneNumber,
    //     setCustomerBusinessPhoneNumber,
    //     customerBusinessPhoneNumberState,
    //     setCustomerBusinessPhoneNumberState,
    //     customerPhoneNumber,
    //     setCustomerPhoneNumber,
    //     customerPhoneNumberState,
    //     setCustomerPhoneNumberState,
    //     companyEmailAddress,
    //     setCompanyEmailAddress,
    //     companyEmailAddressState,
    //     setCompanyEmailAddressState,
    //     customerBusinessSector,
    //     setCustomerBusinessSector,
    //     customerBusinessSectorState,
    //     setCustomerBusinessSectorState,
    //     customerWebSite,
    //     setCustomerWebSite,
    //     customerWebSiteState,
    //     setCustomerWebSiteState,
    //     idHeadOfficeBranch,
    //     setIdHeadOfficeBranch,
    //     idHeadOfficeBranchState,
    //     setIdHeadOfficeBranchState,
    //     customerZipCode,
    //     setCustomerZipCode,
    //     customerZipCodeState,
    //     setCustomerZipCodeState,
    //     federatedUnit,
    //     setFederatedUnit,
    //     federatedUnitState,
    //     setFederatedUnitState,
    //     companyCity,
    //     setCompanyCity,
    //     companyCityState,
    //     setCompanyCityState,
    //     companyAddress,
    //     setCompanyAddress,
    //     companyAddressState,
    //     setCompanyAddressState,
    //     companyAddressNumber,
    //     setCompanyAddressNumber,
    //     companyAddressNumberState,
    //     setCompanyAddressNumberState,
    //     companyAddressComplement,
    //     setCompanyAddressComplement,
    //     companyAddressComplementState,
    //     setCompanyAddressComplementState,
    //     companyDistrict,
    //     setCompanyDistrict,
    //     companyDistrictState,
    //     setCompanyDistrictState,
    //     handleFormFieldsAutocomplete,
    //     hasValuesChangedWithAPIData,
    //     handleValuesChangedWithAPIData,
    //     validateAddClientCompanyForm,
    //     validateAddCustomerAddressForm,
    //     handleValidateAddClientCompanyForm,
    //     isCustomerCompanyFormValidated,
    //     validatePhoneNumber,
    //     validateWebSite,
    //     validateCompanyEmail
    // } = useCreateClientCompany();

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

    const { handleValidateAddCustomerAccountHolderForm } = useCreateCustomerAccountHolder(individualRegistrationData);
    const { handleValidateAddClientCompanyForm } = useCreateClientCompany(legalEntityRegistrationData);

    const [individualRegistrationData, setIndividualRegistrationData] = useState({
        firstName: '',
        lastName: '',
        taxIdentificationNumber: '',
        birthdate: '',
        phoneNumber: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        firstNameState: '',
        lastNameState: '',
        taxIdentificationNumberState: '',
        birthdateState: '',
        phoneNumberState: '',
        emailAddressState: '',
        passwordState: '',
        confirmPasswordState: '',
        checkbox: '',
        checkboxState: ''
    });

    const [legalEntityRegistrationData, setLegalEntityRegistrationData] = useState({
        individualEmployerIdNumber: '',
        companyName: '',
        registrationName: '',
        selectedCompanyTypes: '',
        customerBusinessPhoneNumber: '',
        customerPhoneNumber: '',
        zipCode: '',
        federatedUnit: '',
        companyAddressNumber: '',
        companyAddressComplement: '',
        companyDistrict: '',
        selectedCompanySector: '',
        idHeadOfficeBranch: '',
        customerWebSite: '',
        companyEmailAddress: '',
        companyAddress: '',
        individualEmployerIdNumberState: '',
        companyNameState: '',
        registrationNameState: '',
        selectedCompanyTypesState: '',
        customerBusinessPhoneNumberState: '',
        customerPhoneNumberState: '',
        zipCodeState: '',
        federatedUnitState: '',
        companyAddressNumberState: '',
        companyAddressComplementState: '',
        companyDistrictState: '',
        selectedCompanySectorState: '',
        idHeadOfficeBranchState: '',
        customerWebSiteState: '',
        companyEmailAddressState: '',
        companyAddressState: ''
    });

    const updateLegalEntityRegistrationData = (field, value) => {
        setLegalEntityRegistrationData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const updateIndividualRegistrationData = (field, value) => {
        setIndividualRegistrationData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (individualRegistrationData.checkbox === null) {
                setCheckbox(false);
            }
            handleValidateAddCustomerAccountHolderForm();
        }
        if (step === 1 && individualRegistrationData.checkboxState === "valid") {
            console.log('Individual Registration Data:', individualRegistrationData);
            console.log('Legal Entity Registration Data:', legalEntityRegistrationData);
            setStep(step + 1);
        }
        if (step === 2 && legalEntityRegistrationData.individualEmployerIdNumberState === "valid") {
            handleValidateAddClientCompanyForm();
            console.log(`ROTA: ${process.env.NEXT_PUBLIC_CONTACT_PERSON}`)
        }
    };

    const handlePrevStep = () => {
        console.log('Individual Registration Data:', individualRegistrationData);
        console.log('Legal Entity Registration Data:', legalEntityRegistrationData);
        setStep(step - 1);
    };

    // useEffect(() => {
    //     if (checkbox !== null) {
    //         validateCheckboxIsChecked();
    //     }
    // }, [checkbox])

    useEffect(() => {
        if (brasilAPICNPJData !== null) {
            handleCPNJValidationLoading();
            handleFormFieldsAutocomplete(brasilAPICNPJData);
        }
    }, [brasilAPICNPJData])

    // useEffect(() => {
    //     if (hasValuesChangedWithAPIData) {
    //         handleValuesChangedWithAPIData(!hasValuesChangedWithAPIData);
    //         validateAddClientCompanyForm();
    //         validateAddCustomerAddressForm();
    //     }
    // }, [hasValuesChangedWithAPIData, validateAddClientCompanyForm]);

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
                                <Col lg="12" md="12">
                                    <CardBody className="bg-white">
                                        <div>
                                            {step === 1 && (
                                                <IndividualRegistration
                                                    data={individualRegistrationData}
                                                    updateData={updateIndividualRegistrationData}
                                                />
                                            )}
                                            {step === 2 && (
                                                <LegalEntityRegistration
                                                    data={legalEntityRegistrationData}
                                                    updateData={updateLegalEntityRegistrationData}
                                                />
                                            )}
                                            {step === 3 && (
                                                <RegisteringPaymentData />
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
                            </Row>
                            <Row>
                                <Col className='d-flex justify-content-end'>
                                    <Button className="mb-3" color="info" type="button" onClick={handleNextStep}>
                                        Próximo
                                    </Button>
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
