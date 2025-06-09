// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useReducer, useState } from 'react';
import useCreatePerformanceReview from '../../hooks/PerformanceReview/useCreatePerformanceReview';
import { globalCustomerRegisterReducer, initialState } from '../../reducers/CustomerForms/GlobalCustomerRegisterReducer';
import useCreateClientCompany from '../../hooks/RecordsHooks/customer/useCreateClientCompany';
import useCreateCustomerAccountHolder from '../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import { initialStateIndividualRegistrationForm, individualRegistrationFormReducer } from '../../reducers/CustomerForms/IndividualRegistrationFormReducer';

export const ModelSelectionCustomerRecordContext = createContext({});

function ModelSelectionCustomerRecordProvider({ children }) {

  const [stateGlobalCustomerRegisterReducer, dispatchGlobalCustomerRegisterReducer] = useReducer(globalCustomerRegisterReducer, initialState);
  const { handleValidateAddCustomerAccountHolderForm } = useCreateCustomerAccountHolder();
  const { handleValidateAddClientCompanyForm } = useCreateClientCompany();
  
  const {
    handleCreationPerformanceReviewSubmit,
    handleSetEvidenceAndRulerToPerformanceReview,
    updatePerformanceReviewData,
    handleAddParticipantsToPerformanceReview,
    handleReviewGenerationSettings
  } = useCreatePerformanceReview();

  const [currentStep, setCurrentStep] = useState(1);
  const [clearStepIndex, setClearStepIndex] = useState(null);

  const handleClearStepIndex = () => setClearStepIndex(null);

  const handleNext = () => {
    if (currentStep === 1
      && stateGlobalCustomerRegisterReducer.individualRegistrationData.checkbox === false
      && stateGlobalCustomerRegisterReducer.individualRegistrationData.checkboxState === null) {
      dispatchGlobalCustomerRegisterReducer({ type: 'INDIVIDUAL_SET_CHECKBOX_STATE', payload: 'invalid' });
    }
    if (currentStep === 1
      && stateGlobalCustomerRegisterReducer.individualRegistrationData.checkbox === true
      && stateGlobalCustomerRegisterReducer.individualRegistrationData.checkboxState === "valid"
    ) {
      handleValidateAddCustomerAccountHolderForm(stateGlobalCustomerRegisterReducer, dispatchGlobalCustomerRegisterReducer);
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 2) {
      handleValidateAddClientCompanyForm(stateGlobalCustomerRegisterReducer, dispatchGlobalCustomerRegisterReducer);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleClearCurrentForm = () => {
    setClearStepIndex(currentStep);
  };

  const handleSubmit = async () => {
    const reviewId = await handleCreationPerformanceReviewSubmit(
      selectedReview,
      stateGlobalCustomerRegisterReducer.individualRegistrationData,
      stateGlobalCustomerRegisterReducer.legalEntityRegistrationData,
      stateGlobalCustomerRegisterReducer.reviewParticipantsSelectionData
    );
    if (reviewId) {
      const { amountEvidenceIncluded, amountSkillsIncluded } = await handleSetEvidenceAndRulerToPerformanceReview(reviewId, stateGlobalReviewReducer.reviewScaleAndCriteriaData);
      const { amountParticipantsIncluded } = await handleAddParticipantsToPerformanceReview(reviewId, stateGlobalReviewReducer.reviewParticipantsSelectionData);
      await handleReviewGenerationSettings(reviewId, stateGlobalReviewReducer.reviewGenerationSetupData);
      await updatePerformanceReviewData(reviewId, amountEvidenceIncluded, amountSkillsIncluded, amountParticipantsIncluded);
    }
  };

  return (
    <ModelSelectionCustomerRecordContext.Provider
      value={{
        currentStep,
        clearStepIndex,
        handleNext,
        handlePrevious,
        handleClearCurrentForm,
        handleClearStepIndex,
        handleSubmit,
        stateGlobalCustomerRegisterReducer,
        dispatchGlobalCustomerRegisterReducer
      }}>
      {children}
    </ModelSelectionCustomerRecordContext.Provider>
  );
};

export { ModelSelectionCustomerRecordProvider };
