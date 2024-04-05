import { useState, useEffect } from 'react';

const useDepartmentSelect = () => {
  const [departments, setDepartments] = useState([]);

  const URL_BASE = process.env.URL_BASE || 'http://localhost';
  const PORT_STRUCTURE = process.env.PORT_STRUCTURE || '3010';

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(process.env.DEPARTMENT);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Erro ao obter os dados do departamento: ${errorMessage}`);
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartments();
  }, []);

  return departments;
};


export default useDepartmentSelect;
