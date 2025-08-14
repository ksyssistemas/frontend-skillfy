import React, { useContext, useState } from 'react';
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';

const useCreateCustomer = (handleShowContactPersonsUserRegister) => {

  const {
    handleIdAccountHolderToLinkToCustomer,
  } = useContext(CustomerContext);

  const validateAddCustomerAccountHolderForm = (state, dispatch, isContactPersonInside = false) => {
    const data = state.individualRegistrationData;

    const fieldsToValidate = [
      { name: 'FIRST_NAME', value: data.firstName },
      { name: 'LAST_NAME', value: data.lastName },
      { name: 'TAX_IDENTIFICATION_NUMBER', value: data.taxIdentificationNumber },
      { name: 'EMAIL_ADDRESS', value: data.emailAddress },
      { name: 'BIRTHDATE', value: data.birthdate },
      { name: 'PHONE_NUMBER', value: data.phoneNumber }
    ];

    if (isContactPersonInside) {
      fieldsToValidate.push(
        { name: 'CONTACT_PERSON_OCCUPATION', value: data.contactPersonOccupation },
        { name: 'CONTACT_PERSON_BELONGS_TO_CLIENT_COMPANY', value: data.contactPersonBelongsToClientCompany }
      );
    } else {
      fieldsToValidate.push(
        { name: 'PASSWORD', value: data.password },
        { name: 'CONFIRM_PASSWORD', value: data.confirmPassword },
      );
    }

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
    const isValid = isContactPerson ?
      validateAddCustomerAccountHolderForm(stateIndividual, dispatchIndividual, true) :
      validateAddCustomerAccountHolderForm(stateIndividual, dispatchIndividual);
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
          stateGlobalIndividualRegistrationData.contactPersonOccupation,
          stateGlobalIndividualRegistrationData.contactPersonBelongsToClientCompany,
          dispatchGlobalCustomerRegisterReducer,
          dispatchIndividual
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

  function goBackToContractPersonList(dispatchGlobalCustomerRegisterReducer, dispatchIndividual) {
    dispatchIndividual({ type: 'INDIVIDUAL_RESET_INDIVIDUAL_REGISTRATION_DATA' });
    dispatchGlobalCustomerRegisterReducer({ type: 'RESET_ALL' });
    localStorage.removeItem('individualRegistrationDataInside');
    handleShowContactPersonsUserRegister();
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

  const handleSubmitContractPerson = async (
    firstName,
    lastName,
    taxIdentificationNumber,
    birthdate,
    emailAddress,
    phoneNumber,
    contactPersonOccupation,
    contactPersonBelongsToClientCompany,
    dispatchGlobalCustomerRegisterReducer,
    dispatchIndividual,
    terms = true
  ) => {
    if (firstName, lastName, taxIdentificationNumber, birthdate, emailAddress, phoneNumber, terms) {
      try {
        const [day, month, year] = birthdate.split('/');
        const formattedDate = `${year}-${month}-${day}`;
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
            occupation: contactPersonOccupation,
            customerId: Number(contactPersonBelongsToClientCompany),
            terms
          }),
        });

        if (response.ok) {
          console.log('Contract Person data OUT sent successfully!');
          goBackToContractPersonList(dispatchGlobalCustomerRegisterReducer, dispatchIndividual);
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
