// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const CycleContext = createContext({});

function AppraisalCycleProvider({ children }) {

    const [hasUpdatedAppraisalCycle, setHasUpdatedAppraisalCycle] = useState(false);
    function handleUpdatedAppraisalCycleStatusChange() {
        setHasUpdatedAppraisalCycle(!hasUpdatedAppraisalCycle);
    }

    const [hasNewAppraisalCycleCreated, setHasNewAppraisalCycleCreated] = useState(false);
    function handleCreatedAppraisalCycleStatusChange() {
        setHasNewAppraisalCycleCreated(!hasNewAppraisalCycleCreated);
    }

    const [hasDeletedAppraisalCycle, setHasDeletedAppraisalCycle] = useState(false);
    function handleDeletedAppraisalCycleStatusChange() {
        setHasDeletedAppraisalCycle(!hasDeletedAppraisalCycle);
    }

    return (
        <CycleContext.Provider
            value={{
                hasUpdatedAppraisalCycle,
                handleUpdatedAppraisalCycleStatusChange,
                hasNewAppraisalCycleCreated,
                handleCreatedAppraisalCycleStatusChange,
                hasDeletedAppraisalCycle,
                handleDeletedAppraisalCycleStatusChange
            }}>
            {children}
        </CycleContext.Provider>
    );
};

export { AppraisalCycleProvider };