
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
import { useFindCompetencies } from '../../../hooks/RecordsHooks/pdi/competencies/useFindCompetencies';
import { useFindAllAdmin } from '../../../hooks/RecordsHooks/admin/useFindAllAdmin';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import ModalPdi from '../../Modals/pdi/ModalPdi';
import ShowPdiDetailsModal from "../../Modals/pdi/ShowPdiDetailsModal";

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
            if (userPdiAccountData.length <= 0 || hasUpdatedPdiRecord || hasDeletedPdiRecord) {
                try {
                    const foundPdi = await useFindAllPDI();
                    setUserPdiAccountData(foundPdi);
                    console.log(foundPdi);
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
        console.log(pdiId);
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
    // console.log(adminDataList);

    const [adminDataCache, setAdminDataCache] = useState({});
    const [loadingAdmins, setLoadingAdmins] = useState(true);

    useEffect(() => {
        const fetchAllAdminData = async () => {
            try {
                // Coletar todos os IDs únicos de administradores
                const uniqueAdminIds = [
                    ...new Set(userPdiAccountData.map((pdi) => pdi.assessorId)),
                ];

                const adminDataPromises = uniqueAdminIds.map(async (id) => {
                    const adminData = await useFindAdmin(id);
                    return { id, adminData };
                });

                const adminDataResults = await Promise.all(adminDataPromises);

                // Atualizar o cache com os dados carregados
                const newCache = {};
                adminDataResults.forEach(({ id, adminData }) => {
                    newCache[id] = adminData;
                });

                setAdminDataCache(newCache);
            } catch (error) {
                console.error('Erro ao buscar dados dos administradores:', error);
            } finally {
                setLoadingAdmins(false);
            }
        };

        fetchAllAdminData();
    }, [userPdiAccountData]);

    const [competencieDataCache, setCompetencieDataCache] = useState({});
    const [loadingCompetencies, setLoadingCompetencies] = useState(true);

    useEffect(() => {
        const fetchAllCompetencieData = async () => {
            try {
                // Coletar todos os IDs únicos de administradores
                const uniqueCompetencieIds = [
                    ...new Set(userPdiAccountData.map((pdi) => pdi.competencyId)),
                ];

                const competencieDataPromises = uniqueCompetencieIds.map(async (id) => {
                    const competencieData = await useFindCompetencies(id);
                    return { id, competencieData };
                });

                const competencieDataResults = await Promise.all(competencieDataPromises);

                // Atualizar o cache com os dados carregados
                const newCache = {};
                competencieDataResults.forEach(({ id, competencieData }) => {
                    newCache[id] = competencieData;
                });

                setCompetencieDataCache(newCache);
            } catch (error) {
                console.error('Erro ao buscar dados das competências:', error);
            } finally {
                setLoadingCompetencies(false);
            }
        };

        fetchAllCompetencieData();
    }, [userPdiAccountData]);


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
                        <th className="text-left">Avaliador</th>
                        <th className="text-left">Competência</th>
                        <th className="text-left">Sugestão</th>
                        <th className="text-left">Situação</th>
                        <th className="text-left">Progresso</th>
                    </tr>
                </thead>
                <tbody>
                    {loadingAdmins && loadingCompetencies ? (
                        <tr>
                            <td colSpan="5">Carregando administradores...</td>
                        </tr>
                    ) : (
                        userPdiAccountData.map((pdi) => {
                            const adminData = adminDataCache[pdi.assessorId];
                            console.log("pdi.competencies",pdi.competencies);
                            const competencieDataList = pdi.competencies.map((competency) =>
                                competencieDataCache[competency.competencyId]

                            );

                            return (
                                <tr key={pdi.id}>
                                    <td className="text-left">
                                        {adminData ? (
                                            <b>{adminData.name}</b>
                                        ) : (
                                            <span>Dados não encontrados</span>
                                        )}
                                    </td>
                                    <td className="text-left">
                                        {competencieDataList.length > 0 ? (
                                            competencieDataList.map((competencieData, index) =>
                                                competencieData ? (
                                                    <b key={index}>{competencieData.name}</b>
                                                ) : (
                                                    <span key={index}>Dados não encontrados</span>
                                                )
                                            ).reduce((prev, curr) => [prev, ', ', curr]) 
                                        ) : (
                                            <span>Sem competências</span>
                                        )}
                                    </td>
                                    <td className="text-left">
                                        <b className="text-left">{pdi.suggestion}</b>
                                    </td>
                                    <td className="text-left">
                                        <b className="text-left">{pdi.status}</b>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="mr-2">100%</span>
                                            <div>
                                                <Progress
                                                    max="100"
                                                    value="100"
                                                    color="gradient-success"
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