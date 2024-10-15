import React from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";


function AboutusHeader() {

    return (
        <>
            <div className="header-body">
                <section className="bg-purple-sk">
                    <Container fluid>
                        <Row className="justify-content-center text-center">
                            <img
                                alt="..."
                                className="img-fluid"
                                src={require("assets/img/brand/people-aboutus.png")}
                            />
                        </Row>
                    </Container>
                </section>
                <section>
                    <Container>
                        <Col className="mt--6">
                            <Row>
                                <Col className="col-8 mt--9">
                                    <h2 className="display-3 text-white text-outline-right-purple">
                                        Acreditamos que o bem mais valioso das empresas são as pessoas.
                                    </h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2 className="display-3 text-white text-outline-right-orange mt--5">
                                        Bem-vindo a SkillFy
                                    </h2>
                                </Col>
                            </Row>
                        </Col>
                    </Container>
                    {/* <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon points="2560 0 2560 100 0 100" fill="#e1dce8" /> 
                        </svg>
                    </div> */}
                </section>
            </div>
            
        </>
    );
}

export default AboutusHeader;
