import React, { useState } from 'react';
import {
  Badge,
  Button,
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

function AppraisalsListTable() {

  const badgeConfig = {
    "Concluída": { color: "success", text: "Concluída" },
    "Solicitada": { color: "yellow", text: "Solicitada", customStyle: { color: "#ccab00" } },
    "Negada": { color: "danger", text: "Negada" },
  };


  const renderBadge = (validation) => {
    const { color, text, customStyle } = badgeConfig[validation] || { color: "primary", text: "N/A" };
    return (
      <Badge
        color={color !== "yellow" ? color : undefined}
        pill
        className={color === "yellow" ? "bg-yellow" : undefined}
        style={customStyle || {}}
      >
        {text}
      </Badge>
    );
  };

  const progressConfig = {
    "0%": { value: 5, color: "danger" },
    "25%": { value: 25, color: "warning" },
    "50%": { value: 50, color: "yellow" },
    "75%": { value: 75, color: "info" },
    "100%": { value: 100, color: "success" },
  };

  const renderProgress = (completion) => {
    const { value, color } = progressConfig[completion] || { value: 0, color: "secondary" };

    return (
      <div className="d-flex align-items-center">
        <span className="completion mr-2">{completion}</span>
        <div>
          <Progress max="100" value={value} color={color} />
        </div>
      </div>
    );
  };

  const statusConfig = {
    "dentro do prazo": { colorClass: "bg-info", text: "dentro do prazo" },
    "pendente": { colorClass: "bg-warning", text: "pendente" },
    "completo": { colorClass: "bg-success", text: "completo" },
  };

  const renderStatusBadge = (status) => {
    const { colorClass, text } = statusConfig[status] || { colorClass: "bg-secondary", text: "desconhecido" };
    return (
      <Badge color="" className="badge-dot mr-4">
        <i className={colorClass} />
        <span className="status">{text}</span>
      </Badge>
    );
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const [performanceAppraisalData, setPerformanceAppraisalData] = useState([
    {
      id: 1,
      name: "One appraisal name",
      startDate: "2023-08-06T00:00:00Z",
      endDate: "2024-08-06T00:00:00Z",
      validation: "Concluída",
      progress: "100%",
      status: "completo",
    },
    {
      id: 2,
      name: "One appraisal name",
      startDate: "2022-08-06T00:00:00Z",
      endDate: "2023-08-06T00:00:00Z",
      validation: "Solicitada",
      progress: "50%",
      status: "dentro do prazo",
    },
    {
      id: 3,
      name: "One appraisal name",
      startDate: "2021-08-06T00:00:00Z",
      endDate: "2022-08-06T00:00:00Z",
      validation: "Negada",
      progress: "0%",
      status: "pendente",
    },
  ]);

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
                <th className="sort text-left" data-sort="name" scope="col">Nome</th>
                <th className="sort text-left" data-sort="startDate" scope="col">Data de Início</th>
                <th className="sort text-left" data-sort="endDate" scope="col">Data de Fim</th>
                <th className="sort text-left" data-sort="validation" scope="col">Validação</th>
                <th className="sort text-left" data-sort="progress" scope="col">Progresso</th>
                <th className="sort text-left" data-sort="status" scope="col">Estado</th>
                <th className="sort text-left" data-sort="actions" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody className="list">
              {performanceAppraisalData.length > 0 ? (
                performanceAppraisalData.map((appraisal) => (
                  <tr key={appraisal.id}>
                    <td scope="row">
                      <Button
                        className="px-0"
                        color="link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <p className="name mb-0 text-sm">{appraisal.name}</p>
                      </Button>
                    </td>
                    <td className="budget">{formatDate(appraisal.startDate)}</td>
                    <td className="budget">{formatDate(appraisal.endDate)}</td>
                    <td>
                      {renderBadge(appraisal.validation)}
                    </td>
                    <td>
                      {renderProgress(appraisal.progress)}
                    </td>
                    <td>
                      {renderStatusBadge(appraisal.status)}
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Nenhum avaliação encontrado</td>
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
    </Row >
  );
}

export default withRouter(AppraisalsListTable);