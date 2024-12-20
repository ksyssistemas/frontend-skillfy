import React, { useState, useEffect, useContext, useRef, useReducer, useCallback } from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// plugin that creates slider
import Slider from "nouislider";
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    Row,
    Col,
    Progress
} from "reactstrap";
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import { initialState, formReducer } from '../../../../../../reducers/ReviewForms/ReviewModelAndDeadlineFormReducer';
import PageChange from "../../../../../PageChange/PageChange";
import moment from 'moment'; // Certifique-se de adicionar isso no início do arquivo
import 'moment/locale/pt-br'; // Caso precise de suporte ao idioma
import { resetFormAndLocalStorage } from "../../../../../../util/resetReviewFormData";
moment.locale('pt-br'); // Configura o idioma para português (opcional)

export function ReviewModelAndDeadlineForm() {

    const [state, dispatch] = useReducer(formReducer, initialState);

    const latestReviewModelData = useRef(state.reviewModelData);

    const [isLoadingReviewModelAndDeadlineData, setIsLoadingReviewModelAndDeadlineData] = useState(true);

    const {
        selectedReview,
        clearStepIndex,
        handleClearStepIndex
    } = useContext(ModelSelectionReviewContext);

    // Ref para armazenar o estado anterior em formato de string
    const previousStateRef = useRef(null);

    const [sliderValues, setSliderValues] = useState([
        state.reviewModelData.weightOfPerformanceReviewOfLeaders || 98,
        state.reviewModelData.weightOfSelfReviewOfPerformance || 1,
        state.reviewModelData.weightOfEvaluatorsPerformanceReview || 1,
    ]);

    // const sliderRefs = Array.from({ length: 3 }, () => useRef(null));
    const sliderRefs = useRef(Array.from({ length: 3 }, () => React.createRef()));

    const sliderLabels = ["Líderes", "Autoavaliação", "Avaliadores"];

    // Função para lidar com a mudança do checkbox (líderes)
    const handleCheckboxHasPerformanceReviewOfLeadersChange = () => {
        dispatch({
            type: 'SET_HAS_PERFORMANCE_REVIEW_OF_LEADERS',
            payload: !state.reviewModelData.hasPerformanceReviewOfLeaders,
        });
    };

    // Função para lidar com a mudança do checkbox (autoavaliação)
    const handleCheckboxHasSelfReviewOfPerformanceChange = () => {
        dispatch({
            type: 'SET_HAS_SELF_REVIEW_OF_PERFORMANCE',
            payload: !state.reviewModelData.hasSelfReviewOfPerformance,
        });
    };

    // Função para lidar com a mudança do checkbox (avaliadores)
    const handleCheckboxHasPerformanceReviewOfEvaluatorsChange = () => {
        dispatch({
            type: 'SET_HAS_PERFORMANCE_REVIEW_OF_EVALUATORS',
            payload: !state.reviewModelData.hasPerformanceReviewOfEvaluators,
        });
    };

    const handleDateChange = (dispatch, value, dateAction, stateAction) => {
        if (value && value._d && !isNaN(value._d)) {
            const dateObj = value._d;
            dispatch({ type: dateAction, payload: dateObj });
            dispatch({ type: stateAction, payload: 'valid' });
        } else {
            dispatch({ type: stateAction, payload: 'invalid' });
        }
    };

    const getVisibleSliders = () => {
        switch (selectedReview) {
            case '360':
                return [true, true, true];
            case '180':
                return [true, false, true];
            case 'leader':
                return [true, true, false];
            default:
                return [false, false, false];
        }
    };

    const visibleSliders = getVisibleSliders();

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        const dataToSave = {
            ...data,
            weightOfPerformanceReviewOfLeaders: data.weightOfPerformanceReviewOfLeaders || 98,
            weightOfSelfReviewOfPerformance: data.weightOfSelfReviewOfPerformance || 1,
            weightOfEvaluatorsPerformanceReview: data.weightOfEvaluatorsPerformanceReview || 1,
            deadlineToLeadersToRespondToPerformanceReview: moment(data.deadlineToLeadersToRespondToPerformanceReview).format("YYYY-MM-DD"),
            deadlineToRespondToPerformanceSelfReview: moment(data.deadlineToRespondToPerformanceSelfReview).format("YYYY-MM-DD"),
            deadlineToEvaluatorsToRespondToPerformanceReview: moment(data.deadlineToEvaluatorsToRespondToPerformanceReview).format("YYYY-MM-DD"),
        };
        localStorage.setItem('reviewModelData', JSON.stringify(dataToSave));
    };

    const updateSliders = (index, newValue) => {
        // Copiar os valores existentes
        let values = [...sliderValues];

        // Definir o novo valor do slider ajustado
        values[index] = newValue;

        // Calcular a diferença restante para atingir 100
        let difference = 100 - values.reduce((sum, value) => sum + value, 0);

        // Identificar os sliders restantes para redistribuição
        const remainingIndices = sliderRefs.current
            .map((_, idx) => (visibleSliders[idx] && idx !== index ? idx : null))
            .filter((idx) => idx !== null);

        if (remainingIndices.length > 0) {
            // Ajustar os valores restantes proporcionalmente
            let remainingTotal = remainingIndices.reduce((sum, idx) => sum + values[idx], 0);
            const adjustments = remainingIndices.map((idx) => {
                const proportion = remainingTotal > 0 ? values[idx] / remainingTotal : 1 / remainingIndices.length;
                return Math.floor(proportion * difference);
            });

            // Aplicar os ajustes redistribuídos
            remainingIndices.forEach((idx, i) => {
                values[idx] += adjustments[i];
            });

            // Corrigir a diferença residual no último slider da lista
            difference = 100 - values.reduce((sum, value) => sum + value, 0);
            if (difference !== 0) {
                const lastIndex = remainingIndices[remainingIndices.length - 1];
                values[lastIndex] += difference;
            }
        }

        console.log("SLIDER VALUES: ", [...values]);

        // Atualizar o estado local
        setSliderValues([...values]);
    };

    const syncWithReducerAndLocalStorage = useCallback(() => {
        const currentValues = [
            state.reviewModelData.weightOfPerformanceReviewOfLeaders,
            state.reviewModelData.weightOfSelfReviewOfPerformance,
            state.reviewModelData.weightOfEvaluatorsPerformanceReview,
        ];

        if (JSON.stringify(currentValues) !== JSON.stringify(sliderValues)) {
            // Atualizar o estado global (Reducer)
            dispatch({
                type: 'SET_WEIGHT_SLIDER_OF_PERFORMANCE_REVIEW_OF_LEADERS',
                payload: sliderValues[0],
            });
            dispatch({
                type: 'SET_WEIGHT_SLIDER_OF_SELF_REVIEW_OF_PERFORMANCE',
                payload: sliderValues[1],
            });
            dispatch({
                type: 'SET_WEIGHT_SLIDER_OF_EVALUATORS_PERFORMANCE_REVIEW',
                payload: sliderValues[2],
            });

            // Salvar no localStorage
            const dataToSave = {
                ...state.reviewModelData,
                weightOfPerformanceReviewOfLeaders: sliderValues[0],
                weightOfSelfReviewOfPerformance: sliderValues[1],
                weightOfEvaluatorsPerformanceReview: sliderValues[2],
            };
            saveDataToLocalStorage(dataToSave);
        }
    }, [sliderValues, state.reviewModelData]);

    useEffect(() => {
        syncWithReducerAndLocalStorage();
    }, [sliderValues, syncWithReducerAndLocalStorage]);

    // Lógica de inicialização com base em `selectedReview`
    useEffect(() => {
        if (selectedReview === '360') {
        } else if (selectedReview === '180') {
            handleCheckboxHasSelfReviewOfPerformanceChange();
        } else if (selectedReview === 'leader') {
            handleCheckboxHasPerformanceReviewOfEvaluatorsChange();
        }
    }, [selectedReview]);

    // Inicializa os sliders
    useEffect(() => {
        const initializeSliders = () => {
            sliderRefs.current.forEach((ref, index) => {
                if (ref.current && !ref.current.noUiSlider) {
                    // Crie o slider se ele ainda não existir
                    Slider.create(ref.current, {
                        start: [sliderValues[index]],
                        connect: [true, false],
                        step: 1,
                        range: { min: 1, max: 98 },
                    });

                    // Atualize os valores em tempo real (UI)
                    ref.current.noUiSlider.on("update", (values) => {
                        const value = parseInt(values[0], 10);
                        if (sliderValues[index] !== value) {
                            const updatedValues = [...sliderValues];
                            updatedValues[index] = value;
                            setSliderValues(updatedValues); // Reflete o valor em tempo real
                        }
                    });

                    // Atualize o estado global ao soltar o slider
                    ref.current.noUiSlider.on("change", (values) => {
                        const newValue = parseInt(values[0], 10);
                        updateSliders(index, newValue);
                    });
                }
            });
        };

        const allRefsReady = sliderRefs.current.every((ref) => ref && ref.current);

        if (allRefsReady) {
            initializeSliders();
        } else {
            console.warn("Some slider refs are not ready:", sliderRefs.current);
        }

        return () => {
            sliderRefs.current.forEach((ref) => {
                if (ref.current && ref.current.noUiSlider) {
                    ref.current.noUiSlider.destroy();
                }
            });
        };
    }, [sliderRefs, sliderValues, updateSliders]);

    // Atualize os sliders com base nos valores do estado
    useEffect(() => {
        sliderRefs.current.forEach((ref, index) => {
            if (ref.current && ref.current.noUiSlider) {
                const currentSliderValue = parseInt(ref.current.noUiSlider.get(), 10);
                if (currentSliderValue !== sliderValues[index]) {
                    ref.current.noUiSlider.set(sliderValues[index]);
                }
            }
        });
    }, [sliderValues]);

    useEffect(() => {
        if (state.reviewModelData) {
            const initialValues = [
                state.reviewModelData.weightOfPerformanceReviewOfLeaders || 98,
                state.reviewModelData.weightOfSelfReviewOfPerformance || 1,
                state.reviewModelData.weightOfEvaluatorsPerformanceReview || 1,
            ];

            if (JSON.stringify(sliderValues) !== JSON.stringify(initialValues)) {
                setSliderValues(initialValues);
            }
        }
    }, [state.reviewModelData]);

    // Execute o carregamento dos dados ao montar o componente
    useEffect(() => {
        // Função para carregar os dados do localStorage
        const loadReviewModelData = async () => {
            try {
                const rawData = localStorage.getItem('reviewModelData');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && typeof parsedData === 'object') {
                        // Verifique se selectedCycle está presente
                        dispatch({
                            type: 'LOAD_SAVED_REVIEW_DATA',
                            payload: {
                                ...parsedData,
                                deadlineToLeadersToRespondToPerformanceReview: moment(parsedData.deadlineToLeadersToRespondToPerformanceReview, "YYYY-MM-DD").toDate(),
                                deadlineToRespondToPerformanceSelfReview: moment(parsedData.deadlineToRespondToPerformanceSelfReview, "YYYY-MM-DD").toDate(),
                                deadlineToEvaluatorsToRespondToPerformanceReview: moment(parsedData.deadlineToEvaluatorsToRespondToPerformanceReview, "YYYY-MM-DD").toDate(),
                            },
                        });

                        setSliderValues([
                            parsedData.weightOfPerformanceReviewOfLeaders || 98,
                            parsedData.weightOfSelfReviewOfPerformance || 1,
                            parsedData.weightOfEvaluatorsPerformanceReview || 1,
                        ]);

                        latestReviewModelData.current = parsedData; // Atualiza a ref para os dados carregados
                    }
                } else {
                    dispatch({ type: 'RESET_REVIEW_STATE' }); // Limpa o estado para evitar inconsistências
                }
            } catch (error) {
                console.error('Failed to parse reviewModelData from localStorage:', error);
            } finally {
                setIsLoadingReviewModelAndDeadlineData(false); // Marque como carregado
            }
        };
        loadReviewModelData();
    }, []);

    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(state.reviewModelData);

        if (previousStateRef.current !== currentStateString) {
            // Salva o estado atualizado, preservando o ciclo selecionado
            const dataToSave = {
                ...state.reviewModelData,
                weightOfPerformanceReviewOfLeaders: sliderValues[0],
                weightOfSelfReviewOfPerformance: sliderValues[1],
                weightOfEvaluatorsPerformanceReview: sliderValues[2],
            };

            saveDataToLocalStorage(dataToSave);
            latestReviewModelData.current = dataToSave;

            previousStateRef.current = currentStateString;
        }

        return () => {
            saveDataToLocalStorage(latestReviewModelData.current);
        };
    }, [state.reviewModelData]);

    useEffect(() => {
        if (clearStepIndex === 2) {
            resetFormAndLocalStorage(
                true,
                2,
                clearStepIndex,
                'reviewIdentityData',
                'RESET_REVIEW_DATA',
                handleClearStepIndex,
                dispatch);
        }
    }, [clearStepIndex, dispatch]);

    if (isLoadingReviewModelAndDeadlineData) {
        return (
            <PageChange />
        );
    }

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
                                                checked={state.reviewModelData.hasPerformanceReviewOfLeaders}
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
                                            timeFormat={false}
                                            dateFormat="DD/MM/YYYY"
                                            value={state.reviewModelData.deadlineToLeadersToRespondToPerformanceReview || ''}
                                            //onChange={handleDeadlineToLeadersToRespondToPerformanceReviewChange}
                                            onChange={(value) =>
                                                handleDateChange(dispatch, value, 'SET_DEADLINE_TO_LEADERS_TO_RESPOND_TO_PERFORMANCE_REVIEW', 'SET_DEADLINE_TO_LEADERS_TO_RESPOND_TO_PERFORMANCE_REVIEW_STATE')
                                            }
                                        // className={state.reviewIdentityData.realizationDateState === 'invalid' ? 'is-invalid' : ''}
                                        />
                                        {/* {state.reviewIdentityData.realizationDateState === 'invalid' && (
                                            <div className="invalid-feedback">Data de nascimento inválida.</div>
                                        )} */}
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
                                                checked={state.reviewModelData.hasSelfReviewOfPerformance}
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
                                            timeFormat={false}
                                            dateFormat="DD/MM/YYYY"
                                            value={state.reviewModelData.deadlineToRespondToPerformanceSelfReview || ''}
                                            onChange={(value) =>
                                                handleDateChange(dispatch, value, 'SET_DEADLINE_TO_RESPOND_TO_PERFORMANCE_SELF_REVIEW', 'SET_DEADLINE_TO_RESPOND_TO_PERFORMANCE_SELF_REVIEWSTATE')
                                            }
                                        // className={state.reviewModelData.hasSelfReviewOfPerformanceState === 'invalid' ? 'is-invalid' : ''}
                                        />
                                        {/* {state.reviewIdentityData.realizationDateState === 'invalid' && (
                                            <div className="invalid-feedback">Data de nascimento inválida.</div>
                                        )} */}
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
                                                checked={state.reviewModelData.hasPerformanceReviewOfEvaluators}
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
                                            value={state.reviewModelData.deadlineToEvaluatorsToRespondToPerformanceReview || ''}
                                            timeFormat={false}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={(value) =>
                                                handleDateChange(dispatch, value, 'SET_DEADLINE_TO_EVALUATORS_TO_RESPOND_TO_PERFORMANCE_REVIEW', 'SET_DEADLINE_TO_EVALUATORS_TO_RESPOND_TO_PERFORMANCE_REVIEWSTATE')
                                            }
                                        // className={state.reviewIdentityData.realizationDateState === 'invalid' ? 'is-invalid' : ''}
                                        />
                                        {/* {state.reviewIdentityData.realizationDateState === 'invalid' && (
                                            <div className="invalid-feedback">Data de nascimento inválida.</div>
                                        )} */}
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
                            {sliderValues.map((label, index) => {
                                return (
                                    visibleSliders[index] && (
                                        <Col className="mb-3" md="4" key={index}>
                                            <label className="form-control-label">{sliderLabels[index]}</label>
                                            <Form>
                                                <div className="input-slider-container">
                                                    <div id={`slider-${index}`} className="input-slider" ref={sliderRefs.current[index]} />
                                                    <Row className="mt-3">
                                                        <Col xs="6">
                                                            <span className="range-slider-value">
                                                                {sliderValues[index]}%
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Form>
                                        </Col>
                                    )
                                )
                            })}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}