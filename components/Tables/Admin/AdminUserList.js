import React, { useContext, useEffect, useState } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  Col,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import { useFindAllAdmin } from "../../../hooks/RecordsHooks/admin/useFindAllAdmin"
import { useDeleteAdmin } from "../../../hooks/RecordsHooks/admin/useDeleteAdmin"
import { AdminContext } from '../../../contexts/RecordsContext/AdminContext';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import ModalAdmin from '../../Modals/admin/ModalAdmin';

function AdminList({ handleShowAdminUserRegister }) {

  const {
    adminIdToUpdate,
    handleAdminIdStatusCleanupToUpdate,
    handleAdminIdToUpdate,
    hasUpdatedAdminRecord,
    handleUpdatedAdminRecordStatusChange,
    hasDeletedAdminRecord,
    handleDeletedAdminRecordStatusChange,
  } = useContext(AdminContext);

  const { warningAlert } = useSweetAlert();

  const [userAdministratorAccountData, setUserAdministratorAccountData] = useState([]);

  function handleAdminUpdate(adminId) {
    handleAdminIdToUpdate(adminId);
    handleOpenAdminUpdateModal();
  }

  const [modalAdmOpen, setModalAdmOpen] = React.useState(false);

  const handleOpenAdminUpdateModal = () => {
    setModalAdmOpen(!modalAdmOpen);
  };

  const handleDeleteAdmin = async (adminId, adminName, adminLastName) => {
    if (adminId) {
      try {
        const deleteResponse = await useDeleteAdmin(adminId);
        console.log('DeleteResponse: ', deleteResponse);
        if (deleteResponse !== null) {
          handleDeletedAdminRecordStatusChange();
        } else {
          console.error('Failed to delete admin with ID:', adminId, '. Response Status: ', deleteResponse.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const showWarningAlert = (adminId, adminName, adminLastName) => {
    warningAlert(
      `${adminId}`,
      "Atenção",
      "Deletar",
      `Você deseja realmente excluir ${adminName} ${adminLastName}?`,
      "lg",
      () => handleDeleteAdmin(adminId, adminName, adminLastName)
    );
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      if (userAdministratorAccountData.length <= 0 || hasUpdatedAdminRecord || hasDeletedAdminRecord) {
        try {
          const foundAdministrators = await useFindAllAdmin();
          setUserAdministratorAccountData(foundAdministrators);
        } catch (error) {
          console.error('Error fetching admins:', error);
        }
      }
    };

    fetchAdmins();
    if (hasUpdatedAdminRecord) {
      handleUpdatedAdminRecordStatusChange();
    }
    if (hasDeletedAdminRecord) {
      handleAdminIdStatusCleanupToUpdate();
      handleDeletedAdminRecordStatusChange();
    }
  }, [
    userAdministratorAccountData,
    hasUpdatedAdminRecord,
    hasDeletedAdminRecord
  ])

  return (
    <Card>
      {/** CardHeader with Button register and export */}
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col xs="6">
            <h3 className="mb-0">Lista de Administradores</h3>
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
            <th className="text-left">Previlégios</th>
            <th className="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {userAdministratorAccountData.map((admin) => (
            <tr key={admin.id}>
              <td className="table-user">
                {/* <img
                  alt="..."
                  className="avatar rounded-circle mr-3"
                  //src={require(`../../../assets/img/theme/team-${admin.id}.jpg`)}
                  src={require(`../../../assets/img/theme/team-1.jpg`)}
                /> */}
                <b className="text-left">{admin.name} {admin.lastname}</b>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.email}</span>
              </td>
              <td className="text-left">
                <span className="text-muted">{admin.phone}</span>
              </td>
              <td>
                {
                  admin.status === true
                    ? (
                      <Badge color="success" pill>
                        Ativo
                      </Badge>
                    ) : (
                      admin.status === false
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
              <td className="text-left">
                <a
                  className="font-weight-bold"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {admin.privileges === "1" ? "Administrador" : "Desenvolvimento"}
                </a>
              </td>
              <td className="table-actions text-left">
                <a
                  className="table-action"
                  href="#pablo"
                  id="tooltipEditAdmin"
                  onClick={(e) => { e.preventDefault(); handleAdminUpdate(admin.id); }}
                >
                  <i className="fas fa-user-edit" />
                </a>
                <UncontrolledTooltip delay={0} target="tooltipEditAdmin">
                  Editar
                </UncontrolledTooltip>
                <a
                  className="table-action table-action-delete"
                  href="#pablo"
                  id="tooltipDeleteAdmin"
                  onClick={(e) => { e.preventDefault(); showWarningAlert(admin.id, admin.name, admin.lastname); }}
                >
                  <i className="fas fa-trash" />
                </a>
                <UncontrolledTooltip delay={0} target="tooltipDeleteAdmin">
                  Deletar
                </UncontrolledTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalAdmin
        handleOpenAdminUpdateModal={handleOpenAdminUpdateModal}
        modalOpen={modalAdmOpen}
      />



    </Card>
  );
};

export default AdminList;