// ModalComponent.js
import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { initialStateReviewScaleAndCriteriaForm, reviewScaleAndCriteriaFormReducer } from '../../../reducers/ReviewForms/ReviewScaleAndCriteriaFormReducer'
import { useFindCaptionOptionByCaptionType } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionType";
import { useFindCaptionOptionByCaptionId } from "../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId";

export function ModalRulerType({
    handleOpenRulerTypeModal,
    handleClosewRulerTypeModal,
    selectedRulerType,
    confirmedRulerType,
    modalOpen,
    handleSelectRulerOptionsButton,
    handleRulerOptionSelected,
}) {

    const [state, dispatch] = useReducer(reviewScaleAndCriteriaFormReducer, initialStateReviewScaleAndCriteriaForm);

    function handleSelectedRulerOptionId(rulerOptionId, isChecked) {
        if (isChecked && rulerOptionId) {
            handleRulerOptionSelected(rulerOptionId);
        } else {
            handleRulerOptionSelected(null);
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
                const foundRuler = state.reviewScaleAndCriteriaData.rulerTypeDataList.find(ruler => ruler.id === selectedRulerType);
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
                                <CardBody className="py-1" key={rulerType.id}>
                                    <Row>
                                        <Col className="my-2" md="4">
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
                                                        id={`chk-ruler-type-${rulerType.id}`}
                                                        type="checkbox"
                                                        checked={
                                                            confirmedRulerType === rulerType.id
                                                        }
                                                        onChange={(e) => handleSelectedRulerOptionId(rulerType.id, e.target.checked)}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor={`chk-ruler-type-${rulerType.id}`}
                                                    />
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col className="mb-2 d-flex flex-row justify-content-start align-items-center" md="8">
                                            {rulerType.options && rulerType.options.length > 0 ? (
                                                rulerType.options.map((option, index) => (
                                                    <Card key={index} className="bg-orange m-2" style={{ width: 96, height: 96 }}>
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
    confirmedRulerType: PropTypes.string,
    modalOpen: PropTypes.bool,
    handleSelectRulerOptionsButton: PropTypes.func,
    handleRulerOptionSelected: PropTypes.func,
};