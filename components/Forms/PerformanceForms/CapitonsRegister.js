import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table } from "reactstrap";

function CapitonsRegister() {

    const [isClassificationWithOccupationalGroup, setIsClassificationWithOccupationalGroup] = useState(true);

    // const {
    //     departmentName,
    //     setDepartmentName,
    //     departmentNameState,
    //     setDepartmentNameState,
    //     departmentDataList,
    //     setDepartmentDataList,
    //     departmentReportsToDepartment,
    //     setDepartmentReportsToDepartment,
    //     departmentReportsToDepartmentState,
    //     setDepartmentReportsToDepartmentState,
    //     departmentDescription,
    //     setDepartmentDescription,
    //     departmentDescriptionState,
    //     setDepartmentDescriptionState,
    //     handleValidateAddDepartmentForm,
    //     handleDepartmentDataList
    // } = useCreateDepartment(handleShowDepartmentsUserRegister);

    // const [selectedDepartment, setSelectedDepartment] = useState('');

    // useEffect(() => {
    //     if (departmentDataList.length === 0) {
    //         employmentContractDataSearchAndProcess(useFindAllDepartments, handleDepartmentDataList, 'department', 'EmployeeUserRegister');
    //     }
    // }, []);

    return (
        <CardBody>
            <h6 className="heading-small text-muted mb-4">
                Cadastrar Tipos de Legenda de Envidências
            </h6>
            <Row>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="validationSkillType"
                    >
                        Nome da Legenda
                    </label>
                    <Input
                        id="validationSkillType"
                        placeholder="Nome"
                        type="text"
                    // valid={departmentNameState === "valid"}
                    // invalid={departmentNameState === "invalid"}
                    // onChange={(e) => {
                    //     setDepartmentName(e.target.value);
                    //     if (e.target.value === "") {
                    //         setDepartmentNameState("invalid");
                    //     } else {
                    //         setDepartmentNameState("valid");
                    //     }
                    // }}
                    />
                    {/* <div className="invalid-feedback">
                                                    É necessário preencher este campo.
                                                </div> */}
                </Col>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="listTypesSkillsRecorded"
                    >
                        Tipos Cadastrados
                    </label>
                    <Select2
                        id="listTypesSkillsRecorded"
                        className="form-control"
                        data-minimum-results-for-search="Infinity"
                        options={{ placeholder: "Clique para visualizar", }}
                    // value={selectedDepartment}
                    // onChange={(e) => setSelectedDepartment(e.target.value)}
                    // data={departmentDataList}
                    // onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, departmentDataList, setSelectedDepartment, setDepartmentReportsToDepartment, setDepartmentReportsToDepartmentState)}
                    />
                </Col>
                <Col className="mb-3" md="12">
                    <label
                        className="form-control-label"
                        htmlFor="validationSkillTypeDescription"
                    >
                        Descrição
                    </label>
                    <Input
                        id="validationSkillTypeDescription"
                        rows="3"
                        type="textarea"
                    // valid={departmentDescriptionState === "valid"}
                    // invalid={departmentDescriptionState === "invalid"}
                    // onChange={(e) => {
                    //     setDepartmentDescription(e.target.value);
                    //     if (e.target.value === "") {
                    //         setDepartmentDescriptionState("");
                    //     } else {
                    //         setDepartmentDescriptionState("valid");
                    //     }
                    // }}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="8" />
                <Col className="d-flex justify-content-end align-items-center" md="4" >
                    <Button className="px-5" color="primary" size="lg" type="button" >
                        Adicionar Tipo
                    </Button>
                </Col>
            </Row>
            <hr />
            <h6 className="heading-small text-muted mb-4">
                Cadastrar Legenda de Envidências
            </h6>
            <Row>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="listSkillClassificationRecorded"
                    >
                        Classificações Cadastradas
                    </label>
                    <Select2
                        id="listSkillClassificationRecorded"
                        className="form-control"
                        data-minimum-results-for-search="Infinity"
                        options={{ placeholder: "Clique para visualizar", }}
                    // value={selectedDepartment}
                    // onChange={(e) => setSelectedDepartment(e.target.value)}
                    // data={departmentDataList}
                    // onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, departmentDataList, setSelectedDepartment, setDepartmentReportsToDepartment, setDepartmentReportsToDepartmentState)}
                    />
                </Col>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="validationSkillClassification"
                    >
                        Conteúdo da Legenda
                    </label>
                    <Input
                        id="validationSkillClassification"
                        placeholder="Nome"
                        type="text"
                    // valid={departmentNameState === "valid"}
                    // invalid={departmentNameState === "invalid"}
                    // onChange={(e) => {
                    //     setDepartmentName(e.target.value);
                    //     if (e.target.value === "") {
                    //         setDepartmentNameState("invalid");
                    //     } else {
                    //         setDepartmentNameState("valid");
                    //     }
                    // }}
                    />
                    {/* <div className="invalid-feedback">
                                                    É necessário preencher este campo.
                                                </div> */}
                </Col>
                <Col className="mb-3" md="12">
                    <label
                        className="form-control-label"
                        htmlFor="validationDescriptionSkillClassification"
                    >
                        Descrição
                    </label>
                    <Input
                        id="validationDescriptionSkillClassification"
                        rows="3"
                        type="textarea"
                    // valid={departmentDescriptionState === "valid"}
                    // invalid={departmentDescriptionState === "invalid"}
                    // onChange={(e) => {
                    //     setDepartmentDescription(e.target.value);
                    //     if (e.target.value === "") {
                    //         setDepartmentDescriptionState("");
                    //     } else {
                    //         setDepartmentDescriptionState("valid");
                    //     }
                    // }}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="8" />
                <Col className="d-flex justify-content-end align-items-center" md="4" >
                    <Button className="px-5" color="primary" size="lg" type="button" >
                        Adicionar Legenda
                    </Button>
                </Col>
            </Row>

        </CardBody>
    );
}

export default CapitonsRegister;
