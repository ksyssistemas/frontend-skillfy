import React, { useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";

import Enterprise from "../../layouts/Register";
import SimpleHeader from "../../components/Headers/SimpleHeader"

function Dashboard() {
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
  
  

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4008/administrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setFormData({
          name: '',
          lastname: '',
          birthdate: '',
          email: '',
          password: '',
          phone: ''
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
      <SimpleHeader name="Admin" parentName="Ksys Sistemas" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Cadastrar Admin</h3>
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
                    placeholder="Nome do Admin"
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
                    value={formData.bithdate}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    type="date"
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
                    Número de Contato
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
              <Col md="8">
                <Button color="info" size="lg" type="button" onClick={handleSubmit}>
                  <span className="btn-inner--icon">
                  </span>
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

Dashboard.layout = Enterprise;

export default Dashboard;
