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
import useCreateOccupationalGroup from "../../../hooks/DefinitionOptionsReview/OccupationalGroups/useCreateOccupationalGroup";
import { useFindAllOccupationalGroups } from "../../../hooks/DefinitionOptionsReview/OccupationalGroups/useFindAllSkillClassifications";
import { useFindOccupationalGroup } from "../../../hooks/DefinitionOptionsReview/OccupationalGroups/useFindOccupationalGroup";
import useUpdateOccupationalGroup from "../../../hooks/DefinitionOptionsReview/OccupationalGroups/useUpdateOccupationalGroup";

function OccupationalGroupModal(
    {
        handleOpenOccupationalGroupModal,
        occupationalGroupModalOpen,
        occupationalGroupIdToUpdate,
        handleOccupationalGroupIdToUpdate
    }) {

    const {
        occupationalGroupName,
        setOccupationalGroupName,
        occupationalGroupNameState,
        setOccupationalGroupNameState,
        occupationalGroupDescription,
        setOccupationalGroupDescription,
        occupationalGroupDescriptionState,
        setOccupationalGroupDescriptionState,
        occupationalGroupDataList,
        setOccupationalGroupDataList,
        handleOccupationalGroupDataList,
        handleValidateAddOccupationalGroupForm,
        reset
    } = useCreateOccupationalGroup();

    const { handleValidateUpdateAppraisalOccupationalGroupForm } = useUpdateOccupationalGroup();

    const [hasSkillRegisterRecorded, setHasSkillRegisterRecorded] = useState(false);
    const handleHasSkillRegisterRecorded = () => {
        setHasSkillRegisterRecorded(!hasSkillRegisterRecorded);
    }

    const handleCloseOccupationalGroupModal = () => {
        handleOpenOccupationalGroupModal();
        reset();
    };

    const updateSelectedPeriod = (periodText) => {
        const period = cyclePeriodDataListMook.find(p => p.text === periodText);
        if (period) {
            setSelectePeriod(period.id);
            handleSelectionEmploymentContractData(period.id, cyclePeriodDataListMook, setSelectePeriod, setCyclePeriod, setCyclePeriodState);
        }
    };

    function handleUpdateAppraisalOccupationalGroup() {
        handleValidateUpdateAppraisalOccupationalGroupForm(
            handleCloseOccupationalGroupModal,
            occupationalGroupIdToUpdate,
            occupationalGroupName,
            occupationalGroupDescription,
            handleOccupationalGroupIdToUpdate,
            handleCleanDetailedOccupationalGroupsData
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            if (occupationalGroupDataList.length === 0) {
                await employmentContractDataSearchAndProcess(useFindAllOccupationalGroups, handleOccupationalGroupDataList, 'occupationalGroup', 'EmployeeUserRegister');
            }
        }
        fetchData();
    }, []);

    const [detailedOccupationalGroupsData, setDetailedOccupationalGroupsData] = useState([]);
    function handleCleanDetailedOccupationalGroupsData() {
        setDetailedOccupationalGroupsData([]);
    };


    useEffect(() => {
        const fetchData = async (occupationalGroupIdToUpdate) => {
            if (!detailedOccupationalGroupsData.length) {
                const foundSkillClassification = await useFindOccupationalGroup(occupationalGroupIdToUpdate);
                console.log(foundSkillClassification);
                setDetailedOccupationalGroupsData(foundSkillClassification);
                setOccupationalGroupName(foundSkillClassification.competencieName)
                setOccupationalGroupDescription(foundSkillClassification.description)
            }
        };
        if (occupationalGroupIdToUpdate) {
            fetchData(occupationalGroupIdToUpdate);
        }
    }, [occupationalGroupIdToUpdate]);

    return (
        <Modal
            toggle={handleOpenOccupationalGroupModal}
            isOpen={occupationalGroupModalOpen}
            size="xl"
        //fullscreen
        >
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    {occupationalGroupIdToUpdate
                        ? 'Editar Grupos Ocupacionais'
                        : 'Adicionar Grupos Ocupacionais'}
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleCloseOccupationalGroupModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Card>
                    <CardBody>
                        <div className="form-row">
                            <Col className="mb-3" md={occupationalGroupIdToUpdate ? "12" : "6"}>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationOccupationalGroup"
                                >
                                    Nome do Grupo Ocupacional
                                </label>
                                <Input
                                    id="validationOccupationalGroup"
                                    placeholder="Nome"
                                    type="text"
                                    // valid={departmentNameState === "valid"}
                                    // invalid={departmentNameState === "invalid"}
                                    value={occupationalGroupName}
                                    onChange={(e) => {
                                        setOccupationalGroupName(e.target.value);
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
                                !occupationalGroupIdToUpdate && (
                                    <Col className="mb-3" md="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="listOccupationalGroupsRecorded"
                                        >
                                            Grupos Cadastrados
                                        </label>
                                        <Select2
                                            id="listOccupationalGroupsRecorded"
                                            className="form-control"
                                            options={{ placeholder: "Clique para visualizar", }}
                                            data={occupationalGroupDataList}
                                        />
                                    </Col>
                                )
                            }
                            <Col className="mb-3" md="12">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationOccupationalGroupDescription"
                                >
                                    Descrição
                                </label>
                                <Input
                                    id="validationOccupationalGroupDescription"
                                    rows="3"
                                    type="textarea"
                                    // valid={departmentDescriptionState === "valid"}
                                    // invalid={departmentDescriptionState === "invalid"}
                                    value={occupationalGroupDescription}
                                    onChange={(e) => {
                                        setOccupationalGroupDescription(e.target.value);
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
                    onClick={handleOpenOccupationalGroupModal}
                >
                    Fechar
                </Button>
                <Button
                    color={occupationalGroupIdToUpdate ? 'warning' : 'primary'}
                    type="button"
                    onClick={
                        occupationalGroupIdToUpdate
                            ? () => handleUpdateAppraisalOccupationalGroup()
                            : () => handleValidateAddOccupationalGroupForm(handleCloseOccupationalGroupModal)
                    }
                >
                    {occupationalGroupIdToUpdate ? 'Editar Grupo' : 'Adicionar Grupo'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

OccupationalGroupModal.defaultProps = {
    handleOpenOccupationalGroupModal: () => { },
    occupationalGroupModalOpen: false,
    handleOccupationalGroupIdToUpdate: () => { }
};

OccupationalGroupModal.propTypes = {
    handleOpenOccupationalGroupModal: PropTypes.func,
    occupationalGroupModalOpen: PropTypes.bool,
    occupationalGroupIdToUpdate: PropTypes.string,
    handleOccupationalGroupIdToUpdate: PropTypes.func,
};

export default OccupationalGroupModal;