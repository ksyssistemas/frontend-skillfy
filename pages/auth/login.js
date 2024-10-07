import React, { useContext, useState } from "react";
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
  Label
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
// import AuthHeader from "components/Headers/AuthHeader.js";
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { EmployeeContext } from "../../contexts/RecordsContext/EmployeeContext";

function Login() {

  const { handleCustomerIdToLinkToEmployee } = useContext(EmployeeContext);

  const router = useRouter();

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTHENTICATION}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        const data = await response.json();
        console.log("DADOS DE LOGIN: ", data);
        handleSaveAuthenticationDataLoggedInUser(data);
        handleCustomerIdToLinkToEmployee(data.data.id);

        let redirectUrl = `${process.env.NEXT_PUBLIC_HOME_PAGE}`;

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
            redirectUrl = `${process.env.NEXT_PUBLIC_HOME_PAGE}/default`;
        }

        //redirectUrl += `?id=${data.data.id}&sector=${encodeURIComponent(data.data.sector)}`;
        router.push(redirectUrl); // Redireciona o usuário para a nova rota

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
    <div className="bg-white">
    <section 
      style={{
      backgroundImage: `url(${require("assets/img/brand/login-background-image10.png")})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      // backgroundSize: 'contain'
    }}>
    {/* <AuthHeader title="" lead="" /> */}
      <div className="d-flex align-items-center justify-content-center" style={{height:'100vh'}}>
      <Container>
        <Row>
          <Col md="6">
            <Col md="10">
              <Card className="bg-white border-0 mb-0 mt-3">
                <CardBody className="px-lg-5 py-lg-4">
                  <Row className="justify-content-center mb-5 pt-3">
                    <img
                      alt="..."
                      src={require("assets/img/brand/skillfy-logo-login.png")}
                    />
                  </Row>
                  <Form role="form">
                    {erro && <p>{erro}</p>}
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: focusedEmail,
                      })}
                    >
                      <Label for="emailInput">Login</Label>
                      <InputGroup className="input-group-merge input-group-alternative border border-primary">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          id="emailInput"
                          placeholder="E-mail"
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
                      <Label for="emailInput">Senha</Label>
                      <InputGroup className="input-group-merge input-group-alternative border border-primary">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          id="senhaInput"
                          placeholder="Senha"
                          type="password"
                          onFocus={() => setfocusedPassword(true)}
                          onBlur={() => setfocusedPassword(true)}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
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
                    </div> */}
                    <Row className="justify-content-between mt--3 ml-1 mr-1">
                      <div className="d-flex align-items-center">
                        <a
                            className="text-muted text-indigo"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          <small>Esqueci minha senha</small>
                        </a>
                      </div>
                      <div className="text-right">
                        <Button className="my-4 rounded-pill border-0 bg-indigo text-white" type="button" onClick={handleSubmit}>
                          Entrar
                        </Button>
                      </div>
                    </Row>
                  </Form>
                  {/** End form */}
                </CardBody>
              </Card>
            </Col>
          </Col>
          <Col md="6" className="d-none d-md-block d-lg-block">
            <img
              alt="..."
              src={require("assets/img/brand/icon-login.png")}
            />
          </Col>
        </Row>
      </Container>
      </div>
      </section>
      </div>
    </>
  );
}

Login.layout = Auth;

export default Login;
