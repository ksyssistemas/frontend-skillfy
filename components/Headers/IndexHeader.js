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
import React from "react";
import Link from "next/link";
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";

function IndexHeader() {
  return (
    <>
      <div className="header bg-info pt-5 pb-7">
        <Container>
          <div className="header-body">
            <Row className="align-items-center">
              <Col lg="6">
                <div className="pr-5">
                  <h1 className="display-2 text-white font-weight-bold mb-0">
                    Twig
                  </h1>
                  <h5 className="display-4 text-white font-weight-light">
                  Conecte-se de forma verdadeira com as pessoas e desperte o seu maior potencial
                  </h5>
                  <p className="text-white mt-4">
                  Visando eficiência na tomada de decisões de recursos humanos, integramos avaliações de desempenho, pesquisas de competências e enquetes de engajamento. Essa abordagem é implementada por meio de pesquisas 360 graus, proporcionando dados significativos para embasar estratégias eficazes de gestão de pessoas
                  </p>
                  <div className="mt-5">
                    <Link href="/admin/dashboard">
                      <Button className="btn-neutral my-2" color="default">
                        Conhecer Twig
                      </Button>
                    </Link>
                    <Button
                      className="my-2"
                      color="default"
                      href="/auth/pricing"
                    >
                      Contratar Plano
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <Row className="pt-5">
                  <Col md="6">
                    <Card>
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow mb-4">
                        <i className="ni ni-chart-bar-32" />
                        </div>
                        <h5 className="h3">Pesquisas de Desempenho Individual</h5>
                        <p>Avaliação do desempenho de cada colaborador em diferentes áreas</p>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow mb-4">
                        <i className="ni ni-chat-round" />
                        </div>
                        <h5 className="h3">Feedback 360 Graus</h5>
                        <p>
                        Coleta de feedback de colegas, subordinados e superiores para uma visão holística do desempenho
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="pt-lg-5 pt-4" md="6">
                    <Card className="mb-4">
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow mb-4">
                        <i className="ni ni-satisfied" />
                        </div>
                        <h5 className="h3">Enquetes de Engajamento</h5>
                        <p>
                        Pesquisas regulares para medir o nível de engajamento e satisfação dos colaboradores
                        </p>
                      </CardBody>
                    </Card>
                    <Card className="mb-4">
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-warning text-white rounded-circle shadow mb-4">
                        <i className="ni ni-building" />
                        </div>
                        <h5 className="h3">Pesquisas de Clima Organizacional</h5>
                        <p>Avaliação do ambiente de trabalho, identificando pontos fortes e áreas de melhoria</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default IndexHeader;
