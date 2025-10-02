// Hook para gerenciar o formulário
import { useContext, useState } from 'react';
import { EmployeeContext } from '../../../contexts/RecordsContext/EmployeeContext';

const useCreateEmployee = (state, dispatch) => {

    const legalEntityIdToLinkToEmployee = sessionStorage.getItem('userAuthData') ?
        JSON.parse(sessionStorage.getItem('userAuthData')).data.id
        : 0;

    const { handleShowDynamicEmployeeComponent } = useContext(EmployeeContext);

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
        employeeHeadedByList,
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

    const [hasValuesChangedWithAPIData, setHasValuesChangedWithAPIData] = useState(false);
    const handleValuesChangedWithAPIData = () => setHasValuesChangedWithAPIData(!hasValuesChangedWithAPIData);

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
            type: 'SET_EMPLOYEE_DEPARTMENT_STATE',
            payload: employeeDepartment ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_ROLE_STATE',
            payload: employeeRole ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_FUNCTION_STATE',
            payload: employeeFunction ? "valid" : "invalid"
        });

        dispatch({
            type: 'SET_EMPLOYEE_CONTRACT_TYPE_STATE',
            payload: employeeContractType ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_WORK_MODEL_STATE',
            payload: employeeWorkModel ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_WORKPLACE_STATE',
            payload: employeeWorkplace ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_ADMISSION_DATE_STATE',
            payload: employeeAdmissionDate ? "valid" : "invalid"
        });

        dispatch({
            type: 'SET_EMPLOYEE_ENTRY_TIME_STATE',
            payload: employeeEntryTime ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_START_BREAK_TIME_STATE',
            payload: employeeStartBreakTime ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_STOP_BREAK_TIME_STATE',
            payload: employeeStopBreakTime ? "valid" : "invalid"
        });
        dispatch({
            type: 'SET_EMPLOYEE_DEPARTURE_TIME_STATE',
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

    // Validação centralizada do campo 'Liderado por'
    const validateLeaderSelection = () => {
        if (!isEmployeeLeader && hasEmployeeLeader && (!employeeHeadedByList || employeeHeadedByList.length === 0)) {
            // Necessário ter pelo menos um líder selecionado
            dispatch({ type: 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT', payload: true });
            dispatch({ type: 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT', payload: true });
            return false; // inválido
        } else {
            dispatch({ type: 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT', payload: false });
            dispatch({ type: 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT', payload: false });
            return true; // válido
        }
    };

    async function handleValidateAddEmployeeForm() {
        validateAddEmployeeForm();

        const isLeaderSelectionValid = validateLeaderSelection();
        if (!isLeaderSelectionValid) return;

        const isLead = isEmployeeLeader && !hasEmployeeLeader
            ? true
            : !isEmployeeLeader && hasEmployeeLeader
                ? false
                : null;

        const validForm = isFormValid();
        if (!validForm) return;

        const userIdCreated = await handleSubmit(
            firstName,
            lastName,
            emailAddress,
            birthdate,
            phoneNumber,
            isLead,
            employeeHeadedByList,
            legalEntityIdToLinkToEmployee,
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
            );
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
        goBackToEmployeeUserList();
    }

    function goBackToEmployeeUserList() {
        dispatch({ type: 'RESET_COLLABORATOR_DATA' });
        handleShowDynamicEmployeeComponent('employeeList');
    }

    // Função para formatar uma data (Date) em uma string ISO (yyyy-MM-dd)
    const formatDate = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getUTCDate()).padStart(2, '0');
            return `${day}/${month}/${year}`; // Formato dd/MM/yyyy
        }
        return '';
    };

    const handleSubmit = async (
        firstName,
        lastName,
        emailAddress,
        birthdate,
        phoneNumber,
        isLead,
        employeeHeadedByList,
        legalEntityIdToLinkToEmployee,
        employeeDepartment,
        employeeRole,
        employeeFunction
    ) => {
        const formattedDate = formatDate(birthdate);

        if (!isLead && (!employeeHeadedByList || employeeHeadedByList.length === 0)) {
            console.warn(
                "Não é possível criar o colaborador: 'hasEmployeeLeader' está marcado, mas nenhum líder foi selecionado."
            );
            dispatch({ type: 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT', payload: true });
            dispatch({ type: 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT', payload: true });
            return null; // interrompe a função
        }

        let leaderIds = [];
        if (Array.isArray(employeeHeadedByList) && employeeHeadedByList.length > 0) {
            leaderIds = employeeHeadedByList
                .filter((item, index) => {
                    const isValid =
                        item &&
                        typeof item.id === "string" &&
                        typeof item.text === "string";

                    if (!isValid) {
                        console.warn(`Item inválido em employeeHeadedByList[${index}]:`, item);
                    }
                    return isValid;
                })
                .map((item) => item.id);

            if (leaderIds.length === 0 && !isLead) {
                console.warn(
                    "Nenhum líder válido encontrado em employeeHeadedByList, mas colaborador precisa ter líder."
                );
                dispatch({ type: 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT', payload: true });
                dispatch({ type: 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT', payload: true });
                return null; // interrompe execução
            }
        }

        const payload = {
            name: firstName,
            lastName: lastName,
            birthdate: formattedDate,
            email: emailAddress,
            phoneNumber: phoneNumber,
            status: true,
            isLead: isLead,
            leaderIds: leaderIds,
            customerId: Number(legalEntityIdToLinkToEmployee),
            departmentId: Number(employeeDepartment),
            rolesId: Number(employeeRole),
        };

        if (employeeFunction && employeeFunction !== "") {
            payload.functionId = Number(employeeFunction);
        }

        try {
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
