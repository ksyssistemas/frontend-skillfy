import React, { useState, useEffect, useContext } from "react";
import { Container } from "reactstrap";
import Performance from "../../layouts/Performance";
// import AppraisalCycleHeader from "../../components/Headers/PerformanceHeader/AppraisalCycleHeader";
import AppraisalListHeader from "../../components/Headers/PerformanceHeader/AppraisalListHeader";
// import AppraisalCycleTable from "../../components/Tables/AppraisalTables/Appraisal/CycleAppraisal ";
// import AppraisalsListTable from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTable";
import AppraisalsListTableCompetencies from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTableCompetencies";
// import AddAppraisalCycleModal from "../../components/Modals/AppraisalModal/add-appraisal-cycle";
import AppraisalsSkillsRegister from "../../components/Forms/PerformanceForms/AppraisalsSkillsRegister";
import { ReviewContext } from '../../contexts/PerformanceContext/PerformanceReviewContext';
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';
import Admin from "layouts/Admin.js";
import Employee from "../../layouts/Employee";


function Appraisalsskillslist() {

  const { performanceIdToEvaluation } = useContext(ReviewContext);

  return (

    <>
      <AppraisalListHeader name="Avaliações" parentName="Desempenho" />
      <Container className="mt--6" fluid>
        {/* Se o ID estiver definido, exibe o registro de habilidades; caso contrário, a lista */}
        {performanceIdToEvaluation ? (
          <AppraisalsSkillsRegister />
        ) : (
          <>
            <AppraisalsListTableCompetencies />
            <p>Selecione um item para continuar.</p>
          </>
        )}
      </Container>
    </>
  );
}

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
  ? Appraisalsskillslist.layout = Admin
  : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
    ? Appraisalsskillslist.layout = Performance
    : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'employee'
      ? Appraisalsskillslist.layout = Employee
      : Appraisalsskillslist.layout = Admin));

export default Appraisalsskillslist;
