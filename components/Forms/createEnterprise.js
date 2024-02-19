import React from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    ModalFooter,
    Input,
    Row,
    Label,
} from 'reactstrap';

const EnterpriseRegistrationForm = ({ formData, handleInputChange }) => {
    return (
        <>
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
                                            defaultValue={formData.name}
                                            id="input-first-name"
                                            placeholder="CNPJ"
                                            type="text"
                                            onChange={(e) => handleInputChange('name', e.target.value)}
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
                                            defaultValue={formData.lastname}
                                            id="input-last-name"
                                            placeholder="Razão Social"
                                            type="text"
                                            onChange={(e) => handleInputChange('lastname', e.target.value)}
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
                                            defaultValue={formData.email}
                                            id="input-email"
                                            placeholder="Nome Fantasia"
                                            type="email"
                                            onChange={(e) => handleInputChange('email', e.target.value)}
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
                                            defaultValue={formData.name}
                                            id="input-first-name"
                                            placeholder="Senha"
                                            type="password"
                                            onChange={(e) => handleInputChange('name', e.target.value)}
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
                                            defaultValue={formData.name}
                                            id="input-first-name"
                                            placeholder="Confirmar Senha"
                                            type="password"
                                            onChange={(e) => handleInputChange('name', e.target.value)}
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
                                            defaultValue={formData.password}
                                            id="input-password"
                                            placeholder="Web Site"
                                            type="password"
                                            onChange={(e) => handleInputChange('password', e.target.value)}
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
                                            defaultValue={formData.phone}
                                            id="input-phone"
                                            placeholder="Número de Contato"
                                            type="text"
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Form>

                </CardBody>
            </Card>

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
                                            type="email"
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
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
                                            Pais
                                        </label>
                                        <Input
                                            defaultValue={formData.email}
                                            id="input-email"
                                            placeholder="Pais"
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

                        <ModalFooter>
                            <Button color="secondary" type="button">
                                Fechar
                            </Button>
                            <Button color="primary" type="button">
                                Salvar alterações
                            </Button>
                        </ModalFooter>

                    </Form>
                </CardBody>
            </Card>
        </>
    );
};

export default EnterpriseRegistrationForm;
