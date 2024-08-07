export function mappingEmploymentContractItemName(item, employmentContractItemName, isNoDataMessage = false, context = '') {
    if (isNoDataMessage) {
        if (context === 'EmployeeRegisterFieldsRegister') {
            switch (employmentContractItemName) {
                case 'contractType':
                    return "Não há tipos de contrato, crie ao menos um.";
                case 'workModel':
                    return "Não há modelos de trabalho, crie ao menos um.";
                case 'workplace':
                    return "Não há locais de trabalho, crie ao menos um.";
                default:
                    return 'Não há dados disponíveis.';
            }
        } else {
            switch (employmentContractItemName) {
                case 'client-company':
                    return "Não há clientes, clique aqui para cadastrá-los.";
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
                case 'skillClassification':
                    return "Não há classificações, crie ao menos um.";
                case 'occupationalGroup':
                    return "Não há grupos, crie ao menos um.";
                case 'skillTypes':
                    return "Não há tipos de competência, crie ao menos um.";
                default:
                    return 'Não há dados disponíveis.';
            }
        }
    } else {
        switch (employmentContractItemName) {
            case 'client-company':
                return item.companyName;
            case 'department':
                return item.departmentName;
            case 'role':
                return item.roleName;
            case 'function':
                return item.name;
            case 'contractType':
                return item.name;
            case 'workModel':
                return item.name;
            case 'workplace':
                return item.name;
            case 'skillClassification':
                return item.competenceClassificationName;
            case 'occupationalGroup':
                return item.competencieName;
            case 'skillTypes':
                return item.competencieTypeName;
            default:
                return 'Unknown';
        }
    }
}
