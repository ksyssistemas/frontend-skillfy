import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// reactstrap components
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import ReactDatetime from "react-datetime";
import { useFindClientCompany } from "../../../hooks/RecordsHooks/customer/useFindClientCompany";
import { useFindEmployeeAddress } from "../../../hooks/RecordsHooks/customer/useFindClientCompanyAddress";
import useCreateClientCompany from "../../../hooks/RecordsHooks/customer/useCreateClientCompany";
import CustomerUserUpdate from "../../Forms/CustomerForms/CustomerUserUpdate";
import useCNPJ from "../../../hooks/RecordsHooks/useCNPJ";
import { CustomerContext } from "../../../contexts/RecordsContext/CustomerContext";

function ShowCustomerDetailsModal(
  {
    handleShowCustomerDetailsModal,
    selectedIdToShowCompanyDetails,
    handleCleaningSelectedIdToShowCompanyDetails,
    handleOpenCustomerModal,
    modalOpen,
    companyName,
    handleCleaningCompanyNameStatus,
  }) {

  const {
    handleIsShouldUpdateClientCompany,
    customerIdToUpdate,
    handleCustomerIdStatusCleanupToUpdate
  } = useContext(CustomerContext);

  const formatCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, "");
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const year = adjustedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function handleCloseCustomerDetailsModal() {
    handleCleaningSelectedIdToShowCompanyDetails();
    handleCleaningCompanyNameStatus();
    handleOpenCustomerModal();
  }

  function handleCloseCustomerUpdateModal() {
    handleCustomerIdStatusCleanupToUpdate();
    handleCleaningCompanyNameStatus();
    handleOpenCustomerModal();
  }

  const [userCustomerAccountData, setUserCustomerAccountData] = useState([]);
  const [userCustomerAddressData, setUserCustomerAddressData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userCustomerAccountData.length <= 0) {
          const foundCustomer = await useFindClientCompany(selectedIdToShowCompanyDetails);
          setUserCustomerAccountData(foundCustomer);
        }
        if (userCustomerAddressData.length <= 0) {
          const foundCustomerAddress = await useFindEmployeeAddress(selectedIdToShowCompanyDetails);
          setUserCustomerAddressData(foundCustomerAddress[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedIdToShowCompanyDetails]);

  function handleUpdateCustomerUserUpdate() {
    handleIsShouldUpdateClientCompany();
  }

  const commonProps = {
    handleShowCustomerDetailsModal,
    handleOpenCustomerModal,
    modalOpen,
    companyName,
    handleCleaningCompanyNameStatus,
  };

  return (
    <Modal
      toggle={handleShowCustomerDetailsModal}
      isOpen={modalOpen}
      size="xl"
      key={selectedIdToShowCompanyDetails ? selectedIdToShowCompanyDetails : customerIdToUpdate}
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          {
            !customerIdToUpdate
              ? `Informações de ${companyName}`
              : (
                customerIdToUpdate && companyName
                  ? `Editar informações de ${companyName}`
                  : 'Informações'
              )
          }
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={selectedIdToShowCompanyDetails ? handleCloseCustomerDetailsModal : handleCloseCustomerUpdateModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        {
          userCustomerAccountData && userCustomerAccountData.id ? (
            <Row>
              <div className="col">
                <div className="card-wrapper">
                  {/* <h6 className="heading-small text-muted mb-4">
                    Informações Institucionais
                  </h6> */}
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom01"
                      >
                        Nome
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.companyName}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        Nome Fantasia
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.brandName}
                        </span>
                      </div>
                      <div className="invalid-feedback">
                        Please provide a valid zip.
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        CNPJ
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {formatCNPJ(userCustomerAccountData.identificationNumber)}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom01"
                      >
                        E-mail Titular
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.email}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        Telefone
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.phoneNumber}
                        </span>
                      </div>
                      <div className="invalid-feedback">
                        Please provide a valid zip.
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        Celular
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.phone ? userCustomerAccountData.phone : "N/A"}
                        </span>
                      </div>
                      <div className="invalid-feedback">
                        Please provide a valid zip.
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Tipo de Empresa
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.type}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Setor
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.sector}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Web Site
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.webSite ? userCustomerAccountData.webSite : "N/A"}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                  </div>
                  <hr />
                  {/* <h6 className="heading-small text-muted mb-4">
                    Informações de Endereço
                  </h6> */}
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustomUsername"
                      >
                        CEP
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.zipCode}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="6">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustomUsername"
                      >
                        Endereço
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.address}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="2">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustomUsername"
                      >
                        Número
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.addressNumber}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="6">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom03"
                      >
                        Complemento
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.complement ? userCustomerAddressData.complement : "Não registrado"}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="2">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom04"
                      >
                        Matriz
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.idHeadOfficeBranch ? "Filial" : "Matriz"}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom04"
                      >
                        Bairro
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.neighborhood}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        Cidade
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.city}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        Estado
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.state}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        País
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAddressData.country}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <hr />
                  {/* <h6 className="heading-small text-muted mb-4">
                    Informações do Plano Aderido
                  </h6> */}
                  <div className="form-row">
                    <Col className="mb-3" md="6">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Plano
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          Cargo Lorem ipsum dolor sit
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Data de Adesão
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {formatDate(userCustomerAccountData.createdAt)}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col className="mb-3" md="2">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Estado Ativo
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {userCustomerAccountData.status ? "Sim" : "Não"}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                  </div>
                  {/* <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Número de Colaboradores
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          Cargo Lorem ipsum dolor sit
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                  </div> */}
                </div>
              </div>
            </Row>
          ) : (
            customerIdToUpdate ? (
              <CustomerUserUpdate {...commonProps} />
            ) : (
              <div className="text-center">Dados não disponíveis</div>
            )
          )
        }
      </ModalBody>
      {
        customerIdToUpdate ? (
          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={selectedIdToShowCompanyDetails ? handleCloseCustomerDetailsModal : handleCloseCustomerUpdateModal}
            >
              Fechar
            </Button>
            <Button
              color={'warning'}
              type="button"
              onClick={() => handleUpdateCustomerUserUpdate()}
            >
              Editar Cliente
            </Button>
          </ModalFooter>
        ) : null
      }
    </Modal >
  );
}

ShowCustomerDetailsModal.defaultProps = {
  handleShowCustomerDetailsModal: () => { },
  selectedIdToShowCompanyDetails: null,
  handleCleaningSelectedIdToShowCompanyDetails: () => { },
  handleOpenCustomerModal: () => { },
  modalOpen: false,
  companyName: '',
  handleCleaningCompanyNameStatus: () => { },
};

ShowCustomerDetailsModal.propTypes = {
  handleShowCustomerDetailsModal: PropTypes.func,
  selectedIdToShowCompanyDetails: PropTypes.string,
  handleCleaningSelectedIdToShowCompanyDetails: PropTypes.func,
  handleOpenCustomerModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  companyName: PropTypes.string,
  handleCleaningCompanyNameStatus: PropTypes.func,
};

export default ShowCustomerDetailsModal;