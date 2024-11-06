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
import Admin from "layouts/Admin.js";
import { PDIRegister } from "../../components/Forms/PDIForms/PDIRegister";

function AddPDI() {

    return (
        <>
            <AdminHeader name="PDI" parentName="Desempenho" />

            <Container className="mt--6" fluid>
                <PDIRegister />
            </Container>
        </>
    );
}

AddPDI.layout = Admin;

export default AddPDI;
