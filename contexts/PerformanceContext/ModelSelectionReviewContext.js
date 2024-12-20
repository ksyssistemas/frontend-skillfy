// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useState } from 'react';

export const ModelSelectionReviewContext = createContext({});

function ModelSelectionReviewProvider({ children }) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [clearStepIndex, setClearStepIndex] = useState(null);

  const handleSelectedReview = (review) => setSelectedReview(review);

  const handleClearStepIndex = () => setClearStepIndex(null);

  const handleIsResetTriggered = () => setIsResetTriggered(!isResetTriggered);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleClearCurrentForm = () => {
    setClearStepIndex(currentStep);
  };

  // Função para enviar todos os dados
  const handleSubmit = () => {
    console.log('Submitting all data');
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
