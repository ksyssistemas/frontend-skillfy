import React, { useState, useEffect } from "react";

// reactstrap components
import { 
  Button, 
  Container,
  Modal,
  ModalBody,
  ModalFooter, 
  Row, 
  Col 
} from "reactstrap";

import EditProfile from "../Modals/editEmployeeProfile"

function ProfileHeader() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const [administratorData, setAdministratorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4008/employee/email/col2@gmail.com', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdministratorData(data);
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    };

    fetchData();
  }, []);


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
              <h1 className="display-2 text-white">{administratorData.name}</h1>
              <p className="text-white mt-0 mb-5">
              "Confie no Senhor de todo o seu coração e não se apoie em seu
               próprio entendimento; reconheça o Senhor em todos os seus caminhos, 
               e ele endireitará as suas veredas."
              </p>
              <Button
                className="btn-neutral"
                color="default"
                href="#pablo"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Editar Perfil
                <EditProfile isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ProfileHeader;
