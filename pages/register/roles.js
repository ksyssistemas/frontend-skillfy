import React, { useState } from "react";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
  Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table, Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import Enterprise from "../../layouts/Register";
import ShowJobDescriptionsModal from "../../components/Modals/admin/show-job-descriptions";
import ShowFunctionsDescriptionsModal from "../../components/Modals/admin/show-functions-descriptions";

import AlternativeHeader from "../../components/Headers/AlternativeHeader"

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

  const [modalOpen, setModalOpen] = React.useState(false);
  function handleShowJobDescriptionsModal() {
    setModalOpen(!modalOpen)
  }

  const [functionsDescriptionsModalOpen, setfunctionsDescriptionsModalOpen] = React.useState(false);
  function handleShowFunctionsDescriptionsModal() {
    setfunctionsDescriptionsModalOpen(!functionsDescriptionsModalOpen)
  }

  return (
    <Form>
      <AlternativeHeader name="Cargos" parentName="Cadastros" />
      <Container className="mt--6" fluid>
        <Row>
          <Col md="6">
            <Card className="mb-4 bg-white">
              <CardHeader>
                <h3 className="mb-0">Cadastrar Cargo</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example3cols1Input"
                      >
                        Nome
                      </label>
                      <Input
                        id="example3cols1Input"
                        placeholder="Ex.: Comercial"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example3cols2Input"
                      >
                        Reporta ao Cargo
                      </label>
                      <Select2
                        className="form-control"
                        defaultValue="0"
                        options={{
                          placeholder: "Selecione",
                        }}
                        data={[
                          { id: "0", text: "Selecione um cargo" },
                          { id: "1", text: "Financeiro" },
                          { id: "2", text: "Comercial" },
                          { id: "3", text: "Gestão de Pessoas" }
                        ]}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlTextarea1"
                      >
                        Descrição
                      </label>
                      <Input
                        id="exampleFormControlTextarea1"
                        rows="3"
                        type="textarea"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" />
                  <Col className="d-flex justify-content-end align-items-center" md="6" >
                    <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                      <span className="btn-inner--text">Adicionar Cargo</span>
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="mb-4 bg-lighter">
              <CardHeader>
                <h3 className="mb-0">Cadastrar Função</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example3cols1Input"
                      >
                        Nome
                      </label>
                      <Input
                        id="example3cols1Input"
                        placeholder="Ex.: Assistente Comercial"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example3cols2Input"
                      >
                        Reporta ao Cargo
                      </label>
                      <Select2
                        className="form-control"
                        defaultValue="0"
                        options={{
                          placeholder: "Selecione",
                        }}
                        data={[
                          { id: "0", text: "Selecione um cargo" },
                          { id: "1", text: "Financeiro" },
                          { id: "2", text: "Comercial" },
                          { id: "3", text: "Gestão de Pessoas" }
                        ]}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlTextarea1"
                      >
                        Descrição
                      </label>
                      <Input
                        id="exampleFormControlTextarea1"
                        rows="3"
                        type="textarea"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4" />
                  <Col className="d-flex justify-content-end align-items-center" md="8" >
                    <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                      <span className="btn-inner--text">Adicionar Função</span>
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card className="bg-transparent">
          <CardHeader className="bg-transparent border-0">
            <h3 className="mb-0">Cargos Registrados</h3>
          </CardHeader>

          <Table className="align-items-center table-flush" hover responsive>
            <thead className="thead-light">
              <tr>
                <th>Nome</th>
                <th>Criado Em</th>
                <th>Reporta Ao Cargo</th>
                <th>Descrição</th>
                <th>Ativo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-">
                <td className="table-user">
                  <b>CEO</b>
                </td>
                <td>
                  <span className="text-muted">
                    10/09/{new Date().getFullYear()}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">

                  </span>
                </td>
                <td className="text-muted ">
                  <Nav navbar>
                    <NavItem>
                      <NavLink target="_blank">
                        <a href="#" className="text-underline">
                          <span
                            onClick={handleShowJobDescriptionsModal}
                            className="name mb-0 text-sm"
                          >
                            Ver
                          </span>
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td>
                  <label className="custom-toggle">
                    <input defaultChecked type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
              <tr className="table-">
                <td className="table-user">
                  <b>Diretor de Financeiro</b>
                </td>
                <td>
                  <span className="text-muted">
                    08/09/{new Date().getFullYear()}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    CEO
                  </span>
                </td>
                <td className="text-muted ">
                  <Nav navbar>
                    <NavItem>
                      <NavLink target="_blank">
                        <a href="#" className="text-underline">
                          <span
                            onClick={handleShowJobDescriptionsModal}
                            className="name mb-0 text-sm"
                          >
                            Ver
                          </span>
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td>
                  <label className="custom-toggle">
                    <input type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
              <tr className="table-">
                <td className="table-user">
                  <b>Diretor de Vendas</b>
                </td>
                <td>
                  <span className="text-muted">
                    30/08/{new Date().getFullYear()}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    CEO
                  </span>
                </td>
                <td className="text-muted ">
                  <Nav navbar>
                    <NavItem>
                      <NavLink target="_blank">
                        <a href="#" className="text-underline">
                          <span
                            onClick={handleShowJobDescriptionsModal}
                            className="name mb-0 text-sm"
                          >
                            Ver
                          </span>
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td>
                  <label className="custom-toggle">
                    <input defaultChecked type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="bg-transparent border-0">
            <h3 className="mb-0">Funções Registradas</h3>
          </CardHeader>

          <Table className="align-items-center table-flush" hover responsive>
            <thead className="thead-light">
              <tr>
                <th>Nome</th>
                <th>Criada Em</th>
                <th>Reporta Ao Cargo</th>
                <th>Descrição</th>
                <th>Ativo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-">
                <td className="table-user">
                  <b>Contador Sênior</b>
                </td>
                <td>
                  <span className="text-muted">
                    10/09/{new Date().getFullYear()}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    Diretor Financeiro
                  </span>
                </td>
                <td className="text-muted ">
                  <Nav navbar>
                    <NavItem>
                      <NavLink target="_blank">
                        <a href="#" className="text-underline">
                          <span
                            onClick={handleShowFunctionsDescriptionsModal}
                            className="name mb-0 text-sm"
                          >
                            Ver
                          </span>
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td>
                  <label className="custom-toggle">
                    <input defaultChecked type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
              <tr className="table-">
                <td className="table-user">
                  <b>Analista Financeiro</b>
                </td>
                <td>
                  <span className="text-muted">
                    08/09/{new Date().getFullYear()}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    Diretor Financeiro
                  </span>
                </td>
                <td className="text-muted ">
                  <Nav navbar>
                    <NavItem>
                      <NavLink target="_blank">
                        <a href="#" className="text-underline">
                          <span
                            onClick={handleShowFunctionsDescriptionsModal}
                            className="name mb-0 text-sm"
                          >
                            Ver
                          </span>
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td>
                  <label className="custom-toggle">
                    <input type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
              <tr className="table-">
                <td className="table-user">
                  <b>Gerente de Vendas</b>
                </td>
                <td>
                  <span className="text-muted">
                    30/08/{new Date().getFullYear()}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    Diretor de Vendas
                  </span>
                </td>
                <td className="text-muted ">
                  <Nav navbar>
                    <NavItem>
                      <NavLink target="_blank">
                        <a href="#" className="text-underline">
                          <span
                            onClick={handleShowFunctionsDescriptionsModal}
                            className="name mb-0 text-sm"
                          >
                            Ver
                          </span>
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td>
                  <label className="custom-toggle">
                    <input defaultChecked type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
              <tr className="table-">
                <td className="table-user">
                  <b>Representante de Vendas</b>
                </td>
                <td>
                  <span className="text-muted">
                    30/08/{new Date().getFullYear()}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    Diretor de Vendas
                  </span>
                </td>
                <td className="text-muted ">
                  <Nav navbar>
                    <NavItem>
                      <NavLink target="_blank">
                        <a href="#" className="text-underline">
                          <span
                            onClick={handleShowFunctionsDescriptionsModal}
                            className="name mb-0 text-sm"
                          >
                            Ver
                          </span>
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </td>
                <td>
                  <label className="custom-toggle">
                    <input defaultChecked type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        <ShowJobDescriptionsModal
          handleShowJobDescriptionsModal={handleShowJobDescriptionsModal}
          modalOpen={modalOpen}
        />
        <ShowFunctionsDescriptionsModal
          handleShowFunctionsDescriptionsModal={handleShowFunctionsDescriptionsModal}
          functionsDescriptionsModalOpen={functionsDescriptionsModalOpen}
        />
      </Container>
    </Form>
  );
}

Dashboard.layout = Enterprise;

export default Dashboard;
