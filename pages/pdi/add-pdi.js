import React, { useState } from "react";
import { Container } from "reactstrap";
import PdiHeader from "components/Headers/PdiHeader.js";
import { PDIRegister } from "../../components/Forms/PDIForms/PDIRegister";
import { PDIList } from "../../components/Tables/PDI/PDIList";

import DynamicLayout from "../../layouts/DynamicLayout";

function AddPDI() {

    const [isAddingPDI, setIsAddingPDI] = useState(null);

    function handleTogglePDIForm() {
        setIsAddingPDI(!isAddingPDI);
    }

    // if (!authenticationDataLoggedInUser) {
    //     return null;
    // }

    return (
        <>
            {
                !isAddingPDI
                    ? (
                        <>
                            <PdiHeader name="PDI" parentName="Desempenho" newRegistrationButtonText="Adicionar PDI" handleShowCustomerUserRegister={handleTogglePDIForm} />
                            <Container className="mt--6" fluid>
                                <PDIList handleShowPDIRegister={handleTogglePDIForm} />
                            </Container>
                        </>
                    )
                    : (
                        <>
                            <PdiHeader name="PDI" parentName="Desempenho" newRegistrationButtonText="Voltar para Lista" handleShowCustomerUserRegister={handleTogglePDIForm} />
                            <Container className="mt--6" fluid>
                                <PDIRegister handleShowPDIRegister={handleTogglePDIForm} />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

AddPDI.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default AddPDI;
