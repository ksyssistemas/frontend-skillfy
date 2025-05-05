import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Row, Col } from "reactstrap";

function ProfileEmployeeHeader({employeeName, employeeProfileCoverText}) {
  return (
    <>
      <div
        className="header pb-6 d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundImage:
            'url("' + require("assets/img/theme/profile-cover.jpg") + '")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-dark opacity-8" />

        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Olá {employeeName}</h1>
              <p className="text-white mt-0 mb-5">
                {employeeProfileCoverText}
              </p>
              <Button
                className="btn-neutral"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Editar perfil
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

ProfileEmployeeHeader.propTypes = {
  employeeName: 'Desconhecido',
  employeeProfileCoverText: "This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks.",
};

ProfileEmployeeHeader.propTypes = {
  employeeName: PropTypes.string,
  employeeProfileCoverText: PropTypes.string,
};

export default ProfileEmployeeHeader;
