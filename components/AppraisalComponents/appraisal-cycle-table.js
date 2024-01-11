import React from 'react';
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
import Link from "next/link";
import PropTypes from "prop-types";

function AppraisalCycleTable({handleShowAppraisalList}) {
    
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
                                Nome do Ciclo de Avaliação
                                </th>
                                <th className="sort" data-sort="budget" scope="col">
                                Data de Fim
                                </th>
                                <th className="sort" data-sort="completion" scope="col">
                                Localização
                                </th>
                                <th className="sort" data-sort="status" scope="col">
                                Status
                                </th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody className="list">
                        <tr>
                        <td scope="row">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink target="_blank">
                                        <span 
                                            onClick={(e) => handleShowAppraisalList("Avaliação de Desempenho 2023")} 
                                            className="name mb-0 text-sm"
                                        >
                                                Avaliação de Desempenho 2023
                                        </span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </td>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                                <i className="bg-info" />
                                <span className="status">dentro do prazo</span>
                            </Badge>
                        </td>
                        <td scope="row">
                            <span className="name mb-0 text-sm">
                                Ksys Sistemas - Blumenau
                            </span>
                        </td>
                        <td>
                            <div className="d-flex align-items-center">
                                <span className="completion mr-2">90%</span>
                                <div>
                                <Progress max="100" value="90" color="info" />
                                </div>
                            </div>
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
                                    Action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Another action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Something else here
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink target="_blank">
                                            <span 
                                                onClick={(e) => handleShowAppraisalList("Avaliação de Desempenho 2023")} 
                                                className="name mb-0 text-sm"
                                            >
                                                Avaliação de Desempenho 2022
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </td>
                            <td>
                            <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                <span className="status">pendente</span>
                            </Badge>
                            </td>
                            <td scope="row">
                            <span className="name mb-0 text-sm">
                                Ksys Sistemas - Gaspar
                            </span>
                            </td>
                            <td>
                            <div className="d-flex align-items-center">
                                <span className="completion mr-2">60%</span>
                                <div>
                                <Progress max="100" value="60" color="warning" />
                                </div>
                            </div>
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
                                    Action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Another action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Something else here
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
                        <tr>
                        <td scope="row">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink target="_blank">
                                        <span 
                                            onClick={(e) => handleShowAppraisalList("Avaliação de Desempenho 2023")} 
                                            className="name mb-0 text-sm"
                                        >
                                            Avaliação de Desempenho 2021
                                        </span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </td>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                                <i className="bg-danger" />
                                <span className="status">atrasado</span>
                            </Badge>
                            </td>
                            <td scope="row">
                            <span className="name mb-0 text-sm">
                                Ksys Sistemas - Timbó
                            </span>
                            </td>
                            <td>
                            <div className="d-flex align-items-center">
                                <span className="completion mr-2">72%</span>
                                <div>
                                <Progress max="100" value="72" color="danger" />
                                </div>
                            </div>
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
                                    Action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Another action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Something else here
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink target="_blank">
                                            <span 
                                                onClick={(e) => handleShowAppraisalList("Avaliação de Desempenho 2023")} 
                                                className="name mb-0 text-sm"
                                            >
                                                Avaliação de Desempenho 2021
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </td>
                            <td>
                            <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                <span className="status">completo</span>
                            </Badge>
                            </td>
                            <td scope="row">
                            <span className="name mb-0 text-sm">
                                Ksys Sistemas - Indaial
                            </span>
                            </td>
                            <td>
                            <div className="d-flex align-items-center">
                                <span className="completion mr-2">100%</span>
                                <div>
                                <Progress max="100" value="100" color="success" />
                                </div>
                            </div>
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
                                    Action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Another action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Something else here
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink href="#" target="_blank">
                                            <span 
                                                onClick={(e) => handleShowAppraisalList("Avaliação de Desempenho 2023")} 
                                                className="name mb-0 text-sm"
                                            >
                                                Avaliação de Desempenho 2020
                                            </span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </td>
                            <td>
                            <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                <span className="status">completo</span>
                            </Badge>
                            </td>
                            <td scope="row">
                            <span className="name mb-0 text-sm">
                                Ksys Sistemas - Benedito Novo
                            </span>
                            </td>
                            <td>
                            <div className="d-flex align-items-center">
                                <span className="completion mr-2">100%</span>
                                <div>
                                <Progress max="100" value="100" color="success" />
                                </div>
                            </div>
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
                                    Action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Another action
                                </DropdownItem>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Something else here
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                        </tr>
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

AppraisalCycleTable.defaultProps = {
    handleShowAppraisalList: () => {},
  };

AppraisalCycleTable.propTypes = {
    handleShowAppraisalList: PropTypes.func,
  };

export default withRouter(AppraisalCycleTable);