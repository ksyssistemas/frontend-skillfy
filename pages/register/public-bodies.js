import dynamic from "next/dynamic";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
import AdminHeader from "../../components/Headers/AdminHeader";
import useDepartmentSelect from "../../hooks/department/useDepartmentSelect";
import Admin from "../../layouts/Admin";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
function DepartmentsRegister() {
  /** back a list of departments*/
  const departments = useDepartmentSelect();

  return (
    <Form>
      <AdminHeader name="Órgãos Públicos" parentName="Cadastros" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Cadastrar Órgãos</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
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
                    value=""
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example3cols2Input"
                  >
                    Reporta ao Órgão
                  </label>
                  <Select2
                    className="form-control"
                    defaultValue="0"
                    options={{ placeholder: "Selecione um departamento:" }}
                    data={[
                      ...departments.map((department) => ({
                        id: department.ID_Department,
                        text: department.DepartamentName,
                      })),
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
              <Col md="8">
                <Button color="info" size="lg" type="button">
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
                  <span className="name mb-0 text-sm"></span>
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
                  <span className="name mb-0 text-sm">Financeiro</span>
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
                  <span className="name mb-0 text-sm"></span>
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
