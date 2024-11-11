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
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';

function DashboardPDI() {

    return (
        <>
            <AdminHeader name="Dashboard" parentName="Desempenho" />
            <Container className="mt--6" fluid>
                <Card>
                    <CardHeader className="border-0">
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Plano de Desenvolvimento Pessoal</h3>
                            </div>
                        </Row>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Avaliador</th>
                                <th scope="col">Competência</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Facebook</th>
                                <td>1,480</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">60%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="60"
                                                color="gradient-danger"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Facebook</th>
                                <td>5,480</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">70%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="70"
                                                color="gradient-success"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Google</th>
                                <td>4,807</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">80%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="80"
                                                clor="gradient-primary"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Instagram</th>
                                <td>3,678</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">75%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="75"
                                                color="gradient-info"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">twitter</th>
                                <td>2,645</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">30%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="30"
                                                color="gradient-warning"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </>
    );
}

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
    ? DashboardPDI.layout = Admin
    : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
        ? DashboardPDI.layout = Performance
        : DashboardPDI.layout = Admin);

export default DashboardPDI;
