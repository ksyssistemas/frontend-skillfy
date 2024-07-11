import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    Form,
    Table,
    Nav,
    NavItem,
    NavLink,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Row,
    UncontrolledTooltip,
    Col,
    Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { useFindAllFunctions } from "../../../../../hooks/RecordsHooks/employeeFunction/useFindAllFunctions";
import { useFindAllRoles } from "../../../../../hooks/RecordsHooks/role/useFindAllRoles";
import { useFindAllSkillClassifications } from "../../../../../hooks/PerformanceAppraisalRecordsHooks/SkillsClassifications/useFindAllSkillClassifications";
import { useFindAllOccupationalGroups } from "../../../../../hooks/PerformanceAppraisalRecordsHooks/OccupationalGroups/useFindAllSkillClassifications";
import ShowRoleDescriptionsModal from "../../../../Modals/admin/show-role-descriptions";
import ShowFunctionsDescriptionsModal from "../../../../Modals/admin/show-functions-descriptions";
import { useFindAllSkillTypes } from "../../../../../hooks/PerformanceAppraisalRecordsHooks/SkillsTypes/useFindAllSkillTypes";
import { AppraisalSkillsContext } from "../../../../../contexts/PerformanceContext/AppraisalSkillsContext";
import { useSweetAlert } from "../../../../../contexts/SweetAlertContext";
import OccupationalGroupModal from "../../../../Modals/AppraisalModal/OccupationalGroupModal";
import { useDeleteOccupationalGroup } from "../../../../../hooks/PerformanceAppraisalRecordsHooks/OccupationalGroups/useDeleteOccupationalGroup";

function OccupationalGroupList() {

    const {
        hasUpdatedAppraisalOccupationalGroup,
        handleUpdatedAppraisalOccupationalGroupStatusChange,
        hasNewAppraisalOccupationalGroupCreated,
        handleCreatedAppraisalOccupationalGroupStatusChange,
        hasDeletedAppraisalOccupationalGroup,
        handleDeletedAppraisalOccupationalGroupStatusChange,
    } = useContext(AppraisalSkillsContext);

    const { warningAlert } = useSweetAlert();

    const [detailedOccupationalGroupsData, setDetailedOccupationalGroupsData] = useState([]);

    const [occupationalGroupModalOpen, setOccupationalGroupModalOpen] = useState(false);

    function handleOpenOccupationalGroupModal() {
        setOccupationalGroupModalOpen(!occupationalGroupModalOpen);
    }

    const [occupationalGroupIdToUpdate, setOccupationalGroupIdToUpdate] = useState('');

    function handleOccupationalGroupIdToUpdate() {
        setOccupationalGroupIdToUpdate('');
    }

    function handleOccupationalGroupUpdate(occupationalGroupId) {
        setOccupationalGroupIdToUpdate(occupationalGroupId);
        setOccupationalGroupModalOpen(true);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function handleOpenOccupationalGroupUpdateModal(occupationalGroupId) {
        handleOccupationalGroupUpdate(occupationalGroupId);
        handleOpenOccupationalGroupModal();
    }

    const handleDeleteOccupationalGroup = async (occupationalGroupId, occupationalGroupName) => {
        try {
            const deleteResponse = await useDeleteOccupationalGroup(occupationalGroupId);
            if (deleteResponse !== null) {
                handleDeletedAppraisalOccupationalGroupStatusChange();
            } else {
                console.error('Failed to delete cycle with ID:', occupationalGroupId, '. Response Status: ', deleteResponse.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    const showWarningAlert = (occupationalGroupId, occupationalGroupName) => {
        warningAlert(
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir ${occupationalGroupName}?`,
            "lg",
            () => handleDeleteOccupationalGroup(occupationalGroupId, occupationalGroupName)
        );
    };

    useEffect(() => {
        const fetchOccupationalGroups = async () => {
            try {
                const foundGroups = await useFindAllOccupationalGroups();
                setDetailedOccupationalGroupsData(foundGroups);
            } catch (error) {
                console.error('Error fetching classifications:', error);
            }
        };

        fetchOccupationalGroups();
        if (hasNewAppraisalOccupationalGroupCreated) {
            handleCreatedAppraisalOccupationalGroupStatusChange();
        }
        if (hasUpdatedAppraisalOccupationalGroup) {
            handleUpdatedAppraisalOccupationalGroupStatusChange();
        }
        if (hasDeletedAppraisalOccupationalGroup) {
            handleDeletedAppraisalOccupationalGroupStatusChange();
        }

    }, [
        detailedOccupationalGroupsData,
        hasNewAppraisalOccupationalGroupCreated,
        hasUpdatedAppraisalOccupationalGroup,
        hasDeletedAppraisalOccupationalGroup,
    ]);

    return (
        <>
            <Form>
                <Card>
                    <CardHeader className="bg-white border-0">
                        <Row>
                            <Col xs="6">
                                <h3 className="mb-0">Grupos Ocupacionais</h3>
                            </Col>
                            <Col className="text-right" xs="6">
                                <Button
                                    className="btn-round btn-icon"
                                    color="primary"
                                    href="#pablo"
                                    id="tooltip2"
                                    onClick={(e) => { e.preventDefault(); handleOpenOccupationalGroupModal(); }}
                                    size="sm"
                                >
                                    <span className="btn-inner--icon mr-1">
                                        <i className="fas fa-solid fa-plus"></i>
                                    </span>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                                <UncontrolledTooltip delay={0} target="tooltip2">
                                    Novo Grupo
                                </UncontrolledTooltip>
                            </Col>
                        </Row>
                    </CardHeader>

                    <Table className="align-items-center table-flush" hover responsive>
                        <thead className="thead-light">
                            <tr>
                                <th className="sort" data-sort="name" scope="col" >Nome</th>
                                <th className="sort" data-sort="createdAt" scope="col" >Criado Em</th>
                                <th className="sort text-right" data-sort="actions" scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailedOccupationalGroupsData && detailedOccupationalGroupsData.length > 0 ? (
                                detailedOccupationalGroupsData.map((occupationalGroup) => (
                                    <tr className="table-" key={occupationalGroup.id}>
                                        <td className="table-user">
                                            <b>{occupationalGroup.competencieName}</b>
                                        </td>
                                        <td>
                                            <span className="text-muted">
                                                {formatDate(occupationalGroup.createdAt)}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"
                                                    color=""
                                                    role="button"
                                                    size="sm"
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        Detalhes
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => { e.preventDefault(); handleOpenOccupationalGroupUpdateModal(occupationalGroup.id) }}
                                                    >
                                                        Editar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => { e.preventDefault(); showWarningAlert(occupationalGroup.id, occupationalGroup.competencieName); }}
                                                    >
                                                        Deletar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhum dado de grupo ocupacional encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
                {/* <ShowRoleDescriptionsModal
                handleShowRoleDescriptionsModal={handleShowRoleDescriptionsModal}
                modalOpen={modalOpen}
                roleDescription={descriptionSelectedRole}
                roleName={nameSelectedRole}
            />
            <ShowFunctionsDescriptionsModal
                handleShowFunctionsDescriptionsModal={handleShowFunctionsDescriptionsModal}
                functionsDescriptionsModalOpen={functionsDescriptionsModalOpen}
                employeeFunctionDescription={descriptionSelectedFunction}
                employeeFunctionName={nameSelectedFunction}
            /> */}
            </Form>
            <OccupationalGroupModal
                handleOpenOccupationalGroupModal={handleOpenOccupationalGroupModal}
                occupationalGroupModalOpen={occupationalGroupModalOpen}
                occupationalGroupIdToUpdate={occupationalGroupIdToUpdate}
                handleOccupationalGroupIdToUpdate={handleOccupationalGroupIdToUpdate}
            />
        </>
    );
}

export default OccupationalGroupList;
