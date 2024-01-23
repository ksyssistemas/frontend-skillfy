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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";

function Pricing() {
  return (
    <>
      <AuthHeader title="Escolha o melhor plano para o seu negócio" lead="" />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="10">
            <div className="pricing card-group flex-column flex-md-row mb-3">
              <Card className="card-pricing border-0 text-center mb-4">
                <CardHeader className="bg-transparent">
                  <h4 className="text-uppercase ls-1 text-info py-3 mb-0">
                    Plano Básico
                  </h4>
                </CardHeader>
                <CardBody className="px-lg-7">
                  <div className="display-2">R$49</div>
                  <span className="text-muted">per application</span>
                  <ul className="list-unstyled my-4">
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                            <i className="fas fa-terminal" />
                          </div>
                        </div>
                        <div>
                          <span className="pl-2">Pesquisas de Desempenho</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                            <i className="fas fa-pen-fancy" />
                          </div>
                        </div>
                        <div>
                          <span className="pl-2">
                          Avaliações de Competências
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                            <i className="fas fa-hdd" />
                          </div>
                        </div>
                        <div>
                          <span className="pl-2">Feedback 360 Graus</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                            <i className="fas fa-hdd" />
                          </div>
                        </div>
                        <div>
                          <span className="pl-2">Enquetes de Engajamento</span>
                        </div>
                      </div>
                    </li>
                    
                  </ul>
                  <Button className="mb-3" color="info" type="button">
                    Start free trial
                  </Button>
                </CardBody>
                <CardFooter>
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Request a demo
                  </a>
                </CardFooter>
              </Card>
              <Card className="card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4">
                <CardHeader className="bg-transparent">
                  <h4 className="text-uppercase ls-1 text-white py-3 mb-0">
                    Plano Intermediário
                  </h4>
                </CardHeader>
                <CardBody className="px-lg-7">
                  <div className="display-1 text-white">$199</div>
                  <span className="text-white">per application</span>
                  <ul className="list-unstyled my-4">
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                            <i className="fas fa-terminal" />
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-white">
                            Complete documentation
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                            <i className="fas fa-pen-fancy" />
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-white">
                            Working materials in Sketch
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle text-muted">
                            <i className="fas fa-hdd" />
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-white">
                            2GB cloud storage
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Button className="mb-3" color="secondary" type="button">
                    Start free trial
                  </Button>
                </CardBody>
                <CardFooter className="bg-transparent">
                  <a
                    className="text-white"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Contact sales
                  </a>
                </CardFooter>
              </Card>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-lg-center px-3 mt-5">
          <div>
            <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-primary">
              <i className="ni ni-building text-primary" />
            </div>
          </div>
          <Col lg="10">
            <p className="text-white text-justify">
              <strong>A Twig</strong> oferece pesquisas direcionadas ao desempenho e aprendizado dos colaboradores, incluindo avaliações 360 graus, pesquisas de competências e enquetes de engajamento. Com funcionalidades de acompanhamento do aprendizado e autoavaliação de competências, promove o desenvolvimento contínuo. Integrando pesquisas de reconhecimento, bem-estar, diversidade e inclusão, proporciona uma abordagem completa para aprimorar a eficácia e satisfação no ambiente de trabalho.
            </p>
          </Col>
        </div>
        <Row className="row-grid justify-content-center">
          <Col lg="10">
            <Table className="table-dark mt-5" responsive>
              <thead>
                <tr>
                  <th className="px-0 bg-transparent" scope="col">
                    <span className="text-light font-weight-700">Recursos</span>
                  </th>
                  <th className="text-center bg-transparent" scope="col">
                    Plano Intermediário
                  </th>
                  <th className="text-center bg-transparent" scope="col">
                    Plano Básico
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-0">Pesquisas de Desempenho Individual</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Avaliações de Competências</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Acompanhamento do Aprendizado</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
                <tr>
                  <td className="px-0">Feedback 360 Graus</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <span className="text-sm text-light">
                      Limitado a apenas 10 Colaboradores
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Enquetes de Engajamento</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Pesquisas de Clima Organizacional</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
                <tr>
                  <td className="px-0">Autoavaliação de Competências</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
                <tr>
                  <td className="px-0">Pesquisas de Diversidade e Inclusão</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Pricing.layout = Auth;

export default Pricing;
