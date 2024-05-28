// Hook para gerenciar o formulário
import React, { useState } from 'react';
import useCEP from '../useCEP';

const useCreateEmployee = () => {

    const {
        brasilAPICEPData,
        loadingCEPValidation,
        errorCEPValidation,
        handleCEPValidationLoading,
        handleSaveCEP,
        employeeZipCode,
        setEmployeeZipCode,
        employeeZipCodeState,
        setEmployeeZipCodeState
    } = useCEP("");

    const [employeeIdNumber, setEmployeeIdNumber] = useState("");
    const [employeeIdNumberState, setEmployeeIdNumberState] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [firstNameState, setFirstNameState] = useState(null);
    const [lastName, setLastName] = useState("");
    const [lastNameState, setLastNameState] = useState(null);
    const [emailAddress, setEmailAddress] = useState("");
    const [emailAddressState, setEmailAddressState] = useState(null);
    const [birthdate, setBirthdate] = useState("");
    const [birthdateState, setBirthdateState] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberState, setPhoneNumberState] = useState(null);
    const [employeeAddress, setEmployeeAddress] = useState("");
    const [employeeAddressState, setEmployeeAddressState] = useState(null);
    const [employeeAddressNumber, setEmployeeAddressNumber] = useState("");
    const [employeeAddressNumberState, setEmployeeAddressNumberState] = useState(null);
    const [employeeAddressComplement, setEmployeeAddressComplement] = useState("");
    const [employeeAddressComplementState, setEmployeeAddressComplementState] = useState(null);
    const [employeeNeighborhood, setEmployeeNeighborhood] = useState("");
    const [employeeNeighborhoodState, setEmployeeNeighborhoodState] = useState(null);
    const [employeeCity, setEmployeeCity] = useState("");
    const [employeeCityState, setEmployeeCityState] = useState(null);
    const [federatedUnit, setFederatedUnit] = useState("");
    const [federatedUnitState, setFederatedUnitState] = useState(null);
    const [departmentWhichEmployeeReports, setDepartmentWhichEmployeeReports] = useState("");
    const [departmentWhichEmployeeReportsState, setDepartmentWhichEmployeeReportsState] = useState(null);
    const [employeeRole, setEmployeeRole] = useState("");
    const [employeeRoleState, setEmployeeRoleState] = useState(null);
    const [employeeFunction, setEmployeeFunction] = useState("");
    const [employeeFunctionState, setEmployeeFunctionState] = useState(null);
    const [isEmployeeLeader, setIsEmployeeLeader] = React.useState(false);
    const [hasEmployeeLeader, setHasEmployeeLeader] = React.useState(false);
    const [employeeLeaderName, setEmployeeLeaderName] = React.useState("");
    const [employeeLeaderNameState, setEmployeeLeaderNameState] = useState(null);
    const [employeeContractType, setEmployeeContractType] = useState("");
    const [employeeContractTypeState, setEmployeeContractTypeState] = useState(null);
    const [employeetWorkModel, setEmployeetWorkModel] = useState("");
    const [employeetWorkModelState, setEmployeetWorkModelState] = useState(null);
    const [employeetAdmissionDate, setEmployeetAdmissionDate] = useState("");
    const [employeetAdmissionDateState, setEmployeetAdmissionDateState] = useState(null);
    const [employeetWorkplace, setEmployeetWorkplace] = useState("");
    const [employeetWorkplaceState, setEmployeetWorkplaceState] = useState(null);
    const [employeeEntryTime, setEmployeeEntryTime] = useState("");
    const [employeeEntryTimeState, setEmployeeEntryTimeState] = useState(null);
    const [employeeBreakTime, setEmployeeBreakTime] = useState("");
    const [employeeBreakTimeState, setEmployeeBreakTimeState] = useState(null);
    const [employeeDepartureTime, setEmployeeDepartureTime] = useState("");
    const [employeeDepartureTimeState, setEmployeeDepartureTimeState] = useState(null);
    const [hasValuesChangedWithAPIData, setHasValuesChangedWithAPIData] = React.useState(false);

    const handleValuesChangedWithAPIData = () => setHasValuesChangedWithAPIData(!hasValuesChangedWithAPIData);

    const validateAddEmployeeForm = () => {
        if (employeeIdNumber === "") {
            setEmployeeIdNumberState("invalid");
        } else {
            setEmployeeIdNumberState("valid");
        }
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
        if (phoneNumber === "") {
            setPhoneNumberState("invalid");
        } else {
            setPhoneNumberState("valid");
        }
        if (departmentWhichEmployeeReports === "") {
            setDepartmentWhichEmployeeReportsState("invalid");
        } else {
            setDepartmentWhichEmployeeReportsState("valid");
        }
        if (employeeRole === "") {
            setEmployeeRoleState("invalid");
        } else {
            setEmployeeRoleState("valid");
        }
        if (employeeFunction === "") {
            setEmployeeFunctionState("invalid");
        } else {
            setEmployeeFunctionState("valid");
        }
        if (employeeContractType === "") {
            setEmployeeContractTypeState("invalid");
        } else {
            setEmployeeContractTypeState("valid");
        }
        if (employeetWorkModel === "") {
            setEmployeetWorkModelState("invalid");
        } else {
            setEmployeetWorkModelState("valid");
        }
        if (employeetAdmissionDate === "") {
            setEmployeetAdmissionDateState("invalid");
        } else {
            setEmployeetAdmissionDateState("valid");
        }
        if (employeetWorkplace === "") {
            setEmployeetWorkplaceState("invalid");
        } else {
            setEmployeetWorkplaceState("valid");
        }
        if (employeeEntryTime === "") {
            setEmployeeEntryTimeState("invalid");
        } else {
            setEmployeeEntryTimeState("valid");
        }
        if (employeeBreakTime === "") {
            setEmployeeBreakTimeState("invalid");
        } else {
            setEmployeeBreakTimeState("valid");
        }
        if (employeeDepartureTime === "") {
            setEmployeeDepartureTimeState("invalid");
        } else {
            setEmployeeDepartureTimeState("valid");
        }
    };

    const validateAddEmployeeAddressForm = () => {
        if (employeeAddress === "") {
            setEmployeeAddressState("invalid");
        } else {
            setEmployeeAddressState("valid");
        }
        if (employeeAddressNumber === "") {
            setEmployeeAddressNumberState("invalid");
        } else {
            setEmployeeAddressNumberState("valid");
        }
        if (employeeAddressComplement === "") {
            setEmployeeAddressComplementState("invalid");
        } else {
            setEmployeeAddressComplementState("valid");
        }
        if (employeeNeighborhood === "") {
            setEmployeeNeighborhoodState("invalid");
        } else {
            setEmployeeNeighborhoodState("valid");
        }
        if (employeeCity === "") {
            setEmployeeCityState("invalid");
        } else {
            setEmployeeCityState("valid");
        }
        if (federatedUnit === "") {
            setFederatedUnitState("invalid");
        } else {
            setFederatedUnitState("valid");
        }
    };

    function handleFormFieldsAutocomplete(cep) {
        if (cep.state) {
            setFederatedUnit(cep.state)
        }
        if (cep.city) {
            setEmployeeCity(cep.city)
        }
        if (cep.neighborhood) {
            setEmployeeNeighborhood(cep.neighborhood)
        }
        if (cep.street) {
            setEmployeeAddress(cep.street);
        }
        handleValuesChangedWithAPIData();
    }

    function handleValidateAddEmployeeForm() {
        validateAddEmployeeForm();
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
                const response = await fetch(`http://dlist.com.br:3008/administrator`, {
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
            setEmployeetAdmissionDateState("invalid");
        } else {
            setEmployeetAdmissionDateState("valid");
        }
    }

    const handleAdmissionDateChange = (value) => {
        if (value._d && !isNaN(value._d)) {
            const year = value._d.getFullYear();
            const month = String(value._d.getMonth() + 1).padStart(2, '0');
            const day = String(value._d.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            setEmployeetAdmissionDate(formattedDate);
        }
        if (value === "") {
            setBirthdateState("invalid");
        } else {
            setBirthdateState("valid");
        }
    }

    return {
        employeeIdNumber,
        setEmployeeIdNumber,
        employeeIdNumberState,
        setEmployeeIdNumberState,
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
        phoneNumber,
        setPhoneNumber,
        phoneNumberState,
        setPhoneNumberState,
        employeeAddress,
        setEmployeeAddress,
        employeeAddressState,
        setEmployeeAddressState,
        employeeAddressNumber,
        setEmployeeAddressNumber,
        employeeAddressNumberState,
        setEmployeeAddressNumberState,
        employeeAddressComplement,
        setEmployeeAddressComplement,
        employeeAddressComplementState,
        setEmployeeAddressComplementState,
        employeeNeighborhood,
        setEmployeeNeighborhood,
        employeeNeighborhoodState,
        setEmployeeNeighborhoodState,
        employeeCity,
        setEmployeeCity,
        employeeCityState,
        setEmployeeCityState,
        federatedUnit,
        setFederatedUnit,
        federatedUnitState,
        setFederatedUnitState,
        departmentWhichEmployeeReports,
        setDepartmentWhichEmployeeReports,
        departmentWhichEmployeeReportsState,
        setDepartmentWhichEmployeeReportsState,
        employeeRole,
        setEmployeeRole,
        employeeRoleState,
        setEmployeeRoleState,
        employeeFunction,
        setEmployeeFunction,
        employeeFunctionState,
        setEmployeeFunctionState,
        isEmployeeLeader,
        setIsEmployeeLeader,
        hasEmployeeLeader,
        setHasEmployeeLeader,
        employeeLeaderName,
        setEmployeeLeaderName,
        employeeLeaderNameState,
        setEmployeeLeaderNameState,
        employeeContractType,
        setEmployeeContractType,
        employeeContractTypeState,
        setEmployeeContractTypeState,
        employeetWorkModel,
        setEmployeetWorkModel,
        employeetWorkModelState,
        setEmployeetWorkModelState,
        employeeEntryTime,
        setEmployeeEntryTime,
        employeeEntryTimeState,
        setEmployeeEntryTimeState,
        employeeBreakTime,
        setEmployeeBreakTime,
        employeeBreakTimeState,
        setEmployeeBreakTimeState,
        employeeDepartureTime,
        setEmployeeDepartureTime,
        employeeDepartureTimeState,
        setEmployeeDepartureTimeState,
        employeetWorkplace,
        setEmployeetWorkplace,
        employeetWorkplaceState,
        setEmployeetWorkplaceState,
        handleValidateAddEmployeeForm,
        handleBirthdateChange,
        validateEmail,
        validateAddEmployeeForm,
        validateAddEmployeeAddressForm,
        handleFormFieldsAutocomplete,
        hasValuesChangedWithAPIData,
        handleValuesChangedWithAPIData
    };
};

export default useCreateEmployee;
