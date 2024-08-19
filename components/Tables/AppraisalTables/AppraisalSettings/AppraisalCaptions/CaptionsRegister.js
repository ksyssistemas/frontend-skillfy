import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { handleSelectionEmploymentContractData } from "../../../../../util/handleSelectionEmploymentContractData";
import useCreateCaption from "../../../../../hooks/PerformanceAppraisalRecordsHooks/AppraisalCaptions/useCreateCaption";
import { AppraisalCaptionsContext } from "../../../../../contexts/PerformanceContext/AprraisalCaptionsContext";
import { useFindCaption } from "../../../../../hooks/PerformanceAppraisalRecordsHooks/AppraisalCaptions/useFindCaption";
import useUpdateCaption from "../../../../../hooks/PerformanceAppraisalRecordsHooks/AppraisalCaptions/useUpdateCaption";
import { useFindCaptionOptionByCaptionId } from "../../../../../hooks/PerformanceAppraisalRecordsHooks/AppraisalCaptions/useFindCaptionOptionByCaptionId";

function CaptionsRegister() {

    const {
        isShouldShowUpdateAspect,
        captionIdToUpdate,
    } = useContext(AppraisalCaptionsContext);

    const {
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
        handleValidateAddCaptionForm
    } = useCreateCaption();

    const { handleValidateUpdateCaptionForm } = useUpdateCaption();

    function handleOptionsCountChange(e) {
        const count = parseInt(e.target.value, 10);
        setOptionsCount(count);
        const newOptions = Array.from({ length: count }, () => ({
            label: '',
            weight: '',
            color: '',
            emoji: ''
        }));

        setOptions(newOptions);
    }

    function handleOptionChange(index, field, value) {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    }

    const [selectedCaption, setSelectedCaption] = useState('');
    function handleSelectedCaptionStatusCleanupToUpdate() {
        setSelectedCaption('');
    }

    function renderOptionFields() {
        let variableColumnWidth = 2;

        if (Number(selectedCaption) >= 1 && Number(selectedCaption) <= 4) {
            variableColumnWidth = 6;
        } else if (Number(selectedCaption) === 5 || Number(selectedCaption) === 6) {
            variableColumnWidth = 4;
        }

        return options.map((option, index) => (
            <Col md="12" className="mt-2" key={index}>
                <label
                    className="form-control-label"
                    htmlFor="rulerType"
                >
                    {`Opção ${index + 1}`}
                </label>
                <Row key={index} className="mb-2">
                    <Col md={variableColumnWidth}>
                        <Input
                            type="text"
                            placeholder="Título"
                            value={option.label}
                            onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                        />
                    </Col>
                    <Col md={variableColumnWidth}>
                        <Input
                            type="text"
                            placeholder="Peso"
                            value={option.weight}
                            onChange={(e) => handleOptionChange(index, 'weight', e.target.value)}
                        />
                    </Col>
                    {selectedCaption === "5" && (
                        <Col md={variableColumnWidth}>
                            <Input
                                type="color"
                                value={option.color}
                                onChange={(e) => handleOptionChange(index, 'color', e.target.value)}
                            />
                        </Col>
                    )}
                    {selectedCaption === "6" && (
                        <Col md={variableColumnWidth}>
                            <Input
                                type="text"
                                placeholder="Emoji"
                                value={option.emoji}
                                onChange={(e) => handleOptionChange(index, 'emoji', e.target.value)}
                            />
                        </Col>
                    )}
                </Row>
            </Col>
        ));
    }

    const CARD_HEADER_TEXT = !isShouldShowUpdateAspect ? "Adicionar Legenda de Avaliação" : "Editar Legenda de Avaliação";
    const CARD_FOOTER_SUBMIT_BUTTON_TEXT = !isShouldShowUpdateAspect ? "Adicionar" : "Editar";
    const CARD_FOOTER_SUBMIT_BUTTON_COLOR = !isShouldShowUpdateAspect ? "primary" : "warning";
    const CALL_SUBMIT_BUTTON_FROM_CARD_FOOTER = !isShouldShowUpdateAspect ? handleValidateAddCaptionForm : handleUpdateAppraisalCaption;

    const handleSelectionDepartmentToReports = (captionType) => {
        console.log("captionType: ", captionType)
        if (captionType && captionType !== null) {
            const caption = captionDataList.find(p => p.text === captionType);
            console.log("caption: ", caption);
            if (caption) {
                setCaptionType(caption.id);
                handleSelectionEmploymentContractData(
                    caption.id,
                    captionDataList,
                    setSelectedCaption,
                    setCaptionType,
                    setCaptionTypeState,
                    null,
                    null,
                    'text'
                );
            }
        }
    };

    function handleUpdateAppraisalCaption() {
        handleValidateUpdateCaptionForm(
            captionIdToUpdate,
            captionType,
            optionsCount,
            options,
            handleSelectedCaptionStatusCleanupToUpdate
        );
    }

    useEffect(() => {
        const fetchCaptionData = async () => {
            try {
                const foundCaption = await useFindCaption(captionIdToUpdate);
                const foundCaptionOptions = await useFindCaptionOptionByCaptionId(captionIdToUpdate);
                if (foundCaption && foundCaptionOptions) {
                    handleSelectionDepartmentToReports(foundCaption.ruleType);
                    setOptionsCount(foundCaption.optionsCount);
                    setOptions(foundCaptionOptions);

                } else {
                    console.error('Failed to fetch caption data');
                }
            } catch (error) {
                console.error('Error fetching caption data:', error);
            }
        };

        if (captionIdToUpdate && captionIdToUpdate !== '') {
            fetchCaptionData();
        }
    }, [captionIdToUpdate]);


    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">
                    {CARD_HEADER_TEXT}
                </h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <FormGroup>
                        <div className="form-row">
                            <Col md="6">
                                <label
                                    className="form-control-label"
                                    htmlFor="rulerType"
                                >
                                    Tipo de Legenda
                                </label>
                                <Select2
                                    id="rulerType"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione um tipo:" }}
                                    value={selectedCaption}
                                    onChange={(e) => setSelectedCaption(e.target.value)}
                                    data={captionDataList}
                                    onSelect={(e) => handleSelectionEmploymentContractData(
                                        e.target.value,
                                        captionDataList,
                                        setSelectedCaption,
                                        setCaptionType,
                                        setCaptionTypeState,
                                        null,
                                        null,
                                        'text'
                                    )}
                                />
                            </Col>
                            {
                                selectedCaption !== "0" &&
                                selectedCaption !== "" && (
                                    <>
                                        <Col md="6">
                                            <label
                                                className="form-control-label"
                                                htmlFor="optionsCount"
                                            >
                                                Número de Opções
                                            </label>
                                            <Input
                                                type="number"
                                                id="optionsCount"
                                                valid={optionsCountState === "valid"}
                                                invalid={optionsCountState === "invalid"}
                                                value={optionsCount}
                                                onChange={handleOptionsCountChange}
                                                min="1"
                                            />
                                        </Col>
                                        {renderOptionFields()}
                                    </>
                                )
                            }
                        </div>
                    </FormGroup>
                </Form>
                <Row>
                    <Col md="8" />
                    <Col className="d-flex justify-content-end align-items-center" md="4" >
                        <Button
                            className="px-5"
                            color={CARD_FOOTER_SUBMIT_BUTTON_COLOR}
                            size="lg"
                            type="button"
                            onClick={CALL_SUBMIT_BUTTON_FROM_CARD_FOOTER}
                        >
                            <span className="btn-inner--text">
                                {CARD_FOOTER_SUBMIT_BUTTON_TEXT}
                            </span>
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    );
}

export default CaptionsRegister;