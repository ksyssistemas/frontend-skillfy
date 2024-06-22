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

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await fetch('http://localhost:4008/administrator/findAll');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }
    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`http://localhost:4008/administrator/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete admin.');
      }
      setAdmins(admins.filter(admin => admin.id !== id));
    } catch (error) {
      console.error('There was a problem deleting the admin:', error);
    }
  };

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
