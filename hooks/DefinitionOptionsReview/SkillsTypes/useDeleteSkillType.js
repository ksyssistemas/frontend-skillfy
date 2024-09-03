export async function useDeleteSkillType(skillTypeId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCE_TYPE}/${skillTypeId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete cycle.');
    }
    console.log("Response useDelete: ", response);
    const data = await response.json();

    console.log("Data useDelete: ", data);
    return data;

  } catch (error) {
    console.error('There was a problem deleting the admin:', error);
  }
};
