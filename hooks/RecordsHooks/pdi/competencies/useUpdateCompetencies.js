// Hook para gerenciar o formulário
import React, { useContext, useState } from 'react';
import { CompetenciesContext } from '../../../../contexts/RecordsContext/CompetenciesContext';

const useUpdateCompetencies = () => {

    const {
        competenciesIdToUpdate,
        handleCompetenciesIdStatusCleanupToUpdate,
        handleCompetenciesIdToUpdate,
        hasUpdatedCompetenciesRecord,
        handleUpdatedCompetenciesRecordStatusChange,
        hasDeletedCompetenciesRecord,
        handleDeletedCompetenciesRecordStatusChange,
    } = useContext(CompetenciesContext);

    async function handleValidateUpdateCompetenciesForm(
        handleCloseCompetenciesUpdateModal,
        competenciesIdToUpdate,
        Name,
        Description,
        handleCompetenciesIdToUpdate,
        handleCleanDetailedCompetenciesAccountData
    ) {
        await handleSubmit(competenciesIdToUpdate, Name, Description);
        goBackToCompetenciesList(handleCloseCompetenciesUpdateModal, handleCompetenciesIdToUpdate, handleCleanDetailedCompetenciesAccountData);
    }

    function goBackToCompetenciesList(handleCloseCompetenciesUpdateModal, handleCompetenciesIdToUpdate, handleCleanDetailedCompetenciesAccountData) {
        handleCloseCompetenciesUpdateModal();
        handleCompetenciesIdToUpdate();
        handleCleanDetailedCompetenciesAccountData();
        handleUpdatedCompetenciesRecordStatusChange();
    }

    const handleSubmit = async (competenciesIdToUpdate, Name, description) => {
        if (competenciesIdToUpdate && competenciesIdToUpdate !== "") {
            try {
                const payload = { };

                if (Name && description !== "") {
                    payload.name = Name;
                };

                if (description && description !== "") {
                    payload.description = description;
                };

                console.log(payload);

                const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCIES}/${competenciesIdToUpdate}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    return {
        handleValidateUpdateCompetenciesForm
    };
};

export default useUpdateCompetencies;
