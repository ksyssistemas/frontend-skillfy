import React, { useState } from 'react';

const useDepartmentForm = () => {
  // Estado inicial do formulário
  const initialState = {
    DepartmentName: '',
    Responsible: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialState);

  // Função para lidar com a mudança no campo DepartmentName
  const handleDepartmentChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Função chamada quando o formulário é submetido
  const onSubmit = async (selectedDepartment) => {
    try {

      console.log('Função onSubmit chamada');
      console.log('Selected Department:', selectedDepartment);
      console.log('Form Data:', formData);

      const responsibleValue = selectedDepartment ? selectedDepartment : 'Sem responsável';

      const requestData = {
        DepartmentName: formData.DepartmentName,
        Responsible: responsibleValue,
        Description: formData.description,
      };

      console.log('Request Data:', requestData);


      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      };

      const response = await fetch('http://localhost:3010/department', requestOptions);

      if (!response || !response.ok) {
        const responseBody = await response?.text();
        throw new Error(`Erro ao enviar o formulário: ${response?.status} - ${response?.statusText}. Detalhes: ${responseBody}`);
      }

      const responseData = await response.json();

      console.log('Resposta do servidor:', responseData);

      // Limpar o estado do formulário após o envio bem-sucedido
      setFormData(initialState);

    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };



  return {
    formData,
    handleDepartmentChange,
    onSubmit
  };
};

export default useDepartmentForm;
