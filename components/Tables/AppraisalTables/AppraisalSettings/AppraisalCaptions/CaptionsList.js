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
                            <Card className="bg-lighter mb-2" key={caption.id}>
                                <CardHeader className="bg-transparent">
                                    <Row>
                                        <Col md="4">
                                            <h4 className="text-dark mb-0">
                                                {caption.ruleType}
                                            </h4>
                                        </Col>
                                        <Col md="4 d-flex justify-content-center">
                                            <div className="d-flex">
                                                <h4 className="text-dark mb-0 mr-2">Alternativas:</h4>
                                                <h4 className="text-dark mb-0">{caption.optionsCount}</h4>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="d-flex justify-content-end">
                                                <h4 className="text-dark mb-0 mr-2">Ações:</h4>
                                                <a
                                                    className="table-action mb-0"
                                                    href="#pablo"
                                                    id="tooltip564981685"
                                                    onClick={(e) => { e.preventDefault(); handleWithUpdatingAppraisalCaption(caption.id) }}
                                                >
                                                    <i className="fas fa-user-edit" />
                                                </a>
                                                <UncontrolledTooltip delay={0} target="tooltip564981685">
                                                    Edit product
                                                </UncontrolledTooltip>
                                                <a
                                                    className="table-action table-action-delete mb-0"
                                                    href="#pablo"
                                                    id="tooltip601065234"
                                                    onClick={(e) => { e.preventDefault(); showWarningAlert(caption.id); }}
                                                >
                                                    <i className="fas fa-trash" />
                                                </a>
                                                <UncontrolledTooltip delay={0} target="tooltip601065234">
                                                    Delete product
                                                </UncontrolledTooltip>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <ListGroup className="list my--4" flush>
                                        <ListGroupItem className="px--4 bg-lighter" key={caption.id}>
                                            <Row className="bg-lighter">
                                                {caption.options && caption.options.length > 0 ? (
                                                    caption.options.map((option, index) => (
                                                        <Col key={index}>
                                                            <Card className="bg-primary">
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
                                                ) : (
                                                    <Col md="12">
                                                        <small>Nenhuma opção encontrada.</small>
                                                    </Col>
                                                )}
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
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
