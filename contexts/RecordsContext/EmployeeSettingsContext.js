// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const EmployeeSettingsContext = createContext({});

function EmployeeSettingsProvider({ children }) {

  const [hasNewEmployeeContractTypeCreated, setHasNewEmployeeContractTypeCreated] = useState(false);
  function handleCreatedEmployeeContractTypeStatusChange() {
    setHasNewEmployeeContractTypeCreated(!hasNewEmployeeContractTypeCreated);
  }

  const [hasNewEmployeeWorkModelCreated, setHasNewEmployeeWorkModelCreated] = useState(false);
  function handleCreatedEmployeeWorkModelStatusChange() {
    setHasNewEmployeeWorkModelCreated(!hasNewEmployeeWorkModelCreated);
  }

  const [hasNewEmployeeWorkplaceCreated, setHasNewEmployeeWorkplaceCreated] = useState(false);
  function handleCreatedEmployeeWorkplaceStatusChange() {
    setHasNewEmployeeWorkplaceCreated(!hasNewEmployeeWorkplaceCreated);
  }

  return (
    <EmployeeSettingsContext.Provider
      value={{
        hasNewEmployeeContractTypeCreated,
        handleCreatedEmployeeContractTypeStatusChange,
        hasNewEmployeeWorkModelCreated,
        handleCreatedEmployeeWorkModelStatusChange,
        hasNewEmployeeWorkplaceCreated,
        handleCreatedEmployeeWorkplaceStatusChange,
      }}>
      {children}
    </EmployeeSettingsContext.Provider>
  );
};

export { EmployeeSettingsProvider };