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
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

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

    const { SearchBar } = Search;

    const pagination = paginationFactory({
        page: 1,
        alwaysShowAllBtns: true,
        showTotal: true,
        withFirstAndLast: false,
        sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
            <div className="dataTables_length" id="datatable-basic_length">
                <label>
                    Exibir{" "}
                    {
                        <select
                            name="datatable-basic_length"
                            aria-controls="datatable-basic"
                            className="form-control form-control-sm"
                            onChange={(e) => onSizePerPageChange(e.target.value)}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    }{" "}
                    registros.{" "}
                </label>
            </div>
        ),
        paginationTotalRenderer: (from, to, size) => (
            <span>
                {' '}Exibindo as linhas {from} a {to} de {size}
            </span>
        ),
    });

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();

    const data = [
        {
            id: 1,
            evidenceName: "Call with Dave",
            createdAt: new Date(y, m, 1),
            status: true,
            className: "bg-red",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum abacaxi sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },

        {
            id: 2,
            evidenceName: "Lunch meeting",
            createdAt: new Date(y, m, d - 1, 10, 30),
            status: true,
            className: "bg-orange",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sorvete sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },

        {
            id: 3,
            evidenceName: "All day conference",
            createdAt: new Date(y, m, d + 7, 12, 0),
            status: true,
            className: "bg-green",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum bolacha sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },
    ]

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
                        console.log('Error => ', error);
                        //console.error(`Error fetching skill type data. `, error);
                        return {
                            ...evidence,
                            skillTypeName: 'Unknown',
                        };
                    }
                })
            );
            console.log("Updated Evidences: ", updatedEvidences);
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
        hasUpdatedAppraisalEvidences,
        hasNewAppraisalEvidencesCreated,
        hasDeletedAppraisalEvidences,
    ]);

    return (
        <>
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
                                Nova Evidência
                            </UncontrolledTooltip>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {data ? (
                        <ToolkitProvider
                            data={data}
                            keyField="id"
                            columns={[
                                {
                                    dataField: "description",
                                    text: "Evidência",
                                    sort: true,
                                    headerStyle: { width: "65%", minWidth: "200px" },
                                    style: { whiteSpace: "normal", wordWrap: "break-word" },
                                },
                                {
                                    dataField: "evidenceName",
                                    text: "Título",
                                    sort: true,
                                    headerStyle: { width: "20%", minWidth: "80px" },
                                },
                                {
                                    dataField: "createdAt",
                                    text: "Adicionada Em",
                                    sort: true,
                                    formatter: (cell) => new Date(cell).toLocaleDateString("pt-BR"),
                                    headerStyle: { width: "10%", minWidth: "40px" },
                                },
                                {
                                    dataField: "status",
                                    text: "Estado",
                                    sort: true,
                                    formatter: (cell) => (cell ? "Ativo" : "Inativo"),
                                    headerStyle: { width: "5%", minWidth: "20px" },
                                },
                            ]}
                            search
                        >
                            {(props) => (
                                <div className="table-responsive">
                                    <div
                                        id="datatable-basic_filter"
                                        className="dataTables_filter pb-1 w-50"
                                    >
                                        <SearchBar
                                            className="form-control-sm"
                                            style={{
                                                height: "40px",
                                                width: 564,
                                                fontSize: "16px",
                                                padding: "10px",
                                                borderRadius: "8px",
                                            }}
                                            placeholder="Pesquise por alguma evidência expecifica aqui ..."
                                            {...props.searchProps}
                                        />
                                    </div>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        bootstrap4={true}
                                        pagination={pagination}
                                        bordered={false}
                                    />
                                </div>
                            )}
                        </ToolkitProvider>
                    ) : (
                        <div className="px-0">
                            <div className="col">
                                <small>Nenhum dado de evidência encontrado.</small>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
            <EvidencesModal
                handleOpenEvidencesModal={handleOpenEvidencesModal}
                evidencesModalOpen={evidencesModalOpen}
            />
        </>
    );
}

export default EvidencesList;
