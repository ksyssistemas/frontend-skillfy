import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// nodejs library that concatenates classes
import classnames from "classnames";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Col,
    FormGroup,
    Form,
    Input,
    Row,
} from "reactstrap";
import useCreateEmployee from '../../hooks/RecordsHooks/employee/useCreateEmployee';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import useCEP from '../../hooks/RecordsHooks/useCEP';
import useCreateTypeContract from '../../hooks/RecordsHooks/featuresEmploymentContract/useCreateTypeContract';
import useCreateWorkModel from '../../hooks/RecordsHooks/featuresEmploymentContract/useCreateWorkModel';
import useCreateWorkplace from '../../hooks/RecordsHooks/featuresEmploymentContract/useCreateWorkplace';
import { useFindAllEmployeeAndRole } from '../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllEmployeeAndRole';
import { useFindAllTypeContract } from '../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllTypeContract';
import { useFindAllWorkModels } from '../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllWorkModels';
import { useFindAllWorkplaces } from '../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllWorkplaces';
import { useFindAllDepartments } from '../../hooks/RecordsHooks/department/useFindAllDepartments';
import { useFindAllRoles } from '../../hooks/RecordsHooks/role/useFindAllRoles';
import { useFindAllFunctions } from '../../hooks/RecordsHooks/employeeFunction/useFindAllFunctions';
import { employmentContractDataSearchAndProcess } from '../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../util/handleSelectionEmploymentContractData';

function EmployeeUserRegister({ handleShowEmployeeUserRegister }) {

    const router = useRouter();

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

    const {
        brasilAPICEPData,
        loadingCEPValidation,
        errorCEPValidation,
        handleCEPValidationLoading,
        handleSaveCEP,
        employeeZipCode,
        setEmployeeZipCode,
        employeeZipCodeState,
        setEmployeeZipCodeState
    } = useCEP();

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFunction, setSelectedFunction] = useState('');
    const [selectedContractType, setSelectedContractType] = useState('');
    const [selectedWorkModel, setSelectedWorkModel] = useState('');
    const [selectedWorkplace, setSelectedWorkplace] = useState('');
    const [selectedEmployeeAndRole, setSelectedEmployeeAndRole] = useState('');

    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
    const handleSelectedDepartmentId = (id) => {
        setSelectedDepartmentId(id);
    };
    const [hasDepartmentSelected, setHasDepartmentSelected] = useState(false);
    const handleHasDepartmentSelected = (departmentSelectedStatus) => {
        setHasDepartmentSelected(departmentSelectedStatus);
    };

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

    const [employeeAndRoleDataList, setEmployeeAndRoleDataList] = useState([]);
    const handleEmployeeAndRoleDataList = (employeeAndRole) => {
        setEmployeeAndRoleDataList(employeeAndRole);
    }

    async function employeeAndRoleDataSearchAndProcess(apiCall, setData, departamentId, handleHasDepartmentSelected, setSelectedDepartmentId) {
        if (!departamentId || departamentId === '') {
            setData([{ id: "0", text: "Não há líderes, é necessário cadastrar colaboradores que exercem liderança." }])
        } else {
            try {
                console.log("departamentId", departamentId)
                const response = await apiCall(departamentId);
                console.log("Response: ", response);
                if (response) {
                    if (response && response.length > 0) {
                        const dataObject = response.map((employee, index) => {
                            const nameAndRoleConcat = `${employee.EmployeeName} - ${employee.RoleName}`;
                            return {
                                id: index.toString(),
                                text: nameAndRoleConcat
                            }
                        });
                        console.log("dataObject: ", dataObject);
                        setData(dataObject);
                        handleHasDepartmentSelected(false);
                        setSelectedDepartmentId('');
                    } else {
                        setData([{ id: "0", text: "Não há líderes, é necessário cadastrar colaboradores que exercem liderança." }])
                        handleHasDepartmentSelected(false);
                        setSelectedDepartmentId('');
                    }
                } else {
                    console.error('Erro na resposta: ', response.status);
                    handleHasDepartmentSelected(false);
                    setSelectedDepartmentId('');
                }
            } catch (error) {
                console.error('Erro no pedido: ', error);
                handleHasDepartmentSelected(false);
                setSelectedDepartmentId('');
            }
        }
    };

    useEffect(() => {
        if (employeeAndRoleDataList.length === 0 || hasDepartmentSelected) {
            employeeAndRoleDataSearchAndProcess(useFindAllEmployeeAndRole, handleEmployeeAndRoleDataList, selectedDepartmentId, handleHasDepartmentSelected, setSelectedDepartmentId);
        }
        if (contractTypeDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllTypeContract, handleContractTypeDataList, 'contractType', 'EmployeeUserRegister');
        }
        if (workModelDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllWorkModels, handleWorkModelDataList, 'workModel', 'EmployeeUserRegister');
        }
        if (workplaceDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllWorkplaces, handleWorkplaceDataList, 'workplace', 'EmployeeUserRegister');
        }
        if (departmentDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllDepartments, handleDepartmentDataList, 'department', 'EmployeeUserRegister');
        }
        if (roleDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllRoles, handleRoleDataList, 'role', 'EmployeeUserRegister');
        }
        if (functionDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllFunctions, handleFunctionDataList, 'function', 'EmployeeUserRegister');
        }
    }, [hasDepartmentSelected]);

    useEffect(() => {
        if (brasilAPICEPData !== null) {
            handleCEPValidationLoading();
            handleFormFieldsAutocomplete(brasilAPICEPData);
        }
    }, [brasilAPICEPData]);

    useEffect(() => {
        if (hasValuesChangedWithAPIData) {
            handleValuesChangedWithAPIData(!hasValuesChangedWithAPIData);
            validateAddEmployeeAddressForm();
            //validateAddEmployeeForm();
        }
    }, [hasValuesChangedWithAPIData, validateAddEmployeeAddressForm]);

    return (
        <Form>
            <Card className="mb-4">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Colaborador</h3>
                </CardHeader>
                <CardBody>
                    <Form className="needs-validation" noValidate>
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
                                    htmlFor="validationEmployeeLastName"
                                >
                                    Sobrenome
                                </label>
                                <Input
                                    id="validationEmployeeLastName"
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
                                    onChange={handleBirthdateChange}

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
                                    {(inputProps) => <Input {...inputProps} id="validationEmployeePhoneNumber" type="text" valid={phoneNumberState === "valid"} invalid={phoneNumberState === "invalid"} />}
                                </InputMask>
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                            </Col>
                        </div>
                        <hr />
                        <div className="form-row">
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
                        <hr />
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
                        <Row>
                            <Col md="8" />
                            <Col className="d-flex justify-content-end align-items-center" md="4" >
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={() => handleValidateAddEmployeeForm(handleShowEmployeeUserRegister)}>
                                    <span className="btn-inner--text">Adicionar Colaborador</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Form>
    );
}

export default EmployeeUserRegister;
