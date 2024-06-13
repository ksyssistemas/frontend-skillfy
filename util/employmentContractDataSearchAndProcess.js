import { mappingEmploymentContractItemName } from '../util/mappingEmploymentContractItemName'

export async function employmentContractDataSearchAndProcess(apiCall, setData, employmentContractItemName) {
    try {
        const response = await apiCall();
        if (response) {
            if (response && response.length > 0) {
                console.log("Busca do texto de seleção: ", employmentContractItemName)
                const dataObject = response.map((item, index) => {
                    return {
                        id: index.toString(),
                        text: mappingEmploymentContractItemName(item, employmentContractItemName),
                    }
                });
                setData(dataObject);
            } else {
                console.log("Não há texto de seleção: ", employmentContractItemName)
                const noDataText = mappingEmploymentContractItemName({}, employmentContractItemName, true);
                setData([{ id: "0", text: noDataText }]);
            }
        } else {
            console.error('Erro na resposta: ', response.status);
        }
    } catch (error) {
        console.error('Erro no pedido: ', error);
    }
}