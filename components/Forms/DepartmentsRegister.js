import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table } from "reactstrap";
import useCreateDepartment from "../../hooks/RecordsHooks/department/useCreateDepartment";
import { useFindAllDepartments } from '../../hooks/RecordsHooks/department/useFindAllDepartments';
import { employmentContractDataSearchAndProcess } from '../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../util/handleSelectionEmploymentContractData';

function DepartmentsRegister({ handleShowDepartmentsUserRegister }) {

    const {
        departmentName,
        setDepartmentName,
        departmentNameState,
        setDepartmentNameState,
        departmentDataList,
        setDepartmentDataList,
        departmentReportsToDepartment,
        setDepartmentReportsToDepartment,
        departmentReportsToDepartmentState,
        setDepartmentReportsToDepartmentState,
        departmentDescription,
        setDepartmentDescription,
        departmentDescriptionState,
        setDepartmentDescriptionState,
        handleValidateAddDepartmentForm,
        handleDepartmentDataList
    } = useCreateDepartment(handleShowDepartmentsUserRegister);

    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        if (departmentDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllDepartments, handleDepartmentDataList, 'department', 'EmployeeUserRegister');
        }
    }, []);

    return (
        <Form>
            <Card className="mb-4">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Departamentos</h3>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationDepartmentName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationDepartmentName"
                                placeholder="Nome"
                                type="text"
                                valid={departmentNameState === "valid"}
                                invalid={departmentNameState === "invalid"}
                                onChange={(e) => {
                                    setDepartmentName(e.target.value);
                                    if (e.target.value === "") {
                                        setDepartmentNameState("invalid");
                                    } else {
                                        setDepartmentNameState("valid");
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
                                htmlFor="validationReportToDepartment"
                            >
                                Reporta ao Departamento
                            </label>
                            <Select2
                                id="validationReportToDepartment"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{ placeholder: "Selecione um departamento:" }}
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                data={departmentDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, departmentDataList, setSelectedDepartment, setDepartmentReportsToDepartment, setDepartmentReportsToDepartmentState)}
                            />
                        </Col>
                        <Col className="mb-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="validationDepartmentDescription"
                            >
                                Descrição
                            </label>
                            <Input
                                id="validationDepartmentDescription"
                                rows="3"
                                type="textarea"
                                valid={departmentDescriptionState === "valid"}
                                invalid={departmentDescriptionState === "invalid"}
                                onChange={(e) => {
                                    setDepartmentDescription(e.target.value);
                                    if (e.target.value === "") {
                                        setDepartmentDescriptionState("");
                                    } else {
                                        setDepartmentDescriptionState("valid");
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleValidateAddDepartmentForm}>
                                Adicionar Departamento
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Form>
    );
}

export default DepartmentsRegister;
