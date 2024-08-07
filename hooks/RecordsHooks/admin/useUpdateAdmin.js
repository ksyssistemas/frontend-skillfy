// Hook para gerenciar o formulário
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../../contexts/RecordsContext/AdminContext';

const useUpdateAdmin = () => {

    const { handleUpdatedAdminRecordStatusChange } = useContext(AdminContext);

    // const validateAddAdminForm = () => {
    //     if (firstName === "") {
    //         setFirstNameState("invalid");
    //     } else {
    //         setFirstNameState("valid");
    //     }
    //     if (lastName === "") {
    //         setLastNameState("invalid");
    //     } else {
    //         setLastNameState("valid");
    //     }
    //     if (emailAddress === "") {
    //         setEmailAddressState("invalid");
    //     } else {
    //         setEmailAddressState("valid");
    //     }
    //     if (birthdate === "") {
    //         setBirthdateState("invalid");
    //     } else {
    //         setBirthdateState("valid");
    //     }
    //     if (password === "") {
    //         setPasswordState("invalid");
    //     } else {
    //         setPasswordState("valid");
    //     }
    //     if (confirmPassword === "") {
    //         setConfirmPasswordState("invalid");
    //     } else {
    //         setConfirmPasswordState("valid");
    //     }
    //     if (phoneNumber === "") {
    //         setPhoneNumberState("invalid");
    //     } else {
    //         setPhoneNumberState("valid");
    //     }
    // };

    async function handleValidateUpdateAdminForm(
        handleCloseAdminUpdateModal,
        adminIdToUpdate,
        firstName,
        lastName,
        formattedBirthdate,
        phoneNumber,
        adminStatus,
        adminPrivilege,
        handleAdminIdToUpdate,
        handleCleanDetailedAdminAccountData
    ) {
        // validateAddAdminForm();
        // if (firstNameState === "valid" &&
        //     lastNameState === "valid" &&
        //     emailAddressState === "valid" &&
        //     passwordState === "valid" &&
        //     confirmPasswordState === "valid" &&
        //     phoneNumberState === "valid"
        // ) {
        await handleSubmit(adminIdToUpdate, firstName, lastName, formattedBirthdate, phoneNumber, adminStatus, adminPrivilege);
        goBackToAdminUserList(handleCloseAdminUpdateModal, handleAdminIdToUpdate, handleCleanDetailedAdminAccountData);
        // } else {
        //     return null;
        // }
    }

    function goBackToAdminUserList(handleCloseAdminUpdateModal, handleAdminIdToUpdate, handleCleanDetailedAdminAccountData) {
        handleCloseAdminUpdateModal();
        handleAdminIdToUpdate();
        handleCleanDetailedAdminAccountData();
        handleUpdatedAdminRecordStatusChange();
    }

    const handleSubmit = async (adminIdToUpdate, firstName, lastName, formattedBirthdate, phoneNumber, adminStatus, adminPrivilege) => {
        if (adminIdToUpdate && adminIdToUpdate !== "") {
            try {
                const payload = {
                    status: adminStatus,
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

                if (phoneNumber && phoneNumber !== "") {
                    payload.phone = phoneNumber;
                }

                if (adminPrivilege && adminPrivilege !== "") {
                    payload.privileges = adminPrivilege;
                }

                console.log(payload);

                const response = await fetch(`${process.env.NEXT_PUBLIC_ADMINISTRATOR}/${adminIdToUpdate}`, {
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
        handleValidateUpdateAdminForm
    };
};

export default useUpdateAdmin;
