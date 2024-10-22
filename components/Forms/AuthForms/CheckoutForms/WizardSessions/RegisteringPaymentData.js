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

  const [nameOnCard, setnameOnCard] = React.useState("");
  const [nameOnCardState, setnameOnCardState] = React.useState(null);
  const [cardNumber, setcardNumber] = React.useState("");
  const [cardNumberState, setcardNumerState] = React.useState(null);
  const [date, setdate] = React.useState("");
  const [dateState, setdateState] = React.useState(null);
  const [cvv, setcvv] = React.useState("");
  const [cvvState, setcvvState] = React.useState(null);

  const [paymentMethod, setPaymentMethod] = React.useState('credit-card');

return (    
    <div>
      <div>
        <h2>Informações de pagamento</h2>
        <Form className="needs-validation" role="form">
            <div className="custom-control custom-radio mb-4">
            <input
              className="custom-control-input"
              value="credit-card"
              checked={paymentMethod === 'credit-card'}
              id="customRadio6"
              name="payment-method"
              type="radio"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="custom-control-label" htmlFor="customRadio6">
              Cartão de Crédito
            </label>
          </div>
              <div>
                  <div className="form-row">
                    <Col className="mb-3" md="6">
                      <label
                        className="form-control-label"
                        htmlFor="namecard"
                      >
                        Nome no cartão
                      </label>
                      <Input 
                        value={nameOnCard}
                        id='namecard'
                        placeholder="Nome no cartão"
                        type="text"
                        valid={nameOnCardState === "valid"}
                        invalid={nameOnCardState === "invalid"}
                        onChange={(e) => {
                          setnameOnCard(e.target.value);
                          if (e.target.value === "") {
                            setnameOnCardState("invalid");
                          } else {
                            setnameOnCardState("valid");
                          }
                        }}
                      />
                      <div className="valid-feedback">Parece bom!</div>
                    </Col>
                    <Col className="mb-3" md="6">
                      <label
                        className="form-control-label"
                        htmlFor="numbercard"
                      >
                        Número do cartão
                      </label>
                      <Input 
                        value={cardNumber}
                        id='numbercard'
                        placeholder="Número do cartão"
                        type="text"
                        valid={cardNumberState === "valid"}
                        invalid={cardNumberState === "invalid"}
                        onChange={(e) => {
                          setcardNumber(e.target.value);
                          if (e.target.value === "") {
                            setcardNumerState("invalid");
                          } else {
                            setcardNumerState("valid");
                          }
                        }}
                      />
                    </Col>
                    <div className="valid-feedback">Parece bom!</div>
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
                        value={date}
                        id='datecard'
                        placeholder="MM/AA"
                        type="text"
                        valid={dateState === "valid"}
                        invalid={dateState === "invalid"}
                        onChange={(e) => {
                          setdate(e.target.value);
                          if (e.target.value === "") {
                            setdateState("invalid");
                          } else {
                            setdateState("valid");
                          }
                        }}
                      />
                    </Col>
                    <div className="valid-feedback">Parece bom!</div>
                    <Col className="mb-3" md="6">
                      <label
                        className="form-control-label"
                        htmlFor="cvvcard"
                      >
                        CVV
                      </label>
                      <Input 
                        value={cvv}
                        id='cvvcard'
                        placeholder="XXXX"
                        type="text"
                        valid={cvvState === "valid"}
                        invalid={cvvState === "invalid"}
                        onChange={(e) => {
                          setcvv(e.target.value);
                          if (e.target.value === "") {
                            setcvvState("invalid");
                          } else {
                            setcvvState("valid");
                          }
                        }}
                      />
                    </Col>
                    <div className="valid-feedback">Parece bom!</div>
                  </div>
                
              </div>
              <div className="custom-control custom-radio mb-4">
                <input
                  className="custom-control-input"
                  value="boleto"
                  checked={paymentMethod === 'boleto'}
                  id="customRadio7"
                  name="payment-method"
                  type="radio"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="custom-control-label" htmlFor="customRadio7">
                  Boleto
                </label>
              </div>
              <div className="custom-control custom-radio mb-4">
                <input
                  className="custom-control-input"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  id="customRadio8"
                  name="payment-method"
                  type="radio"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="custom-control-label" htmlFor="customRadio8">
                  Pix
                </label>
              </div>
        </Form>
      </div>
    </div>
    )
}