import React, { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import ShowEmployeeDetailsModal from "../../Modals/admin/show-employee-details";
import { useFindAllEmployee } from "../../../hooks/employee/useFindAllEmployee";

const EmployeeUserList = () => {

  const [detailedEmployeeData, setDetailedEmployeeData] = useState([]);
  const [idSelectedToShowEmployeeDetails, setIdSelectedToShowEmployeeDetails] = useState('');

  //const deleteCustomer = useDeleteCustomerAccount();

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  function handleShowEmployeeDetailsModal(employeeId) {
    setModalOpen(!modalOpen)
    setIdSelectedToShowEmployeeDetails(employeeId);
  }

  const handleDeleteEmployee = async (id) => {
    const deletedId = await deleteCustomer(id);
    if (deletedId !== null) {
      window.location.reload();
    } else {
      console.error('Failed to delete cursomer with ID:', id);
    }
  };

  useEffect(async () => {
    if (detailedEmployeeData && detailedEmployeeData.length === 0) {
      const foundEmployee = await useFindAllEmployee();
      setDetailedEmployeeData(foundEmployee);
    }
  }, [detailedEmployeeData]);

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
          {detailedEmployeeData && detailedEmployeeData.map((employee) => (
            <tr key={employee.id}>
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
                <b>{employee.name} {employee.lastName}</b>
              </td>
              <td>
                <a
                  className="font-weight-bold"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {employee.roleId}
                </a>
              </td>
              <td>
                <span className="text-muted">
                  {formatDate(employee.createdAt)}
                </span>
              </td>
              <td>
                <Badge color="success" pill>
                  Active
                </Badge>
              </td>
              <td className="text-muted">
                <Nav navbar>
                  <NavItem>
                    <NavLink target="_blank">
                      <a href="#" className="text-underline">
                        <span
                          onClick={() => handleShowEmployeeDetailsModal(employee.id)}
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
          ))}
        </tbody>
      </Table>

      {idSelectedToShowEmployeeDetails && (
        <ShowEmployeeDetailsModal
          handleShowEmployeeDetailsModal={handleShowEmployeeDetailsModal}
          modalOpen={modalOpen}
          idSelectedToShowEmployeeDetails={idSelectedToShowEmployeeDetails}
        />
      )}

    </Card>
  );
};

export default EmployeeUserList;
