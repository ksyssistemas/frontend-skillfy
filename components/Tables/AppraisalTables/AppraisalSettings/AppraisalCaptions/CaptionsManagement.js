import React, { useContext, useState } from 'react';
import { AppraisalCaptionsContext } from '../../../../../contexts/PerformanceContext/AprraisalCaptionsContext';
import CaptionsList from './CaptionsList';
import CaptionsRegister from './CaptionsRegister';

function CaptionsManagement() {

    const {
        isShouldSubmitCaptionsRegistration,
        handleShowCaptionRegister
    } = useContext(AppraisalCaptionsContext);

    return (
        <>
            {
                !isShouldSubmitCaptionsRegistration
                    ? (
                        <CaptionsList />
                    ) : (
                        isShouldSubmitCaptionsRegistration
                            ? (
                                <CaptionsRegister />
                            ) : null
                    )
            }
        </>
    );
}

export default CaptionsManagement;
