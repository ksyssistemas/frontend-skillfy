import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';
import useCreateOccupationalGroup from './useCreateOccupationalGroup';

const useUpdateOccupationalGroup = () => {

  const { hasUpdatedAppraisalOccupationalGroup, handleUpdatedAppraisalOccupationalGroupStatusChange } = useContext(AppraisalSkillsContext);

  const { reset } = useCreateOccupationalGroup();

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

  async function handleValidateUpdateAppraisalOccupationalGroupForm(
    handleCloseOccupationalGroupModal,
    occupationalGroupIdToUpdate,
    occupationalGroupName,
    occupationalGroupDescription,
    handleOccupationalGroupIdToUpdate,
    handleCleanDetailedOccupationalGroupsData
  ) {
    //validateAddDepartmentForm();
    // if (cycleTitleState === "valid" &&
    //   cyclePeriodState === "valid" &&
    //   startDateState === "valid" &&
    //   finishDateState === "valid" &&
    //   cycleObjectiveState === "valid" &&
    //   cycleManagerState === "valid"
    // ) {
    //   handleSubmit(cycleTitle, cyclePeriod, formattedStartDate, formattedFinishDate, cycleObjective);
    // } else {
    //   return null;
    // }
    await handleSubmit(occupationalGroupIdToUpdate, occupationalGroupName, occupationalGroupDescription);
    goBackToOccupationalGroupList(handleCloseOccupationalGroupModal, handleOccupationalGroupIdToUpdate, handleCleanDetailedOccupationalGroupsData);
  }

  function goBackToOccupationalGroupList(handleCloseOccupationalGroupModal, handleOccupationalGroupIdToUpdate, handleCleanDetailedOccupationalGroupsData) {
    handleCloseOccupationalGroupModal();
    handleOccupationalGroupIdToUpdate();
    handleCleanDetailedOccupationalGroupsData();
    reset();
    handleUpdatedAppraisalOccupationalGroupStatusChange();
  }

  const handleSubmit = async (occupationalGroupIdToUpdate, occupationalGroupName, occupationalGroupDescription) => {
    if (occupationalGroupIdToUpdate && occupationalGroupIdToUpdate !== ""
      && occupationalGroupName && occupationalGroupName !== ""
      && occupationalGroupDescription && occupationalGroupDescription !== "") {
      try {
        const payload = {
          competencieName: occupationalGroupName,
          description: occupationalGroupDescription
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_OCCUPATIONAL_GROUP}/${occupationalGroupIdToUpdate}`, {
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

  return {
    handleValidateUpdateAppraisalOccupationalGroupForm,
  };
};

export default useUpdateOccupationalGroup;
