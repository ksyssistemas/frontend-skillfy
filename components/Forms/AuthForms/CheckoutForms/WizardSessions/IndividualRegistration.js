
export function IndividualRegistration() {

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
    )
}