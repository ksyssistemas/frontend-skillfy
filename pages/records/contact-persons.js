import React, { useState } from "react";
import AdminHeader from "components/Headers/AdminHeader.js";
import ContactPersonsList from "../../components/Tables/Admin/ContactPersonsList";
import { Container } from "reactstrap";
import ContactPersonsRegister from "../../components/Forms/AdministratorForms/ContactPersonsRegister";
import DynamicLayout from "../../layouts/DynamicLayout";

function ContactPersonsRecords() {

  // const deleteAdmin = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:4008/administrator/${id}`, {
  //       method: 'DELETE',
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to delete admin.');
  //     }
  //     setAdmins(admins.filter(admin => admin.id !== id));
  //   } catch (error) {
  //     console.error('There was a problem deleting the admin:', error);
  //   }
  // };

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
              <AdminHeader name="Contatos" parentName="Cadastros" />
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
