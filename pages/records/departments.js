import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Performance from "../../layouts/Performance";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import DepartmentsRegister from "../../components/Forms/DepartmentsRegister";
import DepartmentsList from "../../components/Tables/Customer/DepartmentsList";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import { useAuth } from '../../hooks/useAuth';

const authenticationDataLoggedInUser = 'customer';

function DepartmentsRecords() {

    const [isShouldSubmitDepartmentsRegistration, setIsShouldSubmitDepartmentsRegistration] = useState(false);

    function handleShowDepartmentsUserRegister() {
        setIsShouldSubmitDepartmentsRegistration(!isShouldSubmitDepartmentsRegistration);
    }

    // const { authenticationDataLoggedInUser } = useAuth();

    return (
        <>
            {
                !isShouldSubmitDepartmentsRegistration
                    ? (
                        authenticationDataLoggedInUser &&
                            authenticationDataLoggedInUser === 'administrator' ?
                            (
                                <>
                                    <AdminHeader name="Departamentos" parentName="Registros" newRegistrationButtonText="Adicionar Departamento" handleShowDepartmentsUserRegister={handleShowDepartmentsUserRegister} />
                                    <Container className="mt--6" fluid>
                                        <DepartmentsList />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser === 'customer' ?
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
                            authenticationDataLoggedInUser === 'administrator' ?
                            (
                                <>
                                    <AdminHeader name="Departamentos" parentName="Cadastros" />
                                    <Container className="mt--6" fluid>
                                        <DepartmentsRegister />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser === 'customer' ?
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

authenticationDataLoggedInUser === 'administrator' ? DepartmentsRecords.layout = Admin : (authenticationDataLoggedInUser === 'customer' ? DepartmentsRecords.layout = Performance : DepartmentsRecords.layout = Admin);

export default DepartmentsRecords;
