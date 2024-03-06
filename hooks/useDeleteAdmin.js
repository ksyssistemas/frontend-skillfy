export const useDeleteAdmin = () => {
  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`http://dlist.com.br:3008/administrator/${id}`, {
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
