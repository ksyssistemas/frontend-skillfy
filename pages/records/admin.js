import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import AdminList from "../../components/Tables/Admin/AdminUserList";
import AdminUserRegister from "../../components/Forms/AdminUserRegister";

function AdminRecords() {

  const [isShouldSubmitAdminRegistration, setIsShouldSubmitAdminRegistration] = useState(false);

  function handleShowAdminUserRegister() {
    setIsShouldSubmitAdminRegistration(!isShouldSubmitAdminRegistration);
  }

  return (
    <>
      {
        !isShouldSubmitAdminRegistration
          ? (
            <>
              <AdminHeader name="Administrador" parentName="Registros" newRegistrationButtonText="Adicionar Administrador" handleShowAdminUserRegister={handleShowAdminUserRegister} />
              <Container className="mt--6" fluid>
                <AdminList />
              </Container>
            </>
          )
          : (
            <>
              <AdminHeader name="Administrador" parentName="Cadastros" />
              <Container className="mt--6" fluid>
                <AdminUserRegister handleShowAdminUserRegister={handleShowAdminUserRegister} />
              </Container>
            </>
          )
      }
    </>
  );
}

AdminRecords.layout = Admin;

export default AdminRecords;
