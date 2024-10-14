import { useState, useEffect  } from 'react';

function useEmailValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedEmail, setDebouncedEmail] = useState(email);  

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

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setEmailError(''); 
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (validateEmailFormat(debouncedEmail)) {
        validateEmailInSystem(debouncedEmail);
      } else {
        setEmailError('Formato de e-mail inválido.');
      }
    }, 1000); 

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedEmail]); 

  useEffect(() => {
    setDebouncedEmail(email);
  }, [email]);

  return { email, setEmail, emailError, loading, handleEmailChange };
}

export default useEmailValidation;
