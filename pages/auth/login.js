import React, { useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [erro, setErro] = useState('');

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3006/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        let redirectUrl = 'http://localhost:3000';
  
        switch (data.role) {
          case 'administrator':
            redirectUrl += '/register/dashboard';
            break;
          case 'enterprise':
            redirectUrl += 'enterprise';
            break;
          case 'employee':
            redirectUrl += '/employee/profile';
            break;
          default:
            redirectUrl = 'http://localhost:3000/default';
        }
  
        redirectUrl += `?id=${data.data.id}`;
  
        window.location.href = redirectUrl;
      } else {
        if (response.status === 404) {
          setErro(
            <Alert color="warning" style={{ textAlign: 'center' }}>
              <strong>Usuário não encontrado</strong>
            </Alert>
          );
        } 
      }
    } catch (error) {
      setErro(
        <Alert color="danger" style={{ textAlign: 'center' }}>
          <strong>Erro na requisição:</strong> Houve um problema ao processar sua solicitação.
        </Alert>
      );
    }
  };
  
  
  


  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  return (
    <>
      <AuthHeader
        title="Bem-vindo!"
        lead="Conecte-se de forma verdadeira com as pessoas e desperte o seu maior potencial."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Entrar com</small>
                </div>
                <div className="btn-wrapper text-center">
                  
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/google.svg")}
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader>
              
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Ou faça login com credenciais</small>
                </div>

                {/** begin form */}

                <Form role="form">
                {erro && <p>{erro}</p>}
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Senha"
                        type="password"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Lembre de mim</span>
                    </label>
                  </div>
                  <div className="text-center">
                  <Button className="my-4" color="info" type="button" onClick={handleSubmit}>
                    Entrar
                    </Button>


                  </div>
                </Form>
                  {/** End form */}

              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Esqueceu sua senha?</small>
                </a>
              </Col>
             
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Login.layout = Auth;

export default Login;
