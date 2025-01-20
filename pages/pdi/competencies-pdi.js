import React, { useState } from "react";
import { Container } from "reactstrap";
import AdminHeader from "components/Headers/AdminHeader.js";
import { CompetenciesRegister } from "../../components/Forms/PDIForms/CompetenciesRegister";
import CompetenciesList from "../../components/Tables/PDI/CompetenciesList";
import Admin from "layouts/Admin.js";
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';

function CompetenciesPDI() {
    const [isAddingCompetency, setIsAddingCompetency] = useState(false);

    function handleToggleCompetencyForm() {
        setIsAddingCompetency(!isAddingCompetency);
    }

    return (
        <>
            {
                !isAddingCompetency
                    ? (
                        <>
                            <AdminHeader 
                                name="Competências" 
                                parentName="Desempenho" 
                                newRegistrationButtonText="Adicionar Competência" 
                                handleShowCustomerUserRegister={handleToggleCompetencyForm} 
                            />
                            <Container className="mt--6" fluid>
                                <CompetenciesList handleToggleCompetencyForm={handleToggleCompetencyForm} />
                            </Container>
                        </>
                    )
                    : (
                        <>
                            <AdminHeader 
                                name="Competências" 
                                parentName="Desempenho" 
                                newRegistrationButtonText="Voltar para Lista"
                                handleShowCustomerUserRegister={handleToggleCompetencyForm} 
                            />
                            <Container className="mt--6" fluid>
                                <CompetenciesRegister handleToggleCompetencyForm={handleToggleCompetencyForm} />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
    ? CompetenciesPDI.layout = Admin
    : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
        ? CompetenciesPDI.layout = Performance
        : CompetenciesPDI.layout = Admin);

export default CompetenciesPDI;
