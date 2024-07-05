import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table } from "reactstrap";

function EvidencesRegister() {

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
                Cadastrar Evidência
            </h6>
            <Row>
                <Col className="mb-3" md="12">
                    <label
                        className="form-control-label"
                        htmlFor="validationDescriptionSkillClassification"
                    >
                        Texto
                    </label>
                    <Input
                        id="validationDescriptionSkillClassification"
                        rows="4"
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
                        Adicionar Evidência
                    </Button>
                </Col>
            </Row>
        </CardBody>
    );
}

export default EvidencesRegister;
