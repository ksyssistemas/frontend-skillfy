export async function useDeleteContactPerson(contactId) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CONTACT_PERSON}/${contactId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact.');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('There was a problem deleting the contact:', error);
  }
};
