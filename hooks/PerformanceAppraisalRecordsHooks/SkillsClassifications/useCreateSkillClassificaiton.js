import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';

const useCreateSkillClassificaiton = () => {

  const { hasNewAppraisalSkillClassificationCreated, handleCreatedAppraisalSkillClassificaitonStatusChange } = useContext(AppraisalSkillsContext);


  const [skilClassificationName, setSkilClassificationName] = useState("");
  const [skilClassificationNameState, setSkilClassificationNameState] = useState(null);
  const [skillClassificationDescription, setSkillClassificationDescription] = useState("");
  const [skillClassificationDescriptionState, setSkillClassificationDescriptionState] = useState(null);
  const [skilClassificationDataList, setSkilClassificationDataList] = useState([]);
  const handleSkilClassificationDataList = (skilClassificationData) => {
    setSkilClassificationDataList(skilClassificationData);
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
    handleSubmit(skilClassificationName, skillClassificationDescription);
    goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal);
  }

  function goBackToAppraisalCycleList(handleCloseAddSkillClassificationModal) {
    reset();
    handleCloseAddSkillClassificationModal();
    handleCreatedAppraisalSkillClassificaitonStatusChange();
  }

  const handleSubmit = async (skilClassificationName, skillClassificationDescription) => {
    console.log(skilClassificationName, skillClassificationDescription);
    if (skilClassificationName && skillClassificationDescription) {
      try {
        const payload = {
          competenceClassificationName: skilClassificationName,
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
    setSkilClassificationName('');
    setSkilClassificationNameState(null);
    setSkillClassificationDescription('');
    setSkillClassificationDescriptionState(null);
    setSkilClassificationDataList([]);
  }

  return {
    skilClassificationName,
    setSkilClassificationName,
    skilClassificationNameState,
    setSkilClassificationNameState,
    skillClassificationDescription,
    setSkillClassificationDescription,
    skillClassificationDescriptionState,
    setSkillClassificationDescriptionState,
    skilClassificationDataList,
    setSkilClassificationDataList,
    handleSkilClassificationDataList,
    handleValidateAddSkillClassificationForm,
    reset
  };
};

export default useCreateSkillClassificaiton;
