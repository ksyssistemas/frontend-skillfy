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

function AppraisalCycleTable() {

  return (
    <Row>
      <div className="col">
        <Card>
          <CardHeader className="border-0">
            <h3 className="mb-0">Lista de Avaliação</h3>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th className="sort" data-sort="name" scope="col">
                  Nome da Avaliação
                </th>
                <th className="sort" data-sort="budget" scope="col">
                  Data de Início
                </th>
                <th className="sort" data-sort="budget" scope="col">
                  Até
                </th>
                <th className="sort" data-sort="budget" scope="col">
                  Data de Fim
                </th>
                <th className="sort" data-sort="completion" scope="col">
                  Descrição
                </th>
                <th className="sort" data-sort="status" scope="col">
                  Validação
                </th>
                <th className="sort" data-sort="status" scope="col">
                  Estado
                </th>
                <th className="sort" data-sort="status" scope="col">
                  Progresso
                </th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody className="list">
              <tr>
                <td scope="row">
                  <Nav navbar>
                    <NavItem>
                      <NavLink
                        href="./appraisal-list.js"
                        target="_blank"
                      >
                        <span className="name mb-0 text-sm">Avaliação de Desempenho 360°</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td className="budget">10/01/2023</td>
                <td className="budget">10/06/2023</td>
                <td className="budget">31/06/2023</td>
                <td className="budget">Avaliação realizada com todos os colaboradores da empresa</td>
                <td className="">
                  <Badge color="success" pill>
                    Concluída
                  </Badge>
                </td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i className="bg-info" />
                    <span className="status">dentro do prazo</span>
                  </Badge>
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
                  <span className="name mb-0 text-sm">
                    Avaliação de Desempenho 180°
                  </span>
                </td>
                <td className="budget">10/01/2023</td>
                <td className="budget">10/06/2023</td>
                <td className="budget">31/06/2023</td>
                <td className="budget">Avaliação realizada com Lideres de Time</td>
                <td className="">
                  <Badge style={{ color: "#ccab00" }} className="bg-yellow" pill>
                    Solicitada
                  </Badge>
                </td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i className="bg-warning" />
                    <span className="status">pendente</span>
                  </Badge>
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
                  <span className="name mb-0 text-sm">
                    Avaliação de Desempenho 90°
                  </span>
                </td>
                <td className="budget">10/01/2023</td>
                <td className="budget">10/06/2023</td>
                <td className="budget">31/06/2023</td>
                <td className="budget">Avaliação realizada com os Diretores</td>
                <td className="">
                  <Badge color="danger" pill>
                    Negada
                  </Badge>
                </td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i className="bg-success" />
                    <span className="status">completo</span>
                  </Badge>
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

export default withRouter(AppraisalCycleTable);