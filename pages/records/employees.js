import React, { useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import EmployeeUserListView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeUserListView";
import EmployeeUserRegisterView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeUserRegisterView";
import EmployeeRegisterFieldsRegisterView from "../../components/EmployeeComponents/InterfaceByUserRole/EmployeeRegisterFieldsRegisterView";
import DynamicLayout from "../../layouts/DynamicLayout";

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

EmployeeRecords.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default EmployeeRecords;
