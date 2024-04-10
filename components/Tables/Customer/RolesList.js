import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardHeader,
  Form,
  Table,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import ShowJobDescriptionsModal from "../../Modals/admin/show-job-descriptions";
import ShowFunctionsDescriptionsModal from "../../Modals/admin/show-functions-descriptions";

function RolesList() {

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
    </Form>
  );
}

export default RolesList;
