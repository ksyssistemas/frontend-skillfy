import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// plugin that creates slider
import Slider from "nouislider";
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
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import useCreatePerformanceReview from "../../../../../../hooks/PerformanceReview/useCreatePerformanceReview";
import { handleDateFormatting } from "../../../../../../util/handleDateFormatting";

export function ReviewModelAndDeadlineForm({ updateSessionData, sessionData = {} }) {

    const {
        hasPerformanceReviewOfLeaders,
        deadlineToLeadersToRespondToPerformanceReview,
        hasSelfReviewOfPerformance,
        deadlineToRespondToPerformanceSelfReview,
        hasPerformanceReviewOfEvaluators,
        deadlineToEvaluatorsToRespondToPerformanceReview,
        weightOfPerformanceReviewOfLeaders,
        weightOfSelfReviewOfPerformance,
        weightOfEvaluatorsPerformanceReview,
        isFullPerformanceReviewWeigth,
        setHasPerformanceReviewOfLeaders,
        setDeadlineToLeadersToRespondToPerformanceReview,
        setHasSelfReviewOfPerformance,
        setDeadlineToRespondToPerformanceSelfReview,
        setHasPerformanceReviewOfEvaluators,
        setDeadlineToEvaluatorsToRespondToPerformanceReview,
        setWeightOfPerformanceReviewOfLeaders,
        setWeightOfSelfReviewOfPerformance,
        setWeightOfEvaluatorsPerformanceReview,
        setIsFullPerformanceReviewWeigth,
    } = useCreatePerformanceReview();

    // Referências para os valores anteriores
    const prevStateRef = useRef({
        hasPerformanceReviewOfLeaders: sessionData.hasPerformanceReviewOfLeaders || true,
        deadlineToLeadersToRespondToPerformanceReview: sessionData.deadlineToLeadersToRespondToPerformanceReview || true,
        hasSelfReviewOfPerformance: sessionData.hasSelfReviewOfPerformance || null,
        deadlineToRespondToPerformanceSelfReview: sessionData.deadlineToRespondToPerformanceSelfReview || null,
        hasPerformanceReviewOfEvaluators: sessionData.hasPerformanceReviewOfEvaluators || null,
        deadlineToEvaluatorsToRespondToPerformanceReview: sessionData.deadlineToEvaluatorsToRespondToPerformanceReview || true
    });

    const [selectedPeriod, setSelectedPeriod] = useState('');

    const { selectedReview,
        handleSelectedReview,
        handleCleanlinessReviewSelection
    } = useContext(ModelSelectionReviewContext);

    // Função para lidar com a mudança do checkbox
    const handleCheckboxHasPerformanceReviewOfLeadersChange = () => {
        setHasPerformanceReviewOfLeaders(prevState => !prevState);
    };
    // Função para lidar com a mudança do checkbox
    const handleCheckboxHasSelfReviewOfPerformanceChange = () => {
        setHasSelfReviewOfPerformance(prevState => !prevState);
    };
    // Função para lidar com a mudança do checkbox
    const handleCheckboxHasPerformanceReviewOfEvaluatorsChange = () => {
        setHasPerformanceReviewOfEvaluators(prevState => !prevState);
    };

    const handleDeadlineToLeadersToRespondToPerformanceReviewChange = (value) => {
        handleDateFormatting(value, setDeadlineToLeadersToRespondToPerformanceReview);
    };

    const handleDeadlineToRespondToPerformanceSelfReviewChange = (value) => {
        handleDateFormatting(value, setDeadlineToRespondToPerformanceSelfReview);
    };

    const handleDeadlineToEvaluatorsToRespondToPerformanceReviewChange = (value) => {
        handleDateFormatting(value, setDeadlineToEvaluatorsToRespondToPerformanceReview);
    };

    const [slider1Value, setSlider1Value] = React.useState("100.00");
    const [slider2Value, setSlider2Value] = React.useState("100.00");
    const [slider3Value, setSlider3Value] = React.useState("100.00");
    const slider1Ref = React.useRef(null);
    const slider2Ref = React.useRef(null);
    const slider3Ref = React.useRef(null);

    React.useEffect(async () => {
        Slider.create(slider1Ref.current, {
            start: [100],
            connect: [true, false],
            step: 0.01,
            range: { min: 100.0, max: 500.0 },
        }).on("update", function (values, handle) {
            setSlider1Value(values[0]);
        });
        Slider.create(slider2Ref.current, {
            start: [100],
            connect: [true, false],
            step: 0.01,
            range: { min: 100.0, max: 500.0 },
        }).on("update", function (values, handle) {
            setSlider1Value(values[0]);
        });
        Slider.create(slider3Ref.current, {
            start: [100],
            connect: [true, false],
            step: 0.01,
            range: { min: 100.0, max: 500.0 },
        }).on("update", function (values, handle) {
            setSlider1Value(values[0]);
        });
    }, []);

    // Efeito para sincronizar o estado inicial do `sessionData` com os inputs, apenas uma vez quando os dados forem carregados
    useEffect(() => {
        if (sessionData.hasPerformanceReviewOfLeaders && sessionData.hasPerformanceReviewOfLeaders !== hasPerformanceReviewOfLeaders) {
            setHasPerformanceReviewOfLeaders(sessionData.hasPerformanceReviewOfLeaders);
        }
        if (sessionData.hasSelfReviewOfPerformance && sessionData.hasSelfReviewOfPerformance !== hasSelfReviewOfPerformance) {
            setHasSelfReviewOfPerformance(sessionData.hasSelfReviewOfPerformance);
        }
        if (sessionData.hasPerformanceReviewOfEvaluators && sessionData.hasPerformanceReviewOfEvaluators !== hasPerformanceReviewOfEvaluators) {
            setHasPerformanceReviewOfEvaluators(sessionData.hasPerformanceReviewOfEvaluators);
        }

        if (sessionData.deadlineToLeadersToRespondToPerformanceReview && sessionData.deadlineToLeadersToRespondToPerformanceReview) {
            setDeadlineToLeadersToRespondToPerformanceReview(new Date(sessionData.deadlineToLeadersToRespondToPerformanceReview));
        }
        if (sessionData.deadlineToRespondToPerformanceSelfReview && sessionData.deadlineToRespondToPerformanceSelfReview) {
            setDeadlineToRespondToPerformanceSelfReview(new Date(sessionData.deadlineToRespondToPerformanceSelfReview));
        }
        if (sessionData.deadlineToEvaluatorsToRespondToPerformanceReview && sessionData.deadlineToEvaluatorsToRespondToPerformanceReview) {
            setDeadlineToEvaluatorsToRespondToPerformanceReview(new Date(sessionData.deadlineToEvaluatorsToRespondToPerformanceReview));
        }
        console.log("Dados da sessão carregados no useEffect.");
    }, [sessionData]);

    useEffect(() => {
        const prevState = prevStateRef.current;
        const currentState = {
            hasPerformanceReviewOfLeaders,
            deadlineToLeadersToRespondToPerformanceReview,
            hasSelfReviewOfPerformance,
            deadlineToRespondToPerformanceSelfReview,
            hasPerformanceReviewOfEvaluators,
            deadlineToEvaluatorsToRespondToPerformanceReview
        };

        // Verificação profunda para mudanças reais
        if (
            prevState.hasPerformanceReviewOfLeaders !== currentState.hasPerformanceReviewOfLeaders ||
            prevState.hasSelfReviewOfPerformance !== currentState.hasSelfReviewOfPerformance ||
            prevState.hasPerformanceReviewOfEvaluators !== currentState.hasPerformanceReviewOfEvaluators ||
            (prevState.deadlineToLeadersToRespondToPerformanceReview instanceof Date && currentState.deadlineToLeadersToRespondToPerformanceReview instanceof Date
                ? prevState.deadlineToLeadersToRespondToPerformanceReview.getTime() !== currentState.deadlineToLeadersToRespondToPerformanceReview.getTime()
                : prevState.deadlineToLeadersToRespondToPerformanceReview !== currentState.deadlineToLeadersToRespondToPerformanceReview) ||
            (prevState.deadlineToRespondToPerformanceSelfReview instanceof Date && currentState.deadlineToRespondToPerformanceSelfReview instanceof Date
                ? prevState.deadlineToRespondToPerformanceSelfReview.getTime() !== currentState.deadlineToRespondToPerformanceSelfReview.getTime()
                : prevState.deadlineToRespondToPerformanceSelfReview !== currentState.deadlineToRespondToPerformanceSelfReview) ||
            (prevState.deadlineToEvaluatorsToRespondToPerformanceReview instanceof Date && currentState.deadlineToEvaluatorsToRespondToPerformanceReview instanceof Date
                ? prevState.deadlineToEvaluatorsToRespondToPerformanceReview.getTime() !== currentState.deadlineToEvaluatorsToRespondToPerformanceReview.getTime()
                : prevState.deadlineToEvaluatorsToRespondToPerformanceReview !== currentState.deadlineToEvaluatorsToRespondToPerformanceReview)
        ) {
            updateSessionData('sessionTwoData', currentState);
        }

        prevStateRef.current = currentState;
        console.log("Verificação de mudança no estado profundo.");
    }, [
        hasPerformanceReviewOfLeaders,
        deadlineToLeadersToRespondToPerformanceReview,
        hasSelfReviewOfPerformance,
        deadlineToRespondToPerformanceSelfReview,
        hasPerformanceReviewOfEvaluators,
        deadlineToEvaluatorsToRespondToPerformanceReview,
        updateSessionData
    ]);

    return (
        <>
            <div className="mb-4">
                <div className="form-row d-flex">
                    <Col className="d-flex" md="6">
                        <Card className="w-100 h-auto">
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col className="col-auto" />
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Líderes
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-0">Os gestores diretos avaliarão o desempenho obtido pelos lideraos durante o período analisado</p>
                                    </div>
                                    <Col className="col-auto">
                                        <label className="custom-toggle mr-1">
                                            <input
                                                type="checkbox"
                                                checked={hasPerformanceReviewOfLeaders}
                                                onChange={handleCheckboxHasPerformanceReviewOfLeadersChange}
                                            />
                                            <span
                                                className="custom-toggle-slider rounded-circle"
                                            />
                                        </label>
                                    </Col>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="d-flex" md="6">
                        <Card className="w-100 h-auto">
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col className="col-auto" />
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Prazo de Resposta
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-0">Data limite para que os gestores da avaliação respondem à avaliação</p>
                                    </div>
                                </Row>
                                <Row className="justify-content-center align-items-center">
                                    <Col className="col-10 p-0">
                                        <ReactDatetime
                                            inputProps={{
                                                placeholder: "__/__/__",
                                            }}
                                            value={hasPerformanceReviewOfLeaders || (sessionData.hasPerformanceReviewOfLeaders && new Date(sessionData.hasPerformanceReviewOfLeaders))}
                                            timeFormat={false}
                                            onChange={handleDeadlineToLeadersToRespondToPerformanceReviewChange}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
                <div className="form-row d-flex">
                    <Col className="d-flex" md="6">
                        <Card className="w-100 h-auto">
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col className="col-auto" />
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Autoavaliação
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-0">Os participantes avaliarão seu próprio desempenho obtido durante o período analisado</p>
                                    </div>
                                    <Col className="col-auto">
                                        <label className="custom-toggle mr-1">
                                            <input
                                                type="checkbox"
                                                checked={hasSelfReviewOfPerformance}
                                                onChange={handleCheckboxHasSelfReviewOfPerformanceChange}
                                            />
                                            <span
                                                className="custom-toggle-slider rounded-circle"
                                            />
                                        </label>
                                    </Col>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="d-flex" md="6">
                        <Card className="w-100 h-auto">
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col className="col-auto" />
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Prazo de Resposta
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-0">Data limite para que os participantes respondam à avaliação</p>
                                    </div>
                                </Row>
                                <Row className="justify-content-center align-items-center">
                                    <Col className="col-10 p-0">
                                        <ReactDatetime
                                            inputProps={{
                                                placeholder: "__/__/__",
                                            }}
                                            value={hasSelfReviewOfPerformance || (sessionData.hasSelfReviewOfPerformance && new Date(sessionData.hasSelfReviewOfPerformance))}
                                            timeFormat={false}
                                            onChange={handleDeadlineToRespondToPerformanceSelfReviewChange}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
                <div className="form-row d-flex">
                    <Col className="d-flex" md="6">
                        <Card className="w-100 h-auto">
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col className="col-auto" />
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Avaliadores
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-0">Os avaliadores podem ser pares do participante, liderados ou avaliadores externos, que avaliarão o desempenho obtido peos participantes durante o páriodo analisado</p>
                                    </div>
                                    <Col className="col-auto">
                                        <label className="custom-toggle mr-1">
                                            <input
                                                type="checkbox"
                                                checked={hasPerformanceReviewOfEvaluators}
                                                onChange={handleCheckboxHasPerformanceReviewOfEvaluatorsChange}
                                            />
                                            <span
                                                className="custom-toggle-slider rounded-circle"
                                            />
                                        </label>
                                    </Col>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="d-flex" md="6">
                        <Card className="w-100 h-auto">
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col className="col-auto" />
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Prazo de Resposta
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-0">Data limite para que os avaliadores respondam à avaliação</p>
                                    </div>
                                </Row>
                                <Row className="justify-content-center align-items-center">
                                    <Col className="col-10 p-0">
                                        <ReactDatetime
                                            inputProps={{
                                                placeholder: "__/__/__",
                                            }}
                                            value={hasPerformanceReviewOfEvaluators || (sessionData.hasPerformanceReviewOfEvaluators && new Date(sessionData.hasPerformanceReviewOfEvaluators))}
                                            timeFormat={false}
                                            onChange={handleDeadlineToEvaluatorsToRespondToPerformanceReviewChange}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Peso das Avaliações</h3>
                </CardHeader>
                <CardBody>
                    <div className="mb-4">
                        <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationReviewName"
                                >
                                    Líderes
                                </label>
                                <Form>
                                    <div className="input-slider-container">
                                        <div className="input-slider" ref={slider1Ref} />
                                        <Row className="mt-3">
                                            <Col xs="6">
                                                <span className="range-slider-value">
                                                    {slider1Value}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Col>
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationReviewName"
                                >
                                    Autoavaliação
                                </label>
                                <Form>
                                    <div className="input-slider-container">
                                        <div className="input-slider" ref={slider2Ref} />
                                        <Row className="mt-3">
                                            <Col xs="6">
                                                <span className="range-slider-value">
                                                    {slider2Value}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Col>
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationReviewName"
                                >
                                    Avaliadores
                                </label>
                                <Form>
                                    <div className="input-slider-container">
                                        <div className="input-slider" ref={slider3Ref} />
                                        <Row className="mt-3">
                                            <Col xs="6">
                                                <span className="range-slider-value">
                                                    {slider3Value}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Col>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="form-row">
                            <Col className="d-flex align-items-center justify-content-center" md="1">
                                <span className="completion mr-2">100%</span>
                            </Col>
                            <Col md="11">
                                <div className="h-auto mt-3" >
                                    <Progress max="100" value="100" color="success" className="w-100" />
                                </div>
                            </Col>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

ReviewModelAndDeadlineForm.propTypes = {
    updateSessionData: PropTypes.func,
    sessionData: PropTypes.object
};