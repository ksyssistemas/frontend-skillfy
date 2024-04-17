import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Performance from "../../layouts/Performance";
import AdminHeader from "components/Headers/AdminHeader.js";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import { Container } from "reactstrap";
import RolesRegister from "../../components/Forms/RolesRegister";
import RolesList from "../../components/Tables/Customer/RolesList";

const authenticationDataLoggedInUser = 'customer';

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
                        authenticationDataLoggedInUser &&
                            authenticationDataLoggedInUser === 'administrator' ?
                            (
                                <>
                                    <AdminHeader name="Cargos e Funçôes" parentName="Registros" newRegistrationButtonText="Adicionar Cargo ou Funçâo" handleShowRolesUserRegister={handleShowRolesUserRegister} />
                                    <Container className="mt--6" fluid>
                                        <RolesList />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser === 'customer' ?
                                    (
                                        <>
                                            <CustomerHeader name="Cargos e Funçôes" parentName="Registros" newRegistrationButtonText="Adicionar Cargo ou Funçâo" handleShowRolesUserRegister={handleShowRolesUserRegister} />
                                            <Container className="mt--6" fluid>
                                                <RolesList />
                                            </Container>
                                        </>
                                    ) : null

                            )
                    )
                    : (
                        authenticationDataLoggedInUser &&
                            authenticationDataLoggedInUser === 'administrator' ?
                            (
                                <>
                                    <AdminHeader name="Cargos e Funçôes" parentName="Cadastros" />
                                    <Container className="mt--6" fluid>
                                        <RolesRegister />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser === 'customer' ?
                                    (
                                        <>
                                            <CustomerHeader name="Cargos e Funçôes" parentName="Cadastros" />
                                            <Container className="mt--6" fluid>
                                                <RolesRegister />
                                            </Container>
                                        </>

                                    ) : null
                            )
                    )
            }
        </>
    );
}

authenticationDataLoggedInUser === 'administrator' ? RolesRecords.layout = Admin : (authenticationDataLoggedInUser === 'customer' ? RolesRecords.layout = Performance : RolesRecords.layout = Admin);

export default RolesRecords;
