import React, { useEffect, useState } from "react";
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
import { useFindClientCompany } from "../../../hooks/customer/useFindClientCompany";
import { useFindEmployeeAddress } from "../../../hooks/customer/useFindClientCompanyAddress";

function ShowCustomerDetailsModal({ handleShowCustomerDetailsModal, idSelectedToShowCompanyDetails, modalOpen }) {
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

  const [userCustomerAccountData, setUserCustomerAccountData] = useState([]);
  const [userCustomerAddressData, setUserCustomerAddressData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundCustomer = await useFindClientCompany(idSelectedToShowCompanyDetails);
        setUserCustomerAccountData(foundCustomer || {});
        const foundCustomerAddress = await useFindEmployeeAddress(idSelectedToShowCompanyDetails);
        setUserCustomerAddressData(foundCustomerAddress[0] || {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idSelectedToShowCompanyDetails]);

  // useEffect(async () => {
  //   if (userCustomerAddressData.length == 0) {
  //   }
  // }, [userCustomerAddressData, idSelectedToShowCompanyDetails]);

  return (
    <Modal
      toggle={handleShowCustomerDetailsModal}
      isOpen={modalOpen}
      size="xl"
      key={`${userCustomerAccountData.id || ''}.${userCustomerAddressData.id || ''}`}
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          {userCustomerAccountData.companyName ? `Informações de ${userCustomerAccountData.companyName}` : 'Informações'}
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
        {Object.keys(userCustomerAccountData).length > 0 && Object.keys(userCustomerAddressData).length > 0 ? (
          <Row>
            <div className="col">
              <div className="card-wrapper">
                <h6 className="heading-small text-muted mb-4">
                  Informações Institucionais
                </h6>
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
                        {userCustomerAccountData.identificationNumber}
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
                      htmlFor="validationCustom02"
                    >
                      Classificação do Estabelecimento
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">
                        {userCustomerAccountData.type}
                      </span>
                    </div>
                    <div className="valid-feedback">Looks good!</div>
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
                        {userCustomerAddressData.zipCode}
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
                        {userCustomerAddressData.address}
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
                        {userCustomerAddressData.complement ? userCustomerAddressData.complement : "Não registrado"}
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
                        {userCustomerAddressData.addressNumber}
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
                        {userCustomerAddressData.neighborhood}
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
                </div>
                <hr />
                <h6 className="heading-small text-muted mb-4">
                  Informações do Plano Aderido
                </h6>
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
                  <Col className="mb-3" md="6">
                    <label
                      className="form-control-label"
                      htmlFor="validationCustom02"
                    >
                      Data de Adesão
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">
                        {userCustomerAccountData.createdAt}
                      </span>
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </Col>
                  <Col className="mb-3" md="6">
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
                  <Col className="mb-3" md="6">
                    <label
                      className="form-control-label"
                      htmlFor="validationCustom02"
                    >
                      Estado
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">
                        {userCustomerAccountData.status ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </Col>
                </div>
              </div>
            </div>
          </Row>
        ) : (
          <div className="text-center">Dados não disponíveis</div>
        )}
      </ModalBody>
      <ModalFooter />
      {/* <ModalFooter>
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
      </ModalFooter> */}
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