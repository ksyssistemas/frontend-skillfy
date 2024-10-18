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
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import useCreatePerformanceReview from "../../../../../../hooks/PerformanceReview/useCreatePerformanceReview";
import { handleSelectionEmploymentContractData } from "../../../../../../util/handleSelectionEmploymentContractData";
import { handleDateFormatting } from "../../../../../../util/handleDateFormatting";

export function ReviewIdentityForm({ updateSessionData, sessionData = {} }) {

    const {
        reviewName,
        setReviewName,
        reviewNameState,
        setReviewNameState,
        reviewObjective,
        setReviewObjective,
        reviewObjectiveState,
        setReviewObjectiveState,

        isIntercurrentReviewCycle,
        setIsIntercurrentReviewCycle,
        isIntercurrentReviewCycleState,
        setIsIntercurrentReviewCycleState,
        isUserDefinedDateToReview,
        setIsUserDefinedDateToReview,
        isUserDefinedDateToReviewState,
        setIsUserDefinedDateToReviewState,

        startDate,
        setStartDate,
        startDateState,
        setStartDateState,
        endDate,
        setEndDate,
        endDateState,
        setEndDateState,

        reviewCycle,
        setReviewCycle,
        reviewCycleState,
        setReviewCycleState,
        reviewCycleDataList,
        setReviewCycleDataList,
        handleReviewCycleDataList,

        reviewPeriod,
        setReviewPeriod,
        reviewPeriodState,
        setReviewPeriodState,
        reviewPeriodDataList,
        setReviewPeriodDataList,
        handleReviewPeriodDataList,

        reviewDate,
        setReviewDate,
        reviewDateState,
        setReviewDateState,
        dateOnReviewWasCarriedOutDataList,
        setDateOnReviewWasCarriedOutDataList,
        handleDateOnReviewWasCarriedOutDataList,

        isReviewCyclePerPeriod,
        setIsReviewCyclePerPeriod,

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
        validateAddPerformanceReviewForm,
        handleValidateAddPerformanceReviewForm,
        reset
    } = useCreatePerformanceReview();

    const [selectedCycle, setSelectedCycle] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [selectedDateOnReviewWasCarriedOut, setSelectedDateOnReviewWasCarriedOut] = useState('');

    // Referências para os valores anteriores
    const prevStateRef = useRef({
        reviewName: sessionData.reviewName || '',
        reviewObjective: sessionData.reviewObjective || '',
        startDate: sessionData.startDate || null,
        endDate: sessionData.endDate || null,
        reviewPeriod: sessionData.reviewPeriod || ''
    });

    const { selectedReview,
        handleSelectedReview,
        handleCleanlinessReviewSelection
    } = useContext(ModelSelectionReviewContext);

    let PLACEHOLDER_TEXT_TO_SELECTED_MODEL;

    if (selectedReview === '360') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação 360º";
    } else if (selectedReview === '180') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação 180º";
    } else if (selectedReview === 'leader') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação Líder/Liderado";
    }

    const handleWithAnIntercurrentReviewCycle = () => {
        if (selectedCycle) {
            const selectedItem = reviewCycleDataList.find(item => item.id === selectedCycle);
            if (selectedItem && selectedItem.text === "Intercorrente") {
                setIsIntercurrentReviewCycle(true);
                setIsReviewCyclePerPeriod(false);
                setIsUserDefinedDateToReview(false);
            } else {
                setIsIntercurrentReviewCycle(false);
                setIsReviewCyclePerPeriod(true);
            }
        }
    };

    const handleReviewDateSelection = () => {
        if (selectedDateOnReviewWasCarriedOut === "3") {
            setIsUserDefinedDateToReview(true);
        } else {
            setIsUserDefinedDateToReview(false);
        }
    };

    const handleReactDatetimeChange = (who, date) => {
        if (
            startDate &&
            who === "endDate" &&
            new Date(startDate._d + "") > new Date(date._d + "")
        ) {
            handleDateFormatting(date, setStartDate, setStartDateState);
            handleDateFormatting(date, setEndDate, setEndDateState);
        } else if (
            endDate &&
            who === "startDate" &&
            new Date(endDate._d + "") < new Date(date._d + "")
        ) {
            handleDateFormatting(date, setStartDate, setStartDateState);
            handleDateFormatting(date, setEndDate, setEndDateState);
        } else {
            if (who === "startDate") {
                handleDateFormatting(date, setStartDate, setStartDateState);
            } else {
                handleDateFormatting(date, setEndDate, setEndDateState);
            }
        }
    };

    // const getClassNameReactDatetimeDays = (date) => {
    //     if (startDate && endDate) {
    //     }
    //     if (startDate && endDate && startDate._d + "" !== endDate._d + "") {
    //         if (
    //             new Date(endDate._d + "") > new Date(date._d + "") &&
    //             new Date(startDate._d + "") < new Date(date._d + "")
    //         ) {
    //             return " middle-date";
    //         }
    //         if (endDate._d + "" === date._d + "") {
    //             return " end-date";
    //         }
    //         if (startDate._d + "" === date._d + "") {
    //             return " start-date";
    //         }
    //     }
    //     return "";
    // };

    // Efeito para sincronizar o estado inicial do `sessionData` com os inputs, apenas uma vez quando os dados forem carregados
    useEffect(() => {
        if (sessionData.reviewName && sessionData.reviewName !== reviewName) {
            setReviewName(sessionData.reviewName);
        }
        if (sessionData.reviewObjective && sessionData.reviewObjective !== reviewObjective) {
            setReviewObjective(sessionData.reviewObjective);
        }
        if (quillRef.current && sessionData.reviewObjective) {
            const quillInstance = quillRef.current;
            const currentContent = quillInstance.root.innerText.trim(); // Remover espaços em branco extras

            // Comparar o conteúdo de texto do Quill com o objetivo da sessão
            if (currentContent !== sessionData.reviewObjective.trim()) {
                quillInstance.root.innerText = sessionData.reviewObjective; // Define o valor salvo (apenas texto)
            }
        }
        if (sessionData.startDate && sessionData.startDate) {
            setStartDate(new Date(sessionData.startDate));
        }
        if (sessionData.endDate && sessionData.endDate) {
            setEndDate(new Date(sessionData.endDate));
        }
        if ((!reviewPeriod || reviewPeriod === '') && sessionData.reviewPeriod) {
            handleSelectionEmploymentContractData(
                sessionData.reviewPeriod,
                reviewPeriodDataList,
                setSelectedPeriod,
                setReviewPeriod,
                setReviewPeriodState,
                null,
                null,
                'id'
            );
        }
        console.log("Dados da sessão carregados no useEffect.");
    }, [sessionData]);

    const quillRef = useRef(null);

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

    const handleReviewNameChange = (e) => {
        const value = e.target.value;
        setReviewName(value);
        setReviewNameState(value ? 'valid' : 'invalid');
    };

    useEffect(() => {
        const prevState = prevStateRef.current;
        const currentState = {
            reviewName,
            reviewObjective,
            startDate,
            endDate,
            reviewPeriod
        };

        // Verificação profunda para mudanças reais
        if (
            prevState.reviewName !== currentState.reviewName ||
            prevState.reviewObjective !== currentState.reviewObjective ||
            (prevState.startDate instanceof Date && currentState.startDate instanceof Date
                ? prevState.startDate.getTime() !== currentState.startDate.getTime()
                : prevState.startDate !== currentState.startDate) ||
            (prevState.endDate instanceof Date && currentState.endDate instanceof Date
                ? prevState.endDate.getTime() !== currentState.endDate.getTime()
                : prevState.endDate !== currentState.endDate) ||
            prevState.reviewPeriod !== currentState.reviewPeriod
        ) {
            updateSessionData('sessionOneData', currentState);
        }

        prevStateRef.current = currentState;
        console.log("Verificação de mudança no estado profundo.");
    }, [
        reviewName,
        reviewObjective,
        startDate,
        endDate,
        reviewPeriod,
        updateSessionData
    ]);

    console.log("Renderizou!");

    const handleUserDefinedDateToReviewChange = (who, date) => {
        if (who === "startDate") {
            // Verifica se a data de início é maior que a data de vencimento
            if (endDate && new Date(date) > new Date(endDate)) {
                // Se a data de início for maior, ajusta a data de vencimento para ser igual à de início
                setEndDate(date);
            }
            setStartDate(date);
        } else if (who === "endDate") {
            // Verifica se a data de vencimento é menor que a data de início
            if (startDate && new Date(date) < new Date(startDate)) {
                // Se a data de vencimento for menor, ajusta a data de início para ser igual à de vencimento
                setStartDate(date);
            }
            setEndDate(date);
        }
    };

    const getClassNameReactDatetimeDays = (date) => {
        if (startDate && endDate) {
            const dateStr = date._d + ""; // Obtém a string da data selecionada
            const startDateStr = new Date(startDate)._d.toString();
            const endDateStr = new Date(endDate)._d.toString();

            // Verifica se a data está no intervalo entre início e fim
            if (startDateStr !== endDateStr) {
                if (new Date(startDate) < new Date(date) && new Date(endDate) > new Date(date)) {
                    return " middle-date";
                }
                if (startDateStr === dateStr) {
                    return " start-date";
                }
                if (endDateStr === dateStr) {
                    return " end-date";
                }
            }
        }
        return "";
    };


    return (
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
                                value={reviewName || sessionData.reviewName || ''}
                                type="text"
                                valid={reviewNameState === "valid"}
                                invalid={reviewNameState === "invalid"}
                                onChange={handleReviewNameChange}
                            />
                            <div className="valid-feedback">Parece bom!</div>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
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
                    <hr />
                    <div className="form-row mt-6">
                        <Col className="mb-0" md="6">
                            <FormGroup>
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
                                    value={selectedCycle}
                                    onChange={(e) => setSelectedCycle(e.target.value)}
                                    data={reviewCycleDataList}
                                    onSelect={(e) => {
                                        handleSelectionEmploymentContractData(
                                            e.target.value,
                                            reviewCycleDataList,
                                            setSelectedCycle,
                                            setReviewCycle,
                                            setReviewCycleState,
                                            null,
                                            null,
                                            'id'
                                        );
                                        handleWithAnIntercurrentReviewCycle();
                                    }
                                    }
                                />
                            </FormGroup>
                        </Col>
                        {
                            isIntercurrentReviewCycle &&
                            <Col className="mb-0" md="6">
                                <FormGroup>
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
                                        value={selectedPeriod}
                                        onChange={(e) => setSelectedPeriod(e.target.value)}
                                        data={reviewPeriodDataList}
                                        onSelect={(e) =>
                                            handleSelectionEmploymentContractData(
                                                e.target.value,
                                                reviewPeriodDataList,
                                                setSelectedPeriod,
                                                setReviewPeriod,
                                                setReviewPeriodState,
                                                null,
                                                null,
                                                'id'
                                            )}
                                    />
                                </FormGroup>
                            </Col>
                        }
                    </div>
                    {isIntercurrentReviewCycle &&
                        <div className="form-row mb-6">
                            <Col className="mb-0" md="6">
                                <FormGroup>
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
                                        value={selectedDateOnReviewWasCarriedOut}
                                        onChange={(e) => setSelectedDateOnReviewWasCarriedOut(e.target.value)}
                                        data={dateOnReviewWasCarriedOutDataList}
                                        onSelect={(e) => {
                                            handleSelectionEmploymentContractData(
                                                e.target.value,
                                                dateOnReviewWasCarriedOutDataList,
                                                setSelectedDateOnReviewWasCarriedOut,
                                                setReviewDate,
                                                setReviewDateState,
                                                null,
                                                null,
                                                'id'
                                            );
                                            handleReviewDateSelection();
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            {isUserDefinedDateToReview &&
                                <Col className="mb-3" md="6">
                                    <label className=" form-control-label">
                                        Data de Realização
                                    </label>
                                    <FormGroup>
                                        <ReactDatetime
                                            inputProps={{
                                                placeholder: "__/__/__",
                                            }}
                                            value={endDate || (sessionData.endDate && new Date(sessionData.endDate))}
                                            timeFormat={false}
                                            onChange={(e) =>
                                                handleReactDatetimeChange("endDate", e)
                                            }
                                            renderDay={(props, currentDate, selectedDate) => {
                                                let classes = props.className;
                                                classes += getClassNameReactDatetimeDays(
                                                    currentDate
                                                );
                                                return (
                                                    <td {...props} className={classes}>
                                                        {currentDate.date()}
                                                    </td>
                                                );
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            }
                        </div>
                    }
                    {isReviewCyclePerPeriod &&
                        <div className="form-row mt-6 mb-6">
                            <Col className="mb-3" md="6">
                                <label className=" form-control-label">
                                    Data de Início
                                </label>
                                <FormGroup>
                                    <ReactDatetime
                                        inputProps={{
                                            placeholder: "__/__/__",
                                        }}
                                        value={startDate ?
                                            moment(startDate).format("DD-MM-YYYY") :
                                            (sessionData.startDate &&
                                                moment(new Date(sessionData.startDate)).format("DD-MM-YYYY")
                                            )
                                        }
                                        timeFormat={false}
                                        dateFormat="DD-MM-YYYY"  // Define o formato esperado
                                        onChange={(e) =>
                                            handleUserDefinedDateToReviewChange("startDate", e)
                                        }
                                        renderDay={(props, currentDate, selectedDate) => {
                                            let classes = props.className;
                                            classes += getClassNameReactDatetimeDays(
                                                currentDate
                                            );
                                            return (
                                                <td {...props} className={classes}>
                                                    {currentDate.date()}
                                                </td>
                                            );
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="mb-3" md="6">
                                <FormGroup>
                                    <label className=" form-control-label">
                                        Data de Vencimento
                                    </label>
                                    <ReactDatetime
                                        inputProps={{
                                            placeholder: "__/__/__",
                                        }}
                                        value={endDate ?
                                            moment(endDate).format("DD-MM-YYYY") :
                                            (sessionData.endDate &&
                                                moment(new Date(sessionData.endDate)).format("DD-MM-YYYY")
                                            )
                                        }
                                        timeFormat={false}
                                        dateFormat="DD-MM-YYYY"
                                        onChange={(e) =>
                                            handleUserDefinedDateToReviewChange("endDate", e)
                                        }
                                        renderDay={(props, currentDate, selectedDate) => {
                                            let classes = props.className;
                                            classes += getClassNameReactDatetimeDays(
                                                currentDate
                                            );
                                            return (
                                                <td {...props} className={classes}>
                                                    {currentDate.date()}
                                                </td>
                                            );
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </div>
                    }
                </div>
            </CardBody>
        </Card>
    );
}

ReviewIdentityForm.propTypes = {
    updateSessionData: PropTypes.func,
    sessionData: PropTypes.object
};
