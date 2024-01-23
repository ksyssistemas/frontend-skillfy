import React from 'react';
import {
  Card,
  CardHeader,
  Col,
  Row,
  Button,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';

const handleRegisterClick = (e) => {
  e.preventDefault();
  // Lógica para lidar com o clique no botão de cadastro
};

const AdminListCard = ({ admins, deleteAdmin }) => {
  return (
    <Card>

      {/** CardHeader with Button register and export */}
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col xs="6">
            <h3 className="mb-0">Administradores</h3>
          </Col>
          <Col xs="6" className="text-right">
            <div className="d-flex justify-content-end">
              <Button
                className="btn-neutral btn-round btn-icon"
                color="default"
                href="#pablo"
                id="tooltipCadastro"
                onClick={handleRegisterClick}
                size="sm"
              >
                <span className="btn-inner--icon mr-1">
                  <i className="fas fa-user-plus" />
                </span>
                <span className="btn-inner--text">Cadastrar</span>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltipCadastro">
                Cadastrar Adm
              </UncontrolledTooltip>

              <Button
                className="btn-neutral btn-round btn-icon"
                color="default"
                href="#pablo"
                id="tooltipExport"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                <span className="btn-inner--icon mr-1">
                  <i className="fas fa-user-edit" />
                </span>
                <span className="btn-inner--text">Exportar</span>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltipExport">
                Exportar Adm
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th className="text-left">Nome</th>
            <th className="text-left">Email</th>
            <th className="text-left">Celular</th>
            <th className="text-left">Criado em</th>
            <th className="text-left">Previlégios</th>
            <th className="text-center" />
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="table-user">
                <img
                  alt="..."
                  className="avatar rounded-circle mr-3"
                  src={require(`../../assets/img/theme/team-${admin.id}.jpg`)}
                />
                <b>{admin.name}</b>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.email}</span>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.phone}</span>
              </td>
              <td className="text-left">
                <span className="text-muted">Data de criação fictícia</span>
              </td>
              <td className="text-left">
                <a
                  className="font-weight-bold"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {admin.privileges}
                </a>
              </td>
              <td className="table-actions text-center">
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
  );
};

export default AdminListCard;
