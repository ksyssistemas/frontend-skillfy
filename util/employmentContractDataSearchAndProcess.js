import { mappingEmploymentContractItemName } from '../util/mappingEmploymentContractItemName'

export async function employmentContractDataSearchAndProcess(apiCall, setData, employmentContractItemName, context) {
    try {
        const response = await apiCall();
        if (response) {
            console.log("Response: ", response);
            if (response && response.length > 0) {
                const dataObject = response.map((item, index) => {
                    let id;
                    switch (employmentContractItemName) {
                        case 'client-company':
                            id = item.id;
                            break;
                        case 'department':
                            id = item.ID_Department;
                            break;
                        case 'role':
                            id = item.ID_Roles;
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
                        default:
                            id = '';
                    }
                    return {
                        id: id.toString(),
                        text: mappingEmploymentContractItemName(item, employmentContractItemName),
                    }
                });
                console.log(dataObject)
                setData(dataObject);
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