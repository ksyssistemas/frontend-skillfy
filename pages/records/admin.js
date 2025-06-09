import { useState } from "react";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import AdminList from "../../components/Tables/Admin/AdminUserList";
import AdminUserRegister from "../../components/Forms/AdministratorForms/AdminUserRegister";
import DynamicLayout from "../../layouts/DynamicLayout";

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
                <AdminList handleShowAdminUserRegister={handleShowAdminUserRegister} />
              </Container>
            </>
          )
          : (
            <>
              <AdminHeader name="Administrador" parentName="Cadastros" newRegistrationButtonText="Voltar" handleShowAdminUserRegister={handleShowAdminUserRegister}/>
              <Container className="mt--6" fluid>
                <AdminUserRegister handleShowAdminUserRegister={handleShowAdminUserRegister} />
              </Container>
            </>
          )
      }
    </>
  );
}

AdminRecords.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default AdminRecords;
