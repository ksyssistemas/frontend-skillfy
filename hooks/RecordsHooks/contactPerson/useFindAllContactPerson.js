export async function useFindAllContactPerson() {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_PERSON}/findAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log(data);

        return data;

    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }

};


