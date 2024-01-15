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

function AddAppraisalCycleModal({handleOpenAddAppraisalCycleModal, modalOpen}) {
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
        toggle={handleOpenAddAppraisalCycleModal} 
        isOpen={modalOpen}
        size="xl"
        //fullscreen
        scrollable
      >
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Detalhes do Ciclo de Avaliação
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={handleOpenAddAppraisalCycleModal}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <Col className="mb-6" md="6">
                <label
                  className="form-control-label"
                  htmlFor="validationCustom01"
                >
                  Nome do ciclo
                </label>
                <Input
                  defaultValue="Avaliação de Desempenho 2024"
                  id="validationCustom01"
                  placeholder="First name"
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
              <Col className="mb-6" md="6">
                <label
                  className="form-control-label"
                  htmlFor="validationCustom02"
                >
                  Localização
                </label>
                <Input
                  defaultValue="Ksys Sitemas - Ilhota"
                  id="validationCustom02"
                  placeholder="Last name"
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
              <Col className="mb-6" md="4">
                <label
                  className="form-control-label"
                  htmlFor="validationCustomUsername"
                >
                  Data de início
                </label>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Selecionador de datas aqui",
                  }}
                  timeFormat={false}
                />
              </Col>
              <Col className="mb-6" md="4">
                <label
                  className="form-control-label"
                  htmlFor="validationCustom03"
                >
                  Até a data
                </label>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Selecionador de datas aqui",
                  }}
                  timeFormat={false}
                />
              </Col>
              <Col className="mb-6" md="4">
                <label
                  className="form-control-label"
                  htmlFor="validationCustom04"
                >
                  Data de vencimento 
                </label>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Selecionador de datas aqui",
                  }}
                  timeFormat={false}
                />
              </Col>
            </div>
            <FormGroup>
              <div className="custom-control custom-checkbox mb-6">
                <input
                  className="custom-control-input"
                  defaultValue=""
                  id="invalidCheck"
                  type="checkbox"
                  valid={(checkboxState === "valid").toString()}
                  invalid={(checkboxState === "invalid").toString()}
                  onChange={(e) => {
                    setcheckbox(e.target.value);
                    if (e.target.value === "") {
                      setcheckboxState("invalid");
                    } else {
                      setcheckboxState("valid");
                    }
                  }}
                />
                <label
                  className="custom-control-label"
                  htmlFor="invalidCheck"
                >
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </FormGroup>
              {/* <Button
                color="primary"
                type="button"
                onClick={validateCustomStylesForm}
              >
                Enviar formulário
              </Button> */}
            </Form>
          </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={handleOpenAddAppraisalCycleModal}
          >
            Fechar
          </Button>
          <Button color="primary" type="button">
          Enviar formulário
          </Button>
        </ModalFooter>
      </Modal>
  );
}

AddAppraisalCycleModal.defaultProps = {
    handleOpenAddAppraisalCycleModal: () => {},
    modalOpen: false,
  };

AddAppraisalCycleModal.propTypes = {
    handleOpenAddAppraisalCycleModal: PropTypes.func,
    modalOpen: PropTypes.bool,
  };

export default AddAppraisalCycleModal;