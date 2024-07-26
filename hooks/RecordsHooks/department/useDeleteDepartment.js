export async function useDeleteDepartment(departmentId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEPARTMENT}/${departmentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete department.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the department:', error);
  }
};
