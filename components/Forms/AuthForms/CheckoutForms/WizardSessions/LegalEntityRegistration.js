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

  const [firstName, setfirstName] = React.useState("");
  const [firstNameState, setfirstNameState] = React.useState(null);

  const [cnpj, setcnpj] = React.useState("");
  const [cnpjState, setcnpjState] = React.useState(null);
  const [nameEnterprise, setnameEnterprise] = React.useState("");
  const [nameEnterpriseState, setnameEnterpriseState] = React.useState(null);
  const [razao, setrazao] = React.useState("");
  const [razaoState, setrazaoState] = React.useState(null);
  const [segmento, setsegmento] = React.useState("");
  const [segmentoState, setsegmentoState] = React.useState(null);
  const [telefoneEnterprise, setTelefoneEnterprise] = React.useState("");
  const [telefoneEnterpriseState, setTelefoneEnterpriseState] = React.useState(null);
  const [celularEnterprise, setcelularEnterprise] = React.useState("");
  const [celularEnterpriseState, setcelularEnterpriseState] = React.useState(null);
  const [cep, setcep] = React.useState("");
  const [cepState, setcepState] = React.useState(null);
  const [estado, setestado] = React.useState("");
  const [estadoState, setestadoState] = React.useState(null);
  const [address, setaddress] = React.useState("");
  const [addressState, setaddressState] = React.useState(null);
  const [number, setnumber] = React.useState("");
  const [numberState, setnumberState] = React.useState(null);
  const [complemento, setcomplemento] = React.useState("");
  const [complementoState, setcomplementoState] = React.useState(null);
  const [bairro, setbairro] = React.useState("");
  const [bairroState, setbairroState] = React.useState(null);
  const [cidade, setcidade] = React.useState("");
  const [cidadeState, setcidadeState] = React.useState(null);

return(   
   <div>
      <div>
        <h2>Informe os dados da sua empresa (serão usados para cobrança)</h2>
        <Form className="needs-validation" role="form">
          <div className="form-row">
            <Col className="mb-3" md="6">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
              >
                CNPJ
              </label>
              <Input
                value={cnpj}
                id="validationCustom01"
                placeholder="xxx.xxx.xxx/xxxx-xx"
                type="text"
                valid={cnpjState === "valid"}
                invalid={cnpjState === "invalid"}
                onChange={(e) => {
                  setcnpj(e.target.value);
                  if (e.target.value === "") {
                    setcnpjState("invalid");
                  } else {
                    setcnpjState("valid");
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
                Nome da Empresa
              </label>
              <Input
                value={nameEnterprise}
                id="validationCustom01"
                placeholder="Nome popular de título de estabelecimento"
                type="text"
                valid={nameEnterpriseState === "valid"}
                invalid={nameEnterpriseState === "invalid"}
                onChange={(e) => {
                  setnameEnterprise(e.target.value);
                  if (e.target.value === "") {
                    setnameEnterpriseState("invalid");
                  } else {
                    setnameEnterpriseState("valid");
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
                Razão Social
              </label>
              <Input
                value={razao}
                id="validationCustom01"
                placeholder="Nome ou termo de registro"
                type="text"
                valid={razaoState === "valid"}
                invalid={razaoState === "invalid"}
                onChange={(e) => {
                  setrazao(e.target.value);
                  if (e.target.value === "") {
                    setrazaoState("invalid");
                  } else {
                    setrazaoState("valid");
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
                Segmento
              </label>
              <Input
                value={segmento}
                id="validationCustom01"
                placeholder="MEI, EI, LTDA, SA, ..."
                type="text"
                valid={segmentoState === "valid"}
                invalid={segmentoState === "invalid"}
                onChange={(e) => {
                  setsegmento(e.target.value);
                  if (e.target.value === "") {
                    setsegmentoState("invalid");
                  } else {
                    setsegmentoState("valid");
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
                value={telefoneEnterprise}
                id="validationCustom01"
                placeholder="+55 (xx) xxxx-xxxx"
                type="text"
                valid={telefoneEnterpriseState === "valid"}
                invalid={telefoneEnterpriseState === "invalid"}
                onChange={(e) => {
                  setTelefoneEnterprise(e.target.value);
                  if (e.target.value === "") {
                    setTelefoneEnterpriseState("invalid");
                  } else {
                    setTelefoneEnterpriseState("valid");
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
                Celular
              </label>
              <Input
                value={celularEnterprise}
                id="validationCustom01"
                placeholder="+55 (xx) x xxxxx-xxxx"
                type="text"
                valid={celularEnterpriseState === "valid"}
                invalid={celularEnterpriseState === "invalid"}
                onChange={(e) => {
                  setcelularEnterprise(e.target.value);
                  if (e.target.value === "") {
                    setcelularEnterpriseState("invalid");
                  } else {
                    setcelularEnterpriseState("valid");
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
                CEP
              </label>
              <Input
                value={cep}
                id="validationCustom01"
                placeholder="xxxxx-xxx"
                type="text"
                valid={cepState === "valid"}
                invalid={cepState === "invalid"}
                onChange={(e) => {
                  setcep(e.target.value);
                  if (e.target.value === "") {
                    setcepState("invalid");
                  } else {
                    setcepState("valid");
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
                Estado
              </label>
              <Input
                value={estado}
                id="validationCustom01"
                placeholder="Estado"
                type="text"
                valid={estadoState === "valid"}
                invalid={estadoState === "invalid"}
                onChange={(e) => {
                  setestado(e.target.value);
                  if (e.target.value === "") {
                    setestadoState("invalid");
                  } else {
                    setestadoState("valid");
                  }
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
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
                value={address}
                id="validationCustom01"
                placeholder="Rua, Avenida..."
                type="text"
                valid={addressState === "valid"}
                invalid={addressState === "invalid"}
                onChange={(e) => {
                  setaddress(e.target.value);
                  if (e.target.value === "") {
                    setaddressState("invalid");
                  } else {
                    setaddressState("valid");
                  }
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
            </Col>
            <Col className="mb-3" md="4">
              <label
                className="form-control-label"
                htmlFor="validationCustom01"
              >
                Número
              </label>
              <Input
                value={number}
                id="validationCustom01"
                placeholder="xxxx"
                type="text"
                valid={numberState === "valid"}
                invalid={numberState === "invalid"}
                onChange={(e) => {
                  setnumber(e.target.value);
                  if (e.target.value === "") {
                    setnumberState("invalid");
                  } else {
                    setnumberState("valid");
                  }
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
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
                value={complemento}
                id="validationCustom01"
                placeholder="xxxx"
                type="text"
                valid={complementoState === "valid"}
                invalid={complementoState === "invalid"}
                onChange={(e) => {
                  setcomplemento(e.target.value);
                  if (e.target.value === "") {
                    setcomplementoState("invalid");
                  } else {
                    setcomplementoState("valid");
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
                Bairro
              </label>
              <Input
                value={bairro}
                id="validationCustom01"
                placeholder="Bairro"
                type="text"
                valid={bairroState === "valid"}
                invalid={bairroState === "invalid"}
                onChange={(e) => {
                  setbairro(e.target.value);
                  if (e.target.value === "") {
                    setbairroState("invalid");
                  } else {
                    setbairroState("valid");
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
                Cidade
              </label>
              <Input
                value={cidade}
                id="validationCustom01"
                placeholder="Cidade"
                type="text"
                valid={cidadeState === "valid"}
                invalid={cidadeState === "invalid"}
                onChange={(e) => {
                  setcidade(e.target.value);
                  if (e.target.value === "") {
                    setcidadeState("invalid");
                  } else {
                    setcidadeState("valid");
                  }
                }}
              />
              <div className="valid-feedback">Parece bom!</div>
            </Col>
          </div>
        </Form>
      </div>
    </div>
    )

}