import React, { useState, useEffect } from 'react';
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
import { useContext } from 'react';
import { withRouter } from "next/router";
import { useFindAllPerformanceReview } from '../../../../hooks/PerformanceReview/useFindAllPerformanceReview';
import { useFindPerformanceReview } from '../../../../hooks/PerformanceReview/useFindPerformanceReview';
import { EvidencesContext } from '../../../../contexts/PerformanceContext/AppraisalEvidencesContext';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useFindAllReviewParticipants } from '../../../../hooks/PerformanceReview/ReviewParticipants/useFindAllReviewParticipants';

function AppraisalsListTableCompetencies() {

  const { authenticationDataLoggedInUser } = useContext(AuthContext);
  // console.log("AuthContex", authenticationDataLoggedInUser);

  // const userLoggedId = authenticationDataLoggedInUser?.data?.id;
  const userLoggedId = 14;
  // console.log("userLoggedId", userLoggedId);

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

  const [performanceAppraisalData, setPerformanceAppraisalData] = useState([]);

  const [performanceReviewParticipantsData, setPerformanceReviewParticipantsData] = useState([]);

  const [performanceAppraisalIgualsUserLoggedIdData, setPerformanceAppraisalIgualsUserLoggedIdData] = useState([]);

  useEffect(() => {
    async function fetchPerformanceReviewParticipants() {
      try {
        const foundReviewParticipants = await useFindAllReviewParticipants();
        setPerformanceReviewParticipantsData(foundReviewParticipants);
      } catch (error) {
        console.error('Error fetching performance:', error);
      }
    }

    fetchPerformanceReviewParticipants();
  }, []);

  const performanceReviewParticipantsIgualsUserLoggedIdData = performanceReviewParticipantsData.filter
    (participants => Number(participants.reviewParticipantId) === Number(userLoggedId));

  useEffect(() => {
    if (performanceReviewParticipantsIgualsUserLoggedIdData.length > 0) {
      Promise.all(performanceReviewParticipantsIgualsUserLoggedIdData.map(participants => useFindPerformanceReview(participants.performanceReviewId)))
        .then(details => setPerformanceAppraisalIgualsUserLoggedIdData(details))
        .catch(error => console.error("Erro ao buscar avaliações com o mesmo id do usuário :", error));
    } else {
      setPerformanceAppraisalIgualsUserLoggedIdData([]);
    }
  }, [performanceReviewParticipantsData]);

  // console.log(performanceAppraisalIgualsUserLoggedIdData);
  // console.log(performanceReviewParticipantsData);

  useEffect(() => {
    async function fetchPerformanceAppraisal() {
      try {
        const foundPerformanceAppraisal = await useFindAllPerformanceReview();
        setPerformanceAppraisalData(foundPerformanceAppraisal);
      } catch (error) {
        console.error('Error fetching performance:', error);
      }
    }

    fetchPerformanceAppraisal();
  }, []);

  const { handleEvidencesIdToUpdate } = useContext(EvidencesContext);

  const handleSetId = (id) => {
    handleEvidencesIdToUpdate(id);
  };

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
                <th className="sort text-left" data-sort="status" scope="col">Estado</th>
                <th className="sort text-left" data-sort="actions" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody className="list">
              {performanceAppraisalIgualsUserLoggedIdData.length > 0 ? (
                performanceAppraisalIgualsUserLoggedIdData.map((appraisal) => (
                  <tr key={appraisal.id}>
                    <td scope="row">
                      <Button
                        className="px-0"
                        color="link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <p className="name mb-0 text-sm">{appraisal.reviewName}</p>
                      </Button>
                    </td>
                    <td className="budget">{formatDate(appraisal.startDate)}</td>
                    <td className="budget">{formatDate(appraisal.endDate)}</td>
                    <td>
                      {renderStatusBadge(appraisal.status)}
                    </td>
                    <td className="text-left">
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
                            // href="add-appraisals-skills"
                            onClick={() => handleSetId(appraisal.id)}
                          >
                            Fazer a avaliação
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

export default withRouter(AppraisalsListTableCompetencies);