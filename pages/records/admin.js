import React from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import AdminList from "../../components/Tables/Admin/AdminUserList";

function AdminRecords() {
  return (
    <>
      <AdminHeader name="Administrador" parentName="Registros" />
      <Container className="mt--6" fluid>
        <AdminList /> 
      </Container>
    </>
  );
}

AdminRecords.layout = Admin;

export default AdminRecords;
