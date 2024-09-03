import React, { useState, useEffect, useContext, useRef } from "react";
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
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import useCreatePerformanceReview from "../../../../../../hooks/PerformanceReview/useCreatePerformanceReview";
import { handleSelectionEmploymentContractData } from "../../../../../../util/handleSelectionEmploymentContractData";
import { handleDateFormatting } from "../../../../../../util/handleDateFormatting";

export function ReviewIdentityForm() {

    const {
        reviewName,
        setReviewName,
        reviewNameState,
        setReviewNameState,
        reviewObjective,
        setReviewObjective,
        reviewObjectiveState,
        setReviewObjectiveState,
        startDate,
        setStartDate,
        startDateState,
        setStartDateState,
        untilDate,
        setUntilDate,
        untilDateState,
        setUntilDateState,
        endDate,
        setEndDate,
        endDateState,
        setEndDateState,
        reviewPeriod,
        setReviewPeriod,
        reviewPeriodState,
        setReviewPeriodState,
        reviewPeriodDataList,
        setReviewPeriodDataList,
        handleReviewPeriodDataList,
        validateAddPerformanceReviewForm,
        handleValidateAddPerformanceReviewForm,
        reset
    } = useCreatePerformanceReview();

    const [selectedPeriod, setSelectedPeriod] = useState('');

    const { selectedReview,
        handleSelectedReview,
        handleCleanlinessReviewSelection } = useContext(ModelSelectionReviewContext);

    let PLACEHOLDER_TEXT_TO_SELECTED_MODEL;

    if (selectedReview === '360') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação 360º";
    } else if (selectedReview === '180') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação 180º";
    } else if (selectedReview === 'leader') {
        PLACEHOLDER_TEXT_TO_SELECTED_MODEL = "Avaliação Líder/Liderado";
    }

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

    const getClassNameReactDatetimeDays = (date) => {
        if (startDate && endDate) {
        }
        if (startDate && endDate && startDate._d + "" !== endDate._d + "") {
            if (
                new Date(endDate._d + "") > new Date(date._d + "") &&
                new Date(startDate._d + "") < new Date(date._d + "")
            ) {
                return " middle-date";
            }
            if (endDate._d + "" === date._d + "") {
                return " end-date";
            }
            if (startDate._d + "" === date._d + "") {
                return " start-date";
            }
        }
        return "";
    };

    const quillRef = useRef(null);

    useEffect(() => {
        let quillInstance;
        const initializeQuill = async () => {
            if (!quillRef.current) {
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
                        placeholder: "Lorem Ipsum is simply dummy text...",
                        theme: 'snow'
                    });
                    quillRef.current = quillInstance;
                }
            }
        };

        initializeQuill();

        // Cleanup function para desmontar o Quill ao desmontar o componente
        return () => {
            if (quillRef.current) {
                quillRef.current.off(); // Remove event listeners if any
                quillRef.current = null; // Clean up ref
            }
        };
    }, []);

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
                                type="text"
                                valid={reviewNameState === "valid"}
                                invalid={reviewNameState === "invalid"}
                                onChange={(e) => {
                                    setReviewName(e.target.value);
                                    if (e.target.value === "") {
                                        setReviewNameState("invalid");
                                    } else {
                                        setReviewNameState("valid");
                                    }
                                }}
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
                                valid={reviewObjectiveState === "valid"}
                                invalid={reviewObjectiveState === "invalid"}
                                onChange={(e) => {
                                    setReviewObjective(e.target.value);
                                    if (e.target.value === "") {
                                        setReviewObjectiveState("");
                                    } else {
                                        setReviewObjectiveState("valid");
                                    }
                                }}
                            />
                            <div className="valid-feedback">Parece bom!</div>
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                    </div>
                    <hr />
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
                                    value={startDate}
                                    timeFormat={false}
                                    onChange={(e) =>
                                        handleReactDatetimeChange("startDate", e)
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
                            <label
                                className="form-control-label"
                                htmlFor="validationUntilDate"
                            >
                                Até a data
                            </label>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "__/__/__",
                                }}
                                timeFormat={false}
                                onChange={() => handleDateFormatting(e.target.value, setUntilDate, setUntilDateState)}
                            />
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
                                    value={endDate}
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
                        <Col className="mb-3" md="6">
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
                                    onSelect={(e) => handleSelectionEmploymentContractData(
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
                    </div>
                </div>
            </CardBody>
        </Card>

    );
}
