export async function useDeleteEmployeeContract(employeeId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTRACT_DETAILS}/employee/${employeeId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }

};

