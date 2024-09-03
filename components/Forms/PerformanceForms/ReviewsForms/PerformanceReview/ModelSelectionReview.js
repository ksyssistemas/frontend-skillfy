import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import { ModelSelectionReviewContext } from "../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";

export function ModelSelectionReview() {

    const { selectedReview,
        handleSelectedReview,
        handleCleanlinessReviewSelection } = useContext(ModelSelectionReviewContext);

    return (
        <Form>
            <Row>
                <div className="col">
                    <div className="card-wrapper">
                        <Card>

                            <CardHeader>
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0 ">Avaliação de Desempenho</h3>
                                    </Col>
                                    {/* <Col className="text-right" xs="4">
                        <Button
                          className="btn-outline-primary"
                          color=""
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="lg"
                        >
                          <span
                            className="btn-inner--icon"
                          >
                            <i className="ni ni-settings-gear-65 mr-2" />
                          </span>
                          <span>Definir Configurações de Avaliação</span>
                        </Button>
                      </Col> */}
                                </Row>
                            </CardHeader>

                            <CardBody>
                                <p className="mb-0">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <hr />
                                <h6 className="heading-small text-muted mb-4">
                                    Selecione o Tipo de Avaliação
                                </h6>
                                <div className="form-row">
                                    <Col className="mb-3" md="4">

                                        <Card>
                                            <CardBody>
                                                <ListGroup className="mx--4 my--4" flush={false}>
                                                    <ListGroupItem
                                                        className="list-group-item-action flex-column align-items-start bg-indigo"
                                                        href="#pablo"
                                                        onClick={() => handleSelectedReview('360')}
                                                        tag="a"
                                                    >
                                                        <h4 className="mb-1 text-white">Avaliação 360°</h4>
                                                        <p className="text-sm mb-0 text-light">
                                                            Doasdnec id elit non mi porta gravida at eget metus.
                                                            Maecenas sed diam eget risus varius blandit.
                                                        </p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </CardBody>
                                        </Card>

                                    </Col>

                                    <Col className="mb-3" md="4">

                                        <Card>
                                            <CardBody>
                                                <ListGroup className="mx--4 my--4" flush={false}>
                                                    <ListGroupItem
                                                        className="list-group-item-action flex-column align-items-start bg-purple"
                                                        href="#pablo"
                                                        onClick={() => handleSelectedReview('180')}
                                                        tag="a"
                                                    >
                                                        <h4 className="mb-1 text-white">Avaliação 180°</h4>
                                                        <p className="text-sm mb-0 text-light">
                                                            Doasdnec id elit non mi porta gravida at eget metus.
                                                            Maecenas sed diam eget risus varius blandit.
                                                        </p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </CardBody>
                                        </Card>

                                    </Col>

                                    <Col className="mb-3" md="4">

                                        <Card>
                                            <CardBody>
                                                <ListGroup className="mx--4 my--4" flush={false}>
                                                    <ListGroupItem
                                                        className="list-group-item-action flex-column align-items-start bg-lighter"
                                                        href="#pablo"
                                                        onClick={() => handleSelectedReview('leader')}
                                                        tag="a"
                                                    >
                                                        <h4 className="mb-1 text-indigo">Avaliação Líder/Liderado</h4>
                                                        <p className="text-sm mb-0 text-purple">
                                                            Doasdnec id elit non mi porta gravida at eget metus.
                                                            Maecenas sed diam eget risus varius blandit.
                                                        </p>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </CardBody>
                                        </Card>

                                    </Col>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Row>
        </Form>
    );
}