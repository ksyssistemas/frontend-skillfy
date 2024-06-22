import React, { useState, useContext } from 'react';
import { useAlert } from '../../contexts/AlertContext';

const useCreateWorkplace = () => {

    const { showAlert } = useAlert();

    const [employeeWorkplace, setEmployeeWorkplace] = useState("");
    const [employeeWorkplaceState, setEmployeeWorkplaceState] = useState(null);
    const [workplaceDataList, setWorkplaceDataList] = useState([]);

    const handleEmployeeWorkplace = (employeeWorkplace) => {
        setEmployeeWorkplace(employeeWorkplace);
    }

    const handleEmployeeWorkplaceState = (employeeWorkplaceState) => {
        setEmployeeWorkplaceState(employeeWorkplaceState);
    }

    const handleWorkplaceDataList = (workplaceData) => {
        setWorkplaceDataList(workplaceData);
    }

    const validateAddWorkplace = () => {
        if (employeeWorkplace === "") {
            setEmployeeWorkplaceState("invalid");
        } else {
            setEmployeeWorkplaceState("valid");
        }
    }

    function handleWorkplaceValidation() {
        validateAddWorkplace();
        if (employeeWorkplaceState) {
            handleSubmit(employeeWorkplace);
        }
    }

    const handleSubmit = async (employeeWorkplace) => {
        if (employeeWorkplace && employeeWorkplace !== "") {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_WORKPLACE}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: employeeWorkplace,
                    }),
                });

                if (response.ok) {
                    reset();
                    showAlert(
                        "success",
                        "ni ni-check-bold",
                        "Sucesso!",
                        "Local de trabalho adicionado!",
                    );
                    console.log('Data sent successfully!');
                } else {
                    console.error('Erro na resposta:', response.status);
                    showAlert(
                        "danger",
                        "fas fa-xmark",
                        "Erro!",
                        `Erro na resposta!`,
                    );
                }
            } catch (error) {
                console.error('Erro no pedido:', error);
                showAlert(
                    "danger",
                    "fas fa-xmark",
                    "Erro!",
                    `${error}`
                );
            }
        }
    };


    function reset() {
        setEmployeeWorkplace("");
        setEmployeeWorkplaceState(null);
    }

    return {
        employeeWorkplace,
        setEmployeeWorkplace,
        employeeWorkplaceState,
        setEmployeeWorkplaceState,
        handleWorkplaceValidation,
        handleEmployeeWorkplace,
        handleEmployeeWorkplaceState,
        workplaceDataList,
        handleWorkplaceDataList
    };


};

export default useCreateWorkplace;