// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const PdiContext = createContext({});

function PdiProvider({ children }) {

    const [pdiIdToUpdate, setPdiIdToUpdate] = useState('');

    function handlePdiIdStatusCleanupToUpdate() {
        setPdiIdToUpdate('');
    }

    function handlePdiIdToUpdate(pdiId) {
        setPdiIdToUpdate(pdiId);
    }

    const [hasNewPdiRecordCreated, setHasNewPdiRecordCreated] = useState(false);
    function handleCreatedPdiRecordStatusChange() {
        setHasNewPdiRecordCreated(!hasNewPdiRecordCreated);
    }

    const [hasUpdatedPdiRecord, setHasUpdatedPdiRecord] = useState(false);
    function handleUpdatedPdiRecordStatusChange() {
        setHasUpdatedPdiRecord(!hasUpdatedPdiRecord);
    }


    const [hasDeletedPdiRecord, setHasDeletedPdiRecord] = useState(false);
    function handleDeletedPdiRecordStatusChange() {
        setHasDeletedPdiRecord(!hasDeletedPdiRecord);
    }

    return (
        <PdiContext.Provider
            value={{
                pdiIdToUpdate,
                handlePdiIdStatusCleanupToUpdate,
                handlePdiIdToUpdate,
                hasNewPdiRecordCreated,
                handleCreatedPdiRecordStatusChange,
                hasUpdatedPdiRecord,
                handleUpdatedPdiRecordStatusChange,
                hasDeletedPdiRecord,
                handleDeletedPdiRecordStatusChange,
            }}>
            {children}
        </PdiContext.Provider>
    );
};

export { PdiProvider };