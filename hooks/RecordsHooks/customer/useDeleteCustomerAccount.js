export async function useDeleteCustomerAccount(customerId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMER}/${customerId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete customer.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the customer:', error);
  }
};
