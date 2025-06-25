import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { useContext, useEffect, useReducer, useState } from 'react';
// nodejs library that concatenates classes
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import useCreateClientCompany from '../../../hooks/RecordsHooks/customer/useCreateClientCompany';
// reactstrap components
import {
    Col, Input, Row
} from "reactstrap";
import { initialStateLegalEntityRegistrationForm, legalEntityRegistrationFormReducer } from '../../../reducers/CustomerForms/LegalEntityRegistrationFormReducer';
import { initialStateCNPJForm, cnpjFormReducer } from '../../../reducers/cnpjFormReducer';
import { initialStateCEPForm, cepFormReducer } from '../../../reducers/cepFormReducer';
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';
import { useFindClientCompany } from "../../../hooks/RecordsHooks/customer/useFindClientCompany";
import { useFindEmployeeAddress } from "../../../hooks/RecordsHooks/customer/useFindClientCompanyAddress";
import useUpdateClientCompany from '../../../hooks/RecordsHooks/customer/useUpdateClientCompany';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import { handleDateFormatting } from "../../../util/handleDateFormatting";

function CustomerUserUpdate({ handleOpenCustomerModal }) {

    const [state, dispatch] = useReducer(legalEntityRegistrationFormReducer, initialStateLegalEntityRegistrationForm);

    const [stateCNPJ, dispatchCNPJ] = useReducer(cnpjFormReducer, initialStateCNPJForm);

    const [stateCEP, dispatchCEP] = useReducer(cepFormReducer, initialStateCEPForm);

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
        handleValidateAddCustomerCompanyForm,
        handleFormFieldsAutocomplete,
        validateAddCustomerCompanyForm,
        validatePhoneNumber,
        validateWebSite,
        validateCompanyEmail,
        validateAddCustomerAddressForm,
        handleFormFieldsAutocompleteCEP,
    } = useCreateClientCompany();

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

        zipCode: { value: "", touched: false, state: null },
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
        dispatchCEP({ type: 'SET_ZIP_CODE', payload: newValue });

        if (!cepTouched) {
            setCepTouched(true);
            setFieldTouchStatus((prev) => ({
                ...prev,
                zipCode: { ...prev.zipCode, touched: true },
            }));
        }
    };

    const updateFieldsWithHandleChange = (fields) => {
        Object.keys(fields).forEach((field) => {
            handleChange({ target: { value: fields[field] } }, field);
        });
    };

    // const [companyPrivileges, setCompanyPrivileges] = useState('');
    // const [companyPrivilegesState, setCompanyPrivilegesState] = useState(null);

    // const [selectedCompanyPrivileges, setSelectedCompanyPrivileges] = useState('');
    // const [companyPrivilegesDataList, setCompanyPrivilegesDataList] = useState([
    //     { id: "0", text: "Todos" },
    //     { id: "1", text: "Titular da Conta" },
    //     { id: "2", text: "Administrador" },
    //     { id: "3", text: "Finanças" },
    //     { id: "4", text: "Acesso a Relátorios" },
    //     { id: "5", text: "Vendas" },
    //     { id: "6", text: "Desenvolvedor" },
    //     { id: "7", text: "Suporte ao Cliente" },
    //     { id: "8", text: "Marketing" },
    // ]);
    // const handleCompanyPrivilegesDataList = (companyPrivileges) => {
    //     setCompanyPrivilegesDataList(companyPrivileges);
    // }

    const handleSelectionEmploymentContractDataWrapper = (
        selectedId,
        dataList,
        setSelectedAction,
        setFieldAction,
        setStateAction,
        setSelectedDepartmentIdAction = null,
        setHasDepartmentSelectedAction = null,
        savedDataType = 'id'
    ) => {
        // Despache o estado 'valid' antes de iniciar o processo de seleção
        if (setStateAction) dispatch({ type: setStateAction, payload: 'valid' });
        if (setHasDepartmentSelectedAction) dispatch({ type: setHasDepartmentSelectedAction, payload: true });
        // Chama a função de processamento de seleção de dados
        handleSelectionEmploymentContractData(
            selectedId,
            dataList,
            (value) => dispatch({ type: setSelectedAction, payload: value }),
            (value) => dispatch({ type: setFieldAction, payload: value }), // Agora definirá o valor correto
            (state) => dispatch({ type: setStateAction, payload: state }),
            (id) => dispatch({ type: setSelectedDepartmentIdAction, payload: id }),
            () => dispatch({ type: setHasDepartmentSelectedAction, payload: true }),
            savedDataType
        );
    };

    const selectedListItemToUpdate = (item, list, setSelectedItem, setItem, setItemState) => {
        const selectedItem = list.find(p => p.text === item);
        if (selectedItem) {
            setSelectedItem(selectedItem.id);
            handleSelectionEmploymentContractDataWrapper(selectedItem.id, list, setSelectedItem, setItem, setItemState, null, null, 'id');
        }
    };

    // Lista para armazenar dados da Entidade Legal cadastrada
    const [detailedClientCompanyData, setDetailedClientCompanyData] = useState([]);
    function handleCleanDetailedClientCompanyData() {
        setDetailedClientCompanyData([]);
    };

    // Lista para armazenar dados de endereço da Entidade Legal cadastrada
    const [detailedClientCompanyAddressData, setDetailedClientCompanyAddressData] = useState([]);
    function handleCleanDetailedClientCompanyAddressData() {
        setDetailedClientCompanyAddressData([]);
    };

    const [formattedAccessionDate, setFormattedAccessionDate] = useState('');

    const hasHandledCNPJ = useRef(false);

    useEffect(() => {
        if (stateCNPJ.cnpjData.brasilAPICNPJData !== null && !hasHandledCNPJ.current) {
            if (stateCNPJ.cnpjData.loadingCNPJValidation === true) {
                hasHandledCNPJ.current = true;
                dispatchCNPJ({
                    type: 'SET_LOADING_CNPJ_VALIDATION',
                    payload: false
                });
                handleFormFieldsAutocomplete(stateCNPJ, dispatchCNPJ, state, dispatch, stateCEP, dispatchCEP,);
            }
        }
    }, [stateCNPJ.cnpjData.brasilAPICNPJData])

    useEffect(() => {
        if (stateCNPJ.cnpjData.hasValuesChangedWithCNPJAPIData) {
            dispatchCNPJ({
                type: 'SET_HAS_VALUES_CHANGED_WITH_CNPJ_API_DATA',
                payload: false
            });
            validateAddCustomerCompanyForm(stateCNPJ, dispatchCNPJ, state, dispatch);
        }
    }, [stateCNPJ.cnpjData.hasValuesChangedWithCNPJAPIData, validateAddCustomerCompanyForm]);

    useEffect(() => {
        if (stateCEP.cepData.brasilAPICEPData !== null) {
            handleFormFieldsAutocompleteCEP(stateCEP, dispatchCEP, state, dispatch);
            dispatchCEP({
                type: 'SET_LOADING_CEP_VALIDATION',
                payload: false
            });
            dispatchCEP({
                type: 'SET_LOADING_CEP_VALIDATION',
                payload: false
            });
            dispatchCEP({ type: 'SET_ERROR_CEP_VALIDATION', payload: null });
        }
        if (stateCEP.cepData.errorCEPValidation) {
            setFieldTouchStatus((prev) => ({
                ...prev,
                zipCode: {
                    ...prev.zipCode,
                    state: "invalid",
                    touched: true
                }
            }));
        }
    }, [stateCEP.cepData.brasilAPICEPData, stateCEP.cepData.errorCEPValidation]);

    useEffect(() => {
        if (stateCEP.cepData.hasValuesChangedWithAPIDataCEP) {
            dispatchCEP({ type: 'SET_HAS_VALUES_CHANGED_WITH_CEP_API_DATA', payload: true });
            const fieldsToUpdate = {
                federatedUnit,
                companyCity,
                companyAddress,
                companyDistrict,
                zipCode,
            };
            updateFieldsWithHandleChange(fieldsToUpdate);
        }
    }, [stateCEP.cepData.hasValuesChangedWithAPIDataCEP, validateAddCustomerAddressForm]);

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
                dispatchCNPJ({ type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER', payload: foundCustomer.identificationNumber });
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
                fieldTouchStatus.zipCode.value,
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
                                value={stateCNPJ.cnpjData.individualEmployerIdNumber}
                                onChange={(e) => {
                                    dispatchCNPJ({ type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER', payload: value });
                                    if (!cnpjTouched) {
                                        setCnpjTouched(true);
                                    }
                                }}
                                onBlur={() => {
                                    dispatchCNPJ({ type: 'SET_INDIVIDUAL_EMPLOYER_ID_NUMBER_STATE', payload: individualEmployerIdNumber !== '' ? 'valid' : 'invalid' });
                                }}
                            >
                                {(inputProps) => <Input {...inputProps} id="validationCustomerIndividualEmployerIdnNumber" valid={cnpjTouched && individualEmployerIdNumberState === "valid"} invalid={cnpjTouched && individualEmployerIdNumberState === "invalid"} disabled />}
                            </InputMask>
                            {stateCNPJ.cnpjData.individualEmployerIdNumberState === 'invalid' && (
                                <div className="invalid-feedback">
                                    {stateCNPJ.cnpjData.errorCNPJValidation || 'CNPJ inválido!'}
                                </div>
                            )}
                            {stateCNPJ.cnpjData.individualEmployerIdNumberState === 'valid' && (
                                <div className="valid-feedback">CNPJ válido!</div>
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