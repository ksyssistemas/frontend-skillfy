
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
import { useFindAllComptencies } from '../../../hooks/RecordsHooks/pdi/competencies/useFindAllCompetencies';

export function CompetenciesList() {
    const [userCompetenciesAccountData, setUserCompetenciesAccountData] = useState([]);
    useEffect(() => {
        const fetchCompetencies = async () => {
            try {
                const foundCompetencies = await useFindAllComptencies();
                setUserCompetenciesAccountData(foundCompetencies);
            } catch (error) {
                console.error('Error fetching competencies:', error);
            }
        };
        fetchCompetencies();
    }, [
        userCompetenciesAccountData,
    ])
    return (
        <Card>
            {/** CardHeader with Button register and export */}
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col xs="6">
                        <h3 className="mb-0">Lista de Administradores</h3>
                    </Col>
                </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="text-left">Nome</th>
                        <th className="text-left">Descrição</th>
                        <th className="text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {userCompetenciesAccountData.map((competencies) => (
                        <tr>
                            <td className="text-left">
                                <b className="text-left">{competencies.name}</b>
                            </td>
                            <td className="text-left">
                                <b className="text-left">{competencies.description}</b>
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