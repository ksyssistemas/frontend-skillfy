import { useContext } from 'react';
import { IndividualRegistration } from "components/Forms/AuthForms/CheckoutForms/WizardSessions/IndividualRegistration";
import { LegalEntityRegistration } from "components/Forms/AuthForms/CheckoutForms/WizardSessions/LegalEntityRegistration";
import { RegisteringPaymentData } from "components/Forms/AuthForms/CheckoutForms/WizardSessions/RegisteringPaymentData";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Row,
    Col,
} from "reactstrap";
import SimpleWizard from '../../Wizard/SimpleWizard';
import { ModelSelectionCustomerRecordContext } from '../../../contexts/PerformanceContext/ModelSelectionCustomerRecordContext';

const WIZARD_COMPONENT_STEP_TITLES = ["Contato", "Organização", "Pagamento"];

const STEPS_NUMBER_FOR_WIZARD_COMPONENT = WIZARD_COMPONENT_STEP_TITLES.length;

function CustomerUserRegister() {

    const {
        currentStep,
        handleClearCurrentForm,
        handleSubmit,
        handleNext,
        handlePrevious
    } = useContext(ModelSelectionCustomerRecordContext);

    const renderCheckoutComponent = () => {
        const stepTitle = WIZARD_COMPONENT_STEP_TITLES[currentStep - 1]; // Obtém o título com base no currentStep
        switch (stepTitle) {
            case "Contato":
                return <IndividualRegistration />;
            case "Organização":
                return <LegalEntityRegistration />;
            case "Pagamento":
                return <RegisteringPaymentData />;
            default:
                return null;
        }
    };

    return (
        <>
            <Card>
                <SimpleWizard
                    stepsNumber={STEPS_NUMBER_FOR_WIZARD_COMPONENT}
                    currentStep={currentStep}
                    stepTitles={WIZARD_COMPONENT_STEP_TITLES}
                    hasWizardStyleOfReviewCreation={false}
                />
                <CardBody>
                    {renderCheckoutComponent()}
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col md="8">
                            <span className="font-weight-bold">
                                {`Passo ${currentStep} de ${STEPS_NUMBER_FOR_WIZARD_COMPONENT}`}
                            </span>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center" md="4" >
                            <Button className="px-5 me-2" color="primary" size="lg" type="button"
                                onClick={handleClearCurrentForm}
                            >
                                Limpar
                            </Button>
                            <Button className="px-5 me-2" color="secondary" size="lg" type="button"
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                            >
                                Anterior
                            </Button>
                            {currentStep < STEPS_NUMBER_FOR_WIZARD_COMPONENT ? (
                                <Button
                                    className="px-5 me-2"
                                    color="primary"
                                    size="lg"
                                    type="button"
                                    onClick={handleNext}
                                >
                                    Próximo
                                </Button>
                            ) : (
                                <Button
                                    className="px-5 me-2"
                                    color="success"
                                    size="lg"
                                    type="button"
                                    onClick={async () => await handleSubmit()}
                                >
                                    Submeter
                                </Button>
                            )}
                        </Col>
                    </Row>
                </CardFooter>
            </Card >
        </>
    );
}

export default CustomerUserRegister;
