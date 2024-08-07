export async function useDeleteEmployeeFunction(employeeFunctionId) {
  console.log(employeeFunctionId);
  console.log(`${process.env.NEXT_PUBLIC_EMPLOYEE_FUNCTION}/${employeeFunctionId}`);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_FUNCTION}/${employeeFunctionId}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to delete function.');
    }
    const data = await response.json();
    console.log(data);

    return data;

  } catch (error) {
    console.error('There was a problem deleting the function:', error);
  }
};
