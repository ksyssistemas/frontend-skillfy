import React from "react";

// layout for this page
import Enterprise from "layouts/Enterprise.js";

import SimpleHeader from "components/Headers/SimpleHeader.js";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

function Dashboard() {

  return (
    <>
     <SimpleHeader name="Empresa" parentName="Ksys Sistemas" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Cadastrar Empresa</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="4" >
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols1Input"
                  >
                    Nome da Empresa
                  </label>
                  <Input
                    id="example3cols1Input"
                    placeholder="Nome da empresa"
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
                    Marca
                  </label>
                  <Input
                    id="example3cols2Input"
                    placeholder="Marca"
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
                    WhatsApp
                  </label>
                  <Input
                    id="example4cols2Input"
                    placeholder="Número de contato"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="8" sm="6">

                <div
                    className="dropzone dropzone-single mb-3"
                    id="dropzone-single"
                >
             
                    <div className="fallback">
                      <div className="custom-file">
                        <input
                          className="custom-file-input"
                          id="projectCoverUploads"
                          type="file"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="projectCoverUploads"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>

                </div>
   
              </Col>
            </Row>
            <Row>
              <Col md="8">
                  <Button color="info" size="lg" type="button">
                    Salvar 
                  </Button>
              </Col>
              
            </Row>
          </CardBody>
        </Card>
      </Container>

    </>
  );
}

Dashboard.layout = Enterprise;

export default Dashboard;
