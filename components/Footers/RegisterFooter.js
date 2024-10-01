
import React from "react";

// reactstrap components
import {
  Nav,
  NavItem,
  NavLink,  
  Container, 
  Row, 
  Col
 } from "reactstrap";

function RegisterFooter() {
  return (
    <>
    <section className="bg-orange-sk">
      <Container>
        <footer className="footer pt-0 py-4 bg-orange-sk">
            <Row className="align-items-center justify-content-lg-between mt-1">
              <Col lg="6">
                <div className="copyright text-center text-lg-left text-muted text-white">
                <img
                    alt="..."
                    src={require("assets/img/brand/skillfy-logo-white.png")}
                  />
                </div>
              </Col>
              <Col lg="6">
                <Nav className="nav-footer justify-content-center justify-content-lg-end">
                  <NavItem>
                    <NavLink
                      href="/auth/pricing"
                      target="#"
                    >
                      <span className="nav-link-inner--text text-white">Planos</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/auth/login"
                      target="#"
                      color="white"
                    >
                    <span className="nav-link-inner--text text-white">Sobre a SkillFy</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
            <hr className="bg-white" />
            <Row className="align-items-center justify-content-lg-between mb-2 ml-1">
              <Nav className="nav-footer justify-content-center justify-content-lg-start">
                <NavItem>
                  <span className="description text-white text-sm">(47) 3222-4555 - (47) 98765-4321</span>
                </NavItem>
              </Nav>
            </Row>
            <Row className="align-items-center justify-content-lg-between ml-1">
              <Nav className="nav-footer justify-content-center justify-content-lg-start">
                <NavItem>
                  <span className="text-white">Rua João da Silva, Nº 2, Sala 206, Centro, Blumenau/SC</span>
                </NavItem>
              </Nav>
              <Col lg="6">
                <Nav className="nav-footer justify-content-center justify-content-lg-end">
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#"
                      id="tooltip601201423"
                      target="_blank"
                    >
                      <img
                        alt="..."
                        src={require("assets/img/icons/social/WhatsApp.png")}
                      />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#"
                      id="tooltip871243015"
                      target="_blank"
                    >
                      <img
                        alt="..."
                        src={require("assets/img/icons/social/Instagram.png")}
                      />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#"
                      id="tooltip366258619"
                      target="_blank"
                    >
                      <img
                        alt="..."
                        src={require("assets/img/icons/social/Youtube.png")}
                      />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#"
                      id="tooltip601201423"
                      target="_blank"
                      >
                      <img
                        alt="..."
                        src={require("assets/img/icons/social/Facebook.png")}
                      />
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
        </footer>
      </Container>
      </section>
    </>
  );
}

export default RegisterFooter;
