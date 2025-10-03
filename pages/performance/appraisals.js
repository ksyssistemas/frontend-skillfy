import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Performance from "../../layouts/Performance";
import AppraisalListHeader from "../../components/Headers/PerformanceHeader/AppraisalListHeader";
import AppraisalsListTable from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTable";
import DynamicLayout from "../../layouts/DynamicLayout";

function Appraisals() {

  return (
    <>
      <AppraisalListHeader name="Avaliações" parentName="Desempenho" />
      <Container className="mt--6" fluid>
        <AppraisalsListTable />
      </Container>
    </>
  );
}

Appraisals.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default Appraisals;
