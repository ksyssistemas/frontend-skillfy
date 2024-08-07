import React, { useState, useEffect } from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import ContactPersonsList from "../../components/Tables/Admin/ContactPersonsList";
import { Container } from "reactstrap";
import ContactPersonsRegister from "../../components/Forms/ContactPersonsRegister";
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';

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

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
  ? ContactPersonsRecords.layout = Admin
  : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
    ? ContactPersonsRecords.layout = Performance
    : ContactPersonsRecords.layout = Admin);

export default ContactPersonsRecords;
