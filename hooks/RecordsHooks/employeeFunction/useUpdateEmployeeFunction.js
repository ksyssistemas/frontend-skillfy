import React, { useContext, useState } from 'react';
import { EmployeeFunctionContext } from '../../../contexts/RecordsContext/EmployeeFunctionContext';

const useUpdateEmployeeFunction = () => {

  const {
    hasUpdatedEmployeeFunctionRecord,
    handleUpdatedEmployeeFunctionRecordStatusChange,
  } = useContext(EmployeeFunctionContext);

  // const validateAddEmployeeRoleForm = () => {
  //   if (employeeRoleName === "") {
  //     setEmployeeRoleNameState("invalid");
  //   } else {
  //     setEmployeeRoleNameState("valid");
  //   }
  //   if (employeeRoleDescription !== "") {
  //     if (employeeRoleDescription.length < 10) {
  //       setEmployeeRoleDescriptionState("invalid");
  //     } else {
  //       setEmployeeRoleDescriptionState("valid");
  //     }
  //   }
  // }

  async function handleValidateUpdateEmployeeFunctionForm(
    handleCloseEmployeeFunctionUpdateModal,
    employeeFunctionIdToUpdate,
    employeeFunctionName,
    functionReportsToRoleId,
    employeeFunctiontDescription,
    employeeFunctiontStatus,
    handleEmployeeFunctionIdToUpdate,
    handleCleanDetailedEmployeeFunctionData
  ) {
    // validateAddEmployeeRoleForm();
    // if (employeeRoleNameState === "valid" &&
    //   roleReportsToRole === "" &&
    //   employeeRoleDescription === "") {
    //   handleSubmit(employeeRoleName);
    // } else if (employeeRoleNameState === "valid" &&
    //   roleReportsToRole === "" &&
    //   employeeRoleDescription !== "") {
    //   handleSubmit(employeeRoleName, employeeRoleDescription);
    // } else if (employeeRoleNameState === "valid" &&
    //   roleReportsToRole !== "" &&
    //   employeeRoleDescription !== "") {
    //   handleSubmit(employeeRoleName, employeeRoleDescription, roleReportsToRole);
    // }
    await handleSubmit(employeeFunctionIdToUpdate, employeeFunctionName, functionReportsToRoleId, employeeFunctiontDescription, employeeFunctiontStatus);
    goBackToEmployeeFunctionList(handleCloseEmployeeFunctionUpdateModal, handleEmployeeFunctionIdToUpdate, handleCleanDetailedEmployeeFunctionData);
  }

  function goBackToEmployeeFunctionList(handleCloseEmployeeFunctionUpdateModal, handleEmployeeFunctionIdToUpdate, handleCleanDetailedEmployeeFunctionData) {
    handleCloseEmployeeFunctionUpdateModal();
    handleEmployeeFunctionIdToUpdate();
    handleCleanDetailedEmployeeFunctionData();
    handleUpdatedEmployeeFunctionRecordStatusChange();
  }

  const handleSubmit = async (employeeFunctionIdToUpdate, employeeFunctionName, functionReportsToRoleId, employeeFunctiontDescription, employeeFunctiontStatus) => {
    if (employeeFunctionIdToUpdate && employeeFunctionIdToUpdate !== "") {
      try {
        const payload = {
          status: employeeFunctiontStatus === false ? 0 : 1,
        };

        if (employeeFunctionName && employeeFunctionName !== "") {
          payload.name = employeeFunctionName;
        }


        if (employeeFunctiontDescription && employeeFunctiontDescription !== "") {
          payload.description = employeeFunctiontDescription;
        }

        if (functionReportsToRoleId && functionReportsToRoleId !== "") {
          payload.responsible = functionReportsToRoleId;
        }

        console.log(payload);

        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_FUNCTION}/${employeeFunctionIdToUpdate}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log('Data sent successfully!');
        } else {
          console.error('Erro na resposta:', response.status);
        }
      } catch (error) {
        console.error('Erro no pedido:', error);
      }
    }
  };


  return {
    handleValidateUpdateEmployeeFunctionForm
  };
};

export default useUpdateEmployeeFunction;
