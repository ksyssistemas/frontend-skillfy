import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// reactstrap components
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { useFindEmployee } from "../../../hooks/employee/useFindEmployee";
import { useFindEmployeeAddress } from "../../../hooks/employee/useFindEmployeeAddress";
import { useFindEmployeeContractDetails } from "../../../hooks/featuresEmploymentContract/useFindEmployeeContractDetails";

function ShowEmployeeDetailsModal({ handleShowEmployeeDetailsModal, modalOpen, idSelectedToShowEmployeeDetails, setIdSelectedToShowEmployeeDetails }) {

  const [detailsSelectedEmployee, setDetailsSelectedEmployee] = useState([]);
  const [addressDetailsSelectedEmployee, setAddressDetailsSelectedEmployee] = useState([]);
  const [contractDetailsSelectedEmployee, setContractDetailsSelectedEmployee] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (detailsSelectedEmployee.length === 0 && addressDetailsSelectedEmployee.length === 0 && contractDetailsSelectedEmployee.length === 0) {
        console.log("ID: ", idSelectedToShowEmployeeDetails)
        const foundEmployee = await useFindEmployee(idSelectedToShowEmployeeDetails);
        setDetailsSelectedEmployee(foundEmployee || []);
        const foundEmployeeAddress = await useFindEmployeeAddress(idSelectedToShowEmployeeDetails);
        setAddressDetailsSelectedEmployee(foundEmployeeAddress.data[0] || []);
        const foundEmployeeContractDetails = await useFindEmployeeContractDetails(idSelectedToShowEmployeeDetails);
        setContractDetailsSelectedEmployee(foundEmployeeContractDetails || []);
      }
    };

    fetchData();
  }, [detailsSelectedEmployee, addressDetailsSelectedEmployee, contractDetailsSelectedEmployee, idSelectedToShowEmployeeDetails]);

  function handleCloseModal() {
    handleShowEmployeeDetailsModal();
    setIdSelectedToShowEmployeeDetails('');
  }

  return (
    <Modal
      toggle={handleShowEmployeeDetailsModal}
      isOpen={modalOpen}
      size="xl"
      key={`${detailsSelectedEmployee.id}.${addressDetailsSelectedEmployee.id}.${contractDetailsSelectedEmployee.id}`}
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Informações de {detailsSelectedEmployee?.name || ''}
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleCloseModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Row>
          <div className="col">
            <div className="card-wrapper">
              <h6 className="heading-small text-muted mb-4">
                Informações Pessoais
              </h6>
              <div className="form-row">
                {/* <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom01"
                  >
                    Número de Identificação do Colaborador
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {detailsSelectedEmployee.EmployeeIdNumber}
                    </span>
                  </div>
                </Col> */}
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    Nome
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {detailsSelectedEmployee?.name || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Sobrenome
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {detailsSelectedEmployee?.lastName || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom01"
                  >
                    Data de Nascimento
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {detailsSelectedEmployee?.birthdate ? formatDate(detailsSelectedEmployee.birthdate) : ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    E-mail
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {detailsSelectedEmployee?.email || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Número de Telefone
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {detailsSelectedEmployee?.phoneNumber || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <hr />
              <h6 className="heading-small text-muted mb-4">
                Informações de Endereço
              </h6>
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
                      {addressDetailsSelectedEmployee?.zipCode || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="8">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    Logradouro
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.address || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="8">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom03"
                  >
                    Complemento
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.complement || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    Número
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.addressNumber || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom04"
                  >
                    Bairro
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.neighborhood || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    Cidade
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.city || ''}
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
                      {addressDetailsSelectedEmployee?.state || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <hr />
              <h6 className="heading-small text-muted mb-4">
                Informações de Ocupação
              </h6>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Departamento
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.department || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Cargo
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.roles || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Função
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.employeeFunction || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Tipo de Contrato
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.contractType || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Modelo de Trabalho
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.contractModel || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Data de Admissão
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.adimissionDate ? formatDate(contractDetailsSelectedEmployee.adimissionDate) : ''}
                    </span>
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="3">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Exerce líderança?
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {detailsSelectedEmployee?.isLead === true ? "Sim" : "Não"}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="3">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Hora de Entrada
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.entryTime || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="3">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Intervalo
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.breakTime || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="3">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Horário de Saída
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {contractDetailsSelectedEmployee?.departureTime || ''}
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </Row>
      </ModalBody>
      <ModalFooter />
      {/* <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={handleShowEmployeeDetailsModal}
        >
          Fechar
        </Button>
        <Button color="primary" type="button">
          Editar
        </Button>
      </ModalFooter> */}
    </Modal >
  );

}

ShowEmployeeDetailsModal.defaultProps = {
  handleShowEmployeeDetailsModal: () => { },
  modalOpen: false,
};

ShowEmployeeDetailsModal.propTypes = {
  handleShowEmployeeDetailsModal: PropTypes.func,
  modalOpen: PropTypes.bool,
};

export default ShowEmployeeDetailsModal;