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

    function convertToISO(dateString) {
        if (!dateString) {
            return null; 
        }
    
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (isoDateRegex.test(dateString)) {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error("Data inválida no formato ISO: ", dateString);
                return null;
            }
            return date.toISOString();  
        }
    
        const dateParts = dateString.split('/');
        if (dateParts.length !== 3) {
            console.error("Formato de data inválido: ", dateString);
            return null;
        }
    
        const [day, month, year] = dateParts;
        if (!day || !month || !year || isNaN(new Date(year, month - 1, day))) {
            console.error("Data inválida após divisão: ", dateString);
            return null;
        }
    
        const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
        
        if (isNaN(date.getTime())) {
            return null;
        }
    
        return date.toISOString();  
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
                    const formattedStartDate = convertToISO(StartDate);  // Formatação da data
                    if (formattedStartDate) {
                        payload.startDate = formattedStartDate;
                    }
                }
    
                if (FinalDate && FinalDate !== "") {
                    const formattedFinalDate = convertToISO(FinalDate);  // Formatação da data
                    if (formattedFinalDate) {
                        payload.endDate = formattedFinalDate;
                    }
                }
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

                // console.log(payload);
                
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
                    // console.log('Competencia editada!');
                } else {
                    console.error('Erro em editar a competencia:', response.status);
                }

                if (response.ok) {
                    // console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }

                if(responseCompetencies.ok || response.ok){
                    setPdiUpdateSuccess("PDI atualizado com sucesso!");
                } else {
                    setPdiUpdateError("Ocorreu um erro ao atualizar o PDI!");
                }
            } catch (error) {
                console.error('Error in request:', error);
                setPdiUpdateError("Ocorreu um erro ao atualizar o PDI!");
            }
        }
    };

    return {
        handleValidateUpdatePdiForm,
        pdiUpdateSuccess,
        pdiUpdateError,
        setPdiUpdateError,
        setPdiUpdateSuccess
    };
};

export default useUpdatePdi;
