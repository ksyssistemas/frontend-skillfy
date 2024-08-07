import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Table,
  Nav,
  NavItem,
  NavLink,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";
import ShowRoleDescriptionsModal from "../../Modals/admin/show-role-descriptions";
import ShowFunctionsDescriptionsModal from "../../Modals/admin/show-functions-descriptions";
import { useFindAllRoles } from "../../../hooks/RecordsHooks/role/useFindAllRoles";
import { useFindAllFunctions } from "../../../hooks/RecordsHooks/employeeFunction/useFindAllFunctions";
import { RoleContext } from "../../../contexts/RecordsContext/RoleContext";
import { EmployeeFunctionContext } from "../../../contexts/RecordsContext/EmployeeFunctionContext";
import ModalRole from "../../Modals/admin/ModalRole";
import ModalEmployeeFunction from "../../Modals/admin/ModalEmployeeFunction";
import { useSweetAlert } from "../../../contexts/SweetAlertContext";
import { useDeleteEmployeeFunction } from "../../../hooks/RecordsHooks/employeeFunction/useDeleteEmployeeFunction";
import { useDeleteRole } from '../../../hooks/RecordsHooks/role/useDeleteRole';
import { useFindRole } from "../../../hooks/RecordsHooks/role/useFindRole";
import { useFindEmployeeFunction } from "../../../hooks/RecordsHooks/employeeFunction/useFindEmployeeFunction";

function RolesList() {

  const {
    handleRoleIdToUpdate,
    hasNewRoleRecordCreated,
    handleCreatedRoleRecordStatusChange,
    hasUpdatedRoleRecord,
    handleUpdatedRoleRecordStatusChange,
    hasDeletedRoleRecord,
    handleDeletedRoleRecordStatusChange
  } = useContext(RoleContext);

  const {
    handleEmployeeFunctionIdToUpdate,
    hasNewEmployeeFunctionRecordCreated,
    handleCreatedEmployeeFunctionRecordStatusChange,
    hasUpdatedEmployeeFunctionRecord,
    handleUpdatedEmployeeFunctionRecordStatusChange,
    hasDeletedEmployeeFunctionRecord,
    handleDeletedEmployeeFunctionRecordStatusChange
  } = useContext(EmployeeFunctionContext);

  const { warningAlert } = useSweetAlert();

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

  const [openRoleUpdateModal, setOpenRoleUpdateModal] = React.useState(false);

  function handleOpenRoleUpdateModal() {
    setOpenRoleUpdateModal(!openRoleUpdateModal);
  }

  function handleRoleUpdate(roleId) {
    handleRoleIdToUpdate(roleId);
    handleOpenRoleUpdateModal();
  }

  const [openEmployeeFunctionUpdateModal, setOpenEmployeeFunctionUpdateModal] = React.useState(false);

  function handleOpenEmployeeFunctionUpdateModal() {
    setOpenEmployeeFunctionUpdateModal(!openEmployeeFunctionUpdateModal);
  }

  function handleEmployeeFunctionUpdate(employeeFunctionId) {
    handleEmployeeFunctionIdToUpdate(employeeFunctionId);
    handleOpenEmployeeFunctionUpdateModal();
  }

  const handleDeleteRole = async (roleId, roleName) => {
    try {
      const deleteResponse = await useDeleteRole(roleId);
      if (deleteResponse !== null) {
        handleDeletedRoleRecordStatusChange();
      } else {
        console.error('Failed to delete role with ID:', roleId, '. Response Status: ', deleteResponse.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };

  const handleDeleteEmployeeFunction = async (employeeFunctionId, employeeFunctionName) => {
    try {
      const deleteResponse = await useDeleteEmployeeFunction(employeeFunctionId);
      if (deleteResponse !== null) {
        handleDeletedEmployeeFunctionRecordStatusChange();
      } else {
        console.error('Failed to delete function with ID:', employeeFunctionId, '. Response Status: ', deleteResponse.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };

  const showWarningAlert = (itemId, itemName, itemContext = '') => {
    if (itemContext === 'role') {
      warningAlert(
        `${itemId}`,
        "Atenção",
        "Deletar",
        `Você deseja realmente excluir ${itemName}?`,
        "lg",
        () => handleDeleteRole(itemId, itemName)
      );
    } else if (itemContext === 'function') {
      warningAlert(
        `${itemId}`,
        "Atenção",
        "Deletar",
        `Você deseja realmente excluir ${itemName}?`,
        "lg",
        () => handleDeleteEmployeeFunction(itemId, itemName)
      );

    }
  };

  const fetchRoleNames = async (roles, context = '') => {
    const updatedRoles = await Promise.all(
      roles.map(async (role) => {
        if (role.responsible) {
          try {
            const roleData = await useFindRole(role.responsible);
            return { ...role, responsible: roleData.roleName };
          } catch (error) {
            console.error(`Error fetching ${context} data for responsible ${role.id}:`, error);
            return { ...role, responsible: 'Não reporta' };
          }
        } else {
          console.warn(`No responsible value for role ${role.id}`);
          return { ...role, responsible: 'Não reporta' };
        }
      })
    );
    if (context === 'role') {
      setDetailedRoleData(updatedRoles);
    } else if (context === 'employeeFunction') {
      setDetailedEmployeeFunctionData(updatedRoles);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      if (detailedRoleData.length <= 0 || hasUpdatedRoleRecord || hasDeletedRoleRecord) {
        try {
          const foundRole = await useFindAllRoles();
          if (foundRole) {
            await fetchRoleNames(foundRole, 'role');
          } else {
            console.error('Invalid data format:', foundRole);
          }
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      }
    };
    fetchRoles();
    if (hasNewRoleRecordCreated) {
      handleCreatedRoleRecordStatusChange();
    }
    if (hasUpdatedRoleRecord) {
      handleUpdatedRoleRecordStatusChange();
    }
    if (hasDeletedRoleRecord) {
      handleDeletedRoleRecordStatusChange();
    }

  }, [
    detailedRoleData.length,
    hasNewRoleRecordCreated,
    hasUpdatedRoleRecord,
    hasDeletedRoleRecord
  ]);

  useEffect(() => {
    const fetchEmployeeFunctions = async () => {
      if (detailedEmployeeFunctionData.length <= 0 || hasUpdatedEmployeeFunctionRecord || hasDeletedEmployeeFunctionRecord) {
        try {
          const foundEmployeeFunction = await useFindAllFunctions();
          if (foundEmployeeFunction) {
            await fetchRoleNames(foundEmployeeFunction, 'employeeFunction');
          } else {
            console.error('Invalid data format:', foundEmployeeFunction);
          }
        } catch (error) {
          console.error('Error fetching employee function:', error);
        }
      }

    };

    fetchEmployeeFunctions();
    if (hasNewEmployeeFunctionRecordCreated) {
      handleCreatedEmployeeFunctionRecordStatusChange();
    }
    if (hasUpdatedEmployeeFunctionRecord) {
      handleUpdatedEmployeeFunctionRecordStatusChange();
    }
    if (hasDeletedEmployeeFunctionRecord) {
      handleDeletedEmployeeFunctionRecordStatusChange();
    }

  }, [
    detailedEmployeeFunctionData.length,
    hasNewEmployeeFunctionRecordCreated,
    hasUpdatedEmployeeFunctionRecord,
    hasDeletedEmployeeFunctionRecord
  ]);

  return (
    <>
      <Card >
        <CardHeader className="bg-white border-0">
          <h3 className="mb-0">Cargos Registrados</h3>
        </CardHeader>

        <Table className="align-items-center table-flush" hover responsive>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Criado Em</th>
              <th className="text-left">Reporta Ao Cargo</th>
              <th className="text-left">Descrição</th>
              <th className="text-left">Estado</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {detailedRoleData && detailedRoleData.length > 0 ? (
              detailedRoleData.map((role) => (
                <tr className="table-" key={role.id}>
                  <td className="table-user">
                    <b>{role.roleName}</b>
                  </td>
                  <td>
                    <span className="text-muted">
                      {formatDate(role.createdAt)}
                    </span>
                  </td>
                  <td>
                    {
                      role.responsible === 'Não reporta' ? (
                        <span className="name mb-0 text-sm">
                          {role.responsible}
                        </span>
                      ) : (
                        <span className="name mb-0 text-sm font-weight-bold">
                          {role.responsible}
                        </span>
                      )
                    }
                  </td>
                  <td className="text-muted">
                    {
                      role.description ? (
                        <Nav navbar>
                          <NavItem>
                            <NavLink target="_blank">
                              <a
                                href="#"
                                className="text-underline"
                                id="showDescription"
                              >
                                <span
                                  onClick={() => handleShowRoleModal(role.roleName, role.description)}
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
                    {
                      role.status === 1
                        ? (
                          <Badge color="success" pill>
                            Ativo
                          </Badge>
                        ) : (
                          role.status === 0
                            ? (
                              <Badge color="danger" pill>
                                Inativo
                              </Badge>
                            ) : (
                              <Badge color="primary" pill>
                                N/A
                              </Badge>
                            )
                        )
                    }
                  </td>
                  <td className="table-actions text-left">
                    <a
                      className="table-action"
                      href="#pablo"
                      id="tooltipEditRole"
                      onClick={(e) => { e.preventDefault(); handleRoleUpdate(role.id); }}
                    >
                      <i className="fas fa-user-edit" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltipEditRole">
                      Editar
                    </UncontrolledTooltip>
                    <a
                      className="table-action table-action-delete"
                      href="#pablo"
                      id="tooltipDeleteRole"
                      onClick={(e) => { e.preventDefault(); showWarningAlert(role.id, role.roleName, 'role'); }}
                    >
                      <i className="fas fa-trash" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltipDeleteRole">
                      Deletar
                    </UncontrolledTooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum dado de roles encontrado.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      <Card>
        <CardHeader className="bg-secondary border-0">
          <h3 className="mb-0">Funções Registradas</h3>
        </CardHeader>

        <Table className="align-items-center table-flush" hover responsive>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Criada Em</th>
              <th className="text-left">Reporta Ao Cargo</th>
              <th className="text-left">Descrição</th>
              <th className="text-left">Estado</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {detailedEmployeeFunctionData && detailedEmployeeFunctionData.length > 0 ? (
              detailedEmployeeFunctionData.map((employeeFunction) => (
                <tr className="table-" key={employeeFunction.id}>
                  <td className="table-user">
                    <b>{employeeFunction.name}</b>
                  </td>
                  <td>
                    <span className="text-muted">
                      {formatDate(employeeFunction.createdAt)}
                    </span>
                  </td>
                  <td>
                    {
                      employeeFunction.responsible === 'Não reporta' ? (
                        <span className="name mb-0 text-sm">
                          {employeeFunction.responsible}
                        </span>
                      ) : (
                        <span className="name mb-0 text-sm font-weight-bold">
                          {employeeFunction.responsible}
                        </span>
                      )
                    }
                  </td>
                  <td className="text-muted ">
                    {
                      employeeFunction.description ? (
                        <Nav navbar>
                          <NavItem>
                            <NavLink target="_blank">
                              <a href="#" className="text-underline">
                                <span
                                  onClick={() => handleShowFunctionModal(employeeFunction.name, employeeFunction.description)}
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
                    {
                      employeeFunction.status == 1
                        ? (
                          <Badge color="success" pill>
                            Ativo
                          </Badge>
                        ) : (
                          employeeFunction.status == 0
                            ? (
                              <Badge color="danger" pill>
                                Inativo
                              </Badge>
                            ) : (
                              <Badge color="primary" pill>
                                N/A
                              </Badge>
                            )
                        )
                    }
                  </td>
                  <td className="table-actions text-left">
                    <a
                      className="table-action"
                      href="#pablo"
                      id="tooltipEditEmployeeFunction"
                      onClick={(e) => { e.preventDefault(); handleEmployeeFunctionUpdate(employeeFunction.id); }}
                    >
                      <i className="fas fa-user-edit" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltipEditEmployeeFunction">
                      Editar
                    </UncontrolledTooltip>
                    <a
                      className="table-action table-action-delete"
                      href="#pablo"
                      id="tooltipDeleteEmployeeFunction"
                      onClick={(e) => { e.preventDefault(); showWarningAlert(employeeFunction.id, employeeFunction.name, 'function'); }}
                    >
                      <i className="fas fa-trash" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltipDeleteEmployeeFunction">
                      Deletar
                    </UncontrolledTooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum dado de funções de funcionário encontrado.</td>
              </tr>
            )}
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

      <ModalRole
        handleOpenRoleUpdateModal={handleOpenRoleUpdateModal}
        modalOpen={openRoleUpdateModal}
      />

      <ModalEmployeeFunction
        handleOpenEmployeeFunctionUpdateModal={handleOpenEmployeeFunctionUpdateModal}
        modalOpen={openEmployeeFunctionUpdateModal}
      />
    </>
  );
}

export default RolesList;
