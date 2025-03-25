// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const ReviewContext = createContext({});

function PerformanceReviewContext({ children }) {

    const [performanceIdToEvaluation, setPerformanceIdToEvaluation] = useState('');
    const [evaluationRulerId, setEvaluationRulerId] = useState('');
    const [reviewParticipantId, setReviewParticipantId] = useState('');
    const [reviewModel, setReviewModel] = useState('');
    const [participatesAsSelfEvaluator, setParticipatesAsSelfEvaluator] = useState('');
    const [participateAsPair, setParticipateAsPair] = useState('');
    const [participateAsLeader, setParticipateAsLeader] = useState('');

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

    function handlePerformanceParticipatesAsSelfEvaluatorToEvaluation(selfEvaluator) {
        setParticipatesAsSelfEvaluator(selfEvaluator);
    }

    function handlePerformanceParticipateAsPairToEvaluation(asPair) {
        setParticipateAsPair(asPair);
    }
    
    function handlePerformanceParticipateAsLeaderToEvaluation(asLeader) {
        setParticipateAsLeader(asLeader);
    }

    return (
        <ReviewContext.Provider
            value={{
                performanceIdToEvaluation,
                evaluationRulerId,
                reviewParticipantId,
                reviewModel,
                participatesAsSelfEvaluator,
                participateAsPair,
                participateAsLeader,
                handlePerformanceRulerIdToEvaluation,
                handlePerformanceIdIdToUEvaluation,
                handlePerformanceIdParticipantToEvaluation,
                handlePerformanceModelToEvaluation,
                handlePerformanceIdStatusCleanupToUpdate,
                handlePerformanceParticipatesAsSelfEvaluatorToEvaluation,
                handlePerformanceParticipateAsPairToEvaluation,
                handlePerformanceParticipateAsLeaderToEvaluation
            }}>
            {children}
        </ReviewContext.Provider>
    );
};

export { PerformanceReviewContext };