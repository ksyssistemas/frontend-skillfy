import React, { useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

//import ModalAdm from "../Modals/admin/ModalAdm";
import ModalEnterprise from "../Modals/admin/ModalEnterprise";
import ModalEmployee from "../Modals/enterprise/ModalEmployee"

function RegisterHeader({ name, parentName }) {
  const [modalAdmOpen, setModalAdmOpen] = React.useState(false);
  const [modalEnterpriseOpen, setModalEnterpriseOpen] = React.useState(false);
  const [modalEmployeeOpen, setModalEmployeeOpen] = React.useState(false);

  return (
    <>
      <div className="header header-dark bg-dark pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                  {name}
                </h6>{" "}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-lg-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
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
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                <Button
                  className="btn-neutral"
                  color="default"
                  size="sm"
                  onClick={() => setModalAdmOpen(!modalAdmOpen)}
                >
                  Cadastrar Admin
                </Button>
                {/* <ModalAdm isOpen={modalAdmOpen} toggle={() => setModalAdmOpen(!modalAdmOpen)} /> */}

                <Button
                  className="btn-neutral"
                  color="default"
                  size="sm"
                  onClick={() => setModalEnterpriseOpen(!modalEnterpriseOpen)}
                >
                  Cadastrar Empresa
                </Button>
                <ModalEnterprise
                  isOpen={modalEnterpriseOpen}
                  toggle={() => setModalEnterpriseOpen(!modalEnterpriseOpen)}
                />
                <Button
                  className="btn-neutral"
                  color="default"
                  size="sm"
                  onClick={() => setModalEmployeeOpen(!modalEnterpriseOpen)}
                >
                  Cadastrar Colaborador
                </Button>
                <ModalEmployee
                  isOpen={modalEmployeeOpen}
                  toggle={() => setModalEmployeeOpen(!modalEmployeeOpen)}
                />

              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}


RegisterHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default RegisterHeader;
