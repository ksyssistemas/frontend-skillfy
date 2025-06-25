import React, { useContext, useState } from 'react';
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';

const useCreateCustomer = () => {

  const {
    handleIdAccountHolderToLinkToCustomer,
  } = useContext(CustomerContext);

  const validateAddCustomerAccountHolderForm = (state, dispatch) => {
    const data = state.individualRegistrationData;

    const fieldsToValidate = [
      { name: 'FIRST_NAME', value: data.firstName },
      { name: 'LAST_NAME', value: data.lastName },
      { name: 'TAX_IDENTIFICATION_NUMBER', value: data.taxIdentificationNumber },
      { name: 'EMAIL_ADDRESS', value: data.emailAddress },
      { name: 'BIRTHDATE', value: data.birthdate },
      { name: 'PASSWORD', value: data.password },
      { name: 'CONFIRM_PASSWORD', value: data.confirmPassword },
      { name: 'PHONE_NUMBER', value: data.phoneNumber },
      //{ name: 'CONTACT_PERSON_OCCUPATION', value: data.contactPersonOccupation },
    ];

    let isFormValid = true;

    fieldsToValidate.forEach(({ name, value }) => {
      const isValid = value.trim() !== '';
      if (!isValid) isFormValid = false;

      dispatch({
        type: `SET_${name.toUpperCase()}_STATE`,
        payload: isValid ? 'valid' : 'invalid',
      });
    });

    dispatch({
      type: 'SET_IS_CUSTOMER_ACCOUNT_HOLDER_FORM_VALIDATED',
      payload: isFormValid,
    });

    return isFormValid;
  };

  function handleValidateAddCustomerAccountHolderForm(
    stateGlobalCustomerRegisterReducer,
    dispatchGlobalCustomerRegisterReducer,
    stateIndividual,
    dispatchIndividual,
    isContactPerson = false
  ) {
    const isValid = validateAddCustomerAccountHolderForm(stateIndividual, dispatchIndividual);

    const stateGlobalIndividualRegistrationData = stateGlobalCustomerRegisterReducer.individualRegistrationData;
    if (isValid) {
      if (isContactPerson && stateGlobalIndividualRegistrationData.contactPersonOccupationState === "valid") {
        handleSubmitContractPerson(
          stateGlobalIndividualRegistrationData.firstName,
          stateGlobalIndividualRegistrationData.lastName,
          stateGlobalIndividualRegistrationData.taxIdentificationNumber,
          stateGlobalIndividualRegistrationData.birthdate,
          stateGlobalIndividualRegistrationData.emailAddress,
          stateGlobalIndividualRegistrationData.phoneNumber,
          stateGlobalIndividualRegistrationData.password,
          stateGlobalIndividualRegistrationData.contactPersonOccupation,
          stateGlobalIndividualRegistrationData.contactPersonBelongsToClientCompany
        );
      } else if (stateGlobalIndividualRegistrationData.checkboxState === "valid") {
        handleSubmit(
          stateGlobalIndividualRegistrationData.firstName,
          stateGlobalIndividualRegistrationData.lastName,
          stateGlobalIndividualRegistrationData.taxIdentificationNumber,
          stateGlobalIndividualRegistrationData.birthdate,
          stateGlobalIndividualRegistrationData.emailAddress,
          stateGlobalIndividualRegistrationData.phoneNumber,
          stateGlobalIndividualRegistrationData.password
        );
      }
    }
  }

  const handleSubmit = async (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, password, terms = true) => {
    if (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, password, terms) {
      const [day, month, year] = birthdate.split('/');
      const formattedDate = `${year}-${month}-${day}`;
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
            birthdate: formattedDate,
            email: emailAddress,
            phone: phoneNumber,
            password,
            terms
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

  const handleSubmitContractPerson = async (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, password, contactPersonOccupation, contactPersonBelongsToClientCompany, terms = true) => {
    if (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, password, terms) {
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
            birthdate,
            email: emailAddress,
            phone: phoneNumber,
            password,
            occupation: contactPersonOccupation,
            customerId: Number(contactPersonBelongsToClientCompany),
            terms
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
    validateAddCustomerAccountHolderForm,
    handleValidateAddCustomerAccountHolderForm
  };
};

export default useCreateCustomer;
