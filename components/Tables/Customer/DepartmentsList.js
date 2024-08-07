import React, { useState, useEffect, useContext } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  Form,
  Nav,
  NavItem,
  NavLink, Table,
  UncontrolledTooltip
} from "reactstrap";
import { useFindAllDepartments } from "../../../hooks/RecordsHooks/department/useFindAllDepartments";
import ShowDepartmentDescriptionsModal from "../../Modals/admin/show-department-descriptions";
import ModalDepartment from '../../Modals/admin/ModalDepartment';
import { DepartmentContext } from '../../../contexts/RecordsContext/DepartmentContext';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import { useDeleteDepartment } from '../../../hooks/RecordsHooks/department/useDeleteDepartment';
import { useFindDepartment } from '../../../hooks/RecordsHooks/department/useFindDepartment';

function DepartmentsList() {

  const {
    handleDepartmentIdToUpdate,
    hasUpdatedDepartmentRecord,
    handleUpdatedDepartmentRecordStatusChange,
    hasDeletedDepartmentRecord,
    handleDeletedDepartmentRecordStatusChange,
  } = useContext(DepartmentContext);

  const { warningAlert } = useSweetAlert();

  const [detailedDepartmentData, setDetailedDepartmentData] = useState([]);
  const [descriptionSelectedDepartment, setDescriptionSelectedDepartment] = useState("");
  const [nameSelectedDepartment, setNameSelectedDepartment] = useState("");

  const [openDepartmentDetailModal, setOpenDepartmentDetailModal] = React.useState(false);

  function handleOpenDepartmentDetailsModal() {
    setOpenDepartmentDetailModal(!openDepartmentDetailModal);
  }

  const [openDepartmentUpdateModal, setOpenDepartmentUpdateModal] = React.useState(false);

  function handleOpenDepartmentUpdateModal() {
    setOpenDepartmentUpdateModal(!openDepartmentUpdateModal);
  }

  function handleDepartmentUpdate(departmentId) {
    handleDepartmentIdToUpdate(departmentId);
    handleOpenDepartmentUpdateModal();
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function handleShowModal(name, description) {
    setDescriptionSelectedDepartment(description);
    setNameSelectedDepartment(name);
    handleShowDepartmentDescriptionsModal();
  }

  function handleShowDepartmentDescriptionsModal() {
    handleOpenDepartmentDetailsModal();
  }

  const handleDeleteDepartment = async (departmentId, departmentName) => {
    try {
      const deleteResponse = await useDeleteDepartment(departmentId);
      console.log(deleteResponse);
      if (deleteResponse !== null) {
        handleDeletedDepartmentRecordStatusChange();
      } else {
        console.error('Failed to delete department with ID:', departmentId, '. Response Status: ', deleteResponse.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };

  const showWarningAlert = (departmentId, departmentName) => {
    warningAlert(
      `${departmentId}`,
      "Atenção",
      "Deletar",
      `Você deseja realmente excluir ${departmentName}?`,
      "lg",
      () => handleDeleteDepartment(departmentId, departmentName)
    );
  };

  useEffect(() => {
    const fetchDepartmentNames = async (departments) => {
      const updatedDepartments = await Promise.all(
        departments.map(async (department) => {
          if (department.responsible) {
            try {
              const departmentData = await useFindDepartment(department.responsible);
              return { ...department, responsible: departmentData.departmentName };
            } catch (error) {
              console.error(`Error fetching department data for responsible ${department.id}:`, error);
              return { ...department, responsible: 'Não reporta' };
            }
          } else {
            console.warn(`No responsible value for department ${department.id}`);
            return { ...department, responsible: 'Não reporta' };
          }
        })
      );
      setDetailedDepartmentData(updatedDepartments);
    };

    const fetchDepartments = async () => {
      if (detailedDepartmentData.length <= 0 ||
        hasUpdatedDepartmentRecord ||
        hasDeletedDepartmentRecord
      ) {
        try {
          const foundDepartment = await useFindAllDepartments();
          if (foundDepartment) {
            await fetchDepartmentNames(foundDepartment);
          } else {
            console.error('Invalid data format:', foundDepartment);
          }
        } catch (error) {
          console.error('Error fetching department:', error);
        }
      }
    };

    fetchDepartments();
    if (hasUpdatedDepartmentRecord) {
      handleUpdatedDepartmentRecordStatusChange();
    }
    if (hasDeletedDepartmentRecord) {
      handleDeletedDepartmentRecordStatusChange();
    }
  }, [detailedDepartmentData.length,
    hasUpdatedDepartmentRecord,
    hasDeletedDepartmentRecord,
  ]);

  return (
    <Form>
      <Card>
        <CardHeader className="bg-transparent border-0">
          <h3 className="mb-0">Departamentos Registrados</h3>
        </CardHeader>

        <Table className="align-items-center table-flush" hover responsive>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Criado Em</th>
              <th className="text-left">Reporta Ao</th>
              <th className="text-left">Descrição</th>
              <th className="text-left">Estado</th>
              <th className="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {detailedDepartmentData && detailedDepartmentData.length > 0 ? (
              detailedDepartmentData.map((department) => (
                <tr className="table-" key={department.id}>
                  <td className="table-user">
                    <b>{department.departmentName}</b>
                  </td>
                  <td>
                    <span className="text-muted">
                      {formatDate(department.createdAt)}
                    </span>
                  </td>
                  <td>
                    {
                      department.responsible === 'Não reporta' ? (
                        <span className="name mb-0 text-sm">
                          {department.responsible}
                        </span>
                      ) : (
                        <span className="name mb-0 text-sm font-weight-bold">
                          {department.responsible}
                        </span>
                      )
                    }
                  </td>
                  <td className="text-muted">
                    {
                      department.description ? (
                        <Nav navbar>
                          <NavItem>
                            <NavLink target="_blank">
                              <a href="#" className="text-underline">
                                <span
                                  onClick={() => handleShowModal(department.departmentName, department.description)}
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
                      department.status === true
                        ? (
                          <Badge color="success" pill>
                            Ativo
                          </Badge>
                        ) : (
                          department.status === false
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
                      id="tooltipEditDepartment"
                      onClick={(e) => { e.preventDefault(); handleDepartmentUpdate(department.id); }}
                    >
                      <i className="fas fa-user-edit" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltipEditDepartment">
                      Editar
                    </UncontrolledTooltip>
                    <a
                      className="table-action table-action-delete"
                      href="#pablo"
                      id="tooltipDeleteDepartment"
                      onClick={(e) => { e.preventDefault(); showWarningAlert(department.id, department.departmentName); }}
                    >
                      <i className="fas fa-trash" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltipDeleteDepartment">
                      Deletar
                    </UncontrolledTooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum dado encontrado.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      <ShowDepartmentDescriptionsModal
        handleShowDepartmentDescriptionsModal={handleShowDepartmentDescriptionsModal}
        modalOpen={openDepartmentDetailModal}
        departmentDescription={descriptionSelectedDepartment}
        departmentName={nameSelectedDepartment}
      />

      <ModalDepartment
        handleOpenDepartmentUpdateModal={handleOpenDepartmentUpdateModal}
        modalOpen={openDepartmentUpdateModal}
      />

    </Form>
  );
}

export default DepartmentsList;
