import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container
} from "reactstrap";
import AdminHeader from "components/Headers/AdminHeader.js";
import { CompetenciesRegister } from "../../components/Forms/PDIForms/CompetenciesRegister";
import { CompetenciesList } from "../../components/Tables/PDI/CompetenciesList";
import Admin from "layouts/Admin.js";

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
                                name="Administrador" 
                                parentName="Desempenho" 
                                newRegistrationButtonText="Adicionar Competência" 
                                handleShowCustomerUserRegister={handleToggleCompetencyForm} // Aqui usamos `handleShowCustomerUserRegister`
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
                                parentName="Cadastros" 
                                newRegistrationButtonText="Voltar para Lista"
                                handleShowCustomerUserRegister={handleToggleCompetencyForm} // Aqui também
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

CompetenciesPDI.layout = Admin;
export default CompetenciesPDI;
