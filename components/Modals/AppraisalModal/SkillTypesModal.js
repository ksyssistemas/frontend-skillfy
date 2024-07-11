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
import { useFindAllSkillClassifications } from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useFindAllSkillClassifications";
import { useFindAllSkillTypes } from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsTypes/useFindAllSkillTypes";
import { useFindAllOccupationalGroups } from "../../../hooks/PerformanceAppraisalRecordsHooks/OccupationalGroups/useFindAllSkillClassifications";
import { useFindSkillType } from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsTypes/useFindSkillType";
import useCreateSkillType from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsTypes/useCreateSkillType";
import useUpdateSkillType from "../../../hooks/PerformanceAppraisalRecordsHooks/SkillsTypes/useUpdateSkillType";

function SkillTypesModal(
    {
        handleOpenSkillTypeModal,
        skillTypeModalOpen,
        skillTypeIdToUpdate,
        handleSkillTypeIdToUpdate
    }) {

    const {
        skillTypeName,
        setSkillTypeName,
        skillTypeNameState,
        setSkillTypeNameState,
        skillTypeDescription,
        setSkillTypeDescription,
        skillTypeDescriptionState,
        setSkillTypeDescriptionState,
        classificationOfSkillType,
        setClassificationOfSkillType,
        classificationOfSkillTypeState,
        setClassificationOfSkillTypeState,
        skillTypeOccupationalGroup,
        setskillTypeOccupationalGroup,
        skillTypeOccupationalGroupState,
        setskillTypeOccupationalGroupState,
        skillTypeDataList,
        setSkillTypeDataList,
        handleSkillTypeDataList,
        classificationOfSkillTypeDataList,
        setClassificationOfSkillTypeDataList,
        handleClassificationOfSkillTypeDataList,
        skillTypeOccupationalGroupDataList,
        setSkillTypeOccupationalGroupDataList,
        handleSkillTypeOccupationalGroupDataList,
        handleValidateAddSkillTypeForm,
        reset
    } = useCreateSkillType();

    const [selectedClassificationOfSkillType, setSelectedClassificationOfSkillType] = useState('');
    const handleSelectedClassificationOfSkillType = () => {
        setSelectedClassificationOfSkillType('');
    }
    const [selectedSkillTypeOccupationalGroup, setSelectedSkillTypeOccupationalGroup] = useState('');
    const handleSelectedSkillTypeOccupationalGroup = () => {
        setSelectedSkillTypeOccupationalGroup('');
    }

    const { handleValidateUpdateAppraisalSkillTypeForm } = useUpdateSkillType();

    const [hasSkillRegisterRecorded, setHasSkillRegisterRecorded] = useState(false);
    const handleHasSkillRegisterRecorded = () => {
        setHasSkillRegisterRecorded(!hasSkillRegisterRecorded);
    }

    const handleCloseSkillTipeModal = () => {
        handleOpenSkillTypeModal();
        reset();
    };

    const updateSelectedPeriod = (periodText) => {
        const period = cyclePeriodDataListMook.find(p => p.text === periodText);
        if (period) {
            setSelectePeriod(period.id);
            handleSelectionEmploymentContractData(period.id, cyclePeriodDataListMook, setSelectePeriod, setCyclePeriod, setCyclePeriodState);
        }
    };

    function handleUpdateAppraisalSkillType() {
        handleValidateUpdateAppraisalSkillTypeForm(
            handleCloseSkillTipeModal,
            skillTypeIdToUpdate,
            skillTypeName,
            skillTypeDescription,
            handleSkillTypeIdToUpdate,
            handleCleanDetailedSkillTypesData
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            if (skillTypeDataList.length === 0) {
                await employmentContractDataSearchAndProcess(useFindAllSkillTypes, handleSkillTypeDataList, 'skillTypes', 'EmployeeUserRegister');
            }
            if (classificationOfSkillTypeDataList.length === 0) {
                await employmentContractDataSearchAndProcess(useFindAllSkillClassifications, handleClassificationOfSkillTypeDataList, 'skillClassification', 'EmployeeUserRegister');
            }
            if (skillTypeOccupationalGroupDataList.length === 0) {
                await employmentContractDataSearchAndProcess(useFindAllOccupationalGroups, handleSkillTypeOccupationalGroupDataList, 'occupationalGroup', 'EmployeeUserRegister');
            }
        }

        fetchData();
    }, []);

    const [detailedSkillTypesData, setDetailedSkillTypesData] = useState([]);
    function handleCleanDetailedSkillTypesData() {
        setDetailedSkillTypesData([]);
    };


    useEffect(() => {
        const fetchData = async (skillTypeIdToUpdate) => {
            if (!detailedSkillTypesData.length) {
                const foundSkillClassification = await useFindSkillType(skillTypeIdToUpdate);
                setDetailedSkillTypesData(foundSkillClassification);
                setSkillTypeName(foundSkillClassification.competencieTypeName)
                setSkillTypeDescription(foundSkillClassification.description)
            }
        };
        if (skillTypeIdToUpdate) {
            fetchData(skillTypeIdToUpdate);
        }
    }, [skillTypeIdToUpdate]);

    return (
        <Modal
            toggle={handleOpenSkillTypeModal}
            isOpen={skillTypeModalOpen}
            size="xl"
        //fullscreen
        >
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    {skillTypeIdToUpdate
                        ? 'Editar Tipos de Competências'
                        : 'Adicionar Tipos de Competências'}
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleCloseSkillTipeModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Card>
                    <CardBody>
                        <div className="form-row">
                            <Col className="mb-3" md={skillTypeIdToUpdate ? "12" : "6"}>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationSkillType"
                                >
                                    Nome da Competência
                                </label>
                                <Input
                                    id="validationSkillType"
                                    placeholder="Nome"
                                    type="text"
                                    // valid={departmentNameState === "valid"}
                                    // invalid={departmentNameState === "invalid"}
                                    value={skillTypeName}
                                    onChange={(e) => {
                                        setSkillTypeName(e.target.value);
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
                                !skillTypeIdToUpdate && (
                                    <Col className="mb-3" md="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="listTypesSkillsRecorded"
                                        >
                                            Tipos Cadastrados
                                        </label>
                                        <Select2
                                            id="listTypesSkillsRecorded"
                                            className="form-control"
                                            options={{ placeholder: "Clique para visualizar", }}
                                            data={skillTypeDataList}
                                        />
                                    </Col>

                                )
                            }
                            <Col className="mb-3" md="12">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationSkillTypeDescription"
                                >
                                    Descrição
                                </label>
                                <Input
                                    id="validationSkillTypeDescription"
                                    rows="3"
                                    type="textarea"
                                    // valid={departmentDescriptionState === "valid"}
                                    // invalid={departmentDescriptionState === "invalid"}
                                    value={skillTypeDescription}
                                    onChange={(e) => {
                                        setSkillTypeDescription(e.target.value);
                                        //     if (e.target.value === "") {
                                        //         setDepartmentDescriptionState("");
                                        //     } else {
                                        //         setDepartmentDescriptionState("valid");
                                        //     }
                                    }}
                                />
                            </Col>
                        </div>
                        <div className="form-row">
                            <Col className="mb-3" md="6">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationSelectSkillClassification"
                                >
                                    Classificação da Competência
                                </label>
                                <Select2
                                    id="validationSelectSkillClassification"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione uma classsificação" }}
                                    value={selectedClassificationOfSkillType}
                                    onChange={(e) => setSelectedClassificationOfSkillType(e.target.value)}
                                    data={classificationOfSkillTypeDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, classificationOfSkillTypeDataList, setSelectedClassificationOfSkillType, setClassificationOfSkillType, setClassificationOfSkillTypeState)}
                                />
                            </Col>
                            <Col className="mb-3" md="6">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationSelectOccupationalGroup"
                                >
                                    Grupo Ocupacional
                                </label>
                                <Select2
                                    id="validationSelectOccupationalGroup"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione um grupo ocupacional" }}
                                    value={selectedSkillTypeOccupationalGroup}
                                    onChange={(e) => setSelectedSkillTypeOccupationalGroup(e.target.value)}
                                    data={skillTypeOccupationalGroupDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, skillTypeOccupationalGroupDataList, setSelectedSkillTypeOccupationalGroup, setskillTypeOccupationalGroup, setskillTypeOccupationalGroupState)}
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
                    onClick={handleOpenSkillTypeModal}
                >
                    Fechar
                </Button>
                <Button
                    color={skillTypeIdToUpdate ? 'warning' : 'primary'}
                    type="button"
                    onClick={
                        skillTypeIdToUpdate
                            ? () => handleUpdateAppraisalSkillType()
                            : () => handleValidateAddSkillTypeForm(handleCloseSkillTipeModal, handleSelectedClassificationOfSkillType, handleSelectedSkillTypeOccupationalGroup)
                    }
                >
                    {skillTypeIdToUpdate ? 'Editar Tipo' : 'Adicionar Tipo'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

SkillTypesModal.defaultProps = {
    handleOpenSkillTypeModal: () => { },
    skillTypeModalOpen: false,
    handleSkillTypeIdToUpdate: () => { }
};

SkillTypesModal.propTypes = {
    handleOpenSkillTypeModal: PropTypes.func,
    skillTypeModalOpen: PropTypes.bool,
    skillTypeIdToUpdate: PropTypes.string,
    handleSkillTypeIdToUpdate: PropTypes.func,
};

export default SkillTypesModal;