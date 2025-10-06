import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
import { ReviewContext } from '../../../../contexts/PerformanceContext/PerformanceReviewContext';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useFindAllReviewParticipants } from '../../../../hooks/PerformanceReview/ReviewParticipants/useFindAllReviewParticipants';
import { useFindEmployee } from '../../../../hooks/RecordsHooks/employee/useFindEmployee';
import { useFindAllEmployee } from '../../../../hooks/RecordsHooks/employee/useFindAllEmployee';
import { useFindReviewParticipantsById } from '../../../../hooks/PerformanceReview/ReviewParticipants/useFindReviewParticipantsById';
import _ from 'lodash';
import { useFindReviewAnswersByReviewParticipantId } from '../../../../hooks/PerformanceReview/ReviewAnswer/useFindReviewAnswersByReviewParticipantId';
import { useFindReviewParticipantsByPerformanceReviewId } from '../../../../hooks/PerformanceReview/ReviewParticipants/useFindReviewParticipantsByPerformanceReviewId';

function AppraisalsListTableCompetencies() {

  const { authenticationDataLoggedInUser } = useContext(AuthContext);

  const userLoggedId = authenticationDataLoggedInUser?.data?.id;

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const [userLoggedParticipationOnPerformanceReviewData, setUserLoggedParticipationOnPerformanceReviewData] = useState([]);

  const [employeesData, setEmployeesData] = useState([]);

  const [performanceReviewAndEmployeesLedData, setPerformanceReviewAndEmployeesLedData] = useState([]);

  const [userLoggedData, setUserLoggedData] = useState({});

  const [employeesLedData, setEmployeesLedData] = useState([]);

  const [userLoggedPerformanceReviewsList, setUserLoggedPerformanceReviewsList] = useState([]);

  const [reviewsToExecuteList, setReviewsToExecuteList] = useState([]);

  const [reviewStatus, setReviewStatus] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all employees first
        const foundEmployees = await useFindAllEmployee();
        setEmployeesData(foundEmployees);

        // Find the logged-in user after employees are loaded
        const employeeLoggedData = foundEmployees.find((emp) => Number(emp.id) === Number(userLoggedId));
        if (employeeLoggedData) {
          setUserLoggedData(employeeLoggedData);
        }

        // Fetch user participation after user data is loaded
        const foundReviewParticipants = await useFindReviewParticipantsById(userLoggedId);
        setUserLoggedParticipationOnPerformanceReviewData(foundReviewParticipants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [userLoggedId]); // Only trigger when userLoggedId changes

  useEffect(() => {
    const fetchPerformanceReviewAnswerData = async () => {
      const foundReviewAnswerData = await useFindReviewAnswersByReviewParticipantId(userLoggedId);
      if (foundReviewAnswerData &&
        Number(foundReviewAnswerData.performanceReview) === Number(userLoggedParticipationOnPerformanceReviewData.performanceReviewId)
      ) {
        setReviewStatus(foundReviewAnswerData.status);
      }
    };

    if (userLoggedId) {
      fetchPerformanceReviewAnswerData();
    }
  }, [userLoggedId, userLoggedParticipationOnPerformanceReviewData]);

  const statusConfig = {
    "late": { colorClass: "bg-danger", text: "atrasada" },
    "pending": { colorClass: "bg-yellow", text: "pendente" },
    "completed": { colorClass: "bg-success", text: "completo" },
  };

  const renderStatusBadge = (status, endDate = null) => {
    let newStatus = '';

    // Verificar se endDate existe e comparar com a data atual
    if (endDate) {
      const currentDate = new Date();
      const deadlineDate = new Date(endDate);

      // Remover as horas, minutos e segundos para comparação apenas da data
      currentDate.setHours(0, 0, 0, 0);
      deadlineDate.setHours(0, 0, 0, 0);

      // Se a data de término for menor que a data atual, está atrasado
      if (deadlineDate < currentDate) {
        newStatus = "late";
      }
    }

    // Verificação original do status se não foi definido como "late"
    if (!newStatus) {
      if (!status || status === '') {
        newStatus = "pending";
      } else {
        newStatus = status;
      }
    }

    const { colorClass, text } = statusConfig[newStatus] || { colorClass: "bg-secondary", text: "desconhecido" };

    return (
      <Badge color="" className="badge-dot mr-4">
        <i className={colorClass} />
        <span className="status">{text}</span>
      </Badge>
    );
  };

  // Verificações da participacação do usuário logado nas avalições de desempenho
  const performanceReviewDataById = useMemo(() => {
    return userLoggedParticipationOnPerformanceReviewData.reduce((acc, participant) => {
      const { performanceReviewId, reviewParticipantId, participateAsPair, participateAsEmployeePeerTo, participatesAsSelfEvaluator, participateAsLeader } = participant;

      acc[performanceReviewId] = {
        // Verifica se o usuário logado participa da avaliação
        hasParticipation: Number(reviewParticipantId) === Number(userLoggedId),
        // Verifica se o usuário logado participa como par (participateAsPair)
        isParticipateAsPair: participateAsPair,
        // Se participa como par, armazena os valores de participateAsEmployeePeerTo
        employeeToWhomIsPaired: participateAsPair ? participateAsEmployeePeerTo : [],
        // Verifica se o usuário logado participa realizando autoavaliação
        isParticipateAsSelfEvaluator: participatesAsSelfEvaluator,
        // Verifica se o usuário logado participa como líder
        isParticipateAsLeader: participateAsLeader
      };

      return acc;
    }, {});
  }, [userLoggedParticipationOnPerformanceReviewData]);

  // Filtras os usuário líderados pelo usuário logado
  const employeesLedId = useCallback(async (userData) => {
    if (!userData) return [];
    const userName = `${userData.name} ${userData.lastName}`
    return employeesData.filter((led) => led.LeaderName === userName);
  }, [employeesData]);

  useEffect(() => {
    async function fetchReviewAndEmployees() {
      try {
        const employeesLed = await Promise.all(
          Object.entries(performanceReviewDataById).map(async ([performanceReview, reviewData]) => {
            if (reviewData.isParticipateAsLeader && userLoggedData) {
              const employeesLedByEmployeeLogged = await employeesLedId(userLoggedData);
              return employeesLedByEmployeeLogged;
            }

            return null; // Retorna null para evitar valores indefinidos
          })
        );

        // Atualiza o estado apenas se os valores forem diferentes
        const filteredEmployeesLed = employeesLed.filter(Boolean).flat();
        setEmployeesLedData((prev) => JSON.stringify(prev) !== JSON.stringify(filteredEmployeesLed) ? filteredEmployeesLed : prev);
      } catch (error) {
        console.error("Error fetching review and employees:", error);
      }
    }

    // Verifica se há participação do usuário antes de disparar a função
    const hasParticipation = Object.values(performanceReviewDataById).some(data => data.hasParticipation);
    if (hasParticipation) {
      fetchReviewAndEmployees();
    }
  }, [performanceReviewDataById, userLoggedData]);

  const onParticipantTypeOnReview = (isParticipateAsLeaderToReview, isParticipateAsSelfEvaluatorToReview, pairedParticipants) => {
    if (isParticipateAsLeaderToReview) return 'Líder';
    if (isParticipateAsSelfEvaluatorToReview) return 'Autoavaliação';
    if (pairedParticipants) return 'Par';
    return 'Indefinido';
  };

  const performanceReviewCache = useRef(new Map());

  async function getPerformanceReview(performanceReviewId) {
    if (performanceReviewCache.current.has(performanceReviewId)) {
      return performanceReviewCache.current.get(performanceReviewId);
    }

    const performanceReview = await useFindPerformanceReview(performanceReviewId);
    if (performanceReview) {
      performanceReviewCache.current.set(performanceReviewId, performanceReview);
    }
    return performanceReview;
  }

  function mapEmployeeData(employee, reviewAs = null) {
    return {
      id: employee.id,
      name: `${employee.name} ${employee.lastName}`,
      roleId: employee.rolesId,
      ...(reviewAs && { reviewAs })
    };
  }

  useEffect(() => {
    async function fetchReviewsToExecute() {
      try {
        let newReviewsList = [];
        let createdKeys = new Set(); // <- controla duplicidade

        const buildReviewKey = (reviewerId, reviewedId) => `${reviewerId}-${reviewedId}`;

        for (const participant of userLoggedParticipationOnPerformanceReviewData) {
          const { performanceReviewId } = participant;

          const performanceReview = await getPerformanceReview(performanceReviewId);
          if (!performanceReview) continue;

          const allParticipants = await useFindReviewParticipantsByPerformanceReviewId(performanceReviewId);
          const me = allParticipants.find(p => Number(p.reviewParticipantId) === Number(userLoggedId));
          if (!me) continue;

          // -------------------------
          // 1) AUTOAVALIAÇÃO
          // -------------------------
          if (me.participatesAsSelfEvaluator) {
            const key = buildReviewKey(me.reviewParticipantId, me.reviewParticipantId);
            if (!createdKeys.has(key)) {
              createdKeys.add(key);
              newReviewsList.push({
                id: _.uniqueId('selfReview_'),
                performanceReviewToExecute: performanceReview,
                reviewAs: "Autoavaliação",
                reviewerParticipant: mapEmployeeData(userLoggedData, "Autoavaliação"),
                reviewedParticipant: mapEmployeeData(userLoggedData),
                performanceReviewParticipationData: me
              });
            }
          }

          // -------------------------
          // 2) LÍDER → LIDERADOS
          // -------------------------
          if (me.participateAsLeader) {
            const leaderEmployee = employeesData.find(e => Number(e.id) === Number(me.reviewParticipantId));
            if (!leaderEmployee) continue;

            const ledParticipants = allParticipants.filter(p => {
              if (!p.participatesAsSelfEvaluator || p.reviewParticipantId === me.reviewParticipantId) return false;

              const ledEmployee = employeesData.find(e => Number(e.id) === Number(p.reviewParticipantId));
              if (!ledEmployee?.headedBy?.length) return false;

              return ledEmployee.headedBy.some(h => Number(h.id) === Number(me.reviewParticipantId));
            });

            for (const led of ledParticipants) {
              const ledEmployee = employeesData.find(e => Number(e.id) === Number(led.reviewParticipantId));
              if (!ledEmployee) continue;

              const key = buildReviewKey(me.reviewParticipantId, led.reviewParticipantId);
              if (!createdKeys.has(key)) {
                createdKeys.add(key);
                newReviewsList.push({
                  id: _.uniqueId('leaderReview_'),
                  performanceReviewToExecute: performanceReview,
                  reviewAs: "Líder",
                  reviewerParticipant: mapEmployeeData(userLoggedData, "Líder"),
                  reviewedParticipant: mapEmployeeData(ledEmployee),
                  performanceReviewParticipationData: me
                });
              }
            }
          } else {
            // -------------------------
            // 2b) LIDERADO → LÍDER(ES)
            // -------------------------
            if (me.participatesAsSelfEvaluator) {
              const meEmployee = employeesData.find(e => Number(e.id) === Number(me.reviewParticipantId));
              if (meEmployee?.headedBy?.length > 0) {
                const leaders = allParticipants.filter(p => p.participateAsLeader);

                for (const leader of leaders) {
                  const isMyLeader = meEmployee.headedBy.some(h => Number(h.id) === Number(leader.reviewParticipantId));
                  if (!isMyLeader) continue;

                  const leaderEmployee = employeesData.find(e => Number(e.id) === Number(leader.reviewParticipantId));
                  if (!leaderEmployee) continue;

                  const key = buildReviewKey(me.reviewParticipantId, leader.reviewParticipantId);
                  if (!createdKeys.has(key)) {
                    createdKeys.add(key);
                    newReviewsList.push({
                      id: _.uniqueId('ledToLeaderReview_'),
                      performanceReviewToExecute: performanceReview,
                      reviewAs: "Líder",
                      reviewerParticipant: mapEmployeeData(userLoggedData, "Líder"),
                      reviewedParticipant: mapEmployeeData(leaderEmployee),
                      performanceReviewParticipationData: me
                    });
                  }
                }
              }
            }
          }

          // -------------------------
          // 3) PARES (direto)
          // -------------------------
          if (me.participateAsPair && me.participateAsEmployeePeerTo?.length > 0) {
            for (const { employeeToWhomIsPairedId } of me.participateAsEmployeePeerTo) {
              const peerEmployee = employeesData.find(e => Number(e.id) === Number(employeeToWhomIsPairedId));
              if (!peerEmployee) continue;

              const key = buildReviewKey(me.reviewParticipantId, employeeToWhomIsPairedId);
              if (!createdKeys.has(key)) {
                createdKeys.add(key);
                newReviewsList.push({
                  id: _.uniqueId('pairReview_'),
                  performanceReviewToExecute: performanceReview,
                  reviewAs: "Par",
                  reviewerParticipant: mapEmployeeData(userLoggedData, "Par"),
                  reviewedParticipant: mapEmployeeData(peerEmployee),
                  performanceReviewParticipationData: me
                });
              }
            }
          }

          // -------------------------
          // 3b) PARES RECÍPROCOS
          // -------------------------
          const peersThatChoseMe = allParticipants.filter(p =>
            p.participateAsPair &&
            p.participateAsEmployeePeerTo?.some(pt => Number(pt.employeeToWhomIsPairedId) === Number(me.reviewParticipantId))
          );

          for (const peer of peersThatChoseMe) {
            const peerEmployee = employeesData.find(e => Number(e.id) === Number(peer.reviewParticipantId));
            if (!peerEmployee) continue;

            const key = buildReviewKey(me.reviewParticipantId, peer.reviewParticipantId);
            if (!createdKeys.has(key)) {
              createdKeys.add(key);
              newReviewsList.push({
                id: _.uniqueId('pairReview_'),
                performanceReviewToExecute: performanceReview,
                reviewAs: "Par",
                reviewerParticipant: mapEmployeeData(userLoggedData, "Par"),
                reviewedParticipant: mapEmployeeData(peerEmployee),
                performanceReviewParticipationData: me
              });
            }
          }
        }

        // evitar renders desnecessários
        const newReviewsString = JSON.stringify(newReviewsList);
        setReviewsToExecuteList(prev =>
          JSON.stringify(prev) !== newReviewsString ? newReviewsList : prev
        );

      } catch (error) {
        console.error("Error fetching reviews to execute:", error);
      }
    }

    if (userLoggedParticipationOnPerformanceReviewData.length > 0 && employeesData.length > 0) {
      fetchReviewsToExecute();
    }
  }, [userLoggedParticipationOnPerformanceReviewData, employeesData, userLoggedData]);

  const {
    handlePerformanceReviewData,
    handleReviewedIdOnPerformanceReview,
    handleReviewerIdOnPerformanceReview,
    handlePerformanceReviewParticipationData
  } = useContext(ReviewContext);

  const handleSetId = (reviewData, reviewerParticipant, reviewedParticipant, reviewParticipationData) => {
    console.log('Revisão selecionada:', reviewData);
    console.log('Revisor selecionado:', reviewerParticipant);
    console.log('Avaliado selecionado:', reviewedParticipant);
    console.log('Dados de participação na revisão:', reviewParticipationData);
    handlePerformanceReviewData(reviewData);
    handleReviewerIdOnPerformanceReview(reviewerParticipant);
    handleReviewedIdOnPerformanceReview(reviewedParticipant);
    handlePerformanceReviewParticipationData(reviewParticipationData);
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
                <th className="sort text-left" data-sort="name" scope="col">Título</th>
                <th className="sort text-left" data-sort="name" scope="col">Avaliar Como</th>
                <th className="sort text-left" data-sort="name" scope="col">Do Avaliado</th>
                <th className="sort text-left" data-sort="startDate" scope="col">Data de Início</th>
                <th className="sort text-left" data-sort="endDate" scope="col">Data de Fim</th>
                <th className="sort text-center" data-sort="status" scope="col">Estado</th>
                <th className="sort text-left" scope="col"></th>
              </tr>
            </thead>
            <tbody className="list">
              {reviewsToExecuteList.length > 0 ? (
                reviewsToExecuteList.map((appraisal) => (
                  <tr key={appraisal.id}>
                    <td scope="row">
                      <Button
                        className="px-0"
                        color="link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <p className="name mb-0 text-sm text-orange font-weight-bold">{appraisal.performanceReviewToExecute.reviewName}</p>
                      </Button>
                    </td>
                    <td className="budget">
                      <p className="text-left text-muted mb-0">
                        {appraisal.reviewAs}
                      </p>
                    </td>
                    <td className="budget">{appraisal.reviewedParticipant.name}</td>
                    <td className="budget">{formatDate(appraisal.performanceReviewToExecute.startDate)}</td>
                    <td className="budget">{formatDate(appraisal.performanceReviewToExecute.endDate)}</td>
                    <td className="text-center">{renderStatusBadge(reviewStatus, appraisal.performanceReviewToExecute.endDate)}</td>
                    <td className="text-left">
                      <Button
                        className="btn-warning btn-warning:hover"
                        color="warning"
                        outline
                        size="sm"
                        type="button"
                        onClick={() => handleSetId(
                          appraisal.performanceReviewToExecute,
                          appraisal.reviewerParticipant,
                          appraisal.reviewedParticipant,
                          appraisal.performanceReviewParticipationData,
                        )}
                      >
                        Executar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Nenhuma avaliação encontrada</td>
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
                    className='bg-warning border-warning'
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