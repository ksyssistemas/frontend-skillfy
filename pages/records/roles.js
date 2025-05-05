import React, { useState } from "react";
import AdminHeader from "components/Headers/AdminHeader.js";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import { Container } from "reactstrap";
import RolesRegister from "../../components/Forms/CustomerForms/RolesRegister";
import RolesList from "../../components/Tables/Customer/RolesList";
import { useAuth } from '../../hooks/useAuth';
import DynamicLayout from "../../layouts/DynamicLayout";

function RolesRecords() {

    const { authenticationDataLoggedInUser } = useAuth();

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
                            authenticationDataLoggedInUser.role === 'administrator' ?
                            (
                                <>
                                    <AdminHeader name="Cargos e Funçôes" parentName="Registros" newRegistrationButtonText="Adicionar Cargo ou Funçâo" handleShowRolesUserRegister={handleShowRolesUserRegister} />
                                    <Container className="mt--6" fluid>
                                        <RolesList />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser.role === 'customer' ?
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
                            authenticationDataLoggedInUser.role === 'administrator' ?
                            (
                                <>
                                    <AdminHeader name="Cargos e Funçôes" parentName="Cadastros" />
                                    <Container className="mt--6" fluid>
                                        <RolesRegister handleShowRolesUserRegister={handleShowRolesUserRegister} />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser.role === 'customer' ?
                                    (
                                        <>
                                            <CustomerHeader name="Cargos e Funçôes" parentName="Cadastros" />
                                            <Container className="mt--6" fluid>
                                                <RolesRegister handleShowRolesUserRegister={handleShowRolesUserRegister} />
                                            </Container>
                                        </>

                                    ) : null
                            )
                    )
            }
        </>
    );
}

RolesRecords.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default RolesRecords;
