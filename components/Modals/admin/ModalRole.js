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
    if (employeeRoleDataList.length <= 0) {
      employmentContractDataSearchAndProcess(useFindAllRoles, handleEmployeeRoleDataList, 'role', 'EmployeeUserRegister');
    }
  }, [employeeRoleDataList]);

  const handleCloseRoleUpdateModal = () => {
    handleOpenRoleUpdateModal();
    setEmployeeRoleDataList([]);
    reset();
    setSelectedRole('');
    setRoleReportsToRole('');
    setRoleReportsToRoleState(null);
    handleCleanDetailedRoleData();
    handleRoleIdStatusCleanupToUpdate();
  };

  const [detailedRoleData, setDetailedRoleData] = useState([]);
  function handleCleanDetailedRoleData() {
    setDetailedRoleData([]);
  };

  function handleUpdateRole() {
    let roleReportsToRoleId = null;

    if (!isRoleInputTouched) {

      const role = employeeRoleDataList.find(
        (item) => item.text === roleReportsToRole
      );
      roleReportsToRoleId = role ? role.id : null;
    } else {
      roleReportsToRoleId = roleReportsToRole;
    }

    handleValidateUpdateEmployeeRoleForm(
      handleCloseRoleUpdateModal,
      roleIdToUpdate,
      employeeRoleName,
      roleReportsToRoleId,
      employeeRoleDescription,
      employeeRoleStatus,
      handleRoleIdToUpdate,
      handleCleanDetailedRoleData
    );
  }

  const handleSelectionRoleReports = (roleId) => {
    if (roleId && roleId !== null) {
      const role = employeeRoleDataList.find(p => p.id === roleId);
      if (role) {
        setSelectedRole(role.id);
        handleSelectionEmploymentContractData(
          role.id,
          employeeRoleDataList,
          setSelectedRole,
          setRoleReportsToRole,
          setRoleReportsToRoleState,
          null,
          null,
          'text'
        );
      } else {
        console.error(`Employee role with ID ${roleId} not found in employeeRoleDataList.`);
      }
    } else {
      console.error('Invalid roleId provided:', roleId);
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

  const [isRoleInputTouched, setIsRoleInputTouched] = useState(false);


  useEffect(() => {
    const fetchRoleById = async () => {
      if (roleIdToUpdate) {
        try {
          const foundRole = await useFindRole(roleIdToUpdate);
          setDetailedRoleData(foundRole);
          setEmployeeRoleName(foundRole.roleName);
          setEmployeeRoleDescription(foundRole.description);
          if (foundRole.status === null || foundRole.status === 0) {
            setEmployeeRoleStatus(0);
          } else {
            setEmployeeRoleStatus(1);
          }
          handleSelectionRoleReports(foundRole.responsible);
        } catch (error) {
          console.error(`Error fetching role data for ${roleIdToUpdate}:`, error);
        }
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
          onClick={handleCloseRoleUpdateModal}
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
                    onSelect={(e) => {
                      handleSelectionEmploymentContractData(
                        e.target.value,
                        employeeRoleDataList,
                        setSelectedRole,
                        setRoleReportsToRole,
                        setRoleReportsToRoleState,
                        null,
                        null,
                        'id'
                      );
                      setIsRoleInputTouched(true);
                    }}
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
          onClick={handleCloseRoleUpdateModal}
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
