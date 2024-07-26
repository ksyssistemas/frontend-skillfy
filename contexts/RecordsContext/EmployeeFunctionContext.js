// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const EmployeeFunctionContext = createContext({});

function EmployeeFunctionProvider({ children }) {

    const [employeeFunctionIdToUpdate, setEmployeeFunctionIdToUpdate] = useState('');

    function handleEmployeeFunctionIdStatusCleanupToUpdate() {
        setEmployeeFunctionIdToUpdate('');
    }

    function handleEmployeeFunctionIdToUpdate(employeeFunctionId) {
        setEmployeeFunctionIdToUpdate(employeeFunctionId);
    }

    const [hasNewEmployeeFunctionRecordCreated, setHasNewEmployeeFunctionRecordCreated] = useState(false);
    function handleCreatedEmployeeFunctionRecordStatusChange() {
        setHasNewEmployeeFunctionRecordCreated(!hasNewEmployeeFunctionRecordCreated);
    }

    const [hasUpdatedEmployeeFunctionRecord, setHasUpdatedEmployeeFunctionRecord] = useState(false);
    function handleUpdatedEmployeeFunctionRecordStatusChange() {
        setHasUpdatedEmployeeFunctionRecord(!hasUpdatedEmployeeFunctionRecord);
    }


    const [hasDeletedEmployeeFunctionRecord, setHasDeletedEmployeeFunctionRecord] = useState(false);
    function handleDeletedEmployeeFunctionRecordStatusChange() {
        setHasDeletedEmployeeFunctionRecord(!hasDeletedEmployeeFunctionRecord);
    }

    return (
        <EmployeeFunctionContext.Provider
            value={{
                employeeFunctionIdToUpdate,
                handleEmployeeFunctionIdStatusCleanupToUpdate,
                handleEmployeeFunctionIdToUpdate,
                hasNewEmployeeFunctionRecordCreated,
                handleCreatedEmployeeFunctionRecordStatusChange,
                hasUpdatedEmployeeFunctionRecord,
                handleUpdatedEmployeeFunctionRecordStatusChange,
                hasDeletedEmployeeFunctionRecord,
                handleDeletedEmployeeFunctionRecordStatusChange,
            }}>
            {children}
        </EmployeeFunctionContext.Provider>
    );
};

export { EmployeeFunctionProvider };