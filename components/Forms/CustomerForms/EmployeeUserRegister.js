import React, { useCallback, useEffect, useReducer, useRef } from "react";
import dynamic from "next/dynamic";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    Form,
    Input,
    Row,
} from "reactstrap";
import useCreateEmployee from '../../../hooks/RecordsHooks/employee/useCreateEmployee';
import InputMask from 'react-input-mask';
import { useFindAllEmployeeAndRole } from '../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllEmployeeAndRole';
import { useFindAllTypeContract } from '../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllTypeContract';
import { useFindAllWorkModels } from '../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllWorkModels';
import { useFindAllWorkplaces } from '../../../hooks/RecordsHooks/featuresEmploymentContract/useFindAllWorkplaces';
import { useFindAllDepartments } from '../../../hooks/RecordsHooks/department/useFindAllDepartments';
import { useFindAllRoles } from '../../../hooks/RecordsHooks/role/useFindAllRoles';
import { useFindAllFunctions } from '../../../hooks/RecordsHooks/employeeFunction/useFindAllFunctions';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import { initialState, formReducer } from '../../../reducers/employeeFormReducer';
import { handleDateFormatting } from "../../../util/handleDateFormatting";

function EmployeeUserRegister({ handleShowEmployeeUserRegister }) {

    const [state, dispatch] = useReducer(formReducer, initialState);

    const latestCollaboratorData = useRef(state.collaboratorData);

    const {
        handleValidateAddEmployeeForm,
        validateAddEmployeeAddressForm,
        handleFormFieldsAutocomplete,
        hasValuesChangedWithAPIData,
        handleValuesChangedWithAPIData,
    } = useCreateEmployee(state, dispatch);

    // async function employeeAndRoleDataSearchAndProcess(apiCall, departamentId, dispatch) {
    //     if (!departamentId || departamentId === '') {
    //         // Se o departamento não estiver selecionado, defina uma mensagem padrão
    //         dispatch({
    //             type: 'SET_EMPLOYEE_AND_ROLE_DATA_LIST',
    //             payload: [{ id: "0", text: "Não há líderes, é necessário cadastrar colaboradores que exercem liderança." }]
    //         });
    //         dispatch({ type: 'SET_HAS_DEPARTMENT_SELECTED', payload: false });
    //         dispatch({ type: 'SET_SELECTED_DEPARTMENT_ID', payload: '' });
    //     } else {
    //         try {
    //             const response = await apiCall(departamentId);

    //             if (response && response.length > 0) {
    //                 const dataObject = response.map((employee, index) => {
    //                     const nameAndRoleConcat = `${employee.EmployeeName} - ${employee.RoleName}`;
    //                     return {
    //                         id: index.toString(),
    //                         text: nameAndRoleConcat
    //                     };
    //                 });
    //                 console.log("dataObject: ", dataObject);

    //                 dispatch({ type: 'SET_EMPLOYEE_AND_ROLE_DATA_LIST', payload: dataObject });
    //                 dispatch({ type: 'SET_HAS_DEPARTMENT_SELECTED', payload: false });
    //                 dispatch({ type: 'SET_SELECTED_DEPARTMENT_ID', payload: '' });
    //             } else {
    //                 dispatch({
    //                     type: 'SET_EMPLOYEE_AND_ROLE_DATA_LIST',
    //                     payload: [{ id: "0", text: "Não há líderes, é necessário cadastrar colaboradores que exercem liderança." }]
    //                 });
    //                 dispatch({ type: 'SET_HAS_DEPARTMENT_SELECTED', payload: false });
    //                 dispatch({ type: 'SET_SELECTED_DEPARTMENT_ID', payload: '' });
    //             }
    //         } catch (error) {
    //             console.error('Erro no pedido: ', error);
    //             dispatch({ type: 'SET_HAS_DEPARTMENT_SELECTED', payload: false });
    //             dispatch({ type: 'SET_SELECTED_DEPARTMENT_ID', payload: '' });
    //         }
    //     }
    // }

    const handleFirstNameChange = (e) => {
        dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value });
        dispatch({ type: 'SET_FIRST_NAME_STATE', payload: e.target.value === '' ? 'invalid' : 'valid' });
    };

    const handleLastNameChange = (e) => {
        dispatch({ type: 'SET_LAST_NAME', payload: e.target.value });
        dispatch({ type: 'SET_LAST_NAME_STATE', payload: e.target.value === '' ? 'invalid' : 'valid' });
    };

    const handleEmailChange = (e) => {
        dispatch({ type: 'SET_EMAIL_ADDRESS', payload: e.target.value });
        const isValidEmail = validateEmail(e.target.value);
        dispatch({ type: 'SET_EMAIL_ADDRESS_STATE', payload: isValidEmail ? 'valid' : 'invalid' });
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

    const onPhoneNumberChange = (e) => {
        const { formattedPhoneNumber, isValid } = handlePhoneNumberChange(e.target.value);

        dispatch({ type: 'SET_PHONE_NUMBER', payload: formattedPhoneNumber });
        dispatch({ type: 'SET_PHONE_NUMBER_STATE', payload: isValid ? 'valid' : 'invalid' });
    };

    const handleSelectedItemOnSelectComponent = (
        selectedId,
        dataList,
        setSelectedAction,
        setFieldAction,
        setStateAction,
        setSelectedDepartmentIdAction = null,
        setHasDepartmentSelectedAction = null,
        savedDataType = 'id'
    ) => {
        // Despache o estado 'valid' antes de iniciar o processo de seleção
        if (setStateAction) dispatch({ type: setStateAction, payload: 'valid' });
        if (setHasDepartmentSelectedAction) dispatch({ type: setHasDepartmentSelectedAction, payload: true });

        // Chama a função de processamento de seleção de dados
        handleSelectionEmploymentContractData(
            selectedId,
            dataList,
            (value) => dispatch({ type: setSelectedAction, payload: value }),
            (value) => dispatch({ type: setFieldAction, payload: value }), // Agora definirá o valor correto
            (state) => dispatch({ type: setStateAction, payload: state }),
            (id) => dispatch({ type: setSelectedDepartmentIdAction, payload: id }),
            () => dispatch({ type: setHasDepartmentSelectedAction, payload: true }),
            savedDataType
        );
    };

    const handleEmployeeLeaderNameChange = (e) => {
        dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME', payload: e.target.value });
        dispatch({ type: 'SET_EMPLOYEE_LEADER_NAME_STATE', payload: e.target.value === '' ? 'invalid' : 'valid' });
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

    const handleTimeChange = (typeTime, typeTimeState) => (e) => {
        const value = e.target.value;
        dispatch({ type: typeTime, payload: value });
        if (value === "" || value.includes("_")) {
            dispatch({ type: typeTimeState, payload: "invalid" });
        } else {
            dispatch({ type: typeTimeState, payload: "valid" });
        }
    };

    // Função para converter string em Date e garantir validade
    const parseDateFromString = (dateString) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day)); // Mês é zero-indexado no JavaScript
    };

    // Função para formatar uma data (Date) em uma string ISO (yyyy-MM-dd)
    const formatDate = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getUTCDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    // Função para manipular e despachar ações de data
    const handleDateChange = (dispatch, value, dateAction, stateAction) => {
        if (value && value._d && !isNaN(value._d)) {
            const dateObj = value._d;
            dispatch({ type: dateAction, payload: dateObj });
            dispatch({ type: stateAction, payload: 'valid' });
        } else {
            dispatch({ type: stateAction, payload: 'invalid' });
        }
    };

    const handleClear = () => {
        dispatch({ type: 'RESET_COLLABORATOR_DATA' });
        localStorage.removeItem('collaboratorData');
    };

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        const dataToSave = {
            ...data,
            birthdate: formatDate(data.birthdate),
            employeeAdmissionDate: formatDate(data.employeeAdmissionDate),
        };
        localStorage.setItem('collaboratorData', JSON.stringify(dataToSave));
    };

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

        //fetchEmployeeAndRoleData();
        fetchContractTypeData();
        fetchWorkModelData();
        fetchWorkplaceData();
        fetchDepartmentData();
        fetchRoleData();
        fetchFunctionData();

        return () => {
            isMounted = false;
            Object.values(controllers).forEach((controller) => controller.abort());
        };

    }, [dispatch, state.collaboratorData]);

    // Carrega os dados do localStorage ao montar o componente
    useEffect(() => {
        let isMounted = true;

        const savedData = localStorage.getItem('collaboratorData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);

            // Garantir que as datas são objetos Date válidos
            const parsedBirthdate = parseDateFromString(parsedData.birthdate);
            const parsedAdmissionDate = parseDateFromString(parsedData.employeeAdmissionDate);

            // Atualizar o payload com objetos Date válidos
            if (isMounted) {
                dispatch({
                    type: 'LOAD_SAVED_COLLABORATOR_DATA',
                    payload: {
                        ...parsedData,
                        birthdate: parsedBirthdate,
                        employeeAdmissionDate: parsedAdmissionDate,
                    },
                });

                latestCollaboratorData.current = parsedData;
            }
        }

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        // Atualiza e salva no localStorage ao alterar o estado do colaborador
        if (isMounted && state && state.collaboratorData) {
            saveDataToLocalStorage(state.collaboratorData);
            latestCollaboratorData.current = state.collaboratorData;
        }

        // Função de limpeza: salva uma última vez ao desmontar o componente
        return () => {
            isMounted = false;
            saveDataToLocalStorage(latestCollaboratorData.current);
        };
    }, [state.collaboratorData]);

    // useEffect(() => {
    //     let isMounted = true;

    //     if (brasilAPICEPData !== null && isMounted) {
    //         handleCEPValidationLoading();
    //         handleFormFieldsAutocomplete(brasilAPICEPData);
    //     }

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [brasilAPICEPData]);

    useEffect(() => {
        let isMounted = true;

        if (hasValuesChangedWithAPIData && isMounted) {
            handleValuesChangedWithAPIData(!hasValuesChangedWithAPIData);
            validateAddEmployeeAddressForm();
        }

        return () => {
            isMounted = false;
        };
    }, [hasValuesChangedWithAPIData, validateAddEmployeeAddressForm]);

    return (
        <Card className="mb-4">
            <CardHeader>
                <h3 className="mb-0">Cadastrar Colaborador</h3>
            </CardHeader>
            <CardBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
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
                            />
                            {state.collaboratorData.firstNameState === 'invalid' && (
                                <div className="invalid-feedback">Nome é obrigatório.</div>
                            )}
                        </Col>
                        <Col className="mb-3" md="6">
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
                                onChange={(value) =>
                                    handleDateChange(dispatch, value, 'SET_BIRTHDATE', 'SET_BIRTHDATE_STATE')
                                }
                                className={state.collaboratorData.birthdateState === 'invalid' ? 'is-invalid' : ''}
                            />
                            {state.collaboratorData.birthdateState === 'invalid' && (
                                <div className="invalid-feedback">Data de nascimento inválida.</div>
                            )}
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
                            >
                                {(inputProps) => (
                                    <Input
                                        {...inputProps}
                                        id="validationEmployeePhoneNumber"
                                        type="text"
                                        valid={state.collaboratorData.phoneNumberState === "valid"}
                                        invalid={state.collaboratorData.phoneNumberState === "invalid"}
                                    />
                                )}
                            </InputMask>
                            {state.collaboratorData.phoneNumberState === "invalid" && (
                                <div className="invalid-feedback">É necessário preencher este campo.</div>
                            )}
                        </Col>
                    </div>
                    <hr />
                    <div className="form-row">
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
                                value={state.collaboratorData.selectedDepartment}
                                data={state.collaboratorData.departmentDataList || []}
                                onSelect={(e) => handleSelectedItemOnSelectComponent(
                                    e.target.value,
                                    Array.isArray(state.collaboratorData.departmentDataList) ? state.collaboratorData.departmentDataList : [],
                                    'SET_SELECTED_DEPARTMENT',
                                    'SET_EMPLOYEE_DEPARTMENT',
                                    'SET_EMPLOYEE_DEPARTMENT_STATE',
                                    'SET_SELECTED_DEPARTMENT_ID',
                                    'SET_HAS_DEPARTMENT_SELECTED',
                                    'id',
                                )}
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
                                value={state.collaboratorData.selectedRole}
                                data={state.collaboratorData.roleDataList}
                                onSelect={(e) => handleSelectedItemOnSelectComponent(
                                    e.target.value,
                                    state.collaboratorData.roleDataList,
                                    'SET_SELECTED_ROLE',
                                    'SET_EMPLOYEE_ROLE',
                                    'SET_EMPLOYEE_ROLE_STATE',
                                    null,
                                    null,
                                    'id',
                                )}
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
                                value={state.collaboratorData.selectedFunction}
                                data={state.collaboratorData.functionDataList}
                                onSelect={(e) => handleSelectedItemOnSelectComponent(
                                    e.target.value,
                                    state.collaboratorData.functionDataList,
                                    'SET_SELECTED_FUNCTION',
                                    'SET_EMPLOYEE_FUNCTION',
                                    'SET_EMPLOYEE_FUNCTION_STATE',
                                    null,
                                    null,
                                    'id',
                                )}
                            />
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationLeader"
                            >
                                Exerce líderança
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
                        <Col className="mb-3" md="5">
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
                                value={state.collaboratorData.employeeLeaderName || ''}
                                valid={state.collaboratorData.employeeLeaderNameState === "valid"}
                                invalid={state.collaboratorData.employeeLeaderNameState === "invalid"}
                                onChange={handleEmployeeLeaderNameChange}
                            />
                            {state.collaboratorData.hasEmployeeLeader && !state.collaboratorData.employeeLeaderName?.value && (
                                <div className="invalid-feedback">É necessário preencher este campo.</div>
                            )}
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center" md="1">
                            <Button className="" color="primary" size="sm" type="button">
                                <i className="fa fa-solid fa-plus" />
                            </Button>
                        </Col>
                    </div>
                    <hr />
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
                                value={state.collaboratorData.selectedContractType}
                                data={state.collaboratorData.contractTypeDataList}
                                onSelect={(e) => handleSelectedItemOnSelectComponent(
                                    e.target.value,
                                    state.collaboratorData.contractTypeDataList,
                                    'SET_SELECTED_CONTRACT_TYPE',
                                    'SET_EMPLOYEE_CONTRACT_TYPE',
                                    'SET_EMPLOYEE_CONTRACT_TYPE_STATE',
                                    null,
                                    null,
                                    'id',
                                )}
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
                                value={state.collaboratorData.selectedWorkModel}
                                data={state.collaboratorData.workModelDataList}
                                onSelect={(e) => handleSelectedItemOnSelectComponent(
                                    e.target.value,
                                    state.collaboratorData.workModelDataList,
                                    'SET_SELECTED_WORK_MODEL',
                                    'SET_EMPLOYEE_WORK_MODEL',
                                    'SET_EMPLOYEE_WORK_MODEL_STATE',
                                    null,
                                    null,
                                    'id',
                                )}
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
                                onChange={(value) =>
                                    handleDateChange(dispatch, value, 'SET_EMPLOYEE_ADMISSION_DATE', 'SET_EMPLOYEE_ADMISSION_DATE_STATE')
                                }
                                className={state.collaboratorData.employeeAdmissionDateState === 'invalid' ? 'is-invalid' : ''}
                            />
                            {state.collaboratorData.employeeAdmissionDateState === 'invalid' && (
                                <div className="invalid-feedback">Data de admissão inválida.</div>
                            )}
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
                                value={state.collaboratorData.selectedWorkplace}
                                data={state.collaboratorData.workplaceDataList}
                                onSelect={(e) => handleSelectedItemOnSelectComponent(
                                    e.target.value,
                                    state.collaboratorData.workplaceDataList,
                                    'SET_SELECTED_WORKPLACE',
                                    'SET_EMPLOYEE_WORKPLACE',
                                    'SET_EMPLOYEE_WORKPLACE_STATE',
                                    null,
                                    null,
                                    'id',
                                )}
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
                                placeholder="08:00:00"
                                value={state.collaboratorData.employeeEntryTime}
                                onChange={handleTimeChange('SET_EMPLOYEE_ENTRY_TIME', 'SET_EMPLOYEE_ENTRY_TIME_STATE')}
                            >
                                {(inputProps) => (
                                    <Input
                                        {...inputProps}
                                        id="validationEntryTime"
                                        type="text"
                                        valid={state.collaboratorData.employeeEntryTimeState === "valid"}
                                        invalid={state.collaboratorData.employeeEntryTimeState === "invalid"}
                                    />
                                )}
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
                                Início do Intervalo
                            </label>
                            <InputMask
                                mask="99:99:99"
                                placeholder="12:00:00"
                                value={state.collaboratorData.employeeStartBreakTime}
                                onChange={handleTimeChange('SET_EMPLOYEE_START_BREAK_TIME', 'SET_EMPLOYEE_START_BREAK_TIME_STATE')}
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
                                {state.collaboratorData.employeeStartBreakTimeState === "invalid" && "Forneça uma hora válida no formato HH:MM:SS."}
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
                                placeholder="13:00:00"
                                value={state.collaboratorData.employeeStopBreakTime}
                                onChange={handleTimeChange('SET_EMPLOYEE_STOP_BREAK_TIME', 'SET_EMPLOYEE_STOP_BREAK_TIME_STATE')}
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
                                placeholder="18:00:00"
                                value={state.collaboratorData.employeeDepartureTime}
                                onChange={handleTimeChange('SET_EMPLOYEE_DEPARTURE_TIME', 'SET_EMPLOYEE_DEPARTURE_TIME_STATE')}
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
                    </div>
                    <Row>
                        <Col md="4" />
                        <Col className="d-flex justify-content-end align-items-center" md="8" >
                            <Button className="px-5" color="primary" size="lg" type="button" onClick={handleClear}>
                                <span
                                    className="btn-inner--text"
                                    onClick={handleClear}
                                >
                                    Limpar
                                </span>
                            </Button>
                            <Button
                                className="px-5"
                                color="success"
                                size="lg"
                                type="button"
                                onClick={() =>
                                    handleValidateAddEmployeeForm(handleShowEmployeeUserRegister)
                                }
                            >
                                <span className="btn-inner--text">Adicionar Colaborador</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    );
}

export default EmployeeUserRegister;