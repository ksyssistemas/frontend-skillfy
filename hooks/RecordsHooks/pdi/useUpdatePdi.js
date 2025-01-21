// Hook para gerenciar o formulário
import React, { useContext, useState } from 'react';
import { PdiContext } from '../../../contexts/RecordsContext/PdiContext';

const useUpdatePdi = () => {

    const [pdiUpdateError, setPdiUpdateError] = useState(null);
    const [pdiUpdateSuccess, setPdiUpdateSuccess] = useState(null);

    const {
        pdiIdToUpdate,
        handlePdiIdStatusCleanupToUpdate,
        handlePdiIdToUpdate,
        hasUpdatedPdiRecord,
        handleUpdatedPdiRecordStatusChange,
        hasDeletedPdiRecord,
        handleDeletedPdiRecordStatusChange,
    } = useContext(PdiContext);

    async function handleValidateUpdatePdiForm(
        handleClosePdiUpdateModal,
        pdiIdToUpdate,
        Name,
        Description,
        StartDate,
        FinalDate,
        pdiStatus,
        appraiser,
        evaluated,
        handlePdiIdToUpdate,
        competencies,
        handleCleanDetailedPdiAccountData
    ) {
        await handleSubmit(pdiIdToUpdate, Name, Description, StartDate, FinalDate, pdiStatus, appraiser, evaluated, competencies);
        goBackToPdiList(handleClosePdiUpdateModal, handlePdiIdToUpdate, handleCleanDetailedPdiAccountData);
    }

    function goBackToPdiList(handleClosePdiUpdateModal, handlePdiIdToUpdate, handleCleanDetailedPdiAccountData) {
        handleClosePdiUpdateModal();
        handlePdiIdToUpdate();
        handleCleanDetailedPdiAccountData();
        handleUpdatedPdiRecordStatusChange();
    }

    const handleSubmit = async (pdiIdToUpdate, Name, Description, StartDate, FinalDate, pdiStatus, appraiser, evaluated, competencies) => {
        if (pdiIdToUpdate && pdiIdToUpdate !== "") {
            try {
                const payload = {};

                const payloadCompetencies = {};

                if (Name && Name !== "") {
                    payload.name = Name;
                };

                if (Description && Description !== "") {
                    payload.description = Description;
                };

                if (StartDate && StartDate !== "") {
                    payload.startDate = StartDate;
                };

                if (FinalDate && FinalDate !== "") {
                    payload.endDate = FinalDate;
                };

                if (pdiStatus && pdiStatus !== "") {
                    payload.status = pdiStatus;
                };

                if (appraiser && appraiser !== "") {
                    payload.assessorId = appraiser;
                };

                if (evaluated && evaluated !== "") {
                    payload.assessedId = evaluated;
                };

                if (competencies && competencies !== "") {
                    payloadCompetencies.competencies = competencies;
                };

                const response = await fetch(`${process.env.NEXT_PUBLIC_PDI}/${pdiIdToUpdate}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const responseCompetencies = await fetch(`${process.env.NEXT_PUBLIC_PDI}/${pdiIdToUpdate}/competencies`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payloadCompetencies),
                });

                if (responseCompetencies.ok) {
                    console.log('Competencia editada!');
                } else {
                    console.error('Erro em editar a competencia:', response.status);
                }

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
        handleValidateUpdatePdiForm
    };
};

export default useUpdatePdi;
