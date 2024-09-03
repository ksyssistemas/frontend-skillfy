import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    Form,
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Row,
    UncontrolledTooltip,
    Col,
    Button,
} from "reactstrap";
import { useFindAllSkillClassifications } from "../../../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindAllSkillClassifications";
import ShowRoleDescriptionsModal from "../../../../Modals/admin/show-role-descriptions";
import ShowFunctionsDescriptionsModal from "../../../../Modals/admin/show-functions-descriptions";
import { AppraisalSkillsContext } from "../../../../../contexts/PerformanceContext/AppraisalSkillsContext";
import SkillClassificationModal from "../../../../Modals/AppraisalModal/SkillClassificationModal";
import { useDeleteSkillClassification } from "../../../../../hooks/DefinitionOptionsReview/SkillsClassifications/useDeleteSkillClassification";
import { useSweetAlert } from "../../../../../contexts/SweetAlertContext";

function SkillClassificationList() {

    const {
        hasNewAppraisalSkillClassificationCreated,
        handleCreatedAppraisalSkillClassificaitonStatusChange,
        hasUpdatedAppraisalSkillClassificaiton,
        handleUpdatedAppraisalSkillClassificaitonStatusChange,
        hasDeletedAppraisalSkillClassification,
        handleDeletedAppraisalSkillClassificationStatusChange
    } = useContext(AppraisalSkillsContext);

    const { warningAlert } = useSweetAlert();

    const [detailedSkillClassificationData, setDetailedSkillClassificationData] = useState([]);

    const [skillClassificationModalOpen, setSkillClassificationModalOpen] = useState(false);

    function handleOpenAddSkillClassificationModal() {
        setSkillClassificationModalOpen(!skillClassificationModalOpen);
    }

    const [skillClassificationIdToUpdate, setSkillClassificationIdToUpdate] = useState('');

    function handleSkillClassificationIdToUpdate() {
        setSkillClassificationIdToUpdate('');
    }

    function handleSkillClassificationUpdate(skillClassificationId) {
        setSkillClassificationIdToUpdate(skillClassificationId);
        setSkillClassificationModalOpen(true);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function handleOpenSkillClassificationUpdateModal(classificationId) {
        handleSkillClassificationUpdate(classificationId);
        handleOpenAddSkillClassificationModal();
    }

    const handleDeleteSkillClassification = async (classificationId, classificationName) => {
        try {
            const deleteResponse = await useDeleteSkillClassification(classificationId);
            if (deleteResponse !== null) {
                handleDeletedAppraisalSkillClassificationStatusChange();
            } else {
                console.error('Failed to delete cycle with ID:', classificationId, '. Response Status: ', deleteResponse.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    const showWarningAlert = (classificationId, classificationName) => {
        warningAlert(
            `${classificationId}`,
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir ${classificationName}?`,
            "lg",
            () => handleDeleteSkillClassification(classificationId, classificationName)
        );
    };

    useEffect(() => {
        const fetchSkillClassifications = async () => {
            try {
                const foundClassifications = await useFindAllSkillClassifications();
                setDetailedSkillClassificationData(foundClassifications);
            } catch (error) {
                console.error('Error fetching classifications:', error);
            }
        };

        fetchSkillClassifications();
        if (hasNewAppraisalSkillClassificationCreated) {
            handleCreatedAppraisalSkillClassificaitonStatusChange();
        }
        if (hasUpdatedAppraisalSkillClassificaiton) {
            handleUpdatedAppraisalSkillClassificaitonStatusChange();
        }
        if (hasDeletedAppraisalSkillClassification) {
            handleDeletedAppraisalSkillClassificationStatusChange();
        }

    }, [
        detailedSkillClassificationData,
        hasNewAppraisalSkillClassificationCreated,
        hasUpdatedAppraisalSkillClassificaiton,
        hasDeletedAppraisalSkillClassification,
    ]);

    return (
        <>
            <Form>
                <Card>
                    <CardHeader className="bg-white border-0">
                        <Row>
                            <Col xs="6">
                                <h3 className="mb-0">Classificaçôes de Competência</h3>
                            </Col>
                            <Col className="text-right" xs="6">
                                <Button
                                    className="btn-round btn-icon"
                                    color="primary"
                                    href="#pablo"
                                    id="tooltip1"
                                    onClick={(e) => { e.preventDefault(); handleOpenAddSkillClassificationModal(); }}
                                    size="sm"
                                >
                                    <span className="btn-inner--icon mr-1">
                                        <i className="fas fa-solid fa-plus"></i>
                                    </span>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                                <UncontrolledTooltip delay={0} target="tooltip1">
                                    Nova Classificação
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
                            {detailedSkillClassificationData && detailedSkillClassificationData.length > 0 ? (
                                detailedSkillClassificationData.map((classifications) => (
                                    <tr className="table-" key={classifications.id}>
                                        <td className="table-user">
                                            <b>{classifications.competenceClassificationName}</b>
                                        </td>
                                        <td>
                                            <span className="text-muted">
                                                {formatDate(classifications.createdAt)}
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
                                                        onClick={(e) => { e.preventDefault(); handleOpenSkillClassificationUpdateModal(classifications.id) }}
                                                    >
                                                        Editar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => { e.preventDefault(); showWarningAlert(classifications.id, classifications.competenceClassificationName); }}
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
                                    <td colSpan="5">Nenhum dado de classificação encontrado.</td>
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
            <SkillClassificationModal
                handleOpenAddSkillClassificationModal={handleOpenAddSkillClassificationModal}
                skillClassificationModalOpen={skillClassificationModalOpen}
                skillClassificationIdToUpdate={skillClassificationIdToUpdate}
                handleSkillClassificationIdToUpdate={handleSkillClassificationIdToUpdate}
            />
        </>
    );
}

export default SkillClassificationList;
