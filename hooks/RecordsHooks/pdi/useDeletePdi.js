export async function useDeletePdi(pdiId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PDI}/${pdiId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete pdi.');
      }
      const data = await response.json();
  
      return data;
  
    } catch (error) {
      console.error('There was a problem deleting the pdi:', error);
    }
  };