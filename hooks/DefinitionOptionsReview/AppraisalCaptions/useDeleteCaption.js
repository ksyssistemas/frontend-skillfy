export async function useDeleteCaption(captionId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EVALUATION_RULER}/${captionId}`, {
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
