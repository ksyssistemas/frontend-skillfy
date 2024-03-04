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

function ShowCustomerDetailsModal({ handleShowCustomerDetailsModal, modalOpen }) {
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
      toggle={handleShowCustomerDetailsModal}
      isOpen={modalOpen}
      size="xl"
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Informações de [Nome Cliente]
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleShowCustomerDetailsModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Row>
          <div className="col">
            <div className="card-wrapper">
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom01"
                  >
                    Nome
                  </label>
                  <Input
                    defaultValue="Mark"
                    id="validationCustom01"
                    placeholder="CompanyName"
                    type="text"
                    valid={firstNameState === "valid"}
                    invalid={firstNameState === "invalid"}
                    onChange={(e) => {
                      setfirstName(e.target.value);
                      if (e.target.value === "") {
                        setfirstNameState("invalid");
                      } else {
                        setfirstNameState("valid");
                      }
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    Nome Fantasia
                  </label>
                  <Input
                    id="validationCustom05"
                    placeholder="BrandName"
                    type="text"
                    valid={zipState === "valid"}
                    invalid={zipState === "invalid"}
                    onChange={(e) => {
                      setzip(e.target.value);
                      if (e.target.value === "") {
                        setzipState("invalid");
                      } else {
                        setzipState("valid");
                      }
                    }}
                  />
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
                  <Input
                    defaultValue="Otto"
                    id="validationCustom02"
                    placeholder="IdentificationNumber"
                    type="text"
                    valid={lastNameState === "valid"}
                    invalid={lastNameState === "invalid"}
                    onChange={(e) => {
                      setlastName(e.target.value);
                      if (e.target.value === "") {
                        setlastNameState("invalid");
                      } else {
                        setlastNameState("valid");
                      }
                    }}
                  />
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
                  <Input
                    defaultValue="Mark"
                    id="validationCustom01"
                    placeholder="AccountHolder"
                    type="text"
                    valid={firstNameState === "valid"}
                    invalid={firstNameState === "invalid"}
                    onChange={(e) => {
                      setfirstName(e.target.value);
                      if (e.target.value === "") {
                        setfirstNameState("invalid");
                      } else {
                        setfirstNameState("valid");
                      }
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    Telefone
                  </label>
                  <Input
                    id="validationCustom05"
                    placeholder="Phone"
                    type="text"
                    valid={zipState === "valid"}
                    invalid={zipState === "invalid"}
                    onChange={(e) => {
                      setzip(e.target.value);
                      if (e.target.value === "") {
                        setzipState("invalid");
                      } else {
                        setzipState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please provide a valid zip.
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Classificação do Estabelecimento
                  </label>
                  <Input
                    defaultValue="Otto"
                    id="validationCustom02"
                    placeholder="isBranche"
                    type="text"
                    valid={lastNameState === "valid"}
                    invalid={lastNameState === "invalid"}
                    onChange={(e) => {
                      setlastName(e.target.value);
                      if (e.target.value === "") {
                        setlastNameState("invalid");
                      } else {
                        setlastNameState("valid");
                      }
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </Col>
              </div>

              <hr />
              <div className="form-row">
                <Col className="mb-3" md="8">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    Logradouro
                  </label>
                  <Input
                    aria-describedby="inputGroupPrepend"
                    id="validationCustomUsername"
                    placeholder="Logradouro"
                    type="text"
                    valid={usernameState === "valid"}
                    invalid={usernameState === "invalid"}
                    onChange={(e) => {
                      setusername(e.target.value);
                      if (e.target.value === "") {
                        setusernameState("invalid");
                      } else {
                        setusernameState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    Número
                  </label>
                  <Input
                    aria-describedby="inputGroupPrepend"
                    id="validationCustomUsername"
                    placeholder="Número"
                    type="text"
                    valid={usernameState === "valid"}
                    invalid={usernameState === "invalid"}
                    onChange={(e) => {
                      setusername(e.target.value);
                      if (e.target.value === "") {
                        setusernameState("invalid");
                      } else {
                        setusernameState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    Complemento
                  </label>
                  <Input
                    aria-describedby="inputGroupPrepend"
                    id="validationCustomUsername"
                    placeholder="Complemento"
                    type="text"
                    valid={usernameState === "valid"}
                    invalid={usernameState === "invalid"}
                    onChange={(e) => {
                      setusername(e.target.value);
                      if (e.target.value === "") {
                        setusernameState("invalid");
                      } else {
                        setusernameState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </Col>
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom03"
                  >
                    Bairro
                  </label>
                  <Input
                    id="validationCustom03"
                    placeholder="Bairro"
                    type="text"
                    valid={cityState === "valid"}
                    invalid={cityState === "invalid"}
                    onChange={(e) => {
                      setcity(e.target.value);
                      if (e.target.value === "") {
                        setcityState("invalid");
                      } else {
                        setcityState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </Col>
              </div>
              <hr />
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom04"
                  >
                    Município
                  </label>
                  <Input
                    id="validationCustom04"
                    placeholder="Município"
                    type="text"
                    valid={stateState === "valid"}
                    invalid={stateState === "invalid"}
                    onChange={(e) => {
                      setstate(e.target.value);
                      if (e.target.value === "") {
                        setstateState("invalid");
                      } else {
                        setstateState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    UF
                  </label>
                  <Input
                    id="validationCustom05"
                    placeholder="Estado"
                    type="text"
                    valid={zipState === "valid"}
                    invalid={zipState === "invalid"}
                    onChange={(e) => {
                      setzip(e.target.value);
                      if (e.target.value === "") {
                        setzipState("invalid");
                      } else {
                        setzipState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please provide a valid zip.
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    CEP
                  </label>
                  <Input
                    id="validationCustom05"
                    placeholder="CEP"
                    type="text"
                    valid={zipState === "valid"}
                    invalid={zipState === "invalid"}
                    onChange={(e) => {
                      setzip(e.target.value);
                      if (e.target.value === "") {
                        setzipState("invalid");
                      } else {
                        setzipState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    Please provide a valid zip.
                  </div>
                </Col>
              </div>
              <hr />
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Plano
                  </label>
                  <Input
                    defaultValue="Otto"
                    id="validationCustom02"
                    placeholder="Plan"
                    type="text"
                    valid={lastNameState === "valid"}
                    invalid={lastNameState === "invalid"}
                    onChange={(e) => {
                      setlastName(e.target.value);
                      if (e.target.value === "") {
                        setlastNameState("invalid");
                      } else {
                        setlastNameState("valid");
                      }
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Data de Adesão
                  </label>
                  <Input
                    defaultValue="Otto"
                    id="validationCustom02"
                    placeholder="CreatedAt"
                    type="text"
                    valid={lastNameState === "valid"}
                    invalid={lastNameState === "invalid"}
                    onChange={(e) => {
                      setlastName(e.target.value);
                      if (e.target.value === "") {
                        setlastNameState("invalid");
                      } else {
                        setlastNameState("valid");
                      }
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom02"
                  >
                    Estado
                  </label>
                  <Input
                    defaultValue="Otto"
                    id="validationCustom02"
                    placeholder="Ativo"
                    type="text"
                    valid={lastNameState === "valid"}
                    invalid={lastNameState === "invalid"}
                    onChange={(e) => {
                      setlastName(e.target.value);
                      if (e.target.value === "") {
                        setlastNameState("invalid");
                      } else {
                        setlastNameState("valid");
                      }
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </Col>
              </div>
            </div>
          </div>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={handleShowCustomerDetailsModal}
        >
          Fechar
        </Button>
        <Button color="primary" type="button">
          Editar
        </Button>
      </ModalFooter>
    </Modal >
  );
}

ShowCustomerDetailsModal.defaultProps = {
  handleShowCustomerDetailsModal: () => { },
  modalOpen: false,
};

ShowCustomerDetailsModal.propTypes = {
  handleShowCustomerDetailsModal: PropTypes.func,
  modalOpen: PropTypes.bool,
};

export default ShowCustomerDetailsModal;