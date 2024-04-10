/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Container,
    Row,
    Col,
} from "reactstrap";
import AddAppraisalCycleModal from "../Modals/AppraisalModal/add-appraisal-cycle";

function CustomerHeader({ name, parentName }) {

    const [modalOpen, setModalOpen] = React.useState(false);

    function handleOpenAddAppraisalCycleModal() {
        setModalOpen(!modalOpen)
    }

    return (
        <>
            <div style={{ backgroundColor: "#562f9f" }} className="header header-dark pb-6 content__title content__title--calendar">
                <Container fluid>
                    <div className="header-body">
                        <Row className="align-items-center py-4">
                            <Col lg="6" xs="7">
                                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                                    {name}
                                </h6>{" "}
                                <Breadcrumb
                                    className="d-none d-md-inline-block ml-lg-4"
                                    listClassName="breadcrumb-links breadcrumb-dark"
                                >
                                    <BreadcrumbItem>
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <i className="fas fa-home" />
                                        </a>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            {parentName}
                                        </a>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem aria-current="page" className="active">
                                        {name}
                                    </BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                            <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                                <Button
                                    className="btn-neutral"
                                    color="default"
                                    size="sm"
                                    onClick={handleOpenAddAppraisalCycleModal}
                                >
                                    <span className="btn-inner--icon">
                                        <i className="ni ni-fat-add mr-2" />
                                    </span>
                                    <span className="nav-link-inner--text">Adicionar Ciclo</span>
                                </Button>
                                <Button className="btn-neutral" color="default" size="sm">
                                    Filtros
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <AddAppraisalCycleModal
                        handleOpenAddAppraisalCycleModal={handleOpenAddAppraisalCycleModal}
                        modalOpen={modalOpen}
                    />
                </Container>
            </div>
        </>
    );
}

CustomerHeader.propTypes = {
    name: PropTypes.string,
    parentName: PropTypes.string,
};

export default CustomerHeader;
