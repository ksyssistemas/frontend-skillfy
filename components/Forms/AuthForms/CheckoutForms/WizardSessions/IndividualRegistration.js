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

export function IndividualRegistration() {

  const [firstName, setfirstName] = React.useState("");
  const [firstNameState, setfirstNameState] = React.useState(null);
  const [lastName, setlastName] = React.useState("");
  const [lastNameState, setlastNameState] = React.useState(null);
  const [cpf, setcpf] = React.useState("");
  const [cpfState, setcpfState] = React.useState(null);
  const [bornDate, setbornDate] = React.useState("");
  const [bornDateState, setbornDateState] = React.useState(null);
  const [telefone, setTelefone] = React.useState("");
  const [telefoneState, settelefoneState] = React.useState(null);
  const [email, setemail] = React.useState("");
  const [emailState, setemailState] = React.useState(null);
  const [passWord, setpassWord] = React.useState("");
  const [passWordState, setpassWordState] = React.useState(null);
  const [confirmPassWord, setconfirmPassWord] = React.useState("");
  const [confirmPassWordState, setconfirmPassWordState] = React.useState(null);

  const [checkbox, setcheckbox] = React.useState(false);
  const [checkboxState, setcheckboxState] = React.useState(null);

    return ( 
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
                                  value={firstName}
                                  id="validationCustom01"
                                  placeholder="Nome"
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
                                <div className="valid-feedback">Parece bom!</div>
                              </Col>
                              <Col className="mb-3" md="6">
                                <label
                                  className="form-control-label"
                                  htmlFor="validationCustom01"
                                >
                                  Sobrenome
                                </label>
                                <Input
                                  value={lastName}
                                  id="validationCustom01"
                                  placeholder="Sobrenome"
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
                                <div className="valid-feedback">Parece bom!</div>
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
                                  value={cpf}
                                  id="validationCustom01"
                                  placeholder="xxx.xxx.xxx-xx"
                                  type="text"
                                  valid={cpfState === "valid"}
                                  invalid={cpfState === "invalid"}
                                  onChange={(e) => {
                                    setcpf(e.target.value);
                                    if (e.target.value === "") {
                                      setcpfState("invalid");
                                    } else {
                                      setcpfState("valid");
                                    }
                                  }}
                                />
                                <div className="valid-feedback">Parece bom!</div>
                              </Col>
                              <Col className="mb-3" md="6">
                                <label
                                  className="form-control-label"
                                  htmlFor="validationCustom01"
                                >
                                  Data de Nascimento
                                </label>
                                <Input
                                  value={bornDate}
                                  id="validationCustom01"
                                  placeholder="xx/xx/xxxx"
                                  type="text"
                                  valid={bornDateState === "valid"}
                                  invalid={bornDateState === "invalid"}
                                  onChange={(e) => {
                                    setbornDate(e.target.value);
                                    if (e.target.value === "") {
                                      setbornDateState("invalid");
                                    } else {
                                      setbornDateState("valid");
                                    }
                                  }}
                                />
                                <div className="valid-feedback">Parece bom!</div>
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
                                  value={telefone}
                                  id="validationCustom01"
                                  placeholder="(xx) x xxxx-xxxx"
                                  type="text"
                                  valid={telefoneState === "valid"}
                                  invalid={telefoneState === "invalid"}
                                  onChange={(e) => {
                                    setTelefone(e.target.value);
                                    if (e.target.value === "") {
                                      settelefoneState("invalid");
                                    } else {
                                      settelefoneState("valid");
                                    }
                                  }}
                                />
                                <div className="valid-feedback">Parece bom!</div>
                              </Col>
                              <Col className="mb-3" md="6">
                                <label
                                  className="form-control-label"
                                  htmlFor="validationCustom01"
                                >
                                  E-mail (será usado como login)
                                </label>
                                <Input
                                  value={email}
                                  id="validationCustom01"
                                  placeholder="xxxxx@email.com"
                                  type="text"
                                  valid={emailState === "valid"}
                                  invalid={emailState === "invalid"}
                                  onChange={(e) => {
                                    setemail(e.target.value);
                                    if (e.target.value === "") {
                                      setemailState("invalid");
                                    } else {
                                      setemailState("valid");
                                    }
                                  }}
                                />
                                <div className="valid-feedback">Parece bom!</div>
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
                                  value={passWord}
                                  id="validationCustom01"
                                  placeholder="Senha"
                                  type="text"
                                  valid={passWordState === "valid"}
                                  invalid={passWordState === "invalid"}
                                  onChange={(e) => {
                                    setpassWord(e.target.value);
                                    if (e.target.value === "") {
                                      setpassWordState("invalid");
                                    } else {
                                      setpassWordState("valid");
                                    }
                                  }}
                                />
                                <div className="valid-feedback">Parece bom!</div>
                              </Col>
                              <Col className="mb-3" md="6">
                                <label
                                  className="form-control-label"
                                  htmlFor="validationCustom01"
                                >
                                  Confirmar Senha
                                </label>
                                <Input
                                  value={confirmPassWord}
                                  id="validationCustom01"
                                  placeholder="Confirme sua senha"
                                  type="text"
                                  valid={confirmPassWordState === "valid"}
                                  invalid={confirmPassWordState === "invalid"}
                                  onChange={(e) => {
                                    setconfirmPassWord(e.target.value);
                                    if (e.target.value === "") {
                                      setconfirmPassWordState("invalid");
                                    } else {
                                      setconfirmPassWordState("valid");
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
                                  value={checkbox}
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
                                  Declaro que estou ciente e de acordo com os termos de uso SkillFy
                                </label>
                                <div className="invalid-feedback">
                                  You must agree before submitting.
                                </div>
                              </div>
                            </FormGroup>
                          </Form>
                        </div>
                      </div>
    )
}