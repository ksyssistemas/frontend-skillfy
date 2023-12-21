
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  FormGroup,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Employee from "layouts/Employee.js";
// core components
import ProfileHeader from "components/Headers/ProfileEmployeeHeader.js";

function Profile() {

  const [administratorData, setAdministratorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4008/employee/email/col2@gmail.com', {
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
  return (
    <>
      <ProfileHeader />
      <Container className="mt--6" fluid>

        {/** Cartões de atividades a Fazer */}
        <Row>
        <Col className="order-xl-1" xl="12">
            <Row>
              <Col lg="6">
                <Card className="bg-gradient-success border-0">
                  <CardBody>
                    <Row>
                      <div className="col d-flex flex-column align-items-center justify-content-center">
                        <CardTitle
                          className="text-uppercase text-muted mb-0 text-white"
                          tag="h5"
                        >
                          Avaliações A Fazer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          12
                        </span>
                      </div>
                      {/*
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                          <i className="ni ni-active-40" />
                         </div> 
                      </Col> 
                      */}
                    </Row>
                    {/**
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-white mr-2">
                        <i className="fa fa-arrow-up" />
                        3.48%
                      </span>
                      <span className="text-nowrap text-light">
                        Since last month
                      </span>
                    </p>
                     */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="bg-gradient-danger border-0" tag="h5">
                  <CardBody>
                    <Row>
                      <div className="col d-flex flex-column align-items-center justify-content-center">
                        <CardTitle className="text-uppercase text-muted mb-0 text-white">
                          Avaliações Próxima de Vencer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          3
                        </span>
                      </div>
                      {/** 
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                          <i className="ni ni-spaceship" />
                        </div>
                      </Col>
                      */}
                    </Row>
                    {/**
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-white mr-2">
                        <i className="fa fa-arrow-up" />
                        3.48%
                      </span>
                      <span className="text-nowrap text-light">
                        Since last month
                      </span>
                    </p>
                     */}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/**Begin Card 
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Editar Perfil</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                  Informação do usuário
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email 
                          </label>
                          <Input
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nome
                          </label>
                          <Input
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Sobrenome
                          </label>
                          <Input
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Informações de contato
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Rua
                          </label>
                          <Input
                            defaultValue="Digite o nome da rua"
                            id="input-address"
                            placeholder="Digite o nome da Rua"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Cidade
                          </label>
                          <Input
                            defaultValue="Blumenau"
                            id="input-city"
                            placeholder="Cidade"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Pais
                          </label>
                          <Input
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Pais"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Cep
                          </label>
                          <Input
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">Sobre mim</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label className="form-control-label">Sobre mim</label>
                      <Input
                        placeholder="Uma breve descrição sobre você"
                        rows="4"
                        type="textarea"
                        defaultValue="Uma breve descrição sobre você"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
            End Card */}
          
        </Col>


        </Row>





        {/**Card profile e avaliações em andamento */}
        <Row>

           {/** Card Profile */}
          <Col className="order-xl-2" xl="6">
            <Card className="card-profile">
              <CardImg
                alt="..."
                src={require("assets/img/theme/img-1-1000x600.jpg")}
                top
              />
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Fazer Avaliação
                  </Button>
                   
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Editar Perfil
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Avaliações Recebidas</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Avaliações Realizadas</span>
                      </div>
                      <div>
                        <span className="heading">9</span>
                        <span className="description">Feedbacks Recebidos</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h5 className="h3">
                      {administratorData.name}
                    <span className="font-weight-light">, 27</span>
                  </h5>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {administratorData.email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Encarregado(a) de Produção - Blumenau
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    00.000.000/0001-82 KARSTEN COMERCIO TEXTIL LTDA
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

            {/**Avaliações em andamento */}
          <Col className="order-xl-2" xl="6">
              
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Avaliações Em Andamento</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/bootstrap.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Habilidades e Competências</h5>
                        <Progress
                          className="progress-xs mb-0"
                          max="100"
                          value="60"
                          color="warning"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/angular.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Produtividade e Qualidade do Trabalho</h5>
                        <Progress
                          className="progress-xs mb-0"
                          max="100"
                          value="100"
                          color="success"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/sketch.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Cumprimento de Metas e Objetivos</h5>
                        <Progress
                          className="progress-xs mb-0"
                          max="100"
                          value="72"
                          color="danger"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/react.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Comunicação e Habilidades Interpessoais</h5>
                        <Progress
                          className="progress-xs mb-0"
                          max="100"
                          value="90"
                          color="info"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/vue.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Assiduidade e Pontualidade</h5>
                        <Progress
                          className="progress-xs mb-0"
                          max="100"
                          value="50"
                          color="success"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>

          </Col>
          
        </Row>


         
      </Container>
    </>
  );
}

Profile.layout = Employee;

export default Profile;
