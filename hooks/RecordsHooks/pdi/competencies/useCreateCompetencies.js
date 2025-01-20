// Hook para gerenciar o formulário
import React, { useState } from 'react';

const useCreateCompetencies = (handleShowCompetencieRegister) => {

    const [Name, setName] = React.useState("");
    const [NameState, setNameState] = React.useState(null);
    const [Description, setDescription] = React.useState("");
    const [DescriptionState, setDescriptionState] = React.useState(null);
    const [competencieError, setCompetencieError] = useState('');
    const [competencieSuccess, setCompetencieSuccess] = useState('');

    const validateAddCompetenciesForm = () => {
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
    };

    function handleValidateAddCompetenciesForm() {
        validateAddCompetenciesForm();
        if (NameState === "valid" &&
            DescriptionState === "valid" 
        ) {
            handleSubmit(Name, Description);
        } else {
            return null;
        }
    }

    const handleSubmit = async (Name, Description) => {
        console.log(`Kaua = ${process.env.NEXT_PUBLIC_COMPETENCIES}`)
        if (Name, Description) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCIES}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: Name,
                        description: Description,
                    }),
                });

                if (response.ok) {
                    reset();
                    handleShowCompetencieRegister();
                    setCompetencieSuccess("Competência criada com sucesso!");
                    console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                    setCompetencieError("Ocorreu um erro na criação da competência!");
                }
            } catch (error) {
                console.error('Error in request:', error);
                setCompetencieError("Ocorreu um erro na criação da competência!");
            }
        }
    };

    function reset() {
        setName("");
        setNameState(null);
        setDescription("");
        setDescriptionState(null);
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
        handleValidateAddCompetenciesForm,
        competencieError,
        competencieSuccess,
        reset
    };
};

export default useCreateCompetencies;
