// ModalComponent.js
import React, { useContext, useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
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
    handleSelectRulerOptionsButton,
    handleRulerOptionSelected,
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
                console.log('selectedRulerType: ', selectedRulerType);
                console.log('rulerTypeDataList: ', rulerTypeDataList);
                const foundRuler = rulerTypeDataList.find(ruler => ruler.id === selectedRulerType);
                console.log('foundRuler: ', foundRuler);
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
        console.log('selectedRulerType: ', selectedRulerType);
        if (modalOpen) {
            fetchCapitons();
        }
    }, [modalOpen, selectedRulerType]);

    return (
        <Modal
            toggle={handleOpenRulerTypeModal}
            isOpen={modalOpen}
            size="xl"
            key={selectedRulerType}
        >
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    Tipo de Régua
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
                <Card className="">
                    {detailedRulerTypeData && detailedRulerTypeData.length > 0 ? (
                        detailedRulerTypeData.map((rulerType) => (
                            <>
                                <CardBody className="py-1">
                                    <Row>
                                        {rulerType.options && rulerType.options.length > 0 ? (
                                            rulerType.options.map((option, index) => (
                                                <>
                                                    <Col className="my-2 ml-1" md="4">
                                                        <Row className="flex-column">
                                                            <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                                Régua do tipo{' '}
                                                            </h6>
                                                            <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.ruleType}</h5>
                                                        </Row>
                                                        <Row className="flex-column">
                                                            <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }} >
                                                                Alternativas{' '}
                                                            </h6>
                                                            <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.optionsCount}</h5>
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
                                                                    onChange={(e) => handleSelectedRulerOptionId(rulerType.id, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="chk-ruler-type"
                                                                />
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col className="my-2 mx-0" md="6" key={index}>
                                                        <Card className="bg-secondary border border-darker mb-0 mt-2" style={{ width: 120 }}>
                                                            <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                                                <div className="mx-4 bg-dark">
                                                                    <h5 style={{ fontSize: 16 }} className="mb-0 text-darker text-center">{option.label}</h5>
                                                                </div>
                                                                <div className="mb-2 d-flex">
                                                                    <small className="text-darker mr-2">Peso</small>
                                                                    <h5 className="mb-0 text-darker">{option.weight}</h5>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </>
                                            ))
                                        ) : (
                                            <Col md="12">
                                                <small>Nenhuma opção encontrada.</small>
                                            </Col>
                                        )}
                                    </Row>
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

ModalRulerType.defaultProps = {
    handleOpenRulerTypeModal: () => { },
    handleClosewRulerTypeModal: () => { },
    modalOpen: false,
    handleSelectRulerOptionsButton: () => { },
    handleRulerOptionSelected: () => { },
};
ModalRulerType.propTypes = {
    handleOpenRulerTypeModal: PropTypes.func,
    handleClosewRulerTypeModal: PropTypes.func,
    selectedRulerType: PropTypes.string,
    modalOpen: PropTypes.bool,
    handleSelectRulerOptionsButton: PropTypes.func,
    handleRulerOptionSelected: PropTypes.func,
};