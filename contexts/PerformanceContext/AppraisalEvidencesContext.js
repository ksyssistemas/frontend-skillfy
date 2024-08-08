// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const EvidencesContext = createContext({});

function AppraisalEvidencesProvider({ children }) {

    const [evidencesIdToUpdate, setEvidencesIdToUpdate] = useState('');

    function handleEvidenceIdStatusCleanupToUpdate() {
        setEvidencesIdToUpdate('');
    }

    function handleEvidencesIdToUpdate(evidenceId) {
        setEvidencesIdToUpdate(evidenceId);
    }

    const [hasUpdatedAppraisalEvidences, setHasUpdatedAppraisalEvidences] = useState(false);
    function handleUpdatedAppraisalEvidencesStatusChange() {
        setHasUpdatedAppraisalEvidences(!hasUpdatedAppraisalEvidences);
    }

    const [hasNewAppraisalEvidencesCreated, setHasNewAppraisalEvidencesCreated] = useState(false);
    function handleCreatedAppraisalEvidencesStatusChange() {
        setHasNewAppraisalEvidencesCreated(!hasNewAppraisalEvidencesCreated);
    }

    const [hasDeletedAppraisalEvidences, setHasDeletedAppraisalEvidences] = useState(false);
    function handleDeletedAppraisalEvidencesStatusChange() {
        setHasDeletedAppraisalEvidences(!hasDeletedAppraisalEvidences);
    }

    return (
        <EvidencesContext.Provider
            value={{
                evidencesIdToUpdate,
                handleEvidenceIdStatusCleanupToUpdate,
                handleEvidencesIdToUpdate,
                hasUpdatedAppraisalEvidences,
                handleUpdatedAppraisalEvidencesStatusChange,
                hasNewAppraisalEvidencesCreated,
                handleCreatedAppraisalEvidencesStatusChange,
                hasDeletedAppraisalEvidences,
                handleDeletedAppraisalEvidencesStatusChange
            }}>
            {children}
        </EvidencesContext.Provider>
    );
};

export { AppraisalEvidencesProvider };