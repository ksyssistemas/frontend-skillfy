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

    const [employeeContractType, setEmployeeContractType] = React.useState("");
    const [employeeContractTypeState, setEmployeeContractTypeState] = React.useState(null);
    const [employeeWorkModel, setEmployeeWorkModel] = React.useState("");
    const [employeeWorkModelState, setEmployeeWorkModelState] = React.useState(null);
    const [employeeWorkplace, setEmployeeWorkplace] = React.useState("");
    const [employeeWorkplaceState, setEmployeeWorkplaceState] = React.useState(null);

    const [employeetAdmissionDate, setEmployeetAdmissionDate] = useState("");
    const [employeetAdmissionDateState, setEmployeetAdmissionDateState] = useState(null);
    const [employeeEntryTime, setEmployeeEntryTime] = useState("");
    const [employeeEntryTimeState, setEmployeeEntryTimeState] = useState(null);
    const [employeeBreakTime, setEmployeeBreakTime] = useState("");
    const [employeeBreakTimeState, setEmployeeBreakTimeState] = useState(null);
    const [employeeDepartureTime, setEmployeeDepartureTime] = useState("");
    const [employeeDepartureTimeState, setEmployeeDepartureTimeState] = useState(null);
    const [hasValuesChangedWithAPIData, setHasValuesChangedWithAPIData] = React.useState(false);
    const handleValuesChangedWithAPIData = () => setHasValuesChangedWithAPIData(!hasValuesChangedWithAPIData);
    const [isInvalidEmployeeLeaderComponent, setIsInvalidEmployeeLeaderComponent] = useState(false);
    const [showErrorFeedbackEmployeeLeaderComponent, setShowErrorFeedbackEmployeeLeaderComponent] = useState(false);

    function handleIsEmployeeLeader() {
        setIsEmployeeLeader(!isEmployeeLeader);
        setHasEmployeeLeader(false);
        setIsInvalidEmployeeLeaderComponent(false);
        setShowErrorFeedbackEmployeeLeaderComponent(false);
    }

    function handleHasEmployeeLeader() {
        setHasEmployeeLeader(!hasEmployeeLeader);
        setIsEmployeeLeader(false);
        setIsInvalidEmployeeLeaderComponent(false);
        setShowErrorFeedbackEmployeeLeaderComponent(false);
    }

    const validateSelection = () => {
        if (!isEmployeeLeader && !hasEmployeeLeader && !employeeLeaderName) {
            setIsInvalidEmployeeLeaderComponent(true);
            setShowErrorFeedbackEmployeeLeaderComponent(true);
            setEmployeeLeaderNameState("invalid");
        } else if (!isEmployeeLeader && hasEmployeeLeader && !employeeLeaderName) {
            setIsInvalidEmployeeLeaderComponent(false);
            setShowErrorFeedbackEmployeeLeaderComponent(false);
            setEmployeeLeaderNameState("invalid");
        } else if (!isEmployeeLeader && hasEmployeeLeader && employeeLeaderName) {
            setIsInvalidEmployeeLeaderComponent(false);
            setShowErrorFeedbackEmployeeLeaderComponent(false);
            setEmployeeLeaderNameState("valid");
        } else if (isEmployeeLeader && !hasEmployeeLeader && !employeeLeaderName) {
            setIsInvalidEmployeeLeaderComponent(false);
            setShowErrorFeedbackEmployeeLeaderComponent(false);
            setEmployeeLeaderNameState("");
        }
    };

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
        if (employeeWorkModel === "") {
            setEmployeeWorkModelState("invalid");
        } else {
            setEmployeeWorkModelState("valid");
        }
        if (employeeWorkplace === "") {
            setEmployeeWorkplaceState("invalid");
        } else {
            setEmployeeWorkplaceState("valid");
        }
        if (employeetAdmissionDate === "") {
            setEmployeetAdmissionDateState("invalid");
        } else {
            setEmployeetAdmissionDateState("valid");
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
        if (employeeZipCode === "") {
            setEmployeeZipCodeState("invalid");
        } else {
            setEmployeeZipCodeState("valid");
        }
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
        if (cep.cep) {
            handleSaveCEP(cep.cep);
        }
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

    async function handleValidateAddEmployeeForm(handleShowEmployeeUserRegister) {
        let isLead;
        validateAddEmployeeForm();
        validateSelection();
        validateAddEmployeeAddressForm();
        if (isEmployeeLeader && !hasEmployeeLeader) {
            isLead = true;
        } else if (!isEmployeeLeader && hasEmployeeLeader) {
            isLead = false;
        } else {
            isLead = null;
        }
        if (firstNameState === "valid" &&
            lastNameState === "valid" &&
            birthdateState === "valid" &&
            emailAddressState === "valid" &&
            phoneNumberState === "valid" &&
            employeeLeaderNameState === "valid"
        ) {
            const userIdCreated = await handleSubmit(
                firstName,
                lastName,
                emailAddress,
                birthdate,
                phoneNumber,
                isLead,
                employeeLeaderName,
            );
            console.log(
                departmentWhichEmployeeReportsState,
                employeeRoleState,
                employeeFunctionState,
                employeeContractTypeState,
                employeeWorkModelState,
                employeeWorkplaceState,
                employeetAdmissionDateState,
                employeeEntryTimeState,
                employeeBreakTimeState,
                employeeDepartureTimeState,
            );
            console.log(userIdCreated);
            console.log(
                departmentWhichEmployeeReports,
                employeeRole,
                employeeFunction,
                employeeContractType,
                employeeWorkModel,
                employeeWorkplace,
                employeetAdmissionDate,
                employeeEntryTime,
                employeeBreakTime,
                employeeDepartureTime,
            );
            if (
                departmentWhichEmployeeReportsState === "valid" &&
                employeeRoleState === "valid" &&
                employeeFunctionState === "valid" &&
                employeeContractTypeState === "valid" &&
                employeeWorkModelState === "valid" &&
                employeeWorkplaceState === "valid" &&
                employeetAdmissionDateState === "valid" &&
                employeeEntryTimeState === "valid" &&
                employeeBreakTimeState === "valid" &&
                employeeDepartureTimeState === "valid" &&
                userIdCreated
            ) {
                await handleEmployeeContactDetails(
                    departmentWhichEmployeeReports,
                    employeeRole,
                    employeeFunction,
                    employeeContractType,
                    employeeWorkModel,
                    employeeWorkplace,
                    employeetAdmissionDate,
                    employeeEntryTime,
                    employeeBreakTime,
                    employeeDepartureTime,
                    userIdCreated
                )
            }
            if (
                employeeZipCodeState === "valid" &&
                employeeAddressState === "valid" &&
                employeeAddressNumberState === "valid" &&
                employeeNeighborhoodState === "valid" &&
                employeeCityState === "valid" &&
                federatedUnitState === "valid" &&
                userIdCreated
            ) {
                await handleSubmitAddress(
                    employeeZipCode,
                    employeeAddress,
                    employeeAddressNumber,
                    employeeAddressComplement,
                    employeeNeighborhood,
                    employeeCity,
                    federatedUnit,
                    userIdCreated
                );
                goBackToEmployeeUserList(handleShowEmployeeUserRegister);
            }
        }
    }

    function goBackToEmployeeUserList(handleShowEmployeeUserRegister) {
        //console.log("2", isClientCompanySaved, "2", isCompanyAddressSaved);
        //if (isClientCompanySaved && isCompanyAddressSaved) {
        //resetCreateCustomer();
        //resetCreateCustomerAddress();
        handleShowEmployeeUserRegister();
        //}
    }

    const handleSubmit = async (
        firstName,
        lastName,
        emailAddress,
        birthdate,
        phoneNumber,
        isLead,
        employeeLeaderName,
    ) => {

        if (firstName,
            lastName,
            emailAddress,
            birthdate,
            phoneNumber,
            isLead,
            employeeLeaderName
        ) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: firstName,
                        lastName: lastName,
                        birthdate: birthdate,
                        email: emailAddress,
                        phoneNumber: phoneNumber,
                        status: true,
                        isLead: isLead,
                        LeaderName: employeeLeaderName,
                    }),
                });

                if (response.ok) {
                    console.log('Data sent successfully!');
                    const data = await response.json();
                    return data.id;
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    const handleEmployeeContactDetails = async (
        departmentWhichEmployeeReports,
        employeeRole,
        employeeFunction,
        employeeContractType,
        employeeWorkModel,
        employeeWorkplace,
        employeetAdmissionDate,
        employeeEntryTime,
        employeeBreakTime,
        employeeDepartureTime,
        userIdCreated
    ) => {

        if (departmentWhichEmployeeReports,
            employeeRole,
            employeeFunction,
            employeeContractType,
            employeeWorkModel,
            employeeWorkplace,
            employeetAdmissionDate,
            employeeEntryTime,
            employeeBreakTime,
            employeeDepartureTime,
            userIdCreated
        ) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_CONTRACT_DETAILS}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        employeeId: userIdCreated,
                        department: departmentWhichEmployeeReports,
                        roles: employeeRole,
                        employeeFunction: employeeFunction,
                        contractType: employeeContractType,
                        contractModel: employeeWorkModel,
                        workplace: employeeWorkplace,
                        adimissionDate: employeetAdmissionDate,
                        entryTime: employeeEntryTime,
                        breakTime: employeeBreakTime,
                        departureTime: employeeDepartureTime,
                    }),
                });

                if (response.ok) {
                    console.log('Data sent successfully!');
                } else {
                    const textData = await response.text();
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    const handleSubmitAddress = async (employeeZipCode, employeeAddress, employeeAddressNumber, employeeAddressComplement, employeeNeighborhood, employeeCity, federatedUnit, userIdCreated) => {
        if (employeeZipCode && employeeAddress && employeeAddressNumber && employeeNeighborhood && employeeCity && federatedUnit && userIdCreated) {
            try {
                const payload = {
                    country: "Brasil",
                    state: federatedUnit,
                    city: employeeCity,
                    address: employeeAddress,
                    neighborhood: employeeNeighborhood,
                    zipCode: employeeZipCode,
                    addressNumber: employeeAddressNumber,
                    employeeId: userIdCreated,
                };

                if (employeeAddressComplement) {
                    payload.complement = employeeAddressComplement;
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}-address`, {
                    method: 'POST',
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
            setEmployeetAdmissionDateState("invalid");
        } else {
            setEmployeetAdmissionDateState("valid");
        }
    };

    const handleTimeChange = (setTime, setTimeState) => (e) => {
        setTime(e.target.value);
        if (e.target.value === "" || e.target.value.includes("_")) {
            setTimeState("invalid");
        } else {
            setTimeState("valid");
        }
    };

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
        employeeWorkModel,
        setEmployeeWorkModel,
        employeeWorkModelState,
        setEmployeeWorkModelState,
        employeeWorkplace,
        setEmployeeWorkplace,
        employeeWorkplaceState,
        setEmployeeWorkplaceState,
        isInvalidEmployeeLeaderComponent,
        setIsInvalidEmployeeLeaderComponent,
        showErrorFeedbackEmployeeLeaderComponent,
        setShowErrorFeedbackEmployeeLeaderComponent,
        employeetAdmissionDate,
        setEmployeetAdmissionDate,
        employeetAdmissionDateState,
        setEmployeetAdmissionDateState,
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
        handleValidateAddEmployeeForm,
        handleBirthdateChange,
        validateEmail,
        validateAddEmployeeForm,
        validateAddEmployeeAddressForm,
        handleFormFieldsAutocomplete,
        hasValuesChangedWithAPIData,
        handleValuesChangedWithAPIData,
        handleAdmissionDateChange,
        handleTimeChange,
        handleIsEmployeeLeader,
        handleHasEmployeeLeader,
    };
};

export default useCreateEmployee;
