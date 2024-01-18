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
  Badge
} from "reactstrap";
import Performance from "../../layouts/Performance";
import AddAppraisalHeader from "../../components/Headers/PerformanceHeader/AddAppraisalHeader"
import { string } from "prop-types";

function AddAppraisal() {
  const [admins, setAdmins] = useState([]);
  const [appraisalIdToBeShown, setAppraisalIdToBeShown] = useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [evaluatorsCardKey, setEvaluatorsCardKey] = useState(0);
  const [selectedSupervisorValue, setSelectedSupervisorValue] = useState([]);

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

  const handleSupervisorChange = (selectedOption) => {
    const newValue = selectedOption.target.value;
    console.error("selected option: " + newValue);
    // Adiciona o supervisor selecionado ao estado
    setSelectedSupervisorValue(prevState => [...prevState, newValue]);
    //setEvaluatorsCardKey(evaluatorsCardKey + 1);
  };

  const handleBadgeClose = (index) => {
    // Implemente a lógica para remover um supervisor do estado
    const updatedSupervisors = [...selectedSupervisorValue];
    updatedSupervisors.splice(index, 1);
    setSelectedSupervisorValue(updatedSupervisors);
  };

  // useEffect(() => {
  //   console.log('selectedSupervisors atualizado:', selectedSupervisors);
  // }, [selectedSupervisors]);

  function handleChange(e) {
    const newValue = e.target.value;
    setSelectedSupervisorValue([...selectedSupervisorValue, newValue]);
    return null;
  };

  const data = [
    { id: '1', text: 'João Paulo' },
    { id: '2', text: 'Pedro Alcantara' },
    { id: '3', text: 'Tiago Bernardes' },
    { id: '4', text: 'Felipe Santiago' },
    { id: '5', text: 'Mateus Henrique' },
    { id: '6', text: 'André Santos' },
  ];

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
                    <h3 className="mb-0 ">Criar Avaliação de Desempenho</h3>
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
                                    id="customRadio5"
                                    name="custom-radio-1"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadio5"
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
                                    id="customRadio5"
                                    name="custom-radio-1"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadio5"
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
                                    Avaliação 90°
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
                                    id="customRadio5"
                                    name="custom-radio-1"
                                    type="radio"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customRadio5"
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
                      <Col className="mb-3" md="4">
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
                      <Col className="mb-3" md="4">
                        <FormGroup
                        // className="has-success"
                        >
                          <label
                            className="form-control-label"
                            htmlFor="validationServer02"
                          >
                            Nome do Autor
                          </label>
                          <Input
                            //className="is-valid"
                            //defaultValue="Otto"
                            id="validationServer02"
                            placeholder="Seu nome"
                            required
                            type="text"
                          />
                          {/* <div className="valid-feedback">Looks good!</div> */}
                        </FormGroup>
                      </Col>
                      <Col className="mb-3" md="4">
                        <FormGroup
                        // className="has-danger"
                        >
                          <label
                            className="form-control-label"
                            htmlFor="validationServerUsername"
                          >
                            Sobrenome do Autor
                          </label>
                          <Input
                            aria-describedby="inputGroupPrepend3"
                            //className="is-invalid"
                            id="validationServerUsername"
                            placeholder="Seu sobrenome"
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </div>
                    <div className="form-row">
                      <Col className="mb-3" md="8">
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
                      <Col className="mb-3" md="4">
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
                            defaultValue="1"
                            options={{
                              placeholder: "Select",
                            }}
                            data={[
                              { id: "1", text: "Semanal" },
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

                <Card key={evaluatorsCardKey}>
                  <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                      Seleção de Avaliadores e Avaliados
                    </h6>
                    <div className="form-row">
                      <Col className="mb-3" md="4">
                        <label className=" form-control-label">
                          Supervisores
                        </label>
                        <Select2
                          className="form-control"
                          //defaultValue="0"
                          options={{
                            placeholder: "Digite para obter dicas...",
                          }}
                          data={data}
                          value={selectedSupervisorValue} onSelect={handleChange}
                        />
                      </Col>
                      <Col className="mb-3" md="2" />
                      <Col className="mb-3" md="6">
                        {selectedSupervisorValue.map((supervisor, index) => {
                          const selectedData = data.find(item => item.id === supervisor);
                          return (
                            <Badge
                              key={supervisor}
                              color="secondary"
                              className="mr-2 mb-2"
                              style={{ fontSize: '0.75rem' }}
                            >
                              {selectedData ? selectedData.text : null}
                              <span
                                className="ml-2 badge-close"
                                onClick={() => handleBadgeClose(index)}
                              >
                                &times;
                              </span>
                            </Badge>
                          );
                        })}
                      </Col>
                      <Col className="mb-3 mt-6" md="4">
                        <label className=" form-control-label">
                          Avaliador Líder
                        </label>
                        <Select2
                          className="form-control"
                          defaultValue="0"
                          options={{
                            placeholder: "Selecione os líderes",
                          }}
                          data={[
                            { id: "0", text: "Digite para obter dicas..." },
                            { id: "1", text: "João Paulo" },
                            { id: "2", text: "Pedro Alcantara" },
                            { id: "3", text: "Tiago Bernardes" },
                            { id: "4", text: "Felipe Santiago" },
                            { id: "5", text: "Mateus Henrique" },
                            { id: "6", text: "André Santos" },
                          ]}
                        />
                      </Col>
                      <Col className="mb-3" md="8" />
                      <Col className="mb-6 mt-6" md="4">
                        <label className=" form-control-label">
                          Pares
                        </label>
                        <Select2
                          className="form-control"
                          defaultValue="0"
                          options={{
                            placeholder: "Selecione os pares",
                          }}
                          data={[
                            { id: "0", text: "Digite para obter dicas..." },
                            { id: "1", text: "João Paulo" },
                            { id: "2", text: "Pedro Alcantara" },
                            { id: "3", text: "Tiago Bernardes" },
                            { id: "4", text: "Felipe Santiago" },
                            { id: "5", text: "Mateus Henrique" },
                            { id: "6", text: "André Santos" },
                          ]}
                        />
                      </Col>
                      <Col className="mb-6" md="8" />
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
