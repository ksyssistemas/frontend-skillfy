import React, { useContext, useState } from 'react';
import { AppraisalCaptionsContext } from '../../../contexts/PerformanceContext/AprraisalCaptionsContext';

const useCreateCaption = () => {

    const {
        handleCreatedAppraisalCaptionStatusChange,
        handleShowCaptionRegister
    } = useContext(AppraisalCaptionsContext);

    const [captionType, setCaptionType] = useState("");
    const [captionTypeState, setCaptionTypeState] = useState(null);
    const [optionsCount, setOptionsCount] = useState(0);
    const [optionsCountState, setOptionsCountState] = useState(null);
    const [options, setOptions] = useState([]);
    const [captionDataList, setCaptionDataList] = useState([
        { id: "1", text: "Conceitual" },
        { id: "2", text: "Numérica" },
        { id: "3", text: "Percentual" },
        // { id: "4", text: "Cor" },
        // { id: "5", text: "Emoji" },
    ]);
    const handleCaptionDataList = (captionData) => {
        setCaptionDataList(captionData);
    }

    const [appraisalCaptionTypeId, setAppraisalCaptionTypeId] = useState("");
    const [appraisalCaptionTypeIdState, setAppraisalCaptionTypeIdState] = useState(null);

    const [captionOptionLabelState, setCaptionOptionLabelState] = useState(null);
    const [captionOptionWeightState, setCaptionOptionWeightState] = useState(null);

    const validateAddCaptionForm = () => {
        if (captionType === "") {
            setCaptionTypeState("invalid");
        } else {
            setCaptionTypeState("valid");
        }
        if (optionsCount === 0) {
            setOptionsCountState("invalid");
        } else {
            setOptionsCountState("valid");
        }
        if (options !== '') {
            if (options.label !== '' && options.weight !== '') {
                setCaptionOptionLabelState("valid");
                setCaptionOptionWeightState("valid");
            } else if (options.label === '' && options.weight !== '') {
                setCaptionOptionLabelState("invalid");
                setCaptionOptionWeightState("invalid");
            } else if (options.label !== '' && options.weight === '') {
                setCaptionOptionLabelState("invalid");
                setCaptionOptionWeightState("invalid");
            } else if (options.label === '' && options.weight === '') {
                setCaptionOptionLabelState("invalid");
                setCaptionOptionWeightState("invalid");
            }
        } else {
            setCaptionOptionLabelState("invalid");
            setCaptionOptionWeightState("invalid");
        }
    }

    async function handleValidateAddCaptionForm() {
        validateAddCaptionForm();
        const appraisalCaptionTypeId = await handleSubmit(captionType, optionsCount);
        if (appraisalCaptionTypeId) {
            options.forEach(async (option) => {
                await handleCaptionOptionSubmit(appraisalCaptionTypeId, option);
            });
        }
        goBackToAppraisalCaptionList();
    }

    function goBackToAppraisalCaptionList() {
        handleCreatedAppraisalCaptionStatusChange();
        reset();
        handleShowCaptionRegister();
    }

    const handleSubmit = async (captionType, optionsCount) => {
        if (captionType && captionType !== '' && optionsCount) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_EVALUATION_RULER}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ruleType: captionType,
                        optionsCount: optionsCount
                    }),
                });

                if (response.ok) {
                    console.log('Data sent successfully!');
                    const data = await response.json();
                    return data.id;
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    const handleCaptionOptionSubmit = async (appraisalCaptionTypeId, option) => {
        try {
            const payload = {
                evaluationRulerId: appraisalCaptionTypeId,
            };

            if (option.label && option.label !== "") {
                payload.label = option.label;
            }

            if (option.weight && option.weight !== "") {
                payload.weight = option.weight;
            }

            if (option.color && option.color !== "") {
                payload.color = option.color;
            }

            if (option.emoji && option.emoji !== "") {
                payload.emoji = option.emoji;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_RULER_OPTION}`, {
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
    };

    function reset() {
        setCaptionType("");
        setCaptionTypeState(null);
        setOptionsCount(0);
        setOptionsCountState(null);
        setOptions([]);
        setAppraisalCaptionTypeId("");
        setAppraisalCaptionTypeIdState(null);
        setCaptionOptionLabelState(null);
        setCaptionOptionWeightState(null);
    }

    return {
        captionType,
        setCaptionType,
        captionTypeState,
        setCaptionTypeState,
        captionDataList,
        optionsCount,
        setOptionsCount,
        optionsCountState,
        setOptionsCountState,
        options,
        setOptions,
        handleCaptionDataList,
        appraisalCaptionTypeId,
        setAppraisalCaptionTypeId,
        appraisalCaptionTypeIdState,
        setAppraisalCaptionTypeIdState,
        captionOptionLabelState,
        setCaptionOptionLabelState,
        captionOptionWeightState,
        setCaptionOptionWeightState,
        handleValidateAddCaptionForm,
        reset
    };
};

export default useCreateCaption;
