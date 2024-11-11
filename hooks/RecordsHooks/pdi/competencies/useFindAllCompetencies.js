export async function useFindAllComptencies() {
    try {
        const response = await fetch('http://5.78.72.138:3015/competencies');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
};