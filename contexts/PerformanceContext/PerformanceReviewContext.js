// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const ReviewContext = createContext({});

function PerformanceReviewContext({ children }) {

    const [performanceIdToEvaluation, setPerformanceIdToEvaluation] = useState('');
    const [evaluationRulerId, setEvaluationRulerId] = useState('');
    const [reviewParticipantId, setReviewParticipantId] = useState('');
    const [reviewModel, setReviewModel] = useState('');

    function handlePerformanceIdStatusCleanupToUpdate() {
        setPerformanceIdToEvaluation('');
        setEvaluationRulerId('');
        setReviewParticipantId('');
        setReviewModel('');
    }

    function handlePerformanceIdIdToUEvaluation(performanceId) {
        setPerformanceIdToEvaluation(performanceId);
    }

    function handlePerformanceRulerIdToEvaluation(rulerId) {
        setEvaluationRulerId(rulerId);
    }

    function handlePerformanceIdParticipantToEvaluation(participantId) {
        setReviewParticipantId(participantId);
    }

    function handlePerformanceModelToEvaluation(modelId) {
        setReviewModel(modelId);
    }

    return (
        <ReviewContext.Provider
            value={{
                performanceIdToEvaluation,
                evaluationRulerId,
                reviewParticipantId,
                reviewModel,
                handlePerformanceRulerIdToEvaluation,
                handlePerformanceIdIdToUEvaluation,
                handlePerformanceIdParticipantToEvaluation,
                handlePerformanceModelToEvaluation,
                handlePerformanceIdStatusCleanupToUpdate,
            }}>
            {children}
        </ReviewContext.Provider>
    );
};

export { PerformanceReviewContext };