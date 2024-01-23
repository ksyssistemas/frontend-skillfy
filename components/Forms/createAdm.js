import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  ModalFooter
} from 'reactstrap';

const AdminRegistrationForm = ({ formData, handleInputChange }) => {
  return (
    <Card>
      <CardBody>
        <Form>
          <h6 className="heading-small text-muted mb-4">
            Cadastrar Adm
          </h6>
          <div className="pl-lg-4">
            <Row>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    Nome
                  </label>
                  <Input
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
                    Sobrenome
                  </label>
                  <Input
                    id="input-last-name"
                    placeholder="Sobrenome"
                    type="text"
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-birthdate"
                  >
                    Data Admissão
                  </label>
                  <Input
                    id="input-birthdate"
                    placeholder="__/__/__"
                    type="date"
                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="8">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Email
                  </label>
                  <Input
                    id="input-email"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-phone"
                  >
                    Número de Contato
                  </label>
                  <Input
                    id="input-phone"
                    placeholder="Número de Contato"
                    type="text"
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-password"
                  >
                    Senha
                  </label>
                  <Input
                    id="input-password"
                    placeholder="Senha"
                    type="password"
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-confirm-password"
                  >
                    Confirmar Senha
                  </label>
                  <Input
                    id="input-confirm-password"
                    placeholder="Confirmar Senha"
                    type="password"
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <hr className="my-4" />

          <ModalFooter>
            <Button color="secondary" type="button">
              Fechar
            </Button>
            <Button color="primary" type="button">
              Salvar alterações
            </Button>
          </ModalFooter>


        </Form>
      </CardBody>
    </Card>
  );
};

export default AdminRegistrationForm;
