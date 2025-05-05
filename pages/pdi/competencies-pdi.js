import React, { useState } from "react";
import { Container } from "reactstrap";
import PdiHeader from "components/Headers/PdiHeader.js";
import { CompetenciesRegister } from "../../components/Forms/PDIForms/CompetenciesRegister";
import CompetenciesList from "../../components/Tables/PDI/CompetenciesList";
import DynamicLayout from "../../layouts/DynamicLayout";

function CompetenciesPDI() {

    // const { authenticationDataLoggedInUser } = useAuth();

    const [isAddingCompetency, setIsAddingCompetency] = useState(false);

    function handleToggleCompetencyForm() {
        setIsAddingCompetency(!isAddingCompetency);
    }

    // if (!authenticationDataLoggedInUser) {
    //     return null;
    // }

    return (
        <>
            {
                !isAddingCompetency
                    ? (
                        <>
                            <PdiHeader
                                name="Competências"
                                parentName="Desempenho"
                                newRegistrationButtonText="Adicionar Competência"
                                handleShowCustomerUserRegister={handleToggleCompetencyForm}
                            />
                            <Container className="mt--6" fluid>
                                <CompetenciesList handleShowCompetencieRegister={handleToggleCompetencyForm} />
                            </Container>
                        </>
                    )
                    : (
                        <>
                            <PdiHeader
                                name="Competências"
                                parentName="Desempenho"
                                newRegistrationButtonText="Voltar para Lista"
                                handleShowCustomerUserRegister={handleToggleCompetencyForm}
                            />
                            <Container className="mt--6" fluid>
                                <CompetenciesRegister handleShowCompetencieRegister={handleToggleCompetencyForm} />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

CompetenciesPDI.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default CompetenciesPDI;
