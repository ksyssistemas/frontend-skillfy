// Hook para gerenciar o formulário
import React, { useContext, useState } from 'react';
import { CompetenciesContext } from 'contexts/RecordsContext/CompetenciesContext';

const useUpdateCompetencies = () => {

    const { handleUpdatedCompetenciesRecordStatusChange } = useContext(CompetenciesContext);

    async function handleValidateUpdateCompetenciesForm(
        Name,
        Description,
        handleCompetenciesIdToUpdate,
        handleCleanDetailedCompetenciesAccountData,
        handleCloseCompetencieUpdateModal,
        competencieIdToUpdate
    ) {
        await handleSubmit(competencieIdToUpdate, Name, Description);
        goBackToCompetenciesList(handleCloseCompetencieUpdateModal, handleCompetenciesIdToUpdate, handleCleanDetailedCompetenciesAccountData);
    }

    function goBackToCompetenciesList(handleCloseCompetencieUpdateModal, handleCompetenciesIdToUpdate, handleCleanDetailedCompetenciesAccountData) {
        handleCloseCompetencieUpdateModal();
        handleCompetenciesIdToUpdate();
        handleCleanDetailedCompetenciesAccountData();
        handleUpdatedCompetenciesRecordStatusChange();
    }

    const handleSubmit = async (competencieIdToUpdate, Name, Description) => {
        if (competencieIdToUpdate && competencieIdToUpdate !== "") {
            try {
                if (Name && Description !== "") {
                    payload.name = Name;
                }

                if (Description && Description !== "") {
                    payload.Description = Description;
                }

                console.log(payload);

                const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCIES}/${competencieIdToUpdate}`, {
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
