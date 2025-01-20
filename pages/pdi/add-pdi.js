import React, { useState } from "react";
import {
    Container
} from "reactstrap";
import AdminHeader from "components/Headers/AdminHeader.js";
import Admin from "layouts/Admin.js";
import { PDIRegister } from "../../components/Forms/PDIForms/PDIRegister";
import { PDIList } from "../../components/Tables/PDI/PDIList";
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';

function AddPDI() {
    const [isAddingPDI, setIsAddingPDI] = useState(false);

    function handleTogglePDIForm() {
        setIsAddingPDI(!isAddingPDI);
    }

    return (
        <>
            {
                !isAddingPDI
                    ? (
                        <>
                            <AdminHeader name="PDI" parentName="Desempenho" newRegistrationButtonText="Adicionar PDI" handleShowCustomerUserRegister={handleTogglePDIForm} />
                            <Container className="mt--6" fluid>
                                <PDIList handleTogglePDIForm={handleTogglePDIForm} />
                            </Container>
                        </>
                    )
                    : (
                        <>
                            <AdminHeader name="PDI" parentName="Desempenho" newRegistrationButtonText="Voltar para Lista" handleShowCustomerUserRegister={handleTogglePDIForm} />
                            <Container className="mt--6" fluid>
                                <PDIRegister handleTogglePDIForm={handleTogglePDIForm} />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
    ? AddPDI.layout = Admin
    : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
        ? AddPDI.layout = Performance
        : AddPDI.layout = Admin);

export default AddPDI;
