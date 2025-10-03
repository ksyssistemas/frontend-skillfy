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
                    let id = item.id?.toString() ?? '';
                    // 🔹 Só trata employeeAndRole diferente
                    if (employmentContractItemName === 'employeeAndRole') {
                        return {
                            id,
                            text: `${item.fullName ?? ''}, ${item.roleName ?? ''} no departamento ${item.departmentName ?? ''}`,
                        };
                    }
                    // 🔹 Todos os outros usam mapping
                    return {
                        id,
                        text: mappingEmploymentContractItemName(item, employmentContractItemName),
                    };
                });
                const includeClearOptionTypes = [
                    'client-company',
                    'department',
                    'role',
                    'function',
                    'contractType',
                    'workModel',
                    'workplace',
                    'skillClassification',
                    'occupationalGroup',
                    'skillTypes',
                    'admin',
                    'competencies',
                    'employee'
                ];
                const finalData = includeClearOptionTypes.includes(employmentContractItemName)
                    ? [{ id: 'none', text: 'Desfazer seleção' }, ...dataObject]
                    : dataObject;
                if (employmentContractItemName === "employeeAndRole") {
                    setData({
                        formatted: finalData,
                        raw: response,
                    });
                } else {
                    setData(finalData);
                }
            } else {
                if (employmentContractItemName === "employeeAndRole") {
                    setData({ formatted: [], raw: [] });
                } else {
                    const noDataText = mappingEmploymentContractItemName({}, employmentContractItemName, true, context);
                    setData([{ id: "0", text: noDataText }]);
                }
            }
        } else {
            console.error('Erro na resposta: ', response.status);
        }
    } catch (error) {
        console.error('Erro no pedido: ', error);
    }
}