// ModalComponent.js
import React, { useState, useEffect } from "react";
import { 
    Label, 
    Button, 
    Form, 
    FormGroup, 
    Input, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    Col, 
    Row 
} from "reactstrap";

function ModalAdm({ isOpen, toggle }) {

  //const [administratorData, setAdministratorData] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
  });

  //const [parentName, setParentName] = useState('');

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalAdm toggle={toggle}>
        Cadastrar Admin
      </ModalAdm>
      <ModalBody>
        <Form>
          {/* Informação do usuário */}
          <h6 className="heading-small text-muted mb-4">
            Informação do usuário ....
          </h6>
          <Row>
            <Col lg="6">
              <FormGroup>
                <Label htmlFor="input-first-name">Nome</Label>
                <Input
                  id="input-first-name"
                  placeholder="Nome"
                  type="text"
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              {/* Adição do campo de Admissão */}
              <FormGroup>
                <Label htmlFor="input-admission">Admissão</Label>
                <Input
                  id="input-admission"
                  placeholder="Admissão"
                  type="date"
                  onChange={(e) => handleInputChange('admission', e.target.value)}
                />
              </FormGroup>
            </Col>
            {/* Outros campos (Sobrenome, Email, Senha, Telefone) seguem o mesmo padrão */}
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Fechar
        </Button>
        <Button color="primary" >
          Salvar alterações...
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalAdm;
