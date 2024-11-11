export async function useDeleteCompetencies(competencieId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCIES}/${competencieId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete competencie.');
      }
      const data = await response.json();
  
      return data;
  
    } catch (error) {
      console.error('There was a problem deleting the competencie:', error);
    }
  };
  