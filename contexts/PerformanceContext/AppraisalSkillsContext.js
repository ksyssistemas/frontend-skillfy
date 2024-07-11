// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const AppraisalSkillsContext = createContext({});

function AppraisalSkillsProvider({ children }) {

    const [skillClassificationViewComponents, setSkillClassificationViewComponents] = useState('skillTypes');

    const handleDropdownClickSkillsComponents = (listType) => {
        setSkillClassificationViewComponents(listType);
    };

    const [hasUpdatedAppraisalSkillClassificaiton, setHasUpdatedAppraisalSkillClassificaiton] = useState(false);
    function handleUpdatedAppraisalSkillClassificaitonStatusChange() {
        setHasUpdatedAppraisalSkillClassificaiton(!hasUpdatedAppraisalSkillClassificaiton);
    }

    const [hasNewAppraisalSkillClassificationCreated, setHasNewAppraisalSkillClassificationCreated] = useState(false);
    function handleCreatedAppraisalSkillClassificaitonStatusChange() {
        setHasNewAppraisalSkillClassificationCreated(!hasNewAppraisalSkillClassificationCreated);
    }

    const [hasDeletedAppraisalSkillClassification, setHasDeletedAppraisalSkillClassification] = useState(false);
    function handleDeletedAppraisalSkillClassificationStatusChange() {
        setHasDeletedAppraisalSkillClassification(!hasDeletedAppraisalSkillClassification);
    }

    const [hasUpdatedAppraisalOccupationalGroup, setHasUpdatedAppraisalOccupationalGroup] = useState(false);
    function handleUpdatedAppraisalOccupationalGroupStatusChange() {
        setHasUpdatedAppraisalOccupationalGroup(!hasUpdatedAppraisalOccupationalGroup);
    }

    const [hasNewAppraisalOccupationalGroupCreated, setHasNewAppraisalOccupationalGroupCreated] = useState(false);
    function handleCreatedAppraisalOccupationalGroupStatusChange() {
        setHasNewAppraisalOccupationalGroupCreated(!hasNewAppraisalOccupationalGroupCreated);
    }

    const [hasDeletedAppraisalOccupationalGroup, setHasDeletedAppraisalOccupationalGroup] = useState(false);
    function handleDeletedAppraisalOccupationalGroupStatusChange() {
        setHasDeletedAppraisalOccupationalGroup(!hasDeletedAppraisalOccupationalGroup);
    }

    const [hasUpdatedAppraisalSkillType, setHasUpdatedAppraisalSkillType] = useState(false);
    function handleUpdatedAppraisalSkillTypeStatusChange() {
        setHasUpdatedAppraisalSkillType(!hasUpdatedAppraisalSkillType);
    }

    const [hasNewAppraisalSkillTypeCreated, setHasNewAppraisalSkillTypeCreated] = useState(false);
    function handleCreatedAppraisalSkillTypeStatusChange() {
        setHasNewAppraisalSkillTypeCreated(!hasNewAppraisalSkillTypeCreated);
    }

    const [hasDeletedAppraisalSkillType, setHasDeletedAppraisalSkillType] = useState(false);
    function handleDeletedAppraisalSkillTypeStatusChange() {
        setHasDeletedAppraisalSkillType(!hasDeletedAppraisalSkillType);
    }

    return (
        <AppraisalSkillsContext.Provider
            value={{
                hasUpdatedAppraisalSkillClassificaiton,
                handleUpdatedAppraisalSkillClassificaitonStatusChange,
                hasNewAppraisalSkillClassificationCreated,
                handleCreatedAppraisalSkillClassificaitonStatusChange,
                hasDeletedAppraisalSkillClassification,
                handleDeletedAppraisalSkillClassificationStatusChange,
                skillClassificationViewComponents,
                handleDropdownClickSkillsComponents,
                hasUpdatedAppraisalOccupationalGroup,
                handleUpdatedAppraisalOccupationalGroupStatusChange,
                hasNewAppraisalOccupationalGroupCreated,
                handleCreatedAppraisalOccupationalGroupStatusChange,
                hasDeletedAppraisalOccupationalGroup,
                handleDeletedAppraisalOccupationalGroupStatusChange,
                hasUpdatedAppraisalSkillType,
                handleUpdatedAppraisalSkillTypeStatusChange,
                hasNewAppraisalSkillTypeCreated,
                handleCreatedAppraisalSkillTypeStatusChange,
                hasDeletedAppraisalSkillType,
                handleDeletedAppraisalSkillTypeStatusChange,
            }}>
            {children}
        </AppraisalSkillsContext.Provider>
    );
};

export { AppraisalSkillsProvider };