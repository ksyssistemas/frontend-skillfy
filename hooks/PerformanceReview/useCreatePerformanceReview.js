import React, { useContext, useState } from 'react';

const useCreatePerformanceReview = () => {

    const [reviewName, setReviewName] = React.useState("");
    const [reviewNameState, setReviewNameState] = React.useState(null);
    const [reviewObjective, setReviewObjective] = React.useState("");
    const [reviewObjectiveState, setReviewObjectiveState] = React.useState(null);
    const [startDate, setStartDate] = React.useState("");
    const [startDateState, setStartDateState] = React.useState(null);
    const [untilDate, setUntilDate] = React.useState("");
    const [untilDateState, setUntilDateState] = React.useState(null);
    const [endDate, setEndDate] = React.useState("");
    const [endDateState, setEndDateState] = React.useState(null);
    const [reviewPeriod, setReviewPeriod] = React.useState("");
    const [reviewPeriodState, setReviewPeriodState] = React.useState(null);
    const [reviewPeriodDataList, setReviewPeriodDataList] = useState([
        { id: "2", text: "Quinzenal" },
        { id: "3", text: "Mensal" },
        { id: "4", text: "Trimestral" },
        { id: "5", text: "Semestral" },
        { id: "6", text: "Anual" },
    ]);
    const handleReviewPeriodDataList = (reviewPeriodData) => {
        setReviewPeriodDataList(reviewPeriodData);
    }

    const validateAddPerformanceReviewForm = () => {
        if (reviewName === "") {
            setReviewNameState("invalid");
        } else {
            setReviewNameState("valid");
        }
        if (reviewObjective === "") {
            if (reviewObjective.length < 10) {
                setReviewObjectiveState("invalid");
            } else {
                setReviewObjectiveState("valid");
            }
        }
        if (reviewPeriod === "") {
            setReviewPeriodState("invalid");
        } else {
            setReviewPeriodState("valid");
        }
    }

    function handleValidateAddPerformanceReviewForm() {
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
        setReviewName('');
        setReviewNameState(null);
        setReviewObjective('');
        setReviewObjectiveState(null);
        setStartDate('');
        setStartDateState(null);
        setUntilDate('');
        setUntilDateState(null);
        setEndDate('');
        setEndDateState(null);
        setReviewPeriod('');
        setReviewPeriodState(null);
        setReviewPeriodDataList([]);
    }

    return {
        reviewName,
        setReviewName,
        reviewNameState,
        setReviewNameState,
        reviewObjective,
        setReviewObjective,
        reviewObjectiveState,
        setReviewObjectiveState,
        startDate,
        setStartDate,
        startDateState,
        setStartDateState,
        untilDate,
        setUntilDate,
        untilDateState,
        setUntilDateState,
        endDate,
        setEndDate,
        endDateState,
        setEndDateState,
        reviewPeriod,
        setReviewPeriod,
        reviewPeriodState,
        setReviewPeriodState,
        reviewPeriodDataList,
        setReviewPeriodDataList,
        handleReviewPeriodDataList,
        validateAddPerformanceReviewForm,
        handleValidateAddPerformanceReviewForm,
        reset
    };
};

export default useCreatePerformanceReview;
