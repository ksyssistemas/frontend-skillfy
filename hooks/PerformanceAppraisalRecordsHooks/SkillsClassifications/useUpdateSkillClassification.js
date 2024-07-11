import React, { useContext, useState } from 'react';
import { CycleContext } from '../../../contexts/PerformanceContext/CycleContext';
import useCreateSkillClassificaiton from './useCreateSkillClassificaiton';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';

const useUpdateSkillClassificaiton = () => {

  const { hasUpdatedAppraisalSkillClassificaiton, handleUpdatedAppraisalSkillClassificaitonStatusChange } = useContext(AppraisalSkillsContext);

  const { reset } = useCreateSkillClassificaiton();

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
    skilClassificationName,
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
    await handleSubmit(skillClassificationIdToUpdate, skilClassificationName, skillClassificationDescription);
    goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal, handleSkillClassificationIdToUpdate, handleCleanDetailedSkillClassificationsData);
  }

  function goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal, handleSkillClassificationIdToUpdate, handleCleanDetailedSkillClassificationsData) {
    handleCloseAddSkillClassificationModal();
    handleSkillClassificationIdToUpdate();
    handleCleanDetailedSkillClassificationsData();
    reset();
    handleUpdatedAppraisalSkillClassificaitonStatusChange();
  }

  const handleSubmit = async (skillClassificationIdToUpdate, skilClassificationName, skillClassificationDescription) => {
    if (skillClassificationIdToUpdate && skillClassificationIdToUpdate !== ""
      && skilClassificationName && skilClassificationName !== ""
      && skillClassificationDescription && skillClassificationDescription !== "") {
      try {
        const payload = {
          competenceClassificationName: skilClassificationName,
          description: skillClassificationDescription
        };

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

export default useUpdateSkillClassificaiton;
