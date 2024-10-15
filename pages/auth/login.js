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
import "assets/css/styles/login.css"
import useEmailValidation from '../../hooks/RecordsHooks/useEmailValidation';

function Login() {

  const { handleCustomerIdToLinkToEmployee } = useContext(EmployeeContext);

  const router = useRouter();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailForgot, setEmailForgot] = useState(false);
  const [formLogin, setFormLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    tempCode: ''
  });

  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState('');

  const { handleSaveAuthenticationDataLoggedInUser } = useAuth();

  const { email, setEmail, emailSuccess, emailError, loading, validateEmailFormat, validateEmailInSystem } = useEmailValidation();

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const sendEmail = async () => {
    if (formData.email == '') {
      setErro(
        <Alert color="warning" style={{ textAlign: 'center' }}>
          <strong>E-mail é obrigatório</strong>
        </Alert>
      );
      return;
    }

    if (!validateEmailFormat(formData.email)) {
      setErro(
        <Alert color="warning" style={{ textAlign: 'center' }}>
          <strong>Formato de e-mail inválido</strong>
        </Alert>
      );
      return;
    }

    const isEmailValid = await validateEmailInSystem(formData.email);
    if (isEmailValid) {
      console.log('Enviar email de recuperação para:', formData.email);
      setFormLogin(false);
      setForgotPassword(true);
      setEmailForgot(false);
      setErro(false);
      setSuccess(
        <Alert color="success" style={{ textAlign: 'center' }}>
        <strong>{emailSuccess}</strong>
      </Alert>
      )
    }
  }

  const handleSubmit = async () => {
    if (forgotPassword){
      // logica para fazer a rec de senha
      if (!formData.tempCode) {
        setErro(
          <Alert color="warning" style={{ textAlign: 'center' }}>
            <strong>Código temporário é obrigatório</strong>
          </Alert>
        );
        return;
      }

      if (formData.newPassword == '') {
        setErro(
          <Alert color="warning" style={{ textAlign: 'center' }}>
            <strong>Campo senha é obrigatório</strong>
          </Alert>
        );
        return;
      }
  
      if (formData.newPassword !== formData.confirmNewPassword) {
        setErro(
          <Alert color="warning" style={{ textAlign: 'center' }}>
            <strong>As senhas não coincidem</strong>
          </Alert>
        );
        return;
      }
      
      setFormData({ ...formData, password: '', newPassword: '', confirmNewPassword: '' });
    } else {
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

  }};


  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);

  return (
    <>
      <div className="bg-image-login bg-white">
        <section 
          style={{
          backgroundImage: `url(${require("assets/img/brand/login-background-image.png")})`,
        }}
        >
          <div className="d-flex align-items-center justify-content-center" style={{height:'100vh'}}>
            <Container>
              <Col>
                <Row>
                  <Col sm = "12" md="12" lg = "6">
                  <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <Col sm = "10" md="10" lg = "10">
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
                            {formLogin &&(
                              <>
                                <FormGroup
                                  className={classnames("mb-3", {
                                    focused: focusedEmail,
                                  })}
                                >
                                  <Label for="emailInput">Login</Label>
                                  <InputGroup className="input-group-merge input-group-alternative border border-purple-sk">
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
                                  <InputGroup className="input-group-merge input-group-alternative border border-purple-sk">
                                    <Input
                                      id="senhaInput"
                                      placeholder="Senha"
                                      type="password"
                                      onFocus={() => setfocusedPassword(true)}
                                      // onBlur={() => setfocusedPassword(true)}
                                      onChange={(e) => handleInputChange('password', e.target.value)}
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </>
                            )}
                              <>
                              {emailForgot && (
                                <FormGroup className="mb-3">
                                  <p className="text-center text-sm mt--3">Com este email informado você irá receber um código secreto para redefinir sua senha.</p>
                                  <Label for="emailInput">E-mail para recuperação</Label>
                                  <InputGroup className="input-group-merge input-group-alternative border border-purple-sk">
                                        <Input
                                          id="emailInput"
                                          placeholder="Digite seu e-mail"
                                          type="email"
                                          value={formData.email}
                                          onChange={(e) => handleInputChange('email', e.target.value)}
                                          disabled={loading}
                                        />
                                  </InputGroup>
                                  {!loading && emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                                  {loading && <p>Verificando e-mail...</p>}
                                </FormGroup>
                              )}
                                {forgotPassword && (
                                  <>
                                    {/* <Alert color="success" style={{ textAlign: 'center' }}>
                                      <strong>{emailSuccess}</strong>
                                    </Alert> */}
                                    <FormGroup className="mb-3">
                                      <Label for="tempCodeInput">Código Temporário</Label>
                                      <InputGroup className="input-group-merge input-group-alternative border border-purple-sk">
                                        <Input
                                          id="tempCodeInput"
                                          placeholder="Digite o código temporário"
                                          type="text"
                                          value={formData.tempCode} 
                                          onChange={(e) => handleInputChange('tempCode', e.target.value)} 
                                        />
                                      </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="newPasswordInput">Nova senha</Label>
                                      <Input className="input-group-merge input-group-alternative border border-purple-sk"
                                        id="newPasswordInput"
                                        placeholder="Nova senha"
                                        type="password"
                                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="confirmNewPasswordInput">Confirme a nova senha</Label>
                                      <Input className="input-group-merge input-group-alternative border border-purple-sk"
                                        id="confirmNewPasswordInput"
                                        placeholder="Confirme a nova senha"
                                        type="password"
                                        onChange={(e) => handleInputChange('confirmNewPassword', e.target.value)}
                                      />
                                    </FormGroup>
                                  </>
                                )}
                              </>
                            <Row className="justify-content-between mt-3 mr-1 ml-1">
                              {!emailForgot && !forgotPassword && (
                                <div className="d-flex align-items-center">
                                  <a
                                    className="text-purple-sk"
                                    href="#pablo"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setEmailForgot(true);
                                      setFormLogin(false);
                                      setErro(false);
                                    }}
                                  >
                                    <small>Esqueci minha senha</small>
                                  </a>
                                </div>
                              )}
                              {emailForgot && (
                                <div className="d-flex align-items-center">
                                  <a
                                    className="text-purple-sk"
                                    href="#pablo"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setFormLogin(true);
                                      setForgotPassword(false);
                                      setEmailForgot(false);
                                      setErro(false);
                                    }}
                                  >
                                  <small>Voltar</small>
                                </a>
                              </div>
                              )}
                              {forgotPassword && (
                                <div className="d-flex align-items-center">
                                  <a
                                    className="text-purple-sk"
                                    href="#pablo"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setFormLogin(true);
                                      setForgotPassword(false);
                                      setEmailForgot(false);
                                      setErro(false);
                                    }}
                                  >
                                  <small>Voltar</small>
                                </a>
                              </div>
                              )}
                              {emailForgot && (
                                <div className="text-right">
                                <Button
                                  className="my-4 rounded-pill border-0 bg-purple-sk text-white"
                                  type="button"
                                  onClick={sendEmail}
                                >
                                  Enviar
                                </Button>
                              </div>
                              )}
                              {!emailForgot && (
                              <div className="text-right">
                                <Button
                                  className="my-4 rounded-pill border-0 bg-purple-sk text-white"
                                  type="button"
                                  onClick={handleSubmit}
                                >
                                  {forgotPassword ? "Redefinir" : "Entrar"}
                                </Button>
                              </div>
                              )}
                            </Row>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                    </div>
                  </Col>
                  <Col md="6" className="d-none d-sm-none d-md-none d-lg-block">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <img
                        alt="..."
                        src={require("assets/img/brand/icon-login.png")}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Container>
          </div>
        </section>
      </div>
    </>
  );
}

Login.layout = Auth;

export default Login;
