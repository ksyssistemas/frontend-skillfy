// ModalComponent.js
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row
} from "reactstrap";
import PropTypes from "prop-types";
import { AdminContext } from "../../../contexts/RecordsContext/AdminContext";
import useCreateAdmin from "../../../hooks/RecordsHooks/admin/useCreateAdmin";
import { useFindAdmin } from "../../../hooks/RecordsHooks/admin/useFindAdmin";
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import { handleDateFormatting } from "../../../util/handleDateFormatting";

function ModalAdmin({ handleOpenAdminUpdateModal, modalOpen }) {

  const { adminIdToUpdate,
    handleAdminIdStatusCleanupToUpdate,
    handleAdminIdToUpdate
  } = useContext(AdminContext);

  const {
    firstName,
    setFirstName,
    firstNameState,
    setFirstNameState,
    lastName,
    setLastName,
    lastNameState,
    setLastNameState,
    emailAddress,
    setEmailAddress,
    emailAddressState,
    setEmailAddressState,
    birthdate,
    setBirthdate,
    birthdateState,
    setBirthdateState,
    password,
    setPassword,
    passwordState,
    setPasswordState,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordState,
    setConfirmPasswordState,
    phoneNumber,
    setPhoneNumber,
    phoneNumberState,
    setPhoneNumberState,
    adminStatus,
    setAdminStatus,
    adminStatusState,
    setAdminStatusState,
    adminPrivilege,
    setAdminPrivilege,
    adminPrivilegeState,
    setAdminPrivilegeState,
    handleValidateAddAdminForm,
    handleBirthdateChange,
    validateEmail
  } = useCreateAdmin();


  function handleUpdateAdmin() {
    handleValidateUpdateAdminForm(
      handleCloseAddAdminModal,
      adminIdToUpdate,
      firstName,
      lastName,
      emailAddress,
      formattedBirthdate,
      password,
      confirmPassword,
      phoneNumber,
      adminStatus,
      adminPrivilege,
      handleCycleIdToUpdate,
      handleCleanDetailedAdminData
    )
  }

  const [formattedBirthdate, setFormattedBirthdate] = useState('');

  const [detailedAdminData, setDetailedAdminData] = useState([]);
  function handleCleanDetailedAdminData() {
    setDetailedAdminData([]);
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!detailedAdminData.length) {
        const foundAdmin = await useFindAdmin(adminIdToUpdate);
        console.log("foundAdmin: ", foundAdmin);
        setDetailedAdminData(foundAdmin);
        setFirstName(foundAdmin.name);
        setLastName(foundAdmin.lastname);
        setBirthdate(new Date(foundAdmin.birthdate));
        setFormattedBirthdate(foundAdmin.birthdate);
        setEmailAddress(foundAdmin.email);
        //setPassword(foundAdmin.AdminDueDate);
        setPhoneNumber(foundAdmin.phone);
        setAdminStatus(foundAdmin.status);
        setAdminPrivilege(foundAdmin.privileges);
      }
    };

    if (adminIdToUpdate) {
      fetchAdmin();
    }
  }, [adminIdToUpdate]);

  return (
    <Modal toggle={handleOpenAdminUpdateModal} isOpen={modalOpen} size="xl">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Editar Administrador
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleOpenAdminUpdateModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Form className="needs-validation" noValidate>
          <Card>
            <CardBody>
              <div className="form-row">
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationFirstName"
                  >
                    Nome
                  </label>
                  <Input
                    id="validationFirstName"
                    placeholder="Nome"
                    type="text"
                    valid={firstNameState === "valid"}
                    invalid={firstNameState === "invalid"}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (e.target.value === "") {
                        setFirstNameState("invalid");
                      } else {
                        setFirstNameState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    É necessário preencher este campo.
                  </div>
                </Col>
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomLastName"
                  >
                    Sobrenome
                  </label>
                  <Input
                    id="validationCustomLastName"
                    placeholder="Sobrenome"
                    type="text"
                    valid={lastNameState === "valid"}
                    invalid={lastNameState === "invalid"}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (e.target.value === "") {
                        setLastNameState("invalid");
                      } else {
                        setLastNameState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    É necessário preencher este campo.
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="8">
                  <label
                    className="form-control-label"
                    htmlFor="validationEmailAddress"
                  >
                    Email
                  </label>
                  <Input
                    aria-describedby="inputGroupPrepend"
                    id="validationEmailAddress"
                    placeholder="Endereço de e-mail"
                    type="email"
                    valid={emailAddressState === "valid"}
                    invalid={emailAddressState === "invalid"}
                    value={emailAddress}
                    onChange={(e) => {
                      const email = e.target.value;
                      setEmailAddress(email);
                      if (validateEmail(email)) {
                        setEmailAddressState("valid");
                      } else {
                        setEmailAddressState("invalid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    {emailAddressState === "invalid" && "Forneça um endereço de e-mail válido."}
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="validationBirthdate"
                    >
                      Data de Nascimento
                    </label>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "__/__/__",
                      }}
                      timeFormat={false}
                      value={adminIdToUpdate ? birthdate : null}
                      onChange={(e) => adminIdToUpdate ? handleDateFormatting(e, setBirthdate, setBirthdateState, setFormattedBirthdate) : handleDateFormatting(e, setBirthdate, setBirthdateState)}
                    />
                    {/* <div className="invalid-feedback">
                                    É necessário selecionar uma data.
                                </div> */}
                  </FormGroup>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-4" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationPassword"
                  >
                    Senha
                  </label>
                  <Input
                    id="validationPassword"
                    placeholder="Senha de acesso ao sistema"
                    type="password"
                    valid={passwordState === "valid"}
                    invalid={passwordState === "invalid"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value === "") {
                        setPasswordState("invalid");
                      } else {
                        setPasswordState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    É necessário preencher este campo.
                  </div>
                </Col>
                <Col className="mb-4" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationConfirmPassword"
                  >
                    Confirmar Senha
                  </label>
                  <Input
                    id="validationConfirmPassword"
                    placeholder="Confirme a senha digitada"
                    type="password"
                    valid={confirmPasswordState === "valid"}
                    invalid={confirmPasswordState === "invalid"}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value === "") {
                        setConfirmPasswordState("invalid");
                      } else if (e.target.value === password) {
                        setConfirmPasswordState("valid");
                      } else {
                        setConfirmPasswordState("invalid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    {confirmPasswordState === "invalid" && "As senhas não coincidem."}
                  </div>
                </Col>
                <Col className="mb-4" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationPhoneNumber"
                  >
                    Número de Telefone
                  </label>
                  <InputMask
                    placeholder="+55 (99) 9 9999-9999"
                    mask="+55 (99) 9 9999-9999"
                    maskChar=" "
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (e.target.value === "") {
                        setPhoneNumberState("invalid");
                      } else {
                        setPhoneNumberState("valid");
                      }
                    }}
                  >
                    {(inputProps) => <Input {...inputProps} id="validationPhoneNumber" type="text" valid={phoneNumberState === "valid"} invalid={phoneNumberState === "invalid"} />}
                  </InputMask>
                  <div className="invalid-feedback">
                    É necessário preencher este campo.
                  </div>
                </Col>
              </div>
            </CardBody>
          </Card>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={handleOpenAdminUpdateModal}
        >
          Fechar
        </Button>
        <Button
          color={'warning'}
          type="button"
        // onClick={
        //   cycleIdToUpdate
        //     ? () => handleUpdateAppraisalCycle()
        //     : () => handleValidateAddAppraisalCycleForm(handleCloseAddAppraisalCycleModal)
        // }
        >
          {'Editar Contato'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

ModalAdmin.defaultProps = {
  handleOpenAdminUpdateModal: () => { },
  modalOpen: false,
};

ModalAdmin.propTypes = {
  handleOpenAdminUpdateModal: PropTypes.func,
  modalOpen: PropTypes.bool,
};

export default ModalAdmin;
