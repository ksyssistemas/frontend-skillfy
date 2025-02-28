// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useReducer, useState } from 'react';
import useCreatePerformanceReview from '../../hooks/PerformanceReview/useCreatePerformanceReview';
import { globalReviewReducer, initialState } from '../../reducers/ReviewForms/GlobalReviewReducer';

export const ModelSelectionReviewContext = createContext({});

function ModelSelectionReviewProvider({ children }) {

  const [stateGlobalReviewReducer, dispatchGlobalReviewReducer] = useReducer(globalReviewReducer, initialState);

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
    console.log("Entrou na função de Submeter: ");
    const reviewId = await handleCreationPerformanceReviewSubmit(
      selectedReview,
      stateGlobalReviewReducer.reviewIdentityData,
      stateGlobalReviewReducer.reviewModelData,
      stateGlobalReviewReducer.reviewParticipantsSelectionData
    );
    if (reviewId) {
      console.log("Salvou uma avaliação e agora vai salvar os dados relacionados à avaliação: ");
      const { amountEvidenceIncluded, amountSkillsIncluded } = await handleSetEvidenceAndRulerToPerformanceReview(reviewId, stateGlobalReviewReducer.reviewScaleAndCriteriaData);
      const { amountParticipantsIncluded } = await handleAddParticipantsToPerformanceReview(reviewId, stateGlobalReviewReducer.reviewParticipantsSelectionData);
      await handleReviewGenerationSettings(reviewId, stateGlobalReviewReducer.reviewGenerationSetupData);
      await updatePerformanceReviewData(reviewId, amountEvidenceIncluded, amountSkillsIncluded, amountParticipantsIncluded);
    }
    console.log("Finalizou o processo de salvar uma avaliação!");
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
        stateGlobalReviewReducer,
        dispatchGlobalReviewReducer
      }}>
      {children}
    </ModelSelectionReviewContext.Provider>
  );
};

export { ModelSelectionReviewProvider };
