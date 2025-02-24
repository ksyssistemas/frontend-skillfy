import React, { useState, useEffect, useContext, useRef, useReducer } from "react";
import dynamic from "next/dynamic";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Card,
    CardBody,
    Form,
    Input,
    Col,
} from "reactstrap";
import 'quill/dist/quill.snow.css'; // Importando o CSS do Quill
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import { handleSelectionEmploymentContractData } from "../../../../../../util/handleSelectionEmploymentContractData";
import { initialStateReviewIdentityForm, reviewIdentityFormReducer } from '../../../../../../reducers/ReviewForms/ReviewIdentityFormReducer';
import PageChange from "../../../../../PageChange/PageChange";
import moment from 'moment'; // Certifique-se de adicionar isso no início do arquivo
import 'moment/locale/pt-br'; // Caso precise de suporte ao idioma
import { resetFormAndLocalStorage } from "../../../../../../util/resetReviewFormData";
moment.locale('pt-br'); // Configura o idioma para português (opcional)

export function ReviewIdentityForm() {

    const [state, dispatch] = useReducer(reviewIdentityFormReducer, initialStateReviewIdentityForm);

    const latestReviewIdentityData = useRef(state.reviewIdentityData);

    const [isLoadingReviewIdentityData, setIsLoadingReviewIdentityData] = useState(true);

    const {
        selectedReview,
        clearStepIndex,
        handleClearStepIndex,
        stateGlobalReviewReducer,
        dispatchGlobalReviewReducer
    } = useContext(ModelSelectionReviewContext);

    const quillRef = useRef(null);

    // Ref para armazenar o estado anterior em formato de string
    const previousStateRef = useRef(null);

    let PLACEHOLDER_TEXT_TO_SELECTED_MODEL;

    if (selectedReview === '360') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação 360º";
    } else if (selectedReview === '180') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação 180º";
    } else if (selectedReview === 'leader') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação Líder/Liderado";
    }

    const handleReviewNameChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_REVIEW_NAME', payload: value });
        dispatch({ type: 'SET_REVIEW_NAME_STATE', payload: value ? 'valid' : 'invalid' });
    }

    const handleSelectionEmploymentContractDataWrapper = (
        selectedId,
        dataList,
        setSelectedAction,
        setFieldAction,
        setStateAction,
        setSelectedDepartmentIdAction = null,
        setHasDepartmentSelectedAction = null,
        savedDataType = 'id'
    ) => {
        // Despache o estado 'valid' antes de iniciar o processo de seleção
        if (setStateAction) dispatch({ type: setStateAction, payload: 'valid' });
        if (setHasDepartmentSelectedAction) dispatch({ type: setHasDepartmentSelectedAction, payload: true });
        // Chama a função de processamento de seleção de dados
        handleSelectionEmploymentContractData(
            selectedId,
            dataList,
            (value) => dispatch({ type: setSelectedAction, payload: value }),
            (value) => dispatch({ type: setFieldAction, payload: value }), // Agora definirá o valor correto
            (state) => dispatch({ type: setStateAction, payload: state }),
            (id) => dispatch({ type: setSelectedDepartmentIdAction, payload: id }),
            () => dispatch({ type: setHasDepartmentSelectedAction, payload: true }),
            savedDataType
        );
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

    const handleUserDefinedDateToReviewChange = (who, date) => {
        if (who === "startDate") {
            if (state.reviewIdentityData.endDate && new Date(date) > new Date(state.reviewIdentityData.endDate)) {
                dispatch({ type: 'SET_END_DATE', payload: date });
            }
            dispatch({ type: 'SET_START_DATE', payload: date });
        } else if (who === "endDate") {
            if (state.reviewIdentityData.startDate && new Date(date) < new Date(state.reviewIdentityData.startDate)) {
                dispatch({ type: 'SET_START_DATE', payload: date });
            }
            dispatch({ type: 'SET_END_DATE', payload: date });
        }
    };

    const getClassNameReactDatetimeDays = (date) => {
        if (state.reviewIdentityData.startDate && state.reviewIdentityData.endDate) {
        }
        if (state.reviewIdentityData.startDate && state.reviewIdentityData.endDate && state.reviewIdentityData.startDate._d + "" !== state.reviewIdentityData.endDate._d + "") {
            if (
                new Date(state.reviewIdentityData.endDate._d + "") > new Date(date._d + "") &&
                new Date(state.reviewIdentityData.startDate._d + "") < new Date(date._d + "")
            ) {
                return " middle-date";
            }
            if (state.reviewIdentityData.endDate._d + "" === date._d + "") {
                return " end-date";
            }
            if (state.reviewIdentityData.startDate._d + "" === date._d + "") {
                return " start-date";
            }
        }
        return "";
    };

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        const dataToSave = {
            ...data,
            startDate: moment(data.startDate).format("YYYY-MM-DD"), // Salvar no formato ISO
            endDate: moment(data.endDate).format("YYYY-MM-DD"),
            realizationDate: moment(data.realizationDate).format("YYYY-MM-DD"),
        };
        localStorage.setItem('reviewIdentityData', JSON.stringify(dataToSave));
    };

    useEffect(() => {
        let quillInstance;
        const initializeQuill = async () => {
            if (typeof window !== 'undefined' && document && !quillRef.current) {
                // Apenas cria uma nova instância do Quill se não existir uma instância anterior
                // Efectuamos uma importação dinâmica para o QuillJS, uma vez que este componente não foi concebido para funcionar no SSR
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
                        const text = quillInstance.root.innerHTML.trim(); // Obter o conteúdo HTML
                        if (text !== state.reviewIdentityData.reviewObjective) {
                            dispatch({ type: 'SET_REVIEW_OBJECTIVE', payload: text });
                        }
                    });

                    // Se já existe conteúdo salvo, insira no editor (apenas na inicialização)
                    if (state.reviewIdentityData.reviewObjective) {
                        quillInstance.root.innerHTML = state.reviewIdentityData.reviewObjective;
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

    useEffect(() => {
        // Atualize o conteúdo do Quill apenas se necessário
        if (quillRef.current && state.reviewIdentityData.reviewObjective) {
            const currentContent = quillRef.current.root.innerHTML.trim();
            if (currentContent !== state.reviewIdentityData.reviewObjective) {
                quillRef.current.root.innerHTML = state.reviewIdentityData.reviewObjective;
            }
        }
    }, [state.reviewIdentityData.reviewObjective]);

    // Execute o carregamento dos dados ao montar o componente
    useEffect(() => {
        // Função para carregar os dados do localStorage
        const loadreviewIdentityData = async () => {
            try {
                const rawData = localStorage.getItem('reviewIdentityData');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && typeof parsedData === 'object') {
                        // Verifique se selectedCycle está presente
                        if (parsedData?.selectedCycle) {
                            dispatch({
                                type: 'LOAD_SAVED_REVIEW_DATA',
                                payload: {
                                    ...parsedData,
                                    startDate: parsedData.startDate ? moment(parsedData.startDate, "YYYY-MM-DD").toDate() : null,
                                    endDate: parsedData.endDate ? moment(parsedData.endDate, "YYYY-MM-DD").toDate() : null,
                                    realizationDate: parsedData.realizationDate ? moment(parsedData.realizationDate, "YYYY-MM-DD").toDate() : null,
                                },
                            });
                            latestReviewIdentityData.current = parsedData; // Atualiza a ref para os dados carregados
                        }
                    }
                } else {
                    dispatch({ type: 'RESET_REVIEW_STATE' }); // Limpa o estado para evitar inconsistências
                }
            } catch (error) {
                console.error('Failed to parse reviewIdentityData from localStorage:', error);
            } finally {
                setIsLoadingReviewIdentityData(false); // Marque como carregado
            }
        };

        loadreviewIdentityData();
    }, []);

    // Salvar no Contexto Global antes de sair
    useEffect(() => {
        return () => {
            dispatchGlobalReviewReducer({
                type: "UPDATE_REVIEW_IDENTITY",
                payload: state.reviewIdentityData,
            });
        };
    }, [state.reviewIdentityData, dispatchGlobalReviewReducer]);

    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(state.reviewIdentityData);

        if (previousStateRef.current !== currentStateString) {
            previousStateRef.current = currentStateString;
            latestReviewIdentityData.current = { ...state.reviewIdentityData };
            saveDataToLocalStorage(state.reviewIdentityData);
        }
    }, [state.reviewIdentityData]);

    useEffect(() => {
        const selectedItem = state.reviewIdentityData.dateOnReviewWasCarriedOutDataList.find(
            (item) => item.id === state.reviewIdentityData.selectedDateOnReviewWasCarriedOut
        );
        dispatch({ type: 'SET_IS_USER_DEFINED_DATE_TO_REVIEW', payload: selectedItem?.id === "3" });
    }, [state.reviewIdentityData.selectedDateOnReviewWasCarriedOut]);

    useEffect(() => {
        const selectedCycle = state.reviewIdentityData.selectedCycle;
        const selectedItem = state.reviewIdentityData.reviewCycleDataList.find(item => item.id === selectedCycle);

        if (selectedItem?.text === "Intercorrente") {
            dispatch({ type: 'SET_IS_INTERCURRENT_REVIEW_CYCLE', payload: true });
            dispatch({ type: 'SET_IS_REVIEW_CYCLE_PER_PERIOD', payload: false });

            // Reseta campos desnecessários
            dispatch({ type: 'RESET_START_DATE' });
            dispatch({ type: 'RESET_END_DATE' });
        } else {
            dispatch({ type: 'SET_IS_INTERCURRENT_REVIEW_CYCLE', payload: false });
            dispatch({ type: 'SET_IS_REVIEW_CYCLE_PER_PERIOD', payload: true });

            // Reseta campos relacionados a ciclos intercorrentes
            dispatch({ type: 'RESET_REVIEW_PERIOD' });
            dispatch({ type: 'RESET_DATE_ON_REVIEW_WAS_CARRIED_OUT' });
            dispatch({ type: 'RESET_REVIEW_DATE' });
            dispatch({ type: 'RESET_REALIZATION_DATE' });
        }
    }, [state.reviewIdentityData.selectedCycle, state.reviewIdentityData.reviewCycleDataList]);

    useEffect(() => {
        if (clearStepIndex === 1) {
            resetFormAndLocalStorage(
                true,
                1,
                clearStepIndex,
                'reviewIdentityData',
                'RESET_REVIEW_DATA',
                handleClearStepIndex,
                dispatch);
            // Limpa o conteúdo do Quill
            if (quillRef.current) {
                quillRef.current.root.innerHTML = '';
            }
        }
    }, [clearStepIndex, dispatch]);

    if (isLoadingReviewIdentityData) {
        return (
            <PageChange />
        );
    }

    return (
        <Form>
            <Card>
                <CardBody>
                    <div className="mb-4">
                        <div className="form-row">
                            <Col className="mb-3" md="9">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationReviewName"
                                >
                                    Nome da Avaliação
                                </label>
                                <Input
                                    id="validationReviewName"
                                    placeholder="Nome da Avaliação"
                                    required
                                    value={state.reviewIdentityData.reviewName || ''}
                                    type="text"
                                    valid={state.reviewIdentityData.reviewNameState === "valid"}
                                    invalid={state.reviewIdentityData.reviewNameState === "invalid"}
                                    onChange={handleReviewNameChange}
                                />
                                {state.reviewIdentityData.reviewName === 'invalid' && (
                                    <div className="invalid-feedback">Nome é obrigatório.</div>
                                )}
                            </Col>
                            <Col className="mb-3" md="3">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationModelChosen"
                                >
                                    Modelo Escolhido
                                </label>
                                <div className="mt-1 mb-3 text-center">
                                    <p className="text-md">
                                        {PLACEHOLDER_TEXT_TO_SELECTED_MODEL}
                                    </p>
                                </div>
                            </Col>
                        </div>
                        <div className="form-row">
                            <Col className="mb-3" md="12">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationDescriptionReviewObjective"
                                >
                                    Objetivo da Avaliação
                                </label>
                                <div
                                    data-quill-placeholder="Escreva aqui o objetivo da avaliação..."
                                    data-toggle="quill"
                                    id="validationDescriptionReviewObjective"
                                />
                                {state.reviewIdentityData.reviewObjectiveState === 'invalid' && (
                                    <div className="invalid-feedback">Nome é obrigatório.</div>
                                )}
                            </Col>
                        </div>
                        <hr />
                        <div className="form-row mt-6">
                            <Col className="mb-0" md="6">
                                <label
                                    className=" form-control-label"
                                    htmlFor="validationReviewCycle"
                                >
                                    Ciclo de Avaliação
                                </label>
                                <Select2
                                    id="validationReviewCycle"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione um ciclo:" }}
                                    value={state.reviewIdentityData.selectedCycle}
                                    data={state.reviewIdentityData.reviewCycleDataList || []}
                                    onSelect={(e) => {
                                        const selectedValue = e.target.value;
                                        handleSelectionEmploymentContractDataWrapper(
                                            selectedValue,
                                            Array.isArray(state.reviewIdentityData.reviewCycleDataList)
                                                ? state.reviewIdentityData.reviewCycleDataList
                                                : [],
                                            'SET_SELECTED_CYCLE',
                                            'SET_REVIEW_CYCLE',
                                            'SET_REVIEW_CYCLE_STATE',
                                            null,
                                            null,
                                            'id'
                                        );
                                    }}
                                />
                            </Col>
                            {
                                state.reviewIdentityData.isIntercurrentReviewCycle &&
                                <Col className="mb-0" md="6">
                                    <label
                                        className=" form-control-label"
                                        htmlFor="validationReviewPeriod"
                                    >
                                        Período de Avaliação
                                    </label>
                                    <Select2
                                        id="validationReviewPeriod"
                                        className="form-control"
                                        data-minimum-results-for-search="Infinity"
                                        options={{ placeholder: "Selecione um período:" }}
                                        value={state.reviewIdentityData.selectedPeriod}
                                        data={state.reviewIdentityData.reviewPeriodDataList || []}
                                        onSelect={(e) => {
                                            const selectedValue = e.target.value;
                                            handleSelectionEmploymentContractDataWrapper(
                                                selectedValue,
                                                Array.isArray(state.reviewIdentityData.reviewPeriodDataList)
                                                    ? state.reviewIdentityData.reviewPeriodDataList
                                                    : [],
                                                'SET_SELECTED_PERIOD',
                                                'SET_REVIEW_PERIOD',
                                                'SET_REVIEW_PERIOD_STATE',
                                                null,
                                                null,
                                                'id'
                                            );
                                        }}
                                    />
                                </Col>
                            }
                        </div>
                        {state.reviewIdentityData.isIntercurrentReviewCycle &&
                            <div className="form-row mb-6">
                                <Col className="mb-0" md="6">
                                    <label
                                        className=" form-control-label"
                                        htmlFor="validationDateOnReviewWasCarriedOut"
                                    >
                                        Realização de Avaliação
                                    </label>
                                    <Select2
                                        id="validationDateOnReviewWasCarriedOut"
                                        className="form-control"
                                        data-minimum-results-for-search="Infinity"
                                        options={{ placeholder: "Selecione uma opção:" }}
                                        value={state.reviewIdentityData.selectedDateOnReviewWasCarriedOut}
                                        data={state.reviewIdentityData.dateOnReviewWasCarriedOutDataList || []}
                                        onSelect={(e) => {
                                            const selectedValue = e.target.value;
                                            handleSelectionEmploymentContractDataWrapper(
                                                selectedValue,
                                                Array.isArray(state.reviewIdentityData.dateOnReviewWasCarriedOutDataList) ? state.reviewIdentityData.dateOnReviewWasCarriedOutDataList : [],
                                                'SET_SELECTED_DATE_ON_REVIEW_WAS_CARRIED_OUT',
                                                'SET_REVIEW_DATE',
                                                'SET_REVIEW_DATE_STATE',
                                                null,
                                                null,
                                                'id'
                                            );
                                        }}
                                    />
                                </Col>
                                {state.reviewIdentityData.isUserDefinedDateToReview && (
                                    <Col className="mb-3" md="6">
                                        <label className=" form-control-label">
                                            Data de Realização
                                        </label>
                                        <ReactDatetime
                                            inputProps={{
                                                placeholder: "__/__/__",
                                            }}
                                            timeFormat={false}
                                            dateFormat="DD/MM/YYYY"
                                            value={state.reviewIdentityData.realizationDate || ''}
                                            onChange={(value) =>
                                                handleDateChange(dispatch, value, 'SET_REALIZATION_DATE', 'SET_REALIZATION_DATE_STATE')
                                            }
                                            className={state.reviewIdentityData.realizationDateState === 'invalid' ? 'is-invalid' : ''}
                                        />
                                        {state.reviewIdentityData.realizationDateState === 'invalid' && (
                                            <div className="invalid-feedback">Data de nascimento inválida.</div>
                                        )}
                                    </Col>
                                )}
                            </div>
                        }
                        {state.reviewIdentityData.isReviewCyclePerPeriod &&
                            <div className="form-row mt-6 mb-6">
                                <Col className="mb-3" md="6">
                                    <label className=" form-control-label">
                                        Data de Início
                                    </label>
                                    <ReactDatetime
                                        inputProps={{
                                            placeholder: "__/__/__",
                                        }}
                                        value={state.reviewIdentityData.startDate ? moment(state.reviewIdentityData.startDate).format("DD-MM-YYYY") : ''}
                                        timeFormat={false}
                                        dateFormat="DD-MM-YYYY"
                                        onChange={(e) => handleUserDefinedDateToReviewChange("startDate", e)}
                                        renderDay={(props, currentDate, selectedDate) => {
                                            let classes = props.className;
                                            classes += getClassNameReactDatetimeDays(currentDate);
                                            return (
                                                <td {...props} className={classes}>
                                                    {currentDate.date()}
                                                </td>
                                            );
                                        }}
                                    />
                                </Col>
                                <Col className="mb-3" md="6">
                                    <label className=" form-control-label">
                                        Data de Vencimento
                                    </label>
                                    <ReactDatetime
                                        inputProps={{
                                            placeholder: "__/__/__",
                                        }}
                                        value={state.reviewIdentityData.endDate ? moment(state.reviewIdentityData.endDate).format("DD-MM-YYYY") : ''}
                                        timeFormat={false}
                                        dateFormat="DD-MM-YYYY"
                                        onChange={(e) => handleUserDefinedDateToReviewChange("endDate", e)}
                                        renderDay={(props, currentDate, selectedDate) => {
                                            let classes = props.className;
                                            classes += getClassNameReactDatetimeDays(currentDate);
                                            return (
                                                <td {...props} className={classes}>
                                                    {currentDate.date()}
                                                </td>
                                            );
                                        }}
                                    />
                                </Col>
                            </div>
                        }
                    </div>
                </CardBody>
            </Card>
        </Form>
    );
}

