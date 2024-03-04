import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

//import CreateAdm from "../Modals/admin/ModalAdm"
import mockPlans from "../../mocks/mockPlans"

function CardsHeader({ name, parentName }) {

  //const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <div className="header bg-lighter pb-6">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="h2 text-dark d-inline-block mb-0">{name}</h6>{" "}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-md-4"
                  listClassName="breadcrumb-links breadcrumb-light"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {parentName}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    {name}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
              {/**
               *    <Col className="text-right" lg="6" xs="5">
                <Button
                className="btn-neutral"
                color="default"
                href="#pablo"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Cadastrar Empresa
                <CreateAdm isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
              </Button>
               * 
               */}


              {/**Begin::Filters 
                <Button
                  className="btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Filters
                </Button>
                End::Filters 
                
              </Col> */}
            </Row>

            <Row>
              {mockPlans.map((plan) => (
                <Col key={plan.id} md="6" xl="3">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            {plan.name}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{plan.value}</span>
                        </div>
                        <Col className="col-auto">
                          <div className={`icon icon-shape ${plan.color} text-white rounded-circle shadow`}>
                            <i className={plan.icon} />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Desde o último mês</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
