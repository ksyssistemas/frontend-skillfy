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

    const [idAccountHolderToLinkToCustomer, setIdAccountHolderToLinkToCustomer] = useState('');
    function handleIdAccountHolderToLinkToCustomer(accountId) {
        setIdAccountHolderToLinkToCustomer(accountId);
    }
    function handleCleaningIdAccountHolderToLinkToCustomer() {
        setIdAccountHolderToLinkToCustomer('');
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
                idAccountHolderToLinkToCustomer,
                handleIdAccountHolderToLinkToCustomer,
                handleCleaningIdAccountHolderToLinkToCustomer,
            }}>
            {children}
        </CustomerContext.Provider>
    );
};

export { CustomerProvider };