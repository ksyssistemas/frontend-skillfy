export async function useDeleteEmployeeFunction(employeeFunctionId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_FUNCTION}/${employeeFunctionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete function.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the function:', error);
  }
};
