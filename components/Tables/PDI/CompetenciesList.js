import React, { useState, useEffect, useContext } from 'react';
import {
    Badge,
    Card,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import { useFindAllComptencies } from '../../../hooks/RecordsHooks/pdi/competencies/useFindAllCompetencies';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import { useDeleteCompetencies } from '../../../hooks/RecordsHooks/pdi/competencies/useDeleteCompetencies';
import { CompetenciesContext } from '../../../contexts/RecordsContext/CompetenciesContext';
import ModalCompetencies from '../../Modals/pdi/ModalCompetencies';
import { useAlert } from '../../../contexts/AlertContext';

function CompetenciesList({ handleShowCompetencieRegister }) {

    const {
        competenciesIdToUpdate,
        handleCompetenciesIdStatusCleanupToUpdate,
        handleCompetenciesIdToUpdate,
        hasUpdatedCompetenciesRecord,
        handleUpdatedCompetenciesRecordStatusChange,
        hasDeletedCompetenciesRecord,
        handleDeletedCompetenciesRecordStatusChange,
    } = useContext(CompetenciesContext);

    const { warningAlert } = useSweetAlert();

    const [userCompetenciesAccountData, setUserCompetenciesAccountData] = useState([]);

    function handleCompetenciesUpdate(competencieId) {
        handleCompetenciesIdToUpdate(competencieId);
        handleOpenCompetenciesUpdateModal();
    }

    const { showAlert } = useAlert();
    
    const [modalCompetenciesOpen, setModalCompetenciesOpen] = React.useState(false);

    const [needsRefresh, setNeedsRefresh] = useState(false);

    const handleOpenCompetenciesUpdateModal = () => {
        setModalCompetenciesOpen(!modalCompetenciesOpen);
    };

    useEffect(() => {
        const fetchCompetencies = async () => {
            if (userCompetenciesAccountData.length <= 0 || hasUpdatedCompetenciesRecord || hasDeletedCompetenciesRecord || needsRefresh ) {
                try {
                    const foundCompetencies = await useFindAllComptencies();
                    setUserCompetenciesAccountData(foundCompetencies);
                    if (needsRefresh) setNeedsRefresh(false);
                } catch (error) {
                    console.error('Error fetching competencies:', error);
                }
            }
        };
        fetchCompetencies();
        if (hasUpdatedCompetenciesRecord) {
            handleUpdatedCompetenciesRecordStatusChange();
        }
        if (hasDeletedCompetenciesRecord) {
            handleCompetenciesIdStatusCleanupToUpdate();
            handleDeletedCompetenciesRecordStatusChange();
        }
    }, [
        userCompetenciesAccountData,
        needsRefresh,
        hasUpdatedCompetenciesRecord,
        hasDeletedCompetenciesRecord,
    ])

    const [competencieDeleteSuccess, setCompetencieDeleteSuccess] = useState(null);
    const [competencieDeleteError, setCompetencieDeleteError] = useState(null);

    const handleDeleteCompetencie = async (competencieId) => {
        if (competencieId) {
            try {
                const deleteResponse = await useDeleteCompetencies(competencieId);
                if (deleteResponse !== null) {
                    setCompetencieDeleteSuccess("Competência deletada com sucesso!");
                    setNeedsRefresh(true);
                } else {
                    console.error('Failed to delete competencie with ID:', competencieId, '. Response Status: ', deleteResponse.status);
                    setCompetencieDeleteError("Erro ao deletear competência!");
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    const showWarningAlert = (competencieId, competencieName) => {
        warningAlert(
            `${competencieId}`,
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir ${competencieName}?`,
            "lg",
            () => handleDeleteCompetencie(competencieId)
        );
    };

        useEffect(() => {
            if (competencieDeleteSuccess) {
                showAlert(
                    "success",
                    "ni ni-check-bold",
                    "Sucesso!",
                    "Competência deletada com sucesso!"
                );
                setCompetencieDeleteSuccess(null);
            }
        }, [competencieDeleteSuccess]);
    
        useEffect(() => {
            if (competencieDeleteError) {
                showAlert(
                    "danger",
                    "ni ni-fat-remove",
                    "Erro!",
                    "Ocorreu um erro para deletar a competência!"
                );
                setCompetencieDeleteError(null);
            }
        }, [competencieDeleteError]);

    return (
        <Card>
            {/** CardHeader with Button register and export */}
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col xs="6">
                        <h3 className="mb-0">Lista de Competências</h3>
                    </Col>
                </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="text-left">Nome</th>
                        <th className="text-left">Descrição</th>
                        <th className="text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {userCompetenciesAccountData.map((competencies) => (
                        <tr key={competencies.id}>
                            <td className="text-left">
                                <b className="text-left">{competencies.name}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{competencies.description}</b>
                            </td>
                            <td className="text-left" >
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
                                            onClick={(e) => { e.preventDefault(); handleCompetenciesUpdate(competencies.id); }}
                                        >
                                            Editar
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={(e) => { e.preventDefault(); showWarningAlert(competencies.id , competencies.name); }}
                                        >
                                            Deletar
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalCompetencies
                handleOpenCompetenciesUpdateModal={handleOpenCompetenciesUpdateModal}
                modalOpen={modalCompetenciesOpen}
            />
        </Card>
    );
};

export default CompetenciesList;