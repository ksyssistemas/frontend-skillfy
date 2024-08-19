import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { Button, CardBody, Input, Row, Col } from "reactstrap";
import useCreateSkillClassificaiton from '../../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useCreateSkillClassificaiton';
import { useFindAllSkillClassifications } from '../../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useFindAllSkillClassifications';
import { employmentContractDataSearchAndProcess } from '../../../../util/employmentContractDataSearchAndProcess';
import useCreateOccupationalGroup from '../../../../hooks/PerformanceAppraisalRecordsHooks/OccupationalGroups/useCreateOccupationalGroup';
import { useFindAllOccupationalGroups } from '../../../../hooks/PerformanceAppraisalRecordsHooks/OccupationalGroups/useFindAllSkillClassifications';
import useCreateSkillType from '../../../../hooks/PerformanceAppraisalRecordsHooks/SkillsTypes/useCreateSkillType';
import { useFindAllSkillTypes } from '../../../../hooks/PerformanceAppraisalRecordsHooks/SkillsTypes/useFindAllSkillTypes';
import { handleSelectionEmploymentContractData } from '../../../../util/handleSelectionEmploymentContractData';

function SkillsRegister() {

    const {
        skilClassificationName,
        setSkilClassificationName,
        skilClassificationNameState,
        setSkilClassificationNameState,
        skillClassificationDescription,
        setSkillClassificationDescription,
        skillClassificationDescriptionState,
        setSkillClassificationDescriptionState,
        skilClassificationDataList,
        setSkilClassificationDataList,
        handleSkilClassificationDataList,
        handleValidateAddSkillClassificationForm,
    } = useCreateSkillClassificaiton();

    const {
        occupationalGroupName,
        setOccupationalGroupName,
        occupationalGroupNameState,
        setOccupationalGroupNameState,
        occupationalGroupDescription,
        setOccupationalGroupDescription,
        occupationalGroupDescriptionState,
        setOccupationalGroupDescriptionState,
        occupationalGroupDataList,
        setOccupationalGroupDataList,
        handleOccupationalGroupDataList,
        handleValidateAddOccupationalGroupForm,
    } = useCreateOccupationalGroup();

    const {
        skillTypeName,
        setSkillTypeName,
        skillTypeNameState,
        setSkillTypeNameState,
        skillTypeDescription,
        setSkillTypeDescription,
        skillTypeDescriptionState,
        setSkillTypeDescriptionState,
        classificationOfSkillType,
        setClassificationOfSkillType,
        classificationOfSkillTypeState,
        setClassificationOfSkillTypeState,
        skillTypeOccupationalGroup,
        setskillTypeOccupationalGroup,
        skillTypeOccupationalGroupState,
        setskillTypeOccupationalGroupState,
        skillTypeDataList,
        setSkillTypeDataList,
        handleSkillTypeDataList,
        classificationOfSkillTypeDataList,
        setClassificationOfSkillTypeDataList,
        handleClassificationOfSkillTypeDataList,
        skillTypeOccupationalGroupDataList,
        setSkillTypeOccupationalGroupDataList,
        handleSkillTypeOccupationalGroupDataList,
        handleValidateAddSkillTypeForm,
    } = useCreateSkillType();

    const [selectedClassificationOfSkillType, setSelectedClassificationOfSkillType] = useState('');
    const handleSelectedClassificationOfSkillType = () => {
        setSelectedClassificationOfSkillType('');
    }
    const [selectedSkillTypeOccupationalGroup, setSelectedSkillTypeOccupationalGroup] = useState('');
    const handleSelectedSkillTypeOccupationalGroup = () => {
        setSelectedSkillTypeOccupationalGroup('');
    }

    const [hasSkillRegisterRecorded, setHasSkillRegisterRecorded] = useState(false);
    const handleHasSkillRegisterRecorded = () => {
        setHasSkillRegisterRecorded(!hasSkillRegisterRecorded);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (skilClassificationDataList.length === 0 || hasSkillRegisterRecorded) {
                await employmentContractDataSearchAndProcess(useFindAllSkillClassifications, handleSkilClassificationDataList, 'skillClassification', 'EmployeeUserRegister');
            }
            if (occupationalGroupDataList.length === 0 || hasSkillRegisterRecorded) {
                await employmentContractDataSearchAndProcess(useFindAllOccupationalGroups, handleOccupationalGroupDataList, 'occupationalGroup', 'EmployeeUserRegister');
            }
            if (skillTypeDataList.length === 0 || hasSkillRegisterRecorded) {
                await employmentContractDataSearchAndProcess(useFindAllSkillTypes, handleSkillTypeDataList, 'skillTypes', 'EmployeeUserRegister');
            }
            if (classificationOfSkillTypeDataList.length === 0 || hasSkillRegisterRecorded) {
                await employmentContractDataSearchAndProcess(useFindAllSkillClassifications, handleClassificationOfSkillTypeDataList, 'skillClassification', 'EmployeeUserRegister');
            }
            if (skillTypeOccupationalGroupDataList.length === 0 || hasSkillRegisterRecorded) {
                await employmentContractDataSearchAndProcess(useFindAllOccupationalGroups, handleSkillTypeOccupationalGroupDataList, 'occupationalGroup', 'EmployeeUserRegister');
            }
            if (hasSkillRegisterRecorded) {
                handleHasSkillRegisterRecorded();
            }
        }

        fetchData();
    }, [hasSkillRegisterRecorded]);

    return (
        <CardBody>
            <h6 className="heading-small text-muted mb-4">
                Cadastrar Classificação de Competência
            </h6>
            <Row>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="validationSkillClassification"
                    >
                        Nome da Classificação
                    </label>
                    <Input
                        id="validationSkillClassification"
                        placeholder="Nome"
                        type="text"
                        // valid={departmentNameState === "valid"}
                        // invalid={departmentNameState === "invalid"}
                        value={skilClassificationName}
                        onChange={(e) => {
                            setSkilClassificationName(e.target.value);
                            //     if (e.target.value === "") {
                            //         setDepartmentNameState("invalid");
                            //     } else {
                            //         setDepartmentNameState("valid");
                            //     }
                        }}
                    />
                    {/* <div className="invalid-feedback">
                                                    É necessário preencher este campo.
                                                </div> */}
                </Col>
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
                        data={skilClassificationDataList}
                    />
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
                        value={skillClassificationDescription}
                        onChange={(e) => {
                            setSkillClassificationDescription(e.target.value);
                            //     if (e.target.value === "") {
                            //         setDepartmentDescriptionState("");
                            //     } else {
                            //         setDepartmentDescriptionState("valid");
                            //     }
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="8" />
                <Col className="d-flex justify-content-end align-items-center" md="4" >
                    <Button className="px-5" color="primary" size="lg" type="button" onClick={() => handleValidateAddSkillClassificationForm(handleHasSkillRegisterRecorded)}>
                        Adicionar Classificação
                    </Button>
                </Col>
            </Row>

            <hr />
            <h6 className="heading-small text-muted mb-4">
                Cadastrar Grupos Ocupacionais
            </h6>
            <Row>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="validationOccupationalGroup"
                    >
                        Nome do Grupo Ocupacional
                    </label>
                    <Input
                        id="validationOccupationalGroup"
                        placeholder="Nome"
                        type="text"
                        // valid={departmentNameState === "valid"}
                        // invalid={departmentNameState === "invalid"}
                        value={occupationalGroupName}
                        onChange={(e) => {
                            setOccupationalGroupName(e.target.value);
                            //     if (e.target.value === "") {
                            //         setDepartmentNameState("invalid");
                            //     } else {
                            //         setDepartmentNameState("valid");
                            //     }
                        }}
                    />
                    {/* <div className="invalid-feedback">
                                                    É necessário preencher este campo.
                                                </div> */}
                </Col>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="listOccupationalGroupsRecorded"
                    >
                        Grupos Cadastrados
                    </label>
                    <Select2
                        id="listOccupationalGroupsRecorded"
                        className="form-control"
                        data-minimum-results-for-search="Infinity"
                        options={{ placeholder: "Clique para visualizar", }}
                        data={occupationalGroupDataList}
                    />
                </Col>
                <Col className="mb-3" md="12">
                    <label
                        className="form-control-label"
                        htmlFor="validationOccupationalGroupDescription"
                    >
                        Descrição
                    </label>
                    <Input
                        id="validationOccupationalGroupDescription"
                        rows="3"
                        type="textarea"
                        // valid={departmentDescriptionState === "valid"}
                        // invalid={departmentDescriptionState === "invalid"}
                        value={occupationalGroupDescription}
                        onChange={(e) => {
                            setOccupationalGroupDescription(e.target.value);
                            //     if (e.target.value === "") {
                            //         setDepartmentDescriptionState("");
                            //     } else {
                            //         setDepartmentDescriptionState("valid");
                            //     }
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="8" />
                <Col className="d-flex justify-content-end align-items-center" md="4" >
                    <Button className="px-5" color="primary" size="lg" type="button" onClick={() => handleValidateAddOccupationalGroupForm(handleHasSkillRegisterRecorded)}>
                        Adicionar Grupo
                    </Button>
                </Col>
            </Row>

            <hr />
            <h6 className="heading-small text-muted mb-4">
                Cadastrar Tipos de Competências
            </h6>
            <Row>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="validationSkillType"
                    >
                        Nome da Competência
                    </label>
                    <Input
                        id="validationSkillType"
                        placeholder="Nome"
                        type="text"
                        // valid={departmentNameState === "valid"}
                        // invalid={departmentNameState === "invalid"}
                        value={skillTypeName}
                        onChange={(e) => {
                            setSkillTypeName(e.target.value);
                            //     if (e.target.value === "") {
                            //         setDepartmentNameState("invalid");
                            //     } else {
                            //         setDepartmentNameState("valid");
                            //     }
                        }}
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
                        data={skillTypeDataList}
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
                        value={skillTypeDescription}
                        onChange={(e) => {
                            setSkillTypeDescription(e.target.value);
                            //     if (e.target.value === "") {
                            //         setDepartmentDescriptionState("");
                            //     } else {
                            //         setDepartmentDescriptionState("valid");
                            //     }
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="validationSelectSkillClassification"
                    >
                        Classificação da Competência
                    </label>
                    <Select2
                        id="validationSelectSkillClassification"
                        className="form-control"
                        data-minimum-results-for-search="Infinity"
                        options={{ placeholder: "Selecione uma classsificação" }}
                        value={selectedClassificationOfSkillType}
                        onChange={(e) => setSelectedClassificationOfSkillType(e.target.value)}
                        data={classificationOfSkillTypeDataList}
                        onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, classificationOfSkillTypeDataList, setSelectedClassificationOfSkillType, setClassificationOfSkillType, setClassificationOfSkillTypeState)}
                    />
                </Col>
                <Col className="mb-3" md="6">
                    <label
                        className="form-control-label"
                        htmlFor="validationSelectOccupationalGroup"
                    >
                        Grupo Ocupacional
                    </label>
                    <Select2
                        id="validationSelectOccupationalGroup"
                        className="form-control"
                        data-minimum-results-for-search="Infinity"
                        options={{ placeholder: "Selecione um grupo ocupacional" }}
                        value={selectedSkillTypeOccupationalGroup}
                        onChange={(e) => setSelectedSkillTypeOccupationalGroup(e.target.value)}
                        data={skillTypeOccupationalGroupDataList}
                        onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, skillTypeOccupationalGroupDataList, setSelectedSkillTypeOccupationalGroup, setskillTypeOccupationalGroup, setskillTypeOccupationalGroupState)}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="8" />
                <Col className="d-flex justify-content-end align-items-center" md="4" >
                    <Button className="px-5" color="primary" size="lg" type="button" onClick={() => handleValidateAddSkillTypeForm(handleHasSkillRegisterRecorded, handleSelectedClassificationOfSkillType, handleSelectedSkillTypeOccupationalGroup)}>
                        Adicionar Competência
                    </Button>
                </Col>
            </Row>
        </CardBody>
    );
}

export default SkillsRegister;
