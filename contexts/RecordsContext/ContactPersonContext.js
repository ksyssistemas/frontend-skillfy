// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const ContactPersonContext = createContext({});

function ContactPersonProvider({ children }) {

    const [contactPersonIdToUpdate, setContactPersonIdToUpdate] = useState('');

    function handleContactIdStatusCleanupToUpdate() {
        setContactPersonIdToUpdate('');
    }

    function handleContactPersonIdToUpdate(contactId) {
        setContactPersonIdToUpdate(contactId);
    }

    const [hasNewContactRecordCreated, setHasNewContactRecordCreated] = useState(false);
    function handleCreatedContactRecordStatusChange() {
        setHasNewContactRecordCreated(!hasNewContactRecordCreated);
    }

    const [hasUpdatedContactRecord, setHasUpdatedContactRecord] = useState(false);
    function handleUpdatedContactRecordStatusChange() {
        setHasUpdatedContactRecord(!hasUpdatedContactRecord);
    }


    const [hasDeletedContactRecord, setHasDeletedContactRecord] = useState(false);
    function handleDeletedContactRecordStatusChange() {
        setHasDeletedContactRecord(!hasDeletedContactRecord);
    }

    return (
        <ContactPersonContext.Provider
            value={{
                contactPersonIdToUpdate,
                handleContactIdStatusCleanupToUpdate,
                handleContactPersonIdToUpdate,
                hasNewContactRecordCreated,
                handleCreatedContactRecordStatusChange,
                hasUpdatedContactRecord,
                handleUpdatedContactRecordStatusChange,
                hasDeletedContactRecord,
                handleDeletedContactRecordStatusChange,
            }}>
            {children}
        </ContactPersonContext.Provider>
    );
};

export { ContactPersonProvider };