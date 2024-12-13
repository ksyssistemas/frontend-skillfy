import React, { useState, useEffect, useContext } from "react";
import { Container } from "reactstrap";
import Performance from "../../layouts/Performance";
import AppraisalCycleHeader from "../../components/Headers/PerformanceHeader/AppraisalCycleHeader";
import AppraisalListHeader from "../../components/Headers/PerformanceHeader/AppraisalListHeader";
import AppraisalCycleTable from "../../components/Tables/AppraisalTables/Appraisal/CycleAppraisal ";
// import AppraisalsListTable from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTable";
import AppraisalsListTableCompetencies from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTableCompetencies";
import AddAppraisalCycleModal from "../../components/Modals/AppraisalModal/add-appraisal-cycle";
import AppraisalsSkillsRegister from "../../components/Forms/PerformanceForms/AppraisalsSkillsRegister";
import { EvidencesContext } from '../../contexts/PerformanceContext/AppraisalEvidencesContext';

function Appraisalsskillslist() {
  const { evidencesIdToUpdate } = useContext(EvidencesContext);
  console.log(evidencesIdToUpdate);
  return (
  
    <>
       <AppraisalListHeader name="Avaliações" parentName="Desempenho" />
      <Container className="mt--6" fluid>
        {/* Se o ID estiver definido, exibe o registro de habilidades; caso contrário, a lista */}
        {evidencesIdToUpdate ? (
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

Appraisalsskillslist.layout = Performance;

export default Appraisalsskillslist;
