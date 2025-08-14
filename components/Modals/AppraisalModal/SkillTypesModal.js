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
import { useFindAllSkillClassifications } from "../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindAllSkillClassifications";
import { useFindAllSkillTypes } from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindAllSkillTypes";
import { useFindAllOccupationalGroups } from "../../../hooks/DefinitionOptionsReview/OccupationalGroups/useFindAllSkillClassifications";
import { useFindSkillType } from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindSkillType";
import useCreateSkillType from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useCreateSkillType";
import useUpdateSkillType from "../../../hooks/DefinitionOptionsReview/SkillsTypes/useUpdateSkillType";
import { selectedListItemToUpdate } from "../../../util/selectedListItemToUpdate";

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
        setSkillTypeOccupationalGroup,
        skillTypeOccupationalGroupState,
        setSkillTypeOccupationalGroupState,
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
        reset();
        handleSkillTypeIdToUpdate();
        handleCleanDetailedSkillTypesData();
        setSelectedClassificationOfSkillType('');
        setSelectedSkillTypeOccupationalGroup('');
        handleOpenSkillTypeModal();
    };

    const updateSelectedPeriod = (periodText) => {
        const period = cyclePeriodDataListMook.find(p => p.text === periodText);
        if (period) {
            setSelectedPeriod(period.id);
            handleSelectionEmploymentContractData(period.id, cyclePeriodDataListMook, setSelectedPeriod, setCyclePeriod, setCyclePeriodState);
        }
    };

    function handleUpdateAppraisalSkillType() {
        handleValidateUpdateAppraisalSkillTypeForm(
            handleCloseSkillTipeModal,
            skillTypeIdToUpdate,
            skillTypeName,
            skillTypeDescription,
            selectedClassificationOfSkillType,
            selectedSkillTypeOccupationalGroup,
            handleSkillTypeIdToUpdate,
            handleCleanDetailedSkillTypesData
        )
    }

    const handleSelectionEmploymentContractDataWrapper = (
        selectedId,
        dataList,
        setSelectedAction,
        setFieldAction,
        setStateAction,
        setSelectedDepartmentIdAction = null,
        setHasDepartmentSelectedAction = null,
        savedDataType = 'id'
    ) => {
        // Despache o estado 'valid' antes de iniciar o processo de seleção
        if (setStateAction) setStateAction('valid');
        if (typeof setHasDepartmentSelectedAction === 'function') {
            setHasDepartmentSelectedAction(true);
        }
        // Chama a função de processamento de seleção de dados
        handleSelectionEmploymentContractData(
            selectedId,
            dataList,
            (value) => setSelectedAction(value),
            (value) => setFieldAction(value),
            (state) => setStateAction(state),
            (id) => {
                if (typeof setSelectedDepartmentIdAction === 'function') {
                    setSelectedDepartmentIdAction(id);
                }
            },
            () => {
                if (typeof setHasDepartmentSelectedAction === 'function') {
                    setHasDepartmentSelectedAction(true);
                }
            },
            savedDataType
        );
    };

    const selectedListItemToUpdate = (item, list, setSelectedItem, setItem, setItemState) => {
        const selectedItem = list.find(p => p.id === item);
        if (selectedItem) {
            setSelectedItem(selectedItem.id);
            handleSelectionEmploymentContractDataWrapper(
                selectedItem.id,
                list,
                setSelectedItem,
                setItem,
                setItemState,
                null,
                null,
                'id'
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (skillTypeModalOpen && classificationOfSkillTypeDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllSkillClassifications,
                    handleClassificationOfSkillTypeDataList,
                    'skillClassification',
                    'EmployeeUserRegister'
                );
            }

            if (skillTypeModalOpen && skillTypeOccupationalGroupDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllOccupationalGroups,
                    handleSkillTypeOccupationalGroupDataList,
                    'occupationalGroup',
                    'EmployeeUserRegister'
                );
            }

            if (skillTypeModalOpen && skillTypeDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllSkillTypes,
                    handleSkillTypeDataList,
                    'skillTypes',
                    'EmployeeUserRegister'
                );
            }
        };

        fetchData();
    }, [skillTypeModalOpen, skillTypeIdToUpdate]);

    const [detailedSkillTypesData, setDetailedSkillTypesData] = useState([]);
    function handleCleanDetailedSkillTypesData() {
        setDetailedSkillTypesData([]);
    };

    useEffect(() => {
        const shouldLoad =
            skillTypeIdToUpdate &&
            classificationOfSkillTypeDataList.length > 0 &&
            skillTypeOccupationalGroupDataList.length > 0;

        if (!shouldLoad || detailedSkillTypesData.length > 0) return;

        const fetchData = async (skillTypeIdToUpdate) => {
            const foundSkillClassification = await useFindSkillType(skillTypeIdToUpdate);
            setDetailedSkillTypesData(foundSkillClassification);
            setSkillTypeName(foundSkillClassification.competencieTypeName)
            setSkillTypeDescription(foundSkillClassification.description)
            selectedListItemToUpdate(
                String(foundSkillClassification.skillClassificationId),
                classificationOfSkillTypeDataList,
                setSelectedClassificationOfSkillType,
                setClassificationOfSkillType,
                setClassificationOfSkillTypeState
            );
            selectedListItemToUpdate(
                String(foundSkillClassification.occupationalGroupId),
                skillTypeOccupationalGroupDataList,
                setSelectedSkillTypeOccupationalGroup,
                setSkillTypeOccupationalGroup,
                setSkillTypeOccupationalGroupState
            );
        };

        fetchData(skillTypeIdToUpdate);
    }, [
        skillTypeIdToUpdate,
        classificationOfSkillTypeDataList,
        skillTypeOccupationalGroupDataList,
    ]);

    return (
        <Modal
            toggle={handleOpenSkillTypeModal}
            isOpen={skillTypeModalOpen}
            size="xl"
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
                                            data-minimum-results-for-search="Infinity"
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
                                    options={{ placeholder: "Selecione uma classificação" }}
                                    value={selectedClassificationOfSkillType}
                                    onChange={(e) => setSelectedClassificationOfSkillType(e.target.value)}
                                    data={classificationOfSkillTypeDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(
                                        e.target.value,
                                        classificationOfSkillTypeDataList,
                                        setSelectedClassificationOfSkillType,
                                        setClassificationOfSkillType,
                                        setClassificationOfSkillTypeState,
                                        null,
                                        null,
                                        'id'
                                    )}
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
                                    onSelect={(e) => handleSelectionEmploymentContractData(
                                        e.target.value,
                                        skillTypeOccupationalGroupDataList,
                                        setSelectedSkillTypeOccupationalGroup,
                                        setSkillTypeOccupationalGroup,
                                        setSkillTypeOccupationalGroupState,
                                        null,
                                        null,
                                        'id'
                                    )}
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