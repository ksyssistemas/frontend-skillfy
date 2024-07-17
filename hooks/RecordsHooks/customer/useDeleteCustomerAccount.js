export async function useDeleteCustomerAccount(customerId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMER}/${customerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete customer.');
      }
      console.log("Response useDelete: ", response);
      const data = await response.json();

      console.log("Data useDelete: ", data);
      return data;

    } catch (error) {
      console.error('There was a problem deleting the customer:', error);
    }
};
