import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Form, Table } from "reactstrap";
import useDepartmentSelect from "../../../hooks/department/useDepartmentSelect";
import useDepartmentForm from "../../../hooks/department/useDepartmentForm";

function DepartmentsList() {

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    if (selectedDepartment) {
      console.log("Selected Department updated:", selectedDepartment);
      // Você pode adicionar lógica adicional aqui, se necessário
    }
  }, [selectedDepartment]);


  /** back a list of departments*/
  const departments = useDepartmentSelect();


  const { formData, handleDepartmentChange, onSubmit } = useDepartmentForm();

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
            <tr className="table-">
              <td className="table-user">
                <b>Financeiro</b>
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
              <td>
                <a
                  className="font-weight-bold"
                  href="#pablo"
                // onClick={(e) => e.preventDefault()}
                >
                  Ver
                </a>
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
                <b>Comercial</b>
              </td>
              <td>
                <span className="text-muted">
                  08/09/{new Date().getFullYear()}
                </span>
              </td>
              <td>
                <span className="name mb-0 text-sm">
                  Financeiro
                </span>
              </td>
              <td>
                <a
                  className="font-weight-bold"
                  href="#pablo"
                //onClick={(e) => e.preventDefault()}
                >
                  Ver
                </a>
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
                <b>Gestão de Pessoas</b>
              </td>
              <td>
                <span className="text-muted">
                  30/08/{new Date().getFullYear()}
                </span>
              </td>
              <td>
                <span className="name mb-0 text-sm">

                </span>
              </td>
              <td>
                <a
                  className="font-weight-bold"
                  href="#pablo"
                //onClick={(e) => e.preventDefault()}
                >
                  Ver
                </a>
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
    </Form>
  );
}

export default DepartmentsList;
