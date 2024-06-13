export function mappingEmploymentContractItemName(item, employmentContractItemName, isNoDataMessage = false) {
    if (isNoDataMessage) {
        switch (employmentContractItemName) {
            case 'department':
                return "Não há departamentos, clique aqui para cadastrá-los.";
            case 'role':
                return "Não há cargos, clique aqui para cadastrá-los.";
            case 'function':
                return "Não há funções, clique aqui para cadastrá-los.";
            case 'contractType':
                return "Não há tipos de contrato, use o botão 'Configurações'.";
            case 'workModel':
                return "Não há modelos de trabalho, use o botão 'Configurações'.";
            case 'workplace':
                return "Não há locais de trabalho, use o botão 'Configurações'.";
            default:
                return 'Não há dados disponíveis, use o botão "Configurações".';
        }
    } else {
        switch (employmentContractItemName) {
            case 'department':
                return item.DepartmentName;
            case 'role':
                return item.RoleName;
            case 'function':
                return item.name;
            case 'contractType':
                return item.name;
            case 'workModel':
                return item.name;
            case 'workplace':
                return item.name;
            default:
                return 'Unknown';
        }
    }
}
