import React, { useContext, useState } from 'react';
import useCreateSkillClassification from './useCreateSkillClassification';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';

const useUpdateSkillClassification = () => {

  const { hasUpdatedAppraisalSkillClassification, handleUpdatedAppraisalSkillClassificationStatusChange } = useContext(AppraisalSkillsContext);

  const { reset } = useCreateSkillClassification();

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

  async function handleValidateUpdateAppraisalSkillClassificationForm(
    handleCloseAddSkillClassificationModal,
    skillClassificationIdToUpdate,
    skillClassificationName,
    skillClassificationDescription,
    handleSkillClassificationIdToUpdate,
    handleCleanDetailedSkillClassificationsData
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
    await handleSubmit(skillClassificationIdToUpdate, skillClassificationName, skillClassificationDescription);
    goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal, handleSkillClassificationIdToUpdate, handleCleanDetailedSkillClassificationsData);
  }

  function goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal, handleSkillClassificationIdToUpdate, handleCleanDetailedSkillClassificationsData) {
    handleCloseAddSkillClassificationModal();
    handleSkillClassificationIdToUpdate();
    handleCleanDetailedSkillClassificationsData();
    reset();
    handleUpdatedAppraisalSkillClassificationStatusChange();
  }

  const handleSubmit = async (skillClassificationIdToUpdate, skillClassificationName, skillClassificationDescription) => {
    if (skillClassificationIdToUpdate && skillClassificationIdToUpdate !== ""
      && skillClassificationName && skillClassificationName !== "") {
      try {
        const payload = {
          competenceClassificationName: skillClassificationName,
        };

        if (skillClassificationDescription && skillClassificationDescription !== "") {
          payload.description = skillClassificationDescription;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCE_CLASSIFICATION}/${skillClassificationIdToUpdate}`, {
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
    handleValidateUpdateAppraisalSkillClassificationForm,
  };
};

export default useUpdateSkillClassification;
