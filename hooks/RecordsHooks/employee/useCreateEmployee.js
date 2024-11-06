// Hook para gerenciar o formulário
import React, { useContext, useState } from 'react';
import useCEP from '../useCEP';
import { EmployeeContext } from '../../../contexts/RecordsContext/EmployeeContext';

const useCreateEmployee = (state, dispatch) => {

    const {
        firstName,
        lastName,
        emailAddress,
        birthdate,
        phoneNumber,
        employeeDepartment,
        employeeRole,
        employeeFunction,
        isEmployeeLeader,
        hasEmployeeLeader,
        employeeLeaderName,
        employeeContractType,
        employeeWorkModel,
        employeeWorkplace,
        employeeAdmissionDate,
        employeeEntryTime,
        employeeStartBreakTime,
        employeeStopBreakTime,
        employeeDepartureTime,
        employeeStatus,
        firstNameState,
        lastNameState,
        emailAddressState,
        birthdateState,
        phoneNumberState,
        employeeDepartmentState,
        employeeRoleState,
        employeeContractTypeState,
        employeeWorkModelState,
        employeeWorkplaceState,
        employeeAdmissionDateState,
        employeeEntryTimeState,
        employeeStartBreakTimeState,
        employeeStopBreakTimeState,
        employeeDepartureTimeState,
    } = state.collaboratorData;

    const {
        customerIdToLinkToEmployee,
        handleCustomerIdStatusCleanup,
        handleCustomerIdToLinkToEmployee,
    } = useContext(EmployeeContext);

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

    const [hasValuesChangedWithAPIData, setHasValuesChangedWithAPIData] = React.useState(false);
    const handleValuesChangedWithAPIData = () => setHasValuesChangedWithAPIData(!hasValuesChangedWithAPIData);

    const validateSelection = () => {
        if (!isEmployeeLeader && !hasEmployeeLeader && !employeeLeaderName) {
            dispatch({ type: 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT', payload: true });
            dispatch({ type: 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT', payload: true });
            dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: 'invalid' });
        } else if (!isEmployeeLeader && hasEmployeeLeader && !employeeLeaderName) {
            dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: 'invalid' });
        } else if (!isEmployeeLeader && hasEmployeeLeader && employeeLeaderName) {
            dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: 'valid' });
        } else if (isEmployeeLeader && !hasEmployeeLeader && !employeeLeaderName) {
            dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: '' });
        }
    };

    const validateAddEmployeeForm = () => {
        // dispatch({
        //     type: 'SET_EMPLOYEE_ID_NUMBER_STATE',
        //     payload: employeeIdNumber ? "valid" : "invalid"
        // });
        dispatch({
            type: 'SET_FIRST_NAME_STATE',
            payload: firstName ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_LAST_NAME_STATE',
            payload: lastName ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMAIL_ADDRESS_STATE',
            payload: emailAddress ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_BIRTHDATE_STATE',
            payload: birthdate ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_PHONE_NUMBER_STATE',
            payload: phoneNumber ? "valid" : "invalid"
        });

        dispatch({
            type: 'SET_EMPLOYEE_DEPARTMENT',
            payload: employeeDepartment ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_ROLE',
            payload: employeeRole ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_FUNCTION',
            payload: employeeFunction ? "valid" : "invalid"
        });

        dispatch({
            type: 'SET_EMPLOYEE_CONTRACT_TYPE',
            payload: employeeContractType ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_WORK_MODEL',
            payload: employeeWorkModel ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_WORKPLACE',
            payload: employeeWorkplace ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_ADMISSION_DATE',
            payload: employeeAdmissionDate ? "valid" : "invalid"
        });

        dispatch({
            type: 'SET_EMPLOYEE_ENTRY_TIME',
            payload: employeeEntryTime ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_START_BREAK_TIME',
            payload: employeeStartBreakTime ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_STOP_BREAK_TIME',
            payload: employeeStopBreakTime ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_DEPARTURE_TIME',
            payload: employeeDepartureTime ? "valid" : "invalid"
        });
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

    const isFormValid = () => {
        return (
            firstNameState === 'valid' &&
            lastNameState === 'valid' &&
            emailAddressState === 'valid' &&
            birthdateState === 'valid' &&
            phoneNumberState === 'valid'
        );
    };

    const isFormDetailsValid = () => {
        return (
            employeeDepartmentState === "valid" &&
            employeeRoleState === "valid" &&
            employeeContractTypeState === "valid" &&
            employeeWorkModelState === "valid" &&
            employeeWorkplaceState === "valid" &&
            employeeAdmissionDateState === "valid" &&
            employeeEntryTimeState === "valid" &&
            employeeStartBreakTimeState === "valid" &&
            employeeStopBreakTimeState === "valid" &&
            employeeDepartureTimeState === "valid"
        );
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
        validateAddEmployeeForm();
        validateSelection();
        //validateAddEmployeeAddressForm();
        const isLead = isEmployeeLeader && !hasEmployeeLeader ? true : !isEmployeeLeader && hasEmployeeLeader ? false : null;

        const validForm = isFormValid();
        if (validForm) {
            const userIdCreated = await handleSubmit(
                firstName,
                lastName,
                emailAddress,
                birthdate,
                phoneNumber,
                isLead,
                employeeLeaderName,
                customerIdToLinkToEmployee,
                employeeDepartment,
                employeeRole,
                employeeFunction
            );

            const validDetails = isFormDetailsValid();
            if (validDetails && userIdCreated) {
                await handleEmployeeContactDetails(
                    employeeDepartment,
                    employeeRole,
                    employeeFunction,
                    employeeContractType,
                    employeeWorkModel,
                    employeeWorkplace,
                    employeeAdmissionDate,
                    employeeEntryTime,
                    employeeStartBreakTime,
                    employeeStopBreakTime,
                    employeeDepartureTime,
                    userIdCreated
                )
            }
            // if (
            //     employeeZipCodeState === "valid" &&
            //     employeeAddressState === "valid" &&
            //     employeeAddressNumberState === "valid" &&
            //     employeeNeighborhoodState === "valid" &&
            //     employeeCityState === "valid" &&
            //     federatedUnitState === "valid" &&
            //     userIdCreated
            // ) {
            //     await handleSubmitAddress(
            //         employeeZipCode,
            //         employeeAddress,
            //         employeeAddressNumber,
            //         employeeAddressComplement,
            //         employeeNeighborhood,
            //         employeeCity,
            //         federatedUnit,
            //         userIdCreated
            //     );
            // }
            goBackToEmployeeUserList(handleShowEmployeeUserRegister);
        }
    }

    function goBackToEmployeeUserList(handleShowEmployeeUserRegister) {
        dispatch({ type: 'RESET_COLLABORATOR_DATA' });
        handleShowEmployeeUserRegister();
    }

    const handleSubmit = async (
        firstName,
        lastName,
        emailAddress,
        birthdate,
        phoneNumber,
        isLead,
        employeeLeaderName,
        customerIdToLinkToEmployee,
        employeeDepartment,
        employeeRole,
        employeeFunction
    ) => {
        console.log(firstName,
            lastName,
            emailAddress,
            birthdate,
            phoneNumber,
            isLead,
            employeeLeaderName,
            customerIdToLinkToEmployee,
            employeeDepartment,
            employeeRole,
            employeeFunction
        );
        if (firstName,
            lastName,
            emailAddress,
            birthdate,
            phoneNumber,
            customerIdToLinkToEmployee,
            employeeDepartment,
            employeeRole
        ) {
            try {

                const payload = {
                    name: firstName,
                    lastName: lastName,
                    birthdate: birthdate,
                    email: emailAddress,
                    phoneNumber: phoneNumber,
                    status: true,
                    isLead: isLead,
                    LeaderName: employeeLeaderName,
                    customerId: customerIdToLinkToEmployee,
                    departmentId: Number(employeeDepartment),
                    rolesId: Number(employeeRole),
                };

                if (employeeFunction && employeeFunction !== "") {
                    payload.functionId = Number(employeeFunction);
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                if (response.ok) {
                    console.log("RESPONSE: ", response);
                    console.log('Data sent successfully!');
                    const data = await response.json();
                    return data.id;
                } else {
                    console.log("RESPONSE else: ", response);
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.log("RESPONSE error: ", response);
                console.error('Error in request:', error);
            }
        }
    };

    const handleEmployeeContactDetails = async (
        employeeDepartment,
        employeeRole,
        employeeFunction,
        employeeContractType,
        employeeWorkModel,
        employeeWorkplace,
        employeeAdmissionDate,
        employeeEntryTime,
        employeeStartBreakTime,
        employeeStopBreakTime,
        employeeDepartureTime,
        userIdCreated
    ) => {
        console.log(
            employeeDepartment,
            employeeRole,
            employeeFunction,
            employeeContractType,
            employeeWorkModel,
            employeeWorkplace,
            employeeAdmissionDate,
            employeeEntryTime,
            employeeStartBreakTime,
            employeeStopBreakTime,
            employeeDepartureTime,
            userIdCreated
        );
        if (employeeDepartment,
            employeeRole,
            employeeFunction,
            employeeContractType,
            employeeWorkModel,
            employeeWorkplace,
            employeeAdmissionDate,
            employeeEntryTime,
            employeeStartBreakTime,
            employeeStopBreakTime,
            employeeDepartureTime,
            userIdCreated
        ) {
            try {

                const payload = {
                    employeeId: userIdCreated,
                    departmentId: Number(employeeDepartment),
                    rolesId: Number(employeeRole),
                    contractTypeId: Number(employeeContractType),
                    contractModelId: Number(employeeWorkModel),
                    workplaceId: Number(employeeWorkplace),
                    adimissionDate: employeeAdmissionDate,
                    entryTime: employeeEntryTime,
                    startBreakTime: employeeStartBreakTime,
                    endBreakTime: employeeStopBreakTime,
                    departureTime: employeeDepartureTime,
                };

                if (employeeFunction && employeeFunction !== "") {
                    payload.employeeFunctionId = Number(employeeFunction);
                }

                console.log(payload);

                const response = await fetch(`${process.env.NEXT_PUBLIC_CONTRACT_DETAILS}`, {
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

    return {
        handleValidateAddEmployeeForm,
        validateAddEmployeeForm,
        validateAddEmployeeAddressForm,
        handleFormFieldsAutocomplete,
        hasValuesChangedWithAPIData,
        handleValuesChangedWithAPIData,
    };
};

export default useCreateEmployee;
