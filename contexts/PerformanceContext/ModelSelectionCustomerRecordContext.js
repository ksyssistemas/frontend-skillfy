// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useReducer, useState } from 'react';
import useCreatePerformanceReview from '../../hooks/PerformanceReview/useCreatePerformanceReview';
import { globalCustomerRegisterReducer, initialState } from '../../reducers/CustomerForms/GlobalCustomerRegisterReducer';
import useCreateClientCompany from '../../hooks/RecordsHooks/customer/useCreateClientCompany';
import useCreateCustomerAccountHolder from '../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import { initialStateIndividualRegistrationForm, individualRegistrationFormReducer } from '../../reducers/CustomerForms/IndividualRegistrationFormReducer';
import { initialStateLegalEntityRegistrationForm, legalEntityRegistrationFormReducer } from '../../reducers/CustomerForms/LegalEntityRegistrationFormReducer';
import { initialStateCNPJForm, cnpjFormReducer } from '../../reducers/cnpjFormReducer';
import { initialStateCEPForm, cepFormReducer } from '../../reducers/cepFormReducer';

export const ModelSelectionCustomerRecordContext = createContext({});

function ModelSelectionCustomerRecordProvider({ children }) {
  const [stateIndividualRegistration, dispatchIndividualRegistration] = useReducer(individualRegistrationFormReducer, initialStateIndividualRegistrationForm);
  const [stateLegalEntityRegistration, dispatchLegalEntityRegistration] = useReducer(legalEntityRegistrationFormReducer, initialStateLegalEntityRegistrationForm);
  const [stateCNPJ, dispatchCNPJ] = useReducer(cnpjFormReducer, initialStateCNPJForm);
  const [stateCEP, dispatchCEP] = useReducer(cepFormReducer, initialStateCEPForm);
  const [stateGlobalCustomerRegisterReducer, dispatchGlobalCustomerRegisterReducer] = useReducer(globalCustomerRegisterReducer, initialState);
  const { validateAddCustomerAccountHolderForm, handleValidateAddCustomerAccountHolderForm } = useCreateCustomerAccountHolder();
  const {
    handleValidateAddCustomerCompanyForm,
    validateAddCustomerCompanyForm,
    validateAddCustomerAddressForm
  } = useCreateClientCompany();

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
    const data = stateIndividualRegistration.individualRegistrationData;
    if (currentStep === 1) {
      if (data.checkbox === null || data.checkboxState === null) {
        dispatchIndividualRegistration({ type: 'SET_CHECKBOX_STATE', payload: 'invalid' });
        return;
      }

      if (data.checkbox === false && data.checkboxState === 'invalid') {
        return;
      }

      if (data.checkbox === true && data.checkboxState === 'valid') {
        const isFormValid = validateAddCustomerAccountHolderForm(stateIndividualRegistration, dispatchIndividualRegistration);
        if (isFormValid) {
          handleValidateAddCustomerAccountHolderForm(
            stateGlobalCustomerRegisterReducer,
            dispatchGlobalCustomerRegisterReducer,
            stateIndividualRegistration,
            dispatchIndividualRegistration
          );
          setCurrentStep((prevStep) => prevStep + 1);
        }
      }
    }
    if (currentStep === 2) {
      validateAddCustomerCompanyForm(
        stateCNPJ,
        dispatchCNPJ,
        stateLegalEntityRegistration,
        dispatchLegalEntityRegistration
      );
      validateAddCustomerAddressForm(
        stateCEP,
        dispatchCEP,
        stateLegalEntityRegistration,
        dispatchLegalEntityRegistration
      );
      handleValidateAddCustomerCompanyForm(
        stateGlobalCustomerRegisterReducer,
        dispatchGlobalCustomerRegisterReducer,
        stateLegalEntityRegistration,
        dispatchLegalEntityRegistration,
        stateCNPJ,
        dispatchCNPJ,
        stateCEP,
        dispatchCEP
      );
    }
  }

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
        stateIndividualRegistration,
        dispatchIndividualRegistration,
        stateLegalEntityRegistration,
        dispatchLegalEntityRegistration,
        stateCNPJ,
        dispatchCNPJ,
        stateCEP,
        dispatchCEP,
        stateGlobalCustomerRegisterReducer,
        dispatchGlobalCustomerRegisterReducer
      }}>
      {children}
    </ModelSelectionCustomerRecordContext.Provider>
  );
};

export { ModelSelectionCustomerRecordProvider };
