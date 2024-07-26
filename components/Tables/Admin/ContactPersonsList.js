import React, { useContext, useEffect, useState } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  Col,
  Row,
  Table,
  UncontrolledTooltip
} from 'reactstrap';
import { ContactPersonContext } from '../../../contexts/RecordsContext/ContactPersonContext';
import { useFindAllContactPerson } from '../../../hooks/RecordsHooks/contactPerson/useFindAllContactPerson';
import ModalContactPerson from '../../Modals/admin/ModalContactPerson';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import { useDeleteContactPerson } from '../../../hooks/RecordsHooks/contactPerson/useDeleteContactPerson';

function ContactPersonsList() {

  const {
    contactPersonIdToUpdate,
    handleContactIdStatusCleanupToUpdate,
    handleContactPersonIdToUpdate,
    hasNewContactRecordCreated,
    handleCreatedContactRecordStatusChange,
    hasUpdatedContactRecord,
    handleUpdatedContactRecordStatusChange,
    hasDeletedContactRecord,
    handleDeletedContactRecordStatusChange,
  } = useContext(ContactPersonContext);

  const { warningAlert } = useSweetAlert();

  const [userContactAccountData, setUserContactAccountData] = useState([]);

  function handleContactPersonUpdate(contactId) {
    handleContactPersonIdToUpdate(contactId);
    handleOpenContactUpdateModal();
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  function handleOpenContactUpdateModal() {
    setModalOpen(!modalOpen)
  }

  const handleDeleteAdmin = async (contactId, contactName, contactLastName) => {
    if (contactId) {
      try {
        const deleteResponse = await useDeleteContactPerson(contactId);
        console.log('DeleteResponse: ', deleteResponse);
        if (deleteResponse !== null) {
          handleDeletedContactRecordStatusChange();
        } else {
          console.error('Failed to delete contact person with ID:', contactId, '. Response Status: ', deleteResponse.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const showWarningAlert = (contactId, contactName, contactLastName) => {
    warningAlert(
      `${contactId}`,
      "Atenção",
      "Deletar",
      `Você deseja realmente excluir ${contactName} ${contactLastName}?`,
      "lg",
      () => handleDeleteAdmin(contactId, contactName, contactLastName)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userContactAccountData.length === 0) {
        const foundContactPersonistrators = await useFindAllContactPerson();
        setUserContactAccountData(foundContactPersonistrators);
      }
    };

    fetchData();
  }, [userContactAccountData]);

  return (
    <Card>
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
            <th className="text-left">Empresa</th>
            <th className="text-left">Nome</th>
            <th className="text-left">Email</th>
            <th className="text-left">Celular</th>
            <th className="text-left">CPF</th>
            <th className="text-left">Estado</th>
            <th className="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {userContactAccountData.length > 0 ? (
            userContactAccountData.map((contactPerson) => (
              <tr key={contactPerson.id}>
                <td className="table-user">
                  <b className="text-left">Nome da emrpesa</b>
                </td>
                <td className="table-user">
                  <b className="text-left">{contactPerson.name}  {contactPerson.lastname}</b>
                </td>
                <td className="text-left">
                  <span className="text-muted">{contactPerson.email}</span>
                </td>
                <td className="text-left">
                  <span className="text-muted">{contactPerson.phone}</span>
                </td>
                <td className="text-left">
                  <span className="text-muted">
                    {contactPerson.cpf}
                  </span>
                </td>
                <td>
                  {
                    contactPerson.status === true
                      ? (
                        <Badge color="success" pill>
                          Ativo
                        </Badge>
                      ) : (
                        contactPerson.status === false
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
                    id="tooltipEditcontactPerson"
                    onClick={(e) => { e.preventDefault(); handleContactPersonUpdate(contactPerson.id); }}
                  >
                    <i className="fas fa-user-edit" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltipEditcontactPerson">
                    Editar
                  </UncontrolledTooltip>
                  <a
                    className="table-action table-action-delete"
                    href="#pablo"
                    id={`delete${contactPerson.id}`}
                    onClick={(e) => { e.preventDefault(); showWarningAlert(contactPerson.id, contactPerson.name, contactPerson.lastname); }}
                  >
                    <i className="fas fa-trash" />
                  </a>
                  <UncontrolledTooltip delay={0} target={`delete${contactPerson.id}`}>
                    Deletar
                  </UncontrolledTooltip>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Nenhum contato encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ModalContactPerson
        handleOpenContactUpdateModal={handleOpenContactUpdateModal}
        modalOpen={modalOpen}
      />

    </Card>
  );
};

export default ContactPersonsList;