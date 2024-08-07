export async function useFindContractType(contractType) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_CONTRACT_TYPE}/${contractType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }

};


