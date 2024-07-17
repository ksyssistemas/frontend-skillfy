export async function useDeleteAdmin(adminId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMINISTRATOR}/${adminId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete admin.');
    }
    console.log("Response useDelete: ", response);
    const data = await response.json();

    console.log("Data useDelete: ", data);
    return data;

  } catch (error) {
    console.error('There was a problem deleting the admin:', error);
  }
};
