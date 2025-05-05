import React from "react";
// we'll use this to import an use the vector map plugin
import dynamic from "next/dynamic";
// nodejs library that concatenates classes
import classnames from "classnames";
// used to get the current date
import moment from "moment";
// JavaScript library that creates a callendar with events
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { widgetEvents } from "variables/general.js";

import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardImg,
    CardImgOverlay,
    CardTitle,
    CardText,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    ListGroupItem,
    ListGroup,
    Progress,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    Media,
} from "reactstrap";
import EmployeeHeader from "../../components/Headers/EmployeeHeader";
import DynamicLayout from "../../layouts/DynamicLayout";

function Tasks() {
    const [nameOnCard, setnameOnCard] = React.useState(false);
    const [cardNumber, setcardNumber] = React.useState(false);
    const [date, setdate] = React.useState(false);
    const [ccv, setccv] = React.useState(false);
    const widgetCalendarRef = React.useRef(null);
    React.useEffect(() => {
        let calendar = new Calendar(widgetCalendarRef.current, {
            plugins: [dayGridPlugin],
            initialView: "dayGridMonth",
            selectable: true,
            editable: true,
            events: widgetEvents,
            headerToolbar: "",
        });
        calendar.render();
    }, []);


    return (
        <>
            <EmployeeHeader name="Avaliações" parentName="Desempenho" newRegistrationButtonText="Voltar" />
            <Container className="mt--6" fluid>
                <Row>
                    <Col lg="4">
                        <Card>
                            <CardHeader>
                                <h5 className="h3 mb-0">To do list</h5>
                            </CardHeader>
                            <CardBody className="p-0">
                                <ListGroup data-toggle="checklist" flush>
                                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                        <div className="checklist-item checklist-item-success checklist-item-checked">
                                            <div className="checklist-info">
                                                <h5 className="checklist-title mb-0">Call with Dave</h5>
                                                <small>10:30 AM</small>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox custom-checkbox-success">
                                                    <input
                                                        className="custom-control-input"
                                                        defaultChecked
                                                        id="chk-todo-task-1"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="chk-todo-task-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                        <div className="checklist-item checklist-item-warning">
                                            <div className="checklist-info">
                                                <h5 className="checklist-title mb-0">Lunch meeting</h5>
                                                <small>10:30 AM</small>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox custom-checkbox-warning">
                                                    <input
                                                        className="custom-control-input"
                                                        id="chk-todo-task-2"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="chk-todo-task-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                        <div className="checklist-item checklist-item-info">
                                            <div className="checklist-info">
                                                <h5 className="checklist-title mb-0">
                                                    Argon Dashboard Launch
                                                </h5>
                                                <small>10:30 AM</small>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox custom-checkbox-info">
                                                    <input
                                                        className="custom-control-input"
                                                        id="chk-todo-task-3"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="chk-todo-task-3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                        <div className="checklist-item checklist-item-danger">
                                            <div className="checklist-info">
                                                <h5 className="checklist-title mb-0">
                                                    Winter Hackaton
                                                </h5>
                                                <small>10:30 AM</small>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox custom-checkbox-danger">
                                                    <input
                                                        className="custom-control-input"
                                                        defaultChecked
                                                        id="chk-todo-task-4"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="chk-todo-task-4"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                        <div className="checklist-item checklist-item-success checklist-item-checked">
                                            <div className="checklist-info">
                                                <h5 className="checklist-title mb-0">
                                                    Dinner with Family
                                                </h5>
                                                <small>10:30 AM</small>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox custom-checkbox-success">
                                                    <input
                                                        className="custom-control-input"
                                                        defaultChecked
                                                        id="chk-todo-task-5"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="chk-todo-task-5"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card>
                            <CardHeader>
                                <h5 className="h3 mb-0">Progress track</h5>
                            </CardHeader>
                            <CardBody>
                                <ListGroup className="list my--3" flush>
                                    <ListGroupItem className="px-0">
                                        <Row className="align-items-center">
                                            <Col className="col-auto">
                                                <a
                                                    className="avatar rounded-circle"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/theme/bootstrap.jpg")}
                                                    />
                                                </a>
                                            </Col>
                                            <div className="col">
                                                <h5>Argon Design System</h5>
                                                <Progress
                                                    color="warning"
                                                    className="progress-xs mb-0"
                                                    max="100"
                                                    value="60"
                                                />
                                            </div>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <Row className="align-items-center">
                                            <Col className="col-auto">
                                                <a
                                                    className="avatar rounded-circle"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/theme/angular.jpg")}
                                                    />
                                                </a>
                                            </Col>
                                            <div className="col">
                                                <h5>Angular Now UI Kit PRO</h5>
                                                <Progress
                                                    color="success"
                                                    className="progress-xs mb-0"
                                                    max="100"
                                                    value="100"
                                                />
                                            </div>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <Row className="align-items-center">
                                            <Col className="col-auto">
                                                <a
                                                    className="avatar rounded-circle"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/theme/sketch.jpg")}
                                                    />
                                                </a>
                                            </Col>
                                            <div className="col">
                                                <h5>Black Dashboard</h5>
                                                <Progress
                                                    color="danger"
                                                    className="progress-xs mb-0"
                                                    max="100"
                                                    value="72"
                                                />
                                            </div>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <Row className="align-items-center">
                                            <Col className="col-auto">
                                                <a
                                                    className="avatar rounded-circle"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/theme/react.jpg")}
                                                    />
                                                </a>
                                            </Col>
                                            <div className="col">
                                                <h5>React Material Dashboard</h5>
                                                <Progress
                                                    color="info"
                                                    className="progress-xs mb-0"
                                                    max="100"
                                                    value="90"
                                                />
                                            </div>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <Row className="align-items-center">
                                            <Col className="col-auto">
                                                <a
                                                    className="avatar rounded-circle"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/theme/vue.jpg")}
                                                    />
                                                </a>
                                            </Col>
                                            <div className="col">
                                                <h5>Vue Paper UI Kit PRO</h5>
                                                <Progress
                                                    color="success"
                                                    className="progress-xs mb-0"
                                                    max="100"
                                                    value="100"
                                                />
                                            </div>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card className="widget-calendar">
                            <CardHeader>
                                <div className="h5 text-muted mb-1 widget-calendar-year">
                                    {moment().format("YYYY")}
                                </div>
                                <div className="h3 mb-0 widget-calendar-day">
                                    {moment().format("dddd, MMM D")}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div ref={widgetCalendarRef} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

Tasks.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default Tasks;