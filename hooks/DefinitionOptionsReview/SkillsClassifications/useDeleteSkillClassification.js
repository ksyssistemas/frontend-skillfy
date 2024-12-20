export async function useDeleteSkillClassification(classificationId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCE_CLASSIFICATION}/${classificationId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete skill classification selected.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the skill classification:', error);
  }
};
