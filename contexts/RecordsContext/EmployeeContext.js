// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext({});

function EmployeeProvider({ children }) {

    const [customerIdToLinkToEmployee, setCustomerIdToLinkToEmployee] = useState(0);

    function handleCustomerIdStatusCleanup() {
        setCustomerIdToLinkToEmployee(0);
    }

    function handleCustomerIdToLinkToEmployee(customerId) {
        setCustomerIdToLinkToEmployee(customerId);
    }

    const [employeeIdToUpdate, setEmployeeIdToUpdate] = useState(0);

    function handleEmployeeIdStatusCleanupToUpdate() {
        setEmployeeIdToUpdate(0);
    }

    function handleEmployeeIdToUpdate(employeeId) {
        setEmployeeIdToUpdate(employeeId);
    }

    const [hasNewEmployeeRecordCreated, setHasNewEmployeeRecordCreated] = useState(false);
    function handleCreatedEmployeeRecordStatusChange() {
        setHasNewEmployeeRecordCreated(!hasNewEmployeeRecordCreated);
    }

    const [hasUpdatedEmployeeRecord, setHasUpdatedEmployeeRecord] = useState(false);
    function handleUpdatedEmployeeRecordStatusChange() {
        setHasUpdatedEmployeeRecord(!hasUpdatedEmployeeRecord);
    }

    const [isShouldUpdateEmployee, setIsShouldUpdateEmployee] = useState(false);
    function handleIsShouldUpdateEmployee() {
        setIsShouldUpdateEmployee(!isShouldUpdateEmployee);
    }

    const [hasDeletedEmployeeRecord, setHasDeletedEmployeeRecord] = useState(false);
    function handleDeletedEmployeeRecordStatusChange() {
        setHasDeletedEmployeeRecord(!hasDeletedEmployeeRecord);
    }

    return (
        <EmployeeContext.Provider
            value={{
                customerIdToLinkToEmployee,
                handleCustomerIdStatusCleanup,
                handleCustomerIdToLinkToEmployee,
                employeeIdToUpdate,
                handleEmployeeIdStatusCleanupToUpdate,
                handleEmployeeIdToUpdate,
                hasNewEmployeeRecordCreated,
                handleCreatedEmployeeRecordStatusChange,
                hasUpdatedEmployeeRecord,
                handleUpdatedEmployeeRecordStatusChange,
                isShouldUpdateEmployee,
                handleIsShouldUpdateEmployee,
                hasDeletedEmployeeRecord,
                handleDeletedEmployeeRecordStatusChange,
            }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export { EmployeeProvider };