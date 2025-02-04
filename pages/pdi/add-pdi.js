import React, { useState } from "react";
import {
    Container
} from "reactstrap";
import AdminHeader from "components/Headers/AdminHeader.js";
import Admin from "layouts/Admin.js";
import { PDIRegister } from "../../components/Forms/PDIForms/PDIRegister";
import { PDIList } from "../../components/Tables/PDI/PDIList";
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';
import Performance from "../../layouts/Performance";
import Employee from "../../layouts/Employee";
import { useAuth } from '../../hooks/useAuth';

function AddPDI() {
    // const { authenticationDataLoggedInUser } = useAuth();

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
                            <AdminHeader name="PDI" parentName="Desempenho" newRegistrationButtonText="Adicionar PDI" handleShowCustomerUserRegister={handleTogglePDIForm} />
                            <Container className="mt--6" fluid>
                                <PDIList handleShowPDIRegister={handleTogglePDIForm} />
                            </Container>
                        </>
                    )
                    : (
                        <>
                            <AdminHeader name="PDI" parentName="Desempenho" newRegistrationButtonText="Voltar para Lista" handleShowCustomerUserRegister={handleTogglePDIForm} />
                            <Container className="mt--6" fluid>
                                <PDIRegister handleShowPDIRegister={handleTogglePDIForm} />
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
        : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'employee'
            ? AddPDI.layout = Employee
            : AddPDI.layout = Admin));

export default AddPDI;
