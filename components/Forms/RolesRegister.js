import React, { useState } from "react";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    FormGroup,
    Form,
    Input,
    Row
} from "reactstrap";

function RolesRegister() {

    const [formData, setFormData] = useState({
        companyName: '',
        brandName: '',
        email: '',
        password: '',
        phoneNumber: '',
        webSite: '',
        avatar: '',
    });

    const handleInputChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:4008/enterprise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    companyName: '',
                    brandName: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    webSite: '',
                    avatar: '',
                });
                console.log('Data sent successfully!');
            } else {
                console.error('Error in response:', response.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    const [modalOpen, setModalOpen] = React.useState(false);
    function handleShowJobDescriptionsModal() {
        setModalOpen(!modalOpen)
    }

    const [functionsDescriptionsModalOpen, setfunctionsDescriptionsModalOpen] = React.useState(false);
    function handleShowFunctionsDescriptionsModal() {
        setfunctionsDescriptionsModalOpen(!functionsDescriptionsModalOpen)
    }

    return (
        <Form>
            <Card className="mb-4 bg-white">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Cargo</h3>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="example3cols1Input"
                                >
                                    Nome
                                </label>
                                <Input
                                    id="example3cols1Input"
                                    placeholder="Ex.: Comercial"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="example3cols2Input"
                                >
                                    Reporta ao Cargo
                                </label>
                                <Select2
                                    className="form-control"
                                    defaultValue="0"
                                    options={{
                                        placeholder: "Selecione",
                                    }}
                                    data={[
                                        { id: "0", text: "Selecione um cargo" },
                                        { id: "1", text: "Financeiro" },
                                        { id: "2", text: "Comercial" },
                                        { id: "3", text: "Gestão de Pessoas" }
                                    ]}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="exampleFormControlTextarea1"
                                >
                                    Descrição
                                </label>
                                <Input
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    type="textarea"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4" />
                        <Col className="d-flex justify-content-end align-items-center" md="8" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                                <span className="btn-inner--text">Adicionar Cargo</span>
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className="mb-4 bg-lighter">
                <CardHeader>
                    <h3 className="mb-0">Cadastrar Função</h3>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="example3cols1Input"
                                >
                                    Nome
                                </label>
                                <Input
                                    id="example3cols1Input"
                                    placeholder="Ex.: Assistente Comercial"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="example3cols2Input"
                                >
                                    Reporta ao Cargo
                                </label>
                                <Select2
                                    className="form-control"
                                    defaultValue="0"
                                    options={{
                                        placeholder: "Selecione",
                                    }}
                                    data={[
                                        { id: "0", text: "Selecione um cargo" },
                                        { id: "1", text: "Financeiro" },
                                        { id: "2", text: "Comercial" },
                                        { id: "3", text: "Gestão de Pessoas" }
                                    ]}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="exampleFormControlTextarea1"
                                >
                                    Descrição
                                </label>
                                <Input
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    type="textarea"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4" />
                        <Col className="d-flex justify-content-end align-items-center" md="8" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleSubmit}>
                                <span className="btn-inner--text">Adicionar Função</span>
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Form>
    );
}

export default RolesRegister;
