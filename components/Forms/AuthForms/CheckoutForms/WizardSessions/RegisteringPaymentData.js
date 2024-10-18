import React, { useState } from 'react';
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

export function RegisteringPaymentData() {

return (    
    <div>
      <div>
        <h2>Informações de pagamento</h2>
        <div className="custom-control custom-radio mb-4">
          <input
            className="custom-control-input"
            defaultChecked
            id="customRadio6"
            name="custom-radio-1"
            type="radio"
          />
          <label
            className="custom-control-label"
            htmlFor="customRadio6"
          >
            Cartão de crédito
          </label>
        </div>
        <Card className="bg-gradient-default">
          <CardBody>
            <Row className="justify-content-between align-items-center">
              <div className="col">
                <img
                  alt="..."
                  src={require("assets/img/icons/cards/mastercard.png")}
                />
              </div>
              <Col className="col-auto">
                <div className="d-flex align-items-center">
                  <small className="text-white font-weight-bold mr-3">
                    Make default
                  </small>
                  <div>
                    <label className="custom-toggle custom-toggle-white">
                      <input defaultChecked type="checkbox" />
                      <span
                        className="custom-toggle-slider rounded-circle"
                        data-label-off="No"
                        data-label-on="Yes"
                      />
                    </label>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="mt-4">
              <Form className="form-primary" role="form">
                <FormGroup>
                  <InputGroup
                    className={classnames("input-group-alternative mb-3", {
                      focused: nameOnCard,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name on card"
                      type="text"
                      onFocus={(e) => setnameOnCard(true)}
                      onBlur={(e) => setnameOnCard(false)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup
                    className={classnames("input-group-alternative mb-3", {
                      focused: cardNumber,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-credit-card" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Card number"
                      type="text"
                      onFocus={(e) => setcardNumber(true)}
                      onBlur={(e) => setcardNumber(false)}
                    />
                  </InputGroup>
                </FormGroup>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <InputGroup
                        className={classnames(
                          "input-group-alternative mb-3",
                          {
                            focused: date,
                          }
                        )}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="MM/YY"
                          type="text"
                          onFocus={(e) => setdate(true)}
                          onBlur={(e) => setdate(false)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-alternative", {
                          focused: ccv,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="CCV"
                          type="text"
                          onFocus={(e) => setccv(true)}
                          onBlur={(e) => setccv(false)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Button block color="info" type="button">
                  Save new card
                </Button>
              </Form>
            </div>
          </CardBody>
        </Card>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="customRadio5"
            name="custom-radio-1"
            type="radio"
          />
          <label
            className="custom-control-label"
            htmlFor="customRadio5"
          >
            Boleto
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="customRadio5"
            name="custom-radio-1"
            type="radio"
          />
          <label
            className="custom-control-label"
            htmlFor="customRadio5"
          >
            Pix
          </label>
        </div>
      </div>
    </div>
    )

}