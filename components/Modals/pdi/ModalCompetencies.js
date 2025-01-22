// ModalComponent.js
import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    Col,
    Row
} from "reactstrap";
import PropTypes from "prop-types";
import { CompetenciesContext } from "../../../contexts/RecordsContext/CompetenciesContext";
import useCreateCompetencies from "../../../hooks/RecordsHooks/pdi/competencies/useCreateCompetencies";
import { useFindCompetencies } from "../../../hooks/RecordsHooks/pdi/competencies/useFindCompetencies";
import useUpdateCompetencies from "../../../hooks/RecordsHooks/pdi/competencies/useUpdateCompetencies";
import { useAlert } from '../../../contexts/AlertContext';
function ModalCompetencies({ handleOpenCompetenciesUpdateModal, handleCleanDetailedCompetenciesAccountData, modalOpen }) {

    const {
        competenciesIdToUpdate,
        handleCompetenciesIdStatusCleanupToUpdate,
        handleCompetenciesIdToUpdate,
        hasNewCompetenciesRecordCreated,
        handleCreatedCompetenciesRecordStatusChange,
        hasUpdatedCompetenciesRecord,
        handleUpdatedCompetenciesRecordStatusChange,
        hasDeletedCompetenciesRecord,
        handleDeletedCompetenciesRecordStatusChange,
    } = useContext(CompetenciesContext);

    const {
        Name,
        setName,
        NameState,
        setNameState,
        Description,
        setDescription,
        DescriptionState,
        setDescriptionState,
        handleValidateAddCompetenciesForm,
        reset
    } = useCreateCompetencies();

    const {
        handleValidateUpdateCompetenciesForm,
        competencieUpdateError,
        competencieUpdateSuccess,
        setCompetencieUpdateError,
        setCompetencieUpdateSuccess
    } = useUpdateCompetencies();

    const handleCloseCompetenciesUpdateModal = () => {
        handleOpenCompetenciesUpdateModal();
        reset();
        handleCleanDetailedCompetenciesData();
    };

    function handleUpdateCompetencies() {
        handleValidateUpdateCompetenciesForm(
            handleCloseCompetenciesUpdateModal,
            competenciesIdToUpdate,
            Name,
            Description,
            handleCompetenciesIdToUpdate,
            handleCleanDetailedCompetenciesAccountData
        )
    }

    const [detailedCompetenciesData, setDetailedCompetenciesData] = useState([]);
    function handleCleanDetailedCompetenciesData() {
        setDetailedCompetenciesData([]);
    };

    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchCompetencies = async () => {
            if (!detailedCompetenciesData.length) {
                const foundCompetencies = await useFindCompetencies(competenciesIdToUpdate);
                setDetailedCompetenciesData(foundCompetencies);
                setName(foundCompetencies.name);
                setDescription(foundCompetencies.description);
            }
        };

        if (competenciesIdToUpdate) {
            fetchCompetencies();
        }
    }, [competenciesIdToUpdate]);

    useEffect(() => {
        if (competencieUpdateSuccess) {
            showAlert(
                "success",
                "ni ni-check-bold",
                "Sucesso!",
                "Competência atualizada com sucesso!"
            );
            setCompetencieUpdateSuccess(null);
        }
    }, [competencieUpdateSuccess]);

    useEffect(() => {
        if (competencieUpdateError) {
            showAlert(
                "danger",
                "ni ni-fat-remove",
                "Erro!",
                "Ocorreu um erro para atualizar a competência!"
            );
            setCompetencieUpdateError(null);
        }
    }, [competencieUpdateError]);

    return (
        <Modal toggle={handleOpenCompetenciesUpdateModal} isOpen={modalOpen} size="xl">
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    Editar Competência
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleOpenCompetenciesUpdateModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="validationName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationName"
                                placeholder="Nome"
                                type="text"
                                valid={NameState === "valid"}
                                invalid={NameState === "invalid"}
                                value={Name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (e.target.value === "") {
                                        setNameState("invalid");
                                    } else {
                                        setNameState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="validationDescription"
                            >
                                Descrição
                            </label>
                            <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationDescription"
                                placeholder="Descrição da competência"
                                type="text"
                                valid={DescriptionState === "valid"}
                                invalid={DescriptionState === "invalid"}
                                value={Description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (e.target.value === "") {
                                        setDescriptionState("invalid");
                                    } else {
                                        setDescriptionState("valid");
                                    }
                                }}
                            />
                        </Col>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    type="button"
                    onClick={handleOpenCompetenciesUpdateModal}
                >
                    Fechar
                </Button>
                <Button
                    color={'warning'}
                    type="button"
                    onClick={handleUpdateCompetencies}
                >
                    {'Editar Competência'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ModalCompetencies.defaultProps = {
    handleOpenCompetenciesUpdateModal: () => { },
    handleCleanDetailedCompetenciesAccountData: () => { },
    modalOpen: false,
};

ModalCompetencies.propTypes = {
    handleOpenCompetenciesUpdateModal: PropTypes.func,
    handleCleanDetailedCompetenciesAccountData: PropTypes.func,
    modalOpen: PropTypes.bool,
};

export default ModalCompetencies;
