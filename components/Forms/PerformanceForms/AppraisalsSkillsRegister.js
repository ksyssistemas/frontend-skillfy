import React, { useMemo, useState, useEffect, useContext, useRef, useReducer } from "react";
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
    Progress,
    CardFooter
} from "reactstrap";
import 'quill/dist/quill.snow.css';
import 'assets/css/styles/appraisalastable.css';
import { useRouter } from 'next/router';
import { useFindAllEvidences } from '../../../hooks/PerformanceReview/EvidencesReview/useFindAllEvidences';
import { useFindAllEvaluationRoler } from '../../../hooks/PerformanceReview/EvaluationRoler/useFindAllEvaluationRoler';
import { useFindAllRuleOption } from '../../../hooks/PerformanceReview/RuleOption/useFindAllRuleOption';
import { useFindEvidences } from '../../../hooks/PerformanceReview/EvidencesReview/useFindEvidences';
import { useFindSkillType } from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindSkillType";
import { useFindAllOccupationalGroups } from "../../../hooks/DefinitionOptionsReview/OccupationalGroups/useFindAllSkillClassifications";
import { useFindAllSkillClassifications } from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindAllSkillClassifications";
import { useFindEvaluationRoler } from '../../../hooks/PerformanceReview/EvaluationRoler/useFindEvaluationRoler';
import { useFindRuleOption } from '../../../hooks/PerformanceReview/RuleOption/useFindRuleOption';
import { useFindPerformanceReview } from '../../../hooks/PerformanceReview/useFindPerformanceReview';
import { ReviewContext } from '../../../contexts/PerformanceContext/PerformanceReviewContext';
import { useFindAllReviewEvidenceRuler } from '../../../hooks/PerformanceReview/ReviewEvidenceRuler/useFindAllReviewEvidenceRuler';
import { useFindRuleOptionEvaluationRuler } from '../../../hooks/PerformanceReview/RuleOption/useFindRuleOptionEvaluationRuler';
import { AuthContext } from '../../../contexts/AuthContext';
import { useFindReviewEvidenceRulerPerformanceReview } from '../../../hooks/PerformanceReview/ReviewEvidenceRuler/useFindReviewEvidenceRulerPerformanceReview';
import { useFindCaptionOptionByCaptionType } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionType";
import { useFindCaptionOptionByCaptionId } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId";
import { initialStateReviewScaleAndCriteriaForm, reviewScaleAndCriteriaFormReducer } from '../../../reducers/ReviewForms/ReviewScaleAndCriteriaFormReducer'
import useCreatePerformanceReviewAnswer from "../../../hooks/PerformanceReview/ReviewAnswer/useCreatePerformanceReviewAnswer";

export function AppraisalsSkillsRegister() {

    const [reviewObjective, setReviewObjective] = useState('');

    const quillRef = useRef(null);

    const {
        performanceReviewData,
        reviewedIdOnPerformanceReview,
        reviewerIdOnPerformanceReview,
        performanceReviewParticipationData,
        handlePerformanceIdStatusCleanupToUpdate
    } = useContext(ReviewContext);

    const {
        handleValidateAddReviewAnswerForm
    } = useCreatePerformanceReviewAnswer();

    const handleBackToList = () => {
        handlePerformanceIdStatusCleanupToUpdate();
    };

    const { authenticationDataLoggedInUser } = useContext(AuthContext);

    const userLoggedId = authenticationDataLoggedInUser?.data?.id;

    const [performanceAppraisalData, setPerformanceAppraisalData] = useState(null);

    const [reviewRulerofPerformance, setReviewRulerofPerformance] = useState([]);

    const [reviewRulerId, setReviewRulerId] = useState(null);

    const [performanceEvidenceData, setPerformanceEvidenceData] = useState([]);

    const [performanceSkillTypeData, setPerformanceSkillTypeData] = useState([]);

    const [performanceEvaluationRolerData, setPerformanceEvaluationRolerData] = useState([]);

    const [performanceRuleOptionData, setPerformanceRuleOptionData] = useState([]);

    const [performanceReviewEvidenceRulerData, setPerformanceReviewEvidenceRulerData] = useState([]);

    const [occupationalGroupsData, setOccupationalGroupsData] = useState([]);

    const [skillClassificationsData, setSkillClassificationsData] = useState([]);

    const [evidencias, setEvidencias] = useState([]);

    const [options, setOptions] = useState([]);

    const [newGroupedData, setNewGroupedData] = useState([]);

    const [combinedData, setCombinedData] = useState([]);

    const [detailedRulerTypeData, setDetailedRulerTypeData] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState({});

    const [state, dispatch] = useReducer(reviewScaleAndCriteriaFormReducer, initialStateReviewScaleAndCriteriaForm);

    // Busca pelos dados da Avaliação de Desempenho a ser executada do Contexto
    useEffect(() => {
        const fetchPerformanceAppraisal = async () => {
            if (!performanceAppraisalData) {
                setPerformanceAppraisalData(performanceReviewData);
            }
        };
        if (performanceReviewData.id) {
            fetchPerformanceAppraisal();
        }
    }, [performanceReviewData]);

    // Busca pelos dados de todos as (RéguaID, EvidênciaID, CompetêmciaID) de Avaliação de Desempenho cadastrados
    useEffect(() => {
        const fetchPerformanceAppraisal = async () => {
            if (!performanceAppraisalData) {
                const foundAppraisal = await useFindReviewEvidenceRulerPerformanceReview(performanceReviewData.id);
                setReviewRulerofPerformance(foundAppraisal);

                if (foundAppraisal.length > 0) {
                    setReviewRulerId(foundAppraisal[0].reviewRulerId);
                }
            }
        };

        if (performanceReviewData.id) {
            fetchPerformanceAppraisal();
        }
    }, [performanceReviewData]);

    // Busca pelos dados de todos as Réguas de Avaliação de Desempenho cadastrados
    useEffect(() => {
        const fetchReviewEvidenceRuler = async () => {
            const foundReviewEvidenceRuler = await useFindAllReviewEvidenceRuler();
            setPerformanceReviewEvidenceRulerData(foundReviewEvidenceRuler);
        };
        if (performanceReviewData.id) {
            fetchReviewEvidenceRuler();
        }
    }, [performanceReviewData]);

    // Busca pelos dados de todos os Grupos Ocupacionais cadastrados
    useEffect(() => {
        const fetchOccupationalGroups = async () => {
            const foundOccupationalGroups = await useFindAllOccupationalGroups();
            setOccupationalGroupsData(foundOccupationalGroups);
        };
        if (performanceReviewData.id) {
            fetchOccupationalGroups();
        }
    }, [performanceReviewData]);

    // Busca pelos dados de todos as Classificações de Competências cadastradas
    useEffect(() => {
        const fetchSkillClassifications = async () => {
            const foundSkillClassifications = await useFindAllSkillClassifications();
            setSkillClassificationsData(foundSkillClassifications);
        };
        if (performanceReviewData.id) {
            fetchSkillClassifications();
        }
    }, [performanceReviewData]);

    // Memoriza o conteúdo para criação da Avaliação de Desempenho 
    const performanceReviewCreationContentData = useMemo(() => {
        return performanceReviewEvidenceRulerData.filter(
            (evidenceRuler) =>
                Number(evidenceRuler.performanceReviewId) === Number(performanceReviewData.id)
        );
    }, [performanceReviewEvidenceRulerData, performanceReviewData]);

    // Recupera todas as opções da régua pelo evaluation-ruler ID
    useEffect(() => {
        if (performanceReviewCreationContentData.length > 0) {
            Promise.all(
                performanceReviewCreationContentData.map((evidenceRuler) =>
                    useFindRuleOptionEvaluationRuler(evidenceRuler.reviewRulerId)
                )
            )
                .then((details) => setPerformanceRuleOptionData(details))
                .catch((error) =>
                    console.error("Erro ao buscar opções :", error)
                );
        } else {
            setPerformanceRuleOptionData([]);
        }
    }, [performanceReviewCreationContentData.length]);

    // Recupera a régua de Avaliação de Desempenho pelo ID
    useEffect(() => {
        if (performanceReviewCreationContentData.length > 0) {
            Promise.all(
                performanceReviewCreationContentData.map((evidenceRuler) =>
                    useFindEvaluationRoler(evidenceRuler.reviewRulerId)
                )
            )
                .then((details) => setPerformanceEvaluationRolerData(details))
                .catch((error) =>
                    console.error("Erro ao buscar as evidências comportamentais :", error)
                );
        } else {
            setPerformanceEvaluationRolerData([]);
        }
    }, [performanceReviewCreationContentData.length]);

    // Recupera a evidencia da Avaliação de Desempenho pelo ID
    useEffect(() => {
        if (performanceReviewCreationContentData.length > 0) {
            Promise.all(
                performanceReviewCreationContentData.map((evidenceRuler) =>
                    useFindEvidences(evidenceRuler.reviewEvidenceId)
                )
            )
                .then((details) => setPerformanceEvidenceData(details))
                .catch((error) =>
                    console.error("Erro ao buscar evidências :", error)
                );
        } else {
            setPerformanceEvidenceData([]);
        }
    }, [performanceReviewCreationContentData.length]);

    // Recupera um tipo de competência da Avaliação de Desempenho pelo ID
    useEffect(() => {
        if (performanceReviewCreationContentData.length > 0) {
            Promise.all(
                performanceReviewCreationContentData.map((evidenceRuler) =>
                    useFindSkillType(evidenceRuler.reviewCompetenceId)
                )
            )
                .then((details) => setPerformanceSkillTypeData(details))
                .catch((error) =>
                    console.error("Erro ao buscar competências :", error)
                );
        } else {
            setPerformanceSkillTypeData([]);
        }
    }, [performanceReviewCreationContentData.length]);

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
                                placeholder: "...",
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

    // Obtém os Tipos de Régua de Avaliação de Desempenho com os dados da API
    useEffect(() => {
        if (!Array.isArray(performanceEvaluationRolerData)) {
            setEvidencias([]);
            return;
        }

        const novasEvidencias = performanceEvaluationRolerData.reduce((acc, item) => {
            if (item?.ruleType) {
                acc.push(item.ruleType);
            }
            return acc;
        }, []);

        setEvidencias(novasEvidencias);
    }, [performanceEvaluationRolerData]);

    useEffect(() => {
        if (!Array.isArray(performanceRuleOptionData)) {
            setOptions([]);
            return;
        }

        const newOptions = [];

        performanceRuleOptionData.forEach(innerArray => {
            if (Array.isArray(innerArray)) {
                innerArray.forEach(item => {
                    if (item?.label) {
                        newOptions.push(item.label);
                    }
                });
            }
        });

        setOptions(newOptions);
    }, [performanceRuleOptionData]);

    // Processa e reorganiza os dados de competências profissionais em uma estrutura hierárquica agrupada 
    useEffect(() => {
        // Verifica se todos os arrays necessários estão disponíveis
        if (
            !Array.isArray(occupationalGroupsData) ||
            !Array.isArray(skillClassificationsData) ||
            !Array.isArray(performanceSkillTypeData) ||
            !Array.isArray(performanceEvidenceData)
        ) {
            setNewGroupedData([]);
            return;
        }

        // Inicia o agrupamento pelos grupos ocupacionais
        const grouped = occupationalGroupsData.map((group) => {
            const { id: groupId, competencieName: groupName } = group;

            // Filtra habilidades pertencentes a este grupo ocupacional
            const groupSkills = (performanceSkillTypeData || []).filter(
                (skill) => Number(skill?.occupationalGroupId) === Number(groupId)
            );

            // Para cada grupo, mapeia as classificações de habilidades
            const classificationData = skillClassificationsData.map((classification) => {
                const { id: classificationId, competenceClassificationName } = classification;

                // Filtra as habilidades dessa classificação específica
                const classificationSkills = groupSkills.filter(
                    (skill) => Number(skill.skillClassificationId) === Number(classificationId)
                );

                // Para cada habilidade, adiciona suas evidências
                const skillsWithEvidences = classificationSkills.map((skill) => {
                    const evidences = performanceEvidenceData.filter(
                        (evidence) => Number(evidence.evidenceName) === Number(skill.id)
                    );
                    return { ...skill, evidences };
                });

                // Retorna o objeto de classificação com suas habilidades e evidências
                return {
                    classificationId,
                    classificationName: competenceClassificationName,
                    skills: skillsWithEvidences,
                };
            });

            return {
                groupId,
                groupName,
                classificationData
            };
        });

        // Atualiza o estado com os dados agrupados
        setNewGroupedData(grouped);
    }, [performanceEvidenceData, occupationalGroupsData, skillClassificationsData, performanceSkillTypeData]);

    // Agrupa as Evidências e Réguas de Avaliação às Competências avaliadas 
    useEffect(() => {
        // Verifica se todos os arrays necessários existem
        if (
            !Array.isArray(performanceEvidenceData) ||
            !Array.isArray(performanceEvaluationRolerData) ||
            !Array.isArray(performanceRuleOptionData)
        ) {
            setCombinedData([]);
            return;
        }

        // Combina os dados mapeando cada item de evidência
        const newCombined = performanceEvidenceData.map((evidence, index) => {
            const evaluationRoler = performanceEvaluationRolerData[index];
            const ruleOptions = performanceRuleOptionData[index];

            return {
                evidence,
                evaluationRoler,
                ruleOptions,
                skillTypes: newGroupedData
            };
        });

        // Atualiza o estado com os dados combinados
        setCombinedData(newCombined);
    }, [
        performanceEvidenceData,
        performanceEvaluationRolerData,
        performanceRuleOptionData,
        newGroupedData
    ]);

    // Busca Opções de Régua (caption options) associadas a um ruler (Régua) específica
    const fetchCaptionOption = async (rulers) => {
        let updatedRulers = [];
        // Converte rulers para um array se não for um array
        if (!Array.isArray(rulers)) {
            rulers = [rulers];
        }
        updatedRulers = await Promise.all(
            rulers.map(async (ruler) => {
                try {
                    const rulerOptionData = await useFindCaptionOptionByCaptionId(ruler.id);
                    //Cria um novo objeto combinando os dados da Régua original com as Opções encontradas
                    return {
                        ...ruler,
                        options: rulerOptionData
                    };
                } catch (error) {
                    console.error(`Error fetching ruler options data for id ${ruler.id}:`, error);
                    return {
                        ...ruler,
                        options: 'Unknown',
                    };
                }
            })
        );
        setDetailedRulerTypeData(updatedRulers);
    };

    const fetchCapitons = async () => {
        if (!detailedRulerTypeData.length) {
            try {
                // Encontre o objeto no array que corresponde ao Tipo de Régua Selecionada (selectedRulerType)
                const foundRuler = state.reviewScaleAndCriteriaData.rulerTypeDataList.find(ruler => ruler.id === String(reviewRulerId));
                if (foundRuler) {

                    // Pega o valor do campo 'text' correspondente
                    const captionType = foundRuler.text;
                    //Busca a Régua usando o Tipo de Régua
                    const foundCaption = await useFindCaptionOptionByCaptionType(captionType);
                    await fetchCaptionOption(foundCaption);
                } else {
                    console.error('Ruler type not found');
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
    };

    // Busca as Opções de Régua baseadas em um ID de Régua específico
    useEffect(() => {
        if (reviewRulerId != null) {
            fetchCapitons();
        }
    }, [reviewRulerId]);

    // Função para limpar HTML
    function stripHtmlTags(html) {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '');
    }

    const reviewObjectiveText = stripHtmlTags(performanceAppraisalData?.reviewObjective);

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

    const handleSalvar = async () => {
        const reviewParticipantComment = document.getElementById("validationReviewParticipantComment")?.innerText.trim() || "";
        const finalData = {

            performanceReview: performanceReviewData.id,
            evaluationRulerId: performanceReviewData.reviewRulerId,
            reviewParticipantId: reviewerIdOnPerformanceReview.id || userLoggedId,
            // reviewedIdOnPerformanceReview: reviewedIdOnPerformanceReview.id,
            // reviewerIdOnPerformanceReview: reviewerIdOnPerformanceReview.id || userLoggedId,
            answeredAsLeaderOf: null,
            answeredAsSelfEvaluationOf: null,
            answeredAsPairOf: null,
            reviewParticipantComment: reviewParticipantComment
        };

        newGroupedData.forEach((group) => {
            const occupationalGroup = {
                occupationalGroup: group.groupName,
                skillClassification: []
            };

            group.classificationData.forEach((classification) => {
                const classificationEntry = {
                    classificationId: classification.classificationId,
                    classificationName: classification.classificationName,
                    skills: []
                };

                classification.skills.forEach((skill) => {
                    const evidences = skill.evidences
                        .map((evidence) => {
                            const status = selectedStatus[evidence.id];
                            if (status) {
                                return {
                                    evidenceId: evidence.id,
                                    selectedOption: status.selectedOption,
                                    weight: status.weight
                                };
                            }
                            return null;
                        })
                        .filter((item) => item !== null);

                    if (evidences.length > 0) {
                        classificationEntry.skills.push({
                            competenceId: skill.id,
                            description: skill.competencieTypeName || "",
                            evidences: evidences
                        });
                    }
                });

                if (classificationEntry.skills.length > 0) {
                    occupationalGroup.skillClassification.push(classificationEntry);
                }
            });

            if (occupationalGroup.skillClassification.length > 0) {
                if (reviewerIdOnPerformanceReview.reviewAs === 'Líder') {
                    return finalData.answeredAsLeaderOf = { reviewedIdOnPerformanceReview: reviewedIdOnPerformanceReview.id, occupationalGroup }
                }
                if (reviewerIdOnPerformanceReview.reviewAs === 'Autoavaliação') {
                    return finalData.answeredAsSelfEvaluationOf = { reviewerIdOnPerformanceReview: reviewerIdOnPerformanceReview.id || userLoggedId, occupationalGroup }
                }
                if (reviewerIdOnPerformanceReview.reviewAs === 'Par') {
                    return finalData.answeredAsPairOf = { reviewedIdOnPerformanceReview: reviewedIdOnPerformanceReview.id, occupationalGroup }
                }
            }
        });

        await handleValidateAddReviewAnswerForm(finalData);
    };

    const handleLimpar = () => {
        const objectiveField = document.querySelector("#validationReviewParticipantComment .ql-editor");
        if (objectiveField) {
            objectiveField.innerHTML = "<p><br></p>";
        }

        const newSelectedStatus = { ...selectedStatus };

        performanceEvidenceData.forEach((evidence) => {
            if (newSelectedStatus[evidence.id]) {
                newSelectedStatus[evidence.id] = {
                    selectedOption: null,
                    weight: null
                };
            }
        });

        setSelectedStatus(newSelectedStatus);
    };

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">{performanceAppraisalData?.reviewName}</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-7" md="12">
                            <label htmlFor="validationDescriptionReviewObjective">
                                Objetivo
                            </label>
                            <p>{reviewObjectiveText}</p>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="8">
                            <label
                                htmlFor="validationCustom01"
                            >
                                Avaliador
                            </label>
                            <div className="mt-1 mb-3">
                                <span className="name text-sm">
                                    {reviewerIdOnPerformanceReview.name}
                                </span>
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                htmlFor="validationCustom05"
                            >
                                Cargo
                            </label>
                            <div className="mt-1 mb-3">
                                <span className="name text-sm">
                                    {reviewerIdOnPerformanceReview.roleName || ''}
                                </span>
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="8">
                            <label
                                htmlFor="validationCustom01"
                            >
                                Avaliado
                            </label>
                            <div className="mt-1 mb-3">
                                <span className="name text-sm">
                                    {reviewedIdOnPerformanceReview.name}
                                </span>
                            </div>
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                htmlFor="validationCustom05"
                            >
                                Cargo
                            </label>
                            <div className="mt-1 mb-3">
                                <span className="name text-sm">
                                    {reviewedIdOnPerformanceReview.roleName || ''}
                                </span>
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <label htmlFor="validationPDIStatus">
                                Legenda
                            </label>
                            {detailedRulerTypeData && detailedRulerTypeData.length > 0 ? (
                                detailedRulerTypeData.map((rulerType) => (
                                    <CardBody className="py-1" key={rulerType.id}>
                                        <Row>
                                            <Col className="my-2" md="4">
                                                <Row>
                                                    <Col>
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
                                                {rulerType.options && rulerType.options.length > 0 ? (
                                                    rulerType.options.map((option, index) => (
                                                        <Card key={index} className="bg-orange m-2" style={{ width: 96, height: 96 }}>
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
                                    </CardBody>
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
                    <div>
                        {newGroupedData.map((group) => {
                            const hasSkills = group.classificationData.some(
                                (c) => c.skills && c.skills.length > 0
                            );
                            if (!hasSkills) return null;

                            return (
                                <Card key={group.groupId} className="mb-4">
                                    <CardHeader>
                                        Grupo Ocupacional: {group.groupName || "Sem grupo"}
                                    </CardHeader>
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
                                                        const relevantItems = combinedData.filter(
                                                            (cd) =>
                                                                Number(cd.evidence?.evidenceName) === Number(skill.id)
                                                        );
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
                                                        return relevantItems.map((ri, idx) => (
                                                            <Card key={`${skill.id}-${idx}`} className="mb-3">
                                                                <CardHeader>
                                                                    {skill.competencieTypeName || "Não Encontrado"}
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <table className="table table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Evidência Comportamental</th>
                                                                                {(ri.ruleOptions || []).map((option, i) => (
                                                                                    <th key={i} className="text-center">{option.label}</th>
                                                                                ))}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>{idx + 1}. {ri.evidence?.description || "Não Encontrado"}</td>
                                                                                {(ri.ruleOptions || []).map((option, j) => (
                                                                                    <td key={j} align="center">
                                                                                        <input
                                                                                            type="radio"
                                                                                            name={`status-${ri.evidence?.id}`}
                                                                                            value={option.label}
                                                                                            checked={
                                                                                                selectedStatus[ri.evidence?.id]
                                                                                                    ?.selectedOption === option.label
                                                                                            }
                                                                                            onChange={(e) =>
                                                                                                handleRadioChange(
                                                                                                    e,
                                                                                                    ri.evidence?.id,
                                                                                                    option.weight,
                                                                                                    ri.evaluationRoler.id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </td>
                                                                                ))}
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </CardBody>
                                                            </Card>
                                                        ));
                                                    })}
                                                </div>
                                            ))}
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                    <div className="form-row">
                        <Col className="mb-7" md="12">
                            <label
                                htmlFor="validationReviewParticipantComment"
                                className="text-justify"
                            >
                                Utilize o espaço abaixo para expor comentários, sugestões, críticas e/ou outras informações adicionais, que ainda não foram mencionados acima. Indique também ações e/ou treinamentos que, na sua opinião, poderão contribuir para o desenvolvimento profissional do avaliado. Sua franqueza contribuirá para a confecção do plano de desenvolvimento dele.
                            </label>
                            <div
                                data-quill-placeholder="..."
                                data-toggle="quill"
                                id="validationReviewParticipantComment"
                            />
                            <div className="valid-feedback">Parece bom!</div>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                </Form>
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