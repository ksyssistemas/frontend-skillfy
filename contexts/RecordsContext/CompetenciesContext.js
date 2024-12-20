// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const CompetenciesContext = createContext({});

function CompetenciesProvider({ children }) {

    const [competenciesIdToUpdate, setCompetenciesIdToUpdate] = useState('');

    function handleCompetenciesIdStatusCleanupToUpdate() {
        setCompetenciesIdToUpdate('');
    }

    function handleCompetenciesIdToUpdate(competencieId) {
        setCompetenciesIdToUpdate(competencieId);
    }

    const [hasNewCompetenciesRecordCreated, setHasNewCompetenciesRecordCreated] = useState(false);
    function handleCreatedCompetenciesRecordStatusChange() {
        setHasNewCompetenciesRecordCreated(!hasNewCompetenciesRecordCreated);
    }

    const [hasUpdatedCompetenciesRecord, setHasUpdatedCompetenciesRecord] = useState(false);
    function handleUpdatedCompetenciesRecordStatusChange() {
        setHasUpdatedCompetenciesRecord(!hasUpdatedCompetenciesRecord);
    }


    const [hasDeletedCompetenciesRecord, setHasDeletedCompetenciesRecord] = useState(false);
    function handleDeletedCompetenciesRecordStatusChange() {
        setHasDeletedCompetenciesRecord(!hasDeletedCompetenciesRecord);
    }

    return (
        <CompetenciesContext.Provider
            value={{
                competenciesIdToUpdate,
                handleCompetenciesIdStatusCleanupToUpdate,
                handleCompetenciesIdToUpdate,
                hasNewCompetenciesRecordCreated,
                handleCreatedCompetenciesRecordStatusChange,
                hasUpdatedCompetenciesRecord,
                handleUpdatedCompetenciesRecordStatusChange,
                hasDeletedCompetenciesRecord,
                handleDeletedCompetenciesRecordStatusChange,
            }}>
            {children}
        </CompetenciesContext.Provider>
    );
};

export { CompetenciesProvider };