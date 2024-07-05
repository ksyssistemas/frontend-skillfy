// Hook para buscar os dados do administrador
import { useState, useEffect } from 'react';

const useFetchAdminData = (initialEmail) => {
  const [administratorData, setAdministratorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMINISTRATOR}/email/${initialEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdministratorData(data);
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    };

    fetchData();
  }, [initialEmail]);

  return administratorData;
};

export default useFetchAdminData;
