import React, { useState, useEffect } from 'react';

const useCEP = () => {

    const [employeeZipCode, setEmployeeZipCode] = useState("");
    const [employeeZipCodeState, setEmployeeZipCodeState] = useState(null);
    const [brasilAPICEPData, setBrasilAPICEPData] = useState(null);
    const [loadingCEPValidation, setLoadingCEPValidation] = useState(false);
    const [errorCEPValidation, setErrorCEPValidation] = useState(null);

    const handleCEPValidationLoading = () => setLoadingCEPValidation(!loadingCEPValidation);

    const handleSaveCEP = (cep) => setEmployeeZipCode(cep);

    const validateCep = () => {
        if (employeeZipCode !== "") {
            setEmployeeZipCodeState("valid");
        } else {
            setEmployeeZipCodeState("invalid");
        }
    };

    useEffect(() => {
        const cep = employeeZipCode.replace(/[^\d]+/g, '');

        const fetchData = async (cep) => {
            try {
                const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
                const result = await response.json();
                setBrasilAPICEPData(result);
                validateCep();
            } catch (error) {
                setErrorCEPValidation(error);
            }
        };

        if (cep != "" &&
            cep.length === 8) {
            handleCEPValidationLoading();
            fetchData(cep);
        }
    }, [employeeZipCode]);

    return {
        brasilAPICEPData,
        loadingCEPValidation,
        errorCEPValidation,
        handleCEPValidationLoading,
        handleSaveCEP,
        employeeZipCode,
        setEmployeeZipCode,
        employeeZipCodeState,
        setEmployeeZipCodeState
    };
};

export default useCEP;
