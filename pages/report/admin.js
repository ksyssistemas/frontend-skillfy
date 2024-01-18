import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, Container, Row, Table, UncontrolledTooltip, Col } from "reactstrap";
import Register from "../../layouts/Register";
import SimpleHeader from "../../components/Headers/SimpleHeader";

function ReportAdmin() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await fetch('http://localhost:4008/administrator/findAll');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }
    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`http://localhost:4008/administrator/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete admin.');
      }
      setAdmins(admins.filter(admin => admin.id !== id));
    } catch (error) {
      console.error('There was a problem deleting the admin:', error);
    }
  };

  const fakeAdmins = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210' },
  ];
  

  return (
    <>
      <SimpleHeader name="Admin" parentName="Ksys Sistemas" />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader className="border-0">
            <Row>
              <Col xs="6">
                <h3 className="mb-0">Conta Administrador</h3>
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
                  <span className="btn-inner--text">Exportar</span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip969372949">
                  Editar
                </UncontrolledTooltip>
              </Col>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
  <thead className="thead-light">
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Celular</th>
      <th>Criado em</th>
      <th>Previlégios</th>
      <th />
    </tr>
  </thead>
  <tbody className="text-center">
    {fakeAdmins.map((admin) => (
      <tr key={admin.id}>
        <td className="table-user">
          <img
            alt="..."
            className="avatar rounded-circle mr-3"
            src={require(`../../assets/img/theme/team-${admin.id}.jpg`)}
          />
          <b>{admin.name}</b>
        </td>
        <td>
          <span className="text-muted">{admin.email}</span>
        </td>
        <td>
          <span className="text-muted">{admin.phone}</span>
        </td>
        <td>
          <span className="text-muted">Data de criação fictícia</span>
        </td>
        <td>
          <a
            className="font-weight-bold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {admin.privileges}
          </a>
        </td>
        <td className="table-actions">
          <a
            className="table-action table-action-delete"
            href="#pablo"
            id={`delete${admin.id}`}
            onClick={() => deleteAdmin(admin.id)}
          >
            <i className="fas fa-trash" />
          </a>
          <UncontrolledTooltip delay={0} target={`delete${admin.id}`}>
            Excluir
          </UncontrolledTooltip>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
        </Card>
      </Container>
    </>
  );
}

ReportAdmin.layout = Register;

export default ReportAdmin;
