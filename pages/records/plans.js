import React, { useState, useEffect } from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import PlansList from "../../components/Tables/Admin/PlansList";
import { Container } from "reactstrap";
import PlansRegister from "../../components/Forms/PlansRegister";

function PlansRecords() {

  const [isShouldSubmitPlansRegistration, setIsShouldSubmitPlansRegistration] = useState(false);

  function handleShowPlansUserRegister() {
    setIsShouldSubmitPlansRegistration(!isShouldSubmitPlansRegistration);
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };


  const [formDataEmployee, setFormDataEmployee] = useState({
  });

  const handleInputChangeEmployee = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleModal = () => {

  };


  return (
    <>
      {
        !isShouldSubmitPlansRegistration
          ? (
            <>
              <AdminHeader name="Planos" parentName="Registros" newRegistrationButtonText="Adicionar Plano" handleShowPlansUserRegister={handleShowPlansUserRegister} />
              <Container className="mt--6" fluid>
                <PlansList />
              </Container>
            </>
          )
          : (
            <>
              <AdminHeader name="Planos" parentName="Cadastros" />
              <Container className="mt--6" fluid>
                <PlansRegister />
              </Container>
            </>
          )
      }
    </>
  );
}

PlansRecords.layout = Admin;

export default PlansRecords;
