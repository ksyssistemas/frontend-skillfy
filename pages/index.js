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
        <section className="py-6 pb-9 bg-default">
          <Container fluid>
            <Row className="justify-content-center text-center">
              <Col md="6">
                <h2 className="display-3 text-white">
                  Twig é mais do que uma solução
                </h2>
                <p className="lead text-white">
                  Promova a colaboração e desenvolvimento contínuo com feedbacks abrangentes de colegas, subordinados e superiores. Na Twig, a interação entre as partes é valorizada para impulsionar o crescimento profissional
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg pt-lg-0 mt--7">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                          <i className="fas fa-chart-bar" />
                        </div>
                        <h4 className="h3 text-info text-uppercase">
                          Avaliações de Competências
                        </h4>
                        <p className="description mt-3">
                          Eleve o desempenho da equipe com avaliações personalizadas.</p><div>
                          <Badge color="info" pill>
                            Competência
                          </Badge>
                          <Badge color="info" pill>
                            Desempenho
                          </Badge>
                          <Badge color="info" pill>
                            Habilidades
                          </Badge>
                          <Badge color="info" pill>
                            Avaliações
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                          <i className="fas fa-users" />
                        </div>
                        <h4 className="h3 text-success text-uppercase">
                          Pesquisas de Inclusão
                        </h4>
                        <p className="description mt-3">
                          Promova uma cultura diversificada com pesquisas significativas.</p>
                        <div>
                          <Badge color="success" pill>
                            Diversidade
                          </Badge>
                          <Badge color="success" pill>
                            Inclusão
                          </Badge>
                          <Badge color="success" pill>
                            Cultura
                          </Badge>
                          <Badge color="success" pill>
                            Pesquisas
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                          <i className="fas fa-comments" />
                        </div>
                        <h4 className="h3 text-warning text-uppercase">
                          Feedback 360 Graus
                        </h4>
                        <p className="description mt-3">
                          Fomente a colaboração e crescimento com feedback abrangente.
                        </p>
                        <div>
                          <Badge color="warning" pill>
                            Feedback
                          </Badge>
                          <Badge color="warning" pill>
                            Colaboração
                          </Badge>
                          <Badge color="warning" pill>
                            Crescimento
                          </Badge>
                          <Badge color="warning" pill>
                            Desenvolvimento
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/theme/landing-1.png")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1>Central de RH Unificada</h1>
                  <p>
                    Uma única plataforma para criar pesquisas, cadastrar funcionários e utilizar os recursos essenciais do Twig. Simplifique sua gestão de RH com eficiência e praticidade.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="fas fa-chart-line" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">Avaliação de Desempenho 90°</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="fas fa-chart-bar" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">Avaliação de Desempenho 180&deg;</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="fas fa-users" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">Avaliação de Desempenho 360&deg;</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/theme/landing-2.png")}
                />
              </Col>
              <Col md="6">
                <div className="pr-md-5">
                  <h1>Análise Métrica de Desempenho</h1>
                  <p>
                    Explore nossa plataforma para análise métrica de desempenho.
                    Obtenha insights precisos, avaliando cada métrica essencial.
                    Simplificamos o processo para que você possa tomar decisões
                    e aprimorar continuamente a sua excelência.
                  </p>
                  <Link href="/auth/login">
                    <a className="font-weight-bold text-warning mt-5">
                      Conhecer Twig
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/theme/landing-3.png")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1>Ambiente Integrado de Recursos Humanos</h1>
                  <p>
                    Desfrute de um ambiente centralizado para gestão de recursos humanos. Com a nossa plataforma, você pode criar pesquisas, cadastrar funcionários e utilizar os recursos essenciais do Twig em um único lugar. Simplifique e otimize sua gestão de RH, garantindo eficiência e praticidade em cada etapa.
                  </p>
                  <Link href="/auth/pricing">
                    <a className="font-weight-bold text-info mt-5">
                      Contratar Plano
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-7 section-nucleo-icons bg-white overflow-hidden">
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">Desperte o Potencial do seu RH com a Twig <span> Uma Jornada para a Excelência</span></h2>
                <p className="lead">
                  Embarque conosco em uma jornada revolucionária para transformar
                  sua gestão de recursos humanos. A Twig é muito mais do que uma
                  plataforma; é a chave para desbloquear o potencial completo de sua equipe.
                  Imagine um ambiente unificado, onde criar pesquisas, avaliar o desempenho
                  individual, promover inclusão, e até mesmo medir o engajamento da sua equipe
                  acontecem de maneira intuitiva e eficiente.
                </p>
                <p className="lead">
                  Com a Twig, você não apenas gerencia, você impulsiona. Nossa abordagem
                  inovadora coloca você no comando, capacitando-o com ferramentas incríveis
                  para moldar o futuro do seu departamento de RH. Visualize cada aspecto da
                  performance individual, promova uma cultura inclusiva e meça o pulso da sua
                  equipe com uma facilidade sem precedentes.
                </p>
                <p className="lead">
                  E a melhor parte? Você está a um passo de ter acesso a todas essas vantagens.
                  Não apenas uma ferramenta, mas um aliado poderoso para elevar sua gestão
                  de RH a novos patamares. Não perca a oportunidade de transformar sua abordagem
                  de recursos humanos. Acesse a Twig hoje e descubra como a excelência em RH está
                  ao seu alcance, pronta para ser desbravada
                </p>
                <div className="btn-wrapper">
                  <Button
                    color="info"
                    href="#"
                    target="_blank"
                  >
                    Conhecer Twig
                  </Button>
                  <Button
                    className="mt-3 mt-md-0"
                    color="default"
                    href="/auth/pricing"
                    target="_blank"
                  >
                    Contratar Plano
                  </Button>
                </div>
              </Col>
            </Row>
            {/** 
            <div className="blur--hover">
              <a
                href="https://www.creative-tim.com/learning-lab/nextjs/icons/argon-dashboard?ref=njsadp-index-page"
                target="_blank"
              >
                <div className="icons-container blur-item mt-5">
                  <i className="icon ni ni-diamond" />

                  <i className="icon icon-sm ni ni-album-2" />
                  <i className="icon icon-sm ni ni-app" />
                  <i className="icon icon-sm ni ni-atom" />

                  <i className="icon ni ni-bag-17" />
                  <i className="icon ni ni-bell-55" />
                  <i className="icon ni ni-credit-card" />

                  <i className="icon icon-sm ni ni-briefcase-24" />
                  <i className="icon icon-sm ni ni-building" />
                  <i className="icon icon-sm ni ni-button-play" />

                  <i className="icon ni ni-calendar-grid-58" />
                  <i className="icon ni ni-camera-compact" />
                  <i className="icon ni ni-chart-bar-32" />
                </div>
                <span className="blur-hidden h5 text-success">
                  Eplore all the 21.000+ Nucleo Icons
                </span>
              </a>
            </div>
            */}
          </Container>
        </section>
        <section className="py-7">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">
                  Desperte o Potencial do seu RH com a Twig{" "}
                  <span className="text-success">
                    Uma Jornada para a Excelência
                  </span>
                </h2>
                <p className="lead">
                  Embarque conosco em uma jornada revolucionária para transformar sua gestão
                  de recursos humanos. A Twig é muito mais do que uma plataforma; é a chave
                  para desbloquear o potencial completo de sua equipe. Imagine um ambiente
                  unificado, onde criar pesquisas, avaliar o desempenho individual, promover
                  inclusão, e até mesmo medir o engajamento da sua equipe acontecem de maneira
                  intuitiva e eficiente.
                </p>
                <div className="btn-wrapper">
                  <Button
                    className="btn-neutral mb-3 mb-sm-0"
                    color="default"
                    href="https://www.creative-tim.com/product/nextjs-argon-dashboard?ref=njsadp-index-page"
                    target="_blank"
                  >
                    <span className="btn-inner--text">Conhecer Twig</span>
                  </Button>
                  <Button
                    className="btn-icon mb-3 mb-sm-0"
                    color="info"
                    href="/auth/pricing"
                    target="_blank"
                  >
                    <span className="btn-inner--icon">
                      <i className="fas fa-dollar-sign" />
                    </span>
                    <span className="btn-inner--text">Contratar Plano</span>
                  </Button>
                </div>
                {/**
                <div className="text-center">
                  <h4 className="display-4 mb-5 mt-5">
                    Available on these technologies
                  </h4>
                  <Row className="justify-content-center">
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=njsadp-index-page"
                        id="tooltip170669606"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle shadow shadow-lg--hover"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/bootstrap.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip170669606">
                        Bootstrap 4 - Most popular front-end component library
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/nextjs-argon-dashboard-pro?ref=njsadp-index-page"
                        id="tooltip374813715"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813715">
                        React - A JavaScript library for building user
                        interfaces
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-nodejs?ref=njsadp-index-page"
                        id="tooltip374813716"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nodejs-logo.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813716">
                        Node.js - a JavaScript runtime built on Chrome's V8
                        JavaScript engine
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-laravel?ref=njsadp-index-page"
                        id="tooltip374813717"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/laravel_logo.png"
                          style={{ backgroundColor: "white" }}
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813717">
                        Laravel - The PHP Framework For Web Artisans
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/vue-argon-dashboard-pro?ref=njsadp-index-page"
                        id="tooltip616015001"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip616015001">
                        Vue.js - The progressive javascript framework
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-angular?ref=njsadp-index-page"
                        id="tooltip211254026"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip211254026">
                        Angular - One framework. Mobile & desktop
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/nextjs-argon-dashboard-pro?ref=njsadp-index-page"
                        id="tooltip82987604"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/sketch.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip82987604">
                        Sketch - Digital design toolkit
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.adobe.com/products/photoshop.html?ref=creative-tim"
                        id="tooltip731835410"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle opacity-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/ps.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip731835410">
                        Adobe Photoshop - Software for digital images
                        manipulation
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                </div>
                 */}
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
