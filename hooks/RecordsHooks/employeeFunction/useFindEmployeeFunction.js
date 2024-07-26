export async function useFindEmployeeFunction(employeeFunctionId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_FUNCTION}/${employeeFunctionId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }

};

