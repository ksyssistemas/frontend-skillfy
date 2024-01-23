
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
      <Container fluid>
        <footer className="footer pt-0">
          <Row className="align-items-center justify-content-lg-between">
            <Col lg="6">
              <div className="copyright text-center text-lg-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  href="#"
                  target="_blank"
                >
                  Twig | todos os direitos reservados
                </a>
              </div>
            </Col>
            <Col lg="6">
              <Nav className="nav-footer justify-content-center justify-content-lg-end">
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    Política de Privacidade
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    Termos de Uso
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    Licença
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    Suporte
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
}

export default RegisterFooter;
