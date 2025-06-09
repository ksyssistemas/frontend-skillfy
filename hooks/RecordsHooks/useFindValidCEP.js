export async function useFindValidCEP(cep) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BRASIL_API_CEP_V2}/${cep}`);
        if (!response.ok) {
            const error = await response.json();
            return error; // retorna objeto de erro (contendo `message`, `type`, etc.)
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
        return null; // importante: retorna algo em caso de erro
    }
};

