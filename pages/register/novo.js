// pages/register/novo.js

import React from "react";
import Register from "../../layouts/Register";
import ReportAdmin from "../../pages/report/admin";
import Pagination from "../../components/Pagination/PaginationCustom"; 

function Novo() {
  return (
    <>
      <ReportAdmin />
      <Pagination />
    </>
  );
}

Novo.layout = Register;

export default Novo;
