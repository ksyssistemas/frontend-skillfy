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

function DashboardPDI() {

    const [headerProps, setHeaderProps] = useState({
        sonName: null,
        name: 'PDI',
        parentName: 'Desempenho',
        firstButtonText: 'Voltar',
        firstButtonIcon: 'fas fa-solid fa-arrow-left mr-2',
        onFirstButtonClick: null,
        secondButtonText: null,
        secondButtonIcon: null,
        onSecondButtonClick: null,
    });

    return (
        <>
            <AppraisalSettingsHeader
                sonName={headerProps.sonName}
                name={headerProps.name}
                parentName={headerProps.parentName}
                firstButtonText={headerProps.firstButtonText}
                firstButtonIcon={headerProps.firstButtonIcon}
                onFirstButtonClick={headerProps.onFirstButtonClick}
                secondButtonText={headerProps.secondButtonText}
                secondButtonIcon={headerProps.secondButtonIcon}
                onSecondButtonClick={headerProps.onSecondButtonClick}
            />
        </>
    );
}

DashboardPDI.layout = Performance;

export default DashboardPDI;
