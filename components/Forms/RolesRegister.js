import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    FormGroup,
    Form,
    Input,
    Row
} from "reactstrap";
import useCreateRole from "../../hooks/RecordsHooks/role/useCreateRole";
import useCreateEmployeeFunction from "../../hooks/RecordsHooks/employeeFunction/useCreateEmployeeFunction";
import { useFindAllRoles } from '../../hooks/RecordsHooks/role/useFindAllRoles';
import { useFindAllFunctions } from '../../hooks/RecordsHooks/employeeFunction/useFindAllFunctions';
import { employmentContractDataSearchAndProcess } from '../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../util/handleSelectionEmploymentContractData';

function RolesRegister({ handleShowRolesUserRegister }) {

    const {
        employeeRoleName,
        setEmployeeRoleName,
        employeeRoleNameState,
        setEmployeeRoleNameState,
        employeeRoleDataList,
        setEmployeeRoleDataList,
        roleReportsToRole,
        setRoleReportsToRole,
        roleReportsToRoleState,
        setRoleReportsToRoleState,
        employeeRoleDescription,
        setEmployeeRoleDescription,
        employeeRoleDescriptionState,
        setEmployeeRoleDescriptionState,
        handleValidateAddEmployeeRoleForm,
        handleEmployeeRoleDataList
    } = useCreateRole(handleShowRolesUserRegister);

    const {
        employeeFunctionName,
        setEmployeeFunctionName,
        employeeFunctionNameState,
        setEmployeeFunctionNameState,
        employeeFunctionDataList,
        setEmployeeFunctionDataList,
        funtionReportsToFuntion,
        setFuntionReportsToFuntion,
        funtionReportsToFuntionState,
        setFuntionReportsToFuntionState,
        employeeFunctiontDescription,
        setEmployeeFunctiontDescription,
        employeeFunctiontDescriptionState,
        setEmployeeFunctiontDescriptionState,
        handleValidateAddEmployeeFunctionForm,
        handleEmployeeFunctionDataList
    } = useCreateEmployeeFunction(handleShowRolesUserRegister);

    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFunction, setSelectedFunction] = useState('');

    useEffect(() => {
        if (employeeRoleDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllRoles, handleEmployeeRoleDataList, 'role', 'EmployeeUserRegister');
        }
        if (employeeFunctionDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllRoles, handleEmployeeFunctionDataList, 'role', 'EmployeeUserRegister');
        }
    }, []);

    return (
        <Form>
            <Card className="mb-4 bg-white">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Cargo</h3>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeRoleName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationEmployeeRoleName"
                                placeholder="Nome"
                                type="text"
                                valid={employeeRoleNameState === "valid"}
                                invalid={employeeRoleNameState === "invalid"}
                                onChange={(e) => {
                                    setEmployeeRoleName(e.target.value);
                                    if (e.target.value === "") {
                                        setEmployeeRoleNameState("invalid");
                                    } else {
                                        setEmployeeRoleNameState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationReportToRole"
                                >
                                    Reporta ao Cargo
                                </label>
                                <Select2
                                    id="validationReportToRole"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione um cargo:" }}
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    data={employeeRoleDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(
                                        e.target.value,
                                        employeeRoleDataList,
                                        setSelectedRole,
                                        setRoleReportsToRole,
                                        setRoleReportsToRoleState,
                                        null,
                                        null,
                                        'id'
                                    )}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeRoleDescription"
                                >
                                    Descrição
                                </label>
                                <Input
                                    id="validationEmployeeRoleDescription"
                                    rows="3"
                                    type="textarea"
                                    valid={employeeRoleDescriptionState === "valid"}
                                    invalid={employeeRoleDescriptionState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeRoleDescription(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeRoleDescriptionState("");
                                        } else {
                                            setEmployeeRoleDescriptionState("valid");
                                        }
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleValidateAddEmployeeRoleForm}>
                                <span className="btn-inner--text">Adicionar Cargo</span>
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className="mb-4 bg-lighter">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Função</h3>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeFunctionName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationEmployeeFunctionName"
                                placeholder="Nome"
                                type="text"
                                valid={employeeFunctionNameState === "valid"}
                                invalid={employeeFunctionNameState === "invalid"}
                                onChange={(e) => {
                                    setEmployeeFunctionName(e.target.value);
                                    if (e.target.value === "") {
                                        setEmployeeFunctionNameState("invalid");
                                    } else {
                                        setEmployeeFunctionNameState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationReportToFunction"
                            >
                                Reporta ao Cargo
                            </label>
                            <Select2
                                id="validationReportToFunction"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{ placeholder: "Selecione uma função:" }}
                                value={selectedFunction}
                                onChange={(e) => setSelectedFunction(e.target.value)}
                                data={employeeFunctionDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(
                                    e.target.value,
                                    employeeFunctionDataList,
                                    setSelectedFunction,
                                    setFuntionReportsToFuntion,
                                    setFuntionReportsToFuntionState,
                                    null,
                                    null,
                                    'id'
                                )}
                            />
                        </Col>
                        <Col className="mb-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeFunctionDescription"
                            >
                                Descrição
                            </label>
                            <Input
                                id="validationEmployeeFunctionDescription"
                                rows="3"
                                type="textarea"
                                valid={employeeFunctiontDescriptionState === "valid"}
                                invalid={employeeFunctiontDescriptionState === "invalid"}
                                onChange={(e) => {
                                    setEmployeeFunctiontDescription(e.target.value);
                                    if (e.target.value === "") {
                                        setEmployeeFunctiontDescriptionState("invalid");
                                    } else {
                                        setEmployeeFunctiontDescriptionState("valid");
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleValidateAddEmployeeFunctionForm}>
                                <span className="btn-inner--text">Adicionar Função</span>
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Form>
    );
}

export default RolesRegister;
