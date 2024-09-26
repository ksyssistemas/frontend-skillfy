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
import { ModalRulerType } from "../../../../../Modals/AppraisalModal/ModalRulerType";
import { useFindCaptionOptionById } from "../../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionById";
import { useFindCaptionOptionByCaptionId } from "../../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId";

export function ReviewScaleAndCriteriaForm() {

    const {
        rulerTypeDataList,
        handleRulerTypeDataList,
        employeeContractType,
        setEmployeeContractType,
        employeeContractTypeState,
        setEmployeeContractTypeState,
        performanceReviewRulerOptionSelected,
        setPerformanceReviewRulerOptionSelected,
        performanceReviewRulerOptionSelectedState,
        setPerformanceReviewRulerOptionSelectedState,
    } = useCreatePerformanceReview();

    const [selectedRulerType, setSelectedRulerType] = useState('');

    function clearSelectedRulerTypeStatus() {
        setSelectedRulerType('');
    }

    const {
        selectedReview,
        handleSelectedReview,
        handleCleanlinessReviewSelection
    } = useContext(ModelSelectionReviewContext);

    // const [hasRulerTypeSelected, setHasRulerTypeSelected] = React.useState(false);

    // function handleHasRulerTypeSelected() {
    //     setHasRulerTypeSelected(!hasRulerTypeSelected);
    // }

    const [modalOpen, setModalOpen] = React.useState(false);

    function handleOpenRulerTypeModal() {
        setModalOpen(!modalOpen);
    }

    function handleShowRulerTypeDetailsModal() {
        handleOpenRulerTypeModal();
    }

    function handleClosewRulerTypeModal() {
        clearSelectedRulerTypeStatus();
        handleOpenRulerTypeModal();
    }

    const [showSelectRulerOptionsButton, setShowSelectRulerOptionsButton] = React.useState(false);
    function handleSelectRulerOptionsButton() {
        setShowSelectRulerOptionsButton(!showSelectRulerOptionsButton);
    }

    const [rulerOptionSelected, setRulerOptionSelected] = React.useState(null);
    function handleRulerOptionSelected(rulerOption) {
        setRulerOptionSelected(rulerOption);
    }

    const [rulerOptionData, setRulerOptionData] = useState(null);

    const fetchRulerOption = async () => {
        try {
            const rulerData = await useFindCaptionOptionByCaptionId(rulerOptionSelected);
            if (!rulerData.msg || rulerData === null) {
                setRulerOptionData(rulerData);
                setPerformanceReviewRulerOptionSelected(rulerData);
                if (rulerData === "") {
                    setPerformanceReviewRulerOptionSelectedState("invalid");
                } else {
                    setPerformanceReviewRulerOptionSelectedState("valid");
                }
            }
        } catch (error) {
            console.error(`Error fetching ruler options data for id ${performanceReviewRulerOptionSelected}:`, error);
        }

    };

    useEffect(() => {
        console.log("!rulerOptionData: ", !rulerOptionData);
        console.log("rulerOptionData?.msg: ", rulerOptionData?.msg);
        console.log("!showSelectRulerOptionsButton: ", !showSelectRulerOptionsButton);

        // Executa o fetch apenas se a opção selecionada não for null
        fetchRulerOption();
    }, [rulerOptionSelected]);

    const commonProps = {
        handleOpenRulerTypeModal,
        handleClosewRulerTypeModal,
        selectedRulerType,
        modalOpen,
        handleSelectRulerOptionsButton,
        handleRulerOptionSelected
    };

    return (
        <Card>
            <CardHeader>
                <h3 className="mb-0">Modelo de Resposta</h3>
            </CardHeader>
            <CardBody>
                <div className="mb-4">
                    <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationReviewName"
                            >
                                Tipo de Legenda
                            </label>
                            <Select2
                                id="validationCustomerCompanyTypes"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione o tipo de legenda",
                                }}
                                value={selectedRulerType}
                                onChange={(e) => setSelectedRulerType(e.target.value)}
                                data={rulerTypeDataList}
                                onSelect={(e) => {
                                    handleSelectionEmploymentContractData(
                                        e.target.value,
                                        rulerTypeDataList,
                                        setSelectedRulerType,
                                        setEmployeeContractType,
                                        setEmployeeContractTypeState,
                                        null,
                                        null,
                                        'id'
                                    );
                                    setShowSelectRulerOptionsButton(true);
                                }}
                            />
                        </Col>
                        {
                            showSelectRulerOptionsButton && (
                                <Col className="mb-3 mt-2 pt-4" md="3" name="draw_lots_peer">
                                    <Button
                                        color="primary"
                                        type="button"
                                        onClick={() => {
                                            handleOpenRulerTypeModal();
                                        }}
                                    >
                                        Selecionar Legendas
                                    </Button>
                                </Col>
                            )
                        }
                        <Col
                            className="mb-3 mt-2"
                            name="draw_lots_peer"
                            md={!showSelectRulerOptionsButton ? "8" : "5"}
                        >
                            {
                                rulerOptionData && rulerOptionData !== undefined ? (
                                    rulerOptionData.length > 0 ? (
                                        <Row className="">
                                            {
                                                rulerOptionData.map((option, index) => (
                                                    <Col className="" key={index}>
                                                        <Card className="bg-primary mb-0">
                                                            <CardBody className="py-2 px-2 d-flex flex-column justify-content-center align-items-center">
                                                                <div className="mb-2">
                                                                    <h5 style={{ fontSize: 14 }} className="mb-0 text-light text-center">{option.label}</h5>
                                                                </div>
                                                                <div className="mb-2 d-flex">
                                                                    <small className="text-light mr-2">Peso:</small>
                                                                    <h5 className="mb-0 text-light">{option.weight}</h5>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    ) : (
                                        rulerOptionData.msg && !showSelectRulerOptionsButton && (
                                            <Col md="12">
                                                <small>Nenhuma opção encontrada.</small>
                                            </Col>
                                        )
                                    )
                                ) : null
                            }
                        </Col>
                    </div>
                </div>
            </CardBody>
            {
                modalOpen && (
                    <ModalRulerType {...commonProps} />
                )
            }
        </Card>
    );
}