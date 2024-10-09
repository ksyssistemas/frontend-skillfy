import { useState } from 'react';

function useEmailValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

    const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmailInSystem = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/forgetPassword/${email}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.exists) {
        setEmailError('');
      } else {
        setEmailError('Este e-mail não está cadastrado no sistema.');
      }
    } catch (error) {
      console.error('Erro ao verificar o e-mail:', error);
      setEmailError('Erro ao verificar o e-mail. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  
    if (!validateEmailFormat(emailInput)) {
      setEmailError('Formato de e-mail inválido.');
    } else {
      setEmailError('');
      await validateEmailInSystem(emailInput);
    }
  };
  

  return { email, setEmail, emailError, loading, handleEmailChange };
}

export default useEmailValidation;
