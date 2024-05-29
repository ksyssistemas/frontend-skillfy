import React, { useEffect, useState } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  Col,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';

import { useFindAllAdmin } from "../../../hooks/admin/useFindAllAdmin"
import { useDeleteAdmin } from "../../../hooks/admin/useDeleteAdmin"

function ContactPersonsList() {

  const [userAdministratorAccountData, setUserAdministratorAccountData] = useState([]);

  const deleteAdmin = useDeleteAdmin();

  const [modalAdmOpen, setModalAdmOpen] = React.useState(false);

  const toggleModalAdm = () => {
    setModalAdmOpen(!modalAdmOpen);
  };

  const handleDeleteAdmin = async (id) => {
    const deletedId = await deleteAdmin(id);
    if (deletedId !== null) {
      window.location.reload();
    } else {
      console.error('Failed to delete admin with ID:', id);
    }
  };

  useEffect(async () => {
    if (userAdministratorAccountData.length == 0) {
      const foundAdministrators = await useFindAllAdmin();
      setUserAdministratorAccountData(foundAdministrators);
    }
  }, [userAdministratorAccountData])

  return (
    <Card>
      {/** CardHeader with Button register and export */}
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col xs="6">
            <h3 className="mb-0">Lista de Contatos</h3>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th className="text-left">Nome</th>
            <th className="text-left">Email</th>
            <th className="text-left">Celular</th>
            <th className="text-left">Estado</th>
            <th className="text-center">Previlégios</th>
            <th className="text-center" />
          </tr>
        </thead>
        <tbody>
          {userAdministratorAccountData.map((admin) => (
            <tr key={admin.id}>
              <td className="table-user">
                <img
                  alt="..."
                  className="avatar rounded-circle mr-3"
                  //src={require(`../../../assets/img/theme/team-${admin.id}.jpg`)}
                  src={require(`../../../assets/img/theme/team-1.jpg`)}
                />
                <b className="text-left">{admin.name}</b>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.email}</span>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.phone}</span>
              </td>
              <td>
                <Badge color="success" pill>
                  Active
                </Badge>
              </td>
              <td className="text-center">
                <a
                  className="font-weight-bold"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {admin.privileges}
                </a>
              </td>
              <td className="text-center table-actions">
                <a
                  className="table-action table-action-delete"
                  href="#pablo"
                  id={`delete${admin.id}`}
                  onClick={() => handleDeleteAdmin(admin.id)}
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
      {/* <ModalAdm
        isOpen={modalAdmOpen}
        toggle={toggleModalAdm}
        //handleSave={handleSave}
        formData={userAdministratorAccountData}
      //handleInputChange={handleInputChange}
      /> */}



    </Card>
  );
};

export default ContactPersonsList;