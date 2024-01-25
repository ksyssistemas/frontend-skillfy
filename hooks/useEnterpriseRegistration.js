import { useState } from 'react';

const useEnterpriseRegistration = () => {
  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    webSite: '',
    numeroContato: '',
    cep: '',
    estado: '',
    cidade: '',
    pais: '',
    numero: '',
    complemento: ''
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleFormSubmit = () => {
    console.log(formData);
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

export default useEnterpriseRegistration;
