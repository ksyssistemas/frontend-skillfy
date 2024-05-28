import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Performance from "../../layouts/Performance";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import DepartmentsRegister from "../../components/Forms/DepartmentsRegister";
import DepartmentsList from "../../components/Tables/Customer/DepartmentsList";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import { useAuth } from '../../hooks/useAuth';
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';

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

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
    ? DepartmentsRecords.layout = Admin
    : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
        ? DepartmentsRecords.layout = Performance
        : DepartmentsRecords.layout = Admin);

export default DepartmentsRecords;
