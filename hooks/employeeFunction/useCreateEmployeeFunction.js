import React, { useState } from 'react';

const useCreateEmployeeFunction = (handleShowRolesUserRegister) => {

  const [employeeFunctionName, setEmployeeFunctionName] = useState("");
  const [employeeFunctionNameState, setEmployeeFunctionNameState] = useState(null);
  const [employeeFunctionDataList, setEmployeeFunctionDataList] = useState([]);
  const [funtionReportsToFuntion, setFuntionReportsToFuntion] = useState("");
  const [funtionReportsToFuntionState, setFuntionReportsToFuntionState] = useState(null);
  const [employeeFunctiontDescription, setEmployeeFunctiontDescription] = useState("");
  const [employeeFunctiontDescriptionState, setEmployeeFunctiontDescriptionState] = useState(null);

  const validateAddEmployeeFunctionForm = () => {
    if (employeeFunctionName === "") {
      setEmployeeFunctionNameState("invalid");
    } else {
      setEmployeeFunctionNameState("valid");
    }
    // if (departmentReportsToDepartment === "") {
    //   setDepartmentReportsToDepartmentState("invalid");
    // } else {
    //   setDepartmentReportsToDepartmentState("valid");
    // }
    if (employeeFunctiontDescription === "") {
      setEmployeeFunctiontDescriptionState("invalid");
    } else {
      setEmployeeFunctiontDescriptionState("valid");
    }
  }

  function handleValidateAddEmployeeFunctionForm() {
    validateAddEmployeeFunctionForm();
    if (employeeFunctionNameState === "valid" &&
      employeeFunctiontDescription === "valid"
    ) {
      handleSubmit(employeeFunctionName,
        funtionReportsToFuntion,
        employeeFunctiontDescription);
    } else {
      return null;
    }
  }

  const handleSubmit = async (employeeFunctionName, funtionReportsToFuntion, employeeFunctiontDescription) => {
    if (employeeFunctionName && employeeFunctionName !== "") {
      try {
        const payload = {
          FunctionName: employeeFunctionName,
        };

        if (employeeFunctiontDescription && employeeFunctiontDescription !== "") {
          payload.Description = employeeFunctiontDescription;
        }

        if (funtionReportsToFuntion && funtionReportsToFuntion !== "") {
          payload.Responsible = funtionReportsToFuntion;
        }

        const response = await fetch(`http://dlist.com.br:3010/department`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          reset();
          handleShowRolesUserRegister();
          console.log('Data sent successfully!');
        } else {
          console.error('Erro na resposta:', response.status);
        }
      } catch (error) {
        console.error('Erro no pedido:', error);
      }
    }
  };

  function reset() {
    setEmployeeFunctionName("");
    setEmployeeFunctionNameState(null);
    setEmployeeFunctionDataList([]);
    setFuntionReportsToFuntion("");
    setFuntionReportsToFuntionState(null);
    setEmployeeFunctiontDescription("");
    setEmployeeFunctiontDescriptionState(null);
  }

  async function getEmployeeFunctionDataList() {
    try {
      const response = await fetch(`http://dlist.com.br:3010/function`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        let data = await response.json();
        if (data && data.length > 0) {
          data = data.map((employeeFunction, index) => ({
            id: index.toString(),
            text: employeeFunction.FunctionName
          }));
          setEmployeeFunctionDataList([data]);
        } else {
          setEmployeeFunctionDataList([{ id: "0", text: "Não há departamentos. É necessário cadastrar ao menos um." }])
        }
      } else {
        console.error('Erro na resposta: ', response.status);
      }
    } catch (error) {
      console.error('Erro no pedido: ', error);
    }
  };

  function handleChooseEmployeeFunction(e) {
    const selectedId = e.target.value;
    if (employeeFunctionDataList && employeeFunctionDataList.length !== 0) {
      const optionType = employeeFunctionDataList.filter(option => option.id === selectedId);
      setFuntionReportsToFuntion(optionType[0].text);
      if (optionType.length === 0) {
        setFuntionReportsToFuntionState("invalid");
      } else {
        setFuntionReportsToFuntionState("valid");
      }
    }
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
    getEmployeeFunctionDataList,
    handleChooseEmployeeFunction,
    handleValidateAddEmployeeFunctionForm
  };
};

export default useCreateEmployeeFunction;
