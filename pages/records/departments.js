import React, { useState } from "react";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import DepartmentsRegister from "../../components/Forms/CustomerForms/DepartmentsRegister";
import DepartmentsList from "../../components/Tables/Customer/DepartmentsList";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import { useAuth } from '../../hooks/useAuth';
import DynamicLayout from "../../layouts/DynamicLayout";

function DepartmentsRecords() {
    const { authenticationDataLoggedInUser } = useAuth();

    const [isShouldSubmitDepartmentsRegistration, setIsShouldSubmitDepartmentsRegistration] = useState(false);

    function handleShowDepartmentsUserRegister() {
        setIsShouldSubmitDepartmentsRegistration(!isShouldSubmitDepartmentsRegistration);
    }

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
                                        <DepartmentsRegister handleShowDepartmentsUserRegister={handleShowDepartmentsUserRegister} />
                                    </Container>
                                </>
                            ) : (
                                authenticationDataLoggedInUser &&
                                    authenticationDataLoggedInUser.role === 'customer' ?
                                    (
                                        <>
                                            <CustomerHeader name="Departamentos" parentName="Cadastros" />
                                            <Container className="mt--6" fluid>
                                                <DepartmentsRegister handleShowDepartmentsUserRegister={handleShowDepartmentsUserRegister} />
                                            </Container>
                                        </>

                                    ) : null
                            )
                    )
            }
        </>
    );
}

DepartmentsRecords.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default DepartmentsRecords;
