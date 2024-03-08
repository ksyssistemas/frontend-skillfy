import React, { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';

import ShowEmployeeDetailsModal from "../../Modals/admin/show-employee-details";
import ModalEnterprise from "../../Modals/admin/ModalEnterprise"
import fakeCompanies from '../../../mocks/mockEnterprises'

import useCNPJ from "../../../hooks/useCNPJ"

const EmployeeInformationList = () => {

  const [cnpj, setCnpj] = useState('19131243000197');
  const { data: enterpriseData, loading, error, setCnpj: setCnpjFromHook } = useCNPJ(cnpj);

  const handleCnpjChange = (event) => {
    // Atualiza o estado local do CNPJ e chama a função setCnpj do hook
    setCnpj(event.target.value);
    setCnpjFromHook(event.target.value);
  };

  const deleteCompany = (companyId) => {
    // Implemente a lógica para deletar a empresa
  };



  {/** Modal  Enterprise*/ }
  const [modalEnterpriseOpen, setModalEnterpriseOpen] = React.useState(false);

  const toggleModalEnterprise = () => {
    setModalEnterpriseOpen(!modalEnterpriseOpen);
  };

  const handleSave = () => {
    toggleModalEnterprise();
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  function handleShowEmployeeDetailsModal() {
    setModalOpen(!modalOpen)
  }

  return (
    <Card>
      <CardHeader className="border-0">
        <Row>
          <Col xs="6">
            <h3 className="mb-0">Lista de Colaboradores</h3>
          </Col>
          <Col className="text-right" xs="6">
            <Button
              className="btn-neutral btn-round btn-icon"
              color="default"
              href="#pablo"
              id="tooltip969372949"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              <span className="btn-inner--icon mr-1">
                <i className="fas fa-user-edit" />
              </span>
              <span className="btn-inner--text">Export</span>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip969372949">
              Edit product
            </UncontrolledTooltip>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="table-check-all"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="table-check-all"
                />
              </div>
            </th>
            <th>Nome</th>
            <th>Ocupação</th>
            <th>Data de Admissão</th>
            <th>Estado</th>
            <th>Detalhes</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="table-check-all"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="table-check-all"
                />
              </div>
            </th>
            <td className="table-user">
              <img
                alt="..."
                className="avatar rounded-circle mr-3"
                src={require("assets/img/theme/team-1.jpg")}
              />
              <b>John Michael</b>
            </td>
            <td>
              <a
                className="font-weight-bold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Argon Dashboard PRO
              </a>
            </td>
            <td>
              <span className="text-muted">
                10/09/{new Date().getFullYear()}
              </span>
            </td>
            <td>
              <Badge color="success" pill>
                Active
              </Badge>
            </td>
            <td className="text-center text-muted">
              <Nav navbar>
                <NavItem>
                  <NavLink target="_blank">
                    <a href="#" className="text-underline">
                      <span
                        onClick={handleShowEmployeeDetailsModal}
                        className="name mb-0 text-sm"
                      >
                        Mais
                      </span>
                    </a>
                  </NavLink>
                </NavItem>
              </Nav>
            </td>
            <td className="table-actions">
              <a
                className="table-action"
                href="#pablo"
                id="tooltip564981685"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-user-edit" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip564981685">
                Edit product
              </UncontrolledTooltip>
              <a
                className="table-action table-action-delete"
                href="#pablo"
                id="tooltip601065234"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-trash" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip601065234">
                Delete product
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="table-check-all"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="table-check-all"
                />
              </div>
            </th>
            <td className="table-user">
              <img
                alt="..."
                className="avatar rounded-circle mr-3"
                src={require("assets/img/theme/team-2.jpg")}
              />
              <b>Alex Smith</b>
            </td>
            <td>
              <a
                className="font-weight-bold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Argon Design System
              </a>
            </td>
            <td>
              <span className="text-muted">
                08/09/{new Date().getFullYear()}
              </span>
            </td>
            <td>
              <Badge color="success" pill>
                Active
              </Badge>
            </td>
            <td className="text-center text-muted">
              <Nav navbar>
                <NavItem>
                  <NavLink target="_blank">
                    <a href="#" className="text-underline">
                      <span
                        onClick={handleShowEmployeeDetailsModal}
                        className="name mb-0 text-sm"
                      >
                        Mais
                      </span>
                    </a>
                  </NavLink>
                </NavItem>
              </Nav>
            </td>
            <td className="table-actions">
              <a
                className="table-action"
                href="#pablo"
                id="tooltip123539273"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-user-edit" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip123539273">
                Edit product
              </UncontrolledTooltip>
              <a
                className="table-action table-action-delete"
                href="#pablo"
                id="tooltip397466356"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-trash" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip397466356">
                Delete product
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="table-check-all"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="table-check-all"
                />
              </div>
            </th>
            <td className="table-user">
              <img
                alt="..."
                className="avatar rounded-circle mr-3"
                src={require("assets/img/theme/team-3.jpg")}
              />
              <b>Samantha Ivy</b>
            </td>
            <td>
              <a
                className="font-weight-bold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Black Dashboard
              </a>
            </td>
            <td>
              <span className="text-muted">
                30/08/{new Date().getFullYear()}
              </span>
            </td>
            <td>
              <Badge color="success" pill>
                Active
              </Badge>
            </td>
            <td className="text-center text-muted">
              <Nav navbar>
                <NavItem>
                  <NavLink target="_blank">
                    <a href="#" className="text-underline">
                      <span
                        onClick={handleShowEmployeeDetailsModal}
                        className="name mb-0 text-sm"
                      >
                        Mais
                      </span>
                    </a>
                  </NavLink>
                </NavItem>
              </Nav>
            </td>
            <td className="table-actions">
              <a
                className="table-action"
                href="#pablo"
                id="tooltip968903465"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-user-edit" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip968903465">
                Edit product
              </UncontrolledTooltip>
              <a
                className="table-action table-action-delete"
                href="#pablo"
                id="tooltip161447542"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-trash" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip161447542">
                Delete product
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="table-check-all"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="table-check-all"
                />
              </div>
            </th>
            <td className="table-user">
              <img
                alt="..."
                className="avatar rounded-circle mr-3"
                src={require("assets/img/theme/team-1.jpg")}
              />
              <b>John Michael</b>
            </td>
            <td>
              <a
                className="font-weight-bold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Argon Dashboard PRO
              </a>
            </td>
            <td>
              <span className="text-muted">
                10/09/{new Date().getFullYear()}
              </span>
            </td>
            <td>
              <Badge color="success" pill>
                Active
              </Badge>
            </td>
            <td className="text-center text-muted">
              <Nav navbar>
                <NavItem>
                  <NavLink target="_blank">
                    <a href="#" className="text-underline">
                      <span
                        onClick={handleShowEmployeeDetailsModal}
                        className="name mb-0 text-sm"
                      >
                        Mais
                      </span>
                    </a>
                  </NavLink>
                </NavItem>
              </Nav>
            </td>
            <td className="table-actions">
              <a
                className="table-action"
                href="#pablo"
                id="tooltip874640709"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-user-edit" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip874640709">
                Edit product
              </UncontrolledTooltip>
              <a
                className="table-action table-action-delete"
                href="#pablo"
                id="tooltip598568751"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-trash" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip598568751">
                Delete product
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="table-check-all"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="table-check-all"
                />
              </div>
            </th>
            <td className="table-user">
              <img
                alt="..."
                className="avatar rounded-circle mr-3"
                src={require("assets/img/theme/team-2.jpg")}
              />
              <b>John Michael</b>
            </td>
            <td>
              <a
                className="font-weight-bold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Argon Dashboard PRO
              </a>
            </td>
            <td>
              <span className="text-muted">
                10/09/{new Date().getFullYear()}
              </span>
            </td>
            <td>
              <Badge color="success" pill>
                Active
              </Badge>
            </td>
            <td className="text-center text-muted">
              <Nav navbar>
                <NavItem>
                  <NavLink target="_blank">
                    <a href="#" className="text-underline">
                      <span
                        onClick={handleShowEmployeeDetailsModal}
                        className="name mb-0 text-sm"
                      >
                        Mais
                      </span>
                    </a>
                  </NavLink>
                </NavItem>
              </Nav>
            </td>
            <td className="table-actions">
              <a
                className="table-action"
                href="#pablo"
                id="tooltip400574648"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-user-edit" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip400574648">
                Edit product
              </UncontrolledTooltip>
              <a
                className="table-action table-action-delete"
                href="#pablo"
                id="tooltip573554853"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-trash" />
              </a>
              <UncontrolledTooltip delay={0} target="tooltip573554853">
                Delete product
              </UncontrolledTooltip>
            </td>
          </tr>
        </tbody>
      </Table>

      <ShowEmployeeDetailsModal
        handleShowEmployeeDetailsModal={handleShowEmployeeDetailsModal}
        modalOpen={modalOpen}
      />

    </Card>
  );
};

export default EmployeeInformationList;
