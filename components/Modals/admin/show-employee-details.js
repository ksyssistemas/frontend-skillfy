import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// reactstrap components
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
} from "reactstrap";
import EmployeeUserUpdate from "../../Forms/EmployeeUserUpdate";
import { EmployeeContext } from "../../../contexts/RecordsContext/EmployeeContext";
import { useFindEmployee } from "../../../hooks/RecordsHooks/employee/useFindEmployee";
import { useFindEmployeeAddress } from "../../../hooks/RecordsHooks/employee/useFindEmployeeAddress";
import { useFindClientCompany } from "../../../hooks/RecordsHooks/customer/useFindClientCompany";
import { useFindDepartment } from '../../../hooks/RecordsHooks/department/useFindDepartment';
import { useFindRole } from '../../../hooks/RecordsHooks/role/useFindRole';
import { useFindEmployeeFunction } from '../../../hooks/RecordsHooks/employeeFunction/useFindEmployeeFunction';
import { useFindEmployeeContractDetails } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindEmployeeContractDetails";
import { useFindContractType } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindContractType";
import { useFindWorkModels } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindWorkModels";
import { useFindWorkplaces } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindWorkplaces";

function ShowEmployeeDetailsModal(
  {
    handleShowEmployeeDetailsModal,
    idSelectedToShowEmployeeDetails,
    handleCleaningSelectedIdToShowEmployeeDetails,
    handleOpenEmployeeModal,
    modalOpen,
    employeeName,
    handleCleaningEmployeeNameStatus,
    companyNameToModalDetails
  }
) {

  const {
    employeeIdToUpdate,
    handleEmployeeIdStatusCleanupToUpdate,
    handleEmployeeIdToUpdate,
    hasNewEmployeeRecordCreated,
    handleCreatedEmployeeRecordStatusChange,
    hasUpdatedEmployeeRecord,
    handleUpdatedEmployeeRecordStatusChange,
    isShouldUpdateEmployee,
    handleIsShouldUpdateEmployee,
    hasDeletedEmployeeRecord,
    handleDeletedEmployeeRecordStatusChange,
  } = useContext(EmployeeContext);

  const [detailsSelectedEmployee, setDetailsSelectedEmployee] = useState([]);
  // const [addressDetailsSelectedEmployee, setAddressDetailsSelectedEmployee] = useState([]);
  const [contractDetailsSelectedEmployee, setContractDetailsSelectedEmployee] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function handleCloseEmployeeDetailsModal() {
    handleCleaningSelectedIdToShowEmployeeDetails();
    handleCleaningEmployeeNameStatus();
    setDetailsSelectedEmployee('');
    setContractDetailsSelectedEmployee('');
    setDepartmentName('');
    setRoleName('');
    setFunctionName('');
    setContractTypeName('');
    setWorkModelName('');
    setWorkplaceName('');
    handleOpenEmployeeModal();
  }

  function handleCloseEmployeeUpdateModal() {
    handleEmployeeIdStatusCleanupToUpdate();
    handleCleaningEmployeeNameStatus();
    handleOpenEmployeeModal();
  }

  const [departmentName, setDepartmentName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [contractTypeName, setContractTypeName] = useState('');
  const [workModelName, setWorkModelName] = useState('');
  const [workplaceName, setWorkplaceName] = useState('');

  useEffect(() => {
    const fetchCompanyNames = async (employee) => {
      try {
        const companyData = await useFindClientCompany(employee.customerId);
        return { ...employee, companyName: companyData.companyName };
      } catch (error) {
        console.error(`Error fetching employee data for customerId ${employee.customerId}:`, error);
        return { ...employee, companyName: 'Unknown' };
      }
    };

    const fetchData = async () => {
      try {
        if (detailsSelectedEmployee.length <= 0) {
          const foundEmployee = await useFindEmployee(idSelectedToShowEmployeeDetails);
          const updatedEmployee = await fetchCompanyNames(foundEmployee)
          setDetailsSelectedEmployee(updatedEmployee);
          // const foundEmployeeAddress = await useFindEmployeeAddress(idSelectedToShowEmployeeDetails);
          // setAddressDetailsSelectedEmployee(foundEmployeeAddress.data[0] || []);

          const foundEmployeeContractDetails = await useFindEmployeeContractDetails(idSelectedToShowEmployeeDetails);
          setContractDetailsSelectedEmployee(foundEmployeeContractDetails);
          if (foundEmployeeContractDetails) {
            const foundDepartmentName = await useFindDepartment(foundEmployeeContractDetails.departmentId);
            setDepartmentName(foundDepartmentName.departmentName);
            const foundRoleName = await useFindRole(foundEmployeeContractDetails.rolesId);
            setRoleName(foundRoleName.roleName);
            const foundFunctionName = await useFindEmployeeFunction(foundEmployeeContractDetails.departmentId);
            if (foundFunctionName && foundFunctionName.name) {
              setFunctionName(foundFunctionName.name);
            }
            const foundEmployeeContract = await useFindEmployeeContractDetails(idSelectedToShowEmployeeDetails);
            if (foundEmployeeContract) {
              const foundContractType = await useFindContractType(foundEmployeeContract.contractTypeId);
              const foundWorkModels = await useFindWorkModels(foundEmployeeContract.contractModelId);
              const foundWorkplaces = await useFindWorkplaces(foundEmployeeContract.workplaceId);
              if (foundContractType) {
                setContractTypeName(foundContractType.name);
              }
              if (foundWorkModels) {
                setWorkModelName(foundWorkModels.name);
              }
              if (foundWorkplaces) {
                setWorkplaceName(foundWorkplaces.name);
              }
            }
          }

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [
    detailsSelectedEmployee,
    // addressDetailsSelectedEmployee, 
    contractDetailsSelectedEmployee,
    idSelectedToShowEmployeeDetails
  ]);

  function handleUpdateEmployeeUserUpdate() {
    handleIsShouldUpdateEmployee();
  }

  const commonProps = {
    handleShowEmployeeDetailsModal,
    handleOpenEmployeeModal,
    modalOpen,
    employeeName,
    handleCleaningEmployeeNameStatus,
    companyNameToModalDetails
  };

  return (
    <Modal
      toggle={handleShowEmployeeDetailsModal}
      isOpen={modalOpen}
      size="xl"
      key={idSelectedToShowEmployeeDetails ? idSelectedToShowEmployeeDetails : employeeIdToUpdate}
    //key={`${detailsSelectedEmployee.id}.${addressDetailsSelectedEmployee.id}.${contractDetailsSelectedEmployee.id}`}
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Informações de {detailsSelectedEmployee?.name || ''}
          {
            employeeName
              ? `Informações de ${employeeName}`
              : (
                employeeIdToUpdate && employeeName
                  ? `Informações de ${employeeName}`
                  : 'Informações'
              )
          }
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={idSelectedToShowEmployeeDetails ? handleCloseEmployeeDetailsModal : handleCloseEmployeeUpdateModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        {
          detailsSelectedEmployee && detailsSelectedEmployee.id ? (
            <Row>
              <div className="col">
                <div className="card-wrapper">
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom01"
                      >
                        Nome da Empresa
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.companyName}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        Nome
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.name || ''}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Sobrenome
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.lastName || ''}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom01"
                      >
                        Data de Nascimento
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.birthdate ? formatDate(detailsSelectedEmployee.birthdate) : ''}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom05"
                      >
                        E-mail
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.email || ''}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Número de Telefone
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.phoneNumber || ''}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <hr />
                  {/* <h6 className="heading-small text-muted mb-4">
                Informações de Endereço
              </h6>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    CEP
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.zipCode || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="8">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    Logradouro
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.address || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="8">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom03"
                  >
                    Complemento
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.complement || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustomUsername"
                  >
                    Número
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.addressNumber || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom04"
                  >
                    Bairro
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.neighborhood || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    Cidade
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.city || ''}
                    </span>
                  </div>
                </Col>
                <Col className="mb-3" md="4">
                  <label
                    className="form-control-label"
                    htmlFor="validationCustom05"
                  >
                    Estado
                  </label>
                  <div className="mt-1 mb-3">
                    <span className="name text-sm">
                      {addressDetailsSelectedEmployee?.state || ''}
                    </span>
                  </div>
                </Col>
              </div>
              <hr /> */}
                  <h6 className="heading-small text-muted mb-4">
                    Informações de Ocupação
                  </h6>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Departamento
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {departmentName}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Cargo
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {roleName}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Função
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {functionName || 'Não possuí'}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Exerce líderança?
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.isLead === true ? "Sim" : "Não"}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Liderado por
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee?.LeaderName ? detailsSelectedEmployee?.LeaderName : "Não possuí"}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Data de Admissão
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {contractDetailsSelectedEmployee?.adimissionDate ? formatDate(contractDetailsSelectedEmployee.adimissionDate) : ''}
                        </span>
                      </div>
                    </Col>
                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Tipo de Contrato
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {contractTypeName}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Modelo de Trabalho
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {workModelName}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="4">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Local de Trabalho
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {workplaceName}
                        </span>
                      </div>
                    </Col>

                  </div>
                  <div className="form-row">
                    <Col className="mb-3" md="3">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Hora de Entrada
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {contractDetailsSelectedEmployee?.entryTime || ''}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="3">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Intervalo
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {contractDetailsSelectedEmployee?.breakTime || ''}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="3">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Horário de Saída
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {contractDetailsSelectedEmployee?.departureTime || ''}
                        </span>
                      </div>
                    </Col>
                    <Col className="mb-3" md="3">
                      <label
                        className="form-control-label"
                        htmlFor="validationCustom02"
                      >
                        Estado Ativo
                      </label>
                      <div className="mt-1 mb-3">
                        <span className="name text-sm">
                          {detailsSelectedEmployee.status ? "Sim" : "Não"}
                        </span>
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                  </div>
                </div>
              </div>
            </Row>
          ) : (
            employeeIdToUpdate ? (
              <EmployeeUserUpdate {...commonProps} />
            ) : (
              <div className="text-center">Dados não disponíveis</div>
            )
          )
        }
      </ModalBody>
      {
        employeeIdToUpdate ? (
          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={idSelectedToShowEmployeeDetails ? handleCloseEmployeeDetailsModal : handleCloseEmployeeUpdateModal}
            >
              Fechar
            </Button>
            <Button
              color={'warning'}
              type="button"
              onClick={() => handleUpdateEmployeeUserUpdate()}
            >
              Editar Ciclo
            </Button>
          </ModalFooter>
        ) : null
      }
    </Modal >
  );

}

ShowEmployeeDetailsModal.defaultProps = {
  handleShowEmployeeDetailsModal: () => { },
  idSelectedToShowEmployeeDetails: PropTypes.string,
  handleCleaningSelectedIdToShowEmployeeDetails: () => { },
  handleOpenEmployeeModal: () => { },
  modalOpen: false,
  employeeName: '',
  companyNameToModalDetails: '',
};

ShowEmployeeDetailsModal.propTypes = {
  handleShowEmployeeDetailsModal: PropTypes.func,
  idSelectedToShowEmployeeDetails: PropTypes.string,
  handleCleaningSelectedIdToShowEmployeeDetails: PropTypes.func,
  handleOpenEmployeeModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  employeeName: PropTypes.string,
  employeeNcompanyNameToModalDetailsame: PropTypes.string,
};

export default ShowEmployeeDetailsModal;