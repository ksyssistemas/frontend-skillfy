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
import { RoleContext } from "../../../contexts/RecordsContext/RoleContext";
import useCreateRole from "../../../hooks/RecordsHooks/role/useCreateRole";
import { useFindRole } from "../../../hooks/RecordsHooks/role/useFindRole";
import { useFindAllRoles } from "../../../hooks/RecordsHooks/role/useFindAllRoles";
import useUpdateRole from "../../../hooks/RecordsHooks/role/useUpdateRole";

function ModalRole({ handleOpenRoleUpdateModal, modalOpen }) {

  const {
    roleIdToUpdate,
    handleRoleIdStatusCleanupToUpdate,
    handleRoleIdToUpdate,
    hasNewRoleRecordCreated,
    handleCreatedRoleRecordStatusChange,
    hasUpdatedRoleRecord,
    handleUpdatedRoleRecordStatusChange,
    hasDeletedRoleRecord,
    handleDeletedRoleRecordStatusChange,
  } = useContext(RoleContext);

  const {
    employeeRoleName,
    setEmployeeRoleName,
    employeeRoleNameState,
    setEmployeeRoleNameState,
    employeeRoleDataList,
    setEmployeeRoleDataList,
    roleReportsToRole,
    setRoleReportsToRole,
    roleReportsToRoleState,
    setRoleReportsToRoleState,
    employeeRoleDescription,
    setEmployeeRoleDescription,
    employeeRoleDescriptionState,
    setEmployeeRoleDescriptionState,
    employeeRoleStatus,
    setEmployeeRoleStatus,
    employeeRoleStatusState,
    setEmployeeRoleStatusState,
    handleValidateAddEmployeeRoleForm,
    handleEmployeeRoleDataList,
    reset
  } = useCreateRole();

  const { handleValidateUpdateEmployeeRoleForm } = useUpdateRole();

  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    if (employeeRoleDataList.length === 0) {
      employmentContractDataSearchAndProcess(useFindAllRoles, handleEmployeeRoleDataList, 'role', 'EmployeeUserRegister');
    }
  }, []);

  const handleCloseRoleUpdateModal = () => {
    handleOpenRoleUpdateModal();
    reset();
    setSelectedRole('');
  };

  const [detailedRoleData, setDetailedRoleData] = useState([]);
  function handleCleanDetailedRoleData() {
    setDetailedRoleData([]);
  };

  function handleUpdateRole() {
    handleValidateUpdateEmployeeRoleForm(
      handleCloseRoleUpdateModal,
      roleIdToUpdate,
      employeeRoleName,
      roleReportsToRole,
      employeeRoleDescription,
      employeeRoleStatus,
      handleRoleIdToUpdate,
      handleCleanDetailedRoleData
    );
  }

  const handleSelectionRoleReports = (roleName) => {
    const role = employeeRoleDataList.find(p => p.text === roleName);
    if (role) {
      setSelectedRole(role.id);
      handleSelectionEmploymentContractData(role.id, employeeRoleDataList, setSelectedRole, setRoleReportsToRole, setRoleReportsToRoleState);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setEmployeeRoleStatus(isChecked);

    if (isChecked) {
      setEmployeeRoleStatusState("valid");
    } else {
      setEmployeeRoleStatusState("invalid");
    }
  };

  useEffect(() => {
    const fetchRoleById = async () => {
      if (!detailedRoleData.length) {
        const foundRole = await useFindRole(roleIdToUpdate);
        console.log(foundRole);
        setDetailedRoleData(foundRole);
        setEmployeeRoleName(foundRole.RoleName);
        setEmployeeRoleDescription(foundRole.Description);
        setEmployeeRoleStatus(foundRole.Status === null ? false : true);
        handleSelectionRoleReports(foundRole.Responsible);
      }
    };

    if (roleIdToUpdate) {
      fetchRoleById();
    }
  }, [roleIdToUpdate]);


  return (
    <Modal toggle={handleOpenRoleUpdateModal} isOpen={modalOpen} size="xl">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Editar Cargo
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleOpenRoleUpdateModal}
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
                    htmlFor="validationEmployeeRoleName"
                  >
                    Nome
                  </label>
                  <Input
                    id="validationEmployeeRoleName"
                    placeholder="Nome"
                    type="text"
                    valid={employeeRoleNameState === "valid"}
                    invalid={employeeRoleNameState === "invalid"}
                    value={employeeRoleName}
                    onChange={(e) => {
                      setEmployeeRoleName(e.target.value);
                      if (e.target.value === "") {
                        setEmployeeRoleNameState("invalid");
                      } else {
                        setEmployeeRoleNameState("valid");
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
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    data={employeeRoleDataList}
                    onSelect={(e) => handleSelectionEmploymentContractData(e.target.value, employeeRoleDataList, setSelectedRole, setRoleReportsToRole, setRoleReportsToRoleState)}
                  />
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="12">
                  <label
                    className="form-control-label"
                    htmlFor="validationEmployeeRoleDescription"
                  >
                    Descrição
                  </label>
                  <Input
                    id="validationEmployeeRoleDescription"
                    rows="3"
                    type="textarea"
                    valid={employeeRoleDescriptionState === "valid"}
                    invalid={employeeRoleDescriptionState === "invalid"}
                    value={employeeRoleDescription}
                    onChange={(e) => {
                      setEmployeeRoleDescription(e.target.value);
                      if (e.target.value === "") {
                        setEmployeeRoleDescriptionState("");
                      } else {
                        setEmployeeRoleDescriptionState("valid");
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
                        checked={employeeRoleStatus}
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
          onClick={handleOpenRoleUpdateModal}
        >
          Fechar
        </Button>
        <Button
          color={'warning'}
          type="button"
          onClick={handleUpdateRole}
        >
          {'Editar Cargo'}
        </Button>
      </ModalFooter>
    </Modal>

  );
}

ModalRole.defaultProps = {
  handleOpenRoleUpdateModal: () => { },
  modalOpen: false,
};

ModalRole.propTypes = {
  handleOpenRoleUpdateModal: PropTypes.func,
  modalOpen: PropTypes.bool,
};


export default ModalRole;
