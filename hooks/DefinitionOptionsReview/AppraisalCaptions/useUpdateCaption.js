import React, { useContext, useState } from 'react';
import useCreateCaption from './useCreateCaption';
import { AppraisalCaptionsContext } from '../../../contexts/PerformanceContext/AprraisalCaptionsContext';
import { useFindCaptionOptionByCaptionId } from './useFindCaptionOptionByCaptionId';

const useUpdateCaption = () => {

  const {
    handleShowCaptionRegister,
    handleShowUpdateAspect,
    handleUpdatedAppraisalCaptionStatusChange,
    handleCaptionIdStatusCleanupToUpdate
  } = useContext(AppraisalCaptionsContext);

  const { reset } = useCreateCaption();

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

  async function handleValidateUpdateCaptionForm(
    captionIdToUpdate,
    captionType,
    optionsCount,
    options,
    handleSelectedCaptionStatusCleanupToUpdate
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
    await handleSubmit(captionIdToUpdate, captionType, optionsCount);

    const optionResponse = await useFindCaptionOptionByCaptionId(captionIdToUpdate);

    for (const item of optionResponse) {
      const matchingOption = options.find(option => option.id === item.id);

      if (matchingOption) {
        await handleOptionsSubmit(matchingOption, item);
      } else {
        console.warn(`No matching option found for item with id ${item.id}`);
      }
    }

    goBackToCaptionList(handleSelectedCaptionStatusCleanupToUpdate);
  }

  function goBackToCaptionList(handleSelectedCaptionStatusCleanupToUpdate) {
    handleShowCaptionRegister();
    handleShowUpdateAspect();
    handleCaptionIdStatusCleanupToUpdate();
    handleSelectedCaptionStatusCleanupToUpdate();
    reset();
    handleUpdatedAppraisalCaptionStatusChange();
  }

  const handleSubmit = async (captionIdToUpdate, captionType, optionsCount) => {
    if (captionIdToUpdate && captionIdToUpdate !== "") {
      try {
        const payload = {};

        if (captionType && captionType !== "") {
          payload.ruleType = captionType;
        }

        if (optionsCount && optionsCount !== "") {
          payload.optionsCount = optionsCount;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_EVALUATION_RULER}/${captionIdToUpdate}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Response RuleType: ", response);
          console.log('Data sent successfully!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const handleOptionsSubmit = async (options, item) => {
    console.log("Option ID UPDATED: ", item.id);
    console.log("Option paylod: ", options);
    if (item.id && item.id !== "") {
      try {
        const payload = {};

        if (options.label && options.label !== "") {
          payload.label = options.label;
        }

        if (options.weight && options.weight !== "") {
          payload.weight = options.weight;
        }

        if (options.color && options.color !== "") {
          payload.color = options.color;
        }

        if (options.emoji && options.emoji !== "") {
          payload.emoji = options.emoji;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_RULER_OPTION}/${item.id}`, {
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
    handleValidateUpdateCaptionForm,
  };
};

export default useUpdateCaption;
