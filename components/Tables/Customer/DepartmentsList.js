import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Form,
  Nav,
  NavItem,
  NavLink, Table
} from "reactstrap";
import { useFindAllDepartments } from "../../../hooks/RecordsHooks/department/useFindAllDepartments";
import ShowDepartmentDescriptionsModal from "../../Modals/admin/show-department-descriptions";

function DepartmentsList() {

  const [detailedDepartmentData, setDetailedDepartmentData] = useState([]);
  const [descriptionSelectedDepartment, setDescriptionSelectedDepartment] = useState("");
  const [nameSelectedDepartment, setNameSelectedDepartment] = useState("");

  //const deleteDepartment = useDeleteDepartment();

  const [modalDepartmentOpen, setModalDepartmentOpen] = React.useState(false);

  const toggleModalAdm = () => {
    setModalDepartmentOpen(!modalDepartmentOpen);
  };

  const handleDeleteDepartment = async (id) => {
    const deletedId = await deleteDepartment(id);
    if (deletedId !== null) {
      window.location.reload();
    } else {
      console.error('Failed to delete admin with ID:', id);
    }
  };

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
    setModalDepartmentOpen(!modalDepartmentOpen);
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      if (detailedDepartmentData && detailedDepartmentData.length === 0) {
        const foundDepartment = await useFindAllDepartments();
        setDetailedDepartmentData(foundDepartment);
      }
    };
    fetchDepartments();
  }, [detailedDepartmentData]);

  return (
    <Form>
      <Card>
        <CardHeader className="bg-transparent border-0">
          <h3 className="mb-0">Departamentos Registrados</h3>
        </CardHeader>

        <Table className="align-items-center table-flush" hover responsive>
          <thead className="thead-light">
            <tr>
              <th>Nome</th>
              <th>Criado Em</th>
              <th>Reporta Ao</th>
              <th>Descrição</th>
              <th>Ativo</th>
            </tr>
          </thead>
          <tbody>
            {detailedDepartmentData && detailedDepartmentData.length > 0 ? (
              detailedDepartmentData.map((department) => (
                <tr className="table-" key={department.ID_Department}>
                  <td className="table-user">
                    <b>{department.DepartmentName}</b>
                  </td>
                  <td>
                    <span className="text-muted">
                      {formatDate(department.CreatedAt)}
                    </span>
                  </td>
                  <td>
                    <span className="name mb-0 text-sm">
                      {department.Responsible}
                    </span>
                  </td>
                  <td className="text-muted">
                    {
                      department.Description ? (
                        <Nav navbar>
                          <NavItem>
                            <NavLink target="_blank">
                              <a href="#" className="text-underline">
                                <span
                                  onClick={() => handleShowModal(department.DepartmentName, department.Description)}
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
        modalOpen={modalDepartmentOpen}
        departmentDescription={descriptionSelectedDepartment}
        departmentName={nameSelectedDepartment}
      />

    </Form>
  );
}

export default DepartmentsList;
