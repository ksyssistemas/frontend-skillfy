import React, { useState } from 'react';

const useCreateDepartment = (handleShowDepartmentsUserRegister) => {

  const [departmentName, setDepartmentName] = useState("");
  const [departmentNameState, setDepartmentNameState] = useState(null);
  const [departmentDataList, setDepartmentDataList] = useState([]);
  const [departmentReportsToDepartment, setDepartmentReportsToDepartment] = useState("");
  const [departmentReportsToDepartmentState, setDepartmentReportsToDepartmentState] = useState(null);
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentDescriptionState, setDepartmentDescriptionState] = useState(null);

  const validateAddDepartmentForm = () => {
    console.log(departmentName, departmentReportsToDepartment, departmentDescription)
    if (departmentName === "") {
      setDepartmentNameState("invalid");
    } else {
      setDepartmentNameState("valid");
    }
    // if (departmentReportsToDepartment === "") {
    //   setDepartmentReportsToDepartmentState("invalid");
    // } else {
    //   setDepartmentReportsToDepartmentState("valid");
    // }
    // if (departmentDescription === "") {
    //   setDepartmentDescriptionState("invalid");
    // } else {
    //   setDepartmentDescriptionState("valid");
    // }
  }

  function handleValidateAddDepartmentForm() {
    validateAddDepartmentForm();
    if (departmentNameState === "valid" &&
      departmentReportsToDepartment === "" &&
      departmentDescription === "") {
      handleSubmit(departmentName);
    } else if (departmentNameState === "valid" &&
      departmentReportsToDepartment === "" &&
      departmentDescription !== "") {
      handleSubmit(departmentName, departmentDescription);
    } else if (departmentNameState === "valid" &&
      departmentReportsToDepartment !== "" &&
      departmentDescription !== "") {
      handleSubmit(departmentName, departmentDescription, departmentReportsToDepartment);
    }
  }

  const handleSubmit = async (departmentName, departmentDescription, departmentReportsToDepartment) => {
    if (departmentName && departmentName !== "") {
      try {
        const payload = {
          DepartmentName: departmentName,
        };

        if (departmentDescription && departmentDescription !== "") {
          payload.Description = departmentDescription;
        }

        if (departmentReportsToDepartment && departmentReportsToDepartment !== "") {
          payload.Responsible = departmentReportsToDepartment;
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
          handleShowDepartmentsUserRegister();
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
    setDepartmentName("");
    setDepartmentNameState(null);
    setDepartmentDataList([]);
    setDepartmentReportsToDepartment("");
    setDepartmentReportsToDepartmentState(null);
    setDepartmentDescription("");
    setDepartmentDescriptionState(null);
  }

  async function getDepartmentDataList() {
    try {
      const response = await fetch(`http://dlist.com.br:3010/department`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        let data = await response.json();
        if (data && data.length > 0) {
          data = data.map((department, index) => ({
            id: index.toString(),
            text: department.DepartmentName
          }));
          setDepartmentDataList([data]);
        } else {
          setDepartmentDataList([{ id: "0", text: "Não há departamentos. É necessário cadastrar ao menos um." }])
        }
      } else {
        console.error('Erro na resposta: ', response.status);
      }
    } catch (error) {
      console.error('Erro no pedido: ', error);
    }
  };

  function handleChooseDepartment(e) {
    const selectedId = e.target.value;
    if (departmentDataList && departmentDataList.length !== 0) {
      const optionType = departmentDataList.filter(option => option.id === selectedId);
      setDepartmentReportsToDepartment(optionType[0].text);
      if (optionType.length === 0) {
        setDepartmentReportsToDepartmentState("invalid");
      } else {
        setDepartmentReportsToDepartmentState("valid");
      }
    }
  }

  return {
    departmentName,
    setDepartmentName,
    departmentNameState,
    setDepartmentNameState,
    departmentDataList,
    setDepartmentDataList,
    departmentReportsToDepartment,
    setDepartmentReportsToDepartment,
    departmentReportsToDepartmentState,
    setDepartmentReportsToDepartmentState,
    departmentDescription,
    setDepartmentDescription,
    departmentDescriptionState,
    setDepartmentDescriptionState,
    handleValidateAddDepartmentForm,
    getDepartmentDataList,
    handleChooseDepartment
  };
};

export default useCreateDepartment;
