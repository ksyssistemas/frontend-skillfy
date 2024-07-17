export async function useFindAllAdmin() {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMINISTRATOR}/findAll`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    console.log("Admin: ", data);
    return data;

  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }

};

