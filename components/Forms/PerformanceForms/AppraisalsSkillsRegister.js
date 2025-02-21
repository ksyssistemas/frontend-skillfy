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
import { useFindAllEvidences } from '../../../hooks/PerformanceReview/EvidencesReview/useFindAllEvidences';
import { useFindAllEvaluationRoler } from '../../../hooks/PerformanceReview/EvaluationRoler/useFindAllEvaluationRoler';
import { useFindAllRuleOption } from '../../../hooks/PerformanceReview/RuleOption/useFindAllRuleOption';
import { useFindEvidences } from '../../../hooks/PerformanceReview/EvidencesReview/useFindEvidences';
import { useFindEvaluationRoler } from '../../../hooks/PerformanceReview/EvaluationRoler/useFindEvaluationRoler';
import { useFindRuleOption } from '../../../hooks/PerformanceReview/RuleOption/useFindRuleOption';
import { useFindPerformanceReview } from '../../../hooks/PerformanceReview/useFindPerformanceReview';
import { EvidencesContext } from '../../../contexts/PerformanceContext/AppraisalEvidencesContext';
import { useFindAllReviewEvidenceRuler } from '../../../hooks/PerformanceReview/ReviewEvidenceRuler/useFindAllReviewEvidenceRuler';
import { useFindRuleOptionEvaluationRuler } from '../../../hooks/PerformanceReview/RuleOption/useFindRuleOptionEvaluationRuler';

export function AppraisalsSkillsRegister() {
    const [reviewObjective, setReviewObjective] = useState('');
    const quillRef = useRef(null);

    const { evidencesIdToUpdate, handleEvidenceIdStatusCleanupToUpdate } = useContext(EvidencesContext);
    const handleBackToList = () => {
        handleEvidenceIdStatusCleanupToUpdate();
    };

    const [performanceAppraisalData, setPerformanceAppraisalData] = useState([]);
    // console.log(performanceAppraisalData);
    useEffect(() => {
        const fetchPerformanceAppraisal = async () => {
            if (!performanceAppraisalData.length) {
                const foundAppraisal = await useFindPerformanceReview(evidencesIdToUpdate);
                setPerformanceAppraisalData(foundAppraisal);
            }
        };

        if (evidencesIdToUpdate) {
            fetchPerformanceAppraisal();
        }
    }, [evidencesIdToUpdate]);

    const [performanceEvidenceData, setPerformanceEvidenceData] = useState([]);
    // console.log("performanceEvidenceData :", performanceEvidenceData); 

    const [performanceEvaluationRolerData, setPerformanceEvaluationRolerData] = useState([]);
    // console.log("Evidências da Evaluation Roler :", performanceEvaluationRolerData);

    const [performanceRuleOptionData, setPerformanceRuleOptionData] = useState([]);
    // console.log("Opções da RuleOptions :", performanceRuleOptionData);

    const [performanceReviewEvidenceRulerData, setPerformanceReviewEvidenceRulerData] = useState([]);
    useEffect(() => {
        const fetchReviewEvidenceRuler = async () => {
            const foundReviewEvidenceRuler = await useFindAllReviewEvidenceRuler();
            setPerformanceReviewEvidenceRulerData(foundReviewEvidenceRuler);
        };

        if (evidencesIdToUpdate) {
            fetchReviewEvidenceRuler();
        }
    }, [evidencesIdToUpdate]);
    // console.log("performanceReviewEvidenceRulerData :", performanceReviewEvidenceRulerData);

    const ReviewEvidenceRulerIgualsEvaluationIdData = performanceReviewEvidenceRulerData.filter
        (EvidenceRuler => Number(EvidenceRuler.performanceReviewId) === Number(evidencesIdToUpdate));
    // console.log("ReviewEvidenceRulerIgualsEvaluationIdData :", ReviewEvidenceRulerIgualsEvaluationIdData);

    useEffect(() => {
        if (ReviewEvidenceRulerIgualsEvaluationIdData.length > 0) {
            Promise.all(ReviewEvidenceRulerIgualsEvaluationIdData.map(EvidenceRuler => useFindRuleOptionEvaluationRuler(EvidenceRuler.reviewRulerId)))
                .then(details => setPerformanceRuleOptionData(details))
                .catch(error => console.error("Erro ao buscar opções :", error));
        } else {
            setPerformanceRuleOptionData([]);
        }
    }, [ReviewEvidenceRulerIgualsEvaluationIdData]);

    useEffect(() => {
        if (ReviewEvidenceRulerIgualsEvaluationIdData.length > 0) {
            Promise.all(ReviewEvidenceRulerIgualsEvaluationIdData.map(EvidenceRuler => useFindEvaluationRoler(EvidenceRuler.reviewRulerId)))
                .then(details => setPerformanceEvaluationRolerData(details))
                .catch(error => console.error("Erro ao buscar as evidências comportamentais :", error));
        } else {
            setPerformanceEvaluationRolerData([]);
        }
    }, [ReviewEvidenceRulerIgualsEvaluationIdData]);

    useEffect(() => {
        if (ReviewEvidenceRulerIgualsEvaluationIdData.length > 0) {
            Promise.all(ReviewEvidenceRulerIgualsEvaluationIdData.map(EvidenceRuler => useFindEvidences(EvidenceRuler.reviewCompetenceId)))
                .then(details => setPerformanceEvidenceData(details))
                .catch(error => console.error("Erro ao buscar competências :", error));
        } else {
            setPerformanceEvidenceData([]);
        }
    }, [ReviewEvidenceRulerIgualsEvaluationIdData]);

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
    const handleRadioChange = (e, evidenceId, weight, evaluationRulerId) => {
        const { value } = e.target;
        setSelectedStatus((prev) => ({
            ...prev,
            [evidenceId]: {
                selectedOption: value,
                weight: weight,
                evidenceId: evidenceId,
                evaluationRulerId: evaluationRulerId,
            },
        }));
    };

    console.log("selectedStatus :", selectedStatus);

    const evidencias = [];

    for (let i = 0; i < performanceEvaluationRolerData.length; i++) {
        if (performanceEvaluationRolerData[i].ruleType) {
            evidencias.push(performanceEvaluationRolerData[i].ruleType);
        }
    }

    const options = [];

    for (let i = 0; i < performanceRuleOptionData.length; i++) {
        const innerArray = performanceRuleOptionData[i];
        for (let j = 0; j < innerArray.length; j++) {
            const item = innerArray[j];
            if (item.label) {
                options.push(item.label);
            }
        }
    }

    const combinedData = performanceEvidenceData.map((evidence, index) => {
        const evaluationRoler = performanceEvaluationRolerData[index];
        const ruleOptions = performanceRuleOptionData[index];
        return {
            ...evidence,
            evaluationRoler,
            ruleOptions,
        };
    });
    // console.log("combinedData :", combinedData);

    const handleSalvar = () => {

        const payload = {
            objective: reviewObjective,
            responses: Object.values(selectedStatus),
        };

        console.log("Payload a ser enviado:", payload);
    };

    const handleLimpar = () => {
        setReviewObjective('');
        setSelectedStatus({});
        if (quillRef.current) {
            quillRef.current.setText('');
        }
    };

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">{performanceAppraisalData.reviewName}</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-7" md="12">
                            <label htmlFor="validationDescriptionReviewObjective">
                                Objetivo
                            </label>
                            <p>{performanceAppraisalData.reviewObjective}</p>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <label htmlFor="validationPDIStatus">
                                Legenda
                            </label>
                            <p>{performanceAppraisalData.reviewModel}</p>
                        </Col>
                    </div>
                    <Col className="py-3 d-flex justify-content-center" md="12">
                        <p className="lead text-black">Classificação da Competência</p>
                    </Col>

                    {performanceEvidenceData.length > 0 &&
                        performanceEvaluationRolerData.length > 0 &&
                        performanceRuleOptionData.length > 0 ? (
                        combinedData.length > 0 ? (
                            combinedData.map((item) => (
                                <Card key={item.id}>
                                    <CardHeader>{item.evidenceName}</CardHeader>
                                    <CardBody>
                                        <p>{item.description}</p>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Evidência Comportamental</th>
                                                    {item.ruleOptions.map((option, i) => (
                                                        <th key={i}>{option.label}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{item.evaluationRoler.ruleType}</td>
                                                    {item.ruleOptions.map((option, j) => (
                                                        <td key={j} align="center">
                                                            <input
                                                                type="radio"
                                                                name={`status-${item.id}`}
                                                                value={option.label}
                                                                checked={
                                                                    selectedStatus[item.id]?.selectedOption === option.label
                                                                }
                                                                onChange={(e) =>
                                                                    handleRadioChange(e, item.id, option.weight, item.evaluationRoler.id)
                                                                }
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardBody>
                                    <p>Nenhuma competência encontrada</p>
                                </CardBody>
                            </Card>
                        )
                    ) : (
                        <Card>
                            <CardBody>
                                <p>Nenhuma competência encontrada</p>
                            </CardBody>
                        </Card>
                    )}

                    <div className="form-row">
                        <Col className="mb-7" md="12">
                            <label htmlFor="validationDescriptionReviewObjective">
                                Objetivo
                            </label>
                            <div
                                data-quill-placeholder="Escreva aqui o objetivo da avaliação..."
                                data-toggle="quill"
                                id="validationDescriptionReviewObjective"
                            />
                            <div className="valid-feedback">Parece bom!</div>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <Row>
                        <Col md="8" />
                        <Col className="d-flex justify-content-end align-items-center" md="4">
                            <Button className="px-5" color="primary" size="lg" onClick={handleBackToList}>
                                Voltar
                            </Button>
                            <Button
                                className="px-5"
                                color="secundary"
                                size="lg"
                                type="button"
                                onClick={handleLimpar}
                            >
                                <span className="btn-inner--text">Limpar</span>
                            </Button>
                            <Button
                                className="px-5"
                                color="primary"
                                size="lg"
                                type="button"
                                onClick={handleSalvar}
                            >
                                <span className="btn-inner--text">Salvar</span>
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </CardBody>
        </Card>
    )
}

export default AppraisalsSkillsRegister;