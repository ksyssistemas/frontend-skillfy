import React from "react";
import { Container } from "reactstrap";
import { PDIListDashBoard } from "../../components/Tables/PDI/PDIListDashBoard";
import PdiHeader from "../../components/Headers/PdiHeader";
import DynamicLayout from "../../layouts/DynamicLayout";

function DashboardPDI() {
    // const { authenticationDataLoggedInUser } = useAuth();

    // if (!authenticationDataLoggedInUser) {
    //     return null;
    // }
    
    return (
        <>
            <PdiHeader name="Dashboard" parentName="Desempenho" />
            <Container className="mt--6" fluid>
                <PDIListDashBoard />
            </Container>
        </>
    );
}

DashboardPDI.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default DashboardPDI;
