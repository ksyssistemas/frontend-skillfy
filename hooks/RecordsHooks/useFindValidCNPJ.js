// hooks/useFindValidCNPJ.js
export async function useFindValidCNPJ(cnpj) {
  console.log(`Rota: ${process.env.NEXT_PUBLIC_BRASIL_API_CNPJ_V1}/${cnpj}`);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BRASIL_API_CNPJ_V1}/${cnpj}`);
    const result = await response.json();

    // Quando a API retorna um erro, ela ainda envia status 200 e objeto com "message" + "type"
    if (!response.ok || result?.type === "not_found") {
      return {
        error: true,
        message: result.message || 'Erro desconhecido',
        type: result.type || 'unknown',
      };
    }

    // Se não houver erro, retorna os dados normalmente
    return result;

  } catch (error) {
    console.error('Erro na busca do CNPJ:', error);
    return {
      error: true,
      message: error.message || 'Erro de rede desconhecido',
      type: 'network',
    };
  }
};