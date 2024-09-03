import React, { useContext, useEffect, useState } from 'react';
import {
    Badge,
    Card,
    CardFooter,
    CardHeader,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Row,
    Table,
    UncontrolledDropdown
} from 'reactstrap';
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import { useFindAllAppraisalCycles } from '../../../../hooks/DefinitionOptionsReview/Cycles/useFindAllAppraisalCycles';
import { CycleContext } from '../../../../contexts/PerformanceContext/CycleContext';
import { useDeleteCycle } from '../../../../hooks/DefinitionOptionsReview/Cycles/useDeleteCycle';
import { useSweetAlert } from '../../../../contexts/SweetAlertContext';

function CycleAppraisal({ handleShowAppraisalList, handleOpenAddAppraisalCycleModal, handleAppraisalCycleUpdate }) {

    const { hasUpdatedAppraisalCycle, handleUpdatedAppraisalCycleStatusChange, hasNewAppraisalCycleCreated, handleCreatedAppraisalCycleStatusChange, hasDeletedAppraisalCycle, handleDeletedAppraisalCycleStatusChange } = useContext(CycleContext);

    const { warningAlert } = useSweetAlert();

    const [detailedAppraisalCyclesData, setDetailedAppraisalCyclesData] = useState([]);

    useEffect(() => {
        const fetchAppraisalCycles = async () => {
            const foundAppraisalCycle = await useFindAllAppraisalCycles();
            setDetailedAppraisalCyclesData(foundAppraisalCycle);
        };
        fetchAppraisalCycles();
        if (hasUpdatedAppraisalCycle) {
            handleUpdatedAppraisalCycleStatusChange();
        }
        if (hasNewAppraisalCycleCreated) {
            handleCreatedAppraisalCycleStatusChange();
        }
        if (hasDeletedAppraisalCycle) {
            handleDeletedAppraisalCycleStatusChange();
        }
    }, [hasUpdatedAppraisalCycle, hasNewAppraisalCycleCreated, hasDeletedAppraisalCycle]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

        const day = String(adjustedDate.getDate()).padStart(2, '0');
        const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
        const year = adjustedDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function handleOpenCycleUpdateModal(cycleId) {
        handleAppraisalCycleUpdate(cycleId);
        handleOpenAddAppraisalCycleModal();
    }

    const handleDeleteCycle = async (cycleId, cycleName) => {
        try {
            const deleteResponse = await useDeleteCycle(cycleId);
            console.log("deleteResponse: ", deleteResponse);
            if (deleteResponse !== null) {
                console.log('Data sent successfully!', deleteResponse);
                handleDeletedAppraisalCycleStatusChange();
            } else {
                console.error('Failed to delete cycle with ID:', cycleId, '. Response Status: ', deleteResponse.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    const showWarningAlert = (cycleId, cycleName) => {
        warningAlert(
            `${cycleId}`,
            "Atenção",
            "Deletar",
            `Você deseja realmente excluir ${cycleName}?`,
            "lg",
            () => handleDeleteCycle(cycleId, cycleName)
        );
    };

    return (
        <Row>
            <div className="col">
                <Card>
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Lista de Ciclos de Avaliação</h3>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th className="sort" data-sort="name" scope="col">
                                    Título do Ciclo
                                </th>
                                <th className="sort" data-sort="budget" scope="col">
                                    Período do Ciclo
                                </th>
                                <th className="sort" data-sort="completion" scope="col">
                                    Data de Início
                                </th>
                                <th className="sort" data-sort="completion" scope="col">
                                    Data de Encerramento
                                </th>
                                <th className="sort" data-sort="status" scope="col">
                                    Estado
                                </th>
                                <th />
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody className="list">
                            {detailedAppraisalCyclesData && detailedAppraisalCyclesData.length > 0 ? (
                                detailedAppraisalCyclesData.map((cycle) => (
                                    <tr key={cycle.id}>
                                        <td scope="row">
                                            <Nav navbar>
                                                <NavItem>
                                                    <NavLink target="_blank">
                                                        <span
                                                            onClick={(e) => handleShowAppraisalList("Avaliação de Desempenho 2023")}
                                                            className="name mb-0 text-sm"
                                                        >
                                                            {cycle.appraisalNameCycle}
                                                        </span>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </td>
                                        <td scope="row">
                                            <span className="name mb-0 text-sm">
                                                {cycle.cyclePeriod}
                                            </span>
                                        </td>
                                        <td className="budget">{formatDate(cycle.appraisalCycleFromDate)}</td>
                                        <td className="budget">{formatDate(cycle.appraisalCycleDueDate)}</td>
                                        <td>
                                            <Badge color="" className="badge-dot mr-4">
                                                <i className="bg-info" />
                                                <span className="status">{cycle.status === true ? "dentro do prazo" : "pendente"}</span>
                                            </Badge>
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
                                                        onClick={(e) => { e.preventDefault(); handleOpenCycleUpdateModal(cycle.id) }}
                                                    >
                                                        Editar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => { e.preventDefault(); showWarningAlert(cycle.id, cycle.appraisalNameCycle); }}
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
                                    <td colSpan="5">Nenhum dado encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <CardFooter className="py-4">
                        <nav aria-label="...">
                            <Pagination
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                            >
                                <PaginationItem className="disabled">
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        tabIndex="-1"
                                    >
                                        <i className="fas fa-angle-left" />
                                        <span className="sr-only">Previous</span>
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem className="active">
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        2 <span className="sr-only">(current)</span>
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        3
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fas fa-angle-right" />
                                        <span className="sr-only">Next</span>
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </nav>
                    </CardFooter>
                </Card>
            </div>
        </Row>
    );
}

CycleAppraisal.defaultProps = {
    handleShowAppraisalList: () => { },
};

CycleAppraisal.propTypes = {
    handleShowAppraisalList: PropTypes.func,
};

export default withRouter(CycleAppraisal);