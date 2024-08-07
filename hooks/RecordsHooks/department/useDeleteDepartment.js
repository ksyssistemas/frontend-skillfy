export async function useDeleteDepartment(departmentId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEPARTMENT}/${departmentId}`, {
      method: 'DELETE',
    });

    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to delete department.');
    }
    console.log(data);
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the department:', error);
  }
};
