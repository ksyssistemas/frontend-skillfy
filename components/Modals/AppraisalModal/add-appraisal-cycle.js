import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const Select2 = dynamic(() => import("react-select2-wrapper"));
// reactstrap components
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
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
} from "reactstrap";

import ReactDatetime from "react-datetime";
import useCreateCycle from "../../../hooks/PerformanceAppraisalRecordsHooks/Cycles/useCreateCycle";
import { employmentContractDataSearchAndProcess } from "../../../util/employmentContractDataSearchAndProcess";
import { handleDateFormatting } from "../../../util/handleDateFormatting";
import { handleSelectionEmploymentContractData } from "../../../util/handleSelectionEmploymentContractData";
import { useFindAppraisalCycle } from "../../../hooks/PerformanceAppraisalRecordsHooks/Cycles/useFindAppraisalCycle";
import useUpdateCycle from "../../../hooks/PerformanceAppraisalRecordsHooks/Cycles/useUpdateCycle";

function AddAppraisalCycleModal(
  {
    handleOpenAddAppraisalCycleModal,
    modalOpen,
    handleShowAppraisalList,
    cycleIdToUpdate,
    handleCycleIdToUpdate
  }) {

  const {
    cycleTitle,
    setCycleTitle,
    cycleTitleState,
    setCycleTitleState,
    cyclePeriod,
    setCyclePeriod,
    cyclePeriodState,
    setCyclePeriodState,
    startDate,
    setStartDate,
    startDateState,
    setStartDateState,
    finishDate,
    setFinishDate,
    finishDateState,
    setFinishDateState,
    cycleObjective,
    setCycleObjective,
    cycleObjectiveState,
    setCycleObjectiveState,
    cycleManager,
    setCycleManager,
    cycleManagerState,
    setCycleManagerState,
    cyclePeriodDataList,
    setCyclePeriodDataList,
    handleCyclePeriodDataList,
    handleValidateAddAppraisalCycleForm,
    reset
  } = useCreateCycle(handleShowAppraisalList);

  const {
    handleValidateUpdateAppraisalCycleForm
  } = useUpdateCycle();

  const [hasCreatedCycle, setHasCreatedCycle] = useState(false);

  const [selectePeriod, setSelectePeriod] = useState('');

  // useEffect(() => {
  //   if (cyclePeriodDataList.length === 0) {
  //     employmentContractDataSearchAndProcess(useFindAllDepartments, handleDepartmentDataList, 'department', 'EmployeeUserRegister');
  //   }
  // }, []);

  const [cyclePeriodDataListMook, setCyclePeriodDataListMook] = useState([
    { id: "1", text: "Mensal" },
    { id: "2", text: "Trimestral" },
    { id: "3", text: "Semestral" },
    { id: "4", text: "Anual" },
  ]);

  const handleCloseAddAppraisalCycleModal = () => {
    handleOpenAddAppraisalCycleModal();
    reset();
    setSelectePeriod('');
  };

  const [detailedAppraisalCycleData, setDetailedAppraisalCycleData] = useState([]);
  function handleCleanDetailedAppraisalCycleData() {
    setDetailedAppraisalCycleData([]);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const updateSelectedPeriod = (periodText) => {
    const period = cyclePeriodDataListMook.find(p => p.text === periodText);
    if (period) {
      setSelectePeriod(period.id);
      handleSelectionEmploymentContractData(period.id, cyclePeriodDataListMook, setSelectePeriod, setCyclePeriod, setCyclePeriodState);
    }
  };

  function handleUpdateAppraisalCycle() {
    handleValidateUpdateAppraisalCycleForm(
      handleCloseAddAppraisalCycleModal,
      cycleIdToUpdate,
      cycleTitle,
      cyclePeriod,
      formattedStartDate,
      formattedFinishDate,
      cycleObjective,
      handleCycleIdToUpdate,
      handleCleanDetailedAppraisalCycleData
    )
  }

  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedFinishDate, setFormattedFinishDate] = useState('');

  useEffect(() => {
    const fetchAppraisalCycleById = async (cycleIdToUpdate) => {
      if (!detailedAppraisalCycleData.length) {
        const foundAppraisalCycle = await useFindAppraisalCycle(cycleIdToUpdate);
        setDetailedAppraisalCycleData(foundAppraisalCycle);
        setCycleTitle(foundAppraisalCycle.appraisalNameCycle);
        updateSelectedPeriod(foundAppraisalCycle.cyclePeriod);
        setStartDate(new Date(foundAppraisalCycle.appraisalCycleFromDate));
        setFinishDate(new Date(foundAppraisalCycle.appraisalCycleDueDate));
        setFormattedStartDate(foundAppraisalCycle.appraisalCycleFromDate);
        setFormattedFinishDate(foundAppraisalCycle.appraisalCycleDueDate);
        setCycleObjective(foundAppraisalCycle.cycleAim);
      }
    };

    if (cycleIdToUpdate) {
      fetchAppraisalCycleById(cycleIdToUpdate);
    }
  }, [cycleIdToUpdate]);

  return (
    <Modal
      toggle={handleOpenAddAppraisalCycleModal}
      isOpen={modalOpen}
      size="xl"
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          {cycleIdToUpdate ? 'Editar Ciclo de Avaliação' : 'Adicionar Ciclo de Avaliação'}
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleCloseAddAppraisalCycleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Card>
          <CardBody>
            <div className="form-row">
              <Col className="mb-3" md="6">
                <label
                  className="form-control-label"
                  htmlFor="validationCycleTitle"
                >
                  Título do Ciclo
                </label>
                <Input
                  id="validationCycleTitle"
                  placeholder="Título Exemplo do Ciclo"
                  type="text"
                  value={cycleTitle}
                  // valid={firstNameState === "valid"}
                  // invalid={firstNameState === "invalid"}
                  onChange={(e) => {
                    setCycleTitle(e.target.value);
                    // if (e.target.value === "") {
                    //   setfirstNameState("invalid");
                    // } else {
                    //   setfirstNameState("valid");
                    // }
                  }}
                />
                {/* <div className="valid-feedback">Looks good!</div> */}
              </Col>
              <Col md="6">
                <label
                  className="form-control-label"
                  htmlFor="validationCyclePeriod"
                >
                  Período do Ciclo
                </label>
                <Select2
                  id="validationCyclePeriod"
                  className="form-control"
                  data-minimum-results-for-search="Infinity"
                  options={{ placeholder: "Selecione um período" }}
                  value={selectePeriod}
                  onChange={(e) => setSelectePeriod(e.target.value)}
                  data={cyclePeriodDataListMook}
                  onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, cyclePeriodDataListMook, setSelectePeriod, setCyclePeriod, setCyclePeriodState)}
                />
              </Col>
            </div>
            <div className="form-row">
              <Col className="mb-3" md="6">
                <label
                  className="form-control-label"
                  htmlFor="validationStartDate"
                >
                  Data de Início
                </label>
                <ReactDatetime
                  inputProps={{
                    placeholder: "__/__/__",
                  }}
                  timeFormat={false}
                  value={cycleIdToUpdate ? startDate : null}
                  onChange={(e) => cycleIdToUpdate ? handleDateFormatting(e, setStartDate, setStartDateState, setFormattedStartDate) : handleDateFormatting(e, setStartDate, setStartDateState)}
                />
              </Col>
              <Col className="mb-3" md="6">
                <label
                  className="form-control-label"
                  htmlFor="validationFinishDate"
                >
                  Data de Encerramento
                </label>
                <ReactDatetime
                  inputProps={{
                    placeholder: "__/__/__",
                  }}
                  timeFormat={false}
                  value={cycleIdToUpdate ? finishDate : null}
                  onChange={(e) => cycleIdToUpdate ? handleDateFormatting(e, setFinishDate, setFinishDateState, setFormattedFinishDate) : handleDateFormatting(e, setFinishDate, setFinishDateState)}
                />
              </Col>
            </div>
            <div className="form-row">
              <Col className="mb-3" md="12">
                <label
                  className="form-control-label"
                  htmlFor="validationCycleObjective"
                >
                  Objetivo
                </label>
                <Input
                  id="validationCycleObjective"
                  rows="3"
                  type="textarea"
                  // valid={departmentDescriptionState === "valid"}
                  // invalid={departmentDescriptionState === "invalid"}
                  value={cycleObjective}
                  onChange={(e) => {
                    setCycleObjective(e.target.value);
                    //   if (e.target.value === "") {
                    //     setDepartmentDescriptionState("");
                    //   } else {
                    //     setDepartmentDescriptionState("valid");
                    // }
                  }}
                />
              </Col>
            </div>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={handleOpenAddAppraisalCycleModal}
        >
          Fechar
        </Button>
        <Button
          color={cycleIdToUpdate ? 'warning' : 'primary'}
          type="button"
          onClick={
            cycleIdToUpdate
              ? () => handleUpdateAppraisalCycle()
              : () => handleValidateAddAppraisalCycleForm(handleCloseAddAppraisalCycleModal)
          }
        >
          {cycleIdToUpdate ? 'Editar Ciclo' : 'Adicionar Ciclo'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

AddAppraisalCycleModal.defaultProps = {
  handleOpenAddAppraisalCycleModal: () => { },
  modalOpen: false,
  handleShowAppraisalList: () => { },
  handleCycleIdToUpdate: () => { }
};

AddAppraisalCycleModal.propTypes = {
  handleOpenAddAppraisalCycleModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  handleShowAppraisalList: PropTypes.func,
  cycleIdToUpdate: PropTypes.string,
  handleCycleIdToUpdate: PropTypes.func,
};

export default AddAppraisalCycleModal;