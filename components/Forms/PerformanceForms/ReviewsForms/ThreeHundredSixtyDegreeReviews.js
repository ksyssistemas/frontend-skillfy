import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Badge,
    ListGroup,
    ListGroupItem,
    Progress
} from "reactstrap";
import SimpleWizard from "../../../Wizard/SimpleWizard";

function ThreeHundredSixtyDegreeReviews() {
    const [admins, setAdmins] = useState([]);
    const [appraisalIdToBeShown, setAppraisalIdToBeShown] = useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const [selectedSupervisorValue, setSelectedSupervisorValue] = useState([]);
    const [selectedLeaderValue, setSelectedLeaderValue] = useState([]);
    const [selectedPeersValue, setSelectedPeersValue] = useState([]);
    const [selectedSubordinatesValue, setSelectedSubordinatesValue] = useState([]);

    // useEffect(() => {
    //   async function fetchAdmins() {
    //     try {
    //       const response = await fetch('http://localhost:4008/administrator/findAll');
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok.');
    //       }
    //       const data = await response.json();
    //       setAdmins(data);
    //     } catch (error) {
    //       console.error('There was a problem fetching the data:', error);
    //     }
    //   }
    //   fetchAdmins();
    // }, []);

    const deleteAdmin = async (id) => {
        try {
            const response = await fetch(`http://localhost:4008/administrator/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete admin.');
            }
            setAdmins(admins.filter(admin => admin.id !== id));
        } catch (error) {
            console.error('There was a problem deleting the admin:', error);
        }
    };

    React.useEffect(async () => {
        // we make a dynamic import for the QuillJS, as this component is not made to work on SSR
        const Quill = (await import("quill")).default;
        new Quill(document.querySelector('[data-toggle="quill"]'), {
            modules: {
                toolbar: [
                    ['bold', 'italic'],
                    ['link', 'blockquote', 'code', 'image'],
                    [{
                        'list': 'ordered'
                    }, {
                        'list': 'bullet'
                    }]
                ]
            },
            placeholder: "Lorem Ipsum is simply dummy text...",
            theme: 'snow',
            className: "is-invalid",
            id: "validationServer03"
        });
    }, []);

    const handleReactDatetimeChange = (who, date) => {
        if (
            startDate &&
            who === "endDate" &&
            new Date(startDate._d + "") > new Date(date._d + "")
        ) {
            setStartDate(date);
            setEndDate(date);
        } else if (
            endDate &&
            who === "startDate" &&
            new Date(endDate._d + "") < new Date(date._d + "")
        ) {
            setStartDate(date);
            setEndDate(date);
        } else {
            if (who === "startDate") {
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        }
    };

    const getClassNameReactDatetimeDays = (date) => {
        if (startDate && endDate) {
        }
        if (startDate && endDate && startDate._d + "" !== endDate._d + "") {
            if (
                new Date(endDate._d + "") > new Date(date._d + "") &&
                new Date(startDate._d + "") < new Date(date._d + "")
            ) {
                return " middle-date";
            }
            if (endDate._d + "" === date._d + "") {
                return " end-date";
            }
            if (startDate._d + "" === date._d + "") {
                return " start-date";
            }
        }
        return "";
    };

    const dataSupervisors = [
        { id: 'all', text: 'Selecionar Todos' },
        { id: '1', text: 'João Paulo' },
        { id: '2', text: 'Pedro Alcantara' },
        { id: '3', text: 'Tiago Bernardes' },
        { id: '4', text: 'Felipe Santiago' },
        { id: '5', text: 'Mateus Henrique' },
        { id: '6', text: 'André Santos' },
    ];

    const handleSupervisorsBadgeClose = (index) => {
        const updatedSupervisors = [...selectedSupervisorValue];
        updatedSupervisors.splice(index, 1);
        setSelectedSupervisorValue(updatedSupervisors);
    };

    function handleChangeInSelectingSupervisor(e) {
        const newValue = e.target.value;
        if (newValue === 'all') {
            const allSupervisorIds = dataSupervisors
                .filter(item => item.id !== 'all')
                .map(item => item.id);
            setSelectedSupervisorValue(allSupervisorIds);
        } else {
            setSelectedSupervisorValue([...selectedSupervisorValue, newValue]);
        }
    };

    const dataLeaders = [
        { id: 'all', text: 'Selecionar Todos' },
        { id: '1', text: 'João Paulo' },
        { id: '2', text: 'Pedro Alcantara' },
        { id: '3', text: 'Tiago Bernardes' },
        { id: '4', text: 'Felipe Santiago' },
        { id: '5', text: 'Mateus Henrique' },
        { id: '6', text: 'André Santos' },
    ];

    const handleLeadersBadgeClose = (index) => {
        const updatedLeaders = [...selectedLeaderValue];
        updatedLeaders.splice(index, 1);
        setSelectedLeaderValue(updatedLeaders);
    };

    function handleChangeInSelectingLeader(e) {
        const newValue = e.target.value;
        if (newValue === 'all') {
            const allLeaderIds = dataLeaders
                .filter(item => item.id !== 'all')
                .map(item => item.id);
            setSelectedLeaderValue(allLeaderIds);
        } else {
            setSelectedLeaderValue([...selectedLeaderValue, newValue]);
        }
    };

    const dataPeers = [
        { id: 'all', text: 'Selecionar Todos' },
        { id: '1', text: 'João Paulo' },
        { id: '2', text: 'Pedro Alcantara' },
        { id: '3', text: 'Tiago Bernardes' },
        { id: '4', text: 'Felipe Santiago' },
        { id: '5', text: 'Mateus Henrique' },
        { id: '6', text: 'André Santos' },
    ];

    const handlePeersBadgeClose = (index) => {
        const updatedPeers = [...selectedPeersValue];
        updatedPeers.splice(index, 1);
        setSelectedPeersValue(updatedPeers);
    };

    function handleChangeInSelectingPeer(e) {
        const newValue = e.target.value;
        if (newValue === 'all') {
            const allPeerIds = dataPeers
                .filter(item => item.id !== 'all')
                .map(item => item.id);
            setSelectedPeersValue(allPeerIds);
        } else {
            setSelectedPeersValue([...selectedPeersValue, newValue]);
        }
    };

    const handleDrawLotsPeer = () => {
        const peersToChooseFrom = dataPeers.filter(item => item.id !== 'all');

        const randomPeers = [];
        while (randomPeers.length < 2 && peersToChooseFrom.length > 0) {
            const randomIndex = Math.floor(Math.random() * peersToChooseFrom.length);
            const selectedPeer = peersToChooseFrom.splice(randomIndex, 1)[0];
            randomPeers.push(selectedPeer.id);
        }

        setSelectedPeersValue([...selectedPeersValue, ...randomPeers]);
    };

    const dataSubordinates = [
        { id: 'all', text: 'Selecionar Todos' },
        { id: '1', text: 'João Paulo' },
        { id: '2', text: 'Pedro Alcantara' },
        { id: '3', text: 'Tiago Bernardes' },
        { id: '4', text: 'Felipe Santiago' },
        { id: '5', text: 'Mateus Henrique' },
        { id: '6', text: 'André Santos' },
    ];

    const handleSubordinatesBadgeClose = (index) => {
        const updatedSubordinates = [...selectedSubordinatesValue];
        updatedSubordinates.splice(index, 1);
        setSelectedSubordinatesValue(updatedSubordinates);
    };

    function handleChangeInSelectingSubordinate(e) {
        const newValue = e.target.value;
        if (newValue === 'all') {
            const allSubordinateIds = dataSubordinates
                .filter(item => item.id !== 'all')
                .map(item => item.id);
            setSelectedSubordinatesValue(allSubordinateIds);
        } else {
            setSelectedSubordinatesValue([...selectedSubordinatesValue, newValue]);
        }
    };

    const handleDrawLotsSubordinate = () => {
        const subordinatesToChooseFrom = dataSubordinates.filter(item => item.id !== 'all');

        const randomSubordinates = [];
        while (randomSubordinates.length < 2 && subordinatesToChooseFrom.length > 0) {
            const randomIndex = Math.floor(Math.random() * subordinatesToChooseFrom.length);
            const selectedSubordinate = subordinatesToChooseFrom.splice(randomIndex, 1)[0];
            randomSubordinates.push(selectedSubordinate.id);
        }

        setSelectedSubordinatesValue([...selectedSubordinatesValue, ...randomSubordinates]);
    };


    return (
        <Card>
            <CardBody>
                <div className="mb-4">
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <FormGroup
                            // className="has-success"
                            >
                                <label
                                    className="form-control-label"
                                    htmlFor="validationServer01"
                                >
                                    Nome da Avaliação
                                </label>
                                <Input
                                    //className="is-valid"
                                    //defaultValue="Nome da Avaliação"
                                    id="validationServer01"
                                    placeholder="Nome da Avaliação"
                                    required
                                    type="text"
                                />
                                {/* <div className="valid-feedback">Looks good!</div> */}
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="6">
                            <FormGroup
                            // className="has-danger"
                            >
                                <label
                                    className="form-control-label"
                                    htmlFor="validationServer04"
                                >
                                    Modelo Escolhido
                                </label>
                                <Input
                                    //className="is-invalid"
                                    id="validationServer04"
                                    placeholder="Avaliação 360º"
                                    required
                                    type="text"
                                />
                                {/* <div className="invalid-feedback">
                          Please provide a valid state.
                        </div> */}
                            </FormGroup>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="12">
                            <FormGroup className="has-danger">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationServer03"
                                >
                                    Objetivo da avaliação
                                </label>
                                <div
                                    data-quill-placeholder="Lorem Ipsum is simply dummy text..."
                                    data-toggle="quill"
                                    className="is-invalid"
                                    id="validationServer03"
                                />
                                {/* <div className="invalid-feedback">
                          Please provide a valid city.
                        </div> */}
                            </FormGroup>
                        </Col>
                    </div>
                    <hr />
                    <div className="form-row mt-6 mb-6">
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="exampleDatepicker"
                                >
                                    Data de início
                                </label>
                                <ReactDatetime
                                    inputProps={{
                                        placeholder: "Date Picker Here",
                                    }}
                                    timeFormat={false}
                                />
                            </FormGroup>
                        </Col>

                        <Col className="mb-3" md="6">
                            <label className=" form-control-label">
                                Até a data
                            </label>
                            <FormGroup>
                                <ReactDatetime
                                    inputProps={{
                                        placeholder: "Date Picker Here",
                                    }}
                                    value={startDate}
                                    timeFormat={false}
                                    onChange={(e) =>
                                        handleReactDatetimeChange("startDate", e)
                                    }
                                    renderDay={(props, currentDate, selectedDate) => {
                                        let classes = props.className;
                                        classes += getClassNameReactDatetimeDays(
                                            currentDate
                                        );
                                        return (
                                            <td {...props} className={classes}>
                                                {currentDate.date()}
                                            </td>
                                        );
                                    }}
                                />
                            </FormGroup>
                        </Col>

                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className=" form-control-label">
                                    Data de vencimento
                                </label>
                                <ReactDatetime
                                    inputProps={{
                                        placeholder: "Date Picker Here",
                                    }}
                                    value={endDate}
                                    timeFormat={false}
                                    onChange={(e) =>
                                        handleReactDatetimeChange("endDate", e)
                                    }
                                    renderDay={(props, currentDate, selectedDate) => {
                                        let classes = props.className;
                                        classes += getClassNameReactDatetimeDays(
                                            currentDate
                                        );
                                        return (
                                            <td {...props} className={classes}>
                                                {currentDate.date()}
                                            </td>
                                        );
                                    }}
                                />
                            </FormGroup>
                        </Col>

                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className=" form-control-label">
                                    Período de avaliação
                                </label>
                                <Select2
                                    className="form-control"
                                    defaultValue="2"
                                    options={{
                                        placeholder: "Select",
                                    }}
                                    data={[
                                        { id: "2", text: "Quinzenal" },
                                        { id: "3", text: "Mensal" },
                                        { id: "4", text: "Trimestral" },
                                        { id: "5", text: "Semestral" },
                                        { id: "6", text: "Anual" },
                                    ]}
                                />
                            </FormGroup>
                        </Col>
                    </div>
                </div>
            </CardBody>
        </Card>

    );
}

export default ThreeHundredSixtyDegreeReviews;