import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from 'react';
// nodejs library that concatenates classes
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import useCreateClientCompany from '../../../hooks/RecordsHooks/customer/useCreateClientCompany';
import useCNPJ from '../../../hooks/RecordsHooks/useCNPJ';
// reactstrap components
import {
    Col, Input, Row
} from "reactstrap";
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';
import { useFindClientCompany } from "../../../hooks/RecordsHooks/customer/useFindClientCompany";
import { useFindEmployeeAddress } from "../../../hooks/RecordsHooks/customer/useFindClientCompanyAddress";
import useUpdateClientCompany from '../../../hooks/RecordsHooks/customer/useUpdateClientCompany';
import useCEP from "../../../hooks/RecordsHooks/useCEP";
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import { handleDateFormatting } from "../../../util/handleDateFormatting";

function CustomerUserUpdate({ handleOpenCustomerModal }) {

    const {
        isShouldUpdateClientCompany,
        handleIsShouldUpdateClientCompany,
        customerIdToUpdate,
        handleCustomerIdStatusCleanupToUpdate,
        handleCustomerIdToUpdate,
    } = useContext(CustomerContext);

    const {
        handleValidateUpdateClientCompanyForm
    } = useUpdateClientCompany();

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
        customerStatus,
        setCustomerStatus,
        customerStatusState,
        setCustomerStatusState,
        customerAccessionDate,
        setCustomerAccessionDate,
        customerAccessionDateState,
        setCustomerAccessionDateState,
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
        companyCountry,
        setCompanyCountry,
        companyCountryState,
        setCompanyCountryState,
        handleFormFieldsAutocomplete,
        hasValuesChangedWithAPIData,
        handleValuesChangedWithAPIData,
        validateAddClientCompanyForm,
        handleValidateAddClientCompanyForm,
        isCustomerCompanyFormValidated,
        validatePhoneNumber,
        validateWebSite,
        validateCompanyEmail,
        hasValuesChangedWithAPIDataCEP,
        handleValuesChangedWithAPIDataCEP,
        validateAddCustomerAddressForm,
        handleFormFieldsAutocompleteCEP,
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

    const {
        brasilAPICEPData,
        loadingCEPValidation,
        errorCEPValidation,
        handleCEPValidationLoading,
        handleSaveCEP,
        zipCode,
        setZipCode,
        zipCodeState,
        setZipCodeState,
        handleErrorCEPValidation
    } = useCEP();

    const [fieldTouchStatus, setFieldTouchStatus] = useState({

        individualEmployerIdNumber: { value: "", touched: false, state: null },
        companyName: { value: "", touched: false, state: null },
        registrationName: { value: "", touched: false, state: null },
        customerBusinessPhoneNumber: { value: "", touched: false, state: null },
        companyEmailAddress: { value: "", touched: false, state: null },
        customerPhoneNumber: { value: "", touched: false, state: null },
        companyTypes: { value: "", touched: false, state: null },
        customerBusinessSector: { value: "", touched: false, state: null },
        customerWebSite: { value: "", touched: false, state: null },
        customerStatus: { value: false, touched: false, state: null },
        privileges: { value: false, touched: false, state: null },

        customerZipCode: { value: "", touched: false, state: null },
        companyAddress: { value: "", touched: false, state: null },
        companyAddressNumber: { value: "", touched: false, state: null },
        companyAddressComplement: { value: "", touched: false, state: null },
        idHeadOfficeBranch: { value: "", touched: false, state: null },
        companyDistrict: { value: "", touched: false, state: null },
        companyCity: { value: "", touched: false, state: null },
        federatedUnit: { value: "", touched: false, state: null },
        companyCountry: { value: "", touched: false, state: null },
    });

    const [cnpjTouched, setCnpjTouched] = useState(false);
    const [cepTouched, setCepTouched] = useState(false);
    const [customerBusinessPhoneTouched, setCustomerBusinessPhoneTouched] = useState(false);
    const [customerPhoneTouched, setCustomerPhoneTouched] = useState(false);

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

        if (field === "idHeadOfficeBranch") {
            const normalizedValue = value.trim().toLowerCase();
            if (normalizedValue === "matriz") {
                value = "Matriz";
            } else if (normalizedValue === "filial") {
                value = "Filial";
            } else {
                isValid = false;
            }
        } else if (type && type !== null) {
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
            customerStatus: {
                ...prev.customerStatus,
                value: !prev.customerStatus.value,
                touched: true,
                state: "valid"
            }
        }));
    };

    const handleCEPChange = (e) => {
        const newValue = e.target.value;
        handleSaveCEP(newValue);

        if (!cepTouched) {
            setCepTouched(true);
            setFieldTouchStatus((prev) => ({
                ...prev,
                customerZipCode: { ...prev.customerZipCode, touched: true },
            }));
        }
    };

    const updateFieldsWithHandleChange = (fields) => {
        Object.keys(fields).forEach((field) => {
            handleChange({ target: { value: fields[field] } }, field);
        });
    };

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

    const [companyPrivileges, setCompanyPrivileges] = useState('');
    const [companyPrivilegesState, setCompanyPrivilegesState] = useState(null);

    const [selectedCompanyPrivileges, setSelectedCompanyPrivileges] = useState('');
    const [companyPrivilegesDataList, setCompanyPrivilegesDataList] = useState([
        { id: "0", text: "Todos" },
        { id: "1", text: "Titular da Conta" },
        { id: "2", text: "Administrador" },
        { id: "3", text: "Finanças" },
        { id: "4", text: "Acesso a Relátorios" },
        { id: "5", text: "Vendas" },
        { id: "6", text: "Desenvolvedor" },
        { id: "7", text: "Suporte ao Cliente" },
        { id: "8", text: "Marketing" },
    ]);
    const handleCompanyPrivilegesDataList = (companyPrivileges) => {
        setCompanyPrivilegesDataList(companyPrivileges);
    }

    const selectedListItemToUpdate = (item, list, setSelectedItem, setItem, setItemState) => {
        const selectedItem = list.find(p => p.text === item);
        if (selectedItem) {
            setSelectedItem(selectedItem.id);
            handleSelectionEmploymentContractData(selectedItem.id, list, setSelectedItem, setItem, setItemState);
        }
    };

    const [detailedClientCompanyData, setDetailedClientCompanyData] = useState([]);
    function handleCleanDetailedClientCompanyData() {
        setDetailedClientCompanyData([]);
    };

    const [detailedClientCompanyAddressData, setDetailedClientCompanyAddressData] = useState([]);
    function handleCleanDetailedClientCompanyAddressData() {
        setDetailedClientCompanyAddressData([]);
    };

    const [formattedAccessionDate, setFormattedAccessionDate] = useState('');

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
        }
    }, [hasValuesChangedWithAPIData, validateAddClientCompanyForm]);


    useEffect(() => {
        if (brasilAPICEPData !== null) {
            handleFormFieldsAutocompleteCEP(brasilAPICEPData);
            handleCEPValidationLoading();
            handleErrorCEPValidation();
        }
        if (errorCEPValidation) {
            setFieldTouchStatus((prev) => ({
                ...prev,
                customerZipCode: {
                    ...prev.customerZipCode,
                    state: "invalid",
                    touched: true
                }
            }));
        }
    }, [brasilAPICEPData, errorCEPValidation]);

    useEffect(() => {
        if (hasValuesChangedWithAPIDataCEP) {
            handleValuesChangedWithAPIDataCEP(!hasValuesChangedWithAPIDataCEP);
            const fieldsToUpdate = {
                federatedUnit,
                companyCity,
                companyAddress,
                companyDistrict,
                customerZipCode,
            };

            updateFieldsWithHandleChange(fieldsToUpdate);
        }
    }, [hasValuesChangedWithAPIDataCEP, validateAddCustomerAddressForm]);

    useEffect(() => {
        const fetchClientCompanyAndAddressById = async () => {
            if (!detailedClientCompanyData.length) {
                const foundCustomer = await useFindClientCompany(customerIdToUpdate);
                setDetailedClientCompanyData(foundCustomer);
                setFieldTouchStatus((prev) => ({
                    ...prev,
                    companyName: { ...prev.companyName, value: foundCustomer.companyName },
                    registrationName: { ...prev.registrationName, value: foundCustomer.brandName },
                    customerBusinessPhoneNumber: { ...prev.customerBusinessPhoneNumber, value: foundCustomer.phoneNumber },
                    companyEmailAddress: { ...prev.companyEmailAddress, value: foundCustomer.email },
                    customerPhoneNumber: { ...prev.customerPhoneNumber, value: foundCustomer.phone },
                    customerWebSite: { ...prev.customerWebSite, value: foundCustomer.webSite },
                    customerStatus: { ...prev.customerStatus, value: foundCustomer.status },
                    privileges: { ...prev.privileges, value: foundCustomer.privileges },
                }));
                handleSaveCNPJ(foundCustomer.identificationNumber);
                selectedListItemToUpdate(foundCustomer.type, companyTypesDataList, setSelectedCompanyTypes, setCompanyTypes, setCompanyTypesState);
                selectedListItemToUpdate(foundCustomer.sector, companySectorDataList, setSelectedCompanySector, setCustomerBusinessSector, setCustomerBusinessSectorState);
                setCustomerAccessionDate(new Date(foundCustomer.createdAt));
                setFormattedAccessionDate(foundCustomer.createdAt);
            }
            if (!detailedClientCompanyAddressData.length) {
                const foundCustomerAddress = await useFindEmployeeAddress(customerIdToUpdate);
                setDetailedClientCompanyAddressData(foundCustomerAddress[0]);
                setFieldTouchStatus((prev) => ({
                    ...prev,
                    companyCountry: { ...prev.companyCountry, value: foundCustomerAddress[0].country },
                    federatedUnit: { ...prev.federatedUnit, value: foundCustomerAddress[0].state },
                    companyCity: { ...prev.companyCity, value: foundCustomerAddress[0].city },
                    companyAddress: { ...prev.companyAddress, value: foundCustomerAddress[0].address },
                    companyDistrict: { ...prev.companyDistrict, value: foundCustomerAddress[0].neighborhood },
                    customerZipCode: { ...prev.customerZipCode, value: foundCustomerAddress[0].zipCode },
                    companyAddressNumber: { ...prev.companyAddressNumber, value: foundCustomerAddress[0].addressNumber },
                    idHeadOfficeBranch: { ...prev.idHeadOfficeBranch, value: foundCustomerAddress[0].isBranche ? "Filial" : "Matriz" },
                    companyAddressComplement: { ...prev.companyAddressComplement, value: foundCustomerAddress[0].complement },
                }));
            }
        };

        fetchClientCompanyAndAddressById();
    }, [customerIdToUpdate]);

    useEffect(() => {
        if (isShouldUpdateClientCompany) {
            handleValidateUpdateClientCompanyForm(
                handleOpenCustomerModal,
                customerIdToUpdate,
                individualEmployerIdNumber,
                fieldTouchStatus.companyName.value,
                fieldTouchStatus.registrationName.value,
                companyTypes,
                fieldTouchStatus.customerBusinessPhoneNumber.value,
                fieldTouchStatus.customerPhoneNumber.value,
                fieldTouchStatus.companyEmailAddress.value,
                customerBusinessSector,
                fieldTouchStatus.customerWebSite.value,
                fieldTouchStatus.customerStatus.value,
                formattedAccessionDate,
                fieldTouchStatus.idHeadOfficeBranch.value,
                fieldTouchStatus.customerZipCode.value,
                fieldTouchStatus.federatedUnit.value,
                fieldTouchStatus.companyCity.value,
                fieldTouchStatus.companyAddress.value,
                fieldTouchStatus.companyAddressNumber.value,
                fieldTouchStatus.companyAddressComplement.value,
                fieldTouchStatus.companyDistrict.value,
                fieldTouchStatus.companyCountry.value,
                handleCustomerIdToUpdate,
                handleCustomerIdStatusCleanupToUpdate
            )
            handleIsShouldUpdateClientCompany();
        }
    }, [isShouldUpdateClientCompany, fieldTouchStatus, formattedAccessionDate]);

    return (

        <Row>
            <div className="col">
                <div className="card-wrapper">
                    {/* <h6 className="heading-small text-muted mb-4">
                        Informações Institucionais
                    </h6> */}
                    <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustomerCompanyName"
                            >
                                Nome da Empresa
                            </label>
                            <Input
                                id="validationCustomerCompanyName"
                                placeholder="Nome popular de título de estabelecimento"
                                type="text"
                                valid={fieldTouchStatus.companyName.touched && fieldTouchStatus.companyName.state === "valid"}
                                invalid={fieldTouchStatus.companyName.touched && fieldTouchStatus.companyName.state === "invalid"}
                                value={fieldTouchStatus.companyName.value}
                                onChange={(e) => handleChange(e, "companyName")}
                                onTouchStart={() => handleTouchStart("companyName")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
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
                                type="text"
                                valid={fieldTouchStatus.registrationName.touched && fieldTouchStatus.registrationName.state === "valid"}
                                invalid={fieldTouchStatus.registrationName.touched && fieldTouchStatus.registrationName.state === "invalid"}
                                value={fieldTouchStatus.registrationName.value}
                                onChange={(e) => handleChange(e, "registrationName")}
                                onTouchStart={() => handleTouchStart("registrationName")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustomerIndividualEmployerIdnNumber"
                            >
                                CNPJ
                            </label>
                            <InputMask
                                disabled
                                placeholder="99.999.999/9999-99"
                                mask="99.999.999/9999-99"
                                maskChar="_"
                                value={individualEmployerIdNumber}
                                onChange={(e) => {
                                    handleSaveCNPJ(e.target.value);
                                    if (!cnpjTouched) {
                                        setCnpjTouched(true);
                                    }
                                }}
                                onBlur={() => {
                                    if (individualEmployerIdNumber !== "") {
                                        setIndividualEmployerIdNumberState("valid");
                                    } else {
                                        setIndividualEmployerIdNumberState("invalid");
                                    }
                                }}
                            >
                                {(inputProps) => <Input {...inputProps} id="validationCustomerIndividualEmployerIdnNumber" valid={cnpjTouched && individualEmployerIdNumberState === "valid"} invalid={cnpjTouched && individualEmployerIdNumberState === "invalid"} disabled />}
                            </InputMask>
                            {loadingCNPJValidation ? (
                                <div style={{ display: 'none', width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#5e72e4' }}>Validando CNPJ...</div>
                            ) : (
                                errorCNPJValidation !== null ? (
                                    <div className="invalid-feedback">Ocorreu um erro ao validar o CNPJ.</div>
                                ) : (
                                    brasilAPICNPJData ? (
                                        <div className="valid-feedback">CNPJ válido!</div>
                                    ) : (
                                        <div className="invalid-feedback">CNPJ inválido!</div>
                                    )
                                )
                            )}
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationCompanyEmailAddress"
                            >
                                E-mail
                            </label>
                            <Input
                                disabled={true}
                                aria-describedby="inputGroupPrepend"
                                id="validationCompanyEmailAddress"
                                placeholder="Endereço de e-mail"
                                type="email"
                                valid={fieldTouchStatus.companyEmailAddress.touched && fieldTouchStatus.companyEmailAddress.state === "valid"}
                                invalid={fieldTouchStatus.companyEmailAddress.touched && fieldTouchStatus.companyEmailAddress.state === "invalid"}
                                value={fieldTouchStatus.companyEmailAddress.value}
                                onChange={(e) => handleChange(e, "companyEmailAddress")}
                                onTouchStart={() => handleTouchStart("companyEmailAddress")}
                            />
                            <div className="invalid-feedback">
                                {fieldTouchStatus.companyEmailAddress.state === "invalid" && "Forneça um endereço de e-mail válido."}
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
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
                                value={fieldTouchStatus.customerBusinessPhoneNumber.value}
                                onChange={(e) => handleChange(e, 'customerBusinessPhoneNumber', 'business')}
                                onBlur={() => handleTouchStart('customerBusinessPhoneNumber')}
                            >
                                {(inputProps) => <Input {...inputProps}
                                    id="validationCustomerBusinessPhoneNumber"
                                    type="text"
                                    valid={fieldTouchStatus.customerBusinessPhoneNumber.state === "valid"}
                                    invalid={fieldTouchStatus.customerBusinessPhoneNumber.state === "invalid"}
                                />}
                            </InputMask>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
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
                                value={fieldTouchStatus.customerPhoneNumber.value}
                                onChange={(e) => handleChange(e, 'customerPhoneNumber', 'personal')}
                                onBlur={() => handleTouchStart('customerPhoneNumber')}
                            >
                                {(inputProps) => <Input {...inputProps}
                                    id="validationCustomerPhoneNumber"
                                    type="text"
                                    valid={fieldTouchStatus.customerPhoneNumber.state === "valid"}
                                    invalid={fieldTouchStatus.customerPhoneNumber.state === "invalid"}
                                />}
                            </InputMask>
                            <div className="invalid-feedback">
                                É necessário preencher este campo corretamente.
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="4">
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
                                onSelect={(e) => handleSelectionEmploymentContractData(
                                    e.target.value,
                                    companyTypesDataList,
                                    setSelectedCompanyTypes,
                                    setCompanyTypes,
                                    setCompanyTypesState,
                                    null
                                )}
                            />
                        </Col>
                        <Col className="mb-3" md="4">
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
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustomerWebSite"
                            >
                                Web Site
                            </label>
                            <Input
                                id="validationCustomerWebSite"
                                placeholder="www.site.com.br"
                                type="text"
                                valid={fieldTouchStatus.customerWebSite.touched && fieldTouchStatus.customerWebSite.state === "valid"}
                                invalid={fieldTouchStatus.customerWebSite.touched && fieldTouchStatus.customerWebSite.state === "invalid"}
                                value={fieldTouchStatus.customerWebSite.value}
                                onChange={(e) => handleChange(e, "customerWebSite")}
                                onTouchStart={() => handleTouchStart("customerWebSite")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo corretamente.
                            </div>
                        </Col>
                    </div>
                    <hr />
                    {/* <h6 className="heading-small text-muted mb-4">
                        Informações de Endereço
                    </h6> */}
                    <div className="form-row">
                        <Col className="mb-3" md="4">
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
                                value={cepTouched ? zipCode : fieldTouchStatus.customerZipCode.value}
                                onChange={handleCEPChange}
                                onBlur={() => {
                                    if (zipCode !== "") {
                                        setZipCodeState("valid");
                                    } else {
                                        setZipCodeState("invalid");
                                    }
                                }}
                            >
                                {(inputProps) => <Input {...inputProps}
                                    id="validationCustomerZipCode"
                                    type="text"
                                    valid={fieldTouchStatus.customerZipCode.touched && fieldTouchStatus.customerZipCode.state === "valid"}
                                    invalid={fieldTouchStatus.customerZipCode.touched && fieldTouchStatus.customerZipCode.state === "invalid"}
                                />}
                            </InputMask>
                            {
                                loadingCEPValidation ? <div style={{ display: 'none', width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#5e72e4' }}>Validando CEP...</div> : (
                                    errorCEPValidation ? <div className="invalid-feedback">{errorCEPValidation}</div> : (
                                        brasilAPICEPData !== null ? <div className="valid-feedback">CEP válido!</div> : <div className="invalid-feedback">CEP inválido!</div>
                                    )
                                )
                            }
                        </Col>
                        <Col className="mb-3" md="6">
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
                                type="text"
                                valid={fieldTouchStatus.companyAddress.touched && fieldTouchStatus.companyAddress.state === "valid"}
                                invalid={fieldTouchStatus.companyAddress.touched && fieldTouchStatus.companyAddress.state === "invalid"}
                                value={fieldTouchStatus.companyAddress.value}
                                onChange={(e) => handleChange(e, "companyAddress")}
                                onTouchStart={() => handleTouchStart("companyAddress")}
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
                                type="text"
                                valid={fieldTouchStatus.companyAddressNumber.touched && fieldTouchStatus.companyAddressNumber.state === "valid"}
                                invalid={fieldTouchStatus.companyAddressNumber.touched && fieldTouchStatus.companyAddressNumber.state === "invalid"}
                                value={fieldTouchStatus.companyAddressNumber.value}
                                onChange={(e) => handleChange(e, "companyAddressNumber")}
                                onTouchStart={() => handleTouchStart("companyAddressNumber")}
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
                                htmlFor="validationCustomerCompanyAddressComplement"
                            >
                                Complemento
                            </label>
                            <Input
                                id="validationCustomerCompanyAddressComplement"
                                placeholder=""
                                type="text"
                                valid={fieldTouchStatus.companyAddressComplement.touched && fieldTouchStatus.companyAddressComplement.state === "valid"}
                                invalid={fieldTouchStatus.companyAddressComplement.touched && fieldTouchStatus.companyAddressComplement.state === "invalid"}
                                value={fieldTouchStatus.companyAddressComplement.value}
                                onChange={(e) => handleChange(e, "companyAddressComplement")}
                                onTouchStart={() => handleTouchStart("companyAddressComplement")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="2">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustomerIdHeadOfficeBranch"
                            >
                                Matriz
                            </label>
                            <Input
                                id="validationCustomerIdHeadOfficeBranch"
                                placeholder="Matriz ou Filial"
                                type="text"
                                valid={fieldTouchStatus.idHeadOfficeBranch.touched && fieldTouchStatus.idHeadOfficeBranch.state === "valid"}
                                invalid={fieldTouchStatus.idHeadOfficeBranch.touched && fieldTouchStatus.idHeadOfficeBranch.state === "invalid"}
                                value={fieldTouchStatus.idHeadOfficeBranch.value}
                                onChange={(e) => handleChange(e, "idHeadOfficeBranch")}
                                onFocus={() => handleTouchStart("idHeadOfficeBranch")}
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
                                type="text"
                                valid={fieldTouchStatus.companyDistrict.touched && fieldTouchStatus.companyDistrict.state === "valid"}
                                invalid={fieldTouchStatus.companyDistrict.touched && fieldTouchStatus.companyDistrict.state === "invalid"}
                                value={fieldTouchStatus.companyDistrict.value}
                                onChange={(e) => handleChange(e, "companyDistrict")}
                                onTouchStart={() => handleTouchStart("companyDistrict")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="4">
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
                                type="text"
                                valid={fieldTouchStatus.companyCity.touched && fieldTouchStatus.companyCity.state === "valid"}
                                invalid={fieldTouchStatus.companyCity.touched && fieldTouchStatus.companyCity.state === "invalid"}
                                value={fieldTouchStatus.companyCity.value}
                                onChange={(e) => handleChange(e, "companyCity")}
                                onTouchStart={() => handleTouchStart("companyCity")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
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
                                type="text"
                                valid={fieldTouchStatus.federatedUnit.touched && fieldTouchStatus.federatedUnit.state === "valid"}
                                invalid={fieldTouchStatus.federatedUnit.touched && fieldTouchStatus.federatedUnit.state === "invalid"}
                                value={fieldTouchStatus.federatedUnit.value}
                                onChange={(e) => handleChange(e, "federatedUnit")}
                                onTouchStart={() => handleTouchStart("federatedUnit")}
                            />
                            <div className="invalid-feedback">
                                É necessário selecionar uma opção.
                            </div>
                        </Col>

                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationCompanyCountry"
                            >
                                País
                            </label>
                            <Input
                                defaultValue=""
                                id="validationCompanyCountry"
                                placeholder=""
                                type="text"
                                valid={fieldTouchStatus.companyCountry.touched && fieldTouchStatus.companyCountry.state === "valid"}
                                invalid={fieldTouchStatus.companyCountry.touched && fieldTouchStatus.companyCountry.state === "invalid"}
                                value={fieldTouchStatus.companyCountry.value}
                                onChange={(e) => handleChange(e, "companyCountry")}
                                onTouchStart={() => handleTouchStart("companyCountry")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <hr />
                    {/* <h6 className="heading-small text-muted mb-4">
                        Informações do Plano Aderido
                    </h6> */}
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustom02"
                            >
                                Plano
                            </label>
                            <Input
                                id="validationCustom02"
                                placeholder="Nome do plano"
                                type="text"
                            // valid={fieldTouchStatus.companyName.touched && fieldTouchStatus.companyName.state === "valid"}
                            // invalid={fieldTouchStatus.companyName.touched && fieldTouchStatus.companyName.state === "invalid"}
                            // value={fieldTouchStatus.companyName.value}
                            // onChange={(e) => handleChange(e, "companyName")}
                            // onTouchStart={() => handleTouchStart("companyName")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationAccessionDate"
                            >
                                Data de Adesão
                            </label>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "__/__/__",
                                    disabled: true
                                }}
                                timeFormat={false}
                                value={customerAccessionDate}
                                onChange={(e) => handleDateFormatting(e, setCustomerAccessionDate, setCustomerAccessionDateState, setFormattedAccessionDate)}
                            />
                        </Col>
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
                                        checked={fieldTouchStatus.customerStatus.value}
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
                    {/* <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustom03"
                            >
                                Número de Colaboradores
                            </label>
                            <Input
                                id="validationCustom03"
                                placeholder="000"
                                type="text"
                            // valid={fieldTouchStatus.companyName.touched && fieldTouchStatus.companyName.state === "valid"}
                            // invalid={fieldTouchStatus.companyName.touched && fieldTouchStatus.companyName.state === "invalid"}
                            // value={fieldTouchStatus.companyName.value}
                            // onChange={(e) => handleChange(e, "companyName")}
                            // onTouchStart={() => handleTouchStart("companyName")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationCustomerCompanyTypes"
                            >
                                Privilégio
                            </label>
                            <Select2
                                id="validationCustomerCompanyTypes"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione o privilégio",
                                }}
                                value={selectedCompanyPrivileges}
                                onChange={(e) => setSelectedCompanyPrivileges(e.target.value)}
                                data={companyPrivilegesDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, companyPrivilegesDataList, setSelectedCompanyPrivileges, setCompanyPrivileges, setCompanyPrivilegesState, null)}
                            />
                        </Col>
                    </div> */}
                </div>
            </div>
        </Row>
    );
}

CustomerUserUpdate.defaultProps = {
    handleOpenCustomerModal: () => { }
};

CustomerUserUpdate.propTypes = {
    handleOpenCustomerModal: PropTypes.func
};

export default CustomerUserUpdate;