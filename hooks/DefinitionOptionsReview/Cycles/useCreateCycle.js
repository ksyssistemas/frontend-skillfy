import React, { useContext, useState } from 'react';
import { CycleContext } from '../../../contexts/PerformanceContext/CycleContext';

const useCreateCycle = (handleShowAppraisalList) => {

  const { handleCreatedAppraisalCycleStatusChange } = useContext(CycleContext);

  const [cycleTitle, setCycleTitle] = useState("");
  const [cycleTitleState, setCycleTitleState] = useState(null);
  const [cyclePeriod, setCyclePeriod] = useState("");
  const [cyclePeriodState, setCyclePeriodState] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [startDateState, setStartDateState] = useState(null);
  const [finishDate, setFinishDate] = useState("");
  const [finishDateState, setFinishDateState] = useState(null);
  const [cycleObjective, setCycleObjective] = useState("");
  const [cycleObjectiveState, setCycleObjectiveState] = useState(null);
  const [cycleManager, setCycleManager] = useState("");
  const [cycleManagerState, setCycleManagerState] = useState(null);
  const [cyclePeriodDataList, setCyclePeriodDataList] = useState([]);
  const handleCyclePeriodDataList = (cyclePeriodData) => {
    setCyclePeriodDataList(cyclePeriodData);
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

  function handleValidateAddAppraisalCycleForm(handleCloseAddAppraisalCycleModal) {
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
    console.log(startDate, finishDate);
    handleSubmit(cycleTitle, cyclePeriod, startDate, finishDate, cycleObjective);
    goBackToAppraisalCycleList(handleCloseAddAppraisalCycleModal);
  }

  function goBackToAppraisalCycleList(handleCloseAddAppraisalCycleModal) {
    handleCloseAddAppraisalCycleModal();
    handleShowAppraisalList();
    reset();
    handleCreatedAppraisalCycleStatusChange();
  }

  const handleSubmit = async (cycleTitle, cyclePeriod, startDate, finishDate, cycleObjective) => {
    if (cycleTitle && cyclePeriod && startDate && finishDate && cycleObjective) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APPRAISAL_CYCLE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appraisalNameCycle: cycleTitle,
            cyclePeriod: cyclePeriod,
            appraisalCycleFromDate: startDate,
            appraisalCycleDueDate: finishDate,
            responsible: "Default",
            cycleAim: cycleObjective,
            status: true
          }),
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
    setCycleTitle("");
    setCycleTitleState(null);
    setCyclePeriod("");
    setCyclePeriodState(null);
    setStartDate("");
    setStartDateState(null);
    setFinishDate("");
    setFinishDateState(null);
    setCycleObjective("");
    setCycleObjectiveState(null);
    setCycleManager("");
    setCycleManagerState(null);
    setCyclePeriodDataList([]);
  }

  return {
    cycleTitle,
    setCycleTitle,
    cycleTitleState,
    setCycleTitleState,
    cyclePeriod,
    setCyclePeriod,
    cyclePeriodState,
    setCyclePeriodState,
    startDate,
    setStartDate,
    startDateState,
    setStartDateState,
    finishDate,
    setFinishDate,
    finishDateState,
    setFinishDateState,
    cycleObjective,
    setCycleObjective,
    cycleObjectiveState,
    setCycleObjectiveState,
    cycleManager,
    setCycleManager,
    cycleManagerState,
    setCycleManagerState,
    cyclePeriodDataList,
    setCyclePeriodDataList,
    handleCyclePeriodDataList,
    handleValidateAddAppraisalCycleForm,
    reset
  };
};

export default useCreateCycle;
