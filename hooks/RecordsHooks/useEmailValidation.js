import { useState } from 'react';

function useEmailValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  // const [debouncedEmail, setDebouncedEmail] = useState(email);  

    const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmailInSystem = async (email) => {
    setLoading(true);
    console.log(`${process.env.NEXT_PUBLIC_VALIDATE_EMAIL}/${email}`);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_VALIDATE_EMAIL}/${email}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
    console.log("RESPONSE:",response);
    if(response.status == 200 && response.statusText == "OK" ){
       console.log("Enviado com sucesso!");
       setEmailSuccess("E-mail enviado com sucesso!")
       return true;
    } else if (response.status == 404){
      console.log("Page not found");
      setEmailError("E-mail inválido. Tente novamente.");
      return false; 
    } 
    } catch (error) {
      console.error('Erro ao verificar o e-mail:', error);
      setEmailError('Erro ao verificar o e-mail. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, emailSuccess, emailError, loading, validateEmailFormat, validateEmailInSystem };
}

export default useEmailValidation;
