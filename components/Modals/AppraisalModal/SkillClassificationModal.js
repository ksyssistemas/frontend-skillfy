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
import { useFindAppraisalCycle } from "../../../hooks/PerformanceAppraisalRecordsHooks/Cycles/useFindAppraisalCycle";
import useCreateSkillClassificaiton from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useCreateSkillClassificaiton";
import { useFindAllSkillClassifications } from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useFindAllSkillClassifications";
import useUpdateSkillClassificaiton from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useUpdateSkillClassification";
import { useFindSkillClassification } from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useFindSkillClassification";

function SkillClassificationModal(
    {
        handleOpenAddSkillClassificationModal,
        skillClassificationModalOpen,
        skillClassificationIdToUpdate,
        handleSkillClassificationIdToUpdate
    }) {

    const {
        skilClassificationName,
        setSkilClassificationName,
        skilClassificationNameState,
        setSkilClassificationNameState,
        skillClassificationDescription,
        setSkillClassificationDescription,
        skillClassificationDescriptionState,
        setSkillClassificationDescriptionState,
        skilClassificationDataList,
        setSkilClassificationDataList,
        handleSkilClassificationDataList,
        handleValidateAddSkillClassificationForm,
        reset
    } = useCreateSkillClassificaiton();

    const { handleValidateUpdateAppraisalSkillClassificationForm } = useUpdateSkillClassificaiton();

    const [hasSkillRegisterRecorded, setHasSkillRegisterRecorded] = useState(false);
    const handleHasSkillRegisterRecorded = () => {
        setHasSkillRegisterRecorded(!hasSkillRegisterRecorded);
    }

    const handleCloseAddSkillClassificationModal = () => {
        handleOpenAddSkillClassificationModal();
        reset();
    };

    const updateSelectedPeriod = (periodText) => {
        const period = cyclePeriodDataListMook.find(p => p.text === periodText);
        if (period) {
            setSelectePeriod(period.id);
            handleSelectionEmploymentContractData(period.id, cyclePeriodDataListMook, setSelectePeriod, setCyclePeriod, setCyclePeriodState);
        }
    };

    function handleUpdateAppraisalSkillClassification() {
        handleValidateUpdateAppraisalSkillClassificationForm(
            handleCloseAddSkillClassificationModal,
            skillClassificationIdToUpdate,
            skilClassificationName,
            skillClassificationDescription,
            handleSkillClassificationIdToUpdate,
            handleCleanDetailedSkillClassificationsData
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            if (skilClassificationDataList.length === 0 || hasSkillRegisterRecorded) {
                await employmentContractDataSearchAndProcess(useFindAllSkillClassifications, handleSkilClassificationDataList, 'skillClassification', 'EmployeeUserRegister');
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
                setSkilClassificationName(foundSkillClassification.competenceClassificationName)
                setSkillClassificationDescription(foundSkillClassification.description)
            }
        };
        if (skillClassificationIdToUpdate) {
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
                            <Col className="mb-3" md={skillClassificationIdToUpdate ? "12" : "6"}>
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
                                    value={skilClassificationName}
                                    onChange={(e) => {
                                        setSkilClassificationName(e.target.value);
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
                                !skillClassificationIdToUpdate && (
                                    <Col className="mb-3" md="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="listSkillClassificationRecorded"
                                        >
                                            Classificações Cadastradas
                                        </label>
                                        <Select2
                                            id="listSkillClassificationRecorded"
                                            className="form-control"
                                            options={{ placeholder: "Clique para visualizar", }}
                                            data={skilClassificationDataList}
                                        />
                                    </Col>

                                )
                            }
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
                                    value={skillClassificationDescription}
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
    skillClassificationIdToUpdate: PropTypes.string,
    handleSkillClassificationIdToUpdate: PropTypes.func,
};

export default SkillClassificationModal;