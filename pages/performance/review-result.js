import React, { useContext } from "react";
import { Container } from "reactstrap";
import AppraisalsListTableCompetencies from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTableCompetencies";
import AppraisalsSkillsRegister from "../../components/Forms/PerformanceForms/AppraisalsSkillsRegister";
import { ReviewContext } from '../../contexts/PerformanceContext/PerformanceReviewContext';
import EmployeeHeader from "../../components/Headers/EmployeeHeader";
import DynamicLayout from "../../layouts/DynamicLayout";


function ReviewResult() {

  const { performanceReviewData } = useContext(ReviewContext);

  return (

    <>
      <EmployeeHeader name="Avaliações" parentName="Desempenho" newRegistrationButtonText="Voltar" />
      <Container className="mt--6" fluid>
        {/* Se o ID estiver definido, exibe o registro de habilidades; caso contrário, a lista */}
        {performanceReviewData ? (
          <AppraisalsSkillsRegister />
        ) : (
          <>
            <AppraisalsListTableCompetencies />
          </>
        )}
      </Container>
    </>
  );
}

ReviewResult.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default ReviewResult;
