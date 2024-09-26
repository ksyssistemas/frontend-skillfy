import React, { useState, useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Badge,
    ListGroup,
    ListGroupItem,
    Progress,
    CardFooter
} from "reactstrap";
import SimpleWizard from "../../../../Wizard/SimpleWizard";
import { ReviewIdentityForm } from "./FormPerWizardSession/ReviewIdentityForm";
import { ReviewModelAndDeadlineForm } from "./FormPerWizardSession/ReviewModelAndDeadlineForm";
import { ReviewScaleAndCriteriaForm } from "./FormPerWizardSession/ReviewScaleAndCriteriaForm";
import { ReviewCreationSetupForm } from "./FormPerWizardSession/ReviewCreationSetupForms";
import { ReviewParticipantSelectionForm } from "./FormPerWizardSession/ReviewParticipantSelectionForm";
import { ModelSelectionReviewContext } from "../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import { wizardReducer } from "../../../../../reducers/wizardReducer";

const WIZARD_COMPONENT_STEP_TITLES = ["Informações", "Modelo", "Critérios", "Configurações", "Participantes"];

const STEPS_NUMBER_FOR_WIZARD_COMPONENT = WIZARD_COMPONENT_STEP_TITLES.length;

export function ReviewFormWrapper() {

    const { selectedReview,
        handleSelectedReview,
        handleCleanlinessReviewSelection
    } = useContext(ModelSelectionReviewContext);

    const [currentStep, setCurrentStep] = useState(1);

    // const initialState = {
    //     currentStep: 1,
    //     stepsNumber: WIZARD_COMPONENT_STEP_TITLES.length,
    //     isValidStep: false,
    // };

    // const [state, dispatch] = useReducer(wizardReducer, initialState);

    const handleNextStep = () => {
        if (currentStep < STEPS_NUMBER_FOR_WIZARD_COMPONENT) {
            setCurrentStep(currentStep + 1);
        }
        // dispatch({ type: ActionTypes.VALIDATE_STEP });

        // if (state.isValidStep) {
        //     dispatch({ type: ActionTypes.NEXT_STEP });
        // }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
        // dispatch({ type: ActionTypes.PREV_STEP });
    };

    const initializeFormData = () => {
        const formData = {};
        for (let i = 1; i <= STEPS_NUMBER_FOR_WIZARD_COMPONENT; i++) {
            formData[`session${i}Data`] = {}; // Inicializa cada sessão como um objeto vazio
        }
        return formData;
    };

    // Estado inicial dinamicamente baseado no número de sessões
    const [formData, setFormData] = useState(initializeFormData);

    // Função para atualizar dados de uma sessão
    const updateSessionData = (sessionKey, data) => {
        setFormData((prevData) => ({
            ...prevData,
            [sessionKey]: data,
        }));
    };

    // Função para enviar todos os dados
    const handleSubmit = () => {
        // Aqui você envia todos os dados armazenados no formData
        console.log('Submitting all data:', formData);
        // Exemplo de envio dos dados via fetch ou axios
        // fetch('/api/save', { method: 'POST', body: JSON.stringify(formData) });
    };

    const renderReviewComponent = () => {
        const stepTitle = WIZARD_COMPONENT_STEP_TITLES[currentStep - 1]; // Obtém o título com base no currentStep

        switch (stepTitle) {
            case "Informações":
                return <ReviewIdentityForm
                    updateSessionData={updateSessionData}
                    sessionData={formData.sessionOneData}
                />;
            case "Modelo":
                return <ReviewModelAndDeadlineForm
                    updateSessionData={updateSessionData}
                    sessionData={formData.sessionTwoData}
                />;
            case "Critérios":
                return <ReviewScaleAndCriteriaForm
                    updateSessionData={updateSessionData}
                    sessionData={formData.sessionThreeData}
                />;
            case "Configurações":
                return <ReviewCreationSetupForm
                    updateSessionData={updateSessionData}
                    sessionData={formData.sessionFourData}
                />;
            case "Participantes":
                return <ReviewParticipantSelectionForm formData={formData} handleSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <>
            {
                selectedReview && (
                    <Card>
                        <CardHeader>
                            <h3 className="mb-0">Identidade da Avaliação</h3>
                        </CardHeader>
                        <SimpleWizard
                            stepsNumber={STEPS_NUMBER_FOR_WIZARD_COMPONENT}
                            currentStep={currentStep}
                            stepTitles={WIZARD_COMPONENT_STEP_TITLES}
                        />
                        <CardBody>
                            {renderReviewComponent()}
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col md="8">
                                    <span className="font-weight-bold">
                                        {`Passo ${currentStep} de ${STEPS_NUMBER_FOR_WIZARD_COMPONENT}`}
                                    </span>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center" md="4" >
                                    <Button className="px-5 me-2" color="secondary" size="lg" type="button"
                                        onClick={handlePrevStep}
                                        disabled={currentStep === 1}
                                    >
                                        Anterior
                                    </Button>
                                    <Button className="px-5 me-2" color="primary" size="lg" type="button"
                                        onClick={handleNextStep}
                                        disabled={currentStep === STEPS_NUMBER_FOR_WIZARD_COMPONENT}
                                    >
                                        Próximo
                                    </Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card >
                )
            }
        </>
    );
}

ReviewFormWrapper.propTypes = {
    selectedReview: PropTypes.string,
};
