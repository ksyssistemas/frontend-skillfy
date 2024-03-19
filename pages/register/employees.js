import React, { useState } from "react";
import dynamic from "next/dynamic";
// nodejs library that concatenates classes
import classnames from "classnames";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
  Button, Card, CardHeader, CardBody, FormGroup, Form, Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup, Container, Row, Col
} from "reactstrap";

import Enterprise from "../../layouts/Register";
import AlternativeHeader from "../../components/Headers/AlternativeHeader"

function Dashboard() {

  const [isEmployeeLeader, setIsEmployeeLeader] = React.useState(false);
  const [hasEmployeeLeader, setHasEmployeeLeader] = React.useState(false);

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

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4008/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          lastName: '',
          birthdate: '',
          email: '',
          password: '',
          phoneNumber: ''
        });
        console.log('Data sent successfully!');
      } else {
        console.error('Error in response:', response.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };

  function handleIsEmployeeLeader() {
    setIsEmployeeLeader(!isEmployeeLeader);
    setHasEmployeeLeader(false);
  }
  
  function handleHasEmployeeLeader() {
    setHasEmployeeLeader(!hasEmployeeLeader);
    setIsEmployeeLeader(false);
  }

  return (
    <Form>
      <AlternativeHeader name="Colaboradores" parentName="Cadastros" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Cadastrar Colaborador</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Número de Identificação do Colaborador
                    </label>
                    <Input
                      defaultValue="Mark"
                      id="validationDefault01"
                      placeholder="First name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Nome
                    </label>
                    <Input
                      defaultValue="Mark"
                      id="validationDefault01"
                      placeholder="First name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Sobrenome
                    </label>
                    <Input
                      defaultValue="Otto"
                      id="validationDefault02"
                      placeholder="Last name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>

              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup
                    className={classnames({
                      focused: focused,
                    })}
                  >
                    <label
                      className="form-control-label"
                      htmlFor="validationDefaultUsername"
                    >
                      Data de Nascimento
                    </label>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "Date Picker Here",
                      }}
                      timeFormat={false}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault03"
                    >
                      E-mail
                    </label>
                    <Input
                      id="validationDefault03"
                      placeholder="City"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault04"
                    >
                      Número de Telefone
                    </label>
                    <Input
                      id="validationDefault04"
                      placeholder="State"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </div>
              <hr />
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      CEP
                    </label>
                    <Input
                      defaultValue="Mark"
                      id="validationDefault01"
                      placeholder="First name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="8">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Logradouro
                    </label>
                    <Input
                      defaultValue="Otto"
                      id="validationDefault02"
                      placeholder="Last name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Número
                    </label>
                    <Input
                      defaultValue="Otto"
                      id="validationDefault02"
                      placeholder="Last name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="8">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Complemento (opcional)
                    </label>
                    <Input
                      defaultValue="Mark"
                      id="validationDefault01"
                      placeholder="First name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Bairro
                    </label>
                    <Input
                      defaultValue="Otto"
                      id="validationDefault02"
                      placeholder="Last name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Cidade
                    </label>
                    <Input
                      defaultValue="Otto"
                      id="validationDefault02"
                      placeholder="Last name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Estado
                    </label>
                    <Input
                      defaultValue="Mark"
                      id="validationDefault01"
                      placeholder="First name"
                      required
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </div>
              <hr />
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Departamento
                    </label>
                    <Form>
                      <Select2
                        className="form-control"
                        defaultValue="0"
                        options={{
                          placeholder: "Selecione o departamento",
                        }}
                        data={[
                          { id: "0", text: "Selecione o departamento" },
                          { id: "1", text: "Alerts" },
                          { id: "2", text: "Badges" },
                          { id: "3", text: "Buttons" },
                          { id: "4", text: "Cards" },
                          { id: "5", text: "Forms" },
                          { id: "6", text: "Modals" },
                        ]}
                      />
                    </Form>
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Cargo
                    </label>
                    <Form>
                      <Select2
                        className="form-control"
                        defaultValue="0"
                        options={{
                          placeholder: "Selecione o cargo",
                        }}
                        data={[
                          { id: "0", text: "Selecione o cargo" },
                          { id: "1", text: "Alerts" },
                          { id: "2", text: "Badges" },
                          { id: "3", text: "Buttons" },
                          { id: "4", text: "Cards" },
                          { id: "5", text: "Forms" },
                          { id: "6", text: "Modals" },
                        ]}
                      />
                    </Form>
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup
                    className={classnames({
                      focused: focused,
                    })}
                  >
                    <label
                      className="form-control-label"
                      htmlFor="validationDefaultUsername"
                    >
                      Função
                    </label>
                    <Form>
                      <Select2
                        className="form-control"
                        defaultValue="0"
                        options={{
                          placeholder: "Selecione o função",
                        }}
                        data={[
                          { id: "0", text: "Selecione o função" },
                          { id: "1", text: "Alerts" },
                          { id: "2", text: "Badges" },
                          { id: "3", text: "Buttons" },
                          { id: "4", text: "Cards" },
                          { id: "5", text: "Forms" },
                          { id: "6", text: "Modals" },
                        ]}
                      />
                    </Form>
                  </FormGroup>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Exerce líderança?
                    </label>
                    <Row className="mt-3">
                      <Col md="6">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio5"
                            type="radio"
                            name="custom-radio-1"
                            checked={isEmployeeLeader}
                            onClick={handleIsEmployeeLeader}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio5"
                          >
                            Sim
                          </label>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            className="custom-control-input"
                            id="customRadio6"
                            type="radio"
                            name="custom-radio-2"
                            checked={hasEmployeeLeader}
                            onClick={handleHasEmployeeLeader}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio6"
                          >
                            Não
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                {hasEmployeeLeader &&
                  <Col className="mb-3" md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="validationDefault02"
                      >
                        Líder
                      </label>
                      <Form>
                        <Select2
                          className="form-control"
                          defaultValue="0"
                          options={{
                            placeholder: "Selecione o líder",
                          }}
                          data={[
                            { id: "0", text: "Selecione o líder" },
                            { id: "1", text: "Alerts" },
                            { id: "2", text: "Badges" },
                            { id: "3", text: "Buttons" },
                            { id: "4", text: "Cards" },
                            { id: "5", text: "Forms" },
                            { id: "6", text: "Modals" },
                          ]}
                        />
                      </Form>
                    </FormGroup>
                  </Col>
                }
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Tipo de Contrato
                    </label>
                    <Form>
                      <Select2
                        className="form-control"
                        defaultValue="0"
                        options={{
                          placeholder: "Selecione o tipo de contrato",
                        }}
                        data={[
                          { id: "0", text: "Selecione o tipo de contrato" },
                          { id: "1", text: "Alerts" },
                          { id: "2", text: "Badges" },
                          { id: "3", text: "Buttons" },
                          { id: "4", text: "Cards" },
                          { id: "5", text: "Forms" },
                          { id: "6", text: "Modals" },
                        ]}
                      />
                    </Form>
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Modelo de Trabalho
                    </label>
                    <Form>
                      <Select2
                        className="form-control"
                        defaultValue="0"
                        options={{
                          placeholder: "Selecione o modelo de trabalho",
                        }}
                        data={[
                          { id: "0", text: "Selecione o modelo de trabalho" },
                          { id: "1", text: "Alerts" },
                          { id: "2", text: "Badges" },
                          { id: "3", text: "Buttons" },
                          { id: "4", text: "Cards" },
                          { id: "5", text: "Forms" },
                          { id: "6", text: "Modals" },
                        ]}
                      />
                    </Form>
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Data de Admissão
                    </label>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "Date Picker Here",
                      }}
                      timeFormat={false}
                    />
                  </FormGroup>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Hora de Entrada
                    </label>
                    <Input
                      defaultValue="08:00:00"
                      id="example-time-input"
                      type="time"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault02"
                    >
                      Intervalo
                    </label>
                    <Input
                      defaultValue="12:00:00"
                      id="example-time-input"
                      type="time"
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationDefault01"
                    >
                      Horário de Saída
                    </label>
                    <Input
                      defaultValue="18:00:00"
                      id="example-time-input"
                      type="time"
                    />
                  </FormGroup>
                </Col>
              </div>
              <Row>
                <Col md="8" />
                <Col className="d-flex justify-content-end align-items-center" md="4" >
                  <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                    <span className="btn-inner--text">Adicionar Colaborador</span>
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </Form>
  );
}

Dashboard.layout = Enterprise;

export default Dashboard;
