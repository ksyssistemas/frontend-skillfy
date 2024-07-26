// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const DepartmentContext = createContext({});

function DepartmentProvider({ children }) {

    const [departmentIdToUpdate, setDepartmentIdToUpdate] = useState('');

    function handleDepartmentIdStatusCleanupToUpdate() {
        setDepartmentIdToUpdate('');
    }

    function handleDepartmentIdToUpdate(departmentId) {
        setDepartmentIdToUpdate(departmentId);
    }

    const [hasNewDepartmentRecordCreated, setHasNewDepartmentRecordCreated] = useState(false);
    function handleCreatedDepartmentRecordStatusChange() {
        setHasNewDepartmentRecordCreated(!hasNewDepartmentRecordCreated);
    }

    const [hasUpdatedDepartmentRecord, setHasUpdatedDepartmentRecord] = useState(false);
    function handleUpdatedDepartmentRecordStatusChange() {
        setHasUpdatedDepartmentRecord(!hasUpdatedDepartmentRecord);
    }


    const [hasDeletedDepartmentRecord, setHasDeletedDepartmentRecord] = useState(false);
    function handleDeletedDepartmentRecordStatusChange() {
        setHasDeletedDepartmentRecord(!hasDeletedDepartmentRecord);
    }

    return (
        <DepartmentContext.Provider
            value={{
                departmentIdToUpdate,
                handleDepartmentIdStatusCleanupToUpdate,
                handleDepartmentIdToUpdate,
                hasNewDepartmentRecordCreated,
                handleCreatedDepartmentRecordStatusChange,
                hasUpdatedDepartmentRecord,
                handleUpdatedDepartmentRecordStatusChange,
                hasDeletedDepartmentRecord,
                handleDeletedDepartmentRecordStatusChange,
            }}>
            {children}
        </DepartmentContext.Provider>
    );
};

export { DepartmentProvider };