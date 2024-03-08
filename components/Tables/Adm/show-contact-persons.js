import React, { useState } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  Col,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';

import ModalAdm from "../../Modals/admin/ModalAdm"
import useFetchAdmins from "../../../hooks/useFindAllAdmin"
import { useDeleteAdmin } from "../../../hooks/useDeleteAdmin"


const ContactPersonsList = () => {

  const admins = useFetchAdmins();
  const deleteAdmin = useDeleteAdmin();

  console.log(admins)

  {/** Modal  Adm*/ }
  const [modalAdmOpen, setModalAdmOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
  });


  const toggleModalAdm = () => {
    setModalAdmOpen(!modalAdmOpen);
  };

  //const handleSave = () => {
  //  toggleModalAdm();
  //};

  //const handleInputChange = (fieldName, value) => {
  //  setFormData({ ...formData, [fieldName]: value });
  //};

  const handleDeleteAdmin = async (id) => {
    const deletedId = await deleteAdmin(id);
    if (deletedId !== null) {
      window.location.reload();
    } else {
      console.error('Failed to delete admin with ID:', id);
    }
  };




  return (
    <Card>

      {/** CardHeader with Button register and export */}
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col xs="6">
            <h3 className="mb-0">Lista de Pessoas de Contato</h3>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th className="text-left">Nome</th>
            <th className="text-left">Telefone</th>
            <th className="text-left">Email</th>
            <th className="text-left">Cliente</th>
            <th className="text-left">Ocupação</th>
            <th className="text-center" />
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="table-user">
                <b className="text-left">John Michael</b>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.phone}</span>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.email}</span>
              </td>
              <td>
                <a
                  className="font-weight-bold"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Argon Dashboard PRO
                </a>
              </td>
              <td className="text-left">
                  Financeiro
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
      <ModalAdm
        isOpen={modalAdmOpen}
        toggle={toggleModalAdm}
        //handleSave={handleSave}
        formData={formData}
      //handleInputChange={handleInputChange}
      />



    </Card>
  );
};

export default ContactPersonsList;