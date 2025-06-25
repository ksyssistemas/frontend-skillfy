import React, { useState, useContext } from "react";
import EmployeeUserListView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeUserListView";
import EmployeeUserRegisterView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeUserRegisterView";
import EmployeeRegisterFieldsRegisterView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeRegisterFieldsRegisterView";
import DynamicLayout from "../../layouts/DynamicLayout";
import { EmployeeContext } from "../../contexts/RecordsContext/EmployeeContext";
import { useAuth } from "../../hooks/useAuth";

function EmployeeRecords() {
  const { authenticationDataLoggedInUser } = useAuth();

  const { isShouldRenderEmployeeView } = useContext(EmployeeContext);

      const renderContent = () => {
        switch (isShouldRenderEmployeeView) {
            case 'employeeRegister':
                return <EmployeeUserRegisterView />;
            case 'employeeRegisterSettings':
                return <EmployeeRegisterFieldsRegisterView/>;
            case 'employeeList':
                return <EmployeeUserListView/>;
            default:
                return <EmployeeUserListView />;
        }
    };

  if (!authenticationDataLoggedInUser) {
    return null;
  }

  return (
    <>
      {renderContent()}
    </>
  );
}

EmployeeRecords.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default EmployeeRecords;
