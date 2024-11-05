import React, { useState } from 'react';

const useCreateDepartment = (handleShowDepartmentsUserRegister) => {

  const [departmentName, setDepartmentName] = useState("");
  const [departmentNameState, setDepartmentNameState] = useState(null);
  const [departmentReportsToDepartment, setDepartmentReportsToDepartment] = useState("");
  const [departmentReportsToDepartmentState, setDepartmentReportsToDepartmentState] = useState(null);
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentDescriptionState, setDepartmentDescriptionState] = useState(null);
  const [departmentStatus, setDepartmentStatus] = useState("");
  const [departmentStatusState, setDepartmentStatusState] = useState(false);
  const [departmentDataList, setDepartmentDataList] = useState([]);
  const handleDepartmentDataList = (departmentData) => {
    setDepartmentDataList(departmentData);
  }

  const validateAddDepartmentForm = () => {
    if (departmentName === "") {
      setDepartmentNameState("invalid");
    } else {
      setDepartmentNameState("valid");
    }
  }

  function handleValidateAddDepartmentForm() {
    validateAddDepartmentForm();
    handleSubmit(departmentName, departmentDescription, departmentReportsToDepartment);
  }

  const handleSubmit = async (departmentName, departmentDescription, departmentReportsToDepartment) => {
    if (departmentName && departmentName !== "") {
      try {
        const payload = {
          departmentName: departmentName,
        };

        if (departmentDescription && departmentDescription !== "") {
          payload.description = departmentDescription;
        }

        if (departmentReportsToDepartment && departmentReportsToDepartment !== "") {
          payload.responsible = departmentReportsToDepartment;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_DEPARTMENT}`, {
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
    setDepartmentStatus(false);
    setDepartmentStatusState(null);
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
    departmentStatus,
    setDepartmentStatus,
    departmentStatusState,
    setDepartmentStatusState,
    handleValidateAddDepartmentForm,
    handleDepartmentDataList,
    reset
  };
};

export default useCreateDepartment;
