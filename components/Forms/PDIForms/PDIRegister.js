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
import { useFindAllEmployee } from '../../../hooks/RecordsHooks/employee/useFindAllEmployee';
import { useFindAllAdmin } from '../../../hooks/RecordsHooks/admin/useFindAllAdmin';
import { useFindAllComptencies } from '../../../hooks/RecordsHooks/pdi/competencies/useFindAllCompetencies';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import dynamic from "next/dynamic";
import { useAlert } from '../../../contexts/AlertContext';
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
        pdiCreateError,
        pdiCreateSuccess,
        setPdiCreateError,
        setPdiCreateSuccess,
        reset
    } = useCreatePdi(handleShowPDIRegister);

    const [selectedBelongingToClientCompany, setSelectedBelongingToClientCompany] = useState('');
    const [clientCompanyDataList, setClientCompanyDataList] = useState([]);
    const handleClientCompanyDataList = (customerUser) => {
        setClientCompanyDataList(customerUser);
    }

    useEffect(() => {
        if (clientCompanyDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllEmployee, handleClientCompanyDataList, 'employee', 'EmployeeUserRegister');
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
        const selectedValues = Array.from(e.target.selectedOptions).map((option) =>
            Number(option.value)
        );
        setCompetencies(selectedValues);

        if (selectedValues.length > 0) {
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
                useFindAllClientCompany,
                handleAdminDataList,
                'client-company',
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

    const [erro, setErro] = useState('');
    const [success, setSuccess] = useState('');

    const { showAlert } = useAlert();

    useEffect(() => {
        if (pdiCreateSuccess) {
            showAlert(
                "success",
                "ni ni-check-bold",
                "Sucesso!",
                "PDI criado com sucesso!"
            );
            setPdiCreateSuccess(null);
        }
    }, [pdiCreateSuccess]);

    useEffect(() => {
        if (pdiCreateError) {
            showAlert(
                "danger",
                "ni ni-fat-remove",
                "Erro!",
                "Ocorreu um erro na criação do PDI!"
            );
            setPdiCreateError(null);
        }
    }, [pdiCreateError]);

    const errorStyle = {
        color: "#fb6340", 
      };

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Adicionar PDI</h3>
            </CardHeader>
            <CardBody>
                <p className='description' style={errorStyle}>
                    É necessário preencher todos os campos.
                </p>
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
                                dateFormat="DD/MM/YYYY"
                                onChange={(e) => handleDateFormatting(null, e, setStartDate, setStartDateState, null)}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
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
                                    dateFormat="DD/MM/YYYY"
                                    onChange={(e) => handleDateFormatting(null, e, setFinalDate, setFinalDateState, null)}
                                />
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                                <div className="valid-feedback">
                                    Parece bom!
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
                            <div className="valid-feedback">
                                Parece bom!
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
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
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
                                    placeholder: "Selecione uma ou mais competências",
                                }}
                                value={competencies}
                                multiple
                                onChange={handleCompetenciesChange}
                                data={competenciesDataList}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
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