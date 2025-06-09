import { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import useCreateCustomerAccountHolder from '../../../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardBody,
    Container,
    Row,
    Col,
    CardFooter
} from "reactstrap";
import SimpleWizard from "../../../../components/Wizard/SimpleWizard";
import { IndividualRegistration } from "../../../../components/Forms/AuthForms/CheckoutForms/WizardSessions/IndividualRegistration";
import { LegalEntityRegistration } from "../../../../components/Forms/AuthForms/CheckoutForms/WizardSessions/LegalEntityRegistration";
import { RegisteringPaymentData } from "../../../../components/Forms/AuthForms/CheckoutForms/WizardSessions/RegisteringPaymentData";
import { ModelSelectionCustomerRecordContext } from "../../../../contexts/PerformanceContext/ModelSelectionCustomerRecordContext";

const WIZARD_COMPONENT_STEP_TITLES = ["Contato", "Organização", "Pagamento"];

const STEPS_NUMBER_FOR_WIZARD_COMPONENT = WIZARD_COMPONENT_STEP_TITLES.length;

export function CheckoutFormWrapper() {

    const {
        currentStep,
        handleClearCurrentForm,
        handleSubmit,
        handleNext,
        handlePrevious
    } = useContext(ModelSelectionCustomerRecordContext);

    const [planTypeDataList, setPlanTypeDataList] = useState([
        { id: "0", text: "Básico" },
        { id: "1", text: "Intermediário" },
        { id: "2", text: "Avançado" },
    ]);

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
            <Container>
                <Row>
                    <Col md="6">
                        <div className="d-flex flex-column">
                            <h1 className="h1 text-white">Finalize seu pedido</h1>
                            <p className="text-white">
                                Preencha os dados abaixo para contratar a SkillFy e iniciar numa jornada conosco.
                            </p>
                        </div>
                    </Col>
                    <Col md="6" className="d-flex align-items-center">
                        <Select2
                            id="validationSubscriptionPlan"
                            className="form-control"
                            defaultValue={0}
                            data-minimum-results-for-search="Infinity"
                            options={{
                                placeholder: "Selecione um plano",
                            }}
                            //value={data.selectedCompanySector || selectedCompanySector}
                            //onChange={handleSelectedCompanySectorChange}
                            data={planTypeDataList}
                        //onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, companySectorDataList, setSelectedCompanySector, setCustomerBusinessSector, setCustomerBusinessSectorState, null)}
                        />
                    </Col>
                </Row>
            </Container>
            <Card>
                <SimpleWizard
                    stepsNumber={STEPS_NUMBER_FOR_WIZARD_COMPONENT}
                    currentStep={currentStep}
                    stepTitles={WIZARD_COMPONENT_STEP_TITLES}
                    hasWizartStyleOfReviewCreation={false}
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