import React, { useState, useEffect } from 'react';

const useCEP = () => {

    const [zipCode, setZipCode] = useState("");
    const [zipCodeState, setZipCodeState] = useState(null);
    const [brasilAPICEPData, setBrasilAPICEPData] = useState(null);
    const [loadingCEPValidation, setLoadingCEPValidation] = useState(false);
    const [errorCEPValidation, setErrorCEPValidation] = useState(null);
    const handleErrorCEPValidation = () => setErrorCEPValidation(null);

    const handleCEPValidationLoading = () => setLoadingCEPValidation(!loadingCEPValidation);

    const handleSaveCEP = (cep) => setZipCode(cep);

    const validateCep = () => {
        if (zipCode === "") {
            setZipCodeState("invalid");
        } else {
            setZipCodeState("valid");
        }
    };

    useEffect(() => {
        const cep = zipCode.replace(/[^\d]+/g, '');

        const fetchData = async (cep) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BRASIL_API_CEP_V2}/${cep}`);
                const result = await response.json();
                if (!result.message) {
                    setBrasilAPICEPData(result);
                    validateCep();
                } else {
                //if (result.type && result.type === "not_found") 
                    setErrorCEPValidation(result.message);
                }
            } catch (error) {
                console.log(error);
                setErrorCEPValidation(error);
            }
        };

        if (cep && cep !== "" &&
            cep.length === 8) {
            fetchData(cep);
        }
    }, [zipCode]);

    return {
        brasilAPICEPData,
        loadingCEPValidation,
        errorCEPValidation,
        handleCEPValidationLoading,
        handleSaveCEP,
        zipCode,
        setZipCode,
        zipCodeState,
        setZipCodeState,
        handleErrorCEPValidation
    };
};

export default useCEP;
