// ModalComponent.js
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row
} from "reactstrap";

import AdminRegistrationForm from "../../Forms/createAdm";

function ModalAdm({ isOpen, toggle }) {

  //const [administratorData, setAdministratorData] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
  });


  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <Modal toggle={toggle} isOpen={isOpen} size="xl">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Cadastrar Adm
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={toggle}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>

        <AdminRegistrationForm />

      </ModalBody>

      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={toggle}
        >
          Fechar
        </Button>
        <Button color="primary" type="button">
          Salvar alterações
        </Button>
      </ModalFooter>

    </Modal>

  );
}

export default ModalAdm;
