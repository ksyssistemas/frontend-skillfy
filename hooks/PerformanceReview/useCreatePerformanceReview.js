import React, { useContext, useState } from 'react';

const useCreatePerformanceReview = () => {

    const [reviewName, setReviewName] = React.useState("");
    const [reviewNameState, setReviewNameState] = React.useState(null);
    const [reviewObjective, setReviewObjective] = React.useState("");
    const [reviewObjectiveState, setReviewObjectiveState] = React.useState(null);

    const [isIntercurrentReviewCycle, setIsIntercurrentReviewCycle] = React.useState(false);
    const [isIntercurrentReviewCycleState, setIsIntercurrentReviewCycleState] = React.useState(null);

    const [isUserDefinedDateToReview, setIsUserDefinedDateToReview] = React.useState(false);
    const [isUserDefinedDateToReviewState, setIsUserDefinedDateToReviewState] = React.useState(null);

    const [startDate, setStartDate] = React.useState("");
    const [startDateState, setStartDateState] = React.useState(null);
    const [endDate, setEndDate] = React.useState("");
    const [endDateState, setEndDateState] = React.useState(null);

    const [reviewCycle, setReviewCycle] = React.useState("");
    const [reviewCycleState, setReviewCycleState] = React.useState(null);
    const [reviewCycleDataList, setReviewCycleDataList] = useState([
        { id: "1", text: "Intercorrente" },
        { id: "2", text: "Anual" },
        { id: "3", text: "Semestral" },
        { id: "4", text: "Trimestral" },
        { id: "5", text: "Mensal" },
        { id: "6", text: "Quinzenal" },
    ]);
    const handleReviewCycleDataList = (reviewCycleData) => {
        setReviewCycleDataList(reviewCycleData);
    }

    const [reviewPeriod, setReviewPeriod] = React.useState("");
    const [reviewPeriodState, setReviewPeriodState] = React.useState(null);
    const [reviewPeriodDataList, setReviewPeriodDataList] = useState([
        { id: "1", text: "Anual" },
        { id: "2", text: "Semestral" },
        { id: "3", text: "Trimestral" },
        { id: "4", text: "Mensal" },
        { id: "5", text: "Quinzenal" },
    ]);
    const handleReviewPeriodDataList = (reviewPeriodData) => {
        setReviewPeriodDataList(reviewPeriodData);
    }

    const [reviewDate, setReviewDate] = React.useState("");
    const [reviewDateState, setReviewDateState] = React.useState(null);
    const [dateOnReviewWasCarriedOutDataList, setDateOnReviewWasCarriedOutDataList] = useState([
        { id: "1", text: "Data de Admissão" },
        { id: "2", text: "Data de Aniversário" },
        { id: "3", text: "Definir uma Data" },
    ]);
    const handleDateOnReviewWasCarriedOutDataList = (dateOnReviewWasCarriedOut) => {
        setDateOnReviewWasCarriedOutDataList(dateOnReviewWasCarriedOut);
    }

    const [isReviewCyclePerPeriod, setIsReviewCyclePerPeriod] = useState(false);

    const [hasPerformanceReviewOfLeaders, setHasPerformanceReviewOfLeaders] = React.useState(true);
    const [deadlineToLeadersToRespondToPerformanceReview, setDeadlineToLeadersToRespondToPerformanceReview] = React.useState('');
    const [hasSelfReviewOfPerformance, setHasSelfReviewOfPerformance] = React.useState(true);
    const [deadlineToRespondToPerformanceSelfReview, setDeadlineToRespondToPerformanceSelfReview] = React.useState('');
    const [hasPerformanceReviewOfEvaluators, setHasPerformanceReviewOfEvaluators] = React.useState(true);
    const [deadlineToEvaluatorsToRespondToPerformanceReview, setDeadlineToEvaluatorsToRespondToPerformanceReview] = React.useState('');
    const [weightOfPerformanceReviewOfLeaders, setWeightOfPerformanceReviewOfLeaders] = React.useState(null);
    const [weightOfSelfReviewOfPerformance, setWeightOfSelfReviewOfPerformance] = React.useState(null);
    const [weightOfEvaluatorsPerformanceReview, setWeightOfEvaluatorsPerformanceReview] = React.useState(null);
    const [isFullPerformanceReviewWeigth, setIsFullPerformanceReviewWeigth] = React.useState(null);

    const [rulerTypeDataList, setRulerTypeDataList] = useState([
        { id: "1", text: "Conceitual" },
        { id: "2", text: "Numérica" },
        { id: "3", text: "Percentual" },
        { id: "4", text: "Cor" },
        { id: "5", text: "Emoji" },
    ]);
    const handleRulerTypeDataList = (rulerTypeData) => {
        setRulerTypeDataList(rulerTypeData);
    }
    const [employeeContractType, setEmployeeContractType] = React.useState(null);
    const [employeeContractTypeState, setEmployeeContractTypeState] = React.useState('');

    const [performanceReviewRulerTypeSelected, setPerformanceReviewRulerTypeSelected] = React.useState(null);
    const [performanceReviewRulerOptionSelected, setPerformanceReviewRulerOptionSelected] = React.useState(null);
    const [performanceReviewRulerOptionSelectedState, setPerformanceReviewRulerOptionSelectedState] = React.useState(null);

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
        isIntercurrentReviewCycle,
        setIsIntercurrentReviewCycle,
        isIntercurrentReviewCycleState,
        setIsIntercurrentReviewCycleState,
        isUserDefinedDateToReview,
        setIsUserDefinedDateToReview,
        isUserDefinedDateToReviewState,
        setIsUserDefinedDateToReviewState,
        startDate,
        setStartDate,
        startDateState,
        setStartDateState,
        endDate,
        setEndDate,
        endDateState,
        setEndDateState,

        reviewCycle,
        setReviewCycle,
        reviewCycleState,
        setReviewCycleState,
        reviewCycleDataList,
        setReviewCycleDataList,
        handleReviewCycleDataList,

        reviewPeriod,
        setReviewPeriod,
        reviewPeriodState,
        setReviewPeriodState,
        reviewPeriodDataList,
        setReviewPeriodDataList,
        handleReviewPeriodDataList,
        reviewDate,
        setReviewDate,
        reviewDateState,
        setReviewDateState,
        dateOnReviewWasCarriedOutDataList,
        setDateOnReviewWasCarriedOutDataList,
        handleDateOnReviewWasCarriedOutDataList,

        isReviewCyclePerPeriod,
        setIsReviewCyclePerPeriod,

        hasPerformanceReviewOfLeaders,
        deadlineToLeadersToRespondToPerformanceReview,
        hasSelfReviewOfPerformance,
        deadlineToRespondToPerformanceSelfReview,
        hasPerformanceReviewOfEvaluators,
        deadlineToEvaluatorsToRespondToPerformanceReview,
        weightOfPerformanceReviewOfLeaders,
        weightOfSelfReviewOfPerformance,
        weightOfEvaluatorsPerformanceReview,
        isFullPerformanceReviewWeigth,
        setHasPerformanceReviewOfLeaders,
        setDeadlineToLeadersToRespondToPerformanceReview,
        setHasSelfReviewOfPerformance,
        setDeadlineToRespondToPerformanceSelfReview,
        setHasPerformanceReviewOfEvaluators,
        setDeadlineToEvaluatorsToRespondToPerformanceReview,
        setWeightOfPerformanceReviewOfLeaders,
        setWeightOfSelfReviewOfPerformance,
        setWeightOfEvaluatorsPerformanceReview,
        setIsFullPerformanceReviewWeigth,
        rulerTypeDataList,
        handleRulerTypeDataList,
        employeeContractType,
        setEmployeeContractType,
        employeeContractTypeState,
        setEmployeeContractTypeState,
        performanceReviewRulerOptionSelected,
        setPerformanceReviewRulerOptionSelected,
        performanceReviewRulerOptionSelectedState,
        setPerformanceReviewRulerOptionSelectedState,
        validateAddPerformanceReviewForm,
        handleValidateAddPerformanceReviewForm,
        reset
    };
};

export default useCreatePerformanceReview;
