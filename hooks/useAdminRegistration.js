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

  // Função para lidar com o envio do formulário
  const handleFormSubmit = () => {
    // Aqui você pode usar os dados em formData conforme necessário
    console.log(formData);

    // Limpa os campos do formulário após salvar
    setFormData({
      name: '',
      lastName: '',
      birthDate: '',
      email: '',
      phone: '',
      password: ''
    });

    // Adicione a lógica para salvar os dados onde for necessário
    // Por exemplo, você pode fazer uma chamada a uma API ou salvar localmente

    console.log("Dados salvos. Lógica de salvamento aqui.");
  };

  return {
    formData,
    handleInputChange,
    handleFormSubmit,
  };
};

export default useForm;
