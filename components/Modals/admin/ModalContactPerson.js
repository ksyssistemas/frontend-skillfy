// ModalComponent.js
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Form,
  Input,
  Modal,
  ModalBody,
  Row,
  Table,
  ModalFooter
} from "reactstrap";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import useCreateCustomerAccountHolder from '../../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import { useFindAllClientCompany } from '../../../hooks/RecordsHooks/customer/useFindAllClientCompany';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import { ContactPersonContext } from "../../../contexts/RecordsContext/ContactPersonContext";
import { useFindContactPerson } from "../../../hooks/RecordsHooks/contactPerson/useFindContactPerson";

function ModalContactPerson({ handleOpenContactUpdateModal, modalOpen }) {

  const {
    contactPersonIdToUpdate,
    handleContactIdStatusCleanupToUpdate,
    handleContactPersonIdToUpdate,
    hasNewContactRecordCreated,
    handleCreatedContactRecordStatusChange,
    hasUpdatedContactRecord,
    handleUpdatedContactRecordStatusChange,
    hasDeletedContactRecord,
    handleDeletedContactRecordStatusChange,
  } = useContext(ContactPersonContext);

  const {
    firstNameState,
    lastNameState,
    taxIdentificationNumber,
    taxIdentificationNumberState,
    emailAddressState,
    birthdateState,
    password,
    passwordState,
    confirmPasswordState,
    phoneNumber,
    phoneNumberState,
    checkbox,
    checkboxState,
    setCheckbox,
    setCheckboxState,
    setFirstName,
    setFirstNameState,
    setLastName,
    setLastNameState,
    setTaxIdentificationNumber,
    setTaxIdentificationNumberState,
    setEmailAddress,
    setEmailAddressState,
    setPassword,
    setPasswordState,
    setConfirmPassword,
    setConfirmPasswordState,
    setPhoneNumber,
    setPhoneNumberState,
    handleValidateAddCustomerAccountHolderForm,
    handleBirthdateChange,
    validateEmail,
    handleChangeCPF,
    validateCheckboxIsChecked,
    isCustomerAccountHolderFormValidated,
    contactPersonOccupation,
    setContactPersonOccupation,
    contactPersonOccupationState,
    setContactPersonOccupationState,
    contactPersonBelongsToClientCompany,
    setContactPersonBelongsToClientCompany,
    contactPersonBelongsToClientCompanyState,
    setContactPersonBelongsToClientCompanyState
  } = useCreateCustomerAccountHolder();

  const [selectedBelongingToClientCompany, setSelectedBelongingToClientCompany] = useState('');
  // const [clientCompanyDataList, setClientCompanyDataList] = useState([]);
  // const handleClientCompanyDataList = (customerUser) => {
  //   setClientCompanyDataList(customerUser);
  // }

  // useEffect(() => {
  //   if (clientCompanyDataList.length === 0) {
  //     employmentContractDataSearchAndProcess(useFindAllClientCompany, handleClientCompanyDataList, 'client-company', 'EmployeeUserRegister');
  //   }
  // }, []);

  const handleCloseAddAppraisalCycleModal = () => {
    handleOpenAddAppraisalCycleModal();
    reset();
    setSelectePeriod('');
  };

  const [detailedContactPersonData, setDetailedContactPersonData] = useState([]);
  function handleCleanDetailedContactPersonData() {
    setDetailedContactPersonData([]);
  };

  // function handleUpdateAppraisalCycle() {
  //   handleValidateUpdateAppraisalCycleForm(
  //     handleCloseAddAppraisalCycleModal,
  //     cycleIdToUpdate,
  //     cycleTitle,
  //     cyclePeriod,
  //     formattedStartDate,
  //     formattedFinishDate,
  //     cycleObjective,
  //     handleCycleIdToUpdate,
  //     handleCleanDetailedContactPersonData
  //   )
  // }

  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedFinishDate, setFormattedFinishDate] = useState('');

  useEffect(() => {
    const fetchAppraisalCycleById = async () => {
      if (!detailedContactPersonData.length) {
        const foundContact = await useFindContactPerson(contactPersonIdToUpdate);
        //console.log(foundContact);
        // setDetailedContactPersonData(foundContact);s
        // setCycleTitle(foundContact.appraisalNameCycle);
        // updateSelectedPeriod(foundContact.cyclePeriod);
        // setStartDate(new Date(foundContact.appraisalCycleFromDate));
        // setFinishDate(new Date(foundContact.appraisalCycleDueDate));
        // setFormattedStartDate(foundContact.appraisalCycleFromDate);
        // setFormattedFinishDate(foundContact.appraisalCycleDueDate);
        // setCycleObjective(foundContact.cycleAim);
      }
    };

    if (contactPersonIdToUpdate) {
      fetchAppraisalCycleById(contactPersonIdToUpdate);
    }
  }, [contactPersonIdToUpdate]);


  return (
    <Modal toggle={handleOpenContactUpdateModal} isOpen={modalOpen} size="xl">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Editar Pessoa de Contato
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleOpenContactUpdateModal}
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
                    htmlFor="validationContactPersonFirstName"
                  >
                    Nome
                  </label>
                  <Input
                    id="validationContactPersonFirstName"
                    placeholder="Nome"
                    type="text"
                    valid={firstNameState === "valid"}
                    invalid={firstNameState === "invalid"}
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
                    htmlFor="validationContactPersonLastName"
                  >
                    Sobrenome
                  </label>
                  <Input
                    id="validationContactPersonLastName"
                    placeholder="Sobrenome"
                    type="text"
                    valid={lastNameState === "valid"}
                    invalid={lastNameState === "invalid"}
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
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationContactPersonTaxIdNumber"
                  >
                    CPF
                  </label>
                  <InputMask
                    placeholder='999.999.999-99'
                    mask="999.999.999-99"
                    maskChar="_"
                    value={taxIdentificationNumber}
                    onChange={(e) => handleChangeCPF(e.target.value)}
                  >
                    {(inputProps) => <Input {...inputProps} id="validationContactPersonTaxIdNumber" invalid={taxIdentificationNumberState === "invalid"} />}
                  </InputMask>
                  <div className="invalid-feedback">
                    {taxIdentificationNumberState === "invalid" && "Forneça um número de CPF válido."}
                  </div>
                </Col>
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationContactPersonBirthdate"
                  >
                    Data de Nascimento
                  </label>
                  <ReactDatetime
                    inputProps={{
                      placeholder: "__/__/__",
                    }}
                    timeFormat={false}
                    onChange={handleBirthdateChange}

                  />
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationContactPersonPhoneNumber"
                  >
                    Número de Telefone
                  </label>
                  <InputMask
                    placeholder='+55 (99) 9 9999-9999'
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
                    {(inputProps) => <Input {...inputProps} id="validationContactPersonPhoneNumber" type="text" valid={phoneNumberState === "valid"} invalid={phoneNumberState === "invalid"} />}
                  </InputMask>
                  <div className="invalid-feedback">
                    É necessário preencher este campo.
                  </div>
                </Col>
                <Col className="mb-4" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationContactPersonEmailAddress"
                  >
                    E-mail
                  </label>
                  <Input
                    aria-describedby="inputGroupPrepend"
                    id="validationContactPersonEmailAddress"
                    placeholder="Endereço de e-mail"
                    type="email"
                    valid={emailAddressState === "valid"}
                    invalid={emailAddressState === "invalid"}
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
              </div>
              {/* <Row>
                <Col md="4" />
                <Col className="d-flex justify-content-end align-items-center" md="8" >
                  <Button className="px-5" color="primary" size="lg" type="button" onClick={() => handleValidateAddCustomerAccountHolderForm(true)}>
                    <span className="btn-inner--text">Adicionar</span>
                  </Button>
                </Col>
              </Row> */}
            </CardBody>
          </Card>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="button"
        //onClick={handleOpenAddAppraisalCycleModal}
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

ModalContactPerson.defaultProps = {
  handleOpenContactUpdateModal: () => { },
  modalOpen: false,
};

ModalContactPerson.propTypes = {
  handleOpenContactUpdateModal: PropTypes.func,
  modalOpen: PropTypes.bool,
};


export default ModalContactPerson;
