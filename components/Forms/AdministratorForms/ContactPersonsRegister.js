import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col, Table } from "reactstrap";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import moment from 'moment';
import useCreateCustomerAccountHolder from '../../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import { useFindAllClientCompany } from '../../../hooks/RecordsHooks/customer/useFindAllClientCompany';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractDataWithReducer } from '../../../util/handleSelectionEmploymentContractDataWithReducer';
import { ModelSelectionCustomerRecordContext } from '../../../contexts/PerformanceContext/ModelSelectionCustomerRecordContext';
import useCPF from '../../../hooks/RecordsHooks/useCPF.js';
import PageChange from '../../PageChange/PageChange.js';
import useCreateClientCompany from '../../../hooks/RecordsHooks/customer/useCreateClientCompany.js';

function ContactPersonsRegister({ handleShowContactPersonsUserRegister }) {

    const {
        stateIndividualRegistration,
        dispatchIndividualRegistration,
        stateGlobalCustomerRegisterReducer,
        dispatchGlobalCustomerRegisterReducer
    } = useContext(ModelSelectionCustomerRecordContext);

    const {
        validateCPF
    } = useCPF();

    const {
        validatePhoneNumber,
    } = useCreateClientCompany();

    const {
        handleValidateAddCustomerAccountHolderForm,
    } = useCreateCustomerAccountHolder(handleShowContactPersonsUserRegister);

    const latestIndividualRegistrationData = useRef(stateIndividualRegistration.individualRegistrationData);

    const [isLoadingIndividualRegistrationData, setIsLoadingIndividualRegistrationData] = useState(true);

    // Ref para armazenar o estado anterior em formato de string
    const previousStateRef = useRef(null);

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, '');
        dispatchIndividualRegistration({ type: 'SET_FIRST_NAME', payload: filteredValue });
        dispatchIndividualRegistration({ type: 'SET_FIRST_NAME_STATE', payload: filteredValue ? 'valid' : 'invalid' });
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, '');
        dispatchIndividualRegistration({ type: 'SET_LAST_NAME', payload: filteredValue });
        dispatchIndividualRegistration({ type: 'SET_LAST_NAME_STATE', payload: filteredValue ? 'valid' : 'invalid' });
    };

    const handleTaxIdentificationNumberChange = (e) => {
        const value = e.target.value;
        dispatchIndividualRegistration({ type: 'SET_TAX_IDENTIFICATION_NUMBER', payload: value });
        const isValid = value !== '' && validateCPF(value);
        dispatchIndividualRegistration({ type: 'SET_TAX_IDENTIFICATION_NUMBER_STATE', payload: isValid ? 'valid' : 'invalid' });
    };

    const handleChangeBirthdate = (inputDate) => {
        const date = typeof inputDate === 'string' ? inputDate : inputDate.format('DD/MM/YYYY');

        const isDateValid = (dateStr) => {
            const formattedDate = moment(dateStr, 'DD/MM/YYYY', true);
            return formattedDate.isValid() && dateStr.length === 10;
        };

        dispatchIndividualRegistration({ type: 'SET_BIRTHDATE', payload: date });
        dispatchIndividualRegistration({ type: 'SET_BIRTHDATE_STATE', payload: isDateValid(date) ? 'valid' : 'invalid' });
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

    const handleEmailChange = (e) => {
        const emailAddress = e.target.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        dispatchIndividualRegistration({ type: 'SET_EMAIL_ADDRESS', payload: emailAddress });
        dispatchIndividualRegistration({ type: 'SET_EMAIL_ADDRESS_STATE', payload: regex.test(emailAddress) ? 'valid' : 'invalid' });
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        dispatchIndividualRegistration({ type: 'SET_PHONE_NUMBER', payload: value });
        const isValid = value === '' ? null : validatePhoneNumber(value, 'personal') ? 'valid' : 'invalid';
        dispatchIndividualRegistration({ type: 'SET_PHONE_NUMBER_STATE', payload: isValid });
    };

    const handleContactPersonOccupationChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, '');
        dispatchIndividualRegistration({ type: 'SET_CONTACT_PERSON_OCCUPATION', payload: filteredValue });
        dispatchIndividualRegistration({ type: 'SET_CONTACT_PERSON_OCCUPATION_STATE', payload: filteredValue ? 'valid' : 'invalid' });
    };

    const handleSelectedBelongingToClientCompanyChange = (e) => {
        const value = e.target.value;
        dispatchIndividualRegistration({ type: 'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY', payload: value });
        dispatchIndividualRegistration({ type: 'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const [clientCompanyDataList, setClientCompanyDataList] = useState([]);
    const handleClientCompanyDataList = (customerUser) => {
        setClientCompanyDataList(customerUser);
    }

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

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        const dataToSave = {
            ...data
        };
        localStorage.setItem('individualRegistrationDataInside', JSON.stringify(dataToSave));
    };

    // Execute o carregamento dos dados ao montar o componente
    useEffect(() => {
        // Função para carregar os dados do localStorage
        const loadIndividualRegistrationData = () => {
            try {
                const rawData = localStorage.getItem('individualRegistrationDataInside');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && typeof parsedData === 'object') {
                        dispatchIndividualRegistration({
                            type: 'LOAD_SAVED_REVIEW_DATA',
                            payload: parsedData,
                        });
                        latestIndividualRegistrationData.current = parsedData; // Atualiza a ref para os dados carregados
                    }
                } else {
                    dispatchIndividualRegistration({ type: 'RESET_INDIVIDUAL_REGISTRATION_DATA' }); // Limpa o estado para evitar inconsistências
                }
            } catch (error) {
                console.error('Failed to parse individualRegistrationDataInside from localStorage:', error);
            } finally {
                setIsLoadingIndividualRegistrationData(false); // Marque como carregado
            }
        };

        loadIndividualRegistrationData();
    }, []);

    // Salvar no Contexto Global antes de sair
    useEffect(() => {
        return () => {
            dispatchGlobalCustomerRegisterReducer({
                type: "UPDATE_INDIVIDUAL_REGISTRATION",
                payload: stateIndividualRegistration.individualRegistrationData,
            });
        };
    }, [stateIndividualRegistration.individualRegistrationData, dispatchGlobalCustomerRegisterReducer]);

    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(stateIndividualRegistration.individualRegistrationData);

        if (previousStateRef.current !== currentStateString) {
            previousStateRef.current = currentStateString;
            latestIndividualRegistrationData.current = { ...stateIndividualRegistration.individualRegistrationData };
            saveDataToLocalStorage(stateIndividualRegistration.individualRegistrationData);
        }
    }, [stateIndividualRegistration.individualRegistrationData]);


    if (isLoadingIndividualRegistrationData) {
        return (
            <PageChange />
        );
    }

    return (
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
                                value={stateIndividualRegistration.individualRegistrationData.firstName || ''}
                                valid={stateIndividualRegistration.individualRegistrationData.firstNameState === "valid"}
                                invalid={stateIndividualRegistration.individualRegistrationData.firstNameState === "invalid"}
                                onChange={handleFirstNameChange}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">Parece bom!</div>
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
                                value={stateIndividualRegistration.individualRegistrationData.lastName || ''}
                                valid={stateIndividualRegistration.individualRegistrationData.lastNameState === "valid"}
                                invalid={stateIndividualRegistration.individualRegistrationData.lastNameState === "invalid"}
                                onChange={handleLastNameChange}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">Parece bom!</div>
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
                                value={stateIndividualRegistration.individualRegistrationData.taxIdentificationNumber || ''}
                                valid={stateIndividualRegistration.individualRegistrationData.taxIdentificationNumberState === "valid"}
                                invalid={stateIndividualRegistration.individualRegistrationData.taxIdentificationNumberState === "invalid"}
                                onChange={handleTaxIdentificationNumberChange}
                            >
                                {(inputProps) => <Input {...inputProps} id="validationContactPersonTaxIdNumber" />}
                            </InputMask>
                            <div className="invalid-feedback">
                                Forneça um número de CPF válido
                            </div>
                            <div className="valid-feedback">Parece bom!</div>
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
                                valid={stateIndividualRegistration.individualRegistrationData.birthdateState === "valid"}
                                invalid={stateIndividualRegistration.individualRegistrationData.birthdateState === "invalid"}
                                inputProps={{
                                    placeholder: 'DD/MM/YYYY',
                                    value: formatInput(stateIndividualRegistration.individualRegistrationData.birthdate || ''),
                                }}
                                timeFormat={false}
                                dateFormat="DD/MM/YYYY"
                                onChange={handleChangeBirthdate}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">Parece bom!</div>
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
                                value={stateIndividualRegistration.individualRegistrationData.phoneNumber || ''}
                                valid={stateIndividualRegistration.individualRegistrationData.phoneNumberState === "valid"}
                                invalid={stateIndividualRegistration.individualRegistrationData.phoneNumberState === "invalid"}
                                onChange={handlePhoneNumberChange}
                            >
                                {(inputProps) => <Input {...inputProps} id="validationContactPersonPhoneNumber" type="text" />}
                            </InputMask>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">Parece bom!</div>
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
                                value={stateIndividualRegistration.individualRegistrationData.contactPersonOccupation || ''}
                                valid={stateIndividualRegistration.individualRegistrationData.contactPersonOccupationState === "valid"}
                                invalid={stateIndividualRegistration.individualRegistrationData.contactPersonOccupationState === "invalid"}
                                onChange={handleContactPersonOccupationChange}
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
                                value={stateIndividualRegistration.individualRegistrationData.emailAddress || ''}
                                valid={stateIndividualRegistration.individualRegistrationData.emailAddressState === "valid"}
                                invalid={stateIndividualRegistration.individualRegistrationData.emailAddressState === "invalid"}
                                onChange={handleEmailChange}
                            />
                            <div className="invalid-feedback">
                                {stateIndividualRegistration.individualRegistrationData.emailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
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
                                value={stateIndividualRegistration.individualRegistrationData.selectedBelongingToClientCompany || ''}
                                onChange={handleSelectedBelongingToClientCompanyChange}
                                data={clientCompanyDataList}
                                onSelect={(e) => {
                                    const selectedValue = e.target.value;
                                    handleSelectionEmploymentContractDataWithReducer(
                                        dispatchIndividualRegistration,
                                        selectedValue,
                                        Array.isArray(clientCompanyDataList) ? clientCompanyDataList : [],
                                        'SET_SELECTED_BELONGING_TO_CLIENT_COMPANY',
                                        'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY',
                                        'SET_CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY_STATE',
                                        null,
                                        null,
                                        'id'
                                    );
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">Parece bom!</div>
                        </Col>
                    </div>
                    <Row>
                        <Col md="4" />
                        <Col className="d-flex justify-content-end align-items-center" md="8" >
                            <Button
                                className="px-5"
                                color="primary"
                                size="lg"
                                type="button"
                                onClick={() => handleValidateAddCustomerAccountHolderForm(
                                    stateGlobalCustomerRegisterReducer,
                                    dispatchGlobalCustomerRegisterReducer,
                                    stateIndividualRegistration,
                                    dispatchIndividualRegistration,
                                    true
                                )}
                            >
                                <span className="btn-inner--text">Adicionar</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    );
}

export default ContactPersonsRegister;
