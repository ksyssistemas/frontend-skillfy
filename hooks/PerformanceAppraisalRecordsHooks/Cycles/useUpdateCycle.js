import React, { useContext, useState } from 'react';
import { CycleContext } from '../../../contexts/PerformanceContext/CycleContext';
import useCreateCycle from './useCreateCycle';

const useUpdateCycle = () => {

  const { handleUpdatedAppraisalCycleStatusChange } = useContext(CycleContext);

  const { reset } = useCreateCycle();

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

  async function handleValidateUpdateAppraisalCycleForm(
    handleCloseAddAppraisalCycleModal,
    cycleIdToUpdate,
    cycleTitle,
    cyclePeriod,
    formattedStartDate,
    formattedFinishDate,
    cycleObjective,
    handleCycleIdToUpdate,
    handleCleanDetailedAppraisalCycleData
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
    await handleSubmit(cycleIdToUpdate, cycleTitle, cyclePeriod, formattedStartDate, formattedFinishDate, cycleObjective);
    goBackToAppraisalCycleList(handleCloseAddAppraisalCycleModal, handleCycleIdToUpdate, handleCleanDetailedAppraisalCycleData);
  }

  function goBackToAppraisalCycleList(handleCloseAddAppraisalCycleModal, handleCycleIdToUpdate, handleCleanDetailedAppraisalCycleData) {
    handleCloseAddAppraisalCycleModal();
    handleCycleIdToUpdate();
    handleCleanDetailedAppraisalCycleData();
    reset();
    handleUpdatedAppraisalCycleStatusChange();
  }

  const handleSubmit = async (cycleIdToUpdate, cycleTitle, cyclePeriod, formattedStartDate, formattedFinishDate, cycleObjective) => {
    if (cycleIdToUpdate && cycleIdToUpdate !== "" && formattedStartDate && formattedStartDate !== "" && formattedFinishDate && formattedFinishDate !== "") {
      try {
        const payload = {
          appraisalCycleFromDate: formattedStartDate,
          appraisalCycleDueDate: formattedFinishDate
        };

        if (cycleTitle && cycleTitle !== "") {
          payload.appraisalNameCycle = cycleTitle;
        }

        if (cyclePeriod && cyclePeriod !== "") {
          payload.cyclePeriod = cyclePeriod;
        }

        if (cycleObjective && cycleObjective !== "") {
          payload.cycleAim = cycleObjective;
        }
        if (cyclePeriod && cyclePeriod !== "") {
          payload.cyclePeriod = cyclePeriod;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_APPRAISAL_CYCLE}/${cycleIdToUpdate}`, {
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
    handleValidateUpdateAppraisalCycleForm,
  };
};

export default useUpdateCycle;
