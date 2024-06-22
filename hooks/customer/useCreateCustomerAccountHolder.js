import React, { useState } from 'react';
import useCPF from '../useCPF';

const useCreateCustomer = (handleShowContactPersonsUserRegister) => {

  const {
    validateCPF
  } = useCPF("");

  const [firstName, setFirstName] = React.useState("");
  const [firstNameState, setFirstNameState] = React.useState(null);
  const [lastName, setLastName] = React.useState("");
  const [lastNameState, setLastNameState] = React.useState(null);
  const [taxIdentificationNumber, setTaxIdentificationNumber] = React.useState("");
  const [taxIdentificationNumberState, setTaxIdentificationNumberState] = React.useState(null);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [emailAddressState, setEmailAddressState] = React.useState(null);
  const [birthdate, setBirthdate] = React.useState("");
  const [birthdateState, setBirthdateState] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [passwordState, setPasswordState] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordState, setConfirmPasswordState] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneNumberState, setPhoneNumberState] = React.useState(null);
  const [checkbox, setCheckbox] = React.useState(false);
  const [checkboxState, setCheckboxState] = React.useState(null);
  const [isCustomerAccountHolderFormValidated, setIsCustomerAccountHolderFormValidated] = React.useState(false);

  const [contactPersonOccupation, setContactPersonOccupation] = React.useState("");
  const [contactPersonOccupationState, setContactPersonOccupationState] = React.useState(null);
  const [contactPersonBelongsToClientCompany, setContactPersonBelongsToClientCompany] = React.useState("");
  const [contactPersonBelongsToClientCompanyState, setContactPersonBelongsToClientCompanyState] = React.useState(null);

  const validateAddCustomerAccountHolderForm = () => {
    if (firstName === "") {
      setFirstNameState("invalid");
    } else {
      setFirstNameState("valid");
    }
    if (lastName === "") {
      setLastNameState("invalid");
    } else {
      setLastNameState("valid");
    }
    if (taxIdentificationNumber === "") {
      setTaxIdentificationNumberState("invalid");
    } else {
      setTaxIdentificationNumberState("valid");
    }
    if (emailAddress === "") {
      setEmailAddressState("invalid");
    } else {
      setEmailAddressState("valid");
    }
    if (birthdate === "") {
      setBirthdateState("invalid");
    } else {
      setBirthdateState("valid");
    }
    if (password === "") {
      setPasswordState("invalid");
    } else {
      setPasswordState("valid");
    }
    if (confirmPassword === "") {
      setConfirmPasswordState("invalid");
    } else {
      setConfirmPasswordState("valid");
    }
    if (phoneNumber === "") {
      setPhoneNumberState("invalid");
    } else {
      setPhoneNumberState("valid");
    }
    if (contactPersonOccupation === "") {
      setContactPersonOccupationState("invalid");
    } else {
      setContactPersonOccupationState("valid");
    }
  };

  const validateCheckboxIsChecked = () => {
    if (checkbox === false) {
      setCheckboxState("invalid");
    }
    if (checkbox === true) {
      setCheckboxState("valid");
    }
  };

  function handleContactPersonRegister() {

  }

  function handleValidateAddCustomerAccountHolderForm(isContactPerson = false) {
    console.log(isContactPerson);
    if (isContactPerson) {
      setCheckbox(true);
      validateCheckboxIsChecked();
    }
    console.log(
      firstName,
      lastName,
      taxIdentificationNumber,
      emailAddress,
      birthdate,
      phoneNumber,
      checkbox,
    );
    validateAddCustomerAccountHolderForm();
    console.log(
      firstNameState,
      lastNameState,
      taxIdentificationNumberState,
      emailAddressState,
      phoneNumberState,
      birthdateState,
      checkboxState,
    );
    if (
      firstNameState === "valid" &&
      lastNameState === "valid" &&
      taxIdentificationNumberState === "valid" &&
      emailAddressState === "valid" &&
      phoneNumberState === "valid" &&
      birthdateState === "valid" &&
      checkboxState === "valid"
    ) {
      if (isContactPerson) {
        handleSubmitContractPerson(firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber);
      } else {
        handleSubmit(firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber);
      }
    } else {
      return null;
    }
  }

  const handleSubmit = async (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms = true) => {
    console.log(firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms);

    if (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_PERSON}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: firstName,
            lastname: lastName,
            cpf: taxIdentificationNumber,
            birthdate: birthdate,
            email: emailAddress,
            phone: phoneNumber,
            terms: terms
          }),
        });

        if (response.ok) {
          console.log(response);
          console.log('Data sent successfully!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const handleSubmitContractPerson = async (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms = true) => {
    console.log(firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms);

    if (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_PERSON}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: firstName,
            lastname: lastName,
            cpf: taxIdentificationNumber,
            birthdate: birthdate,
            email: emailAddress,
            phone: phoneNumber,
            terms: terms
          }),
        });

        if (response.ok) {
          console.log(response);
          console.log('Data sent successfully!');
          handleShowContactPersonsUserRegister();
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  function resetCreateCustomer() {
    setFirstName("");
    setFirstNameState(null);
    setLastName("");
    setLastNameState(null);
    setTaxIdentificationNumber("");
    setTaxIdentificationNumberState(null);
    setEmailAddress("");
    setEmailAddressState(null);
    setBirthdate("");
    setBirthdateState(null);
    setPhoneNumber("");
    setPhoneNumberState(null);
    setCheckbox(null);
    setCheckboxState(null);
  }

  const handleChangeCPF = (cpf) => {
    setTaxIdentificationNumber(cpf);

    if (cpf === '') {
      setTaxIdentificationNumberState('invalid');
    } else if (validateCPF(cpf)) {
      setTaxIdentificationNumberState('valid');
    } else {
      setTaxIdentificationNumberState('invalid');
    }
  }

  const validateEmail = (email) => {
    if (email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  };

  const handleBirthdateChange = (value) => {
    if (value._d && !isNaN(value._d)) {
      const year = value._d.getFullYear();
      const month = String(value._d.getMonth() + 1).padStart(2, '0');
      const day = String(value._d.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      setBirthdate(formattedDate);
    }
    if (value === "") {
      setBirthdateState("invalid");
    } else {
      setBirthdateState("valid");
    }
  }

  return {
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
    validateCheckboxIsChecked,
    handleBirthdateChange,
    handleChangeCPF,
    validateEmail,
    handleValidateAddCustomerAccountHolderForm,
    resetCreateCustomer,
    isCustomerAccountHolderFormValidated,
    contactPersonOccupation,
    setContactPersonOccupation,
    contactPersonOccupationState,
    setContactPersonOccupationState,
    contactPersonBelongsToClientCompany,
    setContactPersonBelongsToClientCompany,
    contactPersonBelongsToClientCompanyState,
    setContactPersonBelongsToClientCompanyState,
  };
};

export default useCreateCustomer;
