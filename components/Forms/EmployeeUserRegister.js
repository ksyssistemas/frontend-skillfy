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
import useCreateEmployee from '../../hooks/employee/useCreateEmployee';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import useCEP from '../../hooks/useCEP';

function EmployeeUserRegister() {

    const router = useRouter();

    const {
        employeeIdNumber,
        setEmployeeIdNumber,
        employeeIdNumberState,
        setEmployeeIdNumberState,
        firstNameState,
        lastNameState,
        emailAddressState,
        birthdateState,
        phoneNumber,
        phoneNumberState,
        setFirstName,
        setFirstNameState,
        setLastName,
        setLastNameState,
        setEmailAddress,
        setEmailAddressState,
        setPhoneNumber,
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
        employeetWorkModel,
        setEmployeetWorkModel,
        employeetWorkModelState,
        setEmployeetWorkModelState,
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
        employeetWorkplace,
        setEmployeetWorkplace,
        employeetWorkplaceState,
        setEmployeetWorkplaceState,
        handleValidateAddEmployeeForm,
        handleBirthdateChange,
        handleAdmissionDateChange,
        validateEmail,
        validateAddEmployeeForm,
        hasValuesChangedWithAPIData,
        handleFormFieldsAutocomplete,
        handleValuesChangedWithAPIData,
        validateAddEmployeeAddressForm
    } = useCreateEmployee();

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

    const [departmentDataList, setDepartmentDataList] = useState([]);

    async function getDepartmentDataList() {
        try {
            const response = await fetch(`http://dlist.com.br:3010/department`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                let data = await response.json();
                if (data && data.length > 0) {
                    data = data.map((department, index) => ({
                        id: index.toString(),
                        text: department.name
                    }));
                    setDepartmentDataList([data]);
                } else {
                    setDepartmentDataList([{ id: "0", text: "Não há departamentos, clique aqui para cadastrá-los." }])
                }
            } else {
                console.error('Erro na resposta: ', response.status);
            }
        } catch (error) {
            console.error('Erro no pedido: ', error);
        }
    };

    function handleChooseDepartment(e) {
        const selectedId = e.target.value;
        console.log(departmentDataList);
        console.log(departmentDataList, departmentDataList.length === 0);
        if (departmentDataList && departmentDataList.length === 1) {
            let redirectUrl = 'http://dlist.com.br:9001/records/departments';
            router.push(redirectUrl);
        } else {
            const optionType = departmentDataList.filter(option => option.id === selectedId);
            setDepartmentWhichEmployeeReports(optionType[0].text);
            if (optionType.length === 0) {
                setDepartmentWhichEmployeeReportsState("invalid");
            } else {
                setDepartmentWhichEmployeeReportsState("valid");
            }
        }
    }

    const [roleDataList, setRoleDataList] = useState([]);

    async function getRoleDataList() {
        try {
            const response = await fetch(`http://dlist.com.br:3010/role`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                let data = await response.json();
                console.log(response.ok);
                console.log(data);
                if (data && data.length > 0) {
                    data = data.map((role, index) => ({
                        id: index.toString(),
                        text: role.name
                    }));
                    setRoleDataList([data]);
                } else {
                    setRoleDataList([{ id: "0", text: "Não há cargos, clique aqui para cadastrá-los." }])
                }
            } else {
                console.error('Erro na resposta: ', response.status);
            }
        } catch (error) {
            console.error('Erro no pedido: ', error);
        }
    };

    function handleChooseRole(e) {
        const selectedId = e.target.value;
        console.log(!roleDataList, roleDataList.length === 0);
        if (!roleDataList || roleDataList.length === 0) {
            let redirectUrl = 'http://dlist.com.br:9001/records/roles';
            router.push(redirectUrl);
        } else {
            const optionType = roleDataList.filter(option => option.id === selectedId);
            setEmployeeRole(optionType[0].text);
            if (optionType.length === 0) {
                setEmployeeRoleState("invalid");
            } else {
                setEmployeeRoleState("valid");
            }
        }
    }

    const [functionDataList, setFunctionDataList] = useState([]);

    async function getFunctionDataList() {
        try {
            const response = await fetch(`http://dlist.com.br:3010/employeeFunction`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response) {
                let data = await response.json();
                if (data && data.length > 0) {
                    data = data.map((functionUser, index) => ({
                        id: index.toString(),
                        text: functionUser.name
                    }));
                    setFunctionDataList([data]);
                } else {
                    setFunctionDataList([{ id: "0", text: "Não há funções, clique aqui para cadastrá-los." }])
                }
            } else {
                console.error('Erro na resposta: ', response.status);
            }
        } catch (error) {
            console.error('Erro no pedido: ', error);
        }
    };

    function handleChooseFunction(e) {
        const selectedId = e.target.value;
        console.log(!functionDataList, functionDataList.length === 0);
        if (!functionDataList || functionDataList.length === 0) {
            let redirectUrl = 'http://dlist.com.br:9001/records/roles';
            router.push(redirectUrl);
        } else {
            const optionType = functionDataList.filter(option => option.id === selectedId);
            setEmployeeFunction(optionType[0].text);
            if (optionType.length === 0) {
                setEmployeeFunctionState("invalid");
            } else {
                setEmployeeFunctionState("valid");
            }
        }
    }

    function handleIsEmployeeLeader() {
        setIsEmployeeLeader(!isEmployeeLeader);
        setHasEmployeeLeader(false);
    }

    function handleHasEmployeeLeader() {
        setHasEmployeeLeader(!hasEmployeeLeader);
        setIsEmployeeLeader(false);
    }

    const [employeeDataList, setEmployeeDataList] = useState([]);

    async function getEmployeeDataList() {
        try {
            const response = await fetch(`http://dlist.com.br:3010/employeee`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response) {
                let data = await response.json();
                if (data && data.length > 0) {
                    data = data.map((employee, index) => ({
                        id: index.toString(),
                        text: employee.name
                    }));
                    setEmployeeDataList([data]);
                } else {
                    setEmployeeDataList([{ id: "0", text: "Não há líderes, é necessário cadastrar colaboradores que exercem liderança." }])
                }
            } else {
                console.error('Erro na resposta: ', response.status);
            }
        } catch (error) {
            console.error('Erro no pedido: ', error);
        }
    };

    function handleChooseEmployee(e) {
        console.log("employeeDataList: ", employeeDataList)
        const selectedId = e.target.value;
        if (employeeDataList && employeeDataList.length !== 0) {
            const optionType = employeeDataList.filter(option => option.id === selectedId);
            setEmployeeLeaderName(optionType[0].text);
            if (optionType.length === 0) {
                setEmployeeLeaderNameState("invalid");
            } else {
                setEmployeeLeaderNameState("valid");
            }
        }
    }

    const [contractTypeDataList, setContractTypeDataList] = useState([]);

    async function getContractTypeDataList() {
        try {
            const response = await fetch(`http://dlist.com.br:3010/contract-details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                let data = await response.json();
                console.log(response.ok);
                console.log(data);
                if (data && data.length > 0) {
                    data = data.map((contractType, index) => ({
                        id: index.toString(),
                        text: contractType.name
                    }));
                    setContractTypeDataList([data]);
                } else {
                    setContractTypeDataList([{ id: "0", text: 'Não há tipos de contrato, use o botão "Configurações".' }])
                }
            } else {
                console.error('Erro na resposta: ', response.status);
            }
        } catch (error) {
            console.error('Erro no pedido: ', error);
        }
    };

    function handleChooseContractType(e) {
        const selectedId = e.target.value;
        console.log(!contractTypeDataList, contractTypeDataList.length === 0);
        if (!contractTypeDataList || contractTypeDataList.length === 0) {
            let redirectUrl = 'http://dlist.com.br:9001/records/contract-type';
            router.push(redirectUrl);
        } else {
            const optionType = contractTypeDataList.filter(option => option.id === selectedId);
            setEmployeeContractType(optionType[0].text);
            if (optionType.length === 0) {
                setEmployeeContractTypeState("invalid");
            } else {
                setEmployeeContractTypeState("valid");
            }
        }
    }

    const [workModelDataList, setWorkModelDataList] = useState([]);

    async function getWorkModelDataList() {
        try {
            const response = await fetch(`http://dlist.com.br:3010/work-model`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                let data = await response.json();
                if (data && data.length > 0) {
                    data = data.map((workModel, index) => ({
                        id: index.toString(),
                        text: workModel.name
                    }));
                    setWorkModelDataList([data]);
                } else {
                    setWorkModelDataList([{ id: "0", text: 'Não há colaboradores, use o botão "Configurações".' }])
                }
            } else {
                console.error('Erro na resposta: ', response.status);
            }
        } catch (error) {
            console.error('Erro no pedido: ', error);
        }
    };

    function handleChooseWorkModel(e) {
        const selectedId = e.target.value;
        if (!workModelDataList || workModelDataList.length === 0) {
            let redirectUrl = 'http://dlist.com.br:9001/records/work-model';
            router.push(redirectUrl);
        } else {
            const optionType = workModelDataList.filter(option => option.id === selectedId);
            setEmployeetWorkModel(optionType[0].text);
            if (optionType.length === 0) {
                setEmployeetWorkModelState("invalid");
            } else {
                setEmployeetWorkModelState("valid");
            }
        }
    }

    const [workplaceDataList, setWorkplaceDataList] = useState([]);

    async function getWorkplaceDataList() {
        try {
            const response = await fetch(`http://dlist.com.br:3010/work-place`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                let data = await response.json();
                if (data && data.length > 0) {
                    data = data.map((workplace, index) => ({
                        id: index.toString(),
                        text: workplace.name
                    }));
                    setWorkplaceDataList([data]);
                } else {
                    setWorkplaceDataList([{ id: "0", text: 'Não há local de trabalho, use o botão "Configurações".' }])
                }
            } else {
                console.error('Erro na resposta: ', response.status);
            }
        } catch (error) {
            console.error('Erro no pedido: ', error);
        }
    };

    function handleChooseWorkplace(e) {
        const selectedId = e.target.value;
        if (!workplaceDataList || workplaceDataList.length === 0) {
            let redirectUrl = 'http://dlist.com.br:9001/records/work-place';
            router.push(redirectUrl);
        } else {
            const optionType = workplaceDataList.filter(option => option.id === selectedId);
            setEmployeetWorkplace(optionType[0].text);
            if (optionType.length === 0) {
                setEmployeetWorkplaceState("invalid");
            } else {
                setEmployeetWorkplaceState("valid");
            }
        }
    }

    useEffect(() => {
        if (departmentDataList.length === 0 &&
            roleDataList.length === 0 &&
            functionDataList.length === 0 &&
            employeeDataList.length === 0 &&
            contractTypeDataList.length === 0 &&
            workModelDataList.length === 0 &&
            workplaceDataList.length === 0
        ) {
            getDepartmentDataList();
            getRoleDataList();
            getFunctionDataList();
            getEmployeeDataList();
            getWorkModelDataList();
            getContractTypeDataList();
            getWorkplaceDataList();
        }
    }, [
        departmentDataList,
        roleDataList,
        functionDataList,
        employeeDataList,
        contractTypeDataList,
        workModelDataList,
        workplaceDataList
    ]);

    useEffect(() => {
        if (brasilAPICEPData !== null) {
            handleCEPValidationLoading();
            handleFormFieldsAutocomplete(brasilAPICEPData);
        }
    }, [brasilAPICEPData])

    useEffect(() => {
        if (hasValuesChangedWithAPIData) {
            validateAddEmployeeAddressForm();
            handleValuesChangedWithAPIData();
            //validateAddEmployeeForm();
        }
    }, [hasValuesChangedWithAPIData, validateAddEmployeeAddressForm, validateAddEmployeeForm]);


    const handleInputChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:4008/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    lastName: '',
                    birthdate: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
                console.log('Data sent successfully!');
            } else {
                console.error('Error in response:', response.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    return (
        <Form>
            <Card className="mb-4">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Colaborador</h3>
                </CardHeader>
                <CardBody>
                    <Form className="needs-validation" noValidate>
                        <div className="form-row">
                            <Col className="mb-3" md="4">
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

                            </Col>
                            <Col className="mb-3" md="4">
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
                            <Col className="mb-3" md="4">
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
                                    // valid={companyAddressComplementState === "valid"}
                                    // invalid={companyAddressComplementState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeAddressComplement(e.target.value);
                                        // if (e.target.value === "") {
                                        //     setCompanyAddressComplementState("invalid");
                                        // } else {
                                        //     setCompanyAddressComplementState("valid");
                                        // }
                                    }}
                                />
                                {/* <div className="invalid-feedback">
                                                                        É necessário preencher este campo.
                                                                    </div> */}
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
                                    data={departmentDataList}
                                    onSelect={handleChooseDepartment}
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
                                    data={roleDataList}
                                    onSelect={handleChooseRole}
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
                                    data={functionDataList}
                                    onSelect={handleChooseFunction}
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
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                id="validationEmployeeIsLeader"
                                                className="custom-control-input"
                                                type="radio"
                                                name="custom-radio-1"
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
                                        <div className="custom-control custom-radio mb-3">
                                            <input
                                                className="custom-control-input"
                                                id="validationEmployeeNoLeader"
                                                type="radio"
                                                name="custom-radio-2"
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
                            </Col>
                            <Col className="mb-3" md="6">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationSelectLeader"
                                >
                                    Liderado por
                                </label>
                                <Select2
                                    id="validationSelectLeader"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{
                                        placeholder: "Selecione o líder",
                                    }}
                                    data={employeeDataList}
                                    onSelect={handleChooseEmployee}
                                />
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
                                    data={contractTypeDataList}
                                    onSelect={handleChooseContractType}
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
                                    data={workModelDataList}
                                    onSelect={handleChooseWorkModel}
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
                                    data={workplaceDataList}
                                    onSelect={handleChooseWorkplace}
                                />
                            </Col>
                            <Col className="mb-3" md="2">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEntryTime"
                                >
                                    Hora de Entrada
                                </label>
                                <Input
                                    defaultValue="08:00:00"
                                    id="validationEntryTime"
                                    type="time"
                                    valid={employeeEntryTimeState === "valid"}
                                    invalid={employeeEntryTimeState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeEntryTime(e.target.value === "");
                                        if (e.target.value === "") {
                                            setEmployeeEntryTimeState("valid");
                                        } else {
                                            setEmployeeEntryTimeState("invalid");
                                        }
                                    }}
                                />
                            </Col>
                            <Col className="mb-3" md="2">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationBreakTime"
                                >
                                    Intervalo
                                </label>
                                <Input
                                    defaultValue="12:00:00"
                                    id="validationBreakTime"
                                    type="time"
                                    valid={employeeBreakTimeState === "valid"}
                                    invalid={employeeBreakTimeState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeBreakTime(e.target.value === "");
                                        if (e.target.value === "") {
                                            setEmployeeBreakTimeState("valid");
                                        } else {
                                            setEmployeeBreakTimeState("invalid");
                                        }
                                    }}
                                />
                            </Col>
                            <Col className="mb-3" md="2">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationDepartureTime"
                                >
                                    Horário de Saída
                                </label>
                                <Input
                                    defaultValue="18:00:00"
                                    id="validationDepartureTime"
                                    type="time"
                                    valid={employeeDepartureTimeState === "valid"}
                                    invalid={employeeDepartureTimeState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeDepartureTime(e.target.value === "");
                                        if (e.target.value === "") {
                                            setEmployeeDepartureTimeState("valid");
                                        } else {
                                            setEmployeeDepartureTimeState("invalid");
                                        }
                                    }}
                                />
                            </Col>
                        </div>
                        <Row>
                            <Col md="8" />
                            <Col className="d-flex justify-content-end align-items-center" md="4" >
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
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
