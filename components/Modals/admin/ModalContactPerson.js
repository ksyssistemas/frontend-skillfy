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
import useUpdateContactPerson from "../../../hooks/RecordsHooks/contactPerson/useUpdateContactPerson";
import ContactPersonUpdate from "../../Forms/AdministratorForms/ContactPersonUpdate";

function ModalContactPerson(
  {
    handleShowContactPersonDetailsModal,
    selectedIdToShowContactPersonDetails,
    handleCleaningSelectedIdToShowContactPersonDetails,
    handleOpenContactModal,
    modalOpen,
    contactPersonName,
    handleCleaningContactPersonNameStatus,
    companyNameToModalDetails,
    handleCleaningCompanyNameToModalDetails
  }
) {

  const {
    contactPersonIdToUpdate,
    handleContactIdStatusCleanupToUpdate,
    handleContactPersonIdToUpdate,
    isShouldUpdateContactPerson,
    handleIsShouldUpdateContactPerson,
  } = useContext(ContactPersonContext);

  const {
    firstName,
    setFirstName,
    firstNameState,
    setFirstNameState,
    lastName,
    setLastName,
    lastNameState,
    setLastNameState,
    taxIdentificationNumber,
    setTaxIdentificationNumber,
    taxIdentificationNumberState,
    setTaxIdentificationNumberState,
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
    contactStatus,
    setContactStatus,
    contactStatusState,
    setContactStatusState,
    checkbox,
    setCheckbox,
    checkboxState,
    setCheckboxState,
    isCustomerAccountHolderFormValidated,
    setIsCustomerAccountHolderFormValidated,
    validateCheckboxIsChecked,
    handleBirthdateChange,
    handleChangeCPF,
    validateEmail,
    handleValidateAddCustomerAccountHolderForm,
    resetCreateCustomer,
    contactPersonOccupation,
    setContactPersonOccupation,
    contactPersonOccupationState,
    setContactPersonOccupationState,
    contactPersonBelongsToClientCompany,
    setContactPersonBelongsToClientCompany,
    contactPersonBelongsToClientCompanyState,
    setContactPersonBelongsToClientCompanyState,
  } = useCreateCustomerAccountHolder();

  const { handleValidateUpdateCustomerAccountHolderForm } = useUpdateContactPerson();

  const handleCloseAddAppraisalCycleModal = () => {
    handleOpenContactModal();
    resetCreateCustomer();
  };

  const [detailedContactPersonData, setDetailedContactPersonData] = useState([]);
  function handleCleanDetailedContactPersonData() {
    setDetailedContactPersonData([]);
  };

  function handleCloseContactDetailsModal() {
    handleCleaningSelectedIdToShowContactPersonDetails();
    handleCleaningContactPersonNameStatus();
    handleOpenContactModal();
    handleCleaningCompanyNameToModalDetails();
  }

  function handleCloseContactUpdateModal() {
    handleContactIdStatusCleanupToUpdate();
    handleCleaningContactPersonNameStatus();
    handleOpenContactModal();
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const year = adjustedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (detailedContactPersonData.length <= 0) {
          const foundContact = await useFindContactPerson(selectedIdToShowContactPersonDetails);
          setDetailedContactPersonData(foundContact);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedIdToShowContactPersonDetails]);

  function handleUpdateContactPersonUpdate() {
    handleIsShouldUpdateContactPerson();
  }

  const commonProps = {
    handleShowContactPersonDetailsModal,
    handleOpenContactModal,
    modalOpen,
    contactPersonName,
    handleCleaningContactPersonNameStatus,
    companyNameToModalDetails,
    handleCleaningCompanyNameToModalDetails
  };

  return (
    <Modal
      toggle={handleOpenContactModal}
      isOpen={modalOpen}
      size="xl"
      key={selectedIdToShowContactPersonDetails ? selectedIdToShowContactPersonDetails : contactPersonIdToUpdate}
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          {
            contactPersonName
              ? `Informações de ${contactPersonName}`
              : (
                contactPersonIdToUpdate && contactPersonName
                  ? `Editar informações de ${contactPersonName}`
                  : 'Informações'
              )
          }
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={selectedIdToShowContactPersonDetails ? handleCloseContactDetailsModal : handleCloseContactUpdateModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        {
          detailedContactPersonData && detailedContactPersonData.id ? (
            <Form className="needs-validation" noValidate>
              <Card>
                <CardBody>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonFirstName"
                      >
                        Nome
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailedContactPersonData.name}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonLastName"
                      >
                        Sobrenome
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailedContactPersonData.lastname}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonTaxIdNumber"
                      >
                        CPF
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailedContactPersonData.cpf}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonBirthdate"
                      >
                        Data de Nascimento
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {formatDate(detailedContactPersonData.birthdate)}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonPhoneNumber"
                      >
                        Número de Telefone
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailedContactPersonData.phone}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-4" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonEmailAddress"
                      >
                        Ocupação
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailedContactPersonData.occupation ? detailedContactPersonData.occupation : "Não registrado"}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-4" md="6">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonEmailAddress"
                      >
                        E-mail
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailedContactPersonData.email}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationContactPersonFirstName"
                      >
                        Empresa
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {companyNameToModalDetails}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="2">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Estado Ativo
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailedContactPersonData.status ? "Sim" : "Não"}
                        </span>
                      </div>
                    </Col>
                  </div>
                </CardBody>
              </Card>
            </Form>
          ) : (
            contactPersonIdToUpdate ? (
              <ContactPersonUpdate {...commonProps} />
            ) : (
              <div className="text-center">Dados não disponíveis</div>
            )
          )
        }
      </ModalBody>
      {
        contactPersonIdToUpdate ? (
          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={selectedIdToShowContactPersonDetails ? handleCloseContactDetailsModal : handleCloseContactUpdateModal}
            >
              Fechar
            </Button>
            <Button
              color={'warning'}
              type="button"
              onClick={handleUpdateContactPersonUpdate}
            >
              Editar Contato
            </Button>
          </ModalFooter>
        ) : null
      }
    </Modal>

  );
}

ModalContactPerson.defaultProps = {
  handleShowContactPersonDetailsModal: () => { },
  selectedIdToShowContactPersonDetails: null,
  handleCleaningSelectedIdToShowContactPersonDetails: () => { },
  handleOpenContactModal: () => { },
  modalOpen: false,
  contactPersonName: '',
  handleCleaningContactPersonNameStatus: () => { },
};

ModalContactPerson.propTypes = {
  handleShowContactPersonDetailsModal: PropTypes.func,
  selectedIdToShowContactPersonDetails: PropTypes.string,
  handleCleaningSelectedIdToShowContactPersonDetails: PropTypes.func,
  handleOpenContactModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  contactPersonName: PropTypes.string,
  handleCleaningContactPersonNameStatus: PropTypes.func,
};


export default ModalContactPerson;
