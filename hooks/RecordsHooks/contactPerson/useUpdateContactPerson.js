import React, { useContext, useState } from 'react';
import { ContactPersonContext } from '../../../contexts/RecordsContext/ContactPersonContext';
import { useCreateCustomer } from '../customer/useCreateCustomerAccountHolder';

const useUpdateContactPerson = (handleShowContactPersonsUserRegister) => {

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

    //   const validateAddCustomerAccountHolderForm = () => {
    //     if (firstName === "") {
    //       setFirstNameState("invalid");
    //     } else {
    //       setFirstNameState("valid");
    //     }
    //     if (lastName === "") {
    //       setLastNameState("invalid");
    //     } else {
    //       setLastNameState("valid");
    //     }
    //     if (taxIdentificationNumber === "") {
    //       setTaxIdentificationNumberState("invalid");
    //     } else {
    //       setTaxIdentificationNumberState("valid");
    //     }
    //     if (emailAddress === "") {
    //       setEmailAddressState("invalid");
    //     } else {
    //       setEmailAddressState("valid");
    //     }
    //     if (birthdate === "") {
    //       setBirthdateState("invalid");
    //     } else {
    //       setBirthdateState("valid");
    //     }
    //     if (password === "") {
    //       setPasswordState("invalid");
    //     } else {
    //       setPasswordState("valid");
    //     }
    //     if (confirmPassword === "") {
    //       setConfirmPasswordState("invalid");
    //     } else {
    //       setConfirmPasswordState("valid");
    //     }
    //     if (phoneNumber === "") {
    //       setPhoneNumberState("invalid");
    //     } else {
    //       setPhoneNumberState("valid");
    //     }
    //     if (contactPersonOccupation === "") {
    //       setContactPersonOccupationState("invalid");
    //     } else {
    //       setContactPersonOccupationState("valid");
    //     }
    //   };

    async function handleValidateUpdateClientCompanyForm(
        handleOpenContactModal,
        contactPersonIdToUpdate,
        taxIdentificationNumber,
        firstName,
        lastName,
        emailAddress,
        formattedBirthdate,
        phoneNumber,
        contactStatus,
        contactPersonBelongsToClientCompany,
        contactPersonOccupation,
        handleContactPersonIdToUpdate,
        handleContactIdStatusCleanupToUpdate
    ) {

        await handleSubmit(contactPersonIdToUpdate, taxIdentificationNumber, firstName, lastName, emailAddress, formattedBirthdate, phoneNumber, contactStatus, contactPersonBelongsToClientCompany, contactPersonOccupation);
        goBackToContactPersonList(handleOpenContactModal, handleContactPersonIdToUpdate, handleContactIdStatusCleanupToUpdate);
    }

    function goBackToContactPersonList(handleOpenContactModal, handleContactPersonIdToUpdate, handleContactIdStatusCleanupToUpdate) {
        handleOpenContactModal();
        handleContactPersonIdToUpdate();
        handleContactIdStatusCleanupToUpdate();
        handleUpdatedContactRecordStatusChange();
    }

    const handleSubmit = async (contactPersonIdToUpdate, taxIdentificationNumber, firstName, lastName, emailAddress, formattedBirthdate, phoneNumber, contactStatus, contactPersonBelongsToClientCompany, contactPersonOccupation) => {
        if (contactPersonIdToUpdate && contactPersonIdToUpdate !== "") {
            try {
                const payload = {
                    status: contactStatus,
                };

                if (firstName && firstName !== "") {
                    payload.name = firstName;
                }

                if (lastName && lastName !== "") {
                    payload.lastname = lastName;
                }

                if (formattedBirthdate && formattedBirthdate !== "") {
                    payload.birthdate = formattedBirthdate;
                }

                if (emailAddress && emailAddress !== "") {
                    payload.email = emailAddress;
                }

                if (phoneNumber && phoneNumber !== "") {
                    payload.phone = phoneNumber;
                }

                if (taxIdentificationNumber && taxIdentificationNumber !== "") {
                    payload.cpf = taxIdentificationNumber;
                }

                if (contactPersonBelongsToClientCompany && contactPersonBelongsToClientCompany !== "") {
                    payload.customerId = Number(contactPersonBelongsToClientCompany);
                }

                if (contactPersonOccupation && contactPersonOccupation !== "") {
                    payload.occupation = contactPersonOccupation;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_PERSON}/${contactPersonIdToUpdate}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };


    return {
        handleValidateUpdateClientCompanyForm
    };
};

export default useUpdateContactPerson;
