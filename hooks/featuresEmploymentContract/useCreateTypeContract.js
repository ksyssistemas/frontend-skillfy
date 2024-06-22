import React, { useState, useContext } from 'react';
import { useAlert } from '../../contexts/AlertContext';

const useCreateTypeContract = () => {

  const { showAlert } = useAlert();

  const [employeeContractType, setEmployeeContractType] = useState("");
  const [employeeContractTypeState, setEmployeeContractTypeState] = useState(null);
  const [contractTypeDataList, setContractTypeDataList] = useState([]);

  const handleEmployeeContractType = (employeeContractType) => {
    setEmployeeContractType(employeeContractType);
  }

  const handleEmployeeContractTypeState = (employeeContractTypeState) => {
    setEmployeeContractTypeState(employeeContractTypeState);
  }

  const handleContractTypeDataList = (contractTypeData) => {
    setContractTypeDataList(contractTypeData);
  }


  const validateAddContractType = () => {
    if (employeeContractType === "") {
      setEmployeeContractTypeState("invalid");
    } else {
      setEmployeeContractTypeState("valid");
    }
  }

  function handleContractTypeValidation() {
    validateAddContractType();
    if (employeeContractTypeState) {
      handleSubmit(employeeContractType);
    }
  }

  const handleSubmit = async (employeeContractType) => {
    if (employeeContractType && employeeContractType !== "") {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_CONTRACT_TYPE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: employeeContractType,
          }),
        });
        console.log("RESPONSE: ", response);
        if (response.ok) {
          reset();
          showAlert(
            "success",
            "ni ni-check-bold",
            "Sucesso!",
            "Contrato de trabalho adicionado!",
          );
          console.log('Data sent successfully!');
        } else {
          console.error('Erro na resposta:', response.status);
          showAlert(
            "danger",
            "fas fa-xmark",
            "Erro!",
            `Erro na resposta!`,
          );
        }
      } catch (error) {
        console.error('Erro no pedido:', error);
        showAlert(
          "danger",
          "fas fa-xmark",
          "Erro!",
          `${error}`
        );
      }
    }
  };


  function reset() {
    setEmployeeContractType("");
    setEmployeeContractTypeState(null);
  }

  return {
    employeeContractType,
    setEmployeeContractType,
    employeeContractTypeState,
    setEmployeeContractTypeState,
    handleContractTypeValidation,
    handleEmployeeContractType,
    handleEmployeeContractTypeState,
    contractTypeDataList,
    handleContractTypeDataList
  };


};

export default useCreateTypeContract;