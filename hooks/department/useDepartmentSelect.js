import { useState, useEffect } from 'react';

const useDepartmentSelect = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(process.env.DEPARTMENT);
        if (!response.ok) {
          throw new Error('Erro ao obter os dados do departamento');
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
