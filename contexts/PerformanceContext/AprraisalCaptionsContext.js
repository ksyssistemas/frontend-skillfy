import React, { createContext, useState } from 'react';

export const AppraisalCaptionsContext = createContext({});

function AppraisalCaptionsProvider({ children }) {

    const [isShouldSubmitCaptionsRegistration, setIsShouldSubmitCaptionsRegistration] = useState(false);

    const handleShowCaptionRegister = () => {
        setIsShouldSubmitCaptionsRegistration(!isShouldSubmitCaptionsRegistration);
    };

    const [isShouldShowUpdateAspect, setIsShouldShowUpdateAspect] = useState(false);

    const handleShowUpdateAspect = () => {
        setIsShouldShowUpdateAspect(!isShouldShowUpdateAspect);
    };

    const [hasUpdatedAppraisalCaption, setHasUpdatedAppraisalCaption] = useState(false);
    function handleUpdatedAppraisalCaptionStatusChange() {
        setHasUpdatedAppraisalCaption(!hasUpdatedAppraisalCaption);
    }

    const [hasNewAppraisalCaptionCreated, setHasNewAppraisalCaptionCreated] = useState(false);
    function handleCreatedAppraisalCaptionStatusChange() {
        setHasNewAppraisalCaptionCreated(!hasNewAppraisalCaptionCreated);
    }

    const [hasDeletedAppraisalCaption, setHasDeletedAppraisalCaption] = useState(false);
    function handleDeletedAppraisalCaptionStatusChange() {
        setHasDeletedAppraisalCaption(!hasDeletedAppraisalCaption);
    }

    const [captionTypeViewComponents, setCaptionTypeViewComponents] = useState('Conceitual');

    const handleResetCaptionTypeViewComponents = () => {
        setCaptionTypeViewComponents('Conceitual');
    };

    const handleDropdownClickCaptionType = (listType) => {
        setCaptionTypeViewComponents(listType);
    };

    const [captionIdToUpdate, setCaptionIdToUpdate] = useState(null);

    function handleCaptionIdStatusCleanupToUpdate() {
        setCaptionIdToUpdate(null);
    }

    function handleCaptionIdToUpdate(captionId) {
        setCaptionIdToUpdate(captionId);
    }

    return (
        <AppraisalCaptionsContext.Provider
            value={{
                isShouldSubmitCaptionsRegistration,
                handleShowCaptionRegister,
                hasUpdatedAppraisalCaption,
                handleUpdatedAppraisalCaptionStatusChange,
                hasNewAppraisalCaptionCreated,
                handleCreatedAppraisalCaptionStatusChange,
                hasDeletedAppraisalCaption,
                handleDeletedAppraisalCaptionStatusChange,
                captionTypeViewComponents,
                handleResetCaptionTypeViewComponents,
                handleDropdownClickCaptionType,
                isShouldShowUpdateAspect,
                handleShowUpdateAspect,
                captionIdToUpdate,
                handleCaptionIdStatusCleanupToUpdate,
                handleCaptionIdToUpdate
            }}>
            {children}
        </AppraisalCaptionsContext.Provider>
    );
};

export { AppraisalCaptionsProvider };