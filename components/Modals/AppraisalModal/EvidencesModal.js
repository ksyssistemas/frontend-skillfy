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
import useCreateEvidence from "../../../hooks/DefinitionOptionsReview/AppraisalEvidences/useCreateEvidence";
import { useFindEvidence } from "../../../hooks/DefinitionOptionsReview/AppraisalEvidences/useFindEvidence";
import useUpdateEvidence from "../../../hooks/DefinitionOptionsReview/AppraisalEvidences/useUpdateEvidence";
import { useFindAllSkillTypes } from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindAllSkillTypes";
import { employmentContractDataSearchAndProcess } from "../../../util/employmentContractDataSearchAndProcess";
import { handleSelectionEmploymentContractData } from "../../../util/handleSelectionEmploymentContractData";

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
        skillRelated,
        setSkillRelated,
        skillRelatedState,
        setSkillRelatedState,
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
        skillRelatedDataList,
        handleSkillRelatedDataList,
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
            skillRelated,
            evidenceContent,
            evidenceStatus,
            handleEvidencesIdToUpdate,
            handleCleanDetailedEvidencesData,
            handleSelectedSkillRelated
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

    const [selectedSkillRelated, setSelectedSkillRelated] = useState('');
    const handleSelectedSkillRelated = () => {
        setSelectedSkillRelated('');
    }

    useEffect(() => {
        const fetchData = async () => {
            if (skillRelatedDataList.length === 0) {
                await employmentContractDataSearchAndProcess(useFindAllSkillTypes, handleSkillRelatedDataList, 'skillTypes', 'EmployeeUserRegister');
            }
        }

        fetchData();
    }, []);

    const updateSelectedSkillRelated = (skillRelatedText) => {
        const skillRelated = skillRelatedDataList.find(p => p.id === skillRelatedText);
        if (skillRelated) {
            setSelectedSkillRelated(skillRelated.id);
          handleSelectionEmploymentContractData(skillRelated.id, skillRelatedDataList, setSelectedSkillRelated, setSkillRelated, setSkillRelatedState);
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
                updateSelectedSkillRelated(foundEvidence.evidenceName)
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
                                    htmlFor="validationSkillRelated"
                                >
                                    Competência
                                </label>
                                <Select2
                                    id="validationSkillRelated"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione uma competência" }}
                                    value={selectedSkillRelated}
                                    onChange={(e) => setSelectedSkillRelated(e.target.value)}
                                    data={skillRelatedDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(
                                        e.target.value, 
                                        skillRelatedDataList, 
                                        setSelectedSkillRelated, 
                                        setSkillRelated, 
                                        setSkillRelatedState,
                                        null,
                                        null,
                                        'id'
                                    )}
                                />
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
                                    Evidência
                                </label>
                                <Input
                                    id="validationEvidenceContent"
                                    rows="4"
                                    type="textarea"
                                    placeholder="Escreva aqui a evidência a ser avaliada ..."
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
                            : () => handleValidateAddEvidenceForm(handleCloseEvidenceModal, handleSelectedSkillRelated)
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