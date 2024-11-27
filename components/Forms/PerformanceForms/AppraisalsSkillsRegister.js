import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Badge,
    ListGroup,
    ListGroupItem,
    Progress
} from "reactstrap";
import 'quill/dist/quill.snow.css'; // Importando o CSS do Quill

export function AppraisalsSkillsRegister() {
    const quillRef = useRef(null); // Referência para o editor

    useEffect(() => {
        let quillInstance;
        const initializeQuill = async () => {
            if (typeof window !== 'undefined' && document) {
                // Apenas cria uma nova instância do Quill se não existir uma instância anterior
                if (!quillRef.current) {
                    try {
                        // we make a dynamic import for the QuillJS, as this component is not made to work on SSR
                        // Somente cria uma nova instância do Quill se não existir uma instância anterior
                        const Quill = (await import("quill")).default;
                        const quillElement = document.querySelector('[data-toggle="quill"]');

                        // Verificar se o elemento está presente e se ainda não tem um Quill
                        if (quillElement && !quillElement.__quill) {
                            quillInstance = new Quill(quillElement, {
                                modules: {
                                    toolbar: [
                                        ['bold', 'italic'],
                                        ['link', 'blockquote', 'code', 'image'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                                    ]
                                },
                                placeholder: "Escreva aqui o objetivo da avaliação...",
                                theme: 'snow'
                            });
                            quillRef.current = quillInstance;

                            // Event listener for text change
                            quillInstance.on('text-change', () => {
                                const text = quillInstance.root.innerText; // Get the editor content
                                setReviewObjective(text);
                            });
                        }
                    } catch (error) {
                        console.error("Erro ao carregar o QuillJS:", error);
                    }
                }
            }
        };

        initializeQuill();
        // Cleanup function para desmontar o Quill ao desmontar o componente
        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change'); // Remove event listeners if any
                quillRef.current = null; // Clean up ref
            }
        };
    }, []);
    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Nome da avaliação</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-7" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="validationDescriptionReviewObjective"
                            >
                                Objetivo
                            </label>
                            <div
                                data-quill-placeholder="Escreva aqui o objetivo da avaliação..."
                                data-toggle="quill"
                                id="validationDescriptionReviewObjective"
                            // valid={reviewObjectiveState === "valid"}
                            // invalid={reviewObjectiveState === "invalid"}
                            // onChange={handleReviewObjectiveChange}
                            />
                            <div className="valid-feedback">Parece bom!</div>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
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
                                // onChange={(e) => handleDateFormatting(e, setStartDate, setStartDateState)}
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
                                    // onChange={(e) => handleDateFormatting(e, setFinalDate, setFinalDateState)}
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
                                // valid={pdiStatusState === "valid"}
                                // invalid={pdiStatusState === "invalid"}
                                // onChange={(e) => {
                                //     setPdiStatus(e.target.value);
                                //     if (e.target.value === "") {
                                //         setPdiStatusState("invalid");
                                //     } else {
                                //         setPdiStatusState("valid");
                                //     }
                                // }}
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
                                // value={appraiser}
                                // onChange={handleAppraiserChange}
                                // data={adminDataList}
                                // onSelect={(e) => handleSelectionEmploymentContractData(
                                //     e.target.value,
                                //     adminDataList,
                                //     setAppraiser,
                                //     setSelectedBelongingToAdmin,
                                //     setselectedBelongingToAdminState,
                                //     null,
                                //     null,
                                //     'id'
                                // )}
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
                                // value={evaluated}
                                // onChange={handleEvaluatedChange}
                                // data={clientCompanyDataList}
                                // onSelect={(e) => handleSelectionEmploymentContractData(
                                //     e.target.value,
                                //     clientCompanyDataList,
                                //     setEvaluated,
                                //     setselectedBelongingToEvaluated,
                                //     setselectedBelongingToEvaluatedState,
                                //     null,
                                //     null,
                                //     'id'
                                // )}
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
                                // value={competencies}
                                // onChange={handleCompetenciesChange}
                                // data={competenciesDataList}
                                // onSelect={(e) => handleSelectionEmploymentContractData(
                                //     e.target.value,
                                //     competenciesDataList,
                                //     setCompetencies,
                                //     setselectedBelongingToCompetencies,
                                //     setselectedBelongingToCompetenciesState,
                                //     null,
                                //     null,
                                //     'id'
                                // )}
                            />
                            <div className="invalid-feedback">
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationSugetao"
                            >
                                Sugestão
                            </label>
                            <Input
                                id="validationSugetao"
                                placeholder="Insira a sugestão"
                                type="text"
                                // valid={pdiStatusState === "valid"}
                                // invalid={pdiStatusState === "invalid"}
                                // onChange={(e) => {
                                //     setPdiStatus(e.target.value);
                                //     if (e.target.value === "") {
                                //         setPdiStatusState("invalid");
                                //     } else {
                                //         setPdiStatusState("valid");
                                //     }
                                // }}
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
                            <Button className="px-5" color="primary" size="lg" type="button">
                                <span className="btn-inner--text">Salvar</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}

export default AppraisalsSkillsRegister;