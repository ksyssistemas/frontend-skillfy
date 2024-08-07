export async function useDeleteRole(roleId) {
  console.log("ID: ", roleId);
  console.log(`${process.env.NEXT_PUBLIC_EMPLOYEE_ROLE}/${roleId}`);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_ROLE}/${roleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete role.');
    }
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);

    return data;

  } catch (error) {
    console.error('There was a problem deleting the role:', error);
  }
};
