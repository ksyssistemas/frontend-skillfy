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
import { PDIListDashBoard } from "../../components/Tables/PDI/PDIListDashBoard";

function DashboardPDI() {

    return (
        <>
            <AdminHeader name="Dashboard" parentName="Desempenho" />
            <Container className="mt--6" fluid>
                {/* <Card>
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
                                <th scope="col">Sugestão</th>
                                <th scope="col">Situação</th>
                                <th scope="col">Progresso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Pedro Chefe</th>
                                <td>Melhorar a comunicação</td>
                                <td>Mais atenção</td>
                                <td>Em Progresso</td>
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
                                <th scope="row">João RH</th>
                                <td>Melhorar o desempenho</td>
                                <td>Mais atenção</td>
                                <td>Finalizado</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">100%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value="100"
                                                color="gradient-success"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card> */}
                <PDIListDashBoard />
            </Container>
        </>
    );
}

TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
    ? DashboardPDI.layout = Admin
    : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
        ? DashboardPDI.layout = Performance
        : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'employee'
            ? DashboardPDI.layout = Employee
            : DashboardPDI.layout = Admin));

export default DashboardPDI;
