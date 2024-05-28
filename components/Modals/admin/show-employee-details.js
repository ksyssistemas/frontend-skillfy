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

function ShowEmployeeDetailsModal({ handleShowEmployeeDetailsModal, modalOpen }) {

  const [detailsSelectedEmployee, setDetailsSelectedEmployee] = useState([]);
  const [addressDetailsSelectedEmployee, setAddressDetailsSelectedEmployee] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(async () => {
    if (detailsSelectedEmployee && detailsSelectedEmployee.length === 0) {
      const foundEmployee = await useFindEmployee();
      setDetailsSelectedEmployee(foundEmployee);
    }
  }, [detailsSelectedEmployee]);

  useEffect(async () => {
    if (addressDetailsSelectedEmployee && addressDetailsSelectedEmployee.length === 0) {
      const foundEmployeeAddress = await useFindEmployeeAddress();
      setAddressDetailsSelectedEmployee(foundEmployeeAddress);
    }
  }, [addressDetailsSelectedEmployee]);

  if (detailsSelectedEmployee && addressDetailsSelectedEmployee) {
    return (
      <Modal
        toggle={handleShowEmployeeDetailsModal}
        isOpen={modalOpen}
        size="xl"
      //fullscreen
      >
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Informações de {detailsSelectedEmployee.Name}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={handleShowEmployeeDetailsModal}
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
                  <Col className="mb-3" md="4">
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
                  </Col>
                  <Col className="mb-3" md="4">
                    <label
                      className="form-control-label"
                      htmlFor="validationCustom05"
                    >
                      Nome
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">
                        {detailsSelectedEmployee.FirstName}
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
                        {detailsSelectedEmployee.LastName}
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
                        {formatDate(detailsSelectedEmployee.Birthdate)}
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
                        {detailsSelectedEmployee.Email}
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
                        {detailsSelectedEmployee.PhoneNumber}
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
                        {addressDetailsSelectedEmployee.Cep}
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
                        {addressDetailsSelectedEmployee.Address}
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
                        {addressDetailsSelectedEmployee.Complement}
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
                        {addressDetailsSelectedEmployee.AddressNumber}
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
                        {addressDetailsSelectedEmployee.Neighborhood}
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
                        {addressDetailsSelectedEmployee.City}
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
                        {addressDetailsSelectedEmployee.State}
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
                        {detailsSelectedEmployee.Department}
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
                        {detailsSelectedEmployee.Role}
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
                        {detailsSelectedEmployee.Function}
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
                        {detailsSelectedEmployee.ContractType}
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
                        {detailsSelectedEmployee.WorkModel}
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
                        {formatDate(detailsSelectedEmployee.AdmissionDate)}
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
                        {detailsSelectedEmployee.Lead}
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
                        {detailsSelectedEmployee.EntryTime}
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
                        {detailsSelectedEmployee.Interval}
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
                        {detailsSelectedEmployee.DepartureTime}
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
  } else {
    return null;
  }
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