import React, { useState } from "react";
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row,
} from "reactstrap";

function ModalPlan({ isOpen, toggle }) {

  const handleDeletePlan = (planId) => {
    const updatedDataList = fakeDataList.filter((item) => item.id !== planId);
    setFakeDataList(updatedDataList);
  };
  

  const [fakeDataList, setFakeDataList] = useState([
    { id: 1, name: 'Básico', price: 'R$ 9,99' },
    { id: 2, name: 'Intermediário', price: 'R$ 19,99' },
    { id: 3, name: 'Avançado', price: 'R$ 29,99' },
  ]);
  
  const [planData, setPlanData] = useState({
    planName: '',
    description: '',
    price: '',
  });

  const handleInputChange = (fieldName, value) => {
    setPlanData({ ...planData, [fieldName]: value });
  };

  return (
    <Modal toggle={toggle} isOpen={isOpen} size="lg">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Plano
        </h5>
        <button
          aria-label="Close"
          className="close"
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
                Informações do Plano
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <ListGroup>
                        <ListGroupItem className="font-weight-bold">
                          <Row>
                            <Col className="text-center" lg="6">
                              Tipo do Plano
                            </Col>
                            <Col className="text-center" lg="6">
                              Preço
                            </Col>
                          </Row>
                        </ListGroupItem>
                        {fakeDataList.map((item) => (
                          <ListGroupItem key={item.id}>
                          <Row>
                            <Col className="text-center" lg="6">
                              {item.name}
                            </Col>
                            <Col className="text-center" lg="4">
                              {item.price}
                            </Col>
                            <Col className="text-center" lg="2">
                            <a
                              className="table-action table-action-delete"
                              href="#pablo"
                              //id={`delete${admin.id}`}
                              //onClick={() => deleteAdmin(admin.id)}
                            >
            <i className="fas fa-trash" />
          </a>
                            
                             
                            </Col>
                          </Row>
                        </ListGroupItem>
                        ))}
                      </ListGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
            </Form>
          </CardBody>
        </Card>



        <Card>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">
                Cadastrar Plano
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-plan-name"
                      >
                        Nome do Plano
                      </label>
                      <Input
                        defaultValue={planData.planName}
                        id="input-plan-name"
                        placeholder="Nome do Plano"
                        type="text"
                        onChange={(e) =>
                          handleInputChange('planName', e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-plan-description"
                      >
                        Descrição
                      </label>
                      <Input
                        defaultValue={planData.description}
                        id="input-plan-description"
                        placeholder="Descrição"
                        type="text"
                        onChange={(e) =>
                          handleInputChange('description', e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-plan-price"
                      >
                        Preço
                      </label>
                      <Input
                        defaultValue={planData.price}
                        id="input-plan-price"
                        placeholder="Preço"
                        type="text"
                        onChange={(e) =>
                          handleInputChange('price', e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
            </Form>
          </CardBody>
        </Card>



      </ModalBody>
      <ModalFooter>
        <Button color="secondary" type="button" onClick={toggle}>
          Fechar
        </Button>
        <Button color="primary" type="button">
          Salvar alterações
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalPlan;
