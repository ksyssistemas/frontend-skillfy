import React, { useState, useContext } from 'react';

import { EmployeeFunctionContext } from '../../../contexts/RecordsContext/EmployeeFunctionContext';

const useCreateEmployeeFunction = (handleShowRolesUserRegister) => {

  const {
    handleCreatedEmployeeFunctionRecordStatusChange,
  } = useContext(EmployeeFunctionContext);

  const [employeeFunctionName, setEmployeeFunctionName] = useState("");
  const [employeeFunctionNameState, setEmployeeFunctionNameState] = useState(null);
  const [funtionReportsToFuntion, setFuntionReportsToFuntion] = useState("");
  const [funtionReportsToFuntionState, setFuntionReportsToFuntionState] = useState(null);
  const [employeeFunctiontDescription, setEmployeeFunctiontDescription] = useState("");
  const [employeeFunctiontDescriptionState, setEmployeeFunctiontDescriptionState] = useState(null);
  const [employeeFunctiontStatus, setEmployeeFunctiontStatus] = useState(false);
  const [employeeFunctiontStatusState, setEmployeeFunctiontStatusState] = useState(null);
  const [employeeFunctionDataList, setEmployeeFunctionDataList] = useState([]);
  const handleEmployeeFunctionDataList = (employeeFunctionData) => {
    setEmployeeFunctionDataList(employeeFunctionData);
  }

  const validateAddEmployeeFunctionForm = () => {
    if (employeeFunctionName === "") {
      setEmployeeFunctionNameState("invalid");
    } else {
      setEmployeeFunctionNameState("valid");
    }
  }

  function handleValidateAddEmployeeFunctionForm() {
    validateAddEmployeeFunctionForm();
    handleSubmit(employeeFunctionName, employeeFunctiontDescription, funtionReportsToFuntion);
  }

  const handleSubmit = async (employeeFunctionName, employeeFunctiontDescription, funtionReportsToFuntion) => {
    if (employeeFunctionName && employeeFunctionName !== "") {
      try {
        const payload = {
          name: employeeFunctionName,
        };

        if (employeeFunctiontDescription && employeeFunctiontDescription !== "") {
          payload.description = employeeFunctiontDescription;
        }

        if (funtionReportsToFuntion && funtionReportsToFuntion !== "") {
          payload.responsible = funtionReportsToFuntion;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_FUNCTION}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          resetFunction();
          handleShowRolesUserRegister();
          handleCreatedEmployeeFunctionRecordStatusChange();
          console.log('Data sent successfully!');
        } else {
          console.error('Erro na resposta:', response.status);
        }
      } catch (error) {
        console.error('Erro no pedido:', error);
      }
    }
  };

  function resetFunction() {
    setEmployeeFunctionName("");
    setEmployeeFunctionNameState(null);
    setEmployeeFunctionDataList([]);
    setFuntionReportsToFuntion("");
    setFuntionReportsToFuntionState(null);
    setEmployeeFunctiontDescription("");
    setEmployeeFunctiontDescriptionState(null);
    setEmployeeFunctiontStatus(false);
    setEmployeeFunctiontStatusState(null);
  }

  return {
    employeeFunctionName,
    setEmployeeFunctionName,
    employeeFunctionNameState,
    setEmployeeFunctionNameState,
    employeeFunctionDataList,
    setEmployeeFunctionDataList,
    funtionReportsToFuntion,
    setFuntionReportsToFuntion,
    funtionReportsToFuntionState,
    setFuntionReportsToFuntionState,
    employeeFunctiontDescription,
    setEmployeeFunctiontDescription,
    employeeFunctiontDescriptionState,
    setEmployeeFunctiontDescriptionState,
    employeeFunctiontStatus,
    setEmployeeFunctiontStatus,
    employeeFunctiontStatusState,
    setEmployeeFunctiontStatusState,
    handleValidateAddEmployeeFunctionForm,
    handleEmployeeFunctionDataList,
    resetFunction
  };
};

export default useCreateEmployeeFunction;
