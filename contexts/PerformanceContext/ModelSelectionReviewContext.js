// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const ModelSelectionReviewContext = createContext({});

function ModelSelectionReviewProvider({ children }) {

    const [selectedReview, setSelectedReview] = useState(null);
    function handleSelectedReview(selectedReview) {
        console.log("selectedReview: ", selectedReview);
        setSelectedReview(selectedReview);
    }

    function handleCleanlinessReviewSelection() {
        setSelectedReview(null);
    }

    return (
        <ModelSelectionReviewContext.Provider
            value={{
                selectedReview,
                handleSelectedReview,
                handleCleanlinessReviewSelection
            }}>
            {children}
        </ModelSelectionReviewContext.Provider>
    );
};

export { ModelSelectionReviewProvider };
