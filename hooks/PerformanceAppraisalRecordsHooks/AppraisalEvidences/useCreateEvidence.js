import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';
import { EvidencesContext } from '../../../contexts/PerformanceContext/AppraisalEvidencesContext';

const useCreateEvidence = () => {

    const {
        handleEvidenceIdStatusCleanupToUpdate,
        handleCreatedAppraisalEvidencesStatusChange
    } = useContext(EvidencesContext);

    const [evidenceTitle, setEvidenceTitle] = useState("");
    const [evidenceTitleState, setEvidenceTitleState] = useState(null);
    const [evidenceContent, setEvidenceContent] = useState("");
    const [evidenceContentState, setEvidenceContentState] = useState(null);
    const [evidenceStatus, setEvidenceStatus] = useState("");
    const [evidenceStatusState, setEvidenceStatusState] = useState(null);
    const [evidenceDataList, setEvidenceDataList] = useState([]);
    const handleEvidenceDataList = (evidenceData) => {
        setEvidenceDataList(evidenceData);
    }

    const validateAddDepartmentForm = () => {
        if (departmentName === "") {
            setDepartmentNameState("invalid");
        } else {
            setDepartmentNameState("valid");
        }
        if (departmentDescription === "") {
            if (departmentDescription.length < 10) {
                setEmployeeRoleDescriptionState("invalid");
            } else {
                setEmployeeRoleDescriptionState("valid");
            }
        }
    }

    function handleValidateAddEvidenceForm(handleCloseEvidenceModal) {
        //validateAddDepartmentForm();
        // if (cycleTitleState === "valid" &&
        //   cyclePeriodState === "valid" &&
        //   startDateState === "valid" &&
        //   finishDateState === "valid" &&
        //   cycleObjectiveState === "valid" &&
        //   cycleManagerState === "valid"
        // ) {
        //   handleSubmit(cycleTitle, cyclePeriod, startDate, finishDate, cycleObjective);
        // } else {
        //   return null;
        // }
        handleSubmit(evidenceTitle, evidenceContent);
        goBackToAppraisalEvidenceList(handleCloseEvidenceModal);
    }

    function goBackToAppraisalEvidenceList(handleCloseEvidenceModal) {
        handleCloseEvidenceModal();
        handleEvidenceIdStatusCleanupToUpdate();
        handleCreatedAppraisalEvidencesStatusChange();
    }

    const handleSubmit = async (evidenceTitle, evidenceContent) => {
        console.log(`${process.env.NEXT_PUBLIC_EVIDENCES}`);
        console.log(evidenceTitle, evidenceContent);
        if (evidenceContent && evidenceContent !== '') {
            try {
                const payload = {
                    description: evidenceContent,
                    status: true
                };

                if (evidenceTitle && evidenceTitle !== "") {
                    payload.evidenceName = evidenceTitle;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_EVIDENCES}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    function reset() {
        setEvidenceTitle('');
        setEvidenceTitleState(null);
        setEvidenceContent('');
        setEvidenceContentState(null);
        setEvidenceStatus('');
        setEvidenceStatusState(null);
        setEvidenceDataList([]);
    }

    return {
        evidenceTitle,
        setEvidenceTitle,
        evidenceTitleState,
        setEvidenceTitleState,
        evidenceContent,
        setEvidenceContent,
        evidenceContentState,
        setEvidenceContentState,
        evidenceStatus,
        setEvidenceStatus,
        evidenceStatusState,
        setEvidenceStatusState,
        evidenceDataList,
        handleEvidenceDataList,
        handleValidateAddEvidenceForm,
        reset
    };
};

export default useCreateEvidence;
