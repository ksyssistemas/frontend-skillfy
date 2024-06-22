import React, { useState, useContext } from 'react';
import { useAlert } from '../../contexts/AlertContext';

const useCreateWorkModel = () => {

    const { showAlert } = useAlert();

    const [employeetWorkModel, setEmployeetWorkModel] = useState("");
    const [employeetWorkModelState, setEmployeetWorkModelState] = useState(null);
    const [workModelDataList, setWorkModelDataList] = useState([]);

    const handleEmployeetWorkModel = (employeetWorkModel) => {
        setEmployeetWorkModel(employeetWorkModel);
    }

    const handleEmployeetWorkModelState = (employeetWorkModelState) => {
        setEmployeetWorkModelState(employeetWorkModelState);
    }

    const handleWorkModelDataList = (workModelData) => {
        setWorkModelDataList(workModelData);
    }

    const validateAddWorkModel = () => {
        if (employeetWorkModel === "") {
            setEmployeetWorkModelState("invalid");
        } else {
            setEmployeetWorkModelState("valid");
        }
    }

    function handleWorkModelValidation() {
        validateAddWorkModel();
        if (employeetWorkModelState === "valid") {
            handleSubmit(employeetWorkModel);
        }
    }

    const handleSubmit = async (employeetWorkModel) => {
        if (employeetWorkModel && employeetWorkModel !== "") {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_WORK_MODEL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: employeetWorkModel,
                    }),
                });

                if (response.ok) {
                    reset();
                    showAlert(
                        "success",
                        "ni ni-check-bold",
                        "Sucesso!",
                        "Modelo de trabalho adicionado!",
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
        setEmployeetWorkModel("");
        setEmployeetWorkModelState(null);
    }

    return {
        employeetWorkModel,
        setEmployeetWorkModel,
        employeetWorkModelState,
        setEmployeetWorkModelState,
        handleWorkModelValidation,
        handleEmployeetWorkModel,
        handleEmployeetWorkModelState,
        workModelDataList,
        handleWorkModelDataList
    };


};

export default useCreateWorkModel;