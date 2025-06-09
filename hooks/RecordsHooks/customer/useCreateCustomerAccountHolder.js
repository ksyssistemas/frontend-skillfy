import React, { useContext, useState } from 'react';
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';

const useCreateCustomer = () => {

  const {
    handleIdAccountHolderToLinkToCustomer,
  } = useContext(CustomerContext);

  const validateAddCustomerAccountHolderForm = (state, dispatch) => {
    dispatch({
      type: 'INDIVIDUAL_SET_FIRST_NAME_STATE',
      payload: state.firstName === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_LAST_NAME_STATE',
      payload: state.lastName === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_TAX_IDENTIFICATION_NUMBER_STATE',
      payload: state.taxIdentificationNumber === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_EMAIL_ADDRESS_STATE',
      payload: state.emailAddress === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_BIRTHDATE_STATE',
      payload: state.birthdate === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_PASSWORD_STATE',
      payload: state.password === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_CONFIRM_PASSWORD_STATE',
      payload: state.confirmPassword === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_PHONE_NUMBER_STATE',
      payload: state.phoneNumber === "" ? 'valid' : 'invalid'
    });
    dispatch({
      type: 'INDIVIDUAL_SET_CONTACT_PERSON_OCCUPATION_STATE',
      payload: state.contactPersonOccupation === "" ? 'valid' : 'invalid'
    });
  };

  function handleValidateAddCustomerAccountHolderForm(state, dispach, isContactPerson = false) {
    const stateData = state.individualRegistrationData;
    validateAddCustomerAccountHolderForm(stateData, dispach);
    if (isContactPerson) {
      if (
        stateData.firstNameState === "valid" &&
        stateData.lastNameState === "valid" &&
        stateData.taxIdentificationNumberState === "valid" &&
        stateData.emailAddressState === "valid" &&
        stateData.phoneNumberState === "valid" &&
        stateData.birthdateState === "valid" &&
        stateData.contactPersonOccupationState === "valid"
      ) {
        handleSubmitContractPerson(stateData.firstName, stateData.lastName, stateData.taxIdentificationNumber, stateData.birthdate, stateData.emailAddress, stateData.phoneNumber, stateData.contactPersonOccupation, stateData.contactPersonBelongsToClientCompany);
      }
    } else if (
      stateData.firstNameState === "valid" &&
      stateData.lastNameState === "valid" &&
      stateData.taxIdentificationNumberState === "valid" &&
      stateData.emailAddressState === "valid" &&
      stateData.phoneNumberState === "valid" &&
      stateData.birthdateState === "valid" &&
      stateData.checkboxState === "valid"
    ) {
      handleSubmit(stateData.firstName, stateData.lastName, stateData.taxIdentificationNumber, stateData.birthdate, stateData.emailAddress, stateData.phoneNumber);
    }
  }

  const handleSubmit = async (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms = true) => {
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
          const data = await response.json();
          handleIdAccountHolderToLinkToCustomer(data.id);
          console.log('Contract Person data IN sent successfully!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const handleSubmitContractPerson = async (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, contactPersonOccupation, contactPersonBelongsToClientCompany, terms = true) => {
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
            occupation: contactPersonOccupation,
            customerId: Number(contactPersonBelongsToClientCompany),
            terms: terms
          }),
        });

        if (response.ok) {
          console.log('Contract Person data OUT sent successfully!');
          handleShowContactPersonsUserRegister();
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  return {
    handleValidateAddCustomerAccountHolderForm
  };
};

export default useCreateCustomer;
