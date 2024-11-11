
import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip,
} from "reactstrap";
import { useFindAllPDI } from '../../../hooks/RecordsHooks/pdi/useFindAllPdi';
export function PDIList() {
    const [userPDIAccountData, setUserPDIAccountData] = useState([]);
    useEffect(() => {
        const fetchPDI = async () => {
            try {
                const foundPDIs = await useFindAllPDI();
                setUserPDIAccountData(foundPDIs);
            } catch (error) {
                console.error('Error fetching pdi:', error);
            }
        };
        fetchPDI();
    }, [
        userPDIAccountData,
    ])
    return (
        <Card>
            {/** CardHeader with Button register and export */}
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col xs="6">
                        <h3 className="mb-0">Lista de Planos de Desenvolvimento Pessoais</h3>
                    </Col>
                </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="text-left">Nome</th>
                        <th className="text-left">Descrição</th>
                        <th className="text-left">Data Início</th>
                        <th className="text-left">Data final</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {userPDIAccountData.map((pdi) => (
                        <tr>
                            <td className="text-left">
                                <b className="text-left">{pdi.name}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{pdi.description}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{pdi.startDate}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{pdi.endDate}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{pdi.status}</b>
                            </td>
                            <td className="text-left" >
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        className="btn-icon-only text-light"
                                        color=""
                                        role="button"
                                        size="sm"
                                    >
                                        <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                        <DropdownItem
                                            href="#pablo"
                                        // onClick={(e) => { e.preventDefault(); handleShowContactPersonDetailsModal(contactPerson.id, contactPerson.name, contactPerson.lastname) }}
                                        >
                                            Detalhes
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                        // onClick={(e) => { e.preventDefault(); handleContactPersonUpdate(contactPerson.id, contactPerson.name, contactPerson.lastname); }}
                                        >
                                            Editar
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                        // onClick={(e) => { e.preventDefault(); showWarningAlert(contactPerson.id, contactPerson.name, contactPerson.lastname); }}
                                        >
                                            Deletar
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    )
}