import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
  ModalFooter,
  Button
} from 'reactstrap';

//import hookFormData from "../../Hooks/hookFormData"
import mockFormData from '../../Mocks/mockFormData';

import AdminList from "../Tables/Adm/AdminList"

const AdminRegistrationForm = () => {

  const headers = Object.keys(mockFormData);

  return (

    <>
      <CardBody>
        <Form>
          <h6 className="heading-small text-muted mb-4">
            Cadastrar Adm
          </h6>
          <div className="pl-lg-4">
            <Row>
              {headers.map((label, index) => (
                <Col lg="4" key={index}>
                  <FormGroup>
                    <label className="form-control-label" htmlFor={`input-${label}`}>
                      {label}
                    </label>
                    <Input
                      id={`input-${label}`}
                      placeholder={label}
                      type={label === 'birthdate' ? 'date' : 'text'}
                      //value={formData[label]}
                      onChange={(e) => handleInputChange(label, e.target.value)}
                    />
                  </FormGroup>
                </Col>
              ))}


              <ModalFooter>
                <Button color="primary" type="button">
                  Salvar (Mock)
                </Button>
              </ModalFooter>


            </Row>
          </div>

        </Form>

      </CardBody>

    </>





  );
};

export default AdminRegistrationForm;