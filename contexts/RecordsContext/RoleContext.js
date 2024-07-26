// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const RoleContext = createContext({});

function RoleProvider({ children }) {

    const [roleIdToUpdate, setRoleIdToUpdate] = useState('');

    function handleRoleIdStatusCleanupToUpdate() {
        setRoleIdToUpdate('');
    }

    function handleRoleIdToUpdate(roleId) {
        setRoleIdToUpdate(roleId);
    }

    const [hasNewRoleRecordCreated, setHasNewRoleRecordCreated] = useState(false);
    function handleCreatedRoleRecordStatusChange() {
        setHasNewRoleRecordCreated(!hasNewRoleRecordCreated);
    }

    const [hasUpdatedRoleRecord, setHasUpdatedRoleRecord] = useState(false);
    function handleUpdatedRoleRecordStatusChange() {
        setHasUpdatedRoleRecord(!hasUpdatedRoleRecord);
    }


    const [hasDeletedRoleRecord, setHasDeletedRoleRecord] = useState(false);
    function handleDeletedRoleRecordStatusChange() {
        setHasDeletedRoleRecord(!hasDeletedRoleRecord);
    }

    return (
        <RoleContext.Provider
            value={{
                roleIdToUpdate,
                handleRoleIdStatusCleanupToUpdate,
                handleRoleIdToUpdate,
                hasNewRoleRecordCreated,
                handleCreatedRoleRecordStatusChange,
                hasUpdatedRoleRecord,
                handleUpdatedRoleRecordStatusChange,
                hasDeletedRoleRecord,
                handleDeletedRoleRecordStatusChange,
            }}>
            {children}
        </RoleContext.Provider>
    );
};

export { RoleProvider };