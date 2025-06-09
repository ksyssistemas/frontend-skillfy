// components/DynamicLayout.js
import { useEffect, useState } from 'react';
import Admin from 'layouts/Admin';
import Performance from 'layouts/Performance';
import Employee from 'layouts/Employee';
import PageChange from '../components/PageChange/PageChange';

export default function DynamicLayout({ children }) {
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userAuthData');
    const role = storedUser ? JSON.parse(storedUser)?.role : 'administrator';
    const layoutComponent = getLayoutByRole(role);
    setLayout(() => layoutComponent); // Use função para não renderizar imediatamente
  }, []);

  if (!layout) {
    return <PageChange/> // Fallback UI temporário
  }
  
  const Layout = layout;
  return <Layout>{children}</Layout>;
}

function getLayoutByRole(role) {
  switch (role) {
    case 'administrator':
      return Admin;
    case 'customer':
      return Performance;
    case 'employee':
      return Employee;
    default:
      return Admin; // fallback padrão
  }
}
