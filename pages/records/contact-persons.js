import React, { useState } from "react";
import AdminHeader from "components/Headers/AdminHeader.js";
import ContactPersonsList from "../../components/Tables/Admin/ContactPersonsList";
import { Container } from "reactstrap";
import ContactPersonsRegister from "../../components/Forms/AdministratorForms/ContactPersonsRegister";
import DynamicLayout from "../../layouts/DynamicLayout";

function ContactPersonsRecords() {

  const [isShouldSubmitContactPersonsRegistration, setIsShouldSubmitContactPersonsRegistration] = useState(false);

  function handleShowContactPersonsUserRegister() {
    setIsShouldSubmitContactPersonsRegistration(!isShouldSubmitContactPersonsRegistration);
  }

  return (
    <>
      {
        !isShouldSubmitContactPersonsRegistration
          ? (
            <>
              <AdminHeader name="Contatos" parentName="Registros" newRegistrationButtonText="Adicionar Pessoa de Contato" handleShowContactPersonsUserRegister={handleShowContactPersonsUserRegister} />
              <Container className="mt--6" fluid>
                <ContactPersonsList />
              </Container>
            </>
          )
          : (
            <>
              <AdminHeader name="Contatos" parentName="Cadastros" newRegistrationButtonText="Voltar" handleShowAdminUserRegister={handleShowContactPersonsUserRegister}/>
              <Container className="mt--6" fluid>
                <ContactPersonsRegister handleShowContactPersonsUserRegister={handleShowContactPersonsUserRegister} />
              </Container>
            </>
          )
      }
    </>
  );
}

ContactPersonsRecords.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default ContactPersonsRecords;
