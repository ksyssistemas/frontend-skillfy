// ModalComponent.js
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import { EmployeeFunctionContext } from "../../../contexts/RecordsContext/EmployeeFunctionContext";
import useCreateEmployeeFunction from "../../../hooks/RecordsHooks/employeeFunction/useCreateEmployeeFunction";
import { useFindEmployeeFunction } from "../../../hooks/RecordsHooks/employeeFunction/useFindEmployeeFunction";
import { useFindAllFunctions } from "../../../hooks/RecordsHooks/employeeFunction/useFindAllFunctions";
import useUpdateEmployeeFunction from "../../../hooks/RecordsHooks/employeeFunction/useUpdateEmployeeFunction";

function ModalEmployeeFunction({ handleOpenEmployeeFunctionUpdateModal, modalOpen }) {

  const {
    employeeFunctionIdToUpdate,
    handleEmployeeFunctionIdStatusCleanupToUpdate,
    handleEmployeeFunctionIdToUpdate,
    hasNewEmployeeFunctionRecordCreated,
    handleCreatedEmployeeFunctionRecordStatusChange,
    hasUpdatedEmployeeFunctionRecord,
    handleUpdatedEmployeeFunctionRecordStatusChange,
    hasDeletedEmployeeFunctionRecord,
    handleDeletedEmployeeFunctionRecordStatusChange,
  } = useContext(EmployeeFunctionContext);

  const {
    employeeFunctionName,
    setEmployeeFunctionName,
    employeeFunctionNameState,
    setEmployeeFunctionNameState,
    employeeFunctionDataList,
    setEmployeeFunctionDataList,
    funtionReportsToFuntion,
    setFuntionReportsToFuntion,
    funtionReportsToFuntionState,
    setFuntionReportsToFuntionState,
    employeeFunctiontDescription,
    setEmployeeFunctiontDescription,
    employeeFunctiontDescriptionState,
    setEmployeeFunctiontDescriptionState,
    employeeFunctiontStatus,
    setEmployeeFunctiontStatus,
    employeeFunctiontStatusState,
    setEmployeeFunctiontStatusState,
    handleValidateAddEmployeeFunctionForm,
    handleEmployeeFunctionDataList,
    reset
  } = useCreateEmployeeFunction();

  const { handleValidateUpdateEmployeeFunctionForm } = useUpdateEmployeeFunction();

  const [selectedEmployeeFunction, setSelectedEmployeeFunction] = useState('');

  useEffect(() => {
    if (employeeFunctionDataList.length === 0) {
      employmentContractDataSearchAndProcess(useFindAllFunctions, handleEmployeeFunctionDataList, 'function', 'EmployeeUserRegister');
    }
  }, []);

  const handleCloseEmployeeFunctionUpdateModal = () => {
    handleOpenEmployeeFunctionUpdateModal();
    reset();
    setSelectedEmployeeFunction('');
  };

  const [detailedEmployeeFunctionData, setDetailedEmployeeFunctionData] = useState([]);
  function handleCleanDetailedEmployeeFunctionData() {
    setDetailedEmployeeFunctionData([]);
  };

  function handleUpdateEmployeeFunction() {
    handleValidateUpdateEmployeeFunctionForm(
      handleCloseEmployeeFunctionUpdateModal,
      employeeFunctionIdToUpdate,
      employeeFunctionName,
      funtionReportsToFuntion,
      employeeFunctiontDescription,
      employeeFunctiontStatus,
      handleEmployeeFunctionIdToUpdate,
      handleCleanDetailedEmployeeFunctionData
    );
  }

  const handleSelectionEmployeeFunctionReports = (employeeFunctionName) => {
    const employeeFunction = employeeFunctionDataList.find(p => p.text === employeeFunctionName);
    if (employeeFunction) {
      setSelectedEmployeeFunction(employeeFunction.id);
      handleSelectionEmploymentContractData(employeeFunction.id, employeeRoleDataList, setSelectedEmployeeFunction, setFuntionReportsToFuntion, setFuntionReportsToFuntionState);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setEmployeeFunctiontStatus(isChecked);

    if (isChecked) {
      setEmployeeFunctiontStatusState("valid");
    } else {
      setEmployeeFunctiontStatusState("invalid");
    }
  };

  useEffect(() => {
    const fetchEmployeeFunctionById = async () => {
      if (!detailedEmployeeFunctionData.length) {
        const foundEmployeeFunction = await useFindEmployeeFunction(employeeFunctionIdToUpdate);
        console.log(foundEmployeeFunction);
        setDetailedEmployeeFunctionData(foundEmployeeFunction);
        setEmployeeFunctionName(foundEmployeeFunction.name);
        setEmployeeFunctiontDescription(foundEmployeeFunction.description);
        setEmployeeFunctiontStatus(foundEmployeeFunction.status === null ? false : true);
        handleSelectionEmployeeFunctionReports(foundEmployeeFunction.responsible);
      }
    };

    if (employeeFunctionIdToUpdate) {
      fetchEmployeeFunctionById();
    }
  }, [employeeFunctionIdToUpdate]);


  return (
    <Modal toggle={handleOpenEmployeeFunctionUpdateModal} isOpen={modalOpen} size="xl">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Editar Função
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleOpenEmployeeFunctionUpdateModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Form className="needs-validation" noValidate>
          <Card>
            <CardBody>
              <div className="form-row">
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationEmployeeFunctionName"
                  >
                    Nome
                  </label>
                  <Input
                    id="validationEmployeeFunctionName"
                    placeholder="Nome"
                    type="text"
                    valid={employeeFunctionNameState === "valid"}
                    invalid={employeeFunctionNameState === "invalid"}
                    value={employeeFunctionName}
                    onChange={(e) => {
                      setEmployeeFunctionName(e.target.value);
                      if (e.target.value === "") {
                        setEmployeeFunctionNameState("invalid");
                      } else {
                        setEmployeeFunctionNameState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    É necessário preencher este campo.
                  </div>
                </Col>
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationReportToRole"
                  >
                    Reporta ao Departamento
                  </label>
                  <Select2
                    id="validationReportToRole"
                    className="form-control"
                    data-minimum-results-for-search="Infinity"
                    options={{ placeholder: "Selecione um departamento:" }}
                    value={selectedEmployeeFunction}
                    onChange={(e) => setSelectedEmployeeFunction(e.target.value)}
                    data={employeeFunctionDataList}
                    onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, employeeFunctionDataList, setSelectedEmployeeFunction, setFuntionReportsToFuntion, setFuntionReportsToFuntionState)}
                  />
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="12">
                  <label
                    className="form-control-label"
                    htmlFor="validationEmployeeFunctiontDescription"
                  >
                    Descrição
                  </label>
                  <Input
                    id="validationEmployeeFunctiontDescription"
                    rows="3"
                    type="textarea"
                    valid={employeeFunctiontDescriptionState === "valid"}
                    invalid={employeeFunctiontDescriptionState === "invalid"}
                    value={employeeFunctiontDescription}
                    onChange={(e) => {
                      setEmployeeFunctiontDescription(e.target.value);
                      if (e.target.value === "") {
                        setEmployeeFunctiontDescriptionState("");
                      } else {
                        setEmployeeFunctiontDescriptionState("valid");
                      }
                    }}
                  />
                </Col>
                <Col className="mb-3" md="2">
                  <div className="d-flex flex-column w-100">
                    <span
                      className="form-control-label mb-4 mr-auto"
                    >
                      Estado Ativo
                    </span>
                    <label className="custom-toggle ml-auto">
                      <input
                        type="checkbox"
                        checked={employeeFunctiontStatusState}
                        onChange={handleCheckboxChange}
                      />
                      <span
                        className="custom-toggle-slider rounded-circle"
                        data-label-off="Não"
                        data-label-on="Sim"
                      />
                    </label>
                  </div>
                </Col>
              </div>
            </CardBody>
          </Card>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={handleOpenEmployeeFunctionUpdateModal}
        >
          Fechar
        </Button>
        <Button
          color={'warning'}
          type="button"
          onClick={handleUpdateEmployeeFunction}
        >
          {'Editar Função'}
        </Button>
      </ModalFooter>
    </Modal>

  );
}

ModalEmployeeFunction.defaultProps = {
  handleOpenEmployeeFunctionUpdateModal: () => { },
  modalOpen: false,
};

ModalEmployeeFunction.propTypes = {
  handleOpenEmployeeFunctionUpdateModal: PropTypes.func,
  modalOpen: PropTypes.bool,
};


export default ModalEmployeeFunction;
