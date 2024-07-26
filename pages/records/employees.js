import React, { useState, useEffect } from "react";
import Admin from "../../layouts/Admin";
import { useAuth } from '../../hooks/useAuth';
import Performance from "../../layouts/Performance";
import { TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT } from '../../contexts/AuthContext';
import EmployeeUserListView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeUserListView";
import EmployeeUserRegisterView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeUserRegisterView";
import EmployeeRegisterFieldsRegisterView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeRegisterFieldsRegisterView";

function EmployeeRecords() {

  const { authenticationDataLoggedInUser } = useAuth();

  const [admins, setAdmins] = useState([]);

  const [isShouldSubmitEmployeeRegistration, setIsShouldSubmitEmployeeRegistration] = useState(false);

  const [isShouldSubmitEmployeeRecordEntrySettingsRecord, setIsShouldSubmitEmployeeRecordEntrySettingsRecord] = useState(false);

  function handleShowEmployeeUserRegister() {
    setIsShouldSubmitEmployeeRegistration(!isShouldSubmitEmployeeRegistration);
  }

  function handleShowEmployeeRecordEntrySettings() {
    handleShowEmployeeUserRegister();
    setIsShouldSubmitEmployeeRecordEntrySettingsRecord(!isShouldSubmitEmployeeRecordEntrySettingsRecord);
  }

  if (!authenticationDataLoggedInUser) {
    return null;
  }

  return (
    <>
      {
        !isShouldSubmitEmployeeRegistration && !isShouldSubmitEmployeeRecordEntrySettingsRecord
          ? (
            <EmployeeUserListView handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} authenticationDataLoggedInUser={authenticationDataLoggedInUser} />
          )
          : (isShouldSubmitEmployeeRegistration && !isShouldSubmitEmployeeRecordEntrySettingsRecord
            ? (
              <EmployeeUserRegisterView handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} authenticationDataLoggedInUser={authenticationDataLoggedInUser} />
            ) : (
              !isShouldSubmitEmployeeRegistration && isShouldSubmitEmployeeRecordEntrySettingsRecord &&
              <EmployeeRegisterFieldsRegisterView handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} authenticationDataLoggedInUser={authenticationDataLoggedInUser} />
            )
          )
      }
    </>
  );
}


TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'administrator'
  ? EmployeeRecords.layout = Admin
  : (TYPE_USER_ACCESS_DEFINES_PAGE_LAYOUT === 'customer'
    ? EmployeeRecords.layout = Performance
    : EmployeeRecords.layout = Admin);

export default EmployeeRecords;
