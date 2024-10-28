import { useState } from 'react';

function useChangePassword() {
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const changePassword = async (email, newPassword, confirmPassword, temporaryPassword) => {

    setPasswordError('');
    setPasswordSuccess('');

    console.log(email, newPassword, confirmPassword, temporaryPassword);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTHENTICATION}/changePassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, temporaryPassword, newPassword, confirmPassword }),
      });
      console.log(response);
      if(response.status == 200 && response.statusText == "OK" ){
        console.log("Trocada com sucesso!");
        setPasswordSuccess("Senha alterada com sucesso!");
        return true;
     } else if (response.status == 404){
       console.log("Page not found");
       setPasswordError("Senha não alterada. Tente novamente.");
       return false; 
     } 
    } catch (error) {
      console.error('Erro na requisição:', error);
      setPasswordError("Senha não alterada. Tente novamente.");
    }
  };


  return { passwordSuccess, passwordError, changePassword };

}
export default useChangePassword;