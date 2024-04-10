import React, { useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardFooter,
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
import { useAuth } from '../../hooks/useAuth';

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [erro, setErro] = useState('');

  const { handleSaveAuthenticationDataLoggedInUser } = useAuth();

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };


  const handleSubmit = async () => {

    try {
      const response = await fetch('http://dlist.com.br:3009/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        let redirectUrl = 'http://dlist.com.br:9001';

        switch (data.role) {
          case 'administrator':
            console.log('Redirecionando para o painel do administrador');
            redirectUrl += '/dashboard/admin';
            break;
          case 'customer':
            console.log('Redirecionando para o painel da empresa');
            redirectUrl += '/dashboard/customer';
            break;
          case 'employee':
            console.log('Redirecionando para o perfil do funcionário');
            redirectUrl += '/employee/profile';
            break;
          default:
            console.log('Redirecionando para a página padrão');
            redirectUrl = 'http://dlist.com.br:9001/default';
        }

        handleSaveAuthenticationDataLoggedInUser(data);

       

        redirectUrl += `?id=${data.data.id}&sector=${encodeURIComponent(data.data.sector)}`;
        

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
      console.error('Erro durante a requisição:', error);
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


              <CardBody className="px-lg-5 py-lg-5">

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
              <CardFooter className="text-center">
                <Row className="mt-3">
                  <Col xs="12">
                    <a
                      className="text-muted"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <small>Esqueceu sua senha?</small>
                    </a>
                  </Col>
                </Row>
              </CardFooter>
            </Card>

          </Col>
        </Row>
      </Container>
    </>
  );
}

Login.layout = Auth;

export default Login;
