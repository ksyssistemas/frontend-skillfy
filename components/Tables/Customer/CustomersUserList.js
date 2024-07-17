import React, { useState, useEffect, useContext } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import { useFindAllClientCompany } from "../../../hooks/RecordsHooks/customer/useFindAllClientCompany";
import { useFindClientCompany } from "../../../hooks/RecordsHooks/customer/useFindClientCompany";
import { useFindClientCompanyAddress } from "../../../hooks/RecordsHooks/customer/useFindClientCompanyAddress";
import { useDeleteCustomerAccount } from "../../../hooks/RecordsHooks/customer/useDeleteCustomerAccount";

import ShowCustomerDetailsModal from "../../Modals/admin/show-customer-details";
import ModalEnterprise from "../../Modals/admin/ModalEnterprise"
import fakeCompanies from '../../../mocks/mockEnterprises'

import useCNPJ from "../../../hooks/RecordsHooks/useCNPJ"
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';

function CustomersUserList() {

  const {
    customerIdToUpdate,
    handleCustomerIdToUpdate,
    hasUpdatedCustomerRecord,
    handleUpdatedCustomerRecordStatusChange,
    hasDeletedCustomerRecord,
    handleDeletedCustomerRecordStatusChange,
  } = useContext(CustomerContext);

  const { warningAlert } = useSweetAlert();

  const [userCustomerAccountData, setUserCustomerAccountData] = useState([]);
  const [selectedIdToShowCompanyDetails, setSelectedIdToShowCompanyDetails] = useState(null);
  function handleCleaningSelectedIdToShowCompanyDetails() {
    setSelectedIdToShowCompanyDetails(null)
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  function handleOpenCustomerModal() {
    setModalOpen(!modalOpen);
  }

  function handleShowCustomerDetailsModal(companyId, customerName) {
    setSelectedIdToShowCompanyDetails(companyId);
    setCompanyName(customerName);
    handleOpenCustomerModal();
  }

  const [companyName, setCompanyName] = useState('');

  function handleCleaningCompanyNameStatus() {
    setCompanyName('');
  }

  function handleOpenCustomerUpdateModal(customerId, customerName) {
    handleCustomerIdToUpdate(customerId);
    setCompanyName(customerName);
    handleOpenCustomerModal();
  }

  const formatCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, "");
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const handleDeleteClientCompany = async (companyId, companyNameToDelete) => {
    try {
      const deleteResponse = await useDeleteCustomerAccount(companyId);

      if (deleteResponse !== null) {
        console.log('Data sent successfully!', deleteResponse);
        handleDeletedCustomerRecordStatusChange();
      } else {
        console.error('Failed to delete cycle with ID:', companyId, '. Response Status: ', deleteResponse.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };

  const showWarningAlert = (companyId, companyNameToDelete) => {
    warningAlert(
      "Atenção",
      "Deletar",
      `Você deseja realmente excluir ${companyNameToDelete}?`,
      "lg",
      () => handleDeleteClientCompany(companyId, companyNameToDelete)
    );
  };

  const commonProps = {
    handleShowCustomerDetailsModal,
    selectedIdToShowCompanyDetails,
    handleCleaningSelectedIdToShowCompanyDetails,
    handleOpenCustomerModal,
    modalOpen,
    companyName,
    handleCleaningCompanyNameStatus,
  };

  const shouldShowModal =
    (selectedIdToShowCompanyDetails && selectedIdToShowCompanyDetails !== 0) ||
    (customerIdToUpdate && customerIdToUpdate !== 0);

  useEffect(() => {
    const fetchDataCustomer = async () => {
      const foundCustomer = await useFindAllClientCompany();
      setUserCustomerAccountData(foundCustomer);
    };

    fetchDataCustomer();
    if (hasUpdatedCustomerRecord) {
      handleUpdatedCustomerRecordStatusChange();
    }
    if (hasDeletedCustomerRecord) {
      handleDeletedCustomerRecordStatusChange();
    }

  }, [hasUpdatedCustomerRecord, hasDeletedCustomerRecord]);

  return (
    <Card>
      <CardHeader className="border-0">
        <Row>
          <Col xs="6">
            <h3 className="mb-0">Lista de Clientes</h3>
          </Col>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th className="text-left">Nome</th>
            <th className="text-left">CNPJ</th>
            <th className="text-left">E-mail</th>
            <th className="text-left">Telefone</th>
            <th className="text-left">Plano</th>
            <th className="text-left">Estado</th>
            <th className="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {userCustomerAccountData.length > 0 ? (
            userCustomerAccountData.map((company) => (
              <tr key={company.id}>
                <td className="table-user">
                  <b className="text-left">{company.companyName}</b>
                </td>
                <td className="text-left">
                  <span className="text-muted">
                    {formatCNPJ(company.identificationNumber)}
                  </span>
                </td>
                <td className="text-left">
                  <span className="text-muted">
                    {company.email}
                  </span>
                </td>
                <td className="text-left">
                  <span className="text-muted">
                    {company.phoneNumber}
                  </span>
                </td>
                <td className="text-left">
                  <span className="text-muted">
                    {company.plan ? company.plan : "N/A"}
                  </span>
                </td>
                <td className="text-left">
                  {
                    company.status === true
                      ? (
                        <Badge color="success" pill>
                          Ativo
                        </Badge>
                      ) : (
                        company.status === false
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
                        onClick={(e) => { e.preventDefault(); handleShowCustomerDetailsModal(company.id, company.companyName) }}
                      >
                        Detalhes
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); handleOpenCustomerUpdateModal(company.id, company.companyName) }}
                      >
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); showWarningAlert(company.id, company.companyName); }}
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
              <td colSpan="8" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table >
      {shouldShowModal ? (
        <ShowCustomerDetailsModal {...commonProps} />
      ) : null}

    </Card >

  );
};

export default CustomersUserList;
