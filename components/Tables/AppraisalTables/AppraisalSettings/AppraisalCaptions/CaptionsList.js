import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    Form,
    Table,
    Nav,
    NavItem,
    NavLink,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Row,
    UncontrolledTooltip,
    Col,
    Button,
    ListGroup,
    ListGroupItem,
    CardTitle,
} from "reactstrap";
import { useFindAllCaptions } from "../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindAllCaptions";
import { AppraisalCaptionsContext } from "../../../../../contexts/PerformanceContext/AprraisalCaptionsContext";
import { useFindCaptionOptionByCaptionId } from "../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId";
import { useSweetAlert } from "../../../../../contexts/SweetAlertContext";
import { useDeleteCaption } from "../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useDeleteCaption";
import { useFindCaptionOptionByCaptionType } from "../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionType";

function CaptionsList() {

    const {
        handleShowCaptionRegister,
        hasUpdatedAppraisalCaption,
        handleUpdatedAppraisalCaptionStatusChange,
        hasNewAppraisalCaptionCreated,
        handleCreatedAppraisalCaptionStatusChange,
        hasDeletedAppraisalCaption,
        handleDeletedAppraisalCaptionStatusChange,
        captionTypeViewComponents,
        handleDropdownClickCaptionType,
        isShouldShowUpdateAspect,
        handleShowUpdateAspect,
        captionIdToUpdate,
        handlecaptionIdStatusCleanupToUpdate,
        handleCaptionIdToUpdate
    } = useContext(AppraisalCaptionsContext);

    const { warningAlert } = useSweetAlert();

    const [detailedCaptionData, setDetailedCaptionData] = useState([]);

    function handleWithUpdatingAppraisalCaption(captionId) {
        handleCaptionIdToUpdate(captionId);
        handleShowUpdateAspect();
        handleShowCaptionRegister();
    }

    const handleDeleteEvidence = async (captionId) => {
        try {
            const deleteResponse = await useDeleteCaption(captionId);
            if (deleteResponse !== null) {
                handleDeletedAppraisalCaptionStatusChange();
                console.log('Data deleted successfully!');
            } else {
                console.error('Failed to delete caption with ID:', captionId, '. Response Status: ', deleteResponse.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    const showWarningAlert = (captionId) => {
        warningAlert(
            `${captionId}`,
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir esta legenda?`,
            "lg",
            () => handleDeleteEvidence(captionId)
        );
    };

    const fetchCaptionOption = async (captions) => {
        let updatedCaptions = [];

        if (!Array.isArray(captions)) {
            captions = [captions];
        }

        updatedCaptions = await Promise.all(
            captions.map(async (caption) => {
                try {
                    const captionOptionData = await useFindCaptionOptionByCaptionId(caption.id);
                    return {
                        ...caption,
                        options: captionOptionData
                    };
                } catch (error) {
                    console.error(`Error fetching caption Options data for id ${caption.id}:`, error);
                    return {
                        ...caption,
                        options: 'Unknown',
                    };
                }
            })
        );
        setDetailedCaptionData(updatedCaptions);
    };

    const fetchCapitons = async () => {
        if (
            !detailedCaptionData.length ||
            captionTypeViewComponents ||
            hasNewAppraisalCaptionCreated ||
            hasUpdatedAppraisalCaption ||
            hasDeletedAppraisalCaption
        ) {
            try {
                const foundCaption = await useFindCaptionOptionByCaptionType(captionTypeViewComponents);
                await fetchCaptionOption(foundCaption);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
    };

    useEffect(() => {
        fetchCapitons();

        if (hasUpdatedAppraisalCaption) {
            handleUpdatedAppraisalCaptionStatusChange();
        }
        if (hasNewAppraisalCaptionCreated) {
            handleCreatedAppraisalCaptionStatusChange();
        }
        console.log(hasDeletedAppraisalCaption)
        if (hasDeletedAppraisalCaption) {
            handleDeletedAppraisalCaptionStatusChange();
        }

    }, [
        captionTypeViewComponents,
        hasUpdatedAppraisalCaption,
        hasNewAppraisalCaptionCreated,
        hasDeletedAppraisalCaption
    ]);

    return (
        <>
            <Card>
                <CardHeader className="bg-white border-0 mb--4">
                    <Row>
                        <Col xs="6">
                            <h3 className="mb-0">Legendas</h3>
                        </Col>
                        <Col className="text-right" xs="6">
                            <Button
                                className="btn-round btn-icon"
                                color="primary"
                                href="#pablo"
                                id="tooltip3"
                                onClick={(e) => { e.preventDefault(); handleShowCaptionRegister(); }}
                                size="sm"
                            >
                                <span className="btn-inner--icon mr-1">
                                    <i className="fas fa-solid fa-plus"></i>
                                </span>
                                <span className="btn-inner--text">Adicionar</span>
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip3">
                                Nova Legenda
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                </CardHeader>

                <CardBody>
                    {detailedCaptionData && detailedCaptionData.length > 0 ? (
                        detailedCaptionData.map((caption) => (
                            <Card className="mb-2" key={caption.id}>
                                <CardBody className="py-1">
                                    <Row>
                                        <Col className="my-2" md="4">
                                            <Row className="flex-column">
                                                <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                    Régua do tipo{' '}
                                                </h6>
                                                <h5 className="font-weith-bold text-lg text-dark mb-0">{caption.ruleType}</h5>
                                            </Row>
                                            <Row className="flex-column">
                                                <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                    Alternativas{' '}
                                                </h6>
                                                <h5 className="font-weith-bold text-lg text-dark mb-0">{caption.optionsCount}</h5>
                                            </Row>
                                            <Row>
                                                <p className="font-weith-bold text-sm text-dark mb-1 mr-2">
                                                    Definir está reguá para a avaliação
                                                </p>
                                                <div className="custom-control custom-checkbox custom-checkbox-primary mb-1">
                                                    <input
                                                        className="custom-control-input"
                                                        id="chk-ruler-type"
                                                        type="checkbox"
                                                        onChange={(e) => handleSelectedRulerOptionId(caption.id, e.target.checked)}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="chk-ruler-type"
                                                    />
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col className="mb-2 d-flex flex-row justify-content-start align-items-center" md="8">
                                            {caption.options && caption.options.length > 0 ? (
                                                caption.options.map((option, index) => (
                                                    <Card className="bg-orange m-2" style={{ width: 96, height: 96 }}>
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
                            </Card>
                        ))
                    ) : (
                        <ListGroupItem className="px-0">
                            <div className="col">
                                <small>Nenhum dado de régua de avaliação encontrado.</small>
                            </div>
                        </ListGroupItem>
                    )}
                </CardBody>
            </Card >
        </>
    );
}

export default CaptionsList;
