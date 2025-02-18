// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useReducer, useState } from 'react';
import useCreatePerformanceReview from '../../hooks/PerformanceReview/useCreatePerformanceReview';

export const ModelSelectionReviewContext = createContext({});

function ModelSelectionReviewProvider({ children }) {

  const {
    handleCreationPerformanceReviewSubmit,
    handleSetEvidenceAndRulerToPerformanceReview,
    updatePerformanceReviewData,
    handleAddParticipantsToPerformanceReview,
    handleReviewGenerationSettings
  } = useCreatePerformanceReview();

  const [selectedReview, setSelectedReview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [clearStepIndex, setClearStepIndex] = useState(null);

  const handleSelectedReview = (review) => setSelectedReview(review);

  const handleClearStepIndex = () => setClearStepIndex(null);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleClearCurrentForm = () => {
    setClearStepIndex(currentStep);
  };

  const handleSubmit = async () => {
    console.log('Submitting all data');
    const reviewId = await handleCreationPerformanceReviewSubmit(selectedReview);
    console.log('handleCreationPerformanceReviewSubmit');
    if (reviewId) {
      const { amountEvidencesIncluded, amountSkillsIncluded } = await handleSetEvidenceAndRulerToPerformanceReview(reviewId);
      console.log('handleSetEvidenceAndRulerToPerformanceReview');
      const { amountParticipantsIncluded } = await handleAddParticipantsToPerformanceReview(reviewId);
      console.log('handleAddParticipantsToPerformanceReview');
      await handleReviewGenerationSettings(reviewId);
      console.log('handleReviewGenerationSettings');
      await updatePerformanceReviewData(amountEvidencesIncluded, amountSkillsIncluded, amountParticipantsIncluded);
      console.log('Data submited with sucess!');
    }
  };

  return (
    <ModelSelectionReviewContext.Provider
      value={{
        selectedReview,
        currentStep,
        clearStepIndex,
        handleSelectedReview,
        handleNext,
        handlePrevious,
        handleClearCurrentForm,
        handleClearStepIndex,
        handleSubmit,
      }}>
      {children}
    </ModelSelectionReviewContext.Provider>
  );
};

export { ModelSelectionReviewProvider };
