// ModalComponent.js
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, Button, Col, Row } from "reactstrap";

function EditProfile({ isOpen, toggle }) {

  return (
    <Modal toggle={toggle} isOpen={isOpen} size="lg">
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Editar Perfil
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
        <ModalBody>
        <Card>
                {/** Begin CardHead Edit Profile
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Editar Perfil</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
                End CardHead Edit Profile*/}

              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                  Informação do usuário
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Como prefere ser chamado
                          </label>
                          <Input
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email 
                          </label>
                          <Input
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nome
                          </label>
                          <Input
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Sobrenome
                          </label>
                          <Input
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Informações de contato
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Rua
                          </label>
                          <Input
                            defaultValue="Digite o nome da rua"
                            id="input-address"
                            placeholder="Digite o nome da Rua"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Cidade
                          </label>
                          <Input
                            defaultValue="Blumenau"
                            id="input-city"
                            placeholder="Cidade"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Pais
                          </label>
                          <Input
                            defaultValue="Brasil"
                            id="input-country"
                            placeholder="Pais"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Cep
                          </label>
                          <Input
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">Sobre mim</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label className="form-control-label">Sobre mim</label>
                      <Input
                        placeholder="Uma breve descrição sobre você"
                        rows="4"
                        type="textarea"
                        defaultValue="Uma breve descrição sobre você"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
        </ModalBody>
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

export default EditProfile;
