// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const CustomerContext = createContext({});

function CustomerProvider({ children }) {

    const [customerIdToUpdate, setCustomerIdToUpdate] = useState(0);

    function handleCustomerIdStatusCleanupToUpdate() {
        setCustomerIdToUpdate(0);
    }

    function handleCustomerIdToUpdate(customerId) {
        setCustomerIdToUpdate(customerId);
    }

    const [hasNewCustomerRecordCreated, setHasNewCustomerRecordCreated] = useState(false);
    function handleCreatedCustomerRecordStatusChange() {
        setHasNewCustomerRecordCreated(!hasNewCustomerRecordCreated);
    }

    const [hasUpdatedCustomerRecord, setHasUpdatedCustomerRecord] = useState(false);
    function handleUpdatedCustomerRecordStatusChange() {
        setHasUpdatedCustomerRecord(!hasUpdatedCustomerRecord);
    }

    const [isShouldUpdateClientCompany, setIsShouldUpdateClientCompany] = useState(false);
    function handleIsShouldUpdateClientCompany() {
        setIsShouldUpdateClientCompany(!isShouldUpdateClientCompany);
    }


    const [hasDeletedCustomerRecord, setHasDeletedCustomerRecord] = useState(false);
    function handleDeletedCustomerRecordStatusChange() {
        setHasDeletedCustomerRecord(!hasDeletedCustomerRecord);
    }

    return (
        <CustomerContext.Provider
            value={{
                customerIdToUpdate,
                handleCustomerIdStatusCleanupToUpdate,
                handleCustomerIdToUpdate,
                hasNewCustomerRecordCreated,
                handleCreatedCustomerRecordStatusChange,
                hasUpdatedCustomerRecord,
                handleUpdatedCustomerRecordStatusChange,
                isShouldUpdateClientCompany,
                handleIsShouldUpdateClientCompany,
                hasDeletedCustomerRecord,
                handleDeletedCustomerRecordStatusChange,
            }}>
            {children}
        </CustomerContext.Provider>
    );
};

export { CustomerProvider };