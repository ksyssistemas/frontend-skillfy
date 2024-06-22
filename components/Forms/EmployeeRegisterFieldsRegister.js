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
import { useRouter } from 'next/router';
import useCreateTypeContract from '../../hooks/featuresEmploymentContract/useCreateTypeContract';
import useCreateWorkModel from '../../hooks/featuresEmploymentContract/useCreateWorkModel';
import useCreateWorkplace from '../../hooks/featuresEmploymentContract/useCreateWorkplace';
import { useFindAllTypeContract } from '../../hooks/featuresEmploymentContract/useFindAllTypeContract';
import { useFindAllWorkModels } from '../../hooks/featuresEmploymentContract/useFindAllWorkModels';
import { useFindAllWorkplaces } from '../../hooks/featuresEmploymentContract/useFindAllWorkplaces';
import { employmentContractDataSearchAndProcess } from '../../util/employmentContractDataSearchAndProcess';


function EmployeeRegisterFieldsRegister() {

    const router = useRouter();

    const {
        employeeContractType,
        setEmployeeContractType,
        employeeContractTypeState,
        setEmployeeContractTypeState,
        handleContractTypeValidation,
        contractTypeDataList,
        handleContractTypeDataList
    } = useCreateTypeContract();

    const {
        employeetWorkModel,
        setEmployeetWorkModel,
        employeetWorkModelState,
        setEmployeetWorkModelState,
        handleWorkModelValidation,
        workModelDataList,
        handleWorkModelDataList
    } = useCreateWorkModel();

    const {
        employeetWorkplace,
        setEmployeeWorkplace,
        employeetWorkplaceState,
        setEmployeeWorkplaceState,
        handleWorkplaceValidation,
        workplaceDataList,
        handleWorkplaceDataList
    } = useCreateWorkplace();

    useEffect(() => {
        if (contractTypeDataList.length === 0 &&
            workModelDataList.length === 0 &&
            workplaceDataList.length === 0
        ) {
            employmentContractDataSearchAndProcess(useFindAllTypeContract, handleContractTypeDataList, 'contractType', 'EmployeeRegisterFieldsRegister');
            employmentContractDataSearchAndProcess(useFindAllWorkModels, handleWorkModelDataList, 'workModel', 'EmployeeRegisterFieldsRegister');
            employmentContractDataSearchAndProcess(useFindAllWorkplaces, handleWorkplaceDataList, 'workplace', 'EmployeeRegisterFieldsRegister');
        }
    }, [
        contractTypeDataList,
        workModelDataList,
        workplaceDataList
    ]);

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
                                        data-minimum-results-for-search="Infinity"
                                        options={{
                                            placeholder: "Clique para visualizar",
                                        }}
                                        data={contractTypeDataList}
                                    />
                                </Form>
                            </Col>
                            <Col className="mb-3" md="2" />
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationContractType"
                                >
                                    Título do contrato
                                </label>
                                <Input
                                    id="validationContractType"
                                    placeholder="Título do tipo de contrato"
                                    type="text"
                                    valid={employeeContractTypeState === "valid"}
                                    invalid={employeeContractTypeState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeContractType(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeContractTypeState("invalid");
                                        } else {
                                            setEmployeeContractTypeState("valid");
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
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleContractTypeValidation}>
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
                                        data-minimum-results-for-search="Infinity"
                                        options={{
                                            placeholder: "Clique para visualizar",
                                        }}
                                        data={workModelDataList}
                                    />
                                </Form>
                            </Col>
                            <Col className="mb-3" md="2" />
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationWorkModel"
                                >
                                    Título do Modelo
                                </label>
                                <Input
                                    id="validationWorkModel"
                                    placeholder="Título do modelo de trabalho"
                                    type="text"
                                    valid={employeetWorkModelState === "valid"}
                                    invalid={employeetWorkModelState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeetWorkModel(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeetWorkModelState("invalid");
                                        } else {
                                            setEmployeetWorkModelState("valid");
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
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleWorkModelValidation}>
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
                                        data-minimum-results-for-search="Infinity"
                                        options={{
                                            placeholder: "Clique para visualizar",
                                        }}
                                        data={workplaceDataList}
                                    />
                                </Form>
                            </Col>
                            <Col className="mb-3" md="2" />
                            <Col className="mb-3" md="5">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationWorkplace"
                                >
                                    Nome
                                </label>
                                <Input
                                    id="validationWorkplace"
                                    placeholder="Nome do local de trabalho"
                                    type="text"
                                    valid={employeetWorkplaceState === "valid"}
                                    invalid={employeetWorkplaceState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeWorkplace(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeWorkplaceState("invalid");
                                        } else {
                                            setEmployeeWorkplaceState("valid");
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
                                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleWorkplaceValidation}>
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
