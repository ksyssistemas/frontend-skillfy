export async function useFindAllEmployeeAndRole(customerId) {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}/customer/${customerId}/leads`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}/findAll`);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        
        const data = await response.json();

        console.log("Dados recebidos da API:", data);

        const requiredFields = ["id", "name", "lastName", "departmentId", "rolesId"];

        const mappedData = data
            .map((item, index) => {
                const missingFields = requiredFields.filter((field) => item[field] === undefined);
                // Se algum campo obrigatório estiver ausente, ignora o item e loga o erro
                if (missingFields.length > 0) {
                    console.error(
                        `Erro no item ${index}: campos ausentes [${missingFields.join(", ")}]. Item ignorado.`,
                        item
                    );
                    return null;
                }

                return {
                    id: item.id,
                    name: item.name,
                    lastName: item.lastName,
                    fullName: item.fullName,
                    departmentId: item.departmentId,
                    departmentName: item.departmentName,
                    rolesId: item.rolesId,
                    roleName: item.RoleName
                };
            })
            .filter(Boolean);

        return mappedData;

    } catch (error) {
        console.error("Erro ao buscar os dados de Líder e seu cargo:", error);
        return [];
    }
};


