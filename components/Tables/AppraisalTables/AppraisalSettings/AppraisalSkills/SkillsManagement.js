import React, { useContext, useState } from 'react';
import SkillClassificationsList from './SkillClassificationsList';
import OccupationalGroupList from './OccupationalGroupList';
import SkillTypesList from './SkillTypesList';
import { AppraisalSkillsContext } from '../../../../../contexts/PerformanceContext/AppraisalSkillsContext';

function SkillsManagement() {

    const { skillClassificationViewComponents } = useContext(AppraisalSkillsContext);

    const renderContent = () => {
        switch (skillClassificationViewComponents) {
            case 'skillClassification':
                return <SkillClassificationsList />;
            case 'occupationalGroup':
                return <OccupationalGroupList />;
            case 'skillTypes':
                return <SkillTypesList />;
            default:
                return <SkillTypesList />;
        }
    };

    return (
        <>
            {renderContent()}
        </>
    );
}

export default SkillsManagement;
