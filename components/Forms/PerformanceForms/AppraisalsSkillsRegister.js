import React, { useState, useReducer, useRef, useContext, useEffect, useCallback, useLayoutEffect } from "react";
import {
    Card, CardHeader, CardBody, CardFooter,
    CardTitle, Col, Row, Button, Form, ListGroupItem,
    Spinner
} from "reactstrap";
import { ReviewContext } from "../../../contexts/PerformanceContext/PerformanceReviewContext";
import { AuthContext } from "../../../contexts/AuthContext";
import useCreatePerformanceReviewAnswer from "../../../hooks/PerformanceReview/ReviewAnswer/useCreatePerformanceReviewAnswer";
import { reviewScaleAndCriteriaFormReducer, initialStateReviewScaleAndCriteriaForm } from "../../../reducers/ReviewForms/ReviewScaleAndCriteriaFormReducer";
import { usePerformanceReviewData } from "../../../hooks/PerformanceReview/ReviewAnswer/usePerformanceReviewData";
import 'quill/dist/quill.snow.css'; // Importando o CSS do Quill

export function AppraisalsSkillsRegister() {

    const {
        performanceReviewData,
        reviewedIdOnPerformanceReview,
        reviewerIdOnPerformanceReview,
        handlePerformanceIdStatusCleanupToUpdate
    } = useContext(ReviewContext);

    const { authenticationDataLoggedInUser } = useContext(AuthContext);
    const { handleValidateAddReviewAnswerForm } = useCreatePerformanceReviewAnswer();

    const quillRef = useRef(null);

    const userLoggedId = authenticationDataLoggedInUser?.data?.id;
    const [reviewObjective, setReviewObjective] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({});

    // Hook centralizado para todos os dados de avaliação
    const {
        loading,
        newGroupedData = [],
        combinedData = [],
        performanceAppraisalData = {},
        reviewAnswerData = {},
    } = usePerformanceReviewData(performanceReviewData);

    const detailedRulerTypeData = reviewAnswerData.detailedRulerTypeData || [];

    // Função para limpar HTML
    function stripHtmlTags(html) {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '');
    }

    const reviewObjectiveText = stripHtmlTags(performanceAppraisalData?.reviewObjective ||
        performanceReviewData?.reviewObjective);

    const initializeQuill = async (container) => {
        if (!container) return;

        try {
            const Quill = (await import("quill")).default;

            if (!container.__quill) {
                const quillInstance = new Quill(container, {
                    modules: {
                        toolbar: [
                            ['bold', 'italic'],
                            ['link', 'blockquote', 'code', 'image'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                        ]
                    },
                    placeholder: "Escreva aqui seu combinados...",
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
    };

    const handleBackToList = useCallback(() => {
        handlePerformanceIdStatusCleanupToUpdate();
    }, [handlePerformanceIdStatusCleanupToUpdate]);

    const handleRadioChange = (e, evidenceId, weight, evaluationRulerId) => {
        const { value } = e.target;
        setSelectedStatus(prev => ({
            ...prev,
            [evidenceId]: { selectedOption: value, weight, evidenceId, evaluationRulerId }
        }));
    };

    const handleSalvar = useCallback(async () => {
        try {
            // 🔹 Recupera o texto do Quill (comentário do avaliador)
            const reviewParticipantComment = quillRef.current?.root?.innerText.trim() || "";
            console.log("Comentário salvo:", reviewParticipantComment);

            // 🔹 Dados base do formulário
            const baseData = {
                performanceReview: Number(performanceReviewData?.id),
                evaluationRulerId: performanceReviewData?.reviewRulerId,
                reviewParticipantId: reviewerIdOnPerformanceReview?.id || userLoggedId,
                reviewParticipantComment,
                answeredAsLeaderOf: null,
                answeredAsSelfEvaluationOf: null,
                answeredAsPairOf: null,
            };

            // 🔹 Determina o tipo de avaliação (Líder, Autoavaliação ou Par)
            const reviewAs = reviewerIdOnPerformanceReview?.reviewAs;
            if (!reviewAs) {
                console.warn("⚠️ Tipo de avaliação (reviewAs) não definido.");
                return;
            }

            // 🔹 Monta estrutura das competências e evidências selecionadas
            const groupedResults = newGroupedData
                .map((group) => {
                    const classifications = group.classificationData
                        .map((classification) => {
                            const skills = classification.skills
                                .map((skill) => {
                                    const evidences = skill.evidences
                                        .map((evidence) => {
                                            const status = selectedStatus[evidence.id];
                                            if (!status) return null;
                                            return {
                                                evidenceId: evidence.id,
                                                selectedOption: status.selectedOption,
                                                weight: status.weight,
                                                evaluationRulerId: status.evaluationRulerId,
                                            };
                                        })
                                        .filter(Boolean);

                                    if (!evidences.length) return null;

                                    return {
                                        competenceId: skill.id,
                                        description: skill.competencieTypeName || "",
                                        evidences,
                                    };
                                })
                                .filter(Boolean);

                            if (!skills.length) return null;

                            return {
                                classificationId: classification.classificationId,
                                classificationName: classification.classificationName,
                                skills,
                            };
                        })
                        .filter(Boolean);

                    if (!classifications.length) return null;

                    return {
                        occupationalGroup: group.groupName,
                        skillClassification: classifications,
                    };
                })
                .filter(Boolean);

            if (!groupedResults.length) {
                console.warn("⚠️ Nenhuma evidência selecionada para salvar.");
                return;
            }

            // 🔹 Define onde salvar (dependendo do tipo de avaliação)
            const reviewedId = reviewedIdOnPerformanceReview?.id;
            const reviewerId = reviewerIdOnPerformanceReview?.id || userLoggedId;

            switch (reviewAs) {
                case "Líder":
                    baseData.answeredAsLeaderOf = {
                        reviewedIdOnPerformanceReview: reviewedId,
                        occupationalGroup: groupedResults,
                    };
                    break;

                case "Autoavaliação":
                    baseData.answeredAsSelfEvaluationOf = {
                        reviewerIdOnPerformanceReview: reviewerId,
                        occupationalGroup: groupedResults,
                    };
                    break;

                case "Par":
                    baseData.answeredAsPairOf = {
                        reviewedIdOnPerformanceReview: reviewedId,
                        occupationalGroup: groupedResults,
                    };
                    break;

                default:
                    console.warn("⚠️ Tipo de avaliação desconhecido:", reviewAs);
                    break;
            }

            // 🔹 Envia os dados
            await handleValidateAddReviewAnswerForm(baseData);

            console.log("✅ Dados salvos com sucesso:", baseData);
        } catch (error) {
            console.error("❌ Erro ao salvar avaliação:", error);
        }
    }, [
        performanceReviewData,
        reviewerIdOnPerformanceReview,
        reviewedIdOnPerformanceReview,
        newGroupedData,
        selectedStatus,
        userLoggedId,
        handleValidateAddReviewAnswerForm,
    ]);

    const handleLimpar = useCallback(() => {
        const objectiveField = document.querySelector("#validationReviewParticipantComment .ql-editor");
        if (objectiveField) objectiveField.innerHTML = "<p><br></p>";

        const resetStatus = {};
        combinedData?.forEach((cd) => {
            const id = cd.evidence?.id;
            if (id) resetStatus[id] = { selectedOption: null, weight: null };
        });

        setSelectedStatus(resetStatus);
    }, [combinedData]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <Spinner color="primary" />
                <span className="ml-2">{loading && "Carregando avaliação..."}</span>
            </div>
        );
    }

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">{performanceAppraisalData?.reviewName}</h3>
            </CardHeader>
            <CardBody>
                {/* Objetivo */}
                <div className="form-row">
                    <Col className="mb-7" md="12">
                        <label htmlFor="validationDescriptionReviewObjective">
                            Objetivo
                        </label>
                        <p className="text-justify">
                            {
                                reviewObjectiveText ||
                                "Nenhum objetivo definido para esta avaliação."
                            }
                        </p>
                    </Col>
                </div>

                {/* Avaliador / Avaliado */}
                <div className="form-row">
                    <Col className="mb-3" md="8">
                        <label htmlFor="validationCustom01">Avaliador</label>
                        <div className="mt-1 mb-3">
                            <span className="name text-sm">{reviewerIdOnPerformanceReview.name || ""}</span>
                        </div>
                    </Col>
                    <Col className="mb-3" md="4">
                        <label htmlFor="validationCustom05">Cargo</label>
                        <div className="mt-1 mb-3">
                            <span className="name text-sm">
                                {reviewerIdOnPerformanceReview.roleName || ''}
                            </span>
                        </div>
                    </Col>
                </div>

                <div className="form-row">
                    <Col className="mb-3" md="8">
                        <label htmlFor="validationCustom01">Avaliado</label>
                        <div className="mt-1 mb-3">
                            <span className="name text-sm">
                                {reviewedIdOnPerformanceReview.name}
                            </span>
                        </div>
                    </Col>
                    <Col className="mb-3" md="4">
                        <label htmlFor="validationCustom05">Cargo</label>
                        <div className="mt-1 mb-3">
                            <span className="name text-sm">
                                {reviewedIdOnPerformanceReview.roleName || ''}
                            </span>
                        </div>
                    </Col>
                </div>

                {/* Legenda */}
                <div className="form-row">
                    <Col className="mb-3" md="12">
                        <label htmlFor="validationPDIStatus">Legenda</label>
                        {Array.isArray(detailedRulerTypeData) && detailedRulerTypeData.length > 0 ? (
                            detailedRulerTypeData.map((rulerType) => (
                                <Card key={rulerType.id} className="mb-3">
                                    <Row>
                                        <Col className="my-2" md="4">
                                            <Row>
                                                <Col className="ml-2">
                                                    <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                        Régua do tipo{' '}
                                                    </h6>
                                                    <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.ruleType}</h5>
                                                </Col>
                                                <Col>
                                                    <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                        Alternativas{' '}
                                                    </h6>
                                                    <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.optionsCount}</h5>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col className="mb-2 d-flex flex-row justify-content-center align-items-center" md="8">
                                            {rulerType.options.length > 0 ? (
                                                rulerType.options.map((option, index) => (
                                                    <Card key={option.id || option.label} className="bg-orange m-2" style={{ width: 96, height: 96 }}>
                                                        <CardBody className="d-flex flex-column justify-content-start align-items-center">
                                                            <div>
                                                                <h3 className="mb-0 text-lighter text-center">{option.label}</h3>
                                                            </div>
                                                            <div className="mb-2 d-flex">
                                                                <h4 className="text-lighter mr-2">Nota</h4>
                                                                <h4 className="mb-0 text-lighter">{option.weight}</h4>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))
                                            ) : (
                                                <Col md="12">
                                                    <small>Nenhuma opção encontrada.</small>
                                                </Col>
                                            )}
                                        </Col>
                                    </Row>
                                </Card>
                            ))
                        ) : (
                            <ListGroupItem className="px-0">
                                <div className="col">
                                    <small>Nenhum dado de régua de avaliação encontrado.</small>
                                </div>
                            </ListGroupItem>
                        )}
                    </Col>
                </div>

                {/* Competências */}
                <div>
                    {Array.isArray(newGroupedData) && newGroupedData.length > 0 ? (
                        newGroupedData.map((group) => {
                            const hasSkills = group.classificationData.some(
                                (c) => c.skills && c.skills.length > 0
                            );
                            if (!hasSkills) return null;

                            return (
                                <Card key={group.groupId} className="mb-4">
                                    {group.groupName && (
                                        <CardHeader>
                                            <CardTitle>{group.groupName}</CardTitle>
                                        </CardHeader>
                                    )}

                                    <CardBody>
                                        {group.classificationData
                                            .filter((classification) => classification.skills.length > 0)
                                            .map((classification) => (
                                                <div key={classification.classificationId} style={{ marginBottom: "2rem" }}>
                                                    <Col className="pb-3 d-flex justify-content-center" md="12">
                                                        <p className="lead text-black">
                                                            Competência(s): {classification.classificationName}
                                                        </p>
                                                    </Col>

                                                    {classification.skills.map((skill) => {
                                                        const relevantItems = combinedData
                                                            .filter(cd => Number(cd.evidence?.evidenceName) === Number(skill.id))
                                                            .reduce((unique, item) => {
                                                                if (!unique.some(u => u.evidence?.id === item.evidence?.id)) {
                                                                    unique.push(item);
                                                                }
                                                                return unique;
                                                            }, []);

                                                        if (!relevantItems.length) {
                                                            return (
                                                                <Card key={skill.id} className="mb-3">
                                                                    <CardHeader>
                                                                        {skill.competencieTypeName || "Não Encontrado"}
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <p>Nenhuma evidência encontrada para esta competência</p>
                                                                    </CardBody>
                                                                </Card>
                                                            );
                                                        }

                                                        return (
                                                            <Card key={skill.id} className="mb-4 shadow-sm border-0">
                                                                <CardHeader className="bg-light py-2">
                                                                    <h6 className="mb-0 text-dark">{skill.competencieTypeName || "Não Encontrado"}</h6>
                                                                </CardHeader>

                                                                <CardBody style={{ overflowX: "auto", padding: "1rem" }}>
                                                                    <div style={{ minWidth: "720px" }}>
                                                                        <table className="table table-bordered table-sm align-middle mb-0">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style={{ width: "50%", whiteSpace: "nowrap" }}>Evidência Comportamental</th>
                                                                                    {(relevantItems[0]?.ruleOptions || []).map((option, i) => (
                                                                                        <th key={i} className="text-center" style={{ whiteSpace: "nowrap" }}>
                                                                                            {option.label}
                                                                                        </th>
                                                                                    ))}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {relevantItems.map((ri, idx) => (
                                                                                    <tr key={ri.evidence?.id || idx}>
                                                                                        <td
                                                                                            style={{
                                                                                                whiteSpace: "normal",
                                                                                                wordBreak: "break-word",
                                                                                                verticalAlign: "middle",
                                                                                            }}
                                                                                        >
                                                                                            <strong>{idx + 1}.</strong>{" "}
                                                                                            {ri.evidence?.description || "Descrição não encontrada"}
                                                                                        </td>

                                                                                        {(ri.ruleOptions || []).map((option, j) => (
                                                                                            <td key={j} align="center">
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    name={`status-${ri.evidence?.id}`}
                                                                                                    value={option.label}
                                                                                                    checked={
                                                                                                        selectedStatus[ri.evidence?.id]?.selectedOption === option.label
                                                                                                    }
                                                                                                    onChange={(e) =>
                                                                                                        handleRadioChange(
                                                                                                            e,
                                                                                                            ri.evidence?.id,
                                                                                                            option.weight,
                                                                                                            ri.evaluationRoler.id
                                                                                                        )
                                                                                                    }
                                                                                                    style={{
                                                                                                        transform: "scale(1.2)",
                                                                                                        cursor: "pointer",
                                                                                                    }}
                                                                                                />
                                                                                            </td>
                                                                                        ))}
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                    </CardBody>
                                </Card>
                            );
                        })) : (
                        <p>Nenhuma competência disponível.</p>
                    )}
                </div>

                {/* Comentários */}
                <div className="form-row">
                    <Col className="mb-7" md="12">
                        <label
                            htmlFor="validationReviewParticipantComment"
                            className="text-justify"
                        >
                            Utilize o espaço abaixo para expor comentários, sugestões, críticas e/ou outras informações adicionais, que ainda não foram mencionados acima. Indique também ações e/ou treinamentos que, na sua opinião, poderão contribuir para o desenvolvimento profissional do avaliado. Sua franqueza contribuirá para a confecção do plano de desenvolvimento dele.
                        </label>
                        <div
                            ref={(el) => {
                                // inicializa Quill assim que o container existir
                                if (el && !el.__quill) {
                                    initializeQuill(el);
                                }
                            }}
                            id="validationReviewParticipantComment"
                            style={{ minHeight: 172, height: 200, width: '100%' }}
                        />
                        <div className="valid-feedback">Parece bom!</div>
                        <div className="invalid-feedback">
                            É necessário preencher este campo.
                        </div>
                    </Col>
                </div>
            </CardBody>
            <CardFooter>
                <Row>
                    <Col md="8" />
                    <Col className="d-flex justify-content-end align-items-center" md="4">
                        <Button
                            className="px-5"
                            color="primary"
                            size="lg"
                            onClick={handleBackToList}
                        >
                            Voltar
                        </Button>
                        <Button
                            className="btn-neutral px-5"
                            color="default"
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
            </CardFooter>
        </Card>
    )
}

export default AppraisalsSkillsRegister;