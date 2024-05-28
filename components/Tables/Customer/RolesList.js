import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Form,
  Table,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import ShowRoleDescriptionsModal from "../../Modals/admin/show-role-descriptions";
import ShowFunctionsDescriptionsModal from "../../Modals/admin/show-functions-descriptions";
import { useFindAllRoles } from "../../../hooks/role/useFindAllRoles";
import { useFindAllFunctions } from "../../../hooks/employeeFunction/useFindAllFunctions";

function RolesList() {

  const [detailedRoleData, setDetailedRoleData] = useState([]);
  const [descriptionSelectedRole, setDescriptionSelectedRole] = useState("");
  const [nameSelectedRole, setNameSelectedRole] = useState("");

  const [detailedEmployeeFunctionData, setDetailedEmployeeFunctionData] = useState([]);
  const [descriptionSelectedFunction, setDescriptionSelectedFunction] = useState("");
  const [nameSelectedFunction, setNameSelectedFunction] = useState("");

  const [modalOpen, setModalOpen] = React.useState(false);

  function handleShowRoleModal(name, description) {
    setDescriptionSelectedRole(description);
    setNameSelectedRole(name);
    handleShowRoleDescriptionsModal();
  }

  function handleShowRoleDescriptionsModal() {
    setModalOpen(!modalOpen)
  }

  const [functionsDescriptionsModalOpen, setfunctionsDescriptionsModalOpen] = React.useState(false);

  function handleShowFunctionModal(name, description) {
    setDescriptionSelectedFunction(description);
    setNameSelectedFunction(name);
    handleShowFunctionsDescriptionsModal();
  }

  function handleShowFunctionsDescriptionsModal() {
    setfunctionsDescriptionsModalOpen(!functionsDescriptionsModalOpen)
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(async () => {
    if (detailedRoleData && detailedRoleData.length === 0) {
      const foundRole = await useFindAllRoles();
      setDetailedRoleData(foundRole);
    }
  }, [detailedRoleData]);

  useEffect(async () => {
    if (detailedEmployeeFunctionData && detailedEmployeeFunctionData.length === 0) {
      const foundEmployeeFunction = await useFindAllFunctions();
      setDetailedEmployeeFunctionData(foundEmployeeFunction);
    }
  }, [detailedEmployeeFunctionData]);

  return (
    <Form>
      <Card>
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
            {detailedRoleData && detailedRoleData.map((role) => (
              <tr className="table-" key={role.ID_Role}>
                <td className="table-user">
                  <b>{role.roleName}</b>
                </td>
                <td>
                  <span className="text-muted">
                    {formatDate(role.CreatedAt)}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    {department.Responsible}
                  </span>
                </td>
                <td className="text-muted">
                  {
                    role.Description ? (
                      <Nav navbar>
                        <NavItem>
                          <NavLink target="_blank">
                            <a href="#" className="text-underline">
                              <span
                                onClick={() => handleShowRoleModal(role.RoleName, role.Description)}
                                className="name mb-0 text-sm"
                              >
                                Ver
                              </span>
                            </a>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    ) : (
                      <span
                        className="name mb-0 text-sm"
                      >
                        Não há descrição
                      </span>

                    )}
                </td>
                <td>
                  <label className="custom-toggle">
                    <input type="checkbox" checked={department.Status ? true : false} />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card>
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
            {detailedEmployeeFunctionData && detailedEmployeeFunctionData.map((employeeFunction) => (
              <tr className="table-" key={employeeFunction.ID_Function}>
                <td className="table-user">
                  <b>{employeeFunction.FunctionName}</b>
                </td>
                <td>
                  <span className="text-muted">
                    {formatDate(employeeFunction.CreatedAt)}
                  </span>
                </td>
                <td>
                  <span className="name mb-0 text-sm">
                    {employeeFunction.Responsible}
                  </span>
                </td>
                <td className="text-muted ">
                  {
                    employeeFunction.Description ? (
                      <Nav navbar>
                        <NavItem>
                          <NavLink target="_blank">
                            <a href="#" className="text-underline">
                              <span
                                onClick={() => handleShowFunctionModal(employeeFunction.RoleName, employeeFunction.Description)}
                                className="name mb-0 text-sm"
                              >
                                Ver
                              </span>
                            </a>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    ) : (
                      <span
                        className="name mb-0 text-sm"
                      >
                        Não há descrição
                      </span>

                    )}
                </td>
                <td>
                  <label className="custom-toggle">
                    <input type="checkbox" checked={department.Status ? true : false} />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="No"
                      data-label-on="Yes"
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <ShowRoleDescriptionsModal
        handleShowRoleDescriptionsModal={handleShowRoleDescriptionsModal}
        modalOpen={modalOpen}
        roleDescription={descriptionSelectedRole}
        roleName={nameSelectedRole}
      />
      <ShowFunctionsDescriptionsModal
        handleShowFunctionsDescriptionsModal={handleShowFunctionsDescriptionsModal}
        functionsDescriptionsModalOpen={functionsDescriptionsModalOpen}
        employeeFunctionDescription={descriptionSelectedFunction}
        employeeFunctionName={nameSelectedFunction}
      />
    </Form>
  );
}

export default RolesList;
