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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  return (
    <>
      <AuthHeader title="Escolha o melhor plano para o seu negócio" lead="" />
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
                      <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 1 ? 'badge-success' : 'badge-neutral'}`}>1</span>
                      <span className={`text-center font-weight-bold ${step >= 1 ? 'text-success' : 'text-muted'}`}>Criar sua Conta</span>
                    </div>
                    <div className="col">
                      <Progress
                        color="success"
                        className="progress-xs mb-0"
                        max="100"
                        value="100"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle bg-light d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 2 ? 'badge-success' : 'badge-neutral'}`}>2</span>
                      <span className={`text-muted text-center font-weight-bold ${step >= 2 ? 'text-success' : 'text-muted'}`}>Sua Empresa</span>
                    </div>
                    <div className="col">
                      <Progress
                        color="light"
                        className="progress-xs mb-0"
                        max="100"
                        value="100"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <span style={{ width: 40, height: 40 }} className={`position-relative rounded-circle bg-light d-flex flex-column align-items-center justify-content-center text-lg font-weight-bold ${step >= 3 ? 'badge-success' : 'badge-neutral'}`}>3</span>
                      <span className="text-muted text-center font-weight-bold">Pagamento</span>
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
                                        Nome da Empresa
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
                                        Razão Social
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
                                        Segmento
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
                                        Celular
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
                                        CEP
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
                                        Estado
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
                                        Endereço
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
                                        Número
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
                                        Complemento (opcional)
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
                                        Bairro
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
                                        Cidade
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
                                        *
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
                                </Form>
                              </div>
                              <div>
                                {/* Componente OfertaSelecionada com botão para avançar */}
                                {/* <OfertaSelecionada onNextStep={handleNextStep} /> */}
                              </div>
                            </div>
                          )}

                          {step === 3 && (
                            <div>
                              <div>
                                {/* Componente PaymentForm */}
                                {/* <PaymentForm /> */}
                              </div>
                              <div>
                                {/* Componente OfertaSelecionada */}
                                {/* <OfertaSelecionada /> */}
                              </div>
                            </div>
                          )}
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

        <div className="d-flex justify-content-lg-center px-3 mt-5">
          <div>
            <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-primary">
              <i className="ni ni-building text-primary" />
            </div>
          </div>
          <Col lg="10">
            <p className="text-white text-justify">
              <strong>A Twig</strong> oferece pesquisas direcionadas ao desempenho e aprendizado dos colaboradores, incluindo avaliações 360 graus, pesquisas de competências e enquetes de engajamento. Com funcionalidades de acompanhamento do aprendizado e autoavaliação de competências, promove o desenvolvimento contínuo. Integrando pesquisas de reconhecimento, bem-estar, diversidade e inclusão, proporciona uma abordagem completa para aprimorar a eficácia e satisfação no ambiente de trabalho.
            </p>
          </Col>
        </div>
        <Row className="row-grid justify-content-center">
          <Col lg="10">
            <Table className="table-dark mt-5" responsive>
              <thead>
                <tr>
                  <th className="px-0 bg-transparent" scope="col">
                    <span className="text-light font-weight-700">Recursos</span>
                  </th>
                  <th className="text-center bg-transparent" scope="col">
                    Plano Intermediário
                  </th>
                  <th className="text-center bg-transparent" scope="col">
                    Plano Básico
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-0">Pesquisas de Desempenho Individual</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Avaliações de Competências</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Acompanhamento do Aprendizado</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
                <tr>
                  <td className="px-0">Feedback 360 Graus</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <span className="text-sm text-light">
                      Limitado a apenas 10 Colaboradores
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Enquetes de Engajamento</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                </tr>
                <tr>
                  <td className="px-0">Pesquisas de Clima Organizacional</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
                <tr>
                  <td className="px-0">Autoavaliação de Competências</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
                <tr>
                  <td className="px-0">Pesquisas de Diversidade e Inclusão</td>
                  <td className="text-center">
                    <i className="fas fa-check text-success" />
                  </td>
                  <td className="text-center">-</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>


      </Container>
    </>
  );
}

Pricing.layout = Auth;

export default Pricing;
