import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";

import Enterprise from "../../layouts/Register";
import SimpleHeader from "../../components/Headers/SimpleHeader"

function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  
  

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4008/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setFormData({
          name: '',
          lastName: '',
          birthdate: '',
          email: '',
          password: '',
          phoneNumber: ''
        });
        console.log('Data sent successfully!');
      } else {
        console.error('Error in response:', response.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };
  

  return (
    <Form>
      <SimpleHeader name="Funcionário" parentName="Ksys Sistemas" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Cadastrar Funcioário</h3>
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
                    placeholder="Nome do Funcionário"
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
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example4cols2Input"
                  >
                    Número de Contato
                  </label>
                  <Input
                    id="example4cols2Input"
                    placeholder="Número de contato"
                    value={formData.phoneNumber} 
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Row>
              <Col md="8">
                <Button color="info" size="lg" type="button" onClick={handleSubmit}>
                  Salvar
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Form>
  );
}

Dashboard.layout = Enterprise;

export default Dashboard;
