// ModalComponent.js
import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    FormGroup,
    Form,
    Input,
    Modal,
    ModalBody,
    Row,
    Table,
    ModalFooter,
    UncontrolledTooltip,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import { useFindCaptionOptionByCaptionType } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionType";
import { useFindCaptionOptionByCaptionId } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId";
import useCreatePerformanceReview from "../../../hooks/PerformanceReview/useCreatePerformanceReview";

export function ModalRulerType({
    handleOpenRulerTypeModal,
    handleClosewRulerTypeModal,
    selectedRulerType,
    modalOpen,
    handleRulerOptionSelected,
    handleSelectRulerOptionsButton
}) {

    const {
        rulerTypeDataList,
    } = useCreatePerformanceReview();

    function handleSelectedRulerOptionId(rulerOptionId, isChecked) {
        if (isChecked && rulerOptionId) {
            handleRulerOptionSelected(rulerOptionId);
        }
    }

    function handleSendRulerOptionSelected() {
        handleSelectRulerOptionsButton();
        handleCleanDetailedRulerTypeData();
        handleOpenRulerTypeModal();
    }

    const [detailedRulerTypeData, setDetailedRulerTypeData] = useState([]);
    function handleCleanDetailedRulerTypeData() {
        setDetailedRulerTypeData([]);
    };

    const fetchCaptionOption = async (rulers) => {
        let updatedRulers = [];

        if (!Array.isArray(rulers)) {
            rulers = [rulers];
        }

        updatedRulers = await Promise.all(
            rulers.map(async (ruler) => {
                try {
                    const rulerOptionData = await useFindCaptionOptionByCaptionId(ruler.id);
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
                // Encontre o objeto no array que corresponde a selectedRulerType
                const foundRuler = rulerTypeDataList.find(ruler => ruler.id === selectedRulerType);

                if (foundRuler) {
                    // Pegue o valor do campo 'text' correspondente
                    const captionType = foundRuler.text;
                    // Use o valor de 'captionType' como parâmetro para o hook
                    const foundCaption = await useFindCaptionOptionByCaptionType(captionType);
                    // Chame fetchCaptionOption com o resultado do hook
                    await fetchCaptionOption(foundCaption);
                } else {
                    console.error('Ruler type not found');
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
    };

    useEffect(() => {
        if (modalOpen) {
            fetchCapitons();
        }
    }, [modalOpen]);

    return (
        <Modal
            toggle={handleOpenRulerTypeModal}
            isOpen={modalOpen}
            size="xl"
            key={selectedRulerType}
        >
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    Tipo de Régua Modal
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleClosewRulerTypeModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Card>
                    {detailedRulerTypeData && detailedRulerTypeData.length > 0 ? (
                        detailedRulerTypeData.map((rulerType) => (
                            <>
                                <CardHeader className="bg-transparent" key={rulerType.id}>
                                    <Row>
                                        <Col md="4">
                                            <h4 className="text-dark mb-0">
                                                {rulerType.ruleType}
                                            </h4>
                                        </Col>
                                        <Col md="4 d-flex justify-content-center">
                                            <div className="d-flex">
                                                <h4 className="text-dark mb-0 mr-2">Alternativas:</h4>
                                                <h4 className="text-dark mb-0">
                                                    {rulerType.optionsCount}
                                                </h4>
                                            </div>
                                        </Col>
                                        <Col className="d-flex alig-items-end justify-content-end" md="4">
                                            <h4 className="text-dark mb-0 mr-2">Selecionar</h4>
                                            <label className="custom-toggle">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => handleSelectedRulerOptionId(rulerType.id, e.target.checked)}
                                                />
                                                <span
                                                    className="custom-toggle-slider rounded-circle"
                                                />
                                            </label>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="py-1">
                                    <Row className="">
                                        {rulerType.options && rulerType.options.length > 0 ? (
                                            rulerType.options.map((option, index) => (
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
                                        ) : (
                                            <Col md="12">
                                                <small>Nenhuma opção encontrada.</small>
                                            </Col>
                                        )}
                                    </Row>
                                    {/* <ListGroup className="list my--4" flush>
                                        <ListGroupItem
                                            className="px--4 bg-lighter"
                                            key={rulerType.id}
                                        >
                                        </ListGroupItem>
                                    </ListGroup> */}
                                </CardBody>
                            </>
                        ))
                    ) : (
                        <ListGroupItem className="px-0">
                            <div className="col">
                                <small>Nenhum dado de régua de avaliação encontrado.</small>
                            </div>
                        </ListGroupItem>
                    )}
                </Card>

            </ModalBody>
            {/* {
                contactPersonIdToUpdate ? ( */}
            <ModalFooter>
                <Button
                    color="secondary"
                    type="button"
                    onClick={handleClosewRulerTypeModal}
                >
                    Fechar
                </Button>
                <Button
                    color="primary"
                    type="button"
                    onClick={handleSendRulerOptionSelected}
                >
                    Enviar
                </Button>
            </ModalFooter>
            {/* ) : null
            } */}
        </Modal>
    );
}