import React, { useContext, useState } from 'react';
import { RoleContext } from '../../../contexts/RecordsContext/RoleContext';

const useCreateRole = (handleShowRolesUserRegister) => {

  const {
    handleCreatedRoleRecordStatusChange,
  } = useContext(RoleContext);

  const [employeeRoleName, setEmployeeRoleName] = useState("");
  const [employeeRoleNameState, setEmployeeRoleNameState] = useState(null);
  const [roleReportsToRole, setRoleReportsToRole] = useState("");
  const [roleReportsToRoleState, setRoleReportsToRoleState] = useState(null);
  const [employeeRoleDescription, setEmployeeRoleDescription] = useState("");
  const [employeeRoleDescriptionState, setEmployeeRoleDescriptionState] = useState(null);
  const [employeeRoleStatus, setEmployeeRoleStatus] = useState(false);
  const [employeeRoleStatusState, setEmployeeRoleStatusState] = useState(null);
  const [employeeRoleDataList, setEmployeeRoleDataList] = useState([]);
  const handleEmployeeRoleDataList = (roleData) => {
    setEmployeeRoleDataList(roleData);
  }

  const validateAddEmployeeRoleForm = () => {
    if (employeeRoleName === "") {
      setEmployeeRoleNameState("invalid");
    } else {
      setEmployeeRoleNameState("valid");
    }
  }

  function handleValidateAddEmployeeRoleForm() {
    validateAddEmployeeRoleForm();
    handleSubmit(employeeRoleName, employeeRoleDescription, roleReportsToRole);
  }

  const handleSubmit = async (employeeRoleName, employeeRoleDescription, roleReportsToRole) => {
    if (employeeRoleName && employeeRoleName !== "") {
      try {
        const payload = {
          roleName: employeeRoleName,
        };

        if (employeeRoleDescription && employeeRoleDescription !== "") {
          payload.description = employeeRoleDescription;
        }

        if (roleReportsToRole && roleReportsToRole !== "") {
          payload.responsible = roleReportsToRole;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_ROLE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          reset();
          handleShowRolesUserRegister();
          handleCreatedRoleRecordStatusChange();
          console.log('Data sent successfully!');
        } else {
          console.error('Erro na resposta:', response.status);
        }
      } catch (error) {
        console.error('Erro no pedido:', error);
      }
    }
  };

  function reset() {
    setEmployeeRoleName("");
    setEmployeeRoleNameState(null);
    setEmployeeRoleDataList([]);
    setRoleReportsToRole("");
    setRoleReportsToRoleState(null);
    setEmployeeRoleDescription("");
    setEmployeeRoleDescriptionState(null);
    setEmployeeRoleStatus(false);
    setEmployeeRoleStatusState(null);
  }

  return {
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
  };
};

export default useCreateRole;
