/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import Link from "next/link";


// reactstrap components
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
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter from "components/Footers/RegisterFooter.js";


function Index() {

  return (
    <>
    <IndexNavbar />
      <div className="main-content">
        <IndexHeader />
        <section className="py-6 pb-9 bg-white">
          <Container fluid>
            <Row className="justify-content-center text-center">
              <Col md="7">
                <h2 className="display-3 text-purple-sk">
                  O caminho estratégico e fácil para a gestão
                  de pessoas da sua empresa.
                </h2>
                <p className="lead text-black">
                  Uma solução do tamanho da sua necessidade. Através da plataforma SkillFy você tem muito mais autonomia e benefícios:
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg pt-lg-0 mt--7 bg-white">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="6">
                    <Card className="card-lift--hover border border-purple-sk">
                      <CardBody className="py-5">
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-3"
                            src={require("assets/img/brand/card-s-1.png")}
                          />
                          <div>
                            <h4 className="h3 text-info text-uppercase text-purple-sk">
                              Flexibilidade para atender <br />
                              o DNA da sua empresa
                            </h4>
                            <p className="description mt-3">
                              Monte questionários e defina as avaliações de forma flexível e prática.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <Card className="card-lift--hover border border-purple-sk">
                      <CardBody className="py-5">
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-3"
                            src={require("assets/img/brand/card-s-2.png")}
                          />
                          <div>
                            <h4 className="h3 text-success text-uppercase text-purple-sk">
                              Avaliações mais precisas
                            </h4>
                            <p className="description mt-3">
                              Avaliações de competência e desempenho personalizadas.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <Card className="card-lift--hover border border-purple-sk">
                      <CardBody className="py-5">
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-3"
                            src={require("assets/img/brand/card-s-3.png")}
                          />
                          <div>
                            <h4 className="h3 text-warning text-uppercase text-purple-sk">
                              Feedbacks colaborativos
                            </h4>
                            <p className="description mt-3">
                              Sistema projetado para transformar a forma de coletar, analisar e utiliza feedbacks.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <Card className="card-lift--hover border border-purple-sk">
                      <CardBody className="py-5">
                        <div className="d-flex align-items-start">
                            <img
                              alt="..."
                              className="img mr-3"
                             src={require("assets/img/brand/card-s-4.png")}
                            />
                          <div>
                            <h4 className="h3 text-info text-uppercase text-purple-sk">
                              Sistema integrado e unificado
                            </h4>
                            <p className="description mt-3">
                              Simplifique a gestão tendo acesso a todos os dados e recursos e em um único lugar.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon points="2560 0 2560 100 0 100" fill="#57249F" /> 
            </svg>
          </div>
        </section>
        <section className="py-6 pb-7" style={{ backgroundColor: '#57249F' }}>
          <Container fluid>
            <Row className="justify-content-center text-center mb-6">
              <Col md="6">
                <h2 className="display-3 text-white">
                Todos os recursos necessários para potencializar a sua gestão: 
                </h2>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="4 mt--3">
                    <Card className="shadow border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img mb-3"
                            src={require("assets/img/brand/card-s3-1.png")}
                          />
                            <h4 className="h4 text-warning text-purple-sk">
                            Mapa de competências da empresa e por área
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="2 mt--3">
                    <Card className="shadow border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                            <img
                              alt="..."
                              className="img mb-3"
                             src={require("assets/img/brand/card-s3-2.png")}
                            />
                            <h4 className="h4 text-info text-purple-sk">
                            Avaliação de desempenho
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4  mt--3">
                    <Card className="pb-4 shadow border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img mb-3"
                            src={require("assets/img/brand/card-s3-3.png")}
                          />
                            <h4 className="h4 text-warning text-purple-sk">
                              Métricas de avaliação 100% flexíveis
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="2  mt--3">
                    <Card className="shadow border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                            <img
                              alt="..."
                              className="img mb-3"
                             src={require("assets/img/brand/card-s3-4.png")}
                            />
                            <h4 className="h4 text-info text-purple-sk">
                              Feedback 90º, 180º e 360º
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>     
                </Row>
                <Row>
                  <Col lg="2 mt--3">
                    <Card className="shadow border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img mb-3"
                            src={require("assets/img/brand/card-s3-5.png")}
                          />
                            <h4 className="h4 text-warning text-purple-sk">
                            Nine box e revelação dos top performers
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4 mt--3">
                    <Card className="shadow pb-4 border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                            <img
                              alt="..."
                              className="img mb-3"
                             src={require("assets/img/brand/card-s3-6.png")}
                            />
                            <h4 className="h4 text-info text-purple-sk">
                            Relatório de desempenho corporativo (individual e por times)
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="2 mt--3">
                    <Card className="shadow pb-5 border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                          <img
                            alt="..."
                            className="img mb-3"
                            src={require("assets/img/brand/card-s3-7.png")}
                          />
                            <h4 className="h4 text-warning text-purple-sk">
                              One:one
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4 mt--3">
                    <Card className="shadow pb-5 border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-3">
                            <img
                              alt="..."
                              className="img mb-3"
                             src={require("assets/img/brand/card-s3-8.png")}
                            />
                            <h4 className="h4 text-info text-purple-sk">
                            PDI: plano de desenvolvimento individual
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>     
                </Row>
                <Row className="justify-content-center text-center mt-2">
                  <Button
                    className="text-purple-sk my-2 rounded-pill"
                    color="green-sk"
                    href="/auth/pricing"
                    >
                      Conheça nossos planos
                    </Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6 pb-6 bg-white">
          <Container fluid>
            <Row className="justify-content-center text-center">
              <Col md="8">
                <h2 className="display-3 text-purple-sk">
                  Por que usar a plataforma SkillFy?
                </h2>
                <p className="lead text-black">
                  A gestão de pessoas pode ser muito fácil. Nosso sistema foi desenvolvido
                  com a base de um time de especialistas em gestão de pessoas, RH e DHO.
                  É a solução criada por quem realmente entende e adequa as boas práticas do setor.
                  Com a plataforma SkillFy você tem:
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="bg-white">
          <Container>
            <section className="py-3 bg-white mr-4 ml-5">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col md="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/card-s4-1.png")}
                    />
                  </Col>
                  <Col md="6">
                    <div className="pr-md-5">
                      <h1 className="text-purple-sk">Melhor experiência para o líder</h1>
                      <p>
                        Nosso sistema foi desenvolvido com o objetivo de tornar a vida profissional dos líderes mais agradável, produtiva e eficiente. Transformando a gestão com seus liderados.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="py-5 bg-white mr-4 ml-5">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col className="order-md-2 d-flex justify-content-end" md="5">
                    <img
                      alt="..."
                      className="img-end"
                      src={require("assets/img/brand/card-s4-2.png")}
                    />
                  </Col>
                  <Col md="6">
                    <div className="pr-md-5 bg-white">
                      <h1 className="text-purple-sk">Facilidade no processo de ponta a ponta</h1>
                      <p>
                        Tenha facilidade e acesso às informações, através de uma comunicação rápida e eficiente. Otimize todos os seus processos e gerencie tudo em um único lugar.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="py-5 bg-white mr-4 ml-5">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col md="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/card-s4-3.png")}
                    />
                  </Col>
                  <Col md="6">
                    <div className="pr-md-5">
                      <h1 className="text-purple-sk">Gestão otimizada e estratégica</h1>
                      <p>
                        Obtenha insights precisos pelo sistema, avaliando cada métrica essencial. Simplificamos o processo para que você possa tomar decisões muito mais seguras.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="py-5 bg-white mr-4 ml-5">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col className="order-md-2 d-flex justify-content-end" md="5">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/card-s4-4.png")}
                    />
                  </Col>
                  <Col className="order-md-1" md="6">
                    <div className="pr-md-5">
                      <h1 className="text-purple-sk">Ambiente colaborativo e dinâmico</h1>
                      <p>
                        Com ferramentas integradas sua equipe pode colher feedbacks em tempo real. Um ambiente onde a colaboração flui naturalmente e todos tem a oportunidade de contribuir e crescer juntos.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Container>
        </section>
        <section className="py-6 pb-6 bg-white">
          <Container fluid>
            <Row className="justify-content-center text-center mb-5">
              <Col md="8">
                <h2 className="display-4 text-purple-sk">
                  Um ambiente gratificante para o colaborador. As ferramentas para uma gestão eficiente. Uma solução pensada para os resultados.
                </h2>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-1 bg-white">
          <Container className="mb-6">
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <div className="position-relative d-inline-block">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/img/brand/card-s5-1.png")}
                  />
                  <Button
                    className="text-white position-absolute mb-lg-5 rounded-pill"
                    color="purple-sk"
                    size="sm"
                    href="/auth/pricing"
                    style={{ bottom: '20px', left: '25px' }}
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
}

export default Index;
