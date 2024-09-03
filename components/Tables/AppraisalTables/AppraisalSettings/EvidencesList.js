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
    ListGroup,
    ListGroupItem,
} from "reactstrap";
import { useSweetAlert } from "../../../../contexts/SweetAlertContext";
import EvidencesModal from "../../../Modals/AppraisalModal/EvidencesModal";
import { EvidencesContext } from "../../../../contexts/PerformanceContext/AppraisalEvidencesContext";
import { useFindAllEvidences } from "../../../../hooks/DefinitionOptionsReview/AppraisalEvidences/useFindAllEvidences";
import { useDeleteEvidence } from "../../../../hooks/DefinitionOptionsReview/AppraisalEvidences/useDeleteEvidence";
import { useFindSkillType } from "../../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindSkillType";

function EvidencesList() {

    const {
        evidencesIdToUpdate,
        handleEvidenceIdStatusCleanupToUpdate,
        handleEvidencesIdToUpdate,
        hasUpdatedAppraisalEvidences,
        handleUpdatedAppraisalEvidencesStatusChange,
        hasNewAppraisalEvidencesCreated,
        handleCreatedAppraisalEvidencesStatusChange,
        hasDeletedAppraisalEvidences,
        handleDeletedAppraisalEvidencesStatusChange
    } = useContext(EvidencesContext);

    const { warningAlert } = useSweetAlert();

    const [detailedEvidencesData, setDetailedEvidencesData] = useState([]);

    const [evidencesModalOpen, setEvidencesModalOpen] = useState(false);

    function handleOpenEvidencesModal() {
        setEvidencesModalOpen(!evidencesModalOpen);
    }

    function handleEvidenceUpdate(evidenceId) {
        handleEvidencesIdToUpdate(evidenceId);
        setEvidencesModalOpen(true);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function handleOpenEvidenceUpdateModal(evidenceId) {
        handleEvidenceUpdate(evidenceId);
        handleOpenEvidencesModal();
    }

    const handleDeleteEvidence = async (evidenceId, evidenceName) => {
        try {
            const deleteResponse = await useDeleteEvidence(evidenceId);
            if (deleteResponse !== null) {
                handleDeletedAppraisalEvidencesStatusChange();
            } else {
                console.error('Failed to delete evidence with ID:', evidenceId, '. Response Status: ', deleteResponse.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    const showWarningAlert = (evidenceId, evidenceName) => {
        warningAlert(
            `${evidenceId}`,
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir esta evidência?`,
            "lg",
            () => handleDeleteEvidence(evidenceId, evidenceName)
        );
    };

    useEffect(() => {
        const fetchSkillTypesName = async (evidences) => {
            const updatedEvidences = await Promise.all(
                evidences.map(async (evidence) => {
                try {
                  const skillTypeData = await useFindSkillType(evidence.evidenceName);
                  return {
                    ...evidence,
                    skillTypeName: skillTypeData.competencieTypeName,
                  };
                } catch (error) {
                  console.error(`Error fetching skill type data. `, error);
                  return {
                    ...employee,
                    skillTypeName: 'Unknown',
                  };
                }
              })
            );
            setDetailedEvidencesData(updatedEvidences);
          };

        const fetchEvidences = async () => {
            try {
                const foundEvidence = await useFindAllEvidences();
                await fetchSkillTypesName(foundEvidence);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchEvidences();
        if (hasUpdatedAppraisalEvidences) {
            handleUpdatedAppraisalEvidencesStatusChange();
        }
        if (hasNewAppraisalEvidencesCreated) {
            handleCreatedAppraisalEvidencesStatusChange();
        }
        if (hasDeletedAppraisalEvidences) {
            handleDeletedAppraisalEvidencesStatusChange();
        }

    }, [
        detailedEvidencesData,
        hasUpdatedAppraisalEvidences,
        hasNewAppraisalEvidencesCreated,
        hasDeletedAppraisalEvidences,
    ]);

    return (
        <>
            <Form>
                <Card>
                    <CardHeader className="bg-white border-0">
                        <Row>
                            <Col xs="6">
                                <h3 className="mb-0">Evidências</h3>
                            </Col>
                            <Col className="text-right" xs="6">
                                <Button
                                    className="btn-round btn-icon"
                                    color="primary"
                                    href="#pablo"
                                    id="tooltip3"
                                    onClick={(e) => { e.preventDefault(); handleOpenEvidencesModal(); }}
                                    size="sm"
                                >
                                    <span className="btn-inner--icon mr-1">
                                        <i className="fas fa-solid fa-plus"></i>
                                    </span>
                                    <span className="btn-inner--text">Adicionar</span>
                                </Button>
                                <UncontrolledTooltip delay={0} target="tooltip3">
                                    Novo Evidência
                                </UncontrolledTooltip>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <ListGroup className="list my--4" flush>
                            {detailedEvidencesData && detailedEvidencesData.length > 0 ? (
                                detailedEvidencesData.map((evidence) => (
                                    <ListGroupItem className="px--4" key={evidence.id}>
                                        <Row className="align-items-center">
                                            <Col md="8">
                                                <h5 className="">{evidence.description}</h5>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-2 d-flex">
                                                    <small className="mr-2">Título:</small>
                                                    <h5 className="mb-0">{evidence.skillTypeName}</h5>
                                                </div>
                                                {/* <div className="mb-2 d-flex">
                                                    <small className="mr-2">Criado Em:</small>
                                                    <h5 className="mb-0">{formatDate(evidence.createdAt)}</h5>
                                                </div> */}
                                                <div className="mb-2">
                                                    <small className="mr-2">Ações:</small>
                                                    <a
                                                        className="table-action"
                                                        href="#pablo"
                                                        id="tooltip564981685"
                                                        onClick={(e) => { e.preventDefault(); handleOpenEvidenceUpdateModal(evidence.id) }}
                                                    >
                                                        <i className="fas fa-user-edit" />
                                                    </a>
                                                    <UncontrolledTooltip delay={0} target="tooltip564981685">
                                                        Edit product
                                                    </UncontrolledTooltip>
                                                    <a
                                                        className="table-action table-action-delete"
                                                        href="#pablo"
                                                        id="tooltip601065234"
                                                        onClick={(e) => { e.preventDefault(); showWarningAlert(evidence.id, evidence.evidenceName); }}
                                                    >
                                                        <i className="fas fa-trash" />
                                                    </a>
                                                    <UncontrolledTooltip delay={0} target="tooltip601065234">
                                                        Delete product
                                                    </UncontrolledTooltip>
                                                </div>
                                            </Col>
                                            {/* <Col md="2"> */}
                                            {/* <div className="mb-2 d-flex">
                                                    <small className="mr-2">Estado:</small>
                                                    <h5 className="mb-0">{evidence.status === true ? "Ativo" : "Inativo"}</h5>
                                                </div> */}
                                            {/* </Col> */}
                                        </Row>
                                    </ListGroupItem>
                                ))
                            ) : (
                                <ListGroupItem className="px-0">
                                    <div className="col">
                                        <small>Nenhum dado de evidência encontrado.</small>
                                    </div>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </CardBody>

                    {/* <Table className="align-items-center table-flush" hover responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th className="sort" data-sort="name" scope="col" >Título</th>
                                    <th className="sort" data-sort="createdAt" scope="col" >Criado Em</th>
                                    <th className="sort" data-sort="classification" scope="col">Contúedo</th>
                                    <th className="sort text-right" data-sort="actions" scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailedEvidencesData && detailedEvidencesData.length > 0 ? (
                                    detailedEvidencesData.map((evidence) => (
                                        <tr className="table-" key={evidence.id}>
                                            <td className="table-user">
                                                <b>{evidence.evidenceName}</b>
                                            </td>
                                            <td>
                                                <span className="text-muted">
                                                    {formatDate(evidence.createdAt)}
                                                </span>
                                            </td>
                                            <td className="table-user">
                                                <b>{evidence.description}</b>
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
                                                        //onClick={(e) => { e.preventDefault(); handleOpenEvidenceUpdateModal(skillType.id) }}
                                                        >
                                                            Editar
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            href="#pablo"
                                                        //onClick={(e) => { e.preventDefault(); showWarningAlert(skillType.id, skillType.competencieTypeName); }}
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
                        </Table> */}
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
            <EvidencesModal
                handleOpenEvidencesModal={handleOpenEvidencesModal}
                evidencesModalOpen={evidencesModalOpen}
            />
        </>
    );
}

export default EvidencesList;
