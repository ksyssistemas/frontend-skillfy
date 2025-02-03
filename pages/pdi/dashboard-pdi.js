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
    ListGroupItem,
    Table,
    Progress
} from "reactstrap";
import Performance from "../../layouts/Performance";
import AppraisalSettingsHeader from "../../components/Headers/PerformanceHeader/AppraisalSettingsHeader";
import AdminHeader from "components/Headers/AdminHeader.js";
import Admin from "layouts/Admin.js";
import Employee from "../../layouts/Employee";
import { useAuth } from '../../hooks/useAuth';
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';
import { PDIListDashBoard } from "../../components/Tables/PDI/PDIListDashBoard";

function DashboardPDI() {
    // const { authenticationDataLoggedInUser } = useAuth();

    // if (!authenticationDataLoggedInUser) {
    //     return null;
    // }
    
    return (
        <>
            <AdminHeader name="Dashboard" parentName="Desempenho" />
            <Container className="mt--6" fluid>
                <PDIListDashBoard />
            </Container>
        </>
    );
}

console.log("typeUser :", TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT);

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
    ? DashboardPDI.layout = Admin
    : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
        ? DashboardPDI.layout = Performance
        : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'employee'
            ? DashboardPDI.layout = Employee
            : DashboardPDI.layout = Admin));
// DashboardPDI.layout = Performance;

export default DashboardPDI;
