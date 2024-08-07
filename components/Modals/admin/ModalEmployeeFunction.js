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
import { useFindAllRoles } from "../../../hooks/RecordsHooks/role/useFindAllRoles";
import useCreateRole from "../../../hooks/RecordsHooks/role/useCreateRole";

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
    resetFunction
  } = useCreateEmployeeFunction();

  const { handleValidateUpdateEmployeeFunctionForm } = useUpdateEmployeeFunction();

  const [selectedEmployeeFunction, setSelectedEmployeeFunction] = useState('');

  useEffect(() => {
    if (employeeFunctionDataList.length <= 0) {
      employmentContractDataSearchAndProcess(useFindAllRoles, handleEmployeeFunctionDataList, 'role', 'EmployeeUserRegister');
    }
  }, []);

  const handleCloseEmployeeFunctionUpdateModal = () => {
    handleOpenEmployeeFunctionUpdateModal();
    resetFunction();
    setEmployeeFunctionDataList([]);
    setSelectedEmployeeFunction('');
    setFuntionReportsToFuntion('');
    setFuntionReportsToFuntionState(null);
    handleCleanDetailedEmployeeFunctionData();
    handleEmployeeFunctionIdStatusCleanupToUpdate();
  };

  const [detailedEmployeeFunctionData, setDetailedEmployeeFunctionData] = useState([]);
  function handleCleanDetailedEmployeeFunctionData() {
    setDetailedEmployeeFunctionData([]);
  };

  function handleUpdateEmployeeFunction() {
    let functionReportsToRoleId = null;
    console.log(!isEmployeeFunctionInputTouched);
    if (!isEmployeeFunctionInputTouched) {

      const employeFunction = employeeFunctionDataList.find(
        (item) => item.text === funtionReportsToFuntion
      );
      functionReportsToRoleId = employeFunction ? employeFunction.id : null;
    } else {
      functionReportsToRoleId = funtionReportsToFuntion;
    }
    console.log(functionReportsToRoleId);
    handleValidateUpdateEmployeeFunctionForm(
      handleCloseEmployeeFunctionUpdateModal,
      employeeFunctionIdToUpdate,
      employeeFunctionName,
      functionReportsToRoleId,
      employeeFunctiontDescription,
      employeeFunctiontStatus,
      handleEmployeeFunctionIdToUpdate,
      handleCleanDetailedEmployeeFunctionData
    );
  }

  const handleSelectionEmployeeFunctionReports = (employeeFunctionId) => {
    console.log(employeeFunctionId);
    console.log(employeeFunctionDataList);
    if (employeeFunctionId && employeeFunctionId !== null) {
      const employeeFunction = employeeFunctionDataList.find(p => p.id === employeeFunctionId);
      if (employeeFunction) {
        setSelectedEmployeeFunction(employeeFunction.id);
        handleSelectionEmploymentContractData(
          employeeFunction.id,
          employeeFunctionDataList,
          setSelectedEmployeeFunction,
          setFuntionReportsToFuntion,
          setFuntionReportsToFuntionState,
          null,
          null,
          'text'
        );
      } else {
        console.error(`Employee function with ID ${employeeFunctionId} not found in employeeFunctionDataList.`);
      }
    } else {
      console.error('Invalid employeeFunctionId provided:', employeeFunctionId);
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

  const [isEmployeeFunctionInputTouched, setIsEmployeeFunctionInputTouched] = useState(false);

  useEffect(() => {
    const fetchEmployeeFunctionById = async () => {
      if (employeeFunctionDataList.length > 0 && employeeFunctionIdToUpdate) {
        try {
          const foundEmployeeFunction = await useFindEmployeeFunction(employeeFunctionIdToUpdate);
          setDetailedEmployeeFunctionData(foundEmployeeFunction);
          setEmployeeFunctionName(foundEmployeeFunction.name);
          setEmployeeFunctiontDescription(foundEmployeeFunction.description);
          if (foundEmployeeFunction.status === null || foundEmployeeFunction.status === 0) {
            setEmployeeFunctiontStatus(0);
          } else {
            setEmployeeFunctiontStatus(1);
          }
          handleSelectionEmployeeFunctionReports(foundEmployeeFunction.responsible);
        } catch (error) {
          console.error(`Error fetching employeeFunction data for ${employeeFunctionIdToUpdate}:`, error);
        }
      }
    };

    fetchEmployeeFunctionById();
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
                    Reporta ao Cargo
                  </label>
                  <Select2
                    id="validationReportToRole"
                    className="form-control"
                    data-minimum-results-for-search="Infinity"
                    options={{ placeholder: "Selecione um departamento:" }}
                    value={selectedEmployeeFunction}
                    onChange={(e) => setSelectedEmployeeFunction(e.target.value)}
                    data={employeeFunctionDataList}
                    onSelect={(e) => {
                      handleSelectionEmploymentContractData(
                        e.target.value,
                        employeeFunctionDataList,
                        setSelectedEmployeeFunction,
                        setFuntionReportsToFuntion,
                        setFuntionReportsToFuntionState,
                        null,
                        null,
                        'id'
                      );
                      setIsEmployeeFunctionInputTouched(true);
                    }}
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
                        checked={employeeFunctiontStatus}
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
