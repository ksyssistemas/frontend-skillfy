import React from "react";
import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import AboutusHeader from "components/Headers/AboutusHeader.js";
import AuthFooter from "components/Footers/RegisterFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import "assets/css/styles/aboutus.css";

function Aboutus() {
return(
  <>
    <IndexNavbar />
      <div className="main-content">
        <AboutusHeader />
          <section>
            <Container>
              <Row className="justify-content-center text-center">
                <Col lg="12">
                  <Card className="card border">
                    <CardBody className="py-2">
                      <p className="mt-3">
                        A SkillFy é uma empresa formada por especialistas em gestão de pessoas. Queremos nos conectar com empresas e pessoas de forma verdadeira,
                        agindo de forma efetiva, focando nos resultados e potencializando cada vez mais o desenvolvimento das pessoas.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col lg="12">
                  <Card className="card border px-3">
                    <CardBody className="py-2">
                      <Row>
                        <p className="mt-3">
                          A marca SkillFy nasceu representada por 3 elementos que simbolizam a empresa.
                        </p>
                      </Row>
                      <Row>
                        <Col className="col-lg-6 col-sm-12">
                          <Row>
                            <div className="d-flex align-items-start">
                              <img
                                alt="..."
                                className="img mr-3"
                                src={require("assets/img/brand/card-escada.png")}
                              />
                              <div>
                                <h4 className="h3 text-success text-left text-purple-sk">
                                  Escada
                                </h4>
                                <p className="text-left mt-1">
                                  Representando o desenvolvimento do colaborador, um símbolo de crescimento e progressão.
                                </p>
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <div className="d-flex align-items-start">
                              <img
                                alt="..."
                                className="img mr-3"
                                src={require("assets/img/brand/card-origami.png")}
                              />
                              <div>
                                <h4 className="h3 text-success text-left text-purple-sk">
                                  Origami
                                </h4>
                                <p className="text-left mt-1">
                                  Uma analogia ao colaborador representa transformação pessoal. A arte de dar novas formas a uma folha.
                                </p>
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <div className="d-flex align-items-start">
                              <img
                                alt="..."
                                className="img mr-3"
                                src={require("assets/img/brand/card-bandeira.png")}
                              />
                              <div>
                                <h4 className="h3 text-success text-left text-purple-sk">
                                  Bandeira
                                </h4>
                                <p className="text-left mt-1">
                                  Um símbolo de conquista e pertencimento. 
                                  Marcam a linha de chegada, vitórias e superação de desafios.
                                </p>
                              </div>
                            </div>
                          </Row>
                        </Col>
                        <div className="d-none d-md-block">
                        <Col className="col-12 d-flex justify-content-center">
                          <img
                            alt="..."
                            className="img-fluid d-none d-md-block ml-7"
                            src={require("assets/img/brand/skillfy-logo-colorido.png")}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </Col>
                        </div>
                      </Row>
                      <Row>
                        <p className="mt-3">
                          A nossa identidade representa tudo aquilo que acreditamos, com uma plataforma desenvolvida em cima das necessidades reais do setor, 
                          estamos prontos para ajudar cada colaborador a subir os degraus de seu desenvolvimento, transformar-se em uma versão ainda melhor
                          de si mesmo e erguer as bandeiras de suas conquistas.
                        </p>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-center mt-5">
                <Col lg="12">
                  <Row>
                    <Col lg="3 mt--3">
                      <Card className="shadow border-0 text-center bg-purple-sk">
                        <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img mb-2"
                            src={require("assets/img/brand/card-s1-about.png")}
                          />
                          <h4 className="h4 text-warning text-white">
                            Especialistas em gestão de pessoas
                          </h4>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3 mt--3">
                      <Card className="shadow border-0 text-center bg-purple-sk">
                        <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img mb-2"
                          src={require("assets/img/brand/card-s2-about.png")}
                          />
                          <h4 className="h4 text-info text-white">
                            Visão analítica <br></br> e estratégica
                          </h4>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3  mt--3">
                      <Card className="shadow border-0 text-center bg-purple-sk">
                        <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img mb-2"
                            src={require("assets/img/brand/card-s3-about.png")}
                          />
                          <h4 className="h4 text-warning text-white">
                            Melhoria <br></br> constante
                          </h4>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3 mt--3">
                      <Card className="shadow border-0 text-center bg-purple-sk">
                        <CardBody className="py-3">
                              <img
                                alt="..."
                                className="img mb-2"
                              src={require("assets/img/brand/card-s4-about.png")}
                              />
                              <h4 className="h4 text-info text-white">
                              Uma empresa que se envolve
                              </h4>
                        </CardBody>
                      </Card>
                    </Col>     
                  </Row>
                </Col>
              </Row>
            </Container>
            <Container fluid>
              <Row className="justify-content-center text-center mt-4">
                <Col md="12">
                  <h2 className="display-3 text-purple-sk">
                    Queremos valorizar o RH e o capital humano.
                  </h2>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="d-flex justify-content-center text-center mt-4 ml-lg-5">
                <Col className="col-md-6 col-xs-12 col-sm-12">
                  <Row>
                    <Card className="card border border-purple-sk mb-2">
                      <CardBody>
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-3 mt-3"
                            src={require("assets/img/brand/card-missao-about.png")}
                          />
                          <div>
                            <h4 className="h3 text-black text-left">
                              Missão
                            </h4>
                            <p className="text-left mt-1">
                              Criar ferramentas que 
                              potencializam as pessoas e impulsionam as organizações.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Row>
                  <Row>
                    <Card className="card border border-purple-sk mb-2">
                      <CardBody>
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-3 mt-3"
                            src={require("assets/img/brand/card-visao-about.png")}
                          />
                          <div>
                            <h4 className="h3 text-black text-left">
                              Visão
                            </h4>
                            <p className="text-left mt-1">
                              O capital humano é o bem mais precioso da empresa e ele precisa ser desenvolvido.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Row>
                  <Row>
                    <Card className="card border border-purple-sk">
                      <CardBody>
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-3 mt-3"
                            src={require("assets/img/brand/card-proposito-about.png")}
                          />
                          <div>
                            <h4 className="h3 text-black text-left">
                              Propósito
                            </h4>
                            <p className="text-left mt-1">
                              Se conectar de forma verdadeira com as pessoas e despertar o seu maior potencial.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Row>
                </Col>
                <Col className="col-6">
                  <img
                    alt="..."
                    className="img-fluid d-none d-md-block"
                    src={require("assets/img/brand/person-card-about.png")}
                  />
                </Col>
              </Row>
            </Container>
            <Container fluid>
              <Row className="justify-content-center text-center mt-4">
                <Col md="12">
                  <h2 className="display-3 text-purple-sk">
                    Nosso manifesto
                  </h2>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="d-flex justify-content-center text-center mt-4 mb-6">
                <Col className="col-6">
                  <img
                    alt="..."
                    className="img-fluid d-none d-md-block"
                    src={require("assets/img/brand/women-about.png")}
                  />
                </Col>
                <Col className="col-md-6 col-xs-12 col-sm-12">
                  <Row>
                    <p className="text-left mt-1">
                      Somos apaixonados por capacitar empresas e organizações a alcançarem seu máximo potencial através de soluções inovadoras em nosso sistema.
                    </p>
                  </Row>
                  <Row>
                    <p className="text-left mt-1">
                      Temos um compromisso profundo com a transformação e evolução das práticas de RH, impulsionando um ambiente de trabalho onde cada indivíduo prospera e contribui para o sucesso coletivo.
                    </p>
                  </Row>
                  <Row>
                    <p className="text-left mt-1">
                      Acreditamos que a evolução começa pelas pessoas. Estamos comprometidos em impulsionar o potencial humano,
                      capacitando organizações a prosperar em um mundo em constante transformação.
                      Queremos muita gente conosco nesta jornada de inovação, excelência e descoberta do verdadeiro poder das pessoas.
                    </p>
                  </Row>
                </Col>
              </Row>
            </Container>
            <Container className="mb-6">
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <div className="position-relative d-inline-block">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/img/brand/card-about.png")}
                  />
                  <Button
                    className="text-white position-center mb-lg-5 mt--4 rounded-pill"
                    color="purple-sk"
                    size="sm"
                    href="/auth/pricing"
                    style={{ bottom: '35px' }}
                  >
                    Conheça nossos planos
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          </section>  
      </div>
    <AuthFooter />
 </>
);
};

export default Aboutus;
