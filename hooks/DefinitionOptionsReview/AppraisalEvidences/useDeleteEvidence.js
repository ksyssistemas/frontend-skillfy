export async function useDeleteEvidence(evidenceId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EVIDENCES}/${evidenceId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete evidence.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the evidence:', error);
  }
};
