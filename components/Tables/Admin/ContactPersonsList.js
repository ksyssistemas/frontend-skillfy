import React, { useContext, useEffect, useState } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import { ContactPersonContext } from '../../../contexts/RecordsContext/ContactPersonContext';
import { useFindAllContactPerson } from '../../../hooks/RecordsHooks/contactPerson/useFindAllContactPerson';
import ModalContactPerson from '../../Modals/admin/ModalContactPerson';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import { useDeleteContactPerson } from '../../../hooks/RecordsHooks/contactPerson/useDeleteContactPerson';
import { useFindClientCompany } from '../../../hooks/RecordsHooks/customer/useFindClientCompany';

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
  const [selectedIdToShowContactPersonDetails, setSelectedIdToShowContactPersonDetails] = useState(null);
  function handleCleaningSelectedIdToShowContactPersonDetails() {
    setSelectedIdToShowContactPersonDetails(null)
  }

  const [companyNameToModalDetails, setCompanyNameToModalDetails] = useState(null);
  function handleCleaningCompanyNameToModalDetails() {
    setCompanyNameToModalDetails(null)
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  function handleOpenContactModal() {
    setModalOpen(!modalOpen)
  }

  function handleShowContactPersonDetailsModal(contactId, contactName, contactLastName) {
    const name = `${contactName} ${contactLastName}`
    setSelectedIdToShowContactPersonDetails(contactId);
    setContactPersonName(name);
    handleOpenContactModal();
  }

  const [contactPersonName, setContactPersonName] = useState('');

  function handleCleaningContactPersonNameStatus() {
    setContactPersonName('');
  }

  function handleContactPersonUpdate(contactId, contactName, contactLastName) {
    const name = `${contactName} ${contactLastName}`
    setContactPersonName(name);
    handleContactPersonIdToUpdate(contactId);
    handleOpenContactModal();
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

  const commonProps = {
    handleShowContactPersonDetailsModal,
    selectedIdToShowContactPersonDetails,
    handleCleaningSelectedIdToShowContactPersonDetails,
    handleOpenContactModal,
    modalOpen,
    contactPersonName,
    handleCleaningContactPersonNameStatus,
    companyNameToModalDetails,
    handleCleaningCompanyNameToModalDetails
  };

  const shouldShowModal =
    (selectedIdToShowContactPersonDetails && selectedIdToShowContactPersonDetails !== 0) ||
    (contactPersonIdToUpdate && contactPersonIdToUpdate !== 0);

  useEffect(() => {
    const fetchCompanyNames = async (contactPersons) => {
      const updatedContactPersons = await Promise.all(
        contactPersons.map(async (contactPerson) => {
          try {
            const companyData = await useFindClientCompany(contactPerson.customerId);
            setCompanyNameToModalDetails(companyData.companyName);
            return { ...contactPerson, companyName: companyData.companyName };
          } catch (error) {
            console.error(`Error fetching company data for customerId ${contactPerson.customerId}:`, error);
            return { ...contactPerson, companyName: 'Unknown' };
          }
        })
      );
      setUserContactAccountData(updatedContactPersons);
    };


    const fetchData = async () => {
      if (!userContactAccountData || userContactAccountData.length === 0 || hasUpdatedContactRecord || hasDeletedContactRecord) {
        try {
          const foundContactPersons = await useFindAllContactPerson();
          if (foundContactPersons && Array.isArray(foundContactPersons)) {
            await fetchCompanyNames(foundContactPersons);
          } else {
            console.error('Invalid data format:', foundContactPersons);
          }
        } catch (error) {
          console.error('Error fetching contact persons:', error);
        }
      }
    };

    fetchData();
    if (hasUpdatedContactRecord) {
      console.log("Update: ", hasUpdatedContactRecord);
      handleUpdatedContactRecordStatusChange();
    }
    if (hasDeletedContactRecord) {
      handleDeletedContactRecordStatusChange();
    }

  }, [userContactAccountData, hasUpdatedContactRecord, hasDeletedContactRecord]);

  return (
    <Card>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col xs="6">
            <h3 className="mb-0">Dados de Contato</h3>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th className="text-left">Empresa</th>
            <th className="text-left">Nome</th>
            <th className="text-left">Ocupação</th>
            <th className="text-left">Email</th>
            <th className="text-left">Celular</th>
            <th className="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {userContactAccountData.length > 0 ? (
            userContactAccountData.map((contactPerson) => (
              <tr key={contactPerson.id}>
                <td className="table-user">
                  <b className="text-left">{contactPerson.companyName}</b>
                </td>
                <td className="table-user">
                  <b className="text-left">{contactPerson.name}  {contactPerson.lastname}</b>
                </td>
                <td>
                  <span className="text-muted">{contactPerson.occupation}</span>
                </td>
                <td className="text-left">
                  <span className="text-muted">{contactPerson.email}</span>
                </td>
                <td className="text-left">
                  <span className="text-muted">{contactPerson.phone}</span>
                </td>
                <td className="text-left" >
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      color=""
                      role="button"
                      size="sm"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); handleShowContactPersonDetailsModal(contactPerson.id, contactPerson.name, contactPerson.lastname) }}
                      >
                        Detalhes
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); handleContactPersonUpdate(contactPerson.id, contactPerson.name, contactPerson.lastname); }}
                      >
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); showWarningAlert(contactPerson.id, contactPerson.name, contactPerson.lastname); }}
                      >
                        Deletar
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
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

      {shouldShowModal ? (
        <ModalContactPerson {...commonProps} />
      ) : null}

    </Card>
  );
};

export default ContactPersonsList;