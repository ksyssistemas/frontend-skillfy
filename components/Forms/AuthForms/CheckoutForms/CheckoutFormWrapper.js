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
import SimpleWizard from "../../../../components/Wizard/SimpleWizard";
import { IndividualRegistration } from "../../../../components/Forms/AuthForms/CheckoutForms/WizardSessions/IndividualRegistration";
import { LegalEntityRegistration } from "../../../../components/Forms/AuthForms/CheckoutForms/WizardSessions/LegalEntityRegistration";
import { RegisteringPaymentData } from "../../../../components/Forms/AuthForms/CheckoutForms/WizardSessions/RegisteringPaymentData";
import { ReviewCreationSetupForm } from "components/Forms/PerformanceForms/ReviewsForms/PerformanceReview/FormPerWizardSession/ReviewCreationSetupForms.js";
import { ReviewParticipantSelectionForm } from "components/Forms/PerformanceForms/ReviewsForms/PerformanceReview/FormPerWizardSession/ReviewParticipantSelectionForm.js";
import { ModelSelectionReviewContext } from "contexts/PerformanceContext/ModelSelectionReviewContext.js";
import { wizardReducer } from "reducers/wizardReducer";

const WIZARD_COMPONENT_STEP_TITLES = ["Dados", "Empresa", "Pagamento"];

const STEPS_NUMBER_FOR_WIZARD_COMPONENT = WIZARD_COMPONENT_STEP_TITLES.length;

export function CheckoutFormWrapper() {

    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        if (currentStep < STEPS_NUMBER_FOR_WIZARD_COMPONENT) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
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

    const renderCheckoutComponent = () => {
        const stepTitle = WIZARD_COMPONENT_STEP_TITLES[currentStep - 1]; // Obtém o título com base no currentStep

        switch (stepTitle) {
            case "Dados":
                return <IndividualRegistration
                    updateSessionData={updateSessionData}
                    sessionData={formData.sessionOneData}
                />;
            case "Empresa":
                return <LegalEntityRegistration
                    updateSessionData={updateSessionData}
                    sessionData={formData.sessionTwoData}
                />;
            case "Pagamento":
                return <RegisteringPaymentData
                    updateSessionData={updateSessionData}
                    sessionData={formData.sessionThreeData}
                />;
            default:
                return null;
        }
    };

    return (
        <>
            <Container>
                <Row>
                    <Col md = "6">
                        <div className="d-flex flex-column">
                            <h1 className="h1 text-outline-right-orange text-white">Finalize seu pedido</h1>
                            <p className="text-white">
                                Preencha os dados abaixo para contratar a SkillFy e iniciar numa jornada conosco.
                            </p>
                        </div>
                    </Col>
                    <Col md = "6">
                        <Input
                            type="select" className="bg-purple-sk text-white border-white"
                        />
                    </Col>
                </Row>
            </Container>   
            <SimpleWizard
                stepsNumber={STEPS_NUMBER_FOR_WIZARD_COMPONENT}
                currentStep={currentStep}
                stepTitles={WIZARD_COMPONENT_STEP_TITLES}
            />
            <Card>
                <CardBody>
                    {renderCheckoutComponent()}
                </CardBody>
            </Card >
            <Container className="pb-5">
                <Row>
                    <Col md="8">
                        <span className="font-weight-bold d-none">
                            {`Passo ${currentStep} de ${STEPS_NUMBER_FOR_WIZARD_COMPONENT}`}
                        </span>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center" md="4" >
                        <Button className="px-5 me-2 rounded-pill" color="secondary" size="md" type="button"
                            onClick={handlePrevStep}
                            disabled={currentStep === 1}
                        >
                            Anterior
                        </Button>
                        <Button className="px-5 me-2 rounded-pill" color="purple-sk" size="md" type="button"
                            onClick={handleNextStep}
                            disabled={currentStep === STEPS_NUMBER_FOR_WIZARD_COMPONENT}
                        >
                            Próximo
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}