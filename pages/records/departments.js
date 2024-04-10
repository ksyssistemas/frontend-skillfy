import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import DepartmentsRegister from "../../components/Forms/DepartmentsRegister";
import DepartmentsList from "../../components/Tables/Customer/DepartmentsList";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import { useAuth } from '../../hooks/useAuth';

function DepartmentsRecords() {

    const [isShouldSubmitDepartmentsRegistration, setIsShouldSubmitDepartmentsRegistration] = useState(false);

    function handleShowDepartmentsUserRegister() {
        setIsShouldSubmitDepartmentsRegistration(!isShouldSubmitDepartmentsRegistration);
    }

    const { authenticationDataLoggedInUser } = useAuth();

    return (
        <>
            {
                !isShouldSubmitDepartmentsRegistration
                    ? (
                        authenticationDataLoggedInUser &&
                            authenticationDataLoggedInUser.role === 'administrator' ?
                            (
                                <>
                                    <AdminHeader name="Departamentos" parentName="Registros" newRegistrationButtonText="Adicionar Departamento" handleShowDepartmentsUserRegister={handleShowDepartmentsUserRegister} />
                                    <Container className="mt--6" fluid>
                                        <DepartmentsList />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser.role === 'customer' ?
                                    (
                                        <>
                                            <CustomerHeader name="Departamentos" parentName="Registros" newRegistrationButtonText="Adicionar Departamento" handleShowDepartmentsUserRegister={handleShowDepartmentsUserRegister} />
                                            <Container className="mt--6" fluid>
                                                <DepartmentsList />
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
                                    <AdminHeader name="Departamentos" parentName="Cadastros" />
                                    <Container className="mt--6" fluid>
                                        <DepartmentsRegister />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser.role === 'customer' ?
                                    (
                                        <>
                                            <CustomerHeader name="Departamentos" parentName="Cadastros" />
                                            <Container className="mt--6" fluid>
                                                <DepartmentsRegister />
                                            </Container>
                                        </>

                                    ) : null
                            )
                    )
            }
        </>
    );
}

DepartmentsRecords.layout = Admin;

export default DepartmentsRecords;
