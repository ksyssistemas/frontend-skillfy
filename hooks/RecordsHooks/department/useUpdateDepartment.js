import React, { useState, useContext } from 'react';

import { DepartmentContext } from "../../../contexts/RecordsContext/DepartmentContext";

const useUpdateDepartment = () => {

  const {
    hasUpdatedDepartmentRecord,
    handleUpdatedDepartmentRecordStatusChange,
  } = useContext(DepartmentContext);

  // const validateAddDepartmentForm = () => {
  //   if (departmentName === "") {
  //     setDepartmentNameState("invalid");
  //   } else {
  //     setDepartmentNameState("valid");
  //   }
  //   if (departmentDescription === "") {
  //     if (departmentDescription.length < 10) {
  //       setEmployeeRoleDescriptionState("invalid");
  //     } else {
  //       setEmployeeRoleDescriptionState("valid");
  //     }
  //   }
  // }

  async function handleValidateUpdateDepartmentForm(handleCloseDepartmentUpdateModal,
    departmentIdToUpdate,
    departmentName,
    departmentReportsToDepartment,
    departmentDescription,
    departmentStatus,
    handleDepartmentIdToUpdate,
    handleCleanDetailedDepartmentData
  ) {

    // validateAddDepartmentForm();
    // if (departmentNameState === "valid" &&
    //   departmentReportsToDepartmentState === "" &&
    //   departmentDescriptionState === "") {
    //   handleSubmit(departmentName);
    // } else if (departmentNameState === "valid" &&
    //   departmentReportsToDepartmentState === "" &&
    //   departmentDescriptionState !== "") {
    //   handleSubmit(departmentName, departmentDescription);
    // } else if (departmentNameState === "valid" &&
    //   departmentReportsToDepartmentState !== "" &&
    //   departmentDescriptionState !== "") {
    //   handleSubmit(departmentName, departmentDescription, departmentReportsToDepartment);
    // }
    console.log(departmentIdToUpdate, departmentName, departmentReportsToDepartment, departmentDescription, departmentStatus);
    await handleSubmit(departmentIdToUpdate, departmentName, departmentReportsToDepartment, departmentDescription, departmentStatus);
    goBackToDepartmentList(handleCloseDepartmentUpdateModal, handleDepartmentIdToUpdate, handleCleanDetailedDepartmentData);
  }

  function goBackToDepartmentList(handleCloseDepartmentUpdateModal, handleDepartmentIdToUpdate, handleCleanDetailedDepartmentData) {
    handleCloseDepartmentUpdateModal();
    handleDepartmentIdToUpdate();
    handleCleanDetailedDepartmentData();
    handleUpdatedDepartmentRecordStatusChange();
  }

  const handleSubmit = async (departmentIdToUpdate, departmentName, departmentReportsToDepartment, departmentDescription, departmentStatus) => {
    if (departmentIdToUpdate && departmentIdToUpdate !== "") {
      try {
        const payload = {};

        if (departmentName && departmentName !== "") {
          payload.departmentName = departmentName;
        }

        if (departmentReportsToDepartment && departmentReportsToDepartment !== "") {
          payload.responsible = String(departmentReportsToDepartment);
        }

        if (departmentDescription && departmentDescription !== "") {
          payload.description = departmentDescription;
        }

        if (departmentStatus) {
          payload.status = departmentStatus;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_DEPARTMENT}/${departmentIdToUpdate}`, {
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
    handleValidateUpdateDepartmentForm
  };
};

export default useUpdateDepartment;
