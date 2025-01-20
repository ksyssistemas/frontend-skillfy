
import React, { useState, useEffect, useContext } from 'react';
// nodejs library that concatenates classes

// reactstrap components
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
    UncontrolledTooltip,
} from "reactstrap";
import { useFindAllPDI } from '../../../hooks/RecordsHooks/pdi/useFindAllPdi';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import { useDeletePdi } from '../../../hooks/RecordsHooks/pdi/useDeletePdi';
import { PdiContext } from '../../../contexts/RecordsContext/PdiContext';
import ModalPdi from '../../Modals/pdi/ModalPdi';
import ShowPdiDetailsModal from "../../Modals/pdi/ShowPdiDetailsModal";
import { useAlert } from '../../../contexts/AlertContext';
export function PDIList() {

    const {
        pdiIdToUpdate,
        handlePdiIdStatusCleanupToUpdate,
        handlePdiIdToUpdate,
        hasNewPdiRecordCreated,
        handleCreatedPdiRecordStatusChange,
        hasUpdatedPdiRecord,
        handleUpdatedPdiRecordStatusChange,
        hasDeletedPdiRecord,
        handleDeletedPdiRecordStatusChange,
    } = useContext(PdiContext);

    const { warningAlert } = useSweetAlert();

    const [userPdiAccountData, setUserPdiAccountData] = useState([]);

    const [pdiDeleteSuccess, setPdiDeleteSuccess] = useState(null);

    function handlePdiUpdate(pdiId) {
        handlePdiIdToUpdate(pdiId);
        handleOpenPdiUpdateModal();
    }

    const [selectedIdToShowPdiDetails, setSelectedIdToShowPdiDetails] = useState(null);
    function handleCleaningSelectedIdToShowPdiDetails() {
        setSelectedIdToShowPdiDetails(null)
    }

    const [modalShowDetailsOpen, setModalShowDetailsOpen] = useState(false);

    function handleOpenPdiModal() {
        setModalShowDetailsOpen(!modalShowDetailsOpen);
    }

    function handleShowPdiDetailsModal(pdiId) {
        console.log(pdiId);
        setSelectedIdToShowPdiDetails(pdiId);
        handleOpenPdiModal();
    }

    const commonProps = {
        handleShowPdiDetailsModal,
        selectedIdToShowPdiDetails,
        handleCleaningSelectedIdToShowPdiDetails,
        handleOpenPdiModal,
        modalShowDetailsOpen,
    };

    const shouldShowModal = (selectedIdToShowPdiDetails && selectedIdToShowPdiDetails !== 0) || (pdiIdToUpdate && pdiIdToUpdate !== 0);

    const [modalPdiOpen, setModalPdiOpen] = React.useState(false);

    const handleOpenPdiUpdateModal = () => {
        setModalPdiOpen(!modalPdiOpen);
    };

    useEffect(() => {
        const fetchPdi = async () => {
            if (userPdiAccountData.length <= 0 || hasUpdatedPdiRecord || hasDeletedPdiRecord || pdiDeleteSuccess) {
                try {
                    const foundPdi = await useFindAllPDI();
                    setUserPdiAccountData(foundPdi);
                } catch (error) {
                    console.error('Error fetching pdi:', error);
                }
            }
        };
        fetchPdi();
        if (hasUpdatedPdiRecord) {
            handleUpdatedPdiRecordStatusChange();
        }
        if (hasDeletedPdiRecord) {
            handlePdiIdStatusCleanupToUpdate();
            handleDeletedPdiRecordStatusChange();
        }
    }, [
        userPdiAccountData,
        hasUpdatedPdiRecord,
        hasDeletedPdiRecord,
    ])

    const { showAlert } = useAlert();

    const handleDeletePdi = async (pdiId) => {
        if (pdiId) {
            try {
                const deleteResponse = await useDeletePdi(pdiId);
                if (deleteResponse !== null) {
                    setPdiDeleteSuccess("PDI deletado com sucesso!");
                } else {
                    console.error('Failed to delete pdi with ID:', pdiId, '. Response Status: ', deleteResponse.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

     useEffect(() => {
            if (pdiDeleteSuccess) {
                showAlert(
                    "success",
                    "ni ni-check-bold",
                    "Sucesso!",
                    "PDI deletado com sucesso!"
                );
                setPdiDeleteSuccess(null);
            }
        }, [pdiDeleteSuccess]);

    const showWarningAlert = (pdiId) => {
        warningAlert(
            `${pdiId}`,
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir ${pdiId}?`,
            "lg",
            () => handleDeletePdi(pdiId)
        );
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    
        const day = String(adjustedDate.getDate()).padStart(2, '0');
        const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
        const year = adjustedDate.getFullYear();
    
        return `${day}/${month}/${year}`;
      }

    return (
        <Card>
            {/** CardHeader with Button register and export */}
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col xs="6">
                        <h3 className="mb-0">Lista de Planos de Desenvolvimento Pessoais</h3>
                    </Col>
                </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="text-left">Nome</th>
                        <th className="text-left">Descrição</th>
                        <th className="text-left">Prazo Inícial</th>
                        <th className="text-left">Prazo final</th>
                        <th className="text-left">Situação</th>
                        <th className="text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {userPdiAccountData.map((pdi) => (
                        <tr>
                            <td className="text-left">
                                <b className="text-left">{pdi.name}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{pdi.description}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{formatDate(pdi.startDate)}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{formatDate(pdi.endDate)}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{pdi.status}</b>
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
                                            onClick={(e) => { e.preventDefault(); handleShowPdiDetailsModal(pdi.id) }}
                                        >
                                            Detalhes
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={(e) => { e.preventDefault(); handlePdiUpdate(pdi.id); }}
                                        >
                                            Editar
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={(e) => { e.preventDefault(); showWarningAlert(pdi.id); }}
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
            <ModalPdi
                handleOpenPdiUpdateModal={handleOpenPdiUpdateModal}
                modalOpen={modalPdiOpen}
            />
                <ShowPdiDetailsModal {...commonProps} />
        </Card>
    );
};

export default PDIList;