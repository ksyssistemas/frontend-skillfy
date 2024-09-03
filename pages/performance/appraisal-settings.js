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
import EvidencesList from "../../components/Tables/AppraisalTables/AppraisalSettings/EvidencesList";
import AppraisalSettingsHeader from "../../components/Headers/PerformanceHeader/AppraisalSettingsHeader";
import SkillsManagement from "../../components/Tables/AppraisalTables/AppraisalSettings/AppraisalSkills/SkillsManagement";
import { AppraisalSkillsContext } from "../../contexts/PerformanceContext/AppraisalSkillsContext";
import { AppraisalCaptionsContext } from "../../contexts/PerformanceContext/AprraisalCaptionsContext";
import CaptionsManagement from "../../components/Tables/AppraisalTables/AppraisalSettings/AppraisalCaptions/CaptionsManagement";

function AppraisalSettings() {

    const { handleDropdownClickSkillsComponents } = useContext(AppraisalSkillsContext);
    const { handleResetCaptionTypeViewComponents, handleResetShowCaptionRegister } = useContext(AppraisalCaptionsContext);

    const [view, setView] = useState('default');
    // function handleSettingsViewComponents(view) {
    //     setView(view);
    // }

    const [headerProps, setHeaderProps] = useState({
        sonName: null,
        name: 'Definições de Avaliação',
        parentName: 'Desempenho',
        firstButtonText: 'Voltar',
        firstButtonIcon: 'fas fa-solid fa-arrow-left mr-2',
        onFirstButtonClick: null,
        secondButtonText: null,
        secondButtonIcon: null,
        onSecondButtonClick: null,
    });

    const handleSettingsViewComponents = (view) => {
        setView(view);
        if (view === 'default') {
            setHeaderProps({
                sonName: null,
                name: 'Definições de Avaliação',
                parentName: 'Desempenho',
                firstButtonText: 'Voltar',
                firstButtonIcon: 'fas fa-solid fa-arrow-left mr-2',
                onFirstButtonClick: null,
                secondButtonText: null,
                secondButtonIcon: null,
                onSecondButtonClick: null,
            });
        }
    };

    const handleListButtonClick = (listType) => {
        handleSettingsViewComponents(listType);

        switch (listType) {
            case 'skills':
                setHeaderProps({
                    sonName: 'Competências',
                    name: 'Definições de Avaliação',
                    parentName: 'Desempenho',
                    firstButtonText: 'Voltar',
                    firstButtonIcon: 'fas fa-solid fa-arrow-left mr-2',
                    onFirstButtonClick: () => handleSettingsViewComponents('default'),
                    secondButtonText: 'Opções de Competência',
                    secondButtonIcon: 'fas fa-solid fa-list mr-2',
                    onSecondButtonClick: null,
                });
                break;
            case 'evidences':
                setHeaderProps({
                    sonName: 'Evidências',
                    name: 'Definições de Avaliação',
                    parentName: 'Desempenho',
                    firstButtonText: 'Voltar',
                    firstButtonIcon: 'fas fa-solid fa-arrow-left mr-2',
                    onFirstButtonClick: () => handleSettingsViewComponents('default'),
                    secondButtonText: null,
                    secondButtonIcon: null,
                    onSecondButtonClick: null,
                });
                break;
            case 'captions':
                setHeaderProps({
                    sonName: 'Legendas',
                    name: 'Definições de Avaliação',
                    parentName: 'Desempenho',
                    firstButtonText: 'Voltar',
                    firstButtonIcon: 'fas fa-solid fa-arrow-left mr-2',
                    onFirstButtonClick: () => {
                        handleSettingsViewComponents('default');
                        handleResetShowCaptionRegister();
                        handleResetCaptionTypeViewComponents();
                    },
                    secondButtonText: 'Opções de Legenda',
                    secondButtonIcon: 'fas fa-solid fa-list mr-2',
                    onSecondButtonClick: null,
                });
                break;
            default:
                setHeaderProps({
                    sonName: null,
                    name: 'Definições de Avaliação',
                    parentName: 'Desempenho',
                    firstButtonText: 'Voltar',
                    firstButtonIcon: 'fas fa-solid fa-arrow-left mr-2',
                    onFirstButtonClick: null,
                    secondButtonText: null,
                    secondButtonIcon: null,
                    onSecondButtonClick: null,
                });
                break;
        }
    };


    const renderContent = () => {
        switch (view) {
            case 'skills':
                return <SkillsManagement />;
            case 'evidences':
                return <EvidencesList />;
            case 'captions':
                return <CaptionsManagement />;
            default:
                return (
                    <Card>
                        <CardHeader>
                            <h5 className="h3 mb-0">Opções de Configuração</h5>
                        </CardHeader>

                        <CardBody>
                            <ListGroup className="list my--3" flush>
                                <ListGroupItem className="px-0">
                                    <Row className="align-items-center">
                                        <div className="col ml-4">
                                            <h4 className="mb-0">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    Competências
                                                </a>
                                            </h4>
                                        </div>
                                        <Col className="col-auto mr-4">
                                            <Button className="px-4 py-2" color="primary" size="sm" type="button" onClick={() => handleListButtonClick('skills')}>
                                                Listar
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem className="px-0">
                                    <Row className="align-items-center">
                                        <div className="col ml-4">
                                            <h4 className="mb-0">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    Evidências
                                                </a>
                                            </h4>
                                        </div>
                                        <Col className="col-auto mr-4">
                                            <Button className="px-4 py-2" color="primary" size="sm" type="button" onClick={() => handleListButtonClick('evidences')}>
                                                Listar
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem className="px-0">
                                    <Row className="align-items-center">
                                        <div className="col ml-4">
                                            <h4 className="mb-0">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    Legendas de Evidência
                                                </a>
                                            </h4>
                                        </div>
                                        <Col className="col-auto mr-4 justify-content-center">
                                            <Button className="px-4 py-2" s color="primary" size="sm" type="button" onClick={() => handleListButtonClick('captions')}>
                                                Listar
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </Card>
                );
        }
    };

    return (
        <>
            <AppraisalSettingsHeader
                view={view}
                sonName={headerProps.sonName}
                name={headerProps.name}
                parentName={headerProps.parentName}
                firstButtonText={headerProps.firstButtonText}
                firstButtonIcon={headerProps.firstButtonIcon}
                onFirstButtonClick={headerProps.onFirstButtonClick}
                secondButtonText={headerProps.secondButtonText}
                secondButtonIcon={headerProps.secondButtonIcon}
                onSecondButtonClick={headerProps.onSecondButtonClick}
                onDropdownItemClick={handleDropdownClickSkillsComponents}
            />
            <Container className="mt--6" fluid>
                {renderContent()}
            </Container>
        </>
    );
}

AppraisalSettings.layout = Performance;

export default AppraisalSettings;
