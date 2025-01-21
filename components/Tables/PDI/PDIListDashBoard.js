
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
    Progress
} from "reactstrap";
import { useFindAllPDI } from '../../../hooks/RecordsHooks/pdi/useFindAllPdi';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import { useDeletePdi } from '../../../hooks/RecordsHooks/pdi/useDeletePdi';
import { PdiContext } from '../../../contexts/RecordsContext/PdiContext';
import { useFindAdmin } from '../../../hooks/RecordsHooks/admin/useFindAdmin';
import { useFindClientCompany } from '../../../hooks/RecordsHooks/customer/useFindClientCompany';
import { useFindCompetencies } from '../../../hooks/RecordsHooks/pdi/competencies/useFindCompetencies';
import { useFindAllAdmin } from '../../../hooks/RecordsHooks/admin/useFindAllAdmin';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import ModalPdi from '../../Modals/pdi/ModalPdi';
import ShowPdiDetailsModal from "../../Modals/pdi/ShowPdiDetailsModal";
import mockPdi from '../../../mocks/mockPdi';
import mockCompetencie from '../../../mocks/mockCompetencie';

export function PDIListDashBoard() {

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
            if (userPdiAccountData.length <= 0 || hasUpdatedPdiRecord || hasDeletedPdiRecord) {
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

    const handleDeletePdi = async (pdiId) => {
        if (pdiId) {
            try {
                const deleteResponse = await useDeletePdi(pdiId);
                console.log('DeleteResponse: ', deleteResponse);
                if (deleteResponse !== null) {
                    console.log("Deletado com sucesso!");
                } else {
                    console.error('Failed to delete pdi with ID:', pdiId, '. Response Status: ', deleteResponse.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

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

    const [adminDataList, setAdminDataList] = useState([]);
    const handleAdminDataList = (adminUser) => {
        setAdminDataList(adminUser);
    };

    useEffect(() => {
        if (adminDataList.length === 0) {
            employmentContractDataSearchAndProcess(
                useFindAllAdmin,
                handleAdminDataList,
                'admin',
                'AdminUserRegister'
            );
        }

    }, [])

    const [adminDataCache, setAdminDataCache] = useState({});
    const [loadingAdmins, setLoadingAdmins] = useState(true);

    useEffect(() => {
        const fetchAllAdminData = async () => {
            try {
                const uniqueAdminIds = [
                    ...new Set(userPdiAccountData.map((pdi) => pdi.assessorId)),
                ];

                const adminDataPromises = uniqueAdminIds.map(async (id) => {
                    const adminData = await useFindClientCompany(id);
                    return { id, adminData };
                });

                const adminDataResults = await Promise.all(adminDataPromises);

                const newCache = {};
                adminDataResults.forEach(({ id, adminData }) => {
                    newCache[id] = adminData;
                });
                setAdminDataCache(newCache);
            } catch (error) {
                console.error('Erro ao buscar dados dos customer:', error);
            } finally {
                setLoadingAdmins(false);
            }
        };

        fetchAllAdminData();
    }, [userPdiAccountData]);

    const calculateProgress = (startDate, endDate) => {
        const now = new Date(); 
        const start = new Date(startDate); 
        const end = new Date(endDate); 

        if (now < start) return 0;

        if (now > end) return 100;

        const totalDuration = end - start;
        const elapsedDuration = now - start;
        const progress = (elapsedDuration / totalDuration) * 100;

        return progress;
    };

    const getProgressColor = (progress) => {
        if (progress <= 33) {
          return "red"; 
        } else if (progress <= 66) {
          return "orange"; 
        } else {
          return "green"; // Verde
        }
      };
      

    return (
        <Card>
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
                        <th className="text-left"><b>Avaliador</b></th>
                        <th className="text-left"><b>Competência(s)</b></th>
                        <th className="text-left"><b>Situação</b></th>
                        <th className="text-left"><b>Progresso</b></th>
                    </tr>
                </thead>
                <tbody>
                    {loadingAdmins ? (
                        <tr>
                            <td colSpan="5">Carregando administradores...</td>
                        </tr>
                    ) : (
                        userPdiAccountData.map((pdi) => {
                            const adminData = adminDataCache[pdi.assessorId];
                            const competencies = pdi.competencies || [];
                            const progress = calculateProgress(pdi.startDate, pdi.endDate);
                            const progressColor = getProgressColor(progress);
                            return (
                                <tr key={pdi.id}>
                                    <td className="text-left">
                                        {adminData ? (
                                            <span>{adminData.companyName}</span>
                                        ) : (
                                            <span>Dados não encontrados</span>
                                        )}
                                    </td>
                                    <td className="text-left">
                                        {competencies.length > 0 ? (
                                            competencies
                                                .map((competencyData) => competencyData.competency?.name || "Dados não encontrados")
                                                .join(", ")
                                        ) : (
                                            <span>Sem competências</span>
                                        )}
                                    </td>
                                    <td className="text-left">
                                        <span>{pdi.status}</span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="mr-2">
                                                {Math.round(progress)}%
                                            </span>
                                            <div>
                                                <Progress
                                                    max="100"
                                                    value={Math.round(progress)}
                                                    color={progressColor}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
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

export default PDIListDashBoard;