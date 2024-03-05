/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from 'react';
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";

function Pricing() {
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
  const [step, setStep] = useState(1);

  const [nameOnCard, setnameOnCard] = React.useState(false);
  const [cardNumber, setcardNumber] = React.useState(false);
  const [date, setdate] = React.useState(false);
  const [ccv, setccv] = React.useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  return (
    <>
      <AuthHeader title="" lead="" />
      <Container className="mt--6" fluid>

        <Row>
          <div className="col">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  {/* <h3 className="mb-0">Custom styles</h3> position-relative w-25 rounded-circle bg-gray d-flex flex-column align-items-center justify-content-center*/}
                  {/* Elementos circulares com números e títulos */}
                  <div className="d-flex justify-content-between align-items-center mx-5 px-8 pt-3 pb-4">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 1 ? 'badge-success' : 'badge-dark'}`}>1</span>
                      <span className={`text-center font-weight-bold ${step >= 1 ? 'text-success' : 'text-muted'}`}>Criar sua Conta</span>
                    </div>
                    <div className="col">
                      <Progress
                        color={`${step > 1 ? 'success' : 'light'}`}
                        className="progress-xs mb-0"
                        max="100"
                        value="100"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 2 ? 'badge-success' : 'badge-dark'}`}>2</span>
                      <span className={`text-center font-weight-bold ${step >= 2 ? 'text-success' : 'text-muted'}`}>Sua Empresa</span>
                    </div>
                    <div className="col">
                      <Progress
                        color={`${step > 2 ? 'success' : 'light'}`}
                        className="progress-xs mb-0"
                        max="100"
                        value="100"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 3 ? 'badge-success' : 'badge-dark'}`}>3</span>
                      <span className={`text-center font-weight-bold ${step >= 3 ? 'text-success' : 'text-muted'}`}>Pagamento</span>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>

                  <Row className="justify-content-center">
                    <Col lg="6" md="6">
                      <CardBody className="bg-white">
                        <div>
                          {step === 1 && (
                            <div>
                              <div>
                                <h2>Informe seus dados</h2>
                                <Form className="needs-validation" noValidate>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Nome
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Sobrenome
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        CPF
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Data de Nascimento
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Telefone
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        E-mail (será usado como login)
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Senha
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Confirmar Senha
                                      </label>
                                      <Input
                                        defaultValue="Mark"
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
                                  </div>

                                  <FormGroup>
                                    <div className="custom-control custom-checkbox mb-3">
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
                                        Declaro que estou ciente e de acordo com os termos de uso: Twig
                                      </label>
                                      <div className="invalid-feedback">
                                        You must agree before submitting.
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Form>
                              </div>
                            </div>
                          )}

                          {step === 2 && (
                            <div>
                              <div>
                                <h2>Informe os dados da sua empresa (serão usados para cobrança)</h2>
                                <Form className="needs-validation" noValidate>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        CNPJ
                                      </label>
                                      <Input
                                        defaultValue="999.888.777/0001-22"
                                        id="validationCustom01"
                                        placeholder="999.888.777/0001-22"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Nome da Empresa
                                      </label>
                                      <Input
                                        defaultValue="Nome popular de título de estabelecimento"
                                        id="validationCustom01"
                                        placeholder="Nome popular de título de estabelecimento"
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Razão Social
                                      </label>
                                      <Input
                                        defaultValue="Nome ou termo de registro"
                                        id="validationCustom01"
                                        placeholder="Nome ou termo de registro"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Segmento
                                      </label>
                                      <Input
                                        defaultValue="MEI, EI, LTDA, SA, ..."
                                        id="validationCustom01"
                                        placeholder="MEI, EI, LTDA, SA, ..."
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Telefone
                                      </label>
                                      <Input
                                        defaultValue="+55 (47) 3322-4455"
                                        id="validationCustom01"
                                        placeholder="+55 (47) 3322-4455"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Celular
                                      </label>
                                      <Input
                                        defaultValue="+55 (47) 9 9988-7766"
                                        id="validationCustom01"
                                        placeholder="+55 (47) 9 9988-7766"
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        CEP
                                      </label>
                                      <Input
                                        defaultValue="00000-000"
                                        id="validationCustom01"
                                        placeholder="00000-000"
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Estado
                                      </label>
                                      <Input
                                        defaultValue=""
                                        id="validationCustom01"
                                        placeholder=""
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="8">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Endereço
                                      </label>
                                      <Input
                                        defaultValue=""
                                        id="validationCustom01"
                                        placeholder=""
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
                                        htmlFor="validationCustom01"
                                      >
                                        Número
                                      </label>
                                      <Input
                                        defaultValue="0000"
                                        id="validationCustom01"
                                        placeholder="0000"
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="12">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Complemento (opcional)
                                      </label>
                                      <Input
                                        defaultValue=""
                                        id="validationCustom01"
                                        placeholder=""
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
                                  </div>
                                  <div className="form-row">
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Bairro
                                      </label>
                                      <Input
                                        defaultValue=""
                                        id="validationCustom01"
                                        placeholder=""
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
                                    <Col className="mb-3" md="6">
                                      <label
                                        className="form-control-label"
                                        htmlFor="validationCustom01"
                                      >
                                        Cidade
                                      </label>
                                      <Input
                                        defaultValue=""
                                        id="validationCustom01"
                                        placeholder=""
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
                                  </div>
                                </Form>
                              </div>
                            </div>
                          )}

                          {step === 3 && (
                            <div>
                              <div>
                                <h2>Informações de pagamento</h2>
                                <div className="custom-control custom-radio mb-4">
                                  <input
                                    className="custom-control-input"
                                    defaultChecked
                                    id="customRadio6"
                                    name="custom-radio-1"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadio6"
                                  >
                                    Cartão de crédito
                                  </label>
                                </div>
                                <Card className="bg-gradient-default">
                                  <CardBody>
                                    <Row className="justify-content-between align-items-center">
                                      <div className="col">
                                        <img
                                          alt="..."
                                          src={require("assets/img/icons/cards/mastercard.png")}
                                        />
                                      </div>
                                      <Col className="col-auto">
                                        <div className="d-flex align-items-center">
                                          <small className="text-white font-weight-bold mr-3">
                                            Make default
                                          </small>
                                          <div>
                                            <label className="custom-toggle custom-toggle-white">
                                              <input defaultChecked type="checkbox" />
                                              <span
                                                className="custom-toggle-slider rounded-circle"
                                                data-label-off="No"
                                                data-label-on="Yes"
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                    <div className="mt-4">
                                      <Form className="form-primary" role="form">
                                        <FormGroup>
                                          <InputGroup
                                            className={classnames("input-group-alternative mb-3", {
                                              focused: nameOnCard,
                                            })}
                                          >
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>
                                                <i className="ni ni-single-02" />
                                              </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                              placeholder="Name on card"
                                              type="text"
                                              onFocus={(e) => setnameOnCard(true)}
                                              onBlur={(e) => setnameOnCard(false)}
                                            />
                                          </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                          <InputGroup
                                            className={classnames("input-group-alternative mb-3", {
                                              focused: cardNumber,
                                            })}
                                          >
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>
                                                <i className="ni ni-credit-card" />
                                              </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                              placeholder="Card number"
                                              type="text"
                                              onFocus={(e) => setcardNumber(true)}
                                              onBlur={(e) => setcardNumber(false)}
                                            />
                                          </InputGroup>
                                        </FormGroup>
                                        <Row>
                                          <Col xs="6">
                                            <FormGroup>
                                              <InputGroup
                                                className={classnames(
                                                  "input-group-alternative mb-3",
                                                  {
                                                    focused: date,
                                                  }
                                                )}
                                              >
                                                <InputGroupAddon addonType="prepend">
                                                  <InputGroupText>
                                                    <i className="ni ni-calendar-grid-58" />
                                                  </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                  placeholder="MM/YY"
                                                  type="text"
                                                  onFocus={(e) => setdate(true)}
                                                  onBlur={(e) => setdate(false)}
                                                />
                                              </InputGroup>
                                            </FormGroup>
                                          </Col>
                                          <Col xs="6">
                                            <FormGroup>
                                              <InputGroup
                                                className={classnames("input-group-alternative", {
                                                  focused: ccv,
                                                })}
                                              >
                                                <InputGroupAddon addonType="prepend">
                                                  <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                  </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                  placeholder="CCV"
                                                  type="text"
                                                  onFocus={(e) => setccv(true)}
                                                  onBlur={(e) => setccv(false)}
                                                />
                                              </InputGroup>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                        <Button block color="info" type="button">
                                          Save new card
                                        </Button>
                                      </Form>
                                    </div>
                                  </CardBody>
                                </Card>
                                <div className="custom-control custom-radio mb-3">
                                  <input
                                    className="custom-control-input"
                                    id="customRadio5"
                                    name="custom-radio-1"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadio5"
                                  >
                                    Boleto
                                  </label>
                                </div>
                                <div className="custom-control custom-radio mb-3">
                                  <input
                                    className="custom-control-input"
                                    id="customRadio5"
                                    name="custom-radio-1"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadio5"
                                  >
                                    Pix
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}

                          {step > 1 &&
                            <Button
                              color="primary"
                              type="button"
                              // onClick={validateCustomStylesForm}
                              onClick={handlePrevStep}
                            >
                              Voltar
                            </Button>
                          }
                        </div>
                      </CardBody>
                    </Col>
                    {/* Componente OfertaSelecionada com botão para avançar */}
                    {/* <OfertaSelecionada onNextStep={handleNextStep} /> */}
                    <Col lg="6" md="6">
                      <div className="pricing card-group flex-column flex-md-row mb-3">
                        <Card className="card-pricing border-0 text-center mb-4">
                          <CardHeader className="bg-lighter">
                            <h4 className="text-uppercase ls-1 text-info py-3 mb-0">
                              Plano Básico
                            </h4>
                          </CardHeader>
                          <CardBody className="px-lg-5 bg-lighter">
                            <div className="display-2">R$99</div>
                            <span className="text-muted">por empresa</span>
                            <ul className="list-unstyled my-4">
                              <li>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                      <i className="fas fa-chart-line" />
                                    </div>
                                  </div>
                                  <div>
                                    <span className="pl-2">Pesquisas de Desempenho Individual</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                      <i className="fas fa-trophy" />
                                    </div>
                                  </div>
                                  <div>
                                    <span className="pl-2">
                                      Avaliações de Competências
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                      <i className="fas fa-comments" />
                                    </div>
                                  </div>
                                  <div>
                                    <span className="pl-2">Feedback 360 Graus</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="icon icon-xs icon-shape bg-gradient-info shadow rounded-circle text-white">
                                      <i className="fas fa-poll" />
                                    </div>
                                  </div>
                                  <div>
                                    <span className="pl-2">Enquetes de Engajamento</span>
                                  </div>
                                </div>
                              </li>

                            </ul>
                            <Button className="mb-3" color="info" type="button" onClick={handleNextStep}>
                              Próximo
                            </Button>
                          </CardBody>
                          <CardFooter className="bg-lighter">
                            <a
                              className="text-light"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Falar com um consultor
                            </a>
                          </CardFooter>
                        </Card>
                      </div>
                    </Col>

                  </Row>
                </CardBody>
              </Card>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

Pricing.layout = Auth;

export default Pricing;
