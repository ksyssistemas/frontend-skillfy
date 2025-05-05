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

function SocialNetwork() {

    return (
        <>
            <EmployeeHeader name="Avaliações" parentName="Desempenho" newRegistrationButtonText="Voltar" />
            <Container className="mt--6" fluid>
                <Row className="card-wrapper">
                    <Col lg="4">
                        <Card style={{ height: "24rem" }}>
                            <CardBody>
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img
                                        alt="..."
                                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                        src={require("assets/img/theme/team-1.jpg")}
                                        style={{ width: "140px" }}
                                    />
                                </a>
                                <div className="pt-4 text-center">
                                    <h5 className="h3 title">
                                        <span className="d-block mb-1">Ryan Tompson</span>
                                        <small className="h4 font-weight-light text-muted">
                                            Web Developer
                                        </small>
                                    </h5>
                                    <div className="mt-3">
                                        <Button
                                            className="btn-icon-only rounded-circle"
                                            color="twitter"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fab fa-twitter" />
                                        </Button>
                                        <Button
                                            className="btn-icon-only rounded-circle"
                                            color="facebook"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fab fa-facebook" />
                                        </Button>
                                        <Button
                                            className="btn-icon-only rounded-circle"
                                            color="dribbble"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fab fa-dribbble" />
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card style={{ height: "24rem" }}>
                            <CardHeader>
                                <h5 className="h3 mb-0">Latest notifications</h5>
                            </CardHeader>
                            <CardBody>
                                <div
                                    className="timeline timeline-one-side"
                                    data-timeline-axis-style="dashed"
                                    data-timeline-content="axis"
                                >
                                    <div className="timeline-block">
                                        <span className="timeline-step badge-success">
                                            <i className="ni ni-bell-55" />
                                        </span>
                                        <div className="timeline-content">
                                            <div className="d-flex justify-content-between pt-1">
                                                <div>
                                                    <span className="text-muted text-sm font-weight-bold">
                                                        New message
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <small className="text-muted">
                                                        <i className="fas fa-clock mr-1" />2 hrs ago
                                                    </small>
                                                </div>
                                            </div>
                                            <h6 className="text-sm mt-1 mb-0">
                                                Let's meet at Starbucks at 11:30. Wdyt?
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="timeline-block">
                                        <span className="timeline-step badge-danger">
                                            <i className="ni ni-html5" />
                                        </span>
                                        <div className="timeline-content">
                                            <div className="d-flex justify-content-between pt-1">
                                                <div>
                                                    <span className="text-muted text-sm font-weight-bold">
                                                        Product issue
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <small className="text-muted">
                                                        <i className="fas fa-clock mr-1" />3 hrs ago
                                                    </small>
                                                </div>
                                            </div>
                                            <h6 className="text-sm mt-1 mb-0">
                                                A new issue has been reported for Argon.
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="timeline-block">
                                        <span className="timeline-step badge-info">
                                            <i className="ni ni-like-2" />
                                        </span>
                                        <div className="timeline-content">
                                            <div className="d-flex justify-content-between pt-1">
                                                <div>
                                                    <span className="text-muted text-sm font-weight-bold">
                                                        New likes
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <small className="text-muted">
                                                        <i className="fas fa-clock mr-1" />5 hrs ago
                                                    </small>
                                                </div>
                                            </div>
                                            <h6 className="text-sm mt-1 mb-0">
                                                Your posts have been liked a lot.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card style={{ height: "24rem" }}>
                            <CardHeader>
                                <h5 className="h3 mb-0">Latest messages</h5>
                            </CardHeader>
                            <CardBody className="p-0">
                                <ListGroup flush>
                                    <ListGroupItem
                                        className="list-group-item-action flex-column align-items-start py-4 px-4"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        tag="a"
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <div>
                                                <div className="d-flex w-100 align-items-center">
                                                    <img
                                                        alt="..."
                                                        className="avatar avatar-xs mr-2"
                                                        src={require("assets/img/theme/team-1.jpg")}
                                                    />
                                                    <h5 className="mb-1">Tim</h5>
                                                </div>
                                            </div>
                                            <small>2 hrs ago</small>
                                        </div>
                                        <h4 className="mt-3 mb-1">New order for Argon Dashboard</h4>
                                        <p className="text-sm mb-0">
                                            Doasdnec id elit non mi porta gravida at eget metus.
                                            Maecenas sed diam eget risus varius blandit.
                                        </p>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        className="list-group-item-action flex-column align-items-start py-4 px-4"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        tag="a"
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <div>
                                                <div className="d-flex w-100 align-items-center">
                                                    <img
                                                        alt="..."
                                                        className="avatar avatar-xs mr-2"
                                                        src={require("assets/img/theme/team-2.jpg")}
                                                    />
                                                    <h5 className="mb-1">Mike</h5>
                                                </div>
                                            </div>
                                            <small>1 day ago</small>
                                        </div>
                                        <h4 className="mt-3 mb-1">
                                            <span className="text-info mr-1">●</span>
                                            Your theme has been updated
                                        </h4>
                                        <p className="text-sm mb-0">
                                            Doasdnec id elit non mi porta gravida at eget metus.
                                            Maecenas sed diam eget risus varius blandit.
                                        </p>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Card>
                        <CardHeader className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img
                                        alt="..."
                                        className="avatar"
                                        src={require("assets/img/theme/team-1.jpg")}
                                    />
                                </a>
                                <div className="mx-3">
                                    <a
                                        className="text-dark font-weight-600 text-sm"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        John Snow
                                    </a>
                                    <small className="d-block text-muted">3 days ago</small>
                                </div>
                            </div>
                            <div className="text-right ml-auto">
                                <Button
                                    className="btn-icon"
                                    color="primary"
                                    size="sm"
                                    type="button"
                                >
                                    <span className="btn-inner--icon mr-1">
                                        <i className="ni ni-fat-add" />
                                    </span>
                                    <span className="btn-inner--text">Follow</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <p className="mb-4">
                                Personal profiles are the perfect way for you to grab their
                                attention and persuade recruiters to continue reading your CV
                                because you’re telling them from the off exactly why they
                                should hire you.
                            </p>
                            <img
                                alt="..."
                                className="img-fluid rounded"
                                src={require("assets/img/theme/img-1-1000x600.jpg")}
                            />
                            <Row className="align-items-center my-3 pb-3 border-bottom">
                                <Col sm="6">
                                    <div className="icon-actions">
                                        <a
                                            className="like active"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="ni ni-like-2" />
                                            <span className="text-muted">150</span>
                                        </a>
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <i className="ni ni-chat-round" />
                                            <span className="text-muted">36</span>
                                        </a>
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <i className="ni ni-curved-next" />
                                            <span className="text-muted">12</span>
                                        </a>
                                    </div>
                                </Col>
                                <Col className="d-none d-sm-block" sm="6">
                                    <div className="d-flex align-items-center justify-content-sm-end">
                                        <div className="avatar-group">
                                            <a
                                                className="avatar avatar-xs rounded-circle"
                                                href="#pablo"
                                                id="tooltip36177092"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/theme/team-1.jpg")}
                                                />
                                            </a>
                                            <UncontrolledTooltip delay={0} target="tooltip36177092">
                                                Jessica Rowland
                                            </UncontrolledTooltip>
                                            <a
                                                className="avatar avatar-xs rounded-circle"
                                                href="#pablo"
                                                id="tooltip857639221"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={require("assets/img/theme/team-2.jpg")}
                                                />
                                            </a>
                                            <UncontrolledTooltip
                                                delay={0}
                                                target="tooltip857639221"
                                            >
                                                Audrey Love
                                            </UncontrolledTooltip>
                                            <a
                                                className="avatar avatar-xs rounded-circle"
                                                href="#pablo"
                                                id="tooltip260223080"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={require("assets/img/theme/team-3.jpg")}
                                                />
                                            </a>
                                            <UncontrolledTooltip
                                                delay={0}
                                                target="tooltip260223080"
                                            >
                                                Michael Lewis
                                            </UncontrolledTooltip>
                                        </div>
                                        <small className="pl-2 font-weight-bold">
                                            and 30+ more
                                        </small>
                                    </div>
                                </Col>
                            </Row>

                            <div className="mb-1">
                                <Media className="media-comment">
                                    <img
                                        alt="..."
                                        className="avatar avatar-lg media-comment-avatar rounded-circle"
                                        src={require("assets/img/theme/team-1.jpg")}
                                    />
                                    <Media>
                                        <div className="media-comment-text">
                                            <h6 className="h5 mt-0">Michael Lewis</h6>
                                            <p className="text-sm lh-160">
                                                Cras sit amet nibh libero nulla vel metus scelerisque
                                                ante sollicitudin. Cras purus odio vestibulum in
                                                vulputate viverra turpis.
                                            </p>
                                            <div className="icon-actions">
                                                <a
                                                    className="like active"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className="ni ni-like-2" />
                                                    <span className="text-muted">3 likes</span>
                                                </a>
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <i className="ni ni-curved-next" />
                                                    <span className="text-muted">2 shares</span>
                                                </a>
                                            </div>
                                        </div>
                                    </Media>
                                </Media>
                                <Media className="media-comment">
                                    <img
                                        alt="..."
                                        className="avatar avatar-lg media-comment-avatar rounded-circle"
                                        src={require("assets/img/theme/team-2.jpg")}
                                    />
                                    <Media>
                                        <div className="media-comment-text">
                                            <h6 className="h5 mt-0">Jessica Stones</h6>
                                            <p className="text-sm lh-160">
                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                metus scelerisque ante sollicitudin. Cras purus odio,
                                                vestibulum in vulputate at, tempus viverra turpis.
                                            </p>
                                            <div className="icon-actions">
                                                <a
                                                    className="like active"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className="ni ni-like-2" />
                                                    <span className="text-muted">10 likes</span>
                                                </a>
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <i className="ni ni-curved-next" />
                                                    <span className="text-muted">1 share</span>
                                                </a>
                                            </div>
                                        </div>
                                    </Media>
                                </Media>
                                <hr />
                                <Media className="align-items-center">
                                    <img
                                        alt="..."
                                        className="avatar avatar-lg rounded-circle mr-4"
                                        src={require("assets/img/theme/team-3.jpg")}
                                    />
                                    <Media body>
                                        <Form>
                                            <Input
                                                placeholder="Write your comment"
                                                rows="1"
                                                type="textarea"
                                            />
                                        </Form>
                                    </Media>
                                </Media>
                            </div>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </>
    );
}

SocialNetwork.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default SocialNetwork;