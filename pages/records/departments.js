import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import AdminHeader from "components/Headers/AdminHeader.js";
import { Container } from "reactstrap";
import DepartmentsRegister from "../../components/Forms/DepartmentsRegister";
import DepartmentsList from "../../components/Tables/Customer/DepartmentsList";

function DepartmentsRecords() {

    const [isShouldSubmitDepartmentsRegistration, setIsShouldSubmitDepartmentsRegistration] = useState(false);

    function handleShowDepartmentsUserRegister() {
        setIsShouldSubmitDepartmentsRegistration(!isShouldSubmitDepartmentsRegistration);
    }

    return (
        <>
            {
                !isShouldSubmitDepartmentsRegistration
                    ? (
                        <>
                            <AdminHeader name="Departamentos" parentName="Registros" newRegistrationButtonText="Adicionar Departamento" handleShowDepartmentsUserRegister={handleShowDepartmentsUserRegister} />
                            <Container className="mt--6" fluid>
                                <DepartmentsList />
                            </Container>
                        </>
                    )
                    : (
                        <>
                            <AdminHeader name="Departamentos" parentName="Cadastros" />
                            <Container className="mt--6" fluid>
                                <DepartmentsRegister />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

DepartmentsRecords.layout = Admin;

export default DepartmentsRecords;
