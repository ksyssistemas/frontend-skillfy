import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes

// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    Col,
    Button,
    Card,
    CardBody,
    CardHeader,
    Row
} from "reactstrap";
import ReactDatetime from "react-datetime";
import PropTypes from "prop-types";
import InputMask from 'react-input-mask';
import useCreatePdi from '../../../hooks/RecordsHooks/pdi/useCreatePdi';
import { handleDateFormatting } from "../../../util/handleDateFormatting";
import { useFindAllClientCompany } from '../../../hooks/RecordsHooks/customer/useFindAllClientCompany';
import { useFindAllAdmin } from '../../../hooks/RecordsHooks/admin/useFindAllAdmin';
import { useFindAllComptencies } from '../../../hooks/RecordsHooks/pdi/competencies/useFindAllCompetencies';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));

export function PDIRegister({ handleShowPDIRegister }) {

    const {
        Name,
        setName,
        NameState,
        setNameState,
        Description,
        setDescription,
        DescriptionState,
        setDescriptionState,
        StartDate,
        setStartDate,
        StartDateState,
        setStartDateState,
        FinalDate,
        setFinalDate,
        FinalDateState,
        setFinalDateState,
        pdiStatus,
        setPdiStatus,
        pdiStatusState,
        setPdiStatusState,
        appraiser,
        setAppraiser,
        appraiserState,
        setAppraiserState,
        evaluated,
        setEvaluated,
        evaluatedState,
        setEvaluatedState,
        competencies,
        setCompetencies,
        competenciesState,
        setCompetenciesState,
        handleValidateAddPDIForm,
        reset
    } = useCreatePdi(handleShowPDIRegister);

    const [selectedBelongingToClientCompany, setSelectedBelongingToClientCompany] = useState('');
    const [clientCompanyDataList, setClientCompanyDataList] = useState([]);
    const handleClientCompanyDataList = (customerUser) => {
        setClientCompanyDataList(customerUser);
    }

    useEffect(() => {
        if (clientCompanyDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllClientCompany, handleClientCompanyDataList, 'client-company', 'EmployeeUserRegister');
        }
    }, []);

    const [selectedBelongingToAdmin, setSelectedBelongingToAdmin] = useState('');
    const [selectedBelongingToAdminState, setselectedBelongingToAdminState] = React.useState(null);

    const [selectedBelongingToEvaluated, setselectedBelongingToEvaluated] = useState('');
    const [selectedBelongingToEvaluatedState, setselectedBelongingToEvaluatedState] = React.useState(null);

    const [selectedBelongingToCompetencies, setselectedBelongingToCompetencies] = useState('');
    const [selectedBelongingToCompetenciesState, setselectedBelongingToCompetenciesState] = React.useState(null);

    const [competenciesDataList, setCompetenciesDataList] = useState([]);
    const handleCompetenciesDataList = (competencies) => {
        setCompetenciesDataList(competencies);
    };

    useEffect(() => {
        if (competenciesDataList.length === 0) {
            employmentContractDataSearchAndProcess(
                useFindAllComptencies,
                handleCompetenciesDataList,
                'competencies',
                'CompetenciesUserRegister'
            );
        }
    }, [])

    const handleCompetenciesChange = (e) => {
        const value = Number(e.target.value);
        setCompetencies(value);
        if (value) {
            setCompetenciesState("valid");
        } else {
            setCompetenciesState("invalid");
        }
    };

    const [adminDataList, setAdminDataList] = useState([]);
    const handleAdminDataList = (adminUser) => {
        setAdminDataList(adminUser);
    };

    useEffect(() => {
        if (adminDataList.length === 0) {
            employmentContractDataSearchAndProcess(
                useFindAllAdmin,
                handleAdminDataList,
                'admin',
                'AdminUserRegister'
            );
        }
    }, [])

    const handleAppraiserChange = (e) => {
        const value = Number(e.target.value);
        setAppraiser(value);
        if (value) {
            setAppraiserState("valid");
        } else {
            setAppraiserState("invalid");
        }
    };

    const handleEvaluatedChange = (e) => {
        const value = Number(e.target.value);
        setEvaluated(value);
        if (value) {
            setEvaluatedState("valid");
        } else {
            setEvaluatedState("invalid");
        }
    };

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Adicionar PDI</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationName"
                                placeholder="Nome"
                                type="text"
                                valid={NameState === "valid"}
                                invalid={NameState === "invalid"}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (e.target.value === "") {
                                        setNameState("invalid");
                                    } else {
                                        setNameState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationDescription"
                            >
                                Descrição
                            </label>
                            <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationDescription"
                                placeholder="Descrição da competência"
                                type="text"
                                valid={DescriptionState === "valid"}
                                invalid={DescriptionState === "invalid"}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (e.target.value === "") {
                                        setDescriptionState("invalid");
                                    } else {
                                        setDescriptionState("valid");
                                    }
                                }} as
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="3">
                            <label
                                className="form-control-label"
                                htmlFor="validationStartDate"
                            >
                                Data de início
                            </label>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "__/__/__",
                                }}
                                timeFormat={false}
                                onChange={(e) => handleDateFormatting(e, setStartDate, setStartDateState)}
                            />
                            <div className="invalid-feedback">
                                É necessário selecionar uma data.
                            </div>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationFinalDate"
                                >
                                    Data de Fim
                                </label>
                                <ReactDatetime
                                    inputProps={{
                                        placeholder: "__/__/__",
                                    }}
                                    timeFormat={false}
                                    onChange={(e) => handleDateFormatting(e, setFinalDate, setFinalDateState)}
                                />
                                <div className="invalid-feedback">
                                    É necessário selecionar uma data.
                                </div>
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationPDIStatus"
                            >
                                Status
                            </label>
                            <Input
                                id="validationPDIStatus"
                                placeholder="Status do pdi"
                                type="text"
                                valid={pdiStatusState === "valid"}
                                invalid={pdiStatusState === "invalid"}
                                onChange={(e) => {
                                    setPdiStatus(e.target.value);
                                    if (e.target.value === "") {
                                        setPdiStatusState("invalid");
                                    } else {
                                        setPdiStatusState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationAvaliador"
                            >
                                Avaliador
                            </label>
                            <Select2
                                id="validationAvaliador"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione um Avaliador",
                                }}
                                value={appraiser}
                                onChange={handleAppraiserChange}
                                data={adminDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(
                                    e.target.value,
                                    adminDataList,
                                    setAppraiser,
                                    setSelectedBelongingToAdmin,
                                    setselectedBelongingToAdminState,
                                    null,
                                    null,
                                    'id'
                                )}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label className="form-control-label"
                                htmlFor="validationAvaliado">
                                Avaliado
                            </label>
                            <Select2
                                id="validationAvaliado"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione um avaliado",
                                }}
                                value={evaluated}
                                onChange={handleEvaluatedChange}
                                data={clientCompanyDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(
                                    e.target.value,
                                    clientCompanyDataList,
                                    setEvaluated,
                                    setselectedBelongingToEvaluated,
                                    setselectedBelongingToEvaluatedState,
                                    null,
                                    null,
                                    'id'
                                )}
                            />
                            <div className="invalid-feedback">
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label className="form-control-label"
                                htmlFor="validationCompetencia">
                                Competências
                            </label>
                            <Select2
                                id="validationCompetencia"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione uma competência",
                                }}
                                value={competencies}
                                onChange={handleCompetenciesChange}
                                data={competenciesDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(
                                    e.target.value,
                                    competenciesDataList,
                                    setCompetencies,
                                    setselectedBelongingToCompetencies,
                                    setselectedBelongingToCompetenciesState,
                                    null,
                                    null,
                                    'id'
                                )}
                            />
                            <div className="invalid-feedback">
                            </div>
                        </Col>
                    </div>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleValidateAddPDIForm}>
                                <span className="btn-inner--text">Salvar</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}


PDIRegister.propTypes = {
    handleShowPDIRegister: () => { },
};

PDIRegister.propTypes = {
    handleShowPDIRegister: PropTypes.func,
}


export default PDIRegister;