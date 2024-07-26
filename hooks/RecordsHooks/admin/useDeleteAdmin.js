export async function useDeleteAdmin(adminId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMINISTRATOR}/${adminId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete admin.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the admin:', error);
  }
};
