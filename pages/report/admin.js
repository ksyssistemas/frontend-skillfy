import React from "react";
import Register from "../../layouts/Register";
import AlternativeHeader from "components/Headers/AlternativeHeader.js";
import { Container } from "reactstrap";
import AdminList from "../../components/Tables/Adm/showAdm";


function ReportAdmin() {
  return (
    <>
      <AlternativeHeader name="Administrador" parentName="Registros" />
      <Container className="mt--6" fluid>
        <AdminList /> 
      </Container>
    </>
  );
}

ReportAdmin.layout = Register;

export default ReportAdmin;
