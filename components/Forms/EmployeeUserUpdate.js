import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from 'react';
// nodejs library that concatenates classes
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import {
    Button,
    Col,
    Input,
    Row
} from "reactstrap";
import { handleSelectionEmploymentContractData } from '../../util/handleSelectionEmploymentContractData';
import { EmployeeContext } from "../../contexts/RecordsContext/EmployeeContext";
import useCreateEmployee from "../../hooks/RecordsHooks/employee/useCreateEmployee";
import useCreateTypeContract from "../../hooks/RecordsHooks/featuresEmploymentContract/useCreateTypeContract";
import useCreateWorkModel from "../../hooks/RecordsHooks/featuresEmploymentContract/useCreateWorkModel";
import useCreateWorkplace from "../../hooks/RecordsHooks/featuresEmploymentContract/useCreateWorkplace";
import { useFindEmployee } from "../../hooks/RecordsHooks/employee/useFindEmployee";
import { useFindEmployeeContractDetails } from "../../hooks/RecordsHooks/featuresEmploymentContract/useFindEmployeeContractDetails";
import { handleDateFormatting } from "../../util/handleDateFormatting";

function EmployeeUserUpdate({ handleOpenCustomerModal }) {

    const {
        employeeIdToUpdate,
        handleEmployeeIdStatusCleanupToUpdate,
        handleEmployeeIdToUpdate,
        hasNewEmployeeRecordCreated,
        handleCreatedEmployeeRecordStatusChange,
        hasUpdatedEmployeeRecord,
        handleUpdatedEmployeeRecordStatusChange,
        isShouldUpdateEmployee,
        handleIsShouldUpdateEmployee,
        hasDeletedEmployeeRecord,
        handleDeletedEmployeeRecordStatusChange
    } = useContext(EmployeeContext);

    // const {
    //     handleValidateUpdateClientCompanyForm
    // } = useUpdateClientCompany();

    const {
        employeeIdNumber,
        setEmployeeIdNumber,
        employeeIdNumberState,
        setEmployeeIdNumberState,
        firstName,
        setFirstName,
        firstNameState,
        setFirstNameState,
        lastName,
        setLastName,
        lastNameState,
        setLastNameState,
        emailAddress,
        setEmailAddress,
        emailAddressState,
        setEmailAddressState,
        birthdate,
        setBirthdate,
        birthdateState,
        setBirthdateState,
        phoneNumber,
        setPhoneNumber,
        phoneNumberState,
        setPhoneNumberState,
        employeeAddress,
        setEmployeeAddress,
        employeeAddressState,
        setEmployeeAddressState,
        employeeAddressNumber,
        setEmployeeAddressNumber,
        employeeAddressNumberState,
        setEmployeeAddressNumberState,
        employeeAddressComplement,
        setEmployeeAddressComplement,
        employeeAddressComplementState,
        setEmployeeAddressComplementState,
        employeeNeighborhood,
        setEmployeeNeighborhood,
        employeeNeighborhoodState,
        setEmployeeNeighborhoodState,
        employeeCity,
        setEmployeeCity,
        employeeCityState,
        setEmployeeCityState,
        federatedUnit,
        setFederatedUnit,
        federatedUnitState,
        setFederatedUnitState,
        departmentWhichEmployeeReports,
        setDepartmentWhichEmployeeReports,
        departmentWhichEmployeeReportsState,
        setDepartmentWhichEmployeeReportsState,
        employeeRole,
        setEmployeeRole,
        employeeRoleState,
        setEmployeeRoleState,
        employeeFunction,
        setEmployeeFunction,
        employeeFunctionState,
        setEmployeeFunctionState,
        isEmployeeLeader,
        setIsEmployeeLeader,
        hasEmployeeLeader,
        setHasEmployeeLeader,
        employeeLeaderName,
        setEmployeeLeaderName,
        employeeLeaderNameState,
        setEmployeeLeaderNameState,
        employeeContractType,
        setEmployeeContractType,
        employeeContractTypeState,
        setEmployeeContractTypeState,
        employeeWorkModel,
        setEmployeeWorkModel,
        employeeWorkModelState,
        setEmployeeWorkModelState,
        employeeWorkplace,
        setEmployeeWorkplace,
        employeeWorkplaceState,
        setEmployeeWorkplaceState,
        isInvalidEmployeeLeaderComponent,
        setIsInvalidEmployeeLeaderComponent,
        showErrorFeedbackEmployeeLeaderComponent,
        setShowErrorFeedbackEmployeeLeaderComponent,
        employeetAdmissionDate,
        setEmployeetAdmissionDate,
        employeetAdmissionDateState,
        setEmployeetAdmissionDateState,
        employeeEntryTime,
        setEmployeeEntryTime,
        employeeEntryTimeState,
        setEmployeeEntryTimeState,
        employeeBreakTime,
        setEmployeeBreakTime,
        employeeBreakTimeState,
        setEmployeeBreakTimeState,
        employeeDepartureTime,
        setEmployeeDepartureTime,
        employeeDepartureTimeState,
        setEmployeeDepartureTimeState,
        employeeStatus,
        setEmployeeStatus,
        employeeStatusState,
        setEmployeeStatusState,
        handleValidateAddEmployeeForm,
        handleBirthdateChange,
        validateEmail,
        validateAddEmployeeForm,
        validateAddEmployeeAddressForm,
        handleFormFieldsAutocomplete,
        hasValuesChangedWithAPIData,
        handleValuesChangedWithAPIData,
        handleAdmissionDateChange,
        handleTimeChange,
        handleIsEmployeeLeader,
        handleHasEmployeeLeader
    } = useCreateEmployee();

    const {
        handleEmployeeContractType,
        handleEmployeeContractTypeState,
        contractTypeDataList,
        handleContractTypeDataList
    } = useCreateTypeContract();

    const {
        handleEmployeetWorkModel,
        handleEmployeetWorkModelState,
        workModelDataList,
        handleWorkModelDataList
    } = useCreateWorkModel();

    const {
        handleEmployeeWorkplace,
        handleEmployeeWorkplaceState,
        workplaceDataList,
        handleWorkplaceDataList
    } = useCreateWorkplace();

    const [fieldTouchStatus, setFieldTouchStatus] = useState({

        firstName: { value: "", touched: false, state: null },
        lastName: { value: "", touched: false, state: null },
        emailAddress: { value: "", touched: false, state: null },
        phoneNumber: { value: "", touched: false, state: null },
        employeeLeaderName: { value: "", touched: false, state: null },
        isEmployeeLeader: { value: "", touched: false, state: null },
        employeeStatus: { value: "", touched: false, state: null },

        employeetAdmissionDate: { value: "", touched: false, state: null },
        employeeEntryTime: { value: "", touched: false, state: null },
        employeeBreakTime: { value: false, touched: false, state: null },
        employeeDepartureTime: { value: "", touched: false, state: null },
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

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFunction, setSelectedFunction] = useState('');
    const [selectedContractType, setSelectedContractType] = useState('');
    const [selectedWorkModel, setSelectedWorkModel] = useState('');
    const [selectedWorkplace, setSelectedWorkplace] = useState('');

    const [departmentDataList, setDepartmentDataList] = useState([]);
    const handleDepartmentDataList = (departmentData) => {
        setDepartmentDataList(departmentData);
    }

    const [roleDataList, setRoleDataList] = useState([]);
    const handleRoleDataList = (roleData) => {
        setRoleDataList(roleData);
    }

    const [functionDataList, setFunctionDataList] = useState([]);
    const handleFunctionDataList = (functionData) => {
        setFunctionDataList(functionData);
    }

    const selectedListItemToUpdate = (item, list, setSelectedItem, setItem, setItemState) => {
        const selectedItem = list.find(p => p.text === item);
        if (selectedItem) {
            setSelectedItem(selectedItem.id);
            handleSelectionEmploymentContractData(selectedItem.id, list, setSelectedItem, setItem, setItemState);
        }
    };

    const [detailedEmployeeData, setDetailedEmployeeData] = useState([]);
    function handleCleanDetailedEmployeeData() {
        setDetailedEmployeeData([]);
    };

    const [detailedContractDetailsData, setDetailedContractDetailsData] = useState([]);
    function handleCleanDetailedContractDetailsData() {
        setDetailedContractDetailsData([]);
    };

    const [formattedBirthdate, setFormattedBirthdate] = useState('');

    useEffect(() => {
        const fetchEmployeeAndContractDetailsById = async () => {
            if (!detailedEmployeeData.length) {
                const foundEmployee = await useFindEmployee(employeeIdToUpdate);
                setDetailedEmployeeData(foundEmployee);
                console.log(foundEmployee);
                setFieldTouchStatus((prev) => ({
                    ...prev,
                    firstName: { ...prev.firstName, value: foundEmployee.name },
                    lastName: { ...prev.lastName, value: foundEmployee.lastName },
                    emailAddress: { ...prev.emailAddress, value: foundEmployee.email },
                    phoneNumber: { ...prev.phoneNumber, value: foundEmployee.phoneNumber },

                    employeeLeaderName: { ...prev.employeeLeaderName, value: foundEmployee.LeaderName },
                    isEmployeeLeader: { ...prev.isEmployeeLeader, value: foundEmployee.isLead },
                    employeeStatus: { ...prev.employeeStatus, value: foundEmployee.status },
                }));
                setBirthdate(new Date(foundEmployee.birthdate));
                setFormattedBirthdate(foundEmployee.birthdate);
            }
            if (!detailedContractDetailsData.length) {
                const foundContractDatails = await useFindEmployeeContractDetails(employeeIdToUpdate);
                setDetailedContractDetailsData(foundContractDatails);
                console.log(foundContractDatails);
                // setFieldTouchStatus((prev) => ({
                //     ...prev,
                //     employeetAdmissionDate: { ...prev.employeetAdmissionDate, value: foundContractDatails.employeetAdmissionDate },
                //     employeeEntryTime: { ...prev.employeeEntryTime, value: foundContractDatails.employeeEntryTime },
                //     employeeBreakTime: { ...prev.employeeBreakTime, value: foundContractDatails.employeeBreakTime },
                //     employeeDepartureTime: { ...prev.employeeDepartureTime, value: foundContractDatails.employeeDepartureTime },
                // }));
                // selectedListItemToUpdate(foundCustomer.departmentWhichEmployeeReports, contractTypeDataList, setSelectedDepartment, setDepartmentWhichEmployeeReports, setDepartmentWhichEmployeeReportsState);
                // selectedListItemToUpdate(foundCustomer.employeeRole, companySectorDataList, setSelectedRole, setEmployeeRole, setEmployeeRoleState);
                // selectedListItemToUpdate(foundCustomer.employeeFunction, companyTypesDataList, setSelectedFunction, setEmployeeFunction, setEmployeeFunctionState);

                // selectedListItemToUpdate(foundCustomer.employeeContractType, contractTypeDataList, setSelectedContractType, setEmployeeContractType, setEmployeeContractTypeState);
                // selectedListItemToUpdate(foundCustomer.employeeWorkModel, workModelDataList, setSelectedWorkModel, setEmployeeWorkModel, setEmployeeWorkModelState);
                // selectedListItemToUpdate(foundCustomer.employeeWorkplace, workplaceDataList, setSelectedWorkplace, setEmployeeWorkplace, setEmployeeWorkplaceState);
            }
        };

        fetchEmployeeAndContractDetailsById();
    }, [employeeIdToUpdate]);

    // useEffect(() => {
    //     if (isShouldUpdateEmployee) {
    //         handleValidateUpdateClientCompanyForm(
    //             handleOpenCustomerModal,
    //             customerIdToUpdate,
    //             individualEmployerIdNumber,
    //             fieldTouchStatus.companyName.value,
    //             fieldTouchStatus.registrationName.value,
    //             companyTypes,
    //             fieldTouchStatus.customerBusinessPhoneNumber.value,
    //             fieldTouchStatus.customerPhoneNumber.value,
    //             fieldTouchStatus.companyEmailAddress.value,
    //             customerBusinessSector,
    //             fieldTouchStatus.customerWebSite.value,
    //             fieldTouchStatus.customerStatus.value,
    //             formattedAccessionDate,
    //             fieldTouchStatus.idHeadOfficeBranch.value,
    //             fieldTouchStatus.customerZipCode.value,
    //             fieldTouchStatus.federatedUnit.value,
    //             fieldTouchStatus.companyCity.value,
    //             fieldTouchStatus.companyAddress.value,
    //             fieldTouchStatus.companyAddressNumber.value,
    //             fieldTouchStatus.companyAddressComplement.value,
    //             fieldTouchStatus.companyDistrict.value,
    //             fieldTouchStatus.companyCountry.value,
    //             handleCustomerIdToUpdate,
    //             handleCustomerIdStatusCleanupToUpdate
    //         )
    //         handleIsShouldUpdateEmployee();
    //     }
    // }, [isShouldUpdateEmployee, fieldTouchStatus, formattedAccessionDate]);

    return (

        <Row>
            <div className="col">
                <div className="card-wrapper">
                    <div className="form-row">
                        {/* <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeIdNumber"
                                >
                                    Identificação do Colaborador (opcional)
                                </label>
                                <Input
                                    id="validationEmployeeIdNumber"
                                    placeholder="Código ou ID do colaborador"
                                    onChange={(e) => {
                                        setEmployeeIdNumber(e.target.value);

                                    }}
                                />

                            </Col> */}
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeFirstName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationEmployeeFirstName"
                                placeholder="Nome"
                                type="text"
                                valid={fieldTouchStatus.firstName.touched && fieldTouchStatus.firstName.state === "valid"}
                                invalid={fieldTouchStatus.firstName.touched && fieldTouchStatus.firstName.state === "invalid"}
                                value={fieldTouchStatus.firstName.value}
                                onChange={(e) => handleChange(e, "firstName")}
                                onTouchStart={() => handleTouchStart("firstName")}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeLastName"
                            >
                                Sobrenome
                            </label>
                            <Input
                                id="validationEmployeeLastName"
                                placeholder="Sobrenome"
                                type="text"
                                valid={fieldTouchStatus.lastName.touched && fieldTouchStatus.lastName.state === "valid"}
                                invalid={fieldTouchStatus.lastName.touched && fieldTouchStatus.lastName.state === "invalid"}
                                value={fieldTouchStatus.lastName.value}
                                onChange={(e) => handleChange(e, "lastName")}
                                onTouchStart={() => handleTouchStart("lastName")}
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
                                htmlFor="validationEmployeeBirthdate"
                            >
                                Data de Nascimento
                            </label>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "__/__/__",
                                }}
                                timeFormat={false}
                                value={birthdate}
                                onChange={(e) => handleDateFormatting(e, setBirthdate, setBirthdateState, setFormattedBirthdate)}
                            />
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeEmailAddress"
                            >
                                Email
                            </label>
                            <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationEmployeeEmailAddress"
                                placeholder="Endereço de e-mail"
                                type="email"
                                valid={fieldTouchStatus.emailAddress.touched && fieldTouchStatus.emailAddress.state === "valid"}
                                invalid={fieldTouchStatus.emailAddress.touched && fieldTouchStatus.emailAddress.state === "invalid"}
                                value={fieldTouchStatus.emailAddress.value}
                                onChange={(e) => handleChange(e, "emailAddress")}
                                onTouchStart={() => handleTouchStart("emailAddress")}
                            />
                            <div className="invalid-feedback">
                                {fieldTouchStatus.emailAddress.state === "invalid" && "Forneça um endereço de e-mail válido."}
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeePhoneNumber"
                            >
                                Número de Telefone
                            </label>
                            <InputMask
                                placeholder='+55 (99) 9 9999-9999'
                                mask="+55 (99) 9 9999-9999"
                                maskChar=" "
                                value={fieldTouchStatus.phoneNumber.value}
                                onChange={(e) => handleChange(e, 'phoneNumber', 'personal')}
                                onBlur={() => handleTouchStart('phoneNumber')}
                            >
                                {(inputProps) => <Input {...inputProps}
                                    id="validationEmployeePhoneNumber"
                                    type="text"
                                    valid={fieldTouchStatus.phoneNumber.state === "valid"}
                                    invalid={fieldTouchStatus.phoneNumber.state === "invalid"}
                                />}
                            </InputMask>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <hr />
                    {/* <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeZipCode"
                                >
                                    CEP
                                </label>
                                <InputMask
                                    placeholder="99999-999"
                                    mask="99999-999"
                                    maskChar=" "
                                    value={employeeZipCode}
                                    onChange={(e) => handleSaveCEP(e.target.value)}
                                >
                                    {(inputProps) => <Input {...inputProps} id="validationEmployeeZipCode" type="text" valid={employeeZipCodeState === "valid"} invalid={employeeZipCodeState === "invalid"} />}
                                </InputMask>
                                {
                                    loadingCEPValidation ? <div style={{ display: 'none', width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#5e72e4' }}>Validando CEP...</div> : (
                                        errorCEPValidation !== null ? <div className="invalid-feedback">Ocorreu um erro ao validar o CEP.</div> : (
                                            brasilAPICEPData ? <div className="valid-feedback">CEP válido!</div> : <div className="invalid-feedback">CEP inválido!</div>
                                        )
                                    )
                                }
                            </Col>
                            <Col className="mb-3" md="8">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyAddress"
                                >
                                    Endereço
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeCompanyAddress"
                                    placeholder=""
                                    value={employeeAddress}
                                    type="text"
                                    valid={employeeAddressState === "valid"}
                                    invalid={employeeAddressState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeAddress(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeAddressState("invalid");
                                        } else {
                                            setEmployeeAddressState("valid");
                                        }
                                    }}
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
                                    htmlFor="validationEmployeeCompanyAddressNumber"
                                >
                                    Número
                                </label>
                                <Input
                                    defaultValue="0000"
                                    id="validationEmployeeCompanyAddressNumber"
                                    placeholder="0000"
                                    value={employeeAddressNumber}
                                    type="text"
                                    valid={employeeAddressNumberState === "valid"}
                                    invalid={employeeAddressNumberState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeAddressNumber(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeAddressNumberState("invalid");
                                        } else {
                                            setEmployeeAddressNumberState("valid");
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                            </Col>
                            <Col className="mb-3" md="8">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyAddressComplement"
                                >
                                    Complemento (opcional)
                                </label>
                                <Input
                                    id="validationEmployeeCompanyAddressComplement"
                                    placeholder=""
                                    value={employeeAddressComplement}
                                    type="text"
                                    onChange={(e) => {
                                        setEmployeeAddressComplement(e.target.value);
                                    }}
                                />
                            </Col>
                        </div>
                        <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyDistrict"
                                >
                                    Bairro
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeCompanyDistrict"
                                    placeholder=""
                                    value={employeeNeighborhood}
                                    type="text"
                                    valid={employeeNeighborhoodState === "valid"}
                                    invalid={employeeNeighborhoodState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeNeighborhood(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeNeighborhoodState("invalid");
                                        } else {
                                            setEmployeeNeighborhoodState("valid");
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
                                    htmlFor="validationEmployeeCompanyCity"
                                >
                                    Cidade
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeCompanyCity"
                                    placeholder=""
                                    value={employeeCity}
                                    type="text"
                                    valid={employeeCityState === "valid"}
                                    invalid={employeeCityState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeCity(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeCityState("invalid");
                                        } else {
                                            setEmployeeCityState("valid");
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
                                    htmlFor="validationEmployeeFederatedUnit"
                                >
                                    Estado
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeFederatedUnit"
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
                        </div>
                        <hr /> */}
                    <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationFromDepartmentWhichEmployeeReports"
                            >
                                Departamento
                            </label>
                            <Select2
                                id="validationFromDepartmentWhichEmployeeReports"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione o departamento",
                                }}
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                data={departmentDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, departmentDataList, setSelectedDepartment, setDepartmentWhichEmployeeReports, setDepartmentWhichEmployeeReportsState, handleSelectedDepartmentId, setHasDepartmentSelected)}
                            />
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeRole"
                            >
                                Cargo
                            </label>
                            <Select2
                                id="validationEmployeeRole"
                                data-minimum-results-for-search="Infinity"
                                className="form-control"
                                options={{
                                    placeholder: "Selecione o cargo",
                                }}
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                data={roleDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, roleDataList, setSelectedRole, setEmployeeRole, setEmployeeRoleState, null)}
                            />
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeFunction"
                            >
                                Função
                            </label>
                            <Select2
                                id="validationEmployeeFunction"
                                data-minimum-results-for-search="Infinity"
                                className="form-control"
                                options={{
                                    placeholder: "Selecione o função",
                                }}
                                value={selectedFunction}
                                onChange={(e) => setSelectedFunction(e.target.value)}
                                data={functionDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, functionDataList, setSelectedFunction, setEmployeeFunction, setEmployeeFunctionState, null)}
                            />
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationLeader"
                            >
                                Exerce líderança
                            </label>
                            <Row className="mt-3">
                                <Col md="6">
                                    <div className={`custom-control custom-radio mb-3 ${isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}>
                                        <input
                                            className={`custom-control-input ${isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}
                                            id="validationEmployeeIsLeader"
                                            type="radio"
                                            name="custom-radio-leader"
                                            checked={isEmployeeLeader}
                                            onClick={handleIsEmployeeLeader}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="validationEmployeeIsLeader"
                                        >
                                            Sim
                                        </label>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className={`custom-control custom-radio mb-3 ${isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}>
                                        <input
                                            className={`custom-control-input ${isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}
                                            id="validationEmployeeNoLeader"
                                            type="radio"
                                            name="custom-radio-leader"
                                            checked={hasEmployeeLeader}
                                            onClick={handleHasEmployeeLeader}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="validationEmployeeNoLeader"
                                        >
                                            Não
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            {showErrorFeedbackEmployeeLeaderComponent && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    Necessário selecionar uma das opções, indicando se o colaborador exerce ou não liderança
                                </div>
                            )}
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationSelectLeader"
                            >
                                Liderado por
                            </label>
                            <Input
                                id="validationSelectLeader"
                                placeholder="Nome do líder"
                                type="text"
                                valid={employeeLeaderNameState === "valid"}
                                invalid={employeeLeaderNameState === "invalid"}
                                onChange={(e) => {
                                    setEmployeeLeaderName(e.target.value);
                                    if (e.target.value === "") {
                                        setEmployeeLeaderNameState("invalid");
                                    } else {
                                        setEmployeeLeaderNameState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            {/* <Select2
                                    id="validationSelectLeader"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{
                                        placeholder: "Selecione o líder",
                                    }}
                                    value={selectedEmployeeAndRole}
                                    onChange={(e) => setSelectedEmployeeAndRole(e.target.value)}
                                    data={employeeAndRoleDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, employeeAndRoleDataList, setSelectedEmployeeAndRole, setEmployeeLeaderName, setEmployeeLeaderNameState)}
                                /> */}
                        </Col>
                    </div>
                    <hr />
                    <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationContractType"
                            >
                                Tipo de Contrato
                            </label>
                            <Select2
                                id="validationContractType"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione o tipo de contrato",
                                }}
                                value={selectedContractType}
                                onChange={(e) => setSelectedContractType(e.target.value)}
                                data={contractTypeDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, contractTypeDataList, setSelectedContractType, setEmployeeContractType, setEmployeeContractTypeState, null)}
                            />
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationWorkModel"
                            >
                                Modelo de Trabalho
                            </label>
                            <Select2
                                id="validationWorkModel"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione o modelo de trabalho",
                                }}
                                value={selectedWorkModel}
                                onChange={(e) => setSelectedWorkModel(e.target.value)}
                                data={workModelDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, workModelDataList, setSelectedWorkModel, setEmployeeWorkModel, setEmployeeWorkModelState, null)}
                            />
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationAdmissionDate"
                            >
                                Data de Admissão
                            </label>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "__/__/__",
                                }}
                                timeFormat={false}
                                onChange={handleAdmissionDateChange}

                            />
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationWorkplace"
                            >
                                Local de Trabalho
                            </label>
                            <Select2
                                id="validatingWorkplace"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione o local de trabalho",
                                }}
                                value={selectedWorkplace}
                                onChange={(e) => setSelectedWorkplace(e.target.value)}
                                data={workplaceDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, workplaceDataList, setSelectedWorkplace, setEmployeeWorkplace, setEmployeeWorkplaceState, null)}
                            />
                        </Col>
                        <Col className="mb-3" md="2">
                            <label
                                className="form-control-label"
                                htmlFor="validationEntryTime"
                            >
                                Hora de Entrada
                            </label>
                            <InputMask
                                mask="99:99:99"
                                placeholder="08:00:00"
                                value={employeeEntryTime}
                                onChange={(e) => {
                                    setEmployeeEntryTime(e.target.value);
                                    if (e.target.value === "" || e.target.value.includes("_")) {
                                        setEmployeeEntryTimeState("invalid");
                                    } else {
                                        setEmployeeEntryTimeState("valid");
                                    }
                                }}
                            >
                                {(inputProps) => <Input {...inputProps} id="validationEntryTime" type="text" valid={employeeEntryTimeState === "valid"} invalid={employeeEntryTimeState === "invalid"} />}
                            </InputMask>
                            <div className="invalid-feedback">
                                {employeeEntryTimeState === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
                            </div>
                        </Col>
                        <Col className="mb-3" md="2">
                            <label
                                className="form-control-label"
                                htmlFor="validationBreakTime"
                            >
                                Intervalo
                            </label>
                            <InputMask
                                mask="99:99:99"
                                placeholder="12:00:00"
                                value={employeeBreakTime}
                                onChange={handleTimeChange(setEmployeeBreakTime, setEmployeeBreakTimeState)}
                            >
                                {(inputProps) => (
                                    <Input
                                        {...inputProps}
                                        id="validationBreakTime"
                                        type="text"
                                        valid={employeeBreakTimeState === "valid"}
                                        invalid={employeeBreakTimeState === "invalid"}
                                    />
                                )}
                            </InputMask>
                            <div className="invalid-feedback">
                                {employeeBreakTimeState === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
                            </div>
                        </Col>
                        <Col className="mb-3" md="2">
                            <label
                                className="form-control-label"
                                htmlFor="validationDepartureTime"
                            >
                                Horário de Saída
                            </label>
                            <InputMask
                                mask="99:99:99"
                                placeholder="18:00:00"
                                value={employeeDepartureTime}
                                onChange={handleTimeChange(setEmployeeDepartureTime, setEmployeeDepartureTimeState)}
                            >
                                {(inputProps) => (
                                    <Input
                                        {...inputProps}
                                        id="validationDepartureTime"
                                        type="text"
                                        valid={employeeDepartureTimeState === "valid"}
                                        invalid={employeeDepartureTimeState === "invalid"}
                                    />
                                )}
                            </InputMask>
                            <div className="invalid-feedback">
                                {employeeDepartureTimeState === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        </Row >
    );
}

EmployeeUserUpdate.defaultProps = {
    handleCompanyNameStatusCleanupToUpdate: () => { }
};

EmployeeUserUpdate.propTypes = {
    handleCompanyNameStatusCleanupToUpdate: PropTypes.func
};

export default EmployeeUserUpdate;