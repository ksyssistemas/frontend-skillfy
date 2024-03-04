import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { BrowserRouter } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";

import Enterprise from "../../layouts/Register";
import SimpleHeader from "../../components/Headers/SimpleHeader"
import AlternativeHeader from "../../components/Headers/AlternativeHeader"

function Plans() {

  const [administratorData, setAdministratorData] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
  });

  const [parentName, setParentName] = useState('');

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6008/administrator/email/adm1@gmail.com', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdministratorData(data);
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:6008/administrator', {
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
      {/* `<SimpleHeader name="Admin" parentName={administratorData.name || 'Ksys Sistemas'} />` */}
      <AlternativeHeader name="Planos" parentName={administratorData.name || 'Registros'} />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Adicionar Plano</h3>
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
                    placeholder="Nome do plano"
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
                    htmlFor="example3cols3Input"
                  >
                    Valor
                  </label>
                  <Input
                    id="example3cols3Input"
                    placeholder="Valor do plano em R$"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols2Input"
                  >
                    Descrição Breve
                  </label>
                  <Input
                    id="example3cols2Input"
                    placeholder="Descrição breve para vendas"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols2Input"
                  >
                    Descrição Detalhada
                  </label>
                  <Input
                    id="example3cols2Input"
                    placeholder="Descrição detalhada para informação"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12" sm="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols2Input"
                  >
                    Recursos
                  </label>
                  <Select2
                    className="form-control"
                    defaultValue="0"
                    options={{
                      placeholder: "Select",
                    }}
                    data={[
                      { id: "0", text: "Clique para selecionar recursos ..." },
                      { id: "1", text: "Alerts" },
                      { id: "2", text: "Badges" },
                      { id: "3", text: "Buttons" },
                      { id: "4", text: "Cards" },
                      { id: "5", text: "Forms" },
                      { id: "6", text: "Modals" },
                    ]}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="8" />
              <Col className="d-flex justify-content-end align-items-center" md="4" >
                <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                  <span className="btn-inner--text">Adicionar</span>
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Form>



  );
}

Plans.layout = Enterprise;

export default Plans;
