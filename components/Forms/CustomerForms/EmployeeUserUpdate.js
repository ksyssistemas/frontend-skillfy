import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState, useReducer } from 'react';
// nodejs library that concatenates classes
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import {
    Col,
    Input,
    Row
} from "reactstrap";
import { EmployeeContext } from "../../../contexts/RecordsContext/EmployeeContext";
import useCreateEmployee from "../../../hooks/RecordsHooks/employee/useCreateEmployee";
import useCreateTypeContract from "../../../hooks/RecordsHooks/featuresEmploymentContract/useCreateTypeContract";
import useCreateWorkModel from "../../../hooks/RecordsHooks/featuresEmploymentContract/useCreateWorkModel";
import useCreateWorkplace from "../../../hooks/RecordsHooks/featuresEmploymentContract/useCreateWorkplace";
import { useFindEmployee } from "../../../hooks/RecordsHooks/employee/useFindEmployee";
import { useFindEmployeeContractDetails } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindEmployeeContractDetails";
import { handleDateFormatting } from "../../../util/handleDateFormatting";
import { useFindClientCompany } from "../../../hooks/RecordsHooks/customer/useFindClientCompany";
import { useFindAllEmployeeAndRole } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllEmployeeAndRole";
import { useFindAllTypeContract } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllTypeContract";
import { useFindAllWorkModels } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllWorkModels";
import { useFindAllWorkplaces } from "../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllWorkplaces";
import { useFindAllDepartments } from "../../../hooks/RecordsHooks/department/useFindAllDepartments";
import { useFindAllRoles } from "../../../hooks/RecordsHooks/role/useFindAllRoles";
import { useFindAllFunctions } from "../../../hooks/RecordsHooks/employeeFunction/useFindAllFunctions";
import { employmentContractDataSearchAndProcess } from "../../../util/employmentContractDataSearchAndProcess";
import useUpdateEmployee from "../../../hooks/RecordsHooks/employee/useUpdateEmployee";
import { initialState, formReducer } from '../../../reducers/employeeFormReducer';
import PageChange from "../../PageChange/PageChange";
import { handleSelectionEmploymentContractDataWithReducer } from "../../../util/handleSelectionEmploymentContractDataWithReducer";
import { selectedListItemToUpdate } from "../../../util/selectedListItemToUpdate";

function EmployeeUserUpdate(
    {
        handleShowEmployeeDetailsModal,
        handleOpenEmployeeModal,
        modalOpen,
        employeeName,
        handleCleaningEmployeeNameStatus,
        companyNameToModalDetails
    }
) {

    const [state, dispatch] = useReducer(formReducer, initialState);

    const {
        employeeIdToUpdate,
        handleEmployeeIdToUpdate,
        handleEmployeeIdStatusCleanupToUpdate,
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
    } = useContext(EmployeeContext);

    const {
        handleValidateUpdateEmployeeForm
    } = useUpdateEmployee();

    const [cepTouched, setCepTouched] = useState(false);

    const [formattedBirthdate, setFormattedBirthdate] = useState('');
    const [formattedEmployeeAdmission, setFormattedEmployeeAdmission] = useState('');

    const [isPreloadingSelection, setIsPreloadingSelection] = useState(true);

    const handleFirstNameChange = (e) => {
        dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value });
        dispatch({ type: 'SET_FIRST_NAME_STATE', payload: e.target.value === '' ? 'invalid' : 'valid' });
    };

    const handleFirstNameTouch = () => {
        dispatch({ type: 'TOUCH_FIRST_NAME' });
    };

    const handleLastNameChange = (e) => {
        dispatch({ type: 'SET_LAST_NAME', payload: e.target.value });
        dispatch({ type: 'SET_LAST_NAME_STATE', payload: e.target.value === '' ? 'invalid' : 'valid' });
    };

    const handleLastNameTouch = () => {
        dispatch({ type: 'TOUCH_LAST_NAME' });
    };

    const handleEmailChange = (e) => {
        dispatch({ type: 'SET_EMAIL_ADDRESS', payload: e.target.value });
        const isValidEmail = validateEmail(e.target.value);
        dispatch({ type: 'SET_EMAIL_ADDRESS_STATE', payload: isValidEmail ? 'valid' : 'invalid' });
    };

    const handleEmailTouch = () => {
        dispatch({ type: 'TOUCH_EMAIL_ADDRESS' });
    };

    const validateEmail = (email) => {
        if (email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    };

    const handlePhoneNumberChange = (value) => {
        if (value && value.trim() !== "") {
            return { formattedPhoneNumber: value, isValid: true };
        }
        return { formattedPhoneNumber: "", isValid: false };
    };

    const handlePhoneTouch = () => {
        dispatch({ type: 'TOUCH_PHONE_NUMBER' });
    };

    const onPhoneNumberChange = (e) => {
        const { formattedPhoneNumber, isValid } = handlePhoneNumberChange(e.target.value);

        dispatch({ type: 'SET_PHONE_NUMBER', payload: formattedPhoneNumber });
        dispatch({ type: 'SET_PHONE_NUMBER_STATE', payload: isValid ? 'valid' : 'invalid' });
    };

    const handleSelectedDepartmentChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: value });
        dispatch({ type: 'SET_SELECTED_DEPARTMENT_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const handleSelectedRoleChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SELECTED_ROLE', payload: value });
        dispatch({ type: 'SET_SELECTED_ROLE_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const handleSelectedFunctionChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SELECTED_FUNCTION', payload: value });
        dispatch({ type: 'SET_SELECTED_FUNCTION_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const handleSelectedContractTypeChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SELECTED_CONTRACT_TYPE', payload: value });
        dispatch({ type: 'SET_SELECTED_CONTRACT_TYPE_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const handleSelectedWorkModelChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SELECTED_WORK_MODEL', payload: value });
        dispatch({ type: 'SET_SELECTED_WORK_MODEL_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const handleSelectedWorkplaceChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SELECTED_WORKPLACE', payload: value });
        dispatch({ type: 'SET_SELECTED_WORKPLACE_STATE', payload: value !== "" ? 'valid' : 'invalid' });
    };

    const handleEmployeeLeaderNameChange = (e) => {
        dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME', payload: e.target.value });
        dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: e.target.value === '' ? 'invalid' : 'valid' });
    };

    const handleEmployeeLeaderNameTouch = () => {
        dispatch({ type: 'TOUCH_EMPLOYEE_LEADER_NAME' });
    };

    const handleIsEmployeeLeaderTouch = () => {
        dispatch({ type: 'TOUCH_IS_EMPLOYEE_LEADER' });
    };

    const handleIsEmployeeLeader = () => {
        dispatch({ type: 'SET_IS_EMPLOYEE_LEADER', payload: !state.isEmployeeLeader });
        dispatch({ type: 'SET_HAS_EMPLOYEE_LEADER', payload: false });
        dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: null });
        dispatch({ type: 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT', payload: false });
        dispatch({ type: 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT', payload: false });
    };

    const handleHasEmployeeLeader = () => {
        dispatch({ type: 'SET_HAS_EMPLOYEE_LEADER', payload: !state.hasEmployeeLeader });
        dispatch({ type: 'SET_IS_EMPLOYEE_LEADER', payload: false });
        dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: null });
        dispatch({ type: 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT', payload: false });
        dispatch({ type: 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT', payload: false });
    };

    const handleClear = () => {
        dispatch({ type: 'RESET_COLLABORATOR_DATA' });
        localStorage.removeItem('collaboratorData');
        setCepTouched(false);
        handleIsLoadingContractDetailsEmployeeToUpdateData(false);
    };

    const handleTimeChange = (typeTime, typeTimeState) => (e) => {
        const value = e.target.value;
        dispatch({ type: typeTime, payload: value });
        if (value === "" || value.includes("_")) {
            dispatch({ type: typeTimeState, payload: "invalid" });
        } else {
            dispatch({ type: typeTimeState, payload: "valid" });
        }
    };

    const handleEmployeeEntryTimeTouch = () => {
        dispatch({ type: 'TOUCH_EMPLOYEE_ENTRY_TIME' });
    };

    const handleEmployeeStartBreakTimeTouch = () => {
        dispatch({ type: 'TOUCH_EMPLOYEE_START_BREAK_TIME' });
    };

    const handleEmployeeStopBreakTimeTouch = () => {
        dispatch({ type: 'TOUCH_EMPLOYEE_STOP_BREAK_TIME' });
    };

    const handleEmployeeDepartureTimeTouch = () => {
        dispatch({ type: 'TOUCH_EMPLOYEE_DEPARTURE_TIME' });
    };

    const handleToggleChange = () => {
        dispatch({
            type: 'SET_EMPLOYEE_STATUS',
            payload: !state.collaboratorData.employeeStatus,
        });
    };

    const handleEmployeeStatusTouch = () => {
        dispatch({ type: 'TOUCH_EMPLOYEE_STATUS' });
    };

    const handleCEPChange = (e) => {
        const newValue = e.target.value;
        handleSaveCEP(newValue);

        if (!cepTouched) {
            setCepTouched(true);
            setFieldTouchStatus((prev) => ({
                ...prev,
                customerZipCode: { ...prev.customerZipCode, touched: true },
            }));
        }
    };

    const isDataLoaded =
        employeeIdToUpdate &&
        isLoadingContractDetailsEmployeeToUpdateData &&
        !isLoadingDetailsSelectedEmployeeData &&
        state.collaboratorData.departmentDataList.length > 0 &&
        state.collaboratorData.roleDataList.length > 0 &&
        state.collaboratorData.functionDataList.length > 0 &&
        state.collaboratorData.contractTypeDataList.length > 0 &&
        state.collaboratorData.workModelDataList.length > 0 &&
        state.collaboratorData.workplaceDataList.length > 0;


    useEffect(() => {
        if (!state || !state.collaboratorData) return;

        let isMounted = true;

        const controllers = {
            //employeeAndRoleData: new AbortController(),
            contractType: new AbortController(),
            workModel: new AbortController(),
            workplace: new AbortController(),
            department: new AbortController(),
            role: new AbortController(),
            functionData: new AbortController(),
        };

        const safeDispatch = (type, payload) => {
            if (isMounted && dispatch) {
                dispatch({ type, payload });
            }
        };

        // const fetchEmployeeAndRoleData = async () => {
        //     if (state.collaboratorData.employeeAndRoleDataList.length === 0 || state.collaboratorData.hasDepartmentSelected) {
        //         await employeeAndRoleDataSearchAndProcess(
        //             useFindAllEmployeeAndRole,
        //             (data) => safeDispatch('SET_EMPLOYEE_AND_ROLE_DATA_LIST', data),
        //             state.collaboratorData.selectedDepartmentId,
        //             (status) => safeDispatch('SET_HAS_DEPARTMENT_SELECTED', status),
        //             (id) => safeDispatch('SET_SELECTED_DEPARTMENT_ID', id),
        //             { signal: controllers.employeeAndRoleData.signal },
        //             dispatch
        //         );
        //     }
        // }

        const fetchContractTypeData = async () => {
            if (state.collaboratorData.contractTypeDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllTypeContract,
                    (data) => safeDispatch('SET_CONTRACT_TYPE_DATA_LIST', data),
                    'contractType',
                    'EmployeeUserRegister',
                    { signal: controllers.contractType.signal },
                );
            }
        }

        const fetchWorkModelData = async () => {
            if (state.collaboratorData.workModelDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllWorkModels,
                    (data) => safeDispatch('SET_WORK_MODEL_DATA_LIST', data),
                    'workModel',
                    'EmployeeUserRegister',
                    { signal: controllers.workModel.signal },
                );
            }
        }

        const fetchWorkplaceData = async () => {
            if (state.collaboratorData.workplaceDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllWorkplaces,
                    (data) => safeDispatch('SET_WORKPLACE_DATA_LIST', data),
                    'workplace',
                    'EmployeeUserRegister',
                    { signal: controllers.workplace.signal },
                );
            }
        }

        const fetchDepartmentData = async () => {
            if (state.collaboratorData.departmentDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllDepartments,
                    (data) => safeDispatch('SET_DEPARTMENT_DATA_LIST', data),
                    'department',
                    'EmployeeUserRegister',
                    { signal: controllers.department.signal },
                );
            }
        }

        const fetchRoleData = async () => {
            if (state.collaboratorData.roleDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllRoles,
                    (data) => safeDispatch('SET_ROLE_DATA_LIST', data),
                    'role',
                    'EmployeeUserRegister',
                    { signal: controllers.role.signal },
                );
            }
        }

        const fetchFunctionData = async () => {
            if (state.collaboratorData.functionDataList.length === 0) {
                await employmentContractDataSearchAndProcess(
                    useFindAllFunctions,
                    (data) => safeDispatch('SET_FUNCTION_DATA_LIST', data),
                    'function',
                    'EmployeeUserRegister',
                    { signal: controllers.functionData.signal },
                );
            }
        }

        const fetchAllData = async () => {
            //fetchEmployeeAndRoleData();
            fetchContractTypeData();
            fetchWorkModelData();
            fetchWorkplaceData();
            fetchDepartmentData();
            fetchRoleData();
            fetchFunctionData();
            handleIsLoadingContractDetailsEmployeeToUpdateData(true);
        };

        fetchAllData();

        return () => {
            isMounted = false;
            Object.values(controllers).forEach((controller) => controller.abort());
        };

    }, [dispatch, state.collaboratorData]);

    useEffect(() => {
        if (!employeeIdToUpdate) return;
        if (
            state.collaboratorData.departmentDataList.length === 0 ||
            state.collaboratorData.roleDataList.length === 0 ||
            state.collaboratorData.functionDataList.length === 0 ||
            state.collaboratorData.contractTypeDataList.length === 0 ||
            state.collaboratorData.workModelDataList.length === 0 ||
            state.collaboratorData.workplaceDataList.length === 0
        ) {
            return;
        }


        const fetchCompanyNames = async (employee) => {
            try {
                const companyData = await useFindClientCompany(employee.customerId);
                return companyData.companyName;
            } catch (error) {
                console.error(`Error fetching employee data for customerId ${employee.customerId}:`, error);
                return 'Desconhecida';
            }
        };

        const fetchEmployeeById = async () => {
            try {
                const foundEmployee = await useFindEmployee(employeeIdToUpdate);
                const employeeCompanyName = await fetchCompanyNames(foundEmployee);

                dispatch({ type: 'SET_EMPLOYEE_COMPANY_NAME', payload: employeeCompanyName });

                dispatch({ type: 'SET_FIRST_NAME', payload: foundEmployee.name });
                dispatch({ type: 'SET_LAST_NAME', payload: foundEmployee.lastName });
                dispatch({ type: 'SET_EMAIL_ADDRESS', payload: foundEmployee.email });
                dispatch({ type: 'SET_PHONE_NUMBER', payload: foundEmployee.phoneNumber });
                dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME', payload: foundEmployee.LeaderName });
                dispatch({ type: 'SET_EMPLOYEE_STATUS', payload: foundEmployee.status });

                if (foundEmployee.isLead === true) {
                    dispatch({ type: 'SET_IS_EMPLOYEE_LEADER', payload: true });
                    dispatch({ type: 'SET_HAS_EMPLOYEE_LEADER', payload: false });
                } else if (foundEmployee.isLead === false) {
                    dispatch({ type: 'SET_IS_EMPLOYEE_LEADER', payload: false });
                    dispatch({ type: 'SET_HAS_EMPLOYEE_LEADER', payload: true });
                }

                dispatch({ type: 'SET_BIRTHDATE', payload: new Date(foundEmployee.birthdate) });
                setFormattedBirthdate(foundEmployee.birthdate);
            } catch (error) {
                console.error(`Error fetching employee data for ID ${employeeIdToUpdate}:`, error);
            }
        }

        const fetchEmployeeAndContractDetailsById = async () => {
            try {
                const foundContractDetails = await useFindEmployeeContractDetails(employeeIdToUpdate);

                dispatch({ type: 'SET_EMPLOYEE_ENTRY_TIME', payload: foundContractDetails.entryTime });
                dispatch({ type: 'SET_EMPLOYEE_START_BREAK_TIME', payload: foundContractDetails.startBreakTime });
                dispatch({ type: 'SET_EMPLOYEE_STOP_BREAK_TIME', payload: foundContractDetails.endBreakTime });
                dispatch({ type: 'SET_EMPLOYEE_DEPARTURE_TIME', payload: foundContractDetails.departureTime });

                if (state.collaboratorData.departmentDataList.length > 0) {
                    selectedListItemToUpdate(
                        dispatch,
                        String(foundContractDetails.departmentId),
                        state.collaboratorData.departmentDataList,
                        'SET_SELECTED_DEPARTMENT',
                        'SET_EMPLOYEE_DEPARTMENT',
                        'SET_EMPLOYEE_DEPARTMENT_STATE',
                        'SET_SELECTED_DEPARTMENT_ID',
                        'SET_HAS_DEPARTMENT_SELECTED',
                        'id',
                    );
                }
                if (state.collaboratorData.roleDataList.length > 0) {
                    selectedListItemToUpdate(
                        dispatch,
                        String(foundContractDetails.rolesId),
                        state.collaboratorData.roleDataList,
                        'SET_SELECTED_ROLE',
                        'SET_EMPLOYEE_ROLE',
                        'SET_EMPLOYEE_ROLE_STATE'
                    );
                }
                if (state.collaboratorData.functionDataList.length > 0) {
                    selectedListItemToUpdate(
                        dispatch,
                        String(foundContractDetails.employeeFunctionId),
                        state.collaboratorData.functionDataList,
                        'SET_SELECTED_FUNCTION',
                        'SET_EMPLOYEE_FUNCTION',
                        'SET_EMPLOYEE_FUNCTION_STATE'
                    );
                }
                if (state.collaboratorData.contractTypeDataList.length > 0) {
                    selectedListItemToUpdate(
                        dispatch,
                        String(foundContractDetails.contractTypeId),
                        state.collaboratorData.contractTypeDataList,
                        'SET_SELECTED_CONTRACT_TYPE',
                        'SET_EMPLOYEE_CONTRACT_TYPE',
                        'SET_EMPLOYEE_CONTRACT_TYPE_STATE'
                    );
                }
                if (state.collaboratorData.workModelDataList.length > 0) {
                    selectedListItemToUpdate(
                        dispatch,
                        String(foundContractDetails.contractModelId),
                        state.collaboratorData.workModelDataList,
                        'SET_SELECTED_WORK_MODEL',
                        'SET_EMPLOYEE_WORK_MODEL',
                        'SET_EMPLOYEE_WORK_MODEL_STATE'
                    );
                }
                if (state.collaboratorData.workplaceDataList.length > 0) {
                    selectedListItemToUpdate(
                        dispatch,
                        String(foundContractDetails.workplaceId),
                        state.collaboratorData.workplaceDataList,
                        'SET_SELECTED_WORKPLACE',
                        'SET_EMPLOYEE_WORKPLACE',
                        'SET_EMPLOYEE_WORKPLACE_STATE'
                    );
                }
                console.log("FoundContractDetails: ", foundContractDetails);
                dispatch({ type: 'SET_EMPLOYEE_ADMISSION_DATE', payload: new Date(foundContractDetails.adimissionDate) });
                setFormattedEmployeeAdmission(foundContractDetails.adimissionDate);
                setIsPreloadingSelection(false);
            } catch (error) {
                console.error(`Error fetching employee contract details for ID ${employeeIdToUpdate}:`, error);
            }
        }

        const loadData = async () => {
            handleIsLoadingDetailsSelectedEmployeeData(true);
            await fetchEmployeeById();
            await fetchEmployeeAndContractDetailsById();
            handleIsLoadingDetailsSelectedEmployeeData(false);
        }

        loadData();

    }, [
        dispatch,
        employeeIdToUpdate,
        state.collaboratorData.departmentDataList,
        state.collaboratorData.roleDataList,
        state.collaboratorData.functionDataList,
        state.collaboratorData.contractTypeDataList,
        state.collaboratorData.workModelDataList,
        state.collaboratorData.workplaceDataList,
    ]);

    useEffect(() => {
        if (
            state.collaboratorData.selectedDepartment &&
            state.collaboratorData.selectedRole &&
            state.collaboratorData.selectedFunction &&
            state.collaboratorData.selectedContractType &&
            state.collaboratorData.selectedWorkModel &&
            state.collaboratorData.selectedWorkplace
        ) {
            setIsPreloadingSelection(false);
        }
    }, [
        state.collaboratorData.selectedDepartment,
        state.collaboratorData.selectedRole,
        state.collaboratorData.selectedFunction,
        state.collaboratorData.selectedContractType,
        state.collaboratorData.selectedWorkModel,
        state.collaboratorData.selectedWorkplace
    ]);

    useEffect(() => {
        if (isShouldUpdateEmployee) {
            handleValidateUpdateEmployeeForm(
                handleOpenEmployeeModal,
                state.collaboratorData.firstName,
                state.collaboratorData.lastName,
                formattedBirthdate,
                state.collaboratorData.emailAddress,
                state.collaboratorData.phoneNumber,
                state.collaboratorData.employeeLeaderName,
                state.collaboratorData.isEmployeeLeader,
                state.collaboratorData.hasEmployeeLeader,
                state.collaboratorData.employeeStatus,
                state.collaboratorData.employeeDepartment,
                state.collaboratorData.employeeRole,
                state.collaboratorData.employeeFunction,
                state.collaboratorData.employeeContractType,
                state.collaboratorData.employeeWorkModel,
                state.collaboratorData.employeeWorkplace,
                formattedEmployeeAdmission,
                state.collaboratorData.employeeEntryTime,
                state.collaboratorData.employeeStartBreakTime,
                state.collaboratorData.employeeStopBreakTime,
                state.collaboratorData.employeeDepartureTime,
                handleEmployeeIdToUpdate,
                handleEmployeeIdStatusCleanupToUpdate,
                handleClear
            );
            handleIsShouldUpdateEmployee();
        }
    }, [isShouldUpdateEmployee, state.collaboratorData]);

    if (!isDataLoaded || isPreloadingSelection) {
        return (
            <Row className="justify-content-center align-items-center">
                <div className="col">
                    <div className="card-wrapper">
                        <h3>Carregando...</h3>
                    </div>
                </div>
            </Row>
        );
    }

    return (
        <Row>
            <div className="col">
                <div className="card-wrapper">
                    <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeIdNumber"
                            >
                                Nome da Empresa
                            </label>
                            <Input
                                id="validationEmployeeIdNumber"
                                placeholder="Nome da Empresa"
                                type="text"
                                value={state.collaboratorData.employeeCompanyName || ''}
                                disabled
                            />
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeFirstName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationEmployeeFirstName"
                                placeholder="Nome"
                                type="text"
                                value={state.collaboratorData.firstName || ''}
                                valid={state.collaboratorData.firstNameState === 'valid'}
                                invalid={state.collaboratorData.firstNameState === 'invalid'}
                                onChange={handleFirstNameChange}
                                onFocus={handleFirstNameTouch}
                            />
                            {state.collaboratorData.firstNameState === 'invalid' && (
                                <div className="invalid-feedback">Nome é obrigatório.</div>
                            )}
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeLastName"
                            >
                                Sobrenome
                            </label>
                            <Input
                                id="validationEmployeeLastName"
                                placeholder="Sobrenome"
                                type="text"
                                value={state.collaboratorData.lastName || ''}
                                valid={state.collaboratorData.lastNameState === 'valid'}
                                invalid={state.collaboratorData.lastNameState === 'invalid'}
                                onChange={handleLastNameChange}
                                onFocus={handleLastNameTouch}
                            />
                            {state.collaboratorData.lastNameState === 'invalid' && (
                                <div className="invalid-feedback">Sobrenome é obrigatório.</div>
                            )}
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeBirthdate"
                            >
                                Data de Nascimento
                            </label>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "__/__/__",
                                }}
                                timeFormat={false}
                                dateFormat="DD/MM/YYYY"
                                value={state.collaboratorData.birthdate || ''}
                                onChange={(e) => handleDateFormatting(
                                    dispatch,
                                    e,
                                    'SET_BIRTHDATE',
                                    'SET_BIRTHDATE_STATE',
                                    setFormattedBirthdate
                                )}
                            />
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeeEmailAddress"
                            >
                                Email
                            </label>
                            <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationEmployeeEmailAddress"
                                placeholder="Endereço de e-mail"
                                type="email"
                                value={state.collaboratorData.emailAddress}
                                valid={state.collaboratorData.emailAddressState === 'valid'}
                                invalid={state.collaboratorData.emailAddressState === 'invalid'}
                                onChange={handleEmailChange}
                                onFocus={handleEmailTouch}
                            />
                            {state.collaboratorData.emailAddressState === 'invalid' && (
                                <div className="invalid-feedback">Forneça um email válido.</div>
                            )}
                        </Col>
                        <Col className="mb-3" md="4">
                            <label
                                className="form-control-label"
                                htmlFor="validationEmployeePhoneNumber"
                            >
                                Número de Telefone
                            </label>
                            <InputMask
                                placeholder='+55 (99) 9 9999-9999'
                                mask="+55 (99) 9 9999-9999"
                                maskChar=" "
                                value={state.collaboratorData.phoneNumber}
                                onChange={onPhoneNumberChange}
                                onFocus={handlePhoneTouch}
                            >
                                {(inputProps) => <Input {...inputProps}
                                    id="validationEmployeePhoneNumber"
                                    type="text"
                                    valid={state.collaboratorData.phoneNumberState === "valid"}
                                    invalid={state.collaboratorData.phoneNumberState === "invalid"}
                                />}
                            </InputMask>
                            {state.collaboratorData.phoneNumberState === "invalid" && (
                                <div className="invalid-feedback">É necessário preencher este campo.</div>
                            )}
                        </Col>
                    </div>
                    <hr />
                    <div className="form-row">
                        {state.collaboratorData.departmentDataList.length > 0 &&
                            state.collaboratorData.roleDataList.length > 0 &&
                            state.collaboratorData.functionDataList.length > 0 && (
                                <>
                                    <Col className="mb-3" md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationFromDepartmentWhichEmployeeReports"
                                        >
                                            Departamento
                                        </label>
                                        <Select2
                                            id="validationFromDepartmentWhichEmployeeReports"
                                            className="form-control"
                                            data-minimum-results-for-search="Infinity"
                                            options={{
                                                placeholder: "Selecione o departamento",
                                            }}

                                            value={state.collaboratorData.selectedDepartment || ''}
                                            onChange={handleSelectedDepartmentChange}
                                            data={state.collaboratorData.departmentDataList}
                                            onSelect={(e) => {
                                                const selectedValue = e.target.value;
                                                handleSelectionEmploymentContractDataWithReducer(
                                                    dispatch,
                                                    selectedValue,
                                                    Array.isArray(state.collaboratorData.departmentDataList)
                                                        ? state.collaboratorData.departmentDataList
                                                        : [],
                                                    'SET_SELECTED_DEPARTMENT',
                                                    'SET_EMPLOYEE_DEPARTMENT',
                                                    'SET_EMPLOYEE_DEPARTMENT_STATE',
                                                    'SET_SELECTED_DEPARTMENT_ID',
                                                    'SET_HAS_DEPARTMENT_SELECTED',
                                                    'id',
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col className="mb-3" md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationEmployeeRole"
                                        >
                                            Cargo
                                        </label>
                                        <Select2
                                            id="validationEmployeeRole"
                                            data-minimum-results-for-search="Infinity"
                                            className="form-control"
                                            options={{
                                                placeholder: "Selecione o cargo",
                                            }}
                                            value={state.collaboratorData.selectedRole || ''}
                                            onChange={handleSelectedRoleChange}
                                            data={state.collaboratorData.roleDataList}
                                            onSelect={(e) => {
                                                const selectedValue = e.target.value;
                                                handleSelectionEmploymentContractDataWithReducer(
                                                    dispatch,
                                                    selectedValue,
                                                    Array.isArray(state.collaboratorData.roleDataList)
                                                        ? state.collaboratorData.roleDataList
                                                        : [],
                                                    'SET_SELECTED_ROLE',
                                                    'SET_EMPLOYEE_ROLE',
                                                    'SET_EMPLOYEE_ROLE_STATE',
                                                    null,
                                                    null,
                                                    'id',
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col className="mb-3" md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationEmployeeFunction"
                                        >
                                            Função
                                        </label>
                                        <Select2
                                            id="validationEmployeeFunction"
                                            data-minimum-results-for-search="Infinity"
                                            className="form-control"
                                            options={{
                                                placeholder: "Selecione o função",
                                            }}
                                            value={state.collaboratorData.selectedFunction || ''}
                                            onChange={handleSelectedFunctionChange}
                                            data={state.collaboratorData.functionDataList}
                                            onSelect={(e) => {
                                                const selectedValue = e.target.value;
                                                handleSelectionEmploymentContractDataWithReducer(
                                                    dispatch,
                                                    selectedValue,
                                                    Array.isArray(state.collaboratorData.functionDataList)
                                                        ? state.collaboratorData.functionDataList
                                                        : [],
                                                    'SET_SELECTED_FUNCTION',
                                                    'SET_EMPLOYEE_FUNCTION',
                                                    'SET_EMPLOYEE_FUNCTION_STATE',
                                                    null,
                                                    null,
                                                    'id',
                                                );
                                            }}
                                        />
                                    </Col>
                                </>
                            )}
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationLeader"
                            >
                                Exerce liderança
                            </label>
                            <Row className="mt-3">
                                <Col md="6">
                                    <div className={`custom-control custom-radio mb-3 ${state.collaboratorData.isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}>
                                        <input
                                            className={`custom-control-input ${state.collaboratorData.isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}
                                            id="validationEmployeeIsLeader"
                                            type="radio"
                                            name="custom-radio-leader"
                                            checked={state.collaboratorData.isEmployeeLeader}
                                            onChange={handleIsEmployeeLeader}
                                            onFocus={handleIsEmployeeLeaderTouch}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="validationEmployeeIsLeader"
                                        >
                                            Sim
                                        </label>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className={`custom-control custom-radio mb-3 ${state.collaboratorData.isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}>
                                        <input
                                            className={`custom-control-input ${state.collaboratorData.isInvalidEmployeeLeaderComponent ? 'is-invalid' : ''}`}
                                            id="validationEmployeeNoLeader"
                                            type="radio"
                                            name="custom-radio-leader"
                                            checked={state.collaboratorData.hasEmployeeLeader}
                                            onChange={handleHasEmployeeLeader}
                                            onFocus={handleIsEmployeeLeaderTouch}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="validationEmployeeNoLeader"
                                        >
                                            Não
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            {state.collaboratorData.showErrorFeedbackEmployeeLeaderComponent && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    Necessário selecionar uma das opções, indicando se o colaborador exerce ou não liderança
                                </div>
                            )}
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationSelectLeader"
                            >
                                Liderado por
                            </label>
                            <Input
                                id="validationSelectLeader"
                                placeholder="Nome do líder"
                                type="text"
                                value={state.collaboratorData.employeeLeaderName}
                                valid={state.collaboratorData.employeeLeaderNameState === "valid"}
                                invalid={state.collaboratorData.employeeLeaderNameState === "invalid"}
                                onChange={handleEmployeeLeaderNameChange}
                                onFocus={handleEmployeeLeaderNameTouch}
                            />
                            {state.collaboratorData.hasEmployeeLeader && !state.collaboratorData.employeeLeaderName?.value && (
                                <div className="invalid-feedback">É necessário preencher este campo.</div>
                            )}
                        </Col>
                    </div>
                    <hr />
                    {state.collaboratorData.contractTypeDataList.length > 0 &&
                        state.collaboratorData.workModelDataList.length > 0 &&
                        state.collaboratorData.workplaceDataList.length > 0 && (
                            <>
                                <div className="form-row">
                                    <Col className="mb-3" md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationContractType"
                                        >
                                            Tipo de Contrato
                                        </label>
                                        <Select2
                                            id="validationContractType"
                                            className="form-control"
                                            data-minimum-results-for-search="Infinity"
                                            options={{
                                                placeholder: "Selecione o tipo de contrato",
                                            }}
                                            value={state.collaboratorData.selectedContractType || ''}
                                            onChange={handleSelectedContractTypeChange}
                                            data={state.collaboratorData.contractTypeDataList}
                                            onSelect={(e) => {
                                                const selectedValue = e.target.value;
                                                handleSelectionEmploymentContractDataWithReducer(
                                                    dispatch,
                                                    selectedValue,
                                                    Array.isArray(
                                                        state.collaboratorData.contractTypeDataList)
                                                        ? state.collaboratorData.contractTypeDataList
                                                        : [],
                                                    'SET_SELECTED_CONTRACT_TYPE',
                                                    'SET_EMPLOYEE_CONTRACT_TYPE',
                                                    'SET_EMPLOYEE_CONTRACT_TYPE_STATE',
                                                    null,
                                                    null,
                                                    'id',
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col className="mb-3" md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationWorkModel"
                                        >
                                            Modelo de Trabalho
                                        </label>
                                        <Select2
                                            id="validationWorkModel"
                                            className="form-control"
                                            data-minimum-results-for-search="Infinity"
                                            options={{
                                                placeholder: "Selecione o modelo de trabalho",
                                            }}
                                            value={state.collaboratorData.selectedWorkModel || ''}
                                            onChange={handleSelectedWorkModelChange}
                                            data={state.collaboratorData.workModelDataList}
                                            onSelect={(e) => {
                                                const selectedValue = e.target.value;
                                                handleSelectionEmploymentContractDataWithReducer(
                                                    dispatch,
                                                    selectedValue,
                                                    Array.isArray(state.collaboratorData.workModelDataList)
                                                        ? state.collaboratorData.workModelDataList
                                                        : [],
                                                    'SET_SELECTED_WORK_MODEL',
                                                    'SET_EMPLOYEE_WORK_MODEL',
                                                    'SET_EMPLOYEE_WORK_MODEL_STATE',
                                                    null,
                                                    null,
                                                    'id',
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col className="mb-3" md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationAdmissionDate"
                                        >
                                            Data de Admissão
                                        </label>
                                        <ReactDatetime
                                            inputProps={{ placeholder: "__/__/__" }}
                                            timeFormat={false}
                                            dateFormat="DD/MM/YYYY"
                                            value={state.collaboratorData.employeeAdmissionDate || ''}
                                            onChange={(e) => handleDateFormatting(
                                                dispatch,
                                                e,
                                                'SET_EMPLOYEE_ADMISSION_DATE',
                                                'SET_EMPLOYEE_ADMISSION_DATE_STATE',
                                                setFormattedEmployeeAdmission
                                            )}
                                        />
                                    </Col>
                                </div>
                                <div className="form-row">
                                    <Col className="mb-3" md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationWorkplace"
                                        >
                                            Local de Trabalho
                                        </label>
                                        <Select2
                                            id="validatingWorkplace"
                                            className="form-control"
                                            data-minimum-results-for-search="Infinity"
                                            options={{
                                                placeholder: "Selecione o local de trabalho",
                                            }}
                                            value={state.collaboratorData.selectedWorkplace || ''}
                                            onChange={handleSelectedWorkplaceChange}
                                            data={state.collaboratorData.workplaceDataList}
                                            onSelect={(e) => {
                                                const selectedValue = e.target.value;
                                                handleSelectionEmploymentContractDataWithReducer(
                                                    dispatch,
                                                    selectedValue,
                                                    Array.isArray(state.collaboratorData.workplaceDataList)
                                                        ? stateLegalEntityRegistration.legalEntityRegistrationData.companyTypesDataList
                                                        : [],
                                                    'SET_SELECTED_WORKPLACE',
                                                    'SET_EMPLOYEE_WORKPLACE',
                                                    'SET_EMPLOYEE_WORKPLACE_STATE',
                                                    null,
                                                    null,
                                                    'id',
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col className="mb-3" md="2">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationEntryTime"
                                        >
                                            Hora de Entrada
                                        </label>
                                        <InputMask
                                            mask="99:99:99"
                                            placeholder="00:00:00"
                                            value={state.collaboratorData.employeeEntryTime || ''}
                                            onChange={handleTimeChange('SET_EMPLOYEE_ENTRY_TIME', 'SET_EMPLOYEE_ENTRY_TIME_STATE')}
                                            onFocus={handleEmployeeEntryTimeTouch}
                                        >
                                            {(inputProps) => <Input {...inputProps}
                                                id="validationEntryTime"
                                                type="text"
                                                valid={state.collaboratorData.employeeEntryTimeState === "valid"}
                                                invalid={state.collaboratorData.employeeEntryTimeState === "invalid"}
                                            />}
                                        </InputMask>
                                        <div className="invalid-feedback">
                                            {state.collaboratorData.employeeEntryTimeState === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
                                        </div>
                                    </Col>
                                    <Col className="mb-3" md="2">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationStartBreakTime"
                                        >
                                            Intervalo
                                        </label>
                                        <InputMask
                                            mask="99:99:99"
                                            placeholder="00:00:00"
                                            value={state.collaboratorData.employeeStartBreakTime || ''}
                                            onChange={handleTimeChange('SET_EMPLOYEE_START_BREAK_TIME', 'SET_EMPLOYEE_START_BREAK_TIME_STATE')}
                                            onFocus={handleEmployeeStartBreakTimeTouch}
                                        >
                                            {(inputProps) => (
                                                <Input
                                                    {...inputProps}
                                                    id="validationStartBreakTime"
                                                    type="text"
                                                    valid={state.collaboratorData.employeeStartBreakTimeState === "valid"}
                                                    invalid={state.collaboratorData.employeeStartBreakTimeState === "invalid"}
                                                />
                                            )}
                                        </InputMask>
                                        <div className="invalid-feedback">
                                            {state.collaboratorData.employeeStartBreakTime === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
                                        </div>
                                    </Col>
                                    <Col className="mb-3" md="2">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationStopBreakTime"
                                        >
                                            Fim do Intervalo
                                        </label>
                                        <InputMask
                                            mask="99:99:99"
                                            placeholder="00:00:00"
                                            value={state.collaboratorData.employeeStopBreakTime || ''}
                                            onChange={handleTimeChange('SET_EMPLOYEE_STOP_BREAK_TIME', 'SET_EMPLOYEE_STOP_BREAK_TIME_STATE')}
                                            onFocus={handleEmployeeStopBreakTimeTouch}
                                        >
                                            {(inputProps) => (
                                                <Input
                                                    {...inputProps}
                                                    id="validationStopBreakTime"
                                                    type="text"
                                                    valid={state.collaboratorData.employeeStopBreakTimeState === "valid"}
                                                    invalid={state.collaboratorData.employeeStopBreakTimeState === "invalid"}
                                                />
                                            )}
                                        </InputMask>
                                        <div className="invalid-feedback">
                                            {state.collaboratorData.employeeStopBreakTimeState === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
                                        </div>
                                    </Col>
                                    <Col className="mb-3" md="2">
                                        <label
                                            className="form-control-label"
                                            htmlFor="validationDepartureTime"
                                        >
                                            Horário de Saída
                                        </label>
                                        <InputMask
                                            mask="99:99:99"
                                            placeholder="00:00:00"
                                            value={state.collaboratorData.employeeDepartureTime || ''}
                                            onChange={handleTimeChange('SET_EMPLOYEE_DEPARTURE_TIME', 'SET_EMPLOYEE_DEPARTURE_TIME_STATE')}
                                            onFocus={handleEmployeeDepartureTimeTouch}
                                        >
                                            {(inputProps) => (
                                                <Input
                                                    {...inputProps}
                                                    id="validationDepartureTime"
                                                    type="text"
                                                    valid={state.collaboratorData.employeeDepartureTimeState === "valid"}
                                                    invalid={state.collaboratorData.employeeDepartureTimeState === "invalid"}
                                                />
                                            )}
                                        </InputMask>
                                        <div className="invalid-feedback">
                                            {state.collaboratorData.employeeDepartureTimeState === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
                                        </div>
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
                                                    checked={state.collaboratorData.employeeStatus || ''}
                                                    onChange={handleToggleChange}
                                                    onFocus={handleEmployeeStatusTouch}
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
                            </>
                        )}
                </div>
            </div>
        </Row >
    );
}

EmployeeUserUpdate.defaultProps = {
    handleShowEmployeeDetailsModal: () => { },
    handleOpenEmployeeModal: () => { },
    modalOpen: false,
    employeeName: '',
    handleCleaningEmployeeNameStatus: () => { },
    companyNameToModalDetails: '',
};

EmployeeUserUpdate.propTypes = {
    handleShowEmployeeDetailsModal: PropTypes.func,
    handleOpenEmployeeModal: PropTypes.func,
    modalOpen: PropTypes.bool,
    employeeName: PropTypes.string,
    handleCleaningEmployeeNameStatus: PropTypes.func,
    companyNameToModalDetails: PropTypes.string
};

export default EmployeeUserUpdate;