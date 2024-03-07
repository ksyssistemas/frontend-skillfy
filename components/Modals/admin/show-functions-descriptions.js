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

function ShowFunctionsDescriptionsModal({ handleShowFunctionsDescriptionsModal, functionsDescriptionsModalOpen }) {
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
      toggle={handleShowFunctionsDescriptionsModal}
      isOpen={functionsDescriptionsModalOpen}
      size="md"
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Descrição de [Nome da Função]
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleShowFunctionsDescriptionsModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Row>
          <div className="col">
            <div className="card-wrapper">
              <div className="form-row">
                <Col className="mb-3" md="12">
                  <div>
                    <span className="name mb-0 text-sm">
                      Função Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sint deleniti voluptatem necessitatibus. Deleniti dolorem, delectus sed quidem quas modi dicta esse sit inventore assumenda voluptas cumque odit nulla dignissimos?
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </Row>
      </ModalBody>
      <ModalFooter/>
    </Modal >
  );
}

ShowFunctionsDescriptionsModal.defaultProps = {
  handleShowFunctionsDescriptionsModal: () => { },
  functionsDescriptionsModalOpen: false,
};

ShowFunctionsDescriptionsModal.propTypes = {
  handleShowFunctionsDescriptionsModal: PropTypes.func,
  functionsDescriptionsModalOpen: PropTypes.bool,
};

export default ShowFunctionsDescriptionsModal;