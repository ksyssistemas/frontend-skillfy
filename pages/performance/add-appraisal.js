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
  ListGroupItem
} from "reactstrap";
import Performance from "../../layouts/Performance";
import AddAppraisalHeader from "../../components/Headers/PerformanceHeader/AddAppraisalHeader"
import { string } from "prop-types";

function AddAppraisal() {
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
    <>
      <AddAppraisalHeader name="Adicionar Avaliação" parentName="Desenvolvimento" />
      <Container className="mt--6" fluid>
        <Form>
          <Row>
            <div className="col">
              <div className="card-wrapper">
                <Card>

                  <CardHeader>
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0 ">Avaliação de Desempenho</h3>
                      </Col>
                      {/* <Col className="text-right" xs="4">
                        <Button
                          className="btn-outline-primary"
                          color=""
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="lg"
                        >
                          <span
                            className="btn-inner--icon"
                          >
                            <i className="ni ni-settings-gear-65 mr-2" />
                          </span>
                          <span>Definir Configurações de Avaliação</span>
                        </Button>
                      </Col> */}
                    </Row>
                  </CardHeader>

                  <CardBody>
                    <p className="mb-0">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <hr />
                    <h6 className="heading-small text-muted mb-4">
                      Selecione o Tipo de Avaliação
                    </h6>
                    <div className="form-row">
                      <Col className="mb-3" md="4">

                        <Card>
                          <CardBody>
                            <Row className="align-items-center">
                              <div className="col ml--2">
                                <h4 className="mb-0">
                                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Avaliação 360°
                                  </a>
                                </h4>
                                <p className="text-sm text-muted mb-0">
                                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                              </div>
                              <Col className="col-auto">
                                <div className="custom-control custom-radio mb-3">
                                  <input
                                    className="custom-control-input"
                                    id="customRadioAppraisal360degrees"
                                    name="custom-radio-appraisal-360degrees"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadioAppraisal360degrees"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>

                      </Col>

                      <Col className="mb-3" md="4">

                        <Card>
                          <CardBody>
                            <Row className="align-items-center">
                              <div className="col ml--2">
                                <h4 className="mb-0">
                                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Avaliação 180°
                                  </a>
                                </h4>
                                <p className="text-sm text-muted mb-0">
                                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                              </div>
                              <Col className="col-auto">
                                <div className="custom-control custom-radio mb-3">
                                  <input
                                    className="custom-control-input"
                                    id="customRadioAppraisal180degrees"
                                    name="custom-radio-appraisal-180degrees"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadioAppraisal180degrees"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>

                      </Col>

                      <Col className="mb-3" md="4">

                        <Card>
                          <CardBody>
                            <Row className="align-items-center">
                              <div className="col ml--2">
                                <h4 className="mb-0">
                                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Avaliação Líder/Liderado
                                  </a>
                                </h4>
                                <p className="text-sm text-muted mb-0">
                                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                              </div>
                              <Col className="col-auto">
                                <div className="custom-control custom-radio mb-3">
                                  <input
                                    className="custom-control-input"
                                    id="customRadioAppraisal90degrees"
                                    name="custom-radio--appraisal-90degrees"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadioAppraisal90degrees"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>

                      </Col>
                    </div>
                  </CardBody>

                </Card>

                <Card>
                  <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                      Detalhes da Avaliação
                    </h6>
                    <div className="form-row">
                      <Col className="mb-3" md="6">
                        <FormGroup
                        // className="has-success"
                        >
                          <label
                            className="form-control-label"
                            htmlFor="validationServer01"
                          >
                            Nome
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
                            Localização
                          </label>
                          <Input
                            //className="is-invalid"
                            id="validationServer04"
                            placeholder="Localização"
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
                    <div className="form-row mt-6">
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
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                      Seleção de Avaliadores
                    </h6>
                    <div className="form-row">
                      <Col className="mb-3" md="4" name="select_supervisor">
                        <label className=" form-control-label">
                          Responsável
                        </label>
                        <Select2
                          className="form-control"
                          //defaultValue="0"
                          options={{
                            placeholder: "Digite para obter dicas...",
                          }}
                          data={dataSupervisors}
                          value={selectedSupervisorValue} onSelect={handleChangeInSelectingSupervisor}
                        />
                      </Col>
                      <Col className="mb-3" md="2" />
                      <Col className="mb-3" md="6" name="show_supervisor">
                        {
                          selectedSupervisorValue.map((supervisor, index) => {
                            const selectedData = dataSupervisors.find(item => item.id === supervisor);
                            return (
                              <Badge
                                key={supervisor}
                                color="secondary"
                                className="mr-2 mb-2 bg-light"
                                style={{ fontSize: '0.75rem' }}
                              >
                                <span className="ml-2">
                                  {selectedData ? selectedData.text : null}
                                </span>
                                <span
                                  className="ml-2 mr-2 badge-close"
                                  onClick={() => handleSupervisorsBadgeClose(index)}
                                >
                                  &times;
                                </span>
                              </Badge>
                            );
                          }
                          )}
                      </Col>
                      <Col className="mb-3 mt-6" md="4" name="select_leader">
                        <label className=" form-control-label">
                          Avaliador Líder
                        </label>
                        <Select2
                          className="form-control"
                          //defaultValue="0"
                          options={{
                            placeholder: "Digite para obter dicas...",
                          }}
                          data={dataLeaders}
                          value={selectedLeaderValue} onSelect={handleChangeInSelectingLeader}
                        />
                      </Col>
                      <Col className="mb-3  mt-6" md="2" />
                      <Col className="mb-3  mt-6" md="6" name="show_leader">
                        {
                          selectedLeaderValue.map((leader, index) => {
                            const selectedData = dataLeaders.find(item => item.id === leader);
                            return (
                              <Badge
                                key={leader}
                                color="secondary"
                                className="mr-2 mb-2 bg-light"
                                style={{ fontSize: '0.75rem' }}
                              >
                                <span className="ml-2">
                                  {selectedData ? selectedData.text : null}
                                </span>
                                <span
                                  className="ml-2 mr-2 badge-close"
                                  onClick={() => handleLeadersBadgeClose(index)}
                                >
                                  &times;
                                </span>
                              </Badge>
                            );
                          }
                          )}
                      </Col>
                      <Col className="mb-6 mt-6" md="4" name="select_peer">
                        <label className=" form-control-label">
                          Pares
                        </label>
                        <Select2
                          className="form-control"
                          //defaultValue="0"
                          options={{
                            placeholder: "Digite para obter dicas...",
                          }}
                          data={dataPeers}
                          value={selectedPeersValue} onSelect={handleChangeInSelectingPeer}
                        />
                      </Col>
                      <Col className="d-flex align-items-center mb-3 mt-5" md="2" name="draw_lots_peer">
                        <Button color="default" type="button" onClick={handleDrawLotsPeer}>
                          Sorteio
                        </Button>
                      </Col>
                      <Col className="mb-3 mt-6" md="6" name="show_peer">
                        {
                          selectedPeersValue.map((peer, index) => {
                            const selectedData = dataPeers.find(item => item.id === peer);
                            return (
                              <Badge
                                key={peer}
                                color="secondary"
                                className="mr-2 mb-2 bg-light"
                                style={{ fontSize: '0.75rem' }}
                              >
                                <span className="ml-2">
                                  {selectedData ? selectedData.text : null}
                                </span>
                                <span
                                  className="ml-2 mr-2 badge-close"
                                  onClick={() => handlePeersBadgeClose(index)}
                                >
                                  &times;
                                </span>
                              </Badge>
                            );
                          }
                          )}
                      </Col>
                      <Col className="mb-6 mt-6" md="4" name="select_subordinate">
                        <label className=" form-control-label">
                          Liderados
                        </label>
                        <Select2
                          className="form-control"
                          //defaultValue="0"
                          options={{
                            placeholder: "Digite para obter dicas...",
                          }}
                          data={dataSubordinates}
                          value={selectedSubordinatesValue} onSelect={handleChangeInSelectingSubordinate}
                        />
                      </Col>
                      <Col className="d-flex align-items-center mb-3 mt-5" md="2" name="draw_lots_subordinate">
                        <Button color="default" type="button" onClick={handleDrawLotsSubordinate}>
                          Sorteio
                        </Button>
                      </Col>
                      <Col className="mb-3 mt-6" md="6" name="show_subordinate">
                        {
                          selectedSubordinatesValue.map((subordinate, index) => {
                            const selectedData = dataSubordinates.find(item => item.id === subordinate);
                            return (
                              <Badge
                                key={subordinate}
                                color="secondary"
                                className="mr-2 mb-2 bg-light"
                                style={{ fontSize: '0.75rem' }}
                              >
                                <span className="ml-2">
                                  {selectedData ? selectedData.text : null}
                                </span>
                                <span
                                  className="ml-2 mr-2 badge-close"
                                  onClick={() => handleSubordinatesBadgeClose(index)}
                                >
                                  &times;
                                </span>
                              </Badge>
                            );
                          }
                          )}
                      </Col>
                      <Col className="mb-3 mt-6" md="4">
                        <Card>
                          <CardBody>
                            <Row className="align-items-center">
                              <div className="col ml-2">
                                <h3 className="mb-0">
                                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Auto Avaliação
                                  </a>
                                </h3>
                              </div>
                              <Col className="col-auto">
                                <div className="custom-control custom-radio">
                                  <input
                                    className="custom-control-input"
                                    defaultChecked
                                    disabled
                                    id="AutoAvaliação"
                                    name="custom-radio-auto-avaliação"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="AutoAvaliação"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col className="mb-3 mt-6" md="4" />

                    </div>
                  </CardBody>
                </Card>

              </div>
            </div>
          </Row>
        </Form>
      </Container>
    </>
  );
}

AddAppraisal.layout = Performance;

export default AddAppraisal;
