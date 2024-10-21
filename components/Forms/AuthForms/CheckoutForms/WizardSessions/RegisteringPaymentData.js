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

  const [nameOnCard, setnameOnCard] = React.useState(false);
  const [cardNumber, setcardNumber] = React.useState(false);
  const [date, setdate] = React.useState(false);
  const [ccv, setccv] = React.useState(false);

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
            <Row className="justify-content-between align-items-center">
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
            <div>
              <Form className="needs-validation" role="form" noValidate>
                <div className="form-row">
                  <Col className="mb-3" md="6">
                    <label
                      className="form-control-label"
                      htmlFor="namecard"
                    >
                      Nome no cartão
                    </label>
                    <Input 
                      className={classnames({
                        focused: nameOnCard,
                      })}
                      id='namecard'
                      placeholder="Nome no cartão"
                      type="text"
                      onFocus={(e) => setnameOnCard(true)}
                      onBlur={(e) => setnameOnCard(false)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </Col>
                  <Col className="mb-3" md="6">
                    <label
                      className="form-control-label"
                      htmlFor="numbercard"
                    >
                      Número do cartão
                    </label>
                    <Input 
                      className={classnames({
                        focused: cardNumber,
                      })}
                      id='numbercard'
                      placeholder="Número do cartão"
                      type="text"
                      onFocus={(e) => setcardNumber(true)}
                      onBlur={(e) => setcardNumber(false)}
                    />
                  </Col>
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="form-row">
                 <Col className="mb-3" md="6">
                    <label
                      className="form-control-label"
                      htmlFor="datecard"
                    >
                      Vencimento
                    </label>
                    <Input 
                      className={classnames({
                        focused: date,
                      })}
                      id='datecard'
                      placeholder="MM/AA"
                      type="text"
                      onFocus={(e) => setdate(true)}
                      onBlur={(e) => setdate(false)}
                    />
                  </Col>
                  <div className="valid-feedback">Looks good!</div>
                  <Col className="mb-3" md="6">
                    <label
                      className="form-control-label"
                      htmlFor="cvvcard"
                    >
                      CVV
                    </label>
                    <Input 
                      className={classnames({
                        focused: ccv,
                      })}
                      id='cvvcard'
                      placeholder="XXXX"
                      type="text"
                      onFocus={(e) => setccv(true)}
                      onBlur={(e) => setccv(false)}
                    />
                  </Col>
                  <div className="valid-feedback">Looks good!</div>
                </div>
              </Form>
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