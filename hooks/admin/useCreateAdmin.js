// Hook para gerenciar o formulário
import React, { useState } from 'react';

const useCreateAdmin = (handleShowAdminUserRegister) => {

    const [firstName, setFirstName] = React.useState("");
    const [firstNameState, setFirstNameState] = React.useState(null);
    const [lastName, setLastName] = React.useState("");
    const [lastNameState, setLastNameState] = React.useState(null);
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

    const validateAddAdminForm = () => {
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
    };

    function handleValidateAddAdminForm() {
        validateAddAdminForm();
        if (firstNameState === "valid" &&
            lastNameState === "valid" &&
            emailAddressState === "valid" &&
            passwordState === "valid" &&
            confirmPasswordState === "valid" &&
            phoneNumberState === "valid"
        ) {
            handleSubmit(firstName, lastName, birthdate, emailAddress, confirmPassword, phoneNumber);
        } else {
            return null;
        }
    }

    const handleSubmit = async (firstName, lastName, birthdate, emailAddress, confirmPassword, phoneNumber) => {

        if (firstName, lastName, birthdate, emailAddress, confirmPassword, phoneNumber) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ADMINISTRATOR}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: firstName,
                        lastname: lastName,
                        birthdate: birthdate,
                        email: emailAddress,
                        password: confirmPassword,
                        phone: phoneNumber
                    }),
                });

                if (response.ok) {
                    reset();
                    handleShowAdminUserRegister();
                    console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    function reset() {
        setFirstName("");
        setFirstNameState(null);
        setLastName("");
        setLastNameState(null);
        setEmailAddress("");
        setEmailAddressState(null);
        setBirthdate("");
        setBirthdateState(null);
        setPassword("");
        setPasswordState(null);
        setConfirmPassword("");
        setConfirmPasswordState(null);
        setPhoneNumber("");
        setPhoneNumberState(null);
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
        emailAddressState,
        birthdateState,
        password,
        passwordState,
        confirmPasswordState,
        phoneNumber,
        phoneNumberState,
        setFirstName,
        setFirstNameState,
        setLastName,
        setLastNameState,
        setEmailAddress,
        setEmailAddressState,
        setPassword,
        setPasswordState,
        setConfirmPassword,
        setConfirmPasswordState,
        setPhoneNumber,
        setPhoneNumberState,
        handleValidateAddAdminForm,
        handleBirthdateChange,
        validateEmail
    };
};

export default useCreateAdmin;
