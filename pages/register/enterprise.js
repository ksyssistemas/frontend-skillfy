import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";

import Enterprise from "../../layouts/Register";

import SimpleHeader from "../../components/Headers/SimpleHeader"

function Dashboard() {
  const [formData, setFormData] = useState({
    companyName: '',
    brandName: '',
    email: '',
    password: '',
    phoneNumber: '',
    webSite: '',
    avatar: '',
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  
  

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4008/enterprise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setFormData({
            companyName: '',
            brandName: '',
            email: '',
            password: '',
            phoneNumber: '',
            webSite: '',
            avatar: '',
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
      <SimpleHeader name="Empresa" parentName="Ksys Sistemas" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Cadastrar Empresa</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols1Input"
                  >
                    Razão Social
                  </label>
                  <Input
                    id="example3cols1Input"
                    placeholder="Razão Social"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
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
                    Nome Fantasia
                  </label>
                  <Input
                    id="example3cols2Input"
                    placeholder="Nome fantasia"
                    value={formData.brandName}
                    onChange={(e) => handleInputChange('brandName', e.target.value)}
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
                    Senha
                  </label>
                  <Input
                    id="example3cols2Input"
                    placeholder="Seja criativo"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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
                    WebSite
                  </label>
                  <Input
                    id="example4cols1Input"
                    placeholder="WebSite"
                    value={formData.webSite}
                    onChange={(e) => handleInputChange('webSite', e.target.value)}
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
                    Número de contato
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
