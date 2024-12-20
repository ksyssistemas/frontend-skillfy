import { useQuery } from "react-query";

// Função de busca
const fetchEvidencias = async () => {
  const { response  } = await fetch(`${process.env.NEXT_PUBLIC_EVIDENCES}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar evidências");
  }
  console.log('RESPONSE: ', response);
  const data = await response.json();
  return data;
};

// Hook customizado para buscar evidências
export const useEvidences = () => {
    return useQuery(
      "evidences",        // Chave única do React Query
      fetchEvidencias,    // Busca os dados da API
      {
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
        refetchOnWindowFocus: false, // Não refaz a query ao focar na janela
      }
    );
  };
