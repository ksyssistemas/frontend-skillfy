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

export function LegalEntityRegistration() {

  const [firstName, setfirstName] = React.useState("Mark");
  const [firstNameState, setfirstNameState] = React.useState(null);
  const [checkbox, setcheckbox] = React.useState(false);
  const [checkboxState, setcheckboxState] = React.useState(null);

return(   
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
    )

}