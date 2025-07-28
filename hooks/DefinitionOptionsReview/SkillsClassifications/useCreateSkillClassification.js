import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';

const useCreateSkillClassification = () => {

  const { hasNewAppraisalSkillClassificationCreated, handleCreatedAppraisalSkillClassificationStatusChange } = useContext(AppraisalSkillsContext);

  const [skillClassificationName, setSkillClassificationName] = useState("");
  const [skillClassificationNameState, setSkillClassificationNameState] = useState(null);
  const [skillClassificationDescription, setSkillClassificationDescription] = useState("");
  const [skillClassificationDescriptionState, setSkillClassificationDescriptionState] = useState(null);
  const [skillClassificationDataList, setSkillClassificationDataList] = useState([]);
  const handleSkillClassificationDataList = (skillClassificationData) => {
    setSkillClassificationDataList(skillClassificationData);
  }

  const validateAddDepartmentForm = () => {
    if (departmentName === "") {
      setDepartmentNameState("invalid");
    } else {
      setDepartmentNameState("valid");
    }
    if (departmentDescription === "") {
      if (departmentDescription.length < 10) {
        setEmployeeRoleDescriptionState("invalid");
      } else {
        setEmployeeRoleDescriptionState("valid");
      }
    }
  }

  function handleValidateAddSkillClassificationForm(handleCloseAddSkillClassificationModal) {
    //validateAddDepartmentForm();
    // if (cycleTitleState === "valid" &&
    //   cyclePeriodState === "valid" &&
    //   startDateState === "valid" &&
    //   finishDateState === "valid" &&
    //   cycleObjectiveState === "valid" &&
    //   cycleManagerState === "valid"
    // ) {
    //   handleSubmit(cycleTitle, cyclePeriod, startDate, finishDate, cycleObjective);
    // } else {
    //   return null;
    // }
    handleSubmit(skillClassificationName, skillClassificationDescription);
    goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal);
  }

  function goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal) {
    reset();
    handleCloseAddSkillClassificationModal();
    handleCreatedAppraisalSkillClassificationStatusChange();
  }

  const handleSubmit = async (skillClassificationName, skillClassificationDescription) => {
    if (skillClassificationName && skillClassificationName !== "") {
      try {
        const payload = {
          competenceClassificationName: skillClassificationName,
          status: true
        };

        if (skillClassificationDescription && skillClassificationDescription !== "") {
          payload.description = skillClassificationDescription;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCE_CLASSIFICATION}`, {
          method: 'POST',
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

  function reset() {
    setSkillClassificationName('');
    setSkillClassificationNameState(null);
    setSkillClassificationDescription('');
    setSkillClassificationDescriptionState(null);
    setSkillClassificationDataList([]);
  }

  return {
    skillClassificationName,
    setSkillClassificationName,
    skillClassificationNameState,
    setSkillClassificationNameState,
    skillClassificationDescription,
    setSkillClassificationDescription,
    skillClassificationDescriptionState,
    setSkillClassificationDescriptionState,
    skillClassificationDataList,
    setSkillClassificationDataList,
    handleSkillClassificationDataList,
    handleValidateAddSkillClassificationForm,
    reset
  };
};

export default useCreateSkillClassification;
