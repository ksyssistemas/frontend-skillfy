import { mappingEmploymentContractItemName } from '../util/mappingEmploymentContractItemName'

export async function employmentContractDataSearchAndProcess(apiCall, setData, employmentContractItemName, context) {
    try {
        const response = await apiCall();
        if (response) {
            if (response && response.length > 0) {
                const dataObject = response.map((item, index) => {
                    let id;
                    switch (employmentContractItemName) {
                        case 'client-company':
                            id = item.id;
                            break;
                        case 'department':
                            id = item.id;
                            break;
                        case 'role':
                            id = item.id;
                            break;
                        case 'function':
                            id = item.id;
                            break;
                        case 'contractType':
                            id = item.id;
                            break;
                        case 'workModel':
                            id = item.id;
                            break;
                        case 'workplace':
                            id = item.id;
                            break;
                        case 'skillClassification':
                            id = item.id;
                            break;
                        case 'occupationalGroup':
                            id = item.id;
                            break;
                        case 'skillTypes':
                            id = item.id;
                            break;
                        default:
                            id = '';
                    }
                    return {
                        id: id.toString(),
                        text: mappingEmploymentContractItemName(item, employmentContractItemName),
                    }
                });
                if (employmentContractItemName === 'occupationalGroup') {
                    const defaultOption = {
                        id: "0",
                        text: 'Nenhum grupo',
                    };
                    console.log("defaultOption: ", defaultOption);
                    setData([defaultOption, ...dataObject]);
                } else {
                    setData(dataObject);
                }
            } else {
                const noDataText = mappingEmploymentContractItemName({}, employmentContractItemName, true, context);
                setData([{ id: "0", text: noDataText }]);
            }
        } else {
            console.error('Erro na resposta: ', response.status);
        }
    } catch (error) {
        console.error('Erro no pedido: ', error);
    }
}