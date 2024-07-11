/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavLink,
} from "reactstrap";
import Link from "next/link";

function AppraisalSettingsHeader(
  {
    view,
    sonName,
    name,
    parentName,
    firstButtonText,
    firstButtonIcon,
    onFirstButtonClick,
    secondButtonText,
    secondButtonIcon,
    onSecondButtonClick,
    onDropdownItemClick,
  }) {
  return (
    <>
      <div style={{ backgroundColor: '#562f9f' }} className="header header-dark pb-6 content__title content__title--calendar">
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
                  {
                    sonName && (
                      <BreadcrumbItem aria-current="page" className="active">
                        {sonName}
                      </BreadcrumbItem>
                    )
                  }
                </Breadcrumb>
              </Col>
              <Col className="text-right" lg="6" xs="5">

                {/* {
                  firstButtonText && (
                    <Button
                      className="btn-neutral"
                      color=""
                      href="#pablo"
                      size="sm"
                      onClick={onFirstButtonClick}
                    >
                      <span
                        className="btn-inner--icon"
                      >
                        <i className="ni ni-bullet-list-67 mr-2" />
                      </span>
                      {firstButtonText}
                    </Button>
                  )
                } */}
                {
                  firstButtonText && view === 'default' ? (
                    <Nav className="d-inline-flex">
                      <Link href="/performance/add-appraisal">
                        <NavLink href="#pablo">
                          <Button
                            className="btn-neutral"
                            color=""
                            href="#pablo"
                            size="sm"
                          >
                            <span
                              className="btn-inner--icon"
                            >
                              <i className={firstButtonIcon} />
                            </span>
                            {firstButtonText}
                          </Button>
                        </NavLink>
                      </Link>
                    </Nav>
                  ) : (firstButtonText && view !== 'default' && (
                    <Button
                      className="btn-neutral"
                      color=""
                      href="#pablo"
                      size="sm"
                      onClick={onFirstButtonClick}
                    >
                      <span
                        className="btn-inner--icon"
                      >
                        <i className={firstButtonIcon} />
                      </span>
                      {firstButtonText}
                    </Button>
                  ))
                }
                {
                  secondButtonText && view !== 'default' ? (
                    <UncontrolledDropdown className="mx-1">
                      <DropdownToggle
                        className="btn-neutral btn-fixed-width"
                        color=""
                        href="#pablo"
                        size="sm"
                      >
                        <span className="btn-inner--icon">
                          <i className={secondButtonIcon} />
                        </span>
                        {secondButtonText}
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem href="#pablo" onClick={(e) => { e.preventDefault(); onDropdownItemClick('skillClassification'); }}>
                          Classificação de Competências
                        </DropdownItem>
                        <DropdownItem href="#pablo" onClick={(e) => { e.preventDefault(); onDropdownItemClick('occupationalGroup'); }}>
                          Grupo Ocupacional
                        </DropdownItem>
                        <DropdownItem href="#pablo" onClick={(e) => { e.preventDefault(); onDropdownItemClick('skillTypes'); }}>
                          Tipos de Competência
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (secondButtonText && view === '' && (
                    <Button
                      className="btn-neutral"
                      color=""
                      href="#pablo"
                      size="sm"
                      onClick={onSecondButtonClick}
                    >
                      <span
                        className="btn-inner--icon"
                      >
                        <i className={secondButtonIcon} />
                      </span>
                      {secondButtonText}
                    </Button>
                  ))
                }
                <Button
                  className="btn-neutral"
                  color=""
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Filtros
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

AppraisalSettingsHeader.propTypes = {
  view: null,
  sonName: null,
  name: null,
  parentName: null,
  firstButtonText: null,
  firstButtonIcon: null,
  secondButtonText: null,
  secondButtonIcon: null,
  onFirstButtonClick: () => { },
  onSecondButtonClick: () => { },
  onDropdownItemClick: () => { },
};

AppraisalSettingsHeader.propTypes = {
  view: PropTypes.string,
  sonName: PropTypes.string,
  name: PropTypes.string,
  parentName: PropTypes.string,
  firstButtonText: PropTypes.string,
  firstButtonIcon: PropTypes.string,
  onFirstButtonClick: PropTypes.func,
  secondButtonText: PropTypes.string,
  secondButtonIcon: PropTypes.string,
  onSecondButtonClick: PropTypes.func,
  onDropdownItemClick: PropTypes.func,

};

export default AppraisalSettingsHeader;
