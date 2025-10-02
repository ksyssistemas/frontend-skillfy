import React, { createContext, useReducer } from 'react';
import { initialStateReviewParticipantsSelectionForm, reviewParticipantsSelectionFormReducer } from '../../../reducers/ReviewForms/ReviewParticipantSelectionFormReducer';

export const ReviewParticipantSelectionContext = createContext({});

function ReviewParticipantSelectionProvider({ children }) {
  const [state, dispatch] = useReducer(
    reviewParticipantsSelectionFormReducer,
    initialStateReviewParticipantsSelectionForm
  );

  return (
    <ReviewParticipantSelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </ReviewParticipantSelectionContext.Provider>
  );
};

export { ReviewParticipantSelectionProvider };