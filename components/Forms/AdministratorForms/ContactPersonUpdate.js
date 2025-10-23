import { Card, CardBody, Col, Form, Input } from "reactstrap";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"))
import InputMask from 'react-input-mask';
import ReactDatetime from "react-datetime";
import { useContext, useEffect, useState } from "react";
import { ContactPersonContext } from "../../../contexts/RecordsContext/ContactPersonContext";
import { useFindContactPerson } from "../../../hooks/RecordsHooks/contactPerson/useFindContactPerson";
import { employmentContractDataSearchAndProcess } from "../../../util/employmentContractDataSearchAndProcess";
import { useFindAllClientCompany } from "../../../hooks/RecordsHooks/customer/useFindAllClientCompany";
import useUpdateContactPerson from "../../../hooks/RecordsHooks/contactPerson/useUpdateContactPerson";
import useCreateCustomerAccountHolder from '../../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import { selectedListItemToUpdate } from '../../../util/selectedListItemToUpdate';
import { handleSelectionEmploymentContractDataWithReducer } from '../../../util/handleSelectionEmploymentContractDataWithReducer';
import { ModelSelectionCustomerRecordContext } from "../../../contexts/PerformanceContext/ModelSelectionCustomerRecordContext";
import useCreateClientCompany from "../../../hooks/RecordsHooks/customer/useCreateClientCompany";

function ContactPersonUpdate({ handleOpenContactModal }) {

    const {
        stateIndividualRegistration,
        dispatchIndividualRegistration,
    } = useContext(ModelSelectionCustomerRecordContext);

    const {
        validatePhoneNumber,
        validateCompanyEmail
    } = useCreateClientCompany();

    const {
        contactPersonIdToUpdate,
        handleContactIdStatusCleanupToUpdate,
        handleContactPersonIdToUpdate,
        isShouldUpdateContactPerson,
        handleIsShouldUpdateContactPerson,
    } = useContext(ContactPersonContext);

    const {
        handleValidateUpdateClientCompanyForm
    } = useUpdateContactPerson();

    const [fieldTouchStatus, setFieldTouchStatus] = useState({

        birthdate: { value: "", touched: false, state: null },
        taxIdentificationNumber: { value: "", touched: false, state: null },
        contactPersonBelongsToClientCompany: { value: "", touched: false, state: null },
        emailAddress: { value: "", touched: false, state: null },
        lastName: { value: "", touched: false, state: null },
        customerPhoneNumber: { value: "", touched: false, state: null },
        firstName: { value: "", touched: false, state: null },
        contactPersonOccupation: { value: "", touched: false, state: null },
        phoneNumber: { value: "", touched: false, state: null },
        contactStatus: { value: false, touched: false, state: null },

    });

    const [clientCompanyDataList, setClientCompanyDataList] = useState([]);
    const handleClientCompanyDataList = (customerUser) => {
        setClientCompanyDataList(customerUser);
    }

    const handleTouchStart = (field) => {
        setFieldTouchStatus((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                touched: true
            }
        }));
    };

    const handleChange = (e, field, type = null) => {
        let value = e.target.value;
        let isValid = true;

        if (type && type !== null) {
            if (field.includes('Phone')) {
                isValid = validatePhoneNumber(value, type);
            } else if (field.includes('Email')) {
                isValid = validateCompanyEmail(value);
            }
        } else {
            isValid = value !== "";
        }

        setFieldTouchStatus((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                value: value,
                state: isValid ? "valid" : "invalid",
                touched: true
            }
        }));
    };

    const handleToggleChange = () => {
        setFieldTouchStatus((prev) => ({
            ...prev,
            contactStatus: {
                ...prev.contactStatus,
                value: !prev.contactStatus.value,
                touched: true,
                state: "valid"
            }
        }));
    };

    const handleSelectedBelongingToClientCompany = (e) => {
        const value = e.target.value;
        dispatchIndividualRegistration({ type: 'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY', payload: value });
        dispatchIndividualRegistration({ type: 'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const [formattedBirthdate, setFormattedBirthdate] = useState('');

    useEffect(() => {
        if (clientCompanyDataList.length === 0) {
            employmentContractDataSearchAndProcess(
                useFindAllClientCompany,
                handleClientCompanyDataList,
                'client-company',
                'EmployeeUserRegister'
            );
        }
    }, []);

    const [detailedContactPersonData, setDetailedContactPersonData] = useState([]);
    function handleCleanDetailedContactPersonData() {
        setDetailedContactPersonData([]);
    };

    useEffect(() => {
        const fetchAppraisalCycleById = async () => {
            if (contactPersonIdToUpdate && contactPersonIdToUpdate !== null) {
                if (!detailedContactPersonData.length) {
                    const foundContact = await useFindContactPerson(contactPersonIdToUpdate);
                    setDetailedContactPersonData(foundContact);
                    setFieldTouchStatus((prev) => ({
                        ...prev,
                        taxIdentificationNumber: { ...prev.taxIdentificationNumber, value: foundContact.cpf },
                        emailAddress: { ...prev.email, value: foundContact.email },
                        lastName: { ...prev.lastName, value: foundContact.lastname },
                        firstName: { ...prev.name, value: foundContact.name },
                        contactPersonOccupation: { ...prev.occupation, value: foundContact.occupation },
                        phoneNumber: { ...prev.phone, value: foundContact.phone },
                        contactStatus: { ...prev.status, value: foundContact.status },
                    }));
                    if (clientCompanyDataList.length > 0) {
                        selectedListItemToUpdate(
                            dispatchIndividualRegistration,
                            String(foundContact.customerId),
                            clientCompanyDataList,
                            'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY',
                            'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY',
                            'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY_STATE'
                        );
                    }
                    dispatchIndividualRegistration({ type: 'SET_BIRTHDATE', payload: new Date(foundContact.birthdate) });
                    setFormattedBirthdate(foundContact.birthdate);
                }
            }
        };

        fetchAppraisalCycleById(contactPersonIdToUpdate);

    }, [
        contactPersonIdToUpdate,
        clientCompanyDataList
    ]);

    useEffect(() => {
        if (isShouldUpdateContactPerson) {
            handleValidateUpdateClientCompanyForm(
                handleOpenContactModal,
                contactPersonIdToUpdate,
                fieldTouchStatus.taxIdentificationNumber.value,
                fieldTouchStatus.firstName.value,
                fieldTouchStatus.lastName.value,
                fieldTouchStatus.emailAddress.value,
                formattedBirthdate,
                fieldTouchStatus.phoneNumber.value,
                fieldTouchStatus.contactStatus.value,
                stateIndividualRegistration.individualRegistrationData.contactPersonBelongsToClientCompany,
                fieldTouchStatus.contactPersonOccupation.value,
                handleContactPersonIdToUpdate,
                handleContactIdStatusCleanupToUpdate
            );
            handleIsShouldUpdateContactPerson();
        }
    }, [
        isShouldUpdateContactPerson,
        fieldTouchStatus,
        formattedBirthdate,
        stateIndividualRegistration.individualRegistrationData
    ]);

    return (
        <Form className="needs-validation" noValidate>
            <Card>
                <CardBody>
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
                                valid={fieldTouchStatus.firstName.touched && fieldTouchStatus.firstName.state === "valid"}
                                invalid={fieldTouchStatus.firstName.touched && fieldTouchStatus.firstName.state === "invalid"}
                                value={fieldTouchStatus.firstName.value || ''}
                                onChange={(e) => handleChange(e, "firstName")}
                                onTouchStart={() => handleTouchStart("firstName")}
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
                                valid={fieldTouchStatus.lastName.touched && fieldTouchStatus.lastName.state === "valid"}
                                invalid={fieldTouchStatus.lastName.touched && fieldTouchStatus.lastName.state === "invalid"}
                                value={fieldTouchStatus.lastName.value || ''}
                                onChange={(e) => handleChange(e, "lastName")}
                                onTouchStart={() => handleTouchStart("lastName")}
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
                                disabled
                                placeholder='999.999.999-99'
                                mask="999.999.999-99"
                                maskChar="_"
                                value={fieldTouchStatus.taxIdentificationNumber.value || ''}
                                onChange={(e) => handleChange(e, "taxIdentificationNumber")}
                                onTouchStart={() => handleTouchStart("taxIdentificationNumber")}
                            >
                                {(inputProps) => <Input {...inputProps}
                                    disabled
                                    id="validationContactPersonTaxIdNumber"
                                    valid={fieldTouchStatus.taxIdentificationNumber.touched && fieldTouchStatus.taxIdentificationNumber.state === "valid"}
                                    invalid={fieldTouchStatus.taxIdentificationNumber.touched && fieldTouchStatus.taxIdentificationNumber.state === "invalid"}
                                />}
                            </InputMask>
                            <div className="invalid-feedback">
                                {fieldTouchStatus.taxIdentificationNumber.state === "invalid" && "Forneça um número de CPF válido."}
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
                                dateFormat="DD/MM/YYYY"
                                value={stateIndividualRegistration.individualRegistrationData.birthdate || ''}
                                onChange={(e) => handleDateFormatting(
                                    dispatchIndividualRegistration,
                                    e,
                                    'SET_CUSTOMER_ACCESSION_DATE',
                                    'SET_CUSTOMER_ACCESSION_DATE_STATE',
                                    setFormattedBirthdate
                                )}
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
                                value={fieldTouchStatus.phoneNumber.value || ''}
                                onChange={(e) => handleChange(e, 'phoneNumber', 'personal')}
                                onBlur={() => handleTouchStart('phoneNumber')}
                            >
                                {(inputProps) => <Input {...inputProps}
                                    id="validationContactPersonPhoneNumber"
                                    type="text"
                                    valid={fieldTouchStatus.phoneNumber.state === "valid"}
                                    invalid={fieldTouchStatus.phoneNumber.state === "invalid"}
                                />}
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
                                valid={fieldTouchStatus.contactPersonOccupation.touched && fieldTouchStatus.contactPersonOccupation.state === "valid"}
                                invalid={fieldTouchStatus.contactPersonOccupation.touched && fieldTouchStatus.contactPersonOccupation.state === "invalid"}
                                value={fieldTouchStatus.contactPersonOccupation.value || ''}
                                onChange={(e) => handleChange(e, "contactPersonOccupation")}
                                onTouchStart={() => handleTouchStart("contactPersonOccupation")}
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
                                valid={fieldTouchStatus.emailAddress.touched && fieldTouchStatus.emailAddress.state === "valid"}
                                invalid={fieldTouchStatus.emailAddress.touched && fieldTouchStatus.emailAddress.state === "invalid"}
                                value={fieldTouchStatus.emailAddress.value || ''}
                                onChange={(e) => handleChange(e, "emailAddress")}
                                onTouchStart={() => handleTouchStart("emailAddress")}
                            />
                            <div className="invalid-feedback">
                                {fieldTouchStatus.emailAddress.state === "invalid" && "Forneça um endereço de e-mail válido."}
                            </div>
                        </Col>
                        {clientCompanyDataList.length > 0 && (
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationContactPersonBelonging"
                                >
                                    Cliente
                                </label>
                                <Select2
                                    id="validationContactPersonBelonging"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{
                                        placeholder: "Selecione um cliente",
                                    }}
                                    value={stateIndividualRegistration.individualRegistrationData.selectedBelongingToClientCompany}
                                    onChange={handleSelectedBelongingToClientCompany}
                                    data={clientCompanyDataList}
                                    onSelect={(e) => {
                                        const selectedValue = e.target.value;
                                        handleSelectionEmploymentContractDataWithReducer(
                                            dispatchIndividualRegistration,
                                            selectedValue,
                                            Array.isArray(clientCompanyDataList)
                                                ? clientCompanyDataList
                                                : [],
                                            'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY',
                                            'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY',
                                            'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY_STATE',
                                            null,
                                            null,
                                            'id'
                                        );
                                    }}
                                />
                            </Col>
                        )}
                        <Col className="mb-3" md="2">
                            <div className="d-flex flex-column w-100">
                                <span
                                    className="form-control-label mb-4 mr-auto"
                                >
                                    Estado Ativo
                                </span>
                                <label className="custom-toggle ml-auto">
                                    <input
                                        type="checkbox"
                                        checked={fieldTouchStatus.contactStatus.value || ''}
                                        onChange={handleToggleChange}
                                    />
                                    <span
                                        className="custom-toggle-slider rounded-circle"
                                        data-label-off="Não"
                                        data-label-on="Sim"
                                    />
                                </label>
                            </div>
                        </Col>
                    </div>
                </CardBody>
            </Card>
        </Form>
    );
};

ContactPersonUpdate.defaultProps = {
    handleOpenContactModal: () => { }
};

ContactPersonUpdate.propTypes = {
    handleOpenContactModal: PropTypes.func
};

export default ContactPersonUpdate;