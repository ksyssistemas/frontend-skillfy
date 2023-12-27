// ModalComponent.js
import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import ModalTitle from "./ModalTitle";
import ModalForm from "./ModalForm";

function CreateAdm({ isOpen, toggle }) {
  const handleFormSubmit = () => {
    // Lógica para lidar com o envio do formulário
  };

  return (
    <Modal toggle={toggle} isOpen={isOpen} size="lg">
      <ModalTitle>Cadastrar Empresa</ModalTitle>
      <ModalBody>
        {/* Conteúdo do formulário */}
        <ModalForm onSubmit={handleFormSubmit}>
          {/* ... Seu formulário ... */}
        </ModalForm>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" type="button" onClick={toggle}>
          Fechar
        </Button>
        {/* Você pode adicionar botões extras aqui, se necessário */}
      </ModalFooter>
    </Modal>
  );
}

export default CreateAdm;
