import React, { useState, useContext } from 'react';
import { AlertContext } from '../../contexts/AlertContext';

const useCreateWorkplace = () => {

    const { showAlert } = useContext(AlertContext);

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
                const response = await fetch(`http://dlist.com.br:3008/workplace`, {
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
                        `Erro na resposta: , ${response.status}`,
                    );
                }
            } catch (error) {
                console.error('Erro no pedido:', error);
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