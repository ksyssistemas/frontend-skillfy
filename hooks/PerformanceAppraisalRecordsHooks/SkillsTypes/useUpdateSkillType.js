import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';
import useCreateSkillType from './useCreateSkillType';

const useUpdateSkillType = () => {

  const { hasUpdatedAppraisalSkillType, handleUpdatedAppraisalSkillTypeStatusChange } = useContext(AppraisalSkillsContext);

  const { reset } = useCreateSkillType();

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

  async function handleValidateUpdateAppraisalSkillTypeForm(
    handleCloseSkillTipeModal,
    skillTypeIdToUpdate,
    skillTypeName,
    skillTypeDescription,
    handleSkillTypeIdToUpdate,
    handleCleanDetailedSkillTypesData
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
    await handleSubmit(skillTypeIdToUpdate, skillTypeName, skillTypeDescription);
    goBackToSkillTypesList(handleCloseSkillTipeModal, handleSkillTypeIdToUpdate, handleCleanDetailedSkillTypesData);
  }

  function goBackToSkillTypesList(handleCloseSkillTipeModal, handleSkillTypeIdToUpdate, handleCleanDetailedSkillTypesData) {
    handleCloseSkillTipeModal();
    handleSkillTypeIdToUpdate();
    handleCleanDetailedSkillTypesData();
    reset();
    handleUpdatedAppraisalSkillTypeStatusChange();
  }

  const handleSubmit = async (skillTypeIdToUpdate, skillTypeName, skillTypeDescription) => {
    if (skillTypeIdToUpdate && skillTypeIdToUpdate !== ""
      && skillTypeName && skillTypeName !== ""
      && skillTypeDescription && skillTypeDescription !== "") {
      try {
        const payload = {
          competencieTypeName: skillTypeName,
          description: skillTypeDescription
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCE_TYPE}/${skillTypeIdToUpdate}`, {
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
    handleValidateUpdateAppraisalSkillTypeForm,
  };
};

export default useUpdateSkillType;
