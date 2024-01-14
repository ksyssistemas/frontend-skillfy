// pages/register/novo.js

import React from "react";
import Register from "../../layouts/Register";
import ReportAdmin from "../../pages/report/admin";
import PaginationComponent from "../../components/pagination/PaginationComponent"; // Ajuste o nome da importação aqui

function Novo() {
  return (
    <>
      <ReportAdmin />
      <PaginationComponent />
    </>
  );
}

Novo.layout = Register;

export default Novo;
