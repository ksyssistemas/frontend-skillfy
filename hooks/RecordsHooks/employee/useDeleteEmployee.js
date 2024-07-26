export async function useDeleteEmployee(employeeId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE}/${employeeId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee.');
    }
    console.log("Response useDelete: ", response);
    const data = await response.json();

    console.log("Data useDelete: ", data);
    return data;

  } catch (error) {
    console.error('There was a problem deleting the employee:', error);
  }
};
