import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import RolesRegister from "../../components/Forms/RolesRegister";
import RolesList from "../../components/Tables/Customer/RolesList";

function RolesRecords() {

    const [isShouldSubmitRolesRegistration, setIsShouldSubmitRolesRegistration] = useState(false);

    function handleShowRolesUserRegister() {
        setIsShouldSubmitRolesRegistration(!isShouldSubmitRolesRegistration);
    }

    return (
        <>
            {
                !isShouldSubmitRolesRegistration
                    ? (
                        <>
                            <AdminHeader name="Cargos e Funçôes" parentName="Registros" newRegistrationButtonText="Adicionar Cargo ou Funçâo" handleShowRolesUserRegister={handleShowRolesUserRegister} />
                            <Container className="mt--6" fluid>
                                <RolesList />
                            </Container>
                        </>
                    )
                    : (
                        <>
                            <AdminHeader name="Cargos e Funçôes" parentName="Cadastros" />
                            <Container className="mt--6" fluid>
                                <RolesRegister />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

RolesRecords.layout = Admin;

export default RolesRecords;
