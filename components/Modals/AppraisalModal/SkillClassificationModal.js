import React, { useState, useEffect } from "react";
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
import { employmentContractDataSearchAndProcess } from "../../../util/employmentContractDataSearchAndProcess";
import { handleSelectionEmploymentContractData } from "../../../util/handleSelectionEmploymentContractData";
import { useFindAppraisalCycle } from "../../../hooks/DefinitionOptionsReview/Cycles/useFindAppraisalCycle";
import useCreateSkillClassification from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useCreateSkillClassification";
import { useFindAllSkillClassifications } from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindAllSkillClassifications";
import useUpdateSkillClassification from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useUpdateSkillClassification";
import { useFindSkillClassification } from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindSkillClassification";

function SkillClassificationModal(
    {
        handleOpenAddSkillClassificationModal,
        skillClassificationModalOpen,
        skillClassificationIdToUpdate,
        handleSkillClassificationIdToUpdate
    }) {

    const {
        skillClassificationName,
        setSkillClassificationName,
        skillClassificationNameState,
        setSkillClassificationNameState,
        skillClassificationDescription,
        setSkillClassificationDescription,
        skillClassificationDescriptionState,
        setSkillClassificationDescriptionState,
        skillClassificationDataList,
        setSkillClassificationDataList,
        handleSkillClassificationDataList,
        handleValidateAddSkillClassificationForm,
        reset
    } = useCreateSkillClassification();

    const { handleValidateUpdateAppraisalSkillClassificationForm } = useUpdateSkillClassification();

    const [hasSkillRegisterRecorded, setHasSkillRegisterRecorded] = useState(false);
    const handleHasSkillRegisterRecorded = () => {
        setHasSkillRegisterRecorded(!hasSkillRegisterRecorded);
    }

    const handleCloseAddSkillClassificationModal = () => {
        handleOpenAddSkillClassificationModal();
        reset();
        handleSkillClassificationIdToUpdate('');
    };

    const updateSelectedPeriod = (periodText) => {
        const period = cyclePeriodDataListMook.find(p => p.text === periodText);
        if (period) {
            setSelectPeriod(period.id);
            handleSelectionEmploymentContractData(period.id, cyclePeriodDataListMook, setSelectPeriod, setCyclePeriod, setCyclePeriodState);
        }
    };

    function handleUpdateAppraisalSkillClassification() {
        handleValidateUpdateAppraisalSkillClassificationForm(
            handleCloseAddSkillClassificationModal,
            skillClassificationIdToUpdate,
            skillClassificationName,
            skillClassificationDescription,
            handleSkillClassificationIdToUpdate,
            handleCleanDetailedSkillClassificationsData
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            if (skillClassificationDataList.length === 0 || hasSkillRegisterRecorded) {
                await employmentContractDataSearchAndProcess(
                    useFindAllSkillClassifications,
                    handleSkillClassificationDataList,
                    'skillClassification',
                    'EmployeeUserRegister'
                );
            }
        }

        fetchData();
    }, [hasSkillRegisterRecorded]);

    const [detailedSkillClassificationsData, setDetailedSkillClassificationsData] = useState([]);
    function handleCleanDetailedSkillClassificationsData() {
        setDetailedSkillClassificationsData([]);
    };


    useEffect(() => {
        const fetchData = async (skillClassificationIdToUpdate) => {
            if (!detailedSkillClassificationsData.length) {
                const foundSkillClassification = await useFindSkillClassification(skillClassificationIdToUpdate);
                console.log(foundSkillClassification);
                setDetailedSkillClassificationsData(foundSkillClassification);
                setSkillClassificationName(foundSkillClassification.competenceClassificationName)
                setSkillClassificationDescription(foundSkillClassification.description)
            }
        };
        if (skillClassificationIdToUpdate && skillClassificationIdToUpdate !== null) {
            fetchData(skillClassificationIdToUpdate);
        }
    }, [skillClassificationIdToUpdate]);

    return (
        <Modal
            toggle={handleOpenAddSkillClassificationModal}
            isOpen={skillClassificationModalOpen}
            size="xl"
        //fullscreen
        >
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    {skillClassificationIdToUpdate
                        ? 'Editar Classificação de Competência'
                        : 'Adicionar Classificação de Competência'}
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleCloseAddSkillClassificationModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Card>
                    <CardBody>
                        <div className="form-row">
                            {
                                !skillClassificationIdToUpdate && (
                                    <Col className="mb-3" md="12">
                                        <label
                                            className="form-control-label"
                                            htmlFor="listSkillClassificationRecorded"
                                        >
                                            Classificações Cadastradas
                                        </label>
                                        <Select2
                                            id="listSkillClassificationRecorded"
                                            className="form-control"
                                            data-minimum-results-for-search="Infinity"
                                            options={{ placeholder: "Clique para visualizar", }}
                                            data={skillClassificationDataList}
                                        />
                                    </Col>

                                )
                            }
                        </div>
                        <hr />
                        <div className="form-row">
                            <Col className="mb-3" md="12">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationSkillClassification"
                                >
                                    Nome da Classificação
                                </label>
                                <Input
                                    id="validationSkillClassification"
                                    placeholder="Nome"
                                    type="text"
                                    // valid={departmentNameState === "valid"}
                                    // invalid={departmentNameState === "invalid"}
                                    value={skillClassificationName}
                                    onChange={(e) => {
                                        setSkillClassificationName(e.target.value);
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
                            <Col className="mb-3" md="12">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationDescriptionSkillClassification"
                                >
                                    Descrição
                                </label>
                                <Input
                                    id="validationDescriptionSkillClassification"
                                    rows="3"
                                    type="textarea"
                                    // valid={departmentDescriptionState === "valid"}
                                    // invalid={departmentDescriptionState === "invalid"}
                                    value={skillClassificationDescription || ""}
                                    onChange={(e) => {
                                        setSkillClassificationDescription(e.target.value);
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
                    onClick={handleOpenAddSkillClassificationModal}
                >
                    Fechar
                </Button>
                <Button
                    color={skillClassificationIdToUpdate ? 'warning' : 'primary'}
                    type="button"
                    onClick={
                        skillClassificationIdToUpdate
                            ? () => handleUpdateAppraisalSkillClassification()
                            : () => handleValidateAddSkillClassificationForm(handleCloseAddSkillClassificationModal)
                    }
                >
                    {skillClassificationIdToUpdate ? 'Editar Classificação' : 'Adicionar Classificação'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

SkillClassificationModal.defaultProps = {
    handleOpenAddSkillClassificationModal: () => { },
    skillClassificationModalOpen: false,
    handleSkillClassificationIdToUpdate: () => { }
};

SkillClassificationModal.propTypes = {
    handleOpenAddSkillClassificationModal: PropTypes.func,
    skillClassificationModalOpen: PropTypes.bool,
    skillClassificationIdToUpdate: PropTypes.number,
    handleSkillClassificationIdToUpdate: PropTypes.func,
};

export default SkillClassificationModal;