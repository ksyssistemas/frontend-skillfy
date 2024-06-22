export async function useFindEmployeeAddress(customerId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMER}-address/${customerId}/address`);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();

    console.log(data);
    console.log(typeof data);
    return data;

  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }

};

