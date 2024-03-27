import React, { useState, useEffect } from 'react';

import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Table } from "reactstrap";
import Admin from "../../layouts/Admin";
import AdminHeader from "../../components/Headers/AdminHeader"

import useDepartmentSelect from "../../hooks/department/useDepartmentSelect";
import useDepartmentForm from "../../hooks/department/useDepartmentForm";

function DepartmentsRegister() {

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
      <AdminHeader name="Departamentos" parentName="Cadastros" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Cadastrar Departamentos</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="DepartmentNameInput"
                  >
                    Nome
                  </label>
                  <Input
                    id="DepartmentNameInput"
                    placeholder="Ex.: Comercial"
                    value={formData.DepartmentName}
                    onChange={(e) => handleDepartmentChange('DepartmentName', e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="reportToDepartmentInput">
                    Reporta ao Departamento
                  </label>
                  <Select2
                    id="reportToDepartmentInput"
                    className="form-control"
                    defaultValue="0"
                    options={{ placeholder: "Selecione um departamento:" }}
                    data={[
                      ...departments.map(department => ({ id: department.ID_Department, text: department.DepartmentName }))
                    ]}
                    onChange={(value, text, e) => {
                      const selectedDepartment = departments.find(department => department.ID_Department === value);
                      setSelectedDepartment(selectedDepartment);
                    }}
                  />
                </FormGroup>

              </Col>
              <Col md="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="DescriptionTextarea"
                  >
                    Descrição
                  </label>
                  <Input
                    id="DescriptionTextarea"
                    rows="3"
                    type="textarea"
                    value={formData.description}
                    onChange={(e) => handleDepartmentChange('description', e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="8">
                <Button color="info" size="lg" type="button" onClick={() => onSubmit(selectedDepartment)}>
                  Salvar
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>


        <Card className="bg-transparent">
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


      </Container>
    </Form>
  );
}

DepartmentsRegister.layout = Admin;

export default DepartmentsRegister;
