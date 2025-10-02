// Hook para gerenciar o formulário
import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../../../contexts/RecordsContext/EmployeeContext';

const useUpdateEmployee = () => {

    const {
        employeeIdToUpdate,
        handleUpdatedEmployeeRecordStatusChange,
    } = useContext(EmployeeContext);

    const validateLeaderSelection = (state, dispatch) => {
        const list = state.collaboratorData.employeeHeadedByList || [];

        if (state.collaboratorData.hasEmployeeLeader && list.length === 0) {
            dispatch({ type: "SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT", payload: true });
            dispatch({ type: "SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT", payload: true });
            return false;
        }

        dispatch({ type: "SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT", payload: false });
        dispatch({ type: "SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT", payload: false });
        return true;
    };

    async function handleValidateUpdateEmployeeForm(
        state,
        dispatch,
        formattedBirthdate,
        formattedEmployeeAdmission,
        handleOpenEmployeeModal,
        handleEmployeeIdToUpdate,
        handleEmployeeIdStatusCleanupToUpdate,
        handleCloseEmployeeUpdateModal
    ) {
        //validateAddEmployeeForm();
        //validateSelection();
        //validateAddEmployeeAddressForm();

        const data = state.collaboratorData;

        // Validação de líderes
        const isLeaderSelectionValid = validateLeaderSelection(state, dispatch);
        if (!isLeaderSelectionValid) return;

        // Determina se é líder ou liderado
        let isLead = null;
        if (data.isEmployeeLeader && !data.hasEmployeeLeader) isLead = true;
        else if (!data.isEmployeeLeader && data.hasEmployeeLeader) isLead = false;

        // Envia atualização do colaborador
        await handleSubmit({ data, formattedBirthdate });

        await handleEmployeeContactDetails({ data, formattedEmployeeAdmission });

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

        goBackToEmployeeUserList(
            handleOpenEmployeeModal,
            handleEmployeeIdToUpdate,
            handleEmployeeIdStatusCleanupToUpdate,
            handleCloseEmployeeUpdateModal
        );
    }

    function goBackToEmployeeUserList(
        handleOpenEmployeeModal,
        handleEmployeeIdToUpdate,
        handleEmployeeIdStatusCleanupToUpdate,
        handleCloseEmployeeUpdateModal
    ) {
        handleOpenEmployeeModal();
        handleEmployeeIdToUpdate();
        handleEmployeeIdStatusCleanupToUpdate();
        handleCloseEmployeeUpdateModal();
        handleUpdatedEmployeeRecordStatusChange();
    };

    const handleSubmit = async ({ data, formattedBirthdate }) => {
        if (!employeeIdToUpdate) return;

        const isLead = data.isEmployeeLeader && !data.hasEmployeeLeader
            ? true
            : !data.isEmployeeLeader && data.hasEmployeeLeader
                ? false
                : null;

        const leaderIds = Array.isArray(data.employeeHeadedByList)
            ? data.employeeHeadedByList.map(item => item.id)
            : [];

        try {
            const payload = {
                isLead,
                status: data.employeeStatus,
                leaderIds,
            };

            if (data.firstName && data.firstName !== "") {
                payload.name = data.firstName;
            }


            if (data.lastName && data.lastName !== "") {
                payload.lastName = data.lastName;
            }


            if (formattedBirthdate && formattedBirthdate !== "") {
                payload.birthdate = formattedBirthdate;
            }


            if (data.emailAddress && data.emailAddress !== "") {
                payload.email = data.emailAddress;
            }


            if (data.phoneNumber && data.phoneNumber !== "") {
                payload.phoneNumber = data.phoneNumber;
            }

            if (data.departmentWhichEmployeeReports && data.departmentWhichEmployeeReports !== "") {
                payload.departmentId = Number(data.departmentWhichEmployeeReports);
            }


            if (data.employeeRole && data.employeeRole !== "") {
                payload.rolesId = Number(data.employeeRole);
            }


            if (data.employeeFunction && data.employeeFunction !== "") {
                payload.functionId = Number(data.employeeFunction);
            }

            console.log('PAYLOAD PATCH:', payload);

            const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}/updateEmployee/${employeeIdToUpdate}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Dados do colaborador atualizados com sucesso!');
                const result = await response.json();
                return result.id;
            } else {
                console.error('Erro ao atualizar colaborador:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição de atualização de colaborador:', error);
        }
    };

    const handleEmployeeContactDetails = async ({ data, formattedEmployeeAdmission }) => {
        try {
            const payload = {};

            if (data.departmentWhichEmployeeReports && data.departmentWhichEmployeeReports !== "") {
                payload.departmentId = Number(data.departmentWhichEmployeeReports);
            }

            if (data.employeeRole && data.employeeRole !== "") {
                payload.rolesId = Number(data.employeeRole);
            }

            if (data.employeeFunction && data.employeeFunction !== "") {
                payload.employeeFunctionId = Number(data.employeeFunction);
            }

            if (data.employeeContractType && data.employeeContractType !== "") {
                payload.contractTypeId = Number(data.employeeContractType);
            }

            if (data.employeeWorkModel && data.employeeWorkModel !== "") {
                payload.contractModelId = Number(data.employeeWorkModel);
            }

            if (data.employeeWorkplace && data.employeeWorkplace !== "") {
                payload.workplaceId = Number(data.employeeWorkplace);
            }

            if (formattedEmployeeAdmission && formattedEmployeeAdmission !== "") {
                payload.adimissionDate = formattedEmployeeAdmission;
            }

            if (data.employeeEntryTime && data.employeeEntryTime !== "") {
                payload.entryTime = data.employeeEntryTime;
            }

            if (data.employeeStartBreakTime && data.employeeStartBreakTime !== "") {
                payload.startBreakTime = data.employeeStartBreakTime;
            }

            if (data.employeeStopBreakTime && data.employeeStopBreakTime !== "") {
                payload.endBreakTime = data.employeeStopBreakTime;
            }

            if (data.employeeDepartureTime && data.employeeDepartureTime !== "") {
                payload.departureTime = data.employeeDepartureTime;
            }

            console.log('PAYLOAD PATCH CONTRATO:', payload);

            const response = await fetch(`${process.env.NEXT_PUBLIC_CONTRACT_DETAILS}/employee/${employeeIdToUpdate}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Detalhes do contrato atualizados com sucesso!');
            } else {
                console.error('Erro ao atualizar detalhes do contrato:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição de atualização de contrato:', error);
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
