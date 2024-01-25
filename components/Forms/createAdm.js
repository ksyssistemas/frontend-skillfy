import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
  ModalFooter,
  Button
} from 'reactstrap';

import useAdminData from "../../hooks/useAdminRegistration"

const AdminRegistration = () => {
  

  const { 
    formData, 
    handleInputChange, 
    handleFormSubmit 
  } = useAdminData();


  return (
    <>
      <Card>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">
              Cadastrar Adm
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="input-name">
                      Nome
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-name"
                      placeholder="Nome"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="input-lastName">
                      Sobrenome
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-lastName"
                      placeholder="Sobrenome"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="3">
                  <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="input-birthDate">
                      Data de Admissão
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-birthDate"
                      placeholder="__/__/____"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="input-email">
                      Email
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="input-phone">
                      Número de Contato
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-phone"
                      placeholder="Número de Contato"
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup className="mb-3">
                    <label className="form-control-label" htmlFor="input-password">
                      Senha
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-password"
                      placeholder="Senha"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <ModalFooter>
                <Button color="primary" type="button" onClick={handleFormSubmit}>
                  Salvar 
                </Button>
              </ModalFooter>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default AdminRegistration;
