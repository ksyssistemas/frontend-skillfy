export const useDeleteAdmin = () => {

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMINISTRATOR}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete admin.');
      }
      // Não podemos usar admins aqui diretamente, então retornamos o id excluído
      return id;
    } catch (error) {
      console.error('There was a problem deleting the admin:', error);
      return null; // Se ocorrer um erro, retornamos null
    }
  };

  return deleteAdmin;
};
