// Hook para gerenciar o formulário
import React, { useState } from 'react';

const useCreatePdi = () => {

    const [Name, setName] = React.useState("");
    const [NameState, setNameState] = React.useState(null);
    const [Description, setDescription] = React.useState("");
    const [DescriptionState, setDescriptionState] = React.useState(null);
    const [StartDate, setStartDate] = React.useState("");
    const [StartDateState, setStartDateState] = React.useState(null);
    const [FinalDate, setFinalDate] = React.useState("");
    const [FinalDateState, setFinalDateState] = React.useState(null);
    const [pdiStatus, setPdiStatus] = React.useState("");
    const [pdiStatusState, setPdiStatusState] = React.useState(null);
    const [appraiser, setAppraiser] = React.useState("");
    const [appraiserState, setAppraiserState] = React.useState(null);
    const [evaluated, setEvaluated] = React.useState("");
    const [evaluatedState, setEvaluatedState] = React.useState(null);

    const validateAddPDIForm = () => {
        if (Name === "") {
            setNameState("invalid");
        } else {
            setNameState("valid");
        }
        if (Description === "") {
            setDescriptionState("invalid");
        } else {
            setDescriptionState("valid");
        }
        if (StartDate === "") {
            setStartDateState("invalid");
        } else {
            setStartDateState("valid");
        }
        if (FinalDate === "") {
            setFinalDateState("invalid");
        } else {
            setFinalDateState("valid");
        }
        if (pdiStatus === "") {
            setPdiStatusState("invalid");
        } else {
            setPdiStatusState("valid");
        }
        if (appraiser === "") {
            setAppraiserState("invalid");
        } else {
            setAppraiserState("valid");
        }
        if (evaluated === "") {
            setEvaluatedState("invalid");
        } else {
            setEvaluatedState("valid");
        }
    };

    function handleValidateAddPDIForm() {
        validateAddPDIForm();
        if (NameState === "valid" &&
            DescriptionState === "valid" &&
            StartDateState === "valid" &&
            FinalDateState === "valid" &&
            pdiStatusState === "valid" &&
            appraiserState === "valid" &&
            evaluatedState === "valid" 
        ) {
            handleSubmit(Name, Description, StartDate, FinalDate, pdiStatus, appraiser, evaluated);
        } else {
            return null;
        }
    }

    const handleSubmit = async (Name, Description, StartDate, FinalDate, pdiStatus, appraiser, evaluated) => {
        console.log(`Kaua = ${process.env.NEXT_PUBLIC_PDI}`)
        if (Name, Description) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_PDI}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: Name,
                        description: Description,
                        startDate: StartDate,
                        endDate: FinalDate,
                        status: pdiStatus,
                        assessorId: appraiser,
                        assessedId: evaluated,
                    }),
                });

                if (response.ok) {
                    reset();
                    handleShowCompetencieRegister();
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
        setName("");
        setNameState(null);
        setDescription("");
        setDescriptionState(null);
        setStartDate("");
        setStartDateState(null);
        setFinalDate("");
        setFinalDateState(null);
        setPdiStatus("");
        setPdiStatusState(null);
        setAppraiser("");
        setAppraiserState(null);
        setEvaluated("");
        setEvaluatedState(null);
    }

    return {
        Name,
        setName,
        NameState,
        setNameState,
        Description,
        setDescription,
        DescriptionState,
        setDescriptionState,
        StartDate,
        setStartDate,
        StartDateState,
        setStartDateState,
        FinalDate,
        setFinalDate,
        FinalDateState,
        setFinalDateState,
        pdiStatus,
        setPdiStatus,
        pdiStatusState,
        setPdiStatusState,
        appraiser,
        setAppraiser,
        appraiserState,
        setAppraiserState,
        evaluated,
        setEvaluated,
        evaluatedState,
        setEvaluatedState,
        handleValidateAddPDIForm,
        reset
    };
};

export default useCreatePdi;
