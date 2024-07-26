import React, { useContext, useState } from 'react';
import { RoleContext } from '../../../contexts/RecordsContext/RoleContext';

const useUpdateRole = () => {

  const {
    hasUpdatedRoleRecord,
    handleUpdatedRoleRecordStatusChange,
  } = useContext(RoleContext);

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

  async function handleValidateUpdateEmployeeRoleForm(
    handleCloseRoleUpdateModal,
    roleIdToUpdate,
    employeeRoleName,
    roleReportsToRole,
    employeeRoleDescription,
    employeeRoleStatus,
    handleRoleIdToUpdate,
    handleCleanDetailedRoleData
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
    await handleSubmit(roleIdToUpdate, employeeRoleName, roleReportsToRole, employeeRoleDescription, employeeRoleStatus);
    goBackToRoleList(handleCloseRoleUpdateModal, handleRoleIdToUpdate, handleCleanDetailedRoleData);
  }

  function goBackToRoleList(handleCloseRoleUpdateModal, handleRoleIdToUpdate, handleCleanDetailedRoleData) {
    handleCloseRoleUpdateModal();
    handleRoleIdToUpdate();
    handleCleanDetailedRoleData();
    handleUpdatedRoleRecordStatusChange();
  }

  const handleSubmit = async (roleIdToUpdate, employeeRoleName, roleReportsToRole, employeeRoleDescription, employeeRoleStatus) => {
    if (roleIdToUpdate && roleIdToUpdate !== "") {
      try {
        const payload = {};

        if (employeeRoleName && employeeRoleName !== "") {
          payload.RoleName = employeeRoleName;
        }


        if (employeeRoleDescription && employeeRoleDescription !== "") {
          payload.Description = employeeRoleDescription;
        }

        if (roleReportsToRole && roleReportsToRole !== "") {
          payload.Responsible = roleReportsToRole;
        }

        if (employeeRoleStatus && employeeRoleStatus !== "") {
          payload.Status = employeeRoleStatus;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_ROLE}/${roleIdToUpdate}`, {
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
    handleValidateUpdateEmployeeRoleForm
  };
};

export default useUpdateRole;
