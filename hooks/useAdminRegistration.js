import { useState } from 'react';

const useForm = () => {
  // Adiciona um estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    password: ''
  });

  // Atualiza o estado quando houver alterações nos campos do formulário
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleFormSubmit = () => {

    setFormData({
      name: '',
      lastName: '',
      birthDate: '',
      email: '',
      phone: '',
      password: ''
    });

    console.log("Dados salvos. Lógica de salvamento aqui.");
  };

  return {
    formData,
    handleInputChange,
    handleFormSubmit,
  };
};

export default useForm;
