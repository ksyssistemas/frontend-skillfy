import React, { useState, useEffect } from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import PlansList from "../../components/Tables/Admin/PlansList";
import { Container } from "reactstrap";

function PlansRecords() {

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
      <AdminHeader name="Planos" parentName="Ksys Sistemas" />
      <Container className="mt--6" fluid>
        <PlansList/>
      </Container>
    </>
  );
}

PlansRecords.layout = Admin;

export default PlansRecords;
