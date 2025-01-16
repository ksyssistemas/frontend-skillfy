// Hook para gerenciar o formulário
import React, { useState } from 'react';

const useCreatePdi = (handleShowPDIRegister) => {

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
    const [competencies, setCompetencies] = React.useState("");
    const [competenciesState, setCompetenciesState] = React.useState(null);
    const [pdiCreateError, setPdiCreateError] = useState('');
    const [pdiCreateSuccess, setPdiCreateSuccess] = useState('');

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
        if (competencies === "") {
            setCompetenciesState("invalid");
        } else {
            setCompetenciesState("valid");
        }
    };

    function handleValidateAddPDIForm() {
        console.log("Verificando as validações dos campos!");
        console.log("Name:", Name);
        console.log("NameState:", NameState);
        console.log("Description:", Description);
        console.log("DescriptionState:", DescriptionState);
        console.log("StartDate:", StartDate);
        console.log("StartDateState:", StartDateState);
        console.log("FinalDate:", FinalDate);
        console.log("FinalDateState:", FinalDateState);
        console.log("pdiStatus:", pdiStatus);
        console.log("pdiStatusState:", pdiStatusState);
        console.log("Appraiser:", appraiser);
        console.log("AppraiserState:", appraiserState);
        console.log("Evaluated:", evaluated);
        console.log("EvaluatedState:", evaluatedState);
        console.log("Competencies:", competencies);
        console.log("CompetenciesState:", competenciesState);
        validateAddPDIForm();
        if (NameState === "valid" &&
            DescriptionState === "valid" &&
            StartDateState === "valid" &&
            FinalDateState === "valid" &&
            pdiStatusState === "valid" &&
            appraiserState === "valid" &&
            evaluatedState === "valid" &&
            competenciesState === "valid"
        ) {
            handleSubmit(Name, Description, StartDate, FinalDate, pdiStatus, appraiser, evaluated, competencies);
        } else {
            console.log("Validações invalidas!");
            return null;
        }
    }

    const handleSubmit = async (Name, Description, StartDate, FinalDate, pdiStatus, appraiser, evaluated, competencies) => {
        console.log(`Kaua = ${process.env.NEXT_PUBLIC_PDI}`);
        console.log("name:", Name, "description:", Description, "startDate:", StartDate, "endDate:", FinalDate, "status:", pdiStatus, "assessorId:", appraiser, "assessorId:", evaluated, "competencies:", competencies);
        if (Name, Description, StartDate, FinalDate, pdiStatus, appraiser, evaluated, competencies) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_PDI}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: Name,
                        description: Description,
                        assessedId: Number(evaluated), 
                        assessorId: Number(appraiser),
                        startDate: StartDate,
                        endDate: FinalDate,
                        status: pdiStatus,
                        competencies: competencies,
                    }),
                });

                if (response.ok) {
                    reset();
                    handleShowPDIRegister();
                    setPdiCreateSuccess("PDI criado com sucesso!");
                    console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                    setPdiCreateError("Erro ao criar PDI!");
                }
            } catch (error) {
                console.error('Error in request:', error);
                setPdiCreateError("Erro ao criar PDI!");
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
        setCompetencies("");
        setCompetenciesState(null);
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
        competencies,
        setCompetencies,
        competenciesState,
        setCompetenciesState,
        handleValidateAddPDIForm,
        pdiCreateError,
        pdiCreateSuccess,
        reset
    };
};

export default useCreatePdi;
