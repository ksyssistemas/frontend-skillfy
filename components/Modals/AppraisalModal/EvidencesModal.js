import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
// reactstrap components
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    Card,
    CardBody,
    Input,
    Col,
} from "reactstrap";
import { EvidencesContext } from "../../../contexts/PerformanceContext/AppraisalEvidencesContext";
import useCreateEvidence from "../../../hooks/PerformanceAppraisalRecordsHooks/AppraisalEvidences/useCreateEvidence";
import { useFindEvidence } from "../../../hooks/PerformanceAppraisalRecordsHooks/AppraisalEvidences/useFindEvidence";
import useUpdateEvidence from "../../../hooks/PerformanceAppraisalRecordsHooks/AppraisalEvidences/useUpdateEvidence";

function EvidencesModal(
    {
        handleOpenEvidencesModal,
        evidencesModalOpen
    }) {

    const {
        evidencesIdToUpdate,
        handleEvidenceIdStatusCleanupToUpdate,
        handleEvidencesIdToUpdate,
    } = useContext(EvidencesContext);

    const {
        evidenceTitle,
        setEvidenceTitle,
        evidenceTitleState,
        setEvidenceTitleState,
        evidenceContent,
        setEvidenceContent,
        evidenceContentState,
        setEvidenceContentState,
        evidenceStatus,
        setEvidenceStatus,
        evidenceStatusState,
        setEvidenceStatusState,
        evidenceDataList,
        handleEvidenceDataList,
        handleValidateAddEvidenceForm,
        reset
    } = useCreateEvidence();


    const { handleValidateUpdateAppraisalEvidenceForm } = useUpdateEvidence();

    const [hasSkillRegisterRecorded, setHasSkillRegisterRecorded] = useState(false);
    const handleHasSkillRegisterRecorded = () => {
        setHasSkillRegisterRecorded(!hasSkillRegisterRecorded);
    }

    const handleCloseEvidenceModal = () => {
        handleOpenEvidencesModal();
        reset();
        handleEvidenceIdStatusCleanupToUpdate();
    };

    function handleUpdateAppraisalEvidence() {
        handleValidateUpdateAppraisalEvidenceForm(
            handleCloseEvidenceModal,
            evidencesIdToUpdate,
            evidenceTitle,
            evidenceContent,
            evidenceStatus,
            handleEvidencesIdToUpdate,
            handleCleanDetailedEvidencesData
        )
    }

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setEvidenceStatus(isChecked);

        if (isChecked) {
            setEvidenceStatusState("valid");
        } else {
            setEvidenceStatusState("invalid");
        }
    };


    const [detailedEvidencesData, setDetailedEvidencesData] = useState([]);
    function handleCleanDetailedEvidencesData() {
        setDetailedEvidencesData([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!detailedEvidencesData.length) {
                const foundEvidence = await useFindEvidence(evidencesIdToUpdate);
                setDetailedEvidencesData(foundEvidence);
                setEvidenceTitle(foundEvidence.evidenceName)
                setEvidenceContent(foundEvidence.description)
                setEvidenceStatus(foundEvidence.status)
            }
        };
        if (evidencesIdToUpdate) {
            fetchData();
        }
    }, [evidencesIdToUpdate]);

    return (
        <Modal
            toggle={handleOpenEvidencesModal}
            isOpen={evidencesModalOpen}
            size="xl"
        //fullscreen
        >
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    {evidencesIdToUpdate
                        ? 'Editar Evidência'
                        : 'Adicionar Evidência'}
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleCloseEvidenceModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Card>
                    <CardBody>
                        <div className="form-row">
                            <Col className="mb-3" md={evidencesIdToUpdate ? "10" : "12"}>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEvidenceTitle"
                                >
                                    Título da Evidência
                                </label>
                                <Input
                                    id="validationEvidenceTitle"
                                    placeholder="Título"
                                    type="text"
                                    // valid={departmentNameState === "valid"}
                                    // invalid={departmentNameState === "invalid"}
                                    value={evidenceTitle}
                                    onChange={(e) => {
                                        setEvidenceTitle(e.target.value);
                                        //     if (e.target.value === "") {
                                        //         setDepartmentNameState("invalid");
                                        //     } else {
                                        //         setDepartmentNameState("valid");
                                        //     }
                                    }}
                                />
                                {/* <div className="invalid-feedback">
                                                    É necessário preencher este campo.
                                                </div> */}
                            </Col>
                            {
                                evidencesIdToUpdate ? (
                                    <Col className="mb-3" md="2">
                                        <div className="d-flex flex-column w-100">
                                            <span
                                                className="form-control-label mb-4 mr-auto"
                                            >
                                                Estado Ativo
                                            </span>
                                            <label className="custom-toggle ml-auto">
                                                <input
                                                    type="checkbox"
                                                    checked={evidenceStatus}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span
                                                    className="custom-toggle-slider rounded-circle"
                                                    data-label-off="Não"
                                                    data-label-on="Sim"
                                                />
                                            </label>
                                        </div>
                                    </Col>
                                ) : null
                            }
                        </div>
                        <div className="form-row">
                            <Col className="mb-3" md="12">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEvidenceContent"
                                >
                                    Conteúdo
                                </label>
                                <Input
                                    id="validationEvidenceContent"
                                    rows="4"
                                    type="textarea"
                                    // valid={departmentDescriptionState === "valid"}
                                    // invalid={departmentDescriptionState === "invalid"}
                                    value={evidenceContent}
                                    onChange={(e) => {
                                        setEvidenceContent(e.target.value);
                                        //     if (e.target.value === "") {
                                        //         setDepartmentDescriptionState("");
                                        //     } else {
                                        //         setDepartmentDescriptionState("valid");
                                        //     }
                                    }}
                                />
                            </Col>
                        </div>
                    </CardBody>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    type="button"
                    onClick={handleOpenEvidencesModal}
                >
                    Fechar
                </Button>
                <Button
                    color={evidencesIdToUpdate ? 'warning' : 'primary'}
                    type="button"
                    onClick={
                        evidencesIdToUpdate
                            ? () => handleUpdateAppraisalEvidence()
                            : () => handleValidateAddEvidenceForm(handleCloseEvidenceModal)
                    }
                >
                    {evidencesIdToUpdate ? 'Editar Evidência' : 'Adicionar Evidência'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

EvidencesModal.defaultProps = {
    handleOpenEvidencesModal: () => { },
};

EvidencesModal.propTypes = {
    handleOpenEvidencesModal: PropTypes.func,
    evidencesModalOpen: PropTypes.bool,
};

export default EvidencesModal;