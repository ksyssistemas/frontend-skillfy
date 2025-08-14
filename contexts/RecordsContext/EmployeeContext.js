// Contexto para armazenar informações de autenticação
import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext({});

function EmployeeProvider({ children }) {

    const [isShouldRenderEmployeeView, setIsShouldRenderEmployeeView] = useState('employeeList');

    function handleShowDynamicEmployeeComponent(view) {
        setIsShouldRenderEmployeeView(view);
    }

    const [employeeIdToUpdate, setEmployeeIdToUpdate] = useState(0);

    function handleEmployeeIdStatusCleanupToUpdate() {
        setEmployeeIdToUpdate(0);
    }

    function handleEmployeeIdToUpdate(employeeId) {
        setEmployeeIdToUpdate(employeeId);
    }

    const [hasNewEmployeeRecordCreated, setHasNewEmployeeRecordCreated] = useState(false);
    function handleCreatedEmployeeRecordStatusChange() {
        setHasNewEmployeeRecordCreated(!hasNewEmployeeRecordCreated);
    }

    const [hasUpdatedEmployeeRecord, setHasUpdatedEmployeeRecord] = useState(false);
    function handleUpdatedEmployeeRecordStatusChange() {
        setHasUpdatedEmployeeRecord(!hasUpdatedEmployeeRecord);
    }

    const [isShouldUpdateEmployee, setIsShouldUpdateEmployee] = useState(false);
    function handleIsShouldUpdateEmployee() {
        setIsShouldUpdateEmployee(!isShouldUpdateEmployee);
    }

    const [hasDeletedEmployeeRecord, setHasDeletedEmployeeRecord] = useState(false);
    function handleDeletedEmployeeRecordStatusChange() {
        setHasDeletedEmployeeRecord(!hasDeletedEmployeeRecord);
    }

    const [isLoadingContractDetailsEmployeeToUpdateData, setIsLoadingContractDetailsEmployeeToUpdateData] = useState(false);
    function handleIsLoadingContractDetailsEmployeeToUpdateData(status) {
        setIsLoadingContractDetailsEmployeeToUpdateData(status);
    }
    const [isLoadingDetailsSelectedEmployeeData, setIsLoadingDetailsSelectedEmployeeData] = useState(false);
    function handleIsLoadingDetailsSelectedEmployeeData(status) {
        setIsLoadingDetailsSelectedEmployeeData(status);
    }

    return (
        <EmployeeContext.Provider
            value={{
                isShouldRenderEmployeeView,
                handleShowDynamicEmployeeComponent,
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
                isLoadingContractDetailsEmployeeToUpdateData,
                handleIsLoadingContractDetailsEmployeeToUpdateData,
                isLoadingDetailsSelectedEmployeeData,
                handleIsLoadingDetailsSelectedEmployeeData
            }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export { EmployeeProvider };