import React from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
import Admin from "../../layouts/Admin";
import AlternativeHeader from "../../components/Headers/AlternativeHeader"
import useFetchAdminData from '../../hooks/useFetchAdminData';
import useCreateAdmin from '../../hooks/useCreateAdmin';

function AdminRegister() {

  const administratorData = useFetchAdminData('adm2@twig.com');
  const { formData, handleInputChange, handleSubmit } = useCreateAdmin();

  return (

    <Form>
      {/* `<SimpleHeader name="Admin" parentName={administratorData.name || 'Ksys Sistemas'} />` */}
      <AlternativeHeader name="Administrador" parentName={administratorData.name || 'Registros'} />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Adicionar Administrador</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols1Input"
                  >
                    Nome
                  </label>
                  <Input
                    id="example3cols1Input"
                    placeholder="Nome do administrador"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols2Input"
                  >
                    Sobrenome
                  </label>
                  <Input
                    id="example3cols2Input"
                    placeholder="Sobrenome"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols3Input"
                  >
                    E-mail
                  </label>
                  <Input
                    id="example3cols3Input"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols2Input"
                  >
                    Data Aniversário
                  </label>
                  <Input
                    id="example3cols2Input"
                    placeholder="__/__/__"
                    value={formData.birthdate}
                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                    type="date"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4" sm="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example4cols1Input"
                  >
                    Senha
                  </label>
                  <Input
                    id="example4cols1Input"
                    placeholder="Senha do sistema"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    type="password"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example4cols1Input"
                  >
                    Confirmar Senha
                  </label>
                  <Input
                    id="example4cols1Input"
                    placeholder="Confirme a senha digitada"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    type="password"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example4cols2Input"
                  >
                    Contato
                  </label>
                  <Input
                    id="example4cols2Input"
                    placeholder="Número de contato"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="8" />
              <Col className="d-flex justify-content-end align-items-center" md="4" >
                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                  <span className="btn-inner--text">Salvar</span>
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Form>
  );
}

AdminRegister.layout = Admin;

export default AdminRegister;
