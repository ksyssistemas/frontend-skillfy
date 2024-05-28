import React, { useState } from 'react';

const useCreateRole = (handleShowRolesUserRegister) => {

  const [employeeRoleName, setEmployeeRoleName] = useState("");
  const [employeeRoleNameState, setEmployeeRoleNameState] = useState(null);
  const [employeeRoleDataList, setEmployeeRoleDataList] = useState([]);
  const [roleReportsToRole, setRoleReportsToRole] = useState("");
  const [roleReportsToRoleState, setRoleReportsToRoleState] = useState(null);
  const [employeeRoleDescription, setEmployeeRoleDescription] = useState("");
  const [employeeRoleDescriptionState, setEmployeeRoleDescriptionState] = useState(null);

  const validateAddEmployeeFunctionForm = () => {
    if (employeeRoleName === "") {
      setEmployeeRoleNameState("invalid");
    } else {
      setEmployeeRoleNameState("valid");
    }
    // if (departmentReportsToDepartment === "") {
    //   setDepartmentReportsToDepartmentState("invalid");
    // } else {
    //   setDepartmentReportsToDepartmentState("valid");
    // }
    if (employeeRoleDescription === "") {
      setEmployeeRoleDescriptionState("invalid");
    } else {
      setEmployeeRoleDescriptionState("valid");
    }
  }

  function handleValidateAddEmployeeRoleForm() {
    validateAddEmployeeFunctionForm();
    if (employeeRoleNameState === "valid" &&
      employeeRoleDescriptionState === "valid"
    ) {
      handleSubmit(employeeRoleName,
        roleReportsToRole,
        employeeRoleDescription);
    } else {
      return null;
    }
  }

  const handleSubmit = async (employeeRoleName, employeeRoleDescription, roleReportsToRole) => {
    if (employeeRoleName && employeeRoleName !== "") {
      try {
        const payload = {
          RoleName: employeeRoleName,
        };

        if (employeeRoleDescription && employeeRoleDescription !== "") {
          payload.Description = employeeRoleDescription;
        }

        if (roleReportsToRole && roleReportsToRole !== "") {
          payload.Responsible = roleReportsToRole;
        }

        const response = await fetch(`http://dlist.com.br:3010/role`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          reset();
          handleShowRolesUserRegister();
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
  }

  async function getEmployeeRoleDataList() {
    try {
      const response = await fetch(`http://dlist.com.br:3010/role`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        let data = await response.json();
        if (data && data.length > 0) {
          data = data.map((role, index) => ({
            id: index.toString(),
            text: role.DepartmentName
          }));
          setEmployeeRoleDataList([data]);
        } else {
          setEmployeeRoleDataList([{ id: "0", text: "Não há cargos. É necessário cadastrar ao menos um." }])
        }
      } else {
        console.error('Erro na resposta: ', response.status);
      }
    } catch (error) {
      console.error('Erro no pedido: ', error);
    }
  };

  function handleChooseEmployeeRole(e) {
    const selectedId = e.target.value;
    if (employeeRoleDataList && employeeRoleDataList.length !== 0) {
      const optionType = employeeRoleDataList.filter(option => option.id === selectedId);
      setRoleReportsToRole(optionType[0].text);
      if (optionType.length === 0) {
        setRoleReportsToRoleState("invalid");
      } else {
        setRoleReportsToRoleState("valid");
      }
    }
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
    getEmployeeRoleDataList,
    handleChooseEmployeeRole,
    handleValidateAddEmployeeRoleForm
  };
};

export default useCreateRole;
