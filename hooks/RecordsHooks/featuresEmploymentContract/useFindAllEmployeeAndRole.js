export async function useFindAllEmployeeAndRole(departamentId) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DEV}:${process.env.NEXT_PUBLIC_USER_SERVICE_PORT}/employee/department/${departamentId}/leads`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log('Raw response:', data);

        const mappedData = data.map(item => ({
            EmployeeName: item.EmployeeName,
            RoleName: item.RoleName
        }));

        console.log('Mapped response:', mappedData);

        return data;

    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }

};


