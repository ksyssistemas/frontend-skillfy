export async function useFindAllSkillClassifications() {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCE_CLASSIFICATION}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log("Data: ", data);
        return data;

    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }

};


