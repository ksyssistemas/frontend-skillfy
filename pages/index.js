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
        <section className="py-6 pb-9">
          <Container fluid>
            <Row className="justify-content-center text-center">
              <Col md="6">
                <h2 className="display-3 text-indigo mr--4">
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
        <section className="section section-lg pt-lg-0 mt--7">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="6">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="d-flex align-items-start">
                        <img
                          alt="..."
                          className="img mr-5"
                          src={require("assets/img/brand/card-s-1.png")}
                        />
                        <div>
                          <h4 className="h3 text-info text-uppercase text-indigo">
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
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-5"
                            src={require("assets/img/brand/card-s-2.png")}
                          />
                          <div>
                            <h4 className="h3 text-success text-uppercase text-indigo">
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
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="d-flex align-items-start">
                          <img
                            alt="..."
                            className="img mr-5"
                            src={require("assets/img/brand/card-s-3.png")}
                          />
                          <div>
                            <h4 className="h3 text-warning text-uppercase text-indigo">
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
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="d-flex align-items-start">
                            <img
                              alt="..."
                              className="img mr-5"
                             src={require("assets/img/brand/card-s-4.png")}
                            />
                          <div>
                            <h4 className="h3 text-info text-uppercase text-indigo">
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
        </section>
        <section className="py-6 pb-9 mt-5" style={{ backgroundColor: '#57249F' }}>
          <Container fluid>
            <Row className="justify-content-center text-center mb-5">
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
                  <Col lg="4">
                    <Card className="shadow border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                          <img
                            alt="..."
                            className="img"
                            src={require("assets/img/brand/card-s3-1.png")}
                          />
                            <h4 className="h4 text-warning text-indigo">
                            Mapa de competências da empresa e por área
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="2">
                    <Card className="shadow border-0 text-center ml--3 mr--3" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                            <img
                              alt="..."
                              className="img"
                             src={require("assets/img/brand/card-s3-2.png")}
                            />
                            <h4 className="h4 text-info text-indigo">
                            Avaliação de desempenho
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="pb-4 shadow border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                          <img
                            alt="..."
                            className="img"
                            src={require("assets/img/brand/card-s3-3.png")}
                          />
                            <h4 className="h4 text-warning text-indigo">
                              Métricas de avaliação 100% flexíveis
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="2">
                    <Card className="shadow border-0 text-center ml--3" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                            <img
                              alt="..."
                              className="img"
                             src={require("assets/img/brand/card-s3-4.png")}
                            />
                            <h4 className="h4 text-info text-indigo">
                              Feedback 90º, 180º e 360º
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>     
                </Row>
                <Row>
                  <Col lg="2 mt--3">
                    <Card className="shadow border-0 text-center mr--3" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                          <img
                            alt="..."
                            className="img"
                            src={require("assets/img/brand/card-s3-5.png")}
                          />
                            <h4 className="h4 text-warning text-indigo">
                            Nine box e revelação dos top performers
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4 mt--3">
                    <Card className="shadow pb-4 border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                            <img
                              alt="..."
                              className="img"
                             src={require("assets/img/brand/card-s3-6.png")}
                            />
                            <h4 className="h4 text-info text-indigo">
                            Relatório de desempenho corporativo (individual e por times)
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="2 mt--3">
                    <Card className="shadow pb-5 border-0 text-center ml--3 mr--3" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                          <img
                            alt="..."
                            className="img"
                            src={require("assets/img/brand/card-s3-7.png")}
                          />
                            <h4 className="h4 text-warning text-indigo">
                              One:one
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4 mt--3">
                    <Card className="shadow pb-5 border-0 text-center" style={{ backgroundColor: '#D2B9F4' }}>
                      <CardBody className="py-4">
                            <img
                              alt="..."
                              className="img"
                             src={require("assets/img/brand/card-s3-8.png")}
                            />
                            <h4 className="h4 text-info text-indigo">
                            PDI: plano de desenvolvimento individual
                            </h4>
                      </CardBody>
                    </Card>
                  </Col>     
                </Row>
                <Row className="justify-content-center text-center mt-2">
                <Button
                        className="text-indigo my-2"
                        color="success"
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
              <Col md="6">
                <h2 className="display-3 text-indigo">
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
        <section className="py-3 bg-white">
          <Container>
            <Row className="row-grid align-items-center mr-6 ml-6">
              <Col md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/brand/card-s4-1.png")}
                />
              </Col>
              <Col md="6">
                <div className="pr-md-5">
                  <h1 className="text-indigo">Melhor experiência para o líder</h1>
                  <p>
                    Nosso sistema foi desenvolvido com o objetivo de tornar a vida profissional dos líderes mais agradável, produtiva e eficiente. Transformando a gestão com seus liderados.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-5 bg-white">
          <Container>
            <Row className="row-grid align-items-center mr-6 ml-6">
              <Col className="order-md-2 d-flex justify-content-end" md="6">
                <img
                  alt="..."
                  className="img-end"
                  src={require("assets/img/brand/card-s4-2.png")}
                />
              </Col>
              <Col md="6">
                <div className="pr-md-5 bg-white">
                  <h1 className="text-indigo mr--8">Facilidade no processo de ponta a ponta</h1>
                  <p>
                    Tenha facilidade e acesso às informações, através de uma comunicação rápida e eficiente. Otimize todos os seus processos e gerencie tudo em um único lugar.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-5 bg-white">
          <Container>
            <Row className="row-grid align-items-center mr-6 ml-6">
              <Col md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/brand/card-s4-3.png")}
                />
              </Col>
              <Col md="6">
                <div className="pr-md-5">
                  <h1 className="text-indigo">Gestão otimizada e estratégica</h1>
                  <p>
                  Obtenha insights precisos pelo sistema, avaliando cada métrica essencial. Simplificamos o processo para que você possa tomar decisões muito mais seguras.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-5 bg-white">
          <Container>
            <Row className="row-grid align-items-center mr-6 ml-6">
              <Col className="order-md-2 d-flex justify-content-end" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/brand/card-s4-4.png")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1 className="text-indigo mr--5">Ambiente colaborativo e dinâmico</h1>
                  <p>
                  Com ferramentas integradas sua equipe pode colher feedbacks em tempo real. Um ambiente onde a colaboração flui naturalmente e todos tem a oportunidade de contribuir e crescer juntos.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6 pb-9 bg-white">
          <Container fluid>
            <Row className="justify-content-center text-center mb-5">
              <Col md="6">
                <h2 className="display-3 text-indigo">
                  Um ambiente gratificante para o colaborador. As ferramentas para uma gestão eficiente. Uma solução pensada para os resultados.
                </h2>
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
