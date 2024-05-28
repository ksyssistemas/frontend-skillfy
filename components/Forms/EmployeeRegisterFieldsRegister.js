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

function EmployeeRegisterFieldsRegister() {

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
                    setContractTypeDataList([{ id: "0", text: "Não há tipos de contrato, clique aqui para cadastrá-los." }])
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
                    setWorkModelDataList([{ id: "0", text: "Não há colaboradores, clique aqui para cadastrá-los." }])
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
                    setWorkplaceDataList([{ id: "0", text: "Não há local de trabalho, clique aqui para cadastrá-los." }])
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
                    <h3 className="mb-0">Cadastrar Tipo de Contrato</h3>
                </CardHeader>
                <CardBody>
                    <Form className="needs-validation" noValidate>
                        <div className="form-row">
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeIdNumber"
                                >
                                    Confira os tipos cadastrados
                                </label>
                                <Form>
                                    <Select2
                                        className="form-control"
                                        defaultValue="1"
                                        options={{
                                            placeholder: "Select",
                                        }}
                                        data={[
                                            { id: "1", text: "CLT" },
                                            { id: "2", text: "CTT" },
                                            { id: "3", text: "CTI" },
                                            { id: "4", text: "PJ" },
                                            { id: "5", text: "ESTÁGIO" },
                                            { id: "6", text: "TELETRABALHO" },
                                        ]}
                                    />
                                </Form>
                            </Col>
                            <Col className="mb-3" md="2" />
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeLastName"
                                >
                                    Título do contrato
                                </label>
                                <Input
                                    id="validationEmployeeLastName"
                                    placeholder="Título do tipo de contrato"
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
                        <Row>
                            <Col md="8" />
                            <Col className="d-flex justify-content-end align-items-center" md="4" >
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

            <Card className="mb-4">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Modelo de Trabalho</h3>
                </CardHeader>
                <CardBody>
                    <Form className="needs-validation" noValidate>
                        <div className="form-row">
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeIdNumber"
                                >
                                    Confira os modelos cadastrados
                                </label>
                                <Form>
                                    <Select2
                                        className="form-control"
                                        defaultValue="1"
                                        options={{
                                            placeholder: "Select",
                                        }}
                                        data={[
                                            { id: "1", text: "Teletrabalho" },
                                            { id: "2", text: "Home Office" },
                                            { id: "3", text: "Buttons" },
                                            { id: "4", text: "Trabalho Híbrido" },
                                            { id: "5", text: "Presencial" },
                                        ]}
                                    />
                                </Form>
                            </Col>
                            <Col className="mb-3" md="2" />
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeLastName"
                                >
                                    Título do Modelo
                                </label>
                                <Input
                                    id="validationEmployeeLastName"
                                    placeholder="Título do modelo de trabalho"
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
                        <Row>
                            <Col md="8" />
                            <Col className="d-flex justify-content-end align-items-center" md="4" >
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

            <Card className="mb-4">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Local de Trabalho</h3>
                </CardHeader>
                <CardBody>
                    <Form className="needs-validation" noValidate>
                        <div className="form-row">
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeIdNumber"
                                >
                                    Confira os locais cadastrados
                                </label>
                                <Form>
                                    <Select2
                                        className="form-control"
                                        defaultValue="1"
                                        options={{
                                            placeholder: "Select",
                                        }}
                                        data={[
                                            { id: "1", text: "Sede" },
                                            { id: "2", text: "Filial Pomerode" },
                                            { id: "3", text: "Filial Gaspar" },
                                            { id: "4", text: "Filial Indaial" },
                                            { id: "5", text: "Filial Timbó" },
                                            { id: "6", text: "Filial Benedito Novo" },
                                        ]}
                                    />
                                </Form>
                            </Col>
                            <Col className="mb-3" md="2" />
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeLastName"
                                >
                                    Nome
                                </label>
                                <Input
                                    id="validationEmployeeLastName"
                                    placeholder="Nome do local de trabalho"
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
                        <Row>
                            <Col md="8" />
                            <Col className="d-flex justify-content-end align-items-center" md="4" >
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Form>
    );
}

export default EmployeeRegisterFieldsRegister;
