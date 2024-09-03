// Hook para gerenciar o formulário
import React, { useContext, useState } from 'react';
import useCEP from '../useCEP';
import { EmployeeContext } from '../../../contexts/RecordsContext/EmployeeContext';

const useUpdateEmployee = () => {

    const {
        employeeIdToUpdate,
        handleEmployeeIdStatusCleanupToUpdate,
        handleEmployeeIdToUpdate,
        handleUpdatedEmployeeRecordStatusChange,
    } = useContext(EmployeeContext);

    // const validateSelection = () => {
    //     if (!isEmployeeLeader && !hasEmployeeLeader && !employeeLeaderName) {
    //         setIsInvalidEmployeeLeaderComponent(true);
    //         setShowErrorFeedbackEmployeeLeaderComponent(true);
    //         setEmployeeLeaderNameState("invalid");
    //     } else if (!isEmployeeLeader && hasEmployeeLeader && !employeeLeaderName) {
    //         setIsInvalidEmployeeLeaderComponent(false);
    //         setShowErrorFeedbackEmployeeLeaderComponent(false);
    //         setEmployeeLeaderNameState("invalid");
    //     } else if (!isEmployeeLeader && hasEmployeeLeader && employeeLeaderName) {
    //         setIsInvalidEmployeeLeaderComponent(false);
    //         setShowErrorFeedbackEmployeeLeaderComponent(false);
    //         setEmployeeLeaderNameState("valid");
    //     } else if (isEmployeeLeader && !hasEmployeeLeader && !employeeLeaderName) {
    //         setIsInvalidEmployeeLeaderComponent(false);
    //         setShowErrorFeedbackEmployeeLeaderComponent(false);
    //         setEmployeeLeaderNameState("");
    //     }
    // };

    // const validateAddEmployeeForm = () => {
    //     if (employeeIdNumber === "") {
    //         setEmployeeIdNumberState("invalid");
    //     } else {
    //         setEmployeeIdNumberState("valid");
    //     }
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
    //     if (phoneNumber === "") {
    //         setPhoneNumberState("invalid");
    //     } else {
    //         setPhoneNumberState("valid");
    //     }
    //     if (departmentWhichEmployeeReports === "") {
    //         setDepartmentWhichEmployeeReportsState("invalid");
    //     } else {
    //         setDepartmentWhichEmployeeReportsState("valid");
    //     }
    //     if (employeeRole === "") {
    //         setEmployeeRoleState("invalid");
    //     } else {
    //         setEmployeeRoleState("valid");
    //     }
    //     if (employeeFunction === "") {
    //         setEmployeeFunctionState("invalid");
    //     } else {
    //         setEmployeeFunctionState("valid");
    //     }
    //     if (employeeContractType === "") {
    //         setEmployeeContractTypeState("invalid");
    //     } else {
    //         setEmployeeContractTypeState("valid");
    //     }
    //     if (employeeWorkModel === "") {
    //         setEmployeeWorkModelState("invalid");
    //     } else {
    //         setEmployeeWorkModelState("valid");
    //     }
    //     if (employeeWorkplace === "") {
    //         setEmployeeWorkplaceState("invalid");
    //     } else {
    //         setEmployeeWorkplaceState("valid");
    //     }
    //     if (employeetAdmissionDate === "") {
    //         setEmployeetAdmissionDateState("invalid");
    //     } else {
    //         setEmployeetAdmissionDateState("valid");
    //     }
    //     if (employeeEntryTime === "") {
    //         setEmployeeEntryTimeState("invalid");
    //     } else {
    //         setEmployeeEntryTimeState("valid");
    //     }
    //     if (employeeBreakTime === "") {
    //         setEmployeeBreakTimeState("invalid");
    //     } else {
    //         setEmployeeBreakTimeState("valid");
    //     }
    //     if (employeeDepartureTime === "") {
    //         setEmployeeDepartureTimeState("invalid");
    //     } else {
    //         setEmployeeDepartureTimeState("valid");
    //     }
    // };

    // const validateAddEmployeeAddressForm = () => {
    //     if (employeeZipCode === "") {
    //         setEmployeeZipCodeState("invalid");
    //     } else {
    //         setEmployeeZipCodeState("valid");
    //     }
    //     if (employeeAddress === "") {
    //         setEmployeeAddressState("invalid");
    //     } else {
    //         setEmployeeAddressState("valid");
    //     }
    //     if (employeeAddressNumber === "") {
    //         setEmployeeAddressNumberState("invalid");
    //     } else {
    //         setEmployeeAddressNumberState("valid");
    //     }
    //     if (employeeAddressComplement === "") {
    //         setEmployeeAddressComplementState("invalid");
    //     } else {
    //         setEmployeeAddressComplementState("valid");
    //     }
    //     if (employeeNeighborhood === "") {
    //         setEmployeeNeighborhoodState("invalid");
    //     } else {
    //         setEmployeeNeighborhoodState("valid");
    //     }
    //     if (employeeCity === "") {
    //         setEmployeeCityState("invalid");
    //     } else {
    //         setEmployeeCityState("valid");
    //     }
    //     if (federatedUnit === "") {
    //         setFederatedUnitState("invalid");
    //     } else {
    //         setFederatedUnitState("valid");
    //     }
    // };

    async function handleValidateUpdateEmployeeForm(
        handleOpenEmployeeModal,
        firstName,
        lastName,
        formattedBirthdate,
        emailAddress,
        phoneNumber,
        employeeLeaderName,
        isEmployeeLeader,
        hasEmployeeLeader,
        employeeStatus,
        departmentWhichEmployeeReports,
        employeeRole,
        employeeFunction,
        employeeContractType,
        employeeWorkModel,
        employeeWorkplace,
        formattedAdmissionDate,
        employeeEntryTime,
        employeeStartBreakTime,
        employeeStopBreakTime,
        employeeDepartureTime,
        handleEmployeeIdToUpdate,
        handleEmployeeIdStatusCleanupToUpdate,
        handleCloseEmployeeUpdateModal
    ) {
        let isLead;
        //validateAddEmployeeForm();
        //validateSelection();
        //validateAddEmployeeAddressForm();
        if (isEmployeeLeader && !hasEmployeeLeader) {
            isLead = true;
        } else if (!isEmployeeLeader && hasEmployeeLeader) {
            isLead = false;
        } else {
            isLead = null;
        }
        // if (firstNameState === "valid" &&
        //     lastNameState === "valid" &&
        //     birthdateState === "valid" &&
        //     emailAddressState === "valid" &&
        //     phoneNumberState === "valid" && 
        //     employeeLeaderNameState === "valid"
        // ) {
        await handleSubmit(
            firstName,
            lastName,
            emailAddress,
            formattedBirthdate,
            phoneNumber,
            isLead,
            employeeLeaderName,
            departmentWhichEmployeeReports,
            employeeRole,
            employeeFunction,
            employeeStatus
        );
        // if (
        // departmentWhichEmployeeReportsState === "valid" &&
        // employeeRoleState === "valid" &&
        // employeeFunctionState === "valid" &&
        // employeeContractTypeState === "valid" &&
        // employeeWorkModelState === "valid" &&
        // employeeWorkplaceState === "valid" &&
        // employeetAdmissionDateState === "valid" &&
        // employeeEntryTimeState === "valid" &&
        // employeeBreakTimeState === "valid" &&
        // employeeDepartureTimeState === "valid" &&
        //     userIdCreated
        // ) {
        await handleEmployeeContactDetails(
            departmentWhichEmployeeReports,
            employeeRole,
            employeeFunction,
            employeeContractType,
            employeeWorkModel,
            employeeWorkplace,
            formattedAdmissionDate,
            employeeEntryTime,
            employeeStartBreakTime,
            employeeStopBreakTime,
            employeeDepartureTime
        )
        // }
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
        goBackToEmployeeUserList(handleOpenEmployeeModal, handleEmployeeIdToUpdate, handleEmployeeIdStatusCleanupToUpdate, handleCloseEmployeeUpdateModal);
    }


    function goBackToEmployeeUserList(handleOpenEmployeeModal, handleEmployeeIdToUpdate, handleEmployeeIdStatusCleanupToUpdate, handleCloseEmployeeUpdateModal) {
        handleOpenEmployeeModal();
        handleEmployeeIdToUpdate();
        handleEmployeeIdStatusCleanupToUpdate();
        handleCloseEmployeeUpdateModal();
        handleUpdatedEmployeeRecordStatusChange();
    };

    const handleSubmit = async (
        firstName,
        lastName,
        emailAddress,
        formattedBirthdate,
        phoneNumber,
        isLead,
        employeeLeaderName,
        departmentWhichEmployeeReports,
        employeeRole,
        employeeFunction,
        employeeStatus
    ) => {
        if (employeeIdToUpdate && employeeIdToUpdate !== "") {
            try {

                const payload = {
                    isLead: isLead,
                    status: employeeStatus,
                    LeaderName: employeeLeaderName
                };

                if (firstName && firstName !== "") {
                    payload.name = firstName;
                }


                if (lastName && lastName !== "") {
                    payload.lastName = lastName;
                }


                if (formattedBirthdate && formattedBirthdate !== "") {
                    payload.birthdate = formattedBirthdate;
                }


                if (emailAddress && emailAddress !== "") {
                    payload.email = emailAddress;
                }


                if (phoneNumber && phoneNumber !== "") {
                    payload.phoneNumber = phoneNumber;
                }

                if (departmentWhichEmployeeReports && departmentWhichEmployeeReports !== "") {
                    payload.departmentId = Number(departmentWhichEmployeeReports);
                }


                if (employeeRole && employeeRole !== "") {
                    payload.rolesId = Number(employeeRole);
                }


                if (employeeFunction && employeeFunction !== "") {
                    payload.functionId = Number(employeeFunction);
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}/${employeeIdToUpdate}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
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
        employeeStartBreakTime,
        employeeStopBreakTime,
        employeeDepartureTime
    ) => {
        if (departmentWhichEmployeeReports,
            employeeRole,
            employeeFunction,
            employeeContractType,
            employeeWorkModel,
            employeeWorkplace,
            employeetAdmissionDate,
            employeeEntryTime,
            employeeStartBreakTime,
            employeeStopBreakTime,
            employeeDepartureTime
        ) {
            try {

                const payload = {};

                if (departmentWhichEmployeeReports && departmentWhichEmployeeReports !== "") {
                    payload.departmentId = Number(departmentWhichEmployeeReports);
                }

                if (employeeRole && employeeRole !== "") {
                    payload.rolesId = Number(employeeRole);
                }

                if (employeeFunction && employeeFunction !== "") {
                    payload.employeeFunctionId = Number(employeeFunction);
                }

                if (employeeContractType && employeeContractType !== "") {
                    payload.contractTypeId = Number(employeeContractType);
                }

                if (employeeWorkModel && employeeWorkModel !== "") {
                    payload.contractModelId = Number(employeeWorkModel);
                }

                if (employeeWorkplace && employeeWorkplace !== "") {
                    payload.workplaceId = Number(employeeWorkplace);
                }

                if (employeetAdmissionDate && employeetAdmissionDate !== "") {
                    payload.adimissionDate = employeetAdmissionDate;
                }

                if (employeeEntryTime && employeeEntryTime !== "") {
                    payload.entryTime = employeeEntryTime;
                }

                if (employeeStartBreakTime && employeeStartBreakTime !== "") {
                    payload.startBreakTime = employeeStartBreakTime;
                }

                if (employeeStopBreakTime && employeeStopBreakTime !== "") {
                    payload.endBreakTime = employeeStopBreakTime;
                }

                if (employeeDepartureTime && employeeDepartureTime !== "") {
                    payload.departureTime = employeeDepartureTime;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_CONTRACT_DETAILS}/employee/${employeeIdToUpdate}`, {
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
        handleValidateUpdateEmployeeForm
    };
}

export default useUpdateEmployee;
