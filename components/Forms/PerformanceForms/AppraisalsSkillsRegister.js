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
import 'quill/dist/quill.snow.css'; 
import 'assets/css/styles/appraisalastable.css';
import { useRouter } from 'next/router';
import { EvidencesContext } from '../../../contexts/PerformanceContext/AppraisalEvidencesContext';
export function AppraisalsSkillsRegister() {
    const quillRef = useRef(null); 

    const { evidencesIdToUpdate, handleEvidenceIdStatusCleanupToUpdate  } = useContext(EvidencesContext);
    console.log("ID do register:", evidencesIdToUpdate); 
    const handleBackToList = () => {
        handleEvidenceIdStatusCleanupToUpdate(); // Limpa o ID
      };
    useEffect(() => {
        let quillInstance;
        const initializeQuill = async () => {
            if (typeof window !== 'undefined' && document) {
                if (!quillRef.current) {
                    try {
                        const Quill = (await import("quill")).default;
                        const quillElement = document.querySelector('[data-toggle="quill"]');

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

                            quillInstance.on('text-change', () => {
                                const text = quillInstance.root.innerText; 
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
        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change'); 
                quillRef.current = null; 
            }
        };
    }, []);

    const [selectedStatus, setSelectedStatus] = useState({});

    const handleRadioChange = (e, rowIndex) => {
        setSelectedStatus((prevState) => ({
            ...prevState,
            [rowIndex]: e.target.value,
        }));
    };

    const evidencias = [
        "Responde rapidamente às demandas e dificuldades que surgem em seu dia-a-dia.",
        "Demonstra dinamismo em suas atividades, lidando de forma ágil com diferentes assuntos e/ou atribuições.",
        "Possui senso de urgência e visão do todo em relação aos assuntos a serem tratados com prioridade."
    ];

    const options = [
        "Nunca", "Quase Nunca", "Algumas Vezes", "Várias Vezes", "Quase Sempre", "Sempre"
    ];
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
                            <p> Texto de teste para o objetivo desta avaliação. </p>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="validationPDIStatus"
                            >
                                Legenda
                            </label>
                            <Input
                                id="validationPDIStatus"
                                // placeholder="Status do pdi"
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
                    <Col className="py-3 d-flex justify-content-center" md="12">
                        <p className="lead text-black">Classificação da Competência</p>
                    </Col>
                    <Card>
                        <CardHeader>Tipo de competência 1</CardHeader>
                        <CardBody>
                            <div className="form-row">
                                <Col className="mb-3" md="12">
                                    <label
                                        className="form-control-label"
                                        htmlFor="validationPDIStatus"
                                    >
                                        Descrição da Competência a ser avaliada
                                    </label>
                                    <Input
                                        id="validationPDIStatus"
                                        type="text"
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
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center font-weight-bold">Evidência Comportamental</th>
                                                {options.map((option, index) => (
                                                    <th key={index} className="text-center font-weight-bold">{option}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {evidencias.map((evidencia, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td>{evidencia}</td>
                                                    {options.map((option, colIndex) => (
                                                        <td key={colIndex} align="center">
                                                            <input
                                                                type="radio"
                                                                name={`status-${rowIndex}`}
                                                                value={option}
                                                                checked={selectedStatus[rowIndex] === option}
                                                                onChange={(e) => handleRadioChange(e, rowIndex)}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Col>
                            </div>
                        </CardBody>
                    </Card>
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
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5" color="primary" size="lg" onClick={handleBackToList}>Voltar</Button>
                            <Button className="px-5" color="secundary" size="lg" type="button">
                                <span className="btn-inner--text">Limpar</span>
                            </Button>
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