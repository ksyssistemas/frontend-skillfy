import React, { useContext, useState } from 'react';
import { EvidencesContext } from '../../../contexts/PerformanceContext/AppraisalEvidencesContext';
import useCreateEvidence from './useCreateEvidence';

const useUpdateEvidence = () => {

  const { hasUpdatedAppraisalEvidences, handleUpdatedAppraisalEvidencesStatusChange } = useContext(EvidencesContext);

  const { reset } = useCreateEvidence();

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

  async function handleValidateUpdateAppraisalEvidenceForm(
    handleCloseEvidenceModal,
    evidencesIdToUpdate,
    skillRelated,
    evidenceContent,
    evidenceStatus,
    handleEvidencesIdToUpdate,
    handleCleanDetailedEvidencesData, 
    handleSelectedSkillRelated
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
    await handleSubmit(evidencesIdToUpdate, skillRelated, evidenceContent, evidenceStatus);
    goBackToEvidenceList(handleCloseEvidenceModal, handleEvidencesIdToUpdate, handleCleanDetailedEvidencesData, handleSelectedSkillRelated);
  }

  function goBackToEvidenceList(handleCloseEvidenceModal, handleEvidencesIdToUpdate, handleCleanDetailedEvidencesData, handleSelectedSkillRelated) {
    handleCloseEvidenceModal();
    handleEvidencesIdToUpdate();
    handleCleanDetailedEvidencesData();
    reset();
    handleSelectedSkillRelated();
    handleUpdatedAppraisalEvidencesStatusChange();
  }

  const handleSubmit = async (evidencesIdToUpdate, skillRelated, evidenceContent, evidenceStatus) => {
    console.log(evidencesIdToUpdate, skillRelated, evidenceContent, evidenceStatus);
    if (evidencesIdToUpdate && evidencesIdToUpdate !== "") {
      try {
        const payload = {
          status: evidenceStatus,
        };

        if (skillRelated && skillRelated !== "") {
          payload.evidenceName = skillRelated;
        }

        if (evidenceContent && evidenceContent !== "") {
          payload.description = evidenceContent;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_EVIDENCES}/${evidencesIdToUpdate}`, {
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
    handleValidateUpdateAppraisalEvidenceForm,
  };
};

export default useUpdateEvidence;
