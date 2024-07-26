export async function useDeleteRole(roleId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEPARTMENT}/${roleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete role.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the role:', error);
  }
};
