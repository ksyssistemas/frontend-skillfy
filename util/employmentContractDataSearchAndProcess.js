import { mappingEmploymentContractItemName } from '../util/mappingEmploymentContractItemName'

export async function employmentContractDataSearchAndProcess(
    apiCall, 
    setData, 
    employmentContractItemName, 
    context
) {
    try {
        const response = await apiCall();
        if (response) {
            if (response.length > 0) {
                const dataObject = response.map((item, index) => {
                    let id;
                    switch (employmentContractItemName) {
                        case 'client-company':
                        case 'department':
                        case 'role':
                        case 'function':
                        case 'contractType':
                        case 'workModel':
                        case 'workplace':
                        case 'skillClassification':
                        case 'occupationalGroup':
                        case 'skillTypes':
                        case 'admin':
                        case 'competencies':
                        case 'employee':
                            id = item.id;
                            break;
                        default:
                            id = '';
                    }

                    return {
                        id: id.toString(),
                        text: mappingEmploymentContractItemName(item, employmentContractItemName),
                    };
                });
                const includeClearOptionTypes = ['skillClassification', 'occupationalGroup'];
                const finalData = includeClearOptionTypes.includes(employmentContractItemName)
                    ? [{ id: 'none', text: 'Desfazer seleção' }, ...dataObject]
                    : dataObject;

                setData(finalData);
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