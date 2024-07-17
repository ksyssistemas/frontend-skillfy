// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const AdminContext = createContext({});

function AdminProvider({ children }) {

    const [adminIdToUpdate, setAdminIdToUpdate] = useState('');

    function handleAdminIdStatusCleanupToUpdate() {
        setAdminIdToUpdate('');
    }

    function handleAdminIdToUpdate(adminId) {
        setAdminIdToUpdate(adminId);
    }

    const [hasNewAdminRecordCreated, setHasNewAdminRecordCreated] = useState(false);
    function handleCreatedAdminRecordStatusChange() {
        setHasNewAdminRecordCreated(!hasNewAdminRecordCreated);
    }

    const [hasUpdatedAdminRecord, setHasUpdatedAdminRecord] = useState(false);
    function handleUpdatedAdminRecordStatusChange() {
        setHasUpdatedAdminRecord(!hasUpdatedAdminRecord);
    }


    const [hasDeletedAdminRecord, setHasDeletedAdminRecord] = useState(false);
    function handleDeletedAdminRecordStatusChange() {
        setHasDeletedAdminRecord(!hasDeletedAdminRecord);
    }

    return (
        <AdminContext.Provider
            value={{
                adminIdToUpdate,
                handleAdminIdStatusCleanupToUpdate,
                handleAdminIdToUpdate,
                hasNewAdminRecordCreated,
                handleCreatedAdminRecordStatusChange,
                hasUpdatedAdminRecord,
                handleUpdatedAdminRecordStatusChange,
                hasDeletedAdminRecord,
                handleDeletedAdminRecordStatusChange,
            }}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminProvider };