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
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import { CheckoutFormWrapper } from '../../components/Forms/AuthForms/CheckoutForms/CheckoutFormWrapper';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AuthFooter from "components/Footers/RegisterFooter.js";


function Checkout() {
  // const [focused, setFocused] = React.useState(false);
  // const [firstName, setfirstName] = React.useState("Mark");
  // const [firstNameState, setfirstNameState] = React.useState(null);
  // const [lastName, setlastName] = React.useState("Otto");
  // const [lastNameState, setlastNameState] = React.useState(null);
  // const [username, setusername] = React.useState("");
  // const [usernameState, setusernameState] = React.useState(null);
  // const [city, setcity] = React.useState("");
  // const [cityState, setcityState] = React.useState(null);
  // const [state, setstate] = React.useState("");
  // const [stateState, setstateState] = React.useState(null);
  // const [zip, setzip] = React.useState("");
  // const [zipState, setzipState] = React.useState(null);
  // const [checkbox, setcheckbox] = React.useState(false);
  // const [checkboxState, setcheckboxState] = React.useState(null);
  // const validateCustomStylesForm = () => {
  //   if (firstName === "") {
  //     setfirstNameState("invalid");
  //   } else {
  //     setfirstNameState("valid");
  //   }
  //   if (lastName === "") {
  //     setlastNameState("invalid");
  //   } else {
  //     setlastNameState("valid");
  //   }
  //   if (username === "") {
  //     setusernameState("invalid");
  //   } else {
  //     setusernameState("valid");
  //   }
  //   if (city === "") {
  //     setcityState("invalid");
  //   } else {
  //     setcityState("valid");
  //   }
  //   if (state === "") {
  //     setstateState("invalid");
  //   } else {
  //     setstateState("valid");
  //   }
  //   if (zip === "") {
  //     setzipState("invalid");
  //   } else {
  //     setzipState("valid");
  //   }
  //   if (checkbox === false) {
  //     setcheckboxState("invalid");
  //   } else {
  //     setcheckboxState("valid");
  //   }
  // };
  const [step, setStep] = useState(1);

  // const [nameOnCard, setnameOnCard] = React.useState(false);
  // const [cardNumber, setcardNumber] = React.useState(false);
  // const [date, setdate] = React.useState(false);
  // const [ccv, setccv] = React.useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  return (
    <>
      <IndexNavbar />
        <div 
            style={{
            width: "100%",
            height: "400px",
            backgroundColor: "#57249F",
            clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
            marginBottom: "-350px",
            zIndex: "-10",
          }}
        >
        </div>
        <div className='bg-white'>
        <Container className='mt--9'>
          <CheckoutFormWrapper>
        
        </CheckoutFormWrapper>
      </Container>
      </div>
      <AuthFooter />
    </>
  );
}

Checkout.layout = Auth;

export default Checkout;
