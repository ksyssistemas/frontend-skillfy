// hooks/useCNPJ.js
import { useState, useEffect } from 'react';
import useCreateClientCompany from './customer/useCreateClientCompany';

const useCNPJ = () => {

  const [individualEmployerIdNumber, setIndividualEmployerIdNumber] = useState("");
  const [individualEmployerIdNumberState, setIndividualEmployerIdNumberState] = useState(null);
  const [brasilAPICNPJData, setBrasilAPICNPJData] = useState(null);
  const [loadingCNPJValidation, setLoadingCNPJValidation] = useState(false);
  const [errorCNPJValidation, setErrorCNPJValidation] = useState(null);

  const handleCPNJValidationLoading = () => setLoadingCNPJValidation(!loadingCNPJValidation);

  const handleSaveCNPJ = (cnpj) => setIndividualEmployerIdNumber(cnpj);

  const validateCnpj = () => {
    if (individualEmployerIdNumber !== "") {
      setIndividualEmployerIdNumberState("valid");
    } else {
      setIndividualEmployerIdNumberState("invalid");
    }
  };

  useEffect(() => {
    const cnpj = individualEmployerIdNumber.replace(/[^\d]+/g, '');

    const fetchData = async (cnpj) => {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        const result = await response.json();
        setBrasilAPICNPJData(result);
        validateCnpj();
      } catch (error) {
        setErrorCNPJValidation(error);
      }
    };

    if (cnpj != "" &&
      cnpj.length === 14) {
      handleCPNJValidationLoading();
      fetchData(cnpj);
    }
  }, [individualEmployerIdNumber]);

  return {
    brasilAPICNPJData,
    loadingCNPJValidation,
    errorCNPJValidation,
    handleCPNJValidationLoading,
    individualEmployerIdNumber,
    handleSaveCNPJ,
    individualEmployerIdNumberState,
    setIndividualEmployerIdNumberState
  };
};

export default useCNPJ;

