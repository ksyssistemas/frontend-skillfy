import React from "react";
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

function ShowEmployeeDetailsModal({ handleShowEmployeeDetailsModal, modalOpen }) {
  const [focused, setFocused] = React.useState(false);
  const [firstName, setfirstName] = React.useState("Mark");
  const [firstNameState, setfirstNameState] = React.useState(null);
  const [lastName, setlastName] = React.useState("Otto");
  const [lastNameState, setlastNameState] = React.useState(null);
  const [username, setusername] = React.useState("");
  const [usernameState, setusernameState] = React.useState(null);
  const [city, setcity] = React.useState("");
  const [cityState, setcityState] = React.useState(null);
  const [state, setstate] = React.useState("");
  const [stateState, setstateState] = React.useState(null);
  const [zip, setzip] = React.useState("");
  const [zipState, setzipState] = React.useState(null);
  const [checkbox, setcheckbox] = React.useState(false);
  const [checkboxState, setcheckboxState] = React.useState(null);
  const validateCustomStylesForm = () => {
    if (firstName === "") {
      setfirstNameState("invalid");
    } else {
      setfirstNameState("valid");
    }
    if (lastName === "") {
      setlastNameState("invalid");
    } else {
      setlastNameState("valid");
    }
    if (username === "") {
      setusernameState("invalid");
    } else {
      setusernameState("valid");
    }
    if (city === "") {
      setcityState("invalid");
    } else {
      setcityState("valid");
    }
    if (state === "") {
      setstateState("invalid");
    } else {
      setstateState("valid");
    }
    if (zip === "") {
      setzipState("invalid");
    } else {
      setzipState("valid");
    }
    if (checkbox === false) {
      setcheckboxState("invalid");
    } else {
      setcheckboxState("valid");
    }
  };

  const handleReactDatetimeChange = (who, date) => {
    if (
      startDate &&
      who === "endDate" &&
      new Date(startDate._d + "") > new Date(date._d + "")
    ) {
      setStartDate(date);
      setEndDate(date);
    } else if (
      endDate &&
      who === "startDate" &&
      new Date(endDate._d + "") < new Date(date._d + "")
    ) {
      setStartDate(date);
      setEndDate(date);
    } else {
      if (who === "startDate") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const getClassNameReactDatetimeDays = (date) => {
    if (startDate && endDate) {
    }
    if (startDate && endDate && startDate._d + "" !== endDate._d + "") {
      if (
        new Date(endDate._d + "") > new Date(date._d + "") &&
        new Date(startDate._d + "") < new Date(date._d + "")
      ) {
        return " middle-date";
      }
      if (endDate._d + "" === date._d + "") {
        return " end-date";
      }
      if (startDate._d + "" === date._d + "") {
        return " start-date";
      }
    }
    return "";
  };

  return (
    <Modal
      toggle={handleShowEmployeeDetailsModal}
      isOpen={modalOpen}
      size="xl"
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Informações de [Nome Colaborador]
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
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
                      Cargo Lorem ipsum dolor sit
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </Row>
      </ModalBody>
      <ModalFooter/>
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