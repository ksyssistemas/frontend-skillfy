// ModalComponent.js
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  Label,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row
} from "reactstrap";

import {
  estadosBrasileiros,
  paises,
  capitaisBrasileiras
} from "../../../mocks/mockStateBr"

import useCNPJ from "../../../hooks/useCNPJ"

function ModalEnterprise({ isOpen, toggle }) {

  const [formData, setFormData] = useState({
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    email: '',
    senha: '',
    confirmar_senha: '',
    web_site: '',
    numero_contato: ''
  });

  const { data: enterpriseData, loading, error } = useCNPJ(formData.cnpj);

  useEffect(() => {
    // Atualize o formData com os dados da empresa quando eles estiverem disponíveis
    if (enterpriseData) {
      setFormData({
        cnpj: enterpriseData.cnpj,
        razao_social: enterpriseData.razao_social,
        nome_fantasia: enterpriseData.nome_fantasia,
        email: enterpriseData.email,
        senha: '',  // Não está claro se você deve preencher senhas aqui, considere como tratá-las
        confirmar_senha: '',
        web_site: enterpriseData.web_site,
        numero_contato: enterpriseData.ddd_telefone_1
      });
    }
  }, [enterpriseData]);

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };


  return (
    <Modal toggle={toggle} isOpen={isOpen} size="xl">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Cadastrar Empresa
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={toggle}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>



      {/** Modal Body */}
      <ModalBody>

        {/** card enterprise info */}
        <Card>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">
                Informação da empresa
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        CNPJ
                      </label>
                      <Input
                        defaultValue={formData.cnpj}
                        id="input-first-name"
                        placeholder="CNPJ"
                        type="text"
                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="5">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Razão social
                      </label>
                      <Input
                        defaultValue={formData.razao_social}
                        id="input-last-name"
                        placeholder="Razão Social"
                        type="text"
                        onChange={(e) => handleInputChange('razao_social', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Nome Fantasia
                      </label>
                      <Input
                        defaultValue={formData.nome_fantasia}
                        id="input-email"
                        placeholder="Nome Fantasia"
                        type="email"
                        onChange={(e) => handleInputChange('nome_fantasia', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        E-mail
                      </label>
                      <Input
                        defaultValue={formData.email}
                        id="input-email"
                        placeholder="E-mail"
                        type="email"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Senha
                      </label>
                      <Input
                        defaultValue={formData.senha}
                        id="input-first-name"
                        placeholder="Senha"
                        type="password"
                        onChange={(e) => handleInputChange('senha', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Confirmar Senha
                      </label>
                      <Input
                        defaultValue={formData.confirmar_senha}
                        id="input-first-name"
                        placeholder="Confirmar Senha"
                        type="password"
                        onChange={(e) => handleInputChange('confirmar_senha', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Web Site
                      </label>
                      <Input
                        defaultValue={formData.web_site}
                        id="input-password"
                        placeholder="Web Site"
                        type="password"
                        onChange={(e) => handleInputChange('web_site', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-phone"
                      >
                        Número de Contato
                      </label>
                      <Input
                        defaultValue={formData.numero_contato}
                        id="input-phone"
                        placeholder="Número de Contato"
                        type="text"
                        onChange={(e) => handleInputChange('numero_contato', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Form>

          </CardBody>
        </Card>

        {/** card address info */}
        <Card>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">
                Informação do endereço
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        CEP
                      </label>
                      <Input
                        defaultValue={formData.name}
                        id="input-first-name"
                        placeholder="CEP"
                        type="text"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label className="form-control-label bold-text" htmlFor="select-state">
                        Estado
                      </Label>
                      <Input
                        type="select"
                        name="select"
                        id="select-state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      >
                        <option value="">Selecione o estado</option>
                        {estadosBrasileiros.map((estado, index) => (
                          <option key={index} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col lg="5">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Cidade
                      </label>
                      <Input
                        defaultValue={formData.email}
                        id="input-email"
                        placeholder="Cidade"
                        type="select"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      >
                        <option value="">Selecione a cidade</option>
                        {capitaisBrasileiras.map((cidade, index) => (
                          <option key={index} value={cidade}>
                            {cidade}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        País
                      </label>
                      <Input
                        defaultValue={formData.email}
                        id="input-email"
                        placeholder="Pais"
                        type="select"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      >
                        <option value="">Selecione o país</option>
                        {paises.map((pais, index) => (
                          <option key={index} value={pais}>
                            {pais}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Número
                      </label>
                      <Input
                        defaultValue={formData.name}
                        id="input-first-name"
                        placeholder="Número"
                        type="text"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Complemento
                      </label>
                      <Input
                        defaultValue={formData.name}
                        id="input-first-name"
                        placeholder="Complemento"
                        type="text"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Form>

          </CardBody>
        </Card>


      </ModalBody>
      {/** End:: MOdalBody */}


      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={toggle}
        >
          Fechar
        </Button>
        <Button color="primary" type="button">
          Salvar alterações
        </Button>
      </ModalFooter>


    </Modal>

  );
}

export default ModalEnterprise;
