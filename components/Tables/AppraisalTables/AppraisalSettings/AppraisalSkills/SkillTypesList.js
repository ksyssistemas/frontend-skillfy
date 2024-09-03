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
import ShowRoleDescriptionsModal from "../../../../Modals/admin/show-role-descriptions";
import ShowFunctionsDescriptionsModal from "../../../../Modals/admin/show-functions-descriptions";
import { AppraisalSkillsContext } from "../../../../../contexts/PerformanceContext/AppraisalSkillsContext";
import { useSweetAlert } from "../../../../../contexts/SweetAlertContext";
import { useFindAllSkillTypes } from "../../../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindAllSkillTypes";
import { useDeleteSkillType, useDeleteSkillTypes } from "../../../../../hooks/DefinitionOptionsReview/SkillsTypes/useDeleteSkillType";
import SkillTypesModal from "../../../../Modals/AppraisalModal/SkillTypesModal";
import { useFindSkillClassification } from "../../../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindSkillClassification";
import { useFindOccupationalGroup } from "../../../../../hooks/DefinitionOptionsReview/OccupationalGroups/useFindOccupationalGroup";

function SkillsList() {

    const {
        hasUpdatedAppraisalSkillType,
        handleUpdatedAppraisalSkillTypeStatusChange,
        hasNewAppraisalSkillTypeCreated,
        handleCreatedAppraisalSkillTypeStatusChange,
        hasDeletedAppraisalSkillType,
        handleDeletedAppraisalSkillTypeStatusChange,
    } = useContext(AppraisalSkillsContext);

    const { warningAlert } = useSweetAlert();

    const [detailedSkillTypeData, setDetailedSkillTypeData] = useState([]);

    const [skillTypeModalOpen, setSkillTypeModalOpen] = useState(false);

    function handleOpenSkillTypeModal() {
        setSkillTypeModalOpen(!skillTypeModalOpen);
    }

    const [skillTypeIdToUpdate, setSkillTypeIdToUpdate] = useState('');

    function handleSkillTypeIdToUpdate() {
        setSkillTypeIdToUpdate('');
    }

    function handleSkillTypeUpdate(skillTypeId) {
        setSkillTypeIdToUpdate(skillTypeId);
        setSkillTypeModalOpen(true);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function handleOpenSkillTypeUpdateModal(skillTypeId) {
        handleSkillTypeUpdate(skillTypeId);
        handleOpenSkillTypeModal();
    }

    const handleDeleteSkillType = async (skillTypeId, skillTypeName) => {
        try {
            const deleteResponse = await useDeleteSkillType(skillTypeId);
            if (deleteResponse !== null) {
                handleDeletedAppraisalSkillTypeStatusChange();
            } else {
                console.error('Failed to delete skill type with ID:', skillTypeId, '. Response Status: ', deleteResponse.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    const showWarningAlert = (skillTypeId, skillTypeName) => {
        warningAlert(
            `${skillTypeId}`,
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir ${skillTypeName}?`,
            "lg",
            () => handleDeleteSkillType(skillTypeId, skillTypeName)
        );
    };

    useEffect(() => {
        const fetchCompanyNamesAndRoles = async (skillTypes) => {
            const updatedSkillTypes = await Promise.all(
              skillTypes.map(async (skillType) => {
                try {
                    if (!skillType.skilClassificationId || !skillType.occupationalGroupId) {
                        return {
                            ...skillType,
                            skilClassificationName: 'Unknown',
                            occupationalGroupName: 'Unknown',
                        };
                    }
                  const skilClassificationData = await useFindSkillClassification(skillType.skillClassificationId);
                  const occupationalGroupData = await useFindOccupationalGroup(skillType.occupationalGroupId);
                  return {
                    ...skillType,
                    skilClassificationName: skilClassificationData.competenceClassificationName,
                    occupationalGroupName: occupationalGroupData.competencieName,
                  };
                } catch (error) {
                  console.error(`Error fetching Skill Classification and Occupational Group data for skillTypeId ${skillType.id}:`, error);
                  return {
                    ...skillType,
                    skilClassificationName: 'Unknown',
                    occupationalGroupName: 'Unknown',
                  };
                }
              })
            );
            setDetailedSkillTypeData(updatedSkillTypes);
          };

        const fetchSkillTypes = async () => {
            if(!detailedSkillTypeData.lenght ||
                hasNewAppraisalSkillTypeCreated ||
                hasUpdatedAppraisalSkillType ||
                hasDeletedAppraisalSkillType
            ) {
                try {
                    const foundTypes = await useFindAllSkillTypes();
                    await fetchCompanyNamesAndRoles(foundTypes);
                } catch (error) {
                    console.error('Error fetching types:', error);
                }
            }
        };

        fetchSkillTypes();
        if (hasNewAppraisalSkillTypeCreated) {
            handleCreatedAppraisalSkillTypeStatusChange();
        }
        if (hasUpdatedAppraisalSkillType) {
            handleUpdatedAppraisalSkillTypeStatusChange();
        }
        if (hasDeletedAppraisalSkillType) {
            handleDeletedAppraisalSkillTypeStatusChange();
        }

    }, [
        hasNewAppraisalSkillTypeCreated,
        hasUpdatedAppraisalSkillType,
        hasDeletedAppraisalSkillType,
    ]);

    return (
        <>
            <Form>
                <Card>
                    <CardHeader className="bg-white border-0">
                        <Row>
                            <Col xs="6">
                                <h3 className="mb-0">Tipos de Competências</h3>
                            </Col>
                            <Col className="text-right" xs="6">
                                <Button
                                    className="btn-round btn-icon"
                                    color="primary"
                                    href="#pablo"
                                    id="tooltip3"
                                    onClick={(e) => { e.preventDefault(); handleOpenSkillTypeModal(); }}
                                    size="sm"
                                >
                                    <span className="btn-inner--icon mr-1">
                                        <i className="fas fa-solid fa-plus"></i>
                                    </span>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                                <UncontrolledTooltip delay={0} target="tooltip3">
                                    Novo Tipo
                                </UncontrolledTooltip>
                            </Col>
                        </Row>
                    </CardHeader>

                    <Table className="align-items-center table-flush" hover responsive>
                        <thead className="thead-light">
                            <tr>
                                <th className="sort" data-sort="name" scope="col" >Nome</th>
                                <th className="sort" data-sort="createdAt" scope="col" >Criado Em</th>
                                <th className="sort" data-sort="classification" scope="col">Classificação</th>
                                <th className="sort" data-sort="group" scope="col">Grupo Ocupacional</th>
                                <th className="sort text-right" data-sort="actions" scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailedSkillTypeData && detailedSkillTypeData.length > 0 ? (
                                detailedSkillTypeData.map((skillType) => (
                                    <tr className="table-" key={skillType.id}>
                                        <td className="table-user">
                                            <b>{skillType.competencieTypeName}</b>
                                        </td>
                                        <td>
                                            <span className="text-muted">
                                                {formatDate(skillType.createdAt)}
                                            </span>
                                        </td>
                                        <td className="table-user">
                                            <b>{skillType.skilClassificationName}</b>
                                        </td>
                                        <td className="table-user">
                                            <b>{skillType.occupationalGroupName}</b>
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
                                                        onClick={(e) => { e.preventDefault(); handleOpenSkillTypeUpdateModal(skillType.id) }}
                                                    >
                                                        Editar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => { e.preventDefault(); showWarningAlert(skillType.id, skillType.competencieTypeName); }}
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
                                    <td colSpan="5">Nenhum dado de tipo de competência encontrado.</td>
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
            <SkillTypesModal
                handleOpenSkillTypeModal={handleOpenSkillTypeModal}
                skillTypeModalOpen={skillTypeModalOpen}
                skillTypeIdToUpdate={skillTypeIdToUpdate}
                handleSkillTypeIdToUpdate={handleSkillTypeIdToUpdate}
            />
        </>
    );
}

export default SkillsList;
