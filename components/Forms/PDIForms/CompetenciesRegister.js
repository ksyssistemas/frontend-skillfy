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
import useCreateCompetencies from '../../../hooks/RecordsHooks/pdi/competencies/useCreateCompetencies';
import { useAlert } from '../../../contexts/AlertContext';

export function CompetenciesRegister({ handleShowCompetencieRegister }) {

    const {
        Name,
        setName,
        NameState,
        setNameState,
        Description,
        setDescription,
        DescriptionState,
        setDescriptionState,
        handleValidateAddCompetenciesForm,
        competencieError,
        competencieSuccess,
        setCompetencieError,
        setCompetencieSuccess,
        reset
    } = useCreateCompetencies(handleShowCompetencieRegister);

    const [erro, setErro] = useState('');
    const [success, setSuccess] = useState('');

    const { showAlert } = useAlert();

    useEffect(() => {
        if (competencieSuccess) {
            showAlert(
                "success",
                "ni ni-check-bold",
                "Sucesso!",
                "Competência criada com sucesso!"
            );
            setCompetencieSuccess(null);
        }
    }, [competencieSuccess]);

    useEffect(() => {
        if (competencieError) {
            showAlert(
                "danger",
                "ni ni-fat-remove",
                "Erro!",
                "Ocorreu um erro na criação da competência!"
            );
            setCompetencieError(null);
        }
    }, [competencieError]);

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Adicionar Competências</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
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
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
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
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleValidateAddCompetenciesForm}>
                                <span className="btn-inner--text">Salvar</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}

CompetenciesRegister.propTypes = {
    handleShowCompetencieRegister: () => { },
};

CompetenciesRegister.propTypes = {
    handleShowCompetencieRegister: PropTypes.func,
}

export default CompetenciesRegister;