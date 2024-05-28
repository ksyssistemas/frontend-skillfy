export async function useFindAllRoles() {

  try {
    const response = await fetch(`http://dlist.com.br:3010/role`);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }

};

