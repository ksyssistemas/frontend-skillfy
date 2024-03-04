// hooks/useCNPJ.js
import { useState, useEffect } from 'react';

const useCNPJ = (initialCnpj) => {
  const [cnpj, setCnpj] = useState(initialCnpj);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (cnpj) => {
      try {
        const response = await fetch(`${process.env.URL_BRASILAPI}/api/cnpj/v1/${cnpj}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(cnpj);
  }, [cnpj]);

  return { data, loading, error, setCnpj }; // Adicionando setCnpj ao retorno
};

export default useCNPJ;

