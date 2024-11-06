import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import Performance from "../../layouts/Performance";
import AppraisalSettingsHeader from "../../components/Headers/PerformanceHeader/AppraisalSettingsHeader";
import AdminHeader from "components/Headers/AdminHeader.js";
import { CompetenciesRegister } from "../../components/Forms/PDIForms/CompetenciesRegister";
import Admin from "layouts/Admin.js";

function CompetenciesPDI() {

    return (
        <>
        <AdminHeader name="Administrador" parentName="Desempenho"/>
            
            <Container className="mt--6" fluid>
                <CompetenciesRegister />
            </Container>
        </>
    );
}

CompetenciesPDI.layout = Admin;

export default CompetenciesPDI;
