import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';
import { EvidencesContext } from '../../../contexts/PerformanceContext/AppraisalEvidencesContext';

const useCreateEvidence = () => {

    const {
        handleEvidenceIdStatusCleanupToUpdate,
        handleCreatedAppraisalEvidencesStatusChange
    } = useContext(EvidencesContext);

    const [skillRelated, setSkillRelated] = useState("");
    const [skillRelatedState, setSkillRelatedState] = useState(null);
    const [evidenceContent, setEvidenceContent] = useState("");
    const [evidenceContentState, setEvidenceContentState] = useState(null);
    const [evidenceStatus, setEvidenceStatus] = useState("");
    const [evidenceStatusState, setEvidenceStatusState] = useState(null);
    const [evidenceDataList, setEvidenceDataList] = useState([]);
    const handleEvidenceDataList = (evidenceData) => {
        setEvidenceDataList(evidenceData);
    }

    const [skillRelatedDataList, setSkillRelatedDataList] = useState([]);
    const handleSkillRelatedDataList = (skillRelatedData) => {
        setSkillRelatedDataList(skillRelatedData);
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

    function handleValidateAddEvidenceForm(handleCloseEvidenceModal, handleSelectedSkillRelated) {
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
        handleSubmit(skillRelated, evidenceContent);
        goBackToAppraisalEvidenceList(handleCloseEvidenceModal, handleSelectedSkillRelated);
    }

    function goBackToAppraisalEvidenceList(handleCloseEvidenceModal, handleSelectedSkillRelated) {
        handleCloseEvidenceModal();
        handleSelectedSkillRelated();
        handleEvidenceIdStatusCleanupToUpdate();
        handleCreatedAppraisalEvidencesStatusChange();
    }

    const handleSubmit = async (skillRelated, evidenceContent) => {
        if (evidenceContent && evidenceContent !== '') {
            try {
                const payload = {
                    description: evidenceContent,
                    status: true
                };

                if (skillRelated && skillRelated !== "") {
                    payload.evidenceName = skillRelated;
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
        setSkillRelated('');
        setSkillRelatedState(null);
        setEvidenceContent('');
        setEvidenceContentState(null);
        setEvidenceStatus('');
        setEvidenceStatusState(null);
        setEvidenceDataList([]);
    }

    return {
        skillRelated,
        setSkillRelated,
        skillRelatedState,
        setSkillRelatedState,
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
        skillRelatedDataList,
        handleSkillRelatedDataList,
        handleValidateAddEvidenceForm,
        reset
    };
};

export default useCreateEvidence;
