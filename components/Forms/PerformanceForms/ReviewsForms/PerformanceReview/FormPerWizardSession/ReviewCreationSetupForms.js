import {
    Card,
    CardBody,
    Form,
    Input,
    Col,
    CardHeader,
    Row,
} from "reactstrap";
import PageChange from "../../../../../PageChange/PageChange";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import { initialStateReviewGenerationSetupForm, reviewGenerationSetupFormReducer } from '../../../../../../reducers/ReviewForms/ReviewCreationSetupFormReducer';
import { resetFormAndLocalStorage } from "../../../../../../util/resetReviewFormData";

export function ReviewCreationSetupForm() {

    const [state, dispatch] = useReducer(reviewGenerationSetupFormReducer, initialStateReviewGenerationSetupForm);

    const latestReviewGenerationSetupData = useRef(state.reviewGenerationSetupData);

    const [isLoadingReviewGenerationSetupData, setIsLoadingReviewGenerationSetupData] = useState(true);

    const {
        selectedReview,
        clearStepIndex,
        handleClearStepIndex,
        stateGlobalReviewReducer,
        dispatchGlobalReviewReducer
    } = useContext(ModelSelectionReviewContext);

    // Ref para armazenar o estado anterior em formato de string
    const previousStateRef = useRef(null);

    const handleAutoSendEmailNotifications = () => {
        dispatch({
            type: 'SET_AUTO_SEND_EMAIL_NOTIFICATIONS',
            payload: !state.reviewGenerationSetupData.autoSendEmailNotifications
        });
    }

    const handleEvaluatorCommentsOnMandatoryCriteria = () => {
        dispatch({
            type: 'SET_EVALUATOR_COMMENTS_ON_MANDATORY_CRITERIA',
            payload: !state.reviewGenerationSetupData.evaluatorCommentsOnMandatoryCriteria
        });
    }

    const handleAppraiseeCommentsOnMandatoryCriteria = () => {
        dispatch({
            type: 'SET_APPRAISEE_COMMENTS_ON_MANDATORY_CRITERIA',
            payload: !state.reviewGenerationSetupData.appraiseeCommentsOnMandatoryCriteria
        });
    }

    const handleEditAnswersOnReviewsCarriedOut = () => {
        dispatch({
            type: 'SET_EDIT_ANSWERS_ON_REVIEWS_CARRIED_OUT',
            payload: !state.reviewGenerationSetupData.editAnswersOnReviewsCarriedOut
        });
    }

    const handleReportFeedbackStatus = () => {
        dispatch({
            type: 'SET_REPORT_FEEDBACK_STATUS',
            payload: !state.reviewGenerationSetupData.reportFeedbackStatus
        });
    }

    const handleReportFeedbackStatusToManager = () => {
        dispatch({
            type: 'SET_REPORT_FEEDBACK_STATUS_TO_MANAGER',
            payload: !state.reviewGenerationSetupData.reportFeedbackStatusToManager
        });
    }

    const handleReportFeedbackStatusToParticipants = () => {
        dispatch({
            type: 'SET_REPORT_FEEDBACK_STATUS_TO_PARTICIPANTS',
            payload: !state.reviewGenerationSetupData.reportFeedbackStatusToParticipants
        });
    }

    const handleAutoSendReviewResultsToManagers = () => {
        dispatch({
            type: 'SET_AUTO_SEND_REVIEW_RESULTS_TO_MANAGERS',
            payload: !state.reviewGenerationSetupData.autoSendReviewResultsToManagers
        });
    }

    const handleApplyLeadershipCriteriaToUser = () => {
        dispatch({
            type: 'SET_APPLY_LEADERSHIP_CRITERIA_TO_USER',
            payload: !state.reviewGenerationSetupData.applyLeadershipCriteriaToUser
        });
    }

    const handleApplyLeadershipCriteriaToUserManagers = () => {
        dispatch({
            type: 'SET_APPLY_LEADERSHIP_CRITERIA_TO_USER_MANAGERS',
            payload: !state.reviewGenerationSetupData.applyLeadershipCriteriaToUserManagers
        });
    }

    const handleApplyLeadershipCriteriaToUserParticipants = () => {
        dispatch({
            type: 'SET_APPLY_LEADERSHIP_CRITERIA_TO_USER_PARTICIPANTS',
            payload: !state.reviewGenerationSetupData.applyLeadershipCriteriaToUserParticipants
        });
    }

    const handleParticipantsResultsToManagersPreview = () => {
        dispatch({
            type: 'SET_PARTICIPANTS_RESULTS_TO_MANAGERS_PREVIEW',
            payload: !state.reviewGenerationSetupData.participantsResultsToManagersPreview
        });
    }

    const handleConceptualResults = () => {
        dispatch({
            type: 'SET_CONCEPTUAL_RESULTS',
            payload: !state.reviewGenerationSetupData.conceptualResults
        });
    }

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem('reviewGenerationSetupData', JSON.stringify(data));
    };

    // Execute o carregamento dos dados ao montar o componente
    useEffect(() => {
        // Função para carregar os dados do localStorage
        const loadReviewGenerationSetupData = async () => {
            try {
                const rawData = localStorage.getItem('reviewGenerationSetupData');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && typeof parsedData === 'object') {
                        dispatch({
                            type: 'LOAD_SAVED_REVIEW_DATA',
                            payload: { ...parsedData },
                        });
                        latestReviewGenerationSetupData.current = parsedData; // Atualiza a ref para os dados carregados
                    }
                } else {
                    dispatch({ type: 'RESET_REVIEW_STATE' }); // Limpa o estado para evitar inconsistências
                }
            } catch (error) {
                console.error('Failed to parse reviewGenerationSetupData from localStorage:', error);
            } finally {
                setIsLoadingReviewGenerationSetupData(false); // Marque como carregado
            }
        };

        loadReviewGenerationSetupData();
    }, []);

    // Salvar no Contexto Global antes de sair
    useEffect(() => {
        return () => {
            dispatchGlobalReviewReducer({
                type: "UPDATE_REVIEW_SETUP",
                payload: state.reviewGenerationSetupData,
            });
        };
    }, [state.reviewGenerationSetupData, dispatchGlobalReviewReducer]);

    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(state.reviewGenerationSetupData);

        if (previousStateRef.current !== currentStateString) {
            previousStateRef.current = currentStateString;
            latestReviewGenerationSetupData.current = { ...state.reviewGenerationSetupData };
            saveDataToLocalStorage(state.reviewGenerationSetupData);

        }
    }, [state.reviewGenerationSetupData]);

    useEffect(() => {
        if (clearStepIndex === 4) {
            resetFormAndLocalStorage(
                true,
                4,
                clearStepIndex,
                'reviewGenerationSetupData',
                'RESET_REVIEW_DATA',
                handleClearStepIndex,
                dispatch);
        }
    }, [clearStepIndex, dispatch]);

    if (isLoadingReviewGenerationSetupData) {
        return (
            <PageChange />
        );
    }

    return (
        <Form>
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Configuraçöes</h3>
                </CardHeader>
                <CardBody>
                    <div className="mb-4">
                        <h6 className="heading-small text-muted mb-4">
                            Notificações
                        </h6>
                        <div>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.autoSendEmailNotifications}
                                            onChange={handleAutoSendEmailNotifications}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Enviar automaticamente notificações por email aos usuários
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h6 className="heading-small text-muted mb-4">
                            Comentários
                        </h6>
                        <div>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.evaluatorCommentsOnMandatoryCriteria}
                                            onChange={handleEvaluatorCommentsOnMandatoryCriteria}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Exigir comentários dos avaliadores nos critários obrigatórios
                                    </p>
                                </Col>
                            </Row>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.appraiseeCommentsOnMandatoryCriteria}
                                            onChange={handleAppraiseeCommentsOnMandatoryCriteria}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Exigir comentários dos participantes na autoavaliação nos critérios obrigatórios
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h6 className="heading-small text-muted mb-4">
                            Edição de respostas
                        </h6>
                        <div>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.editAnswersOnReviewsCarriedOut}
                                            onChange={handleEditAnswersOnReviewsCarriedOut}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Permitir a edição das respostas nas avalaições realizadas
                                    </p>
                                </Col>
                                <p className="text-muted text-sm mb-0">
                                    As pessoas poderão edtar suas respostas após enviá-las, desde que o resultado não tenha sido entregue para o gestor ou participante e se ainda dentro do prazo de resposta definido para esta avaliação.
                                </p>
                            </Row>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h6 className="heading-small text-muted mb-4">
                            Devolutivas
                        </h6>
                        <div>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.reportFeedbackStatus}
                                            onChange={handleReportFeedbackStatus}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Permitir que o status da devolutiva seja informado
                                    </p>
                                </Col>
                                <p className="text-muted text-sm mb-0">
                                    A sinalizaçäo de realização dea devolutiva é apenas uma forma de registrar que o alinhamento de expectativas e feedbacks, entre gestor e participante, de fato ocorreu. Näo impede a visualizaçäo do resultado da avaliaçäo.
                                </p>
                            </Row>
                            <Row className="pt-4">
                                <Col md="4">
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            className="custom-control-input"
                                            id="reportFeedbackStatusToParticipants"
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.reportFeedbackStatusToParticipants}
                                            onChange={handleReportFeedbackStatusToParticipants}

                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="reportFeedbackStatusToParticipants"
                                        >
                                            Participantes
                                        </label>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            className="custom-control-input"
                                            id="reportFeedbackStatusToManager"
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.reportFeedbackStatusToManager}
                                            onChange={handleReportFeedbackStatusToManager}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="reportFeedbackStatusToManager"

                                        >
                                            Gestores
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h6 className="heading-small text-muted mb-4">
                            Gestores
                        </h6>
                        <div>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.autoSendReviewResultsToManagers}
                                            onChange={handleAutoSendReviewResultsToManagers}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Enviar automaticamente aos gestores o resultado da avaliaçäo
                                    </p>
                                </Col>
                                <p className="text-muted text-sm mb-0">
                                    O resultado será enviado após todos os avaliadores responderem à avaliaçäo
                                </p>
                            </Row>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.applyLeadershipCriteriaToUser}
                                            onChange={handleApplyLeadershipCriteriaToUser}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Aplicar critérios de liderança aos usuários que possuem papel de gestäo no Skillfy
                                    </p>
                                </Col>
                                <p className="text-muted text-sm mb-0">
                                    A avaliaçäo só ocorrerá para aquelas pessoas que ainda náo iniciaram a avaliaçäo. Para incluir pessoas que já iniciaram é necessário ativar a configuraçäo de ediçäo de respostas.
                                </p>
                            </Row>
                            <Row className="pt-4">
                                <Col md="4">
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            className="custom-control-input"
                                            id="LeadershipCriteriaToUserParticipants"
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.applyLeadershipCriteriaToUserParticipants}
                                            onChange={handleApplyLeadershipCriteriaToUserParticipants}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="LeadershipCriteriaToUserParticipants"
                                        >
                                            Participantes
                                        </label>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            className="custom-control-input"
                                            id="LeadershipCriteriaToUserManagers"
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.applyLeadershipCriteriaToUserManagers}
                                            onChange={handleApplyLeadershipCriteriaToUserManagers}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="LeadershipCriteriaToUserManagers"
                                        >
                                            Gestores
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.participantsResultsToManagersPreview}
                                            onChange={handleParticipantsResultsToManagersPreview}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Exibir prévia do resultado dos participantes aos gestores
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h6 className="heading-small text-muted mb-4">
                            Resultado final
                        </h6>
                        <div>
                            <Row className="py-3 px-3 align-items-center justify-content-start">
                                <Col sm="1">
                                    <label className="custom-toggle mr-1">
                                        <input
                                            type="checkbox"
                                            checked={state.reviewGenerationSetupData.conceptualResults}
                                            onChange={handleConceptualResults}
                                        />
                                        <span
                                            className="custom-toggle-slider rounded-circle"
                                            data-label-off="No"
                                            data-label-on="Yes"
                                        />
                                    </label>
                                </Col>
                                <Col sm="11">
                                    <p className="text-muted mb-0">
                                        Exibir resultados em forma de conceito
                                    </p>
                                </Col>
                                <p className="text-muted text-sm mb-0">
                                    As notas númericas seräo ocultas no resultado final, sendo substituidas pelo conceito correspondente.
                                </p>
                            </Row>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Form >
    );
}