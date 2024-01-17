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

function ModalEnterprise({ isOpen, toggle }) {

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
    <Modal toggle={toggle} isOpen={isOpen} size="lg">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Cadastrar Empresa
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
        <Card>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">
                Informação do usuário
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        CNPJ
                      </label>
                      <Input
                        defaultValue={formData.name}
                        id="input-first-name"
                        placeholder="Nome"
                        type="text"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="5">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Razão social
                      </label>
                      <Input
                        defaultValue={formData.lastname}
                        id="input-last-name"
                        placeholder="Sobrenome"
                        type="text"
                        onChange={(e) => handleInputChange('lastname', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Nome Fantasia
                      </label>
                      <Input
                        defaultValue={formData.email}
                        id="input-email"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        E-mail
                      </label>
                      <Input
                        defaultValue={formData.email}
                        id="input-email"
                        placeholder="E-mail"
                        type="email"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Senha
                      </label>
                      <Input
                        defaultValue={formData.name}
                        id="input-first-name"
                        placeholder="Nome"
                        type="text"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Confirma Senha
                      </label>
                      <Input
                        defaultValue={formData.name}
                        id="input-first-name"
                        placeholder="Nome"
                        type="text"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Web Site
                      </label>
                      <Input
                        defaultValue={formData.password}
                        id="input-password"
                        placeholder="Web Site"
                        type="password"
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-phone"
                      >
                        Número de Contato
                      </label>
                      <Input
                        defaultValue={formData.phone}
                        id="input-phone"
                        placeholder="Número de Contato"
                        type="text"
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Form>

          </CardBody>
        </Card>
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

export default ModalEnterprise;
