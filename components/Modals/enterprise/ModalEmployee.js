// ModalComponent.js
import React, { useState } from "react";
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    Col,
    Row
} from "reactstrap";

function ModalEmployee({ isOpen, toggle }) {

    //const [administratorData, setAdministratorData] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: ''
    });

    //const [parentName, setParentName] = useState('');

    const handleInputChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    return (
        <Modal toggle={toggle} isOpen={isOpen} size="xl">
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    Cadastrar Colaborador
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
                    <CardBody>
                        <Form>
                            <h6 className="heading-small text-muted mb-4">
                                Informações de departamento
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-department-name"
                                            >
                                                Nome do Departamento
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Nome do Departamento"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-description"
                                            >
                                                Responsável
                                            </label>
                                            <Input
                                                defaultValue={formData.description}
                                                id="input-description"
                                                placeholder="Responsável"
                                                type="text"
                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="9">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-responsible"
                                            >
                                                Descrição
                                            </label>
                                            <Input
                                                defaultValue={formData.responsible}
                                                id="input-responsible"
                                                placeholder="Descrição do departamento"
                                                type="text"
                                                onChange={(e) => handleInputChange('responsible', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-foundation-date"
                                            >
                                                Data de Fundação
                                            </label>
                                            <Input
                                                defaultValue={formData.foundationDate}
                                                id="input-foundation-date"
                                                placeholder="__/__/____"
                                                type="date"
                                                onChange={(e) => handleInputChange('foundationDate', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-budget"
                                            >
                                                Orçamento
                                            </label>
                                            <Input
                                                defaultValue={formData.budget}
                                                id="input-budget"
                                                placeholder="Orçamento"
                                                type="number"
                                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="5">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-localization"
                                            >
                                                Cidade
                                            </label>
                                            <Input
                                                defaultValue={formData.localization}
                                                id="input-localization"
                                                placeholder="Localização"
                                                type="text"
                                                onChange={(e) => handleInputChange('localization', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Tipo de Departamento
                                            </label>
                                            <Input
                                                type="select"
                                                defaultValue={formData.departmentType}
                                                id="select-department-type"
                                                onChange={(e) => handleInputChange('departmentType', e.target.value)}
                                            >
                                                <option value="Público">Público</option>
                                                <option value="Privado">Privado</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <hr className="my-4" />

                            {/* Informções de Cargo*/}

                            <h6 className="heading-small text-muted mb-4">Informações de Cargo</h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Nome do Cargo
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Nome do Cargo"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Nível Hierárquico
                                            </label>
                                            <Input
                                                type="select"
                                                defaultValue={formData.departmentType}
                                                id="select-department-type"
                                                onChange={(e) => handleInputChange('departmentType', e.target.value)}
                                            >
                                                <option value="Público">1</option>
                                                <option value="Privado">2</option>
                                                <option value="Público">3</option>
                                                <option value="Privado">4</option>
                                                <option value="Público">5</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="9">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-department-name"
                                            >
                                                Descrição
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Descrição do cargo"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <hr className="my-4" />

                            {/* Informções do Colaborador*/}

                            <h6 className="heading-small text-muted mb-4">Informações do Colaborador</h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Nome do Colaborador
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Nome do Colaborador"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Sobrenome
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Sobrenome"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Celular
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Celular"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-foundation-date"
                                            >
                                                Data de Admissão
                                            </label>
                                            <Input
                                                defaultValue={formData.foundationDate}
                                                id="input-foundation-date"
                                                placeholder="__/__/____"
                                                type="date"
                                                onChange={(e) => handleInputChange('foundationDate', e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                E-mail
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="E-mail"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Senha
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Senha"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Confirmar Senha
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Confirmar senha"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Horário de Entrada
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Horário de entrada"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Horário de Intervalo
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Horário de Intervalo"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Horário de Saída
                                            </label>
                                            <Input
                                                defaultValue={formData.departmentName}
                                                id="input-department-name"
                                                placeholder="Horário de Saída"
                                                type="text"
                                                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Tipo de contrato
                                            </label>
                                            <Input
                                                type="select"
                                                defaultValue={formData.departmentType}
                                                id="select-department-type"
                                                onChange={(e) => handleInputChange('departmentType', e.target.value)}
                                            >
                                                <option value="Público">CLT</option>
                                                <option value="Privado">PJ</option>
                                                <option value="Público">Temporário</option>
                                                <option value="Privado">Terceiro</option>

                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="select-department-type"
                                            >
                                                Local de Trabalho
                                            </label>
                                            <Input
                                                type="select"
                                                defaultValue={formData.departmentType}
                                                id="select-department-type"
                                                onChange={(e) => handleInputChange('departmentType', e.target.value)}
                                            >
                                                <option value="Público">Interno</option>
                                                <option value="Privado">Externo</option>
                                                <option value="Público">Hibrido</option>
                                                <option value="Privado">Home Office</option>

                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
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

export default ModalEmployee;
