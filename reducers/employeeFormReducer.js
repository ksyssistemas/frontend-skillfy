export const initialState = {
    collaboratorData: {
        employeeCompanyName: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        birthdate: null,
        phoneNumber: '',
        selectedDepartment: '',
        selectedDepartmentState: null,
        selectedRole: '',
        selectedFunction: '',
        selectedContractType: '',
        selectedContractTypeState: null,
        selectedWorkModel: '',
        selectedWorkplace: '',
        selectedEmployeeAndRole: '',
        employeeDepartment: '',
        employeeRole: '',
        employeeFunction: '',
        isEmployeeLeader: false,
        hasEmployeeLeader: false,
        employeeHeadedByList: [],
        isInvalidEmployeeLeaderComponent: false,
        showErrorFeedbackEmployeeLeaderComponent: false,
        employeeContractType: '',
        employeeWorkModel: '',
        employeeWorkplace: '',
        employeeAdmissionDate: null,
        employeeEntryTime: '',
        employeeStartBreakTime: '',
        employeeStopBreakTime: '',
        employeeDepartureTime: '',
        employeeStatus: '',
        selectedDepartmentId: null,
        hasDepartmentSelected: false,
        departmentDataList: [],
        roleDataList: [],
        functionDataList: [],
        contractTypeDataList: [],
        workModelDataList: [],
        workplaceDataList: [],
        employeeAndRoleDataList: null,
        employeeAndRoleRawDataList: [],
        firstNameState: null,
        lastNameState: null,
        emailAddressState: null,
        birthdateState: null,
        phoneNumberState: null,
        employeeAddressState: null,
        employeeAddressNumberState: null,
        employeeAddressComplementState: null,
        employeeNeighborhoodState: null,
        employeeCityState: null,
        federatedUnitState: null,
        employeeDepartmentState: null,
        employeeRoleState: null,
        employeeFunctionState: null,
        employeeHeadedByListState: null,
        employeeContractTypeState: null,
        employeeWorkModelState: null,
        employeeWorkplaceState: null,
        employeeAdmissionDateState: null,
        employeeEntryTimeState: null,
        employeeStartBreakTimeState: null,
        employeeStopBreakTimeState: null,
        employeeDepartureTimeState: null,
        employeeStatusState: null,
        formattedBirthdate: '',
        formattedAdmissionDate: '',
        firstNameTouched: false,
        lastNameTouched: false,
        emailAddressTouched: false,
        birthdateTouched: false,
        phoneNumberTouched: false,
        isEmployeeLeaderTouched: false,
        employeeHeadedByListTouched: false,
        employeeAdmissionDateTouched: false,
        employeeEntryTimeTouched: false,
        employeeStartBreakTimeTouched: false,
        employeeStopBreakTimeTouched: false,
        employeeDepartureTimeTouched: false,
        employeeStatusTouched: false,
    },
};

export const formReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_COLLABORATOR_DATA':
            return {
                ...state,
                collaboratorData: { ...action.payload },
            };
        case 'LOAD_SAVED_COLLABORATOR_DATA':
            return {
                ...state,
                collaboratorData: {
                    ...action.payload,
                },
            };
        case 'RESET_COLLABORATOR_DATA':
            localStorage.removeItem('collaboratorData');
            return {
                ...state,
                collaboratorData: initialState.collaboratorData,
            };
        case 'SET_EMPLOYEE_COMPANY_NAME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeCompanyName: action.payload,
                },
            };
        case 'SET_FIRST_NAME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    firstName: action.payload,
                },
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    lastName: action.payload
                },
            };
        case 'SET_EMAIL_ADDRESS':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    emailAddress: action.payload
                },
            };
        case 'SET_BIRTHDATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    birthdate: action.payload
                },
            };
        case 'SET_PHONE_NUMBER':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    phoneNumber: action.payload
                },
            };
        case 'SET_SELECTED_DEPARTMENT':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedDepartment: action.payload
                },
            };
        case 'SET_SELECTED_DEPARTMENT_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedDepartmentState: action.payload
                },
            };
        case 'SET_SELECTED_ROLE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedRole: action.payload
                },
            };
        case 'SET_SELECTED_FUNCTION':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedFunction: action.payload
                },
            };
        case 'SET_SELECTED_CONTRACT_TYPE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedContractType: action.payload
                },
            };
        case 'SET_SELECTED_CONTRACT_TYPE_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedContractTypeState: action.payload
                },
            };
        case 'SET_SELECTED_WORK_MODEL':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedWorkModel: action.payload
                },
            };
        case 'SET_SELECTED_WORKPLACE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedWorkplace: action.payload
                },
            };
        case "SET_SELECTED_EMPLOYEE_AND_ROLE": {
            let newSelected;

            if (Array.isArray(action.payload)) {
                // 👇 Se for um array vazio, força string "" (para exibir placeholder no Select2)
                newSelected = action.payload.length === 0 ? "" : action.payload;
            } else {
                // se for objeto (um item), adiciona sem duplicar
                const current = Array.isArray(state.collaboratorData.selectedEmployeeAndRole)
                    ? state.collaboratorData.selectedEmployeeAndRole
                    : [];
                newSelected = [
                    ...current,
                    action.payload,
                ].filter(
                    (v, i, arr) => arr.findIndex(x => x.id === v.id) === i
                );
            }

            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedEmployeeAndRole: newSelected,
                },
            };
        }
        // Limpar tudo — restaura a lista formatada a partir do raw e remove disableds
        case "CLEAR_SELECTED_EMPLOYEE_AND_ROLE": {
            const raw = state.collaboratorData.employeeAndRoleRawDataList || [];
            // reconstrói a lista formatada (mesma lógica do seu mapping)
            const restoredList = raw.map((item) => ({
                id: item.id?.toString() ?? '',
                text: `${item.fullName ?? ''}, ${item.roleName ?? ''} no departamento ${item.departmentName ?? ''}`,
                disabled: false,
            }));

            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedEmployeeAndRole: "",
                    employeeHeadedByList: [],
                    employeeAndRoleDataList: restoredList,
                },
            };
        }
        case 'SET_EMPLOYEE_DEPARTMENT':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeDepartment: action.payload
                },
            };
        case 'SET_EMPLOYEE_ROLE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeRole: action.payload
                },
            };
        case 'SET_EMPLOYEE_FUNCTION':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeFunction: action.payload
                },
            };
        case 'SET_IS_EMPLOYEE_LEADER':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    isEmployeeLeader: action.payload
                },
            };
        case 'SET_HAS_EMPLOYEE_LEADER':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    hasEmployeeLeader: action.payload
                },
            };
        case 'SET_IS_INVALID_EMPLOYEE_LEADER_COMPONENT':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    isInvalidEmployeeLeaderComponent: action.payload
                },
            };
        case 'SET_SHOW_ERROR_FEEDBACK_EMPLOYEE_LEADER_COMPONENT':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    showErrorFeedbackEmployeeLeaderComponent: action.payload
                },
            };
        case 'SET_EMPLOYEE_CONTRACT_TYPE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeContractType: action.payload
                },
            };
        case 'SET_EMPLOYEE_WORK_MODEL':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeWorkModel: action.payload
                },
            };
        case 'SET_EMPLOYEE_WORKPLACE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeWorkplace: action.payload
                },
            };
        case 'SET_EMPLOYEE_ADMISSION_DATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeAdmissionDate: action.payload
                },
            };
        case 'SET_EMPLOYEE_ENTRY_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeEntryTime: action.payload
                },
            };
        case 'SET_EMPLOYEE_START_BREAK_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStartBreakTime: action.payload
                },
            };
        case 'SET_EMPLOYEE_STOP_BREAK_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStopBreakTime: action.payload
                },
            };
        case 'SET_EMPLOYEE_DEPARTURE_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeDepartureTime: action.payload
                },
            };
        case 'SET_EMPLOYEE_STATUS':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStatus: action.payload
                },
            };
        case 'SET_FIRST_NAME_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    firstNameState: action.payload
                },
            };
        case 'SET_LAST_NAME_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    lastNameState: action.payload
                },
            };
        case 'SET_EMAIL_ADDRESS_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    emailAddressState: action.payload
                },
            };
        case 'SET_BIRTHDATE_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    birthdateState: action.payload
                },
            };
        case 'SET_PHONE_NUMBER_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    phoneNumberState: action.payload
                },
            };
        case 'SET_EMPLOYEE_ADDRESS_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeAddressState: action.payload
                },
            };
        case 'SET_EMPLOYEE_ADDRESS_NUMBER_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeAddressNumberState: action.payload
                },
            };
        case 'SET_EMPLOYEE_ADDRESS_COMPLEMENT_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeAddressComplementState: action.payload
                },
            };
        case 'SET_EMPLOYEE_NEIGHBORHOOD_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeNeighborhoodState: action.payload
                },
            };
        case 'SET_EMPLOYEE_CITY_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeCityState: action.payload
                },
            };
        case 'SET_FEDERATED_UNIT_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    federatedUnitState: action.payload
                },
            };
        case 'SET_EMPLOYEE_DEPARTMENT_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeDepartmentState: action.payload
                },
            };
        case 'SET_EMPLOYEE_ROLE_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeRoleState: action.payload
                },
            };
        case 'SET_EMPLOYEE_FUNCTION_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeFunctionState: action.payload
                },
            };
        // Move para headedBy e marca option como disabled (mantém na lista para o Select2 renderizar)
        case "MOVE_TO_HEADED_BY": {
            const item = action.payload; // { id, text }

            const currentSelected = state.collaboratorData.selectedEmployeeAndRole || [];
            const currentHeadedBy = state.collaboratorData.employeeHeadedByList || [];
            const currentDataList = state.collaboratorData.employeeAndRoleDataList || [];

            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    // adiciona ao selected (mantendo sem duplicatas)
                    selectedEmployeeAndRole: [
                        ...currentSelected,
                        item,
                    ].filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i),

                    // adiciona à lista oficial de ledados
                    employeeHeadedByList: [
                        ...currentHeadedBy,
                        item,
                    ].filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i),

                    // marca o item como disabled na lista de opções (mantém a opção presente)
                    employeeAndRoleDataList: currentDataList.map(opt =>
                        opt.id === item.id ? { ...opt, disabled: true } : opt
                    ),
                },
            };
        }
        // Remove de headedBy e reabilita a opção na data list
        case "REMOVE_FROM_HEADED_BY": {
            const item = action.payload; // { id, text }
            const currentSelected = state.collaboratorData.selectedEmployeeAndRole || [];
            const currentHeadedBy = state.collaboratorData.employeeHeadedByList || [];
            const currentDataList = state.collaboratorData.employeeAndRoleDataList || [];

            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedEmployeeAndRole: currentSelected.filter(i => i.id !== item.id),
                    employeeHeadedByList: currentHeadedBy.filter(i => i.id !== item.id),
                    employeeAndRoleDataList: currentDataList.map(opt =>
                        opt.id === item.id ? { ...opt, disabled: false } : opt
                    ),
                },
            };
        }
        case 'SET_EMPLOYEE_HEADED_BY_LIST_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeHeadedByListState: action.payload
                },
            };
        case 'SET_EMPLOYEE_CONTRACT_TYPE_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeContractTypeState: action.payload
                },
            };
        case 'SET_EMPLOYEE_WORK_MODEL_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeWorkModelState: action.payload
                },
            };
        case 'SET_EMPLOYEE_WORKPLACE_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeWorkplaceState: action.payload
                },
            };
        case 'SET_EMPLOYEE_ADMISSION_DATE_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeAdmissionDateState: action.payload
                },
            };
        case 'SET_EMPLOYEE_ENTRY_TIME_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeEntryTimeState: action.payload
                },
            };
        case 'SET_EMPLOYEE_START_BREAK_TIME_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStartBreakTimeState: action.payload
                },
            };
        case 'SET_EMPLOYEE_STOP_BREAK_TIME_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStopBreakTimeState: action.payload
                },
            };
        case 'SET_EMPLOYEE_DEPARTURE_TIME_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeDepartureTimeState: action.payload
                },
            };
        case 'SET_EMPLOYEE_STATUS_STATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStatusState: action.payload
                },
            };
        case 'SET_SELECTED_DEPARTMENT_ID':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    selectedDepartmentId: action.payload
                },
            };
        case 'SET_HAS_DEPARTMENT_SELECTED':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    hasDepartmentSelected: action.payload
                },
            };
        case 'SET_DEPARTMENT_DATA_LIST':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    departmentDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_ROLE_DATA_LIST':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    roleDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_FUNCTION_DATA_LIST':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    functionDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_CONTRACT_TYPE_DATA_LIST':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    contractTypeDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_WORK_MODEL_DATA_LIST':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    workModelDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_WORKPLACE_DATA_LIST':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    workplaceDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        // Atualiza a lista de dados para o select
        case "SET_EMPLOYEE_AND_ROLE_DATA_LIST":
            let formattedData = null;
            let rawData = [];

            if (action.payload) {
                if (Array.isArray(action.payload?.formatted)) {
                    formattedData = action.payload.formatted;
                    rawData = action.payload.raw || [];
                } else if (Array.isArray(action.payload)) {
                    formattedData = action.payload;
                }
            }

            // ⚡️ Garantia extra: remover item fake (id === "0")
            if (formattedData?.length > 0) {
                formattedData = formattedData.filter(item => item.id !== "0");
            }

            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeAndRoleDataList: formattedData,
                    employeeAndRoleRawDataList: rawData,
                },
            };
        case 'SET_FORMATTED_BIRTHDATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    formattedBirthdate: action.payload,
                },
            };
        case 'SET_FORMATTED_ADMISSION_DATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    formattedAdmissionDate: action.payload
                },
            };
        case 'TOUCH_FIRST_NAME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    firstNameTouched: true,
                },
            };
        case 'TOUCH_LAST_NAME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    lastNameTouched: true,
                },
            };
        case 'TOUCH_EMAIL_ADDRESS':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    emailAddressTouched: true,
                },
            };
        case 'TOUCH_BIRTHDATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    birthdateTouched: true,
                },
            };
        case 'TOUCH_PHONE_NUMBER':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    phoneNumberTouched: true,
                },
            };
        case 'TOUCH_IS_EMPLOYEE_LEADER':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    isEmployeeLeaderTouched: true,
                },
            };
        case 'TOUCH_EMPLOYEE_HEADED_BY_LIST':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeHeadedByListTouched: true,
                },
            };
        case 'TOUCH_EMPLOYEE_ADMISSION_DATE':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeAdmissionDateTouched: true,
                },
            };
        case 'TOUCH_EMPLOYEE_ENTRY_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeEntryTimeTouched: true,
                },
            };
        case 'TOUCH_EMPLOYEE_START_BREAK_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStartBreakTimeTouched: true,
                },
            };
        case 'TOUCH_EMPLOYEE_STOP_BREAK_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStopBreakTimeTouched: true,
                },
            };
        case 'TOUCH_EMPLOYEE_DEPARTURE_TIME':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeDepartureTimeTouched: true,
                },
            };
        case 'TOUCH_EMPLOYEE_STATUS':
            return {
                ...state,
                collaboratorData: {
                    ...state.collaboratorData,
                    employeeStatusTouched: true,
                },
            };
        case 'CLEAR_FORM':
            return initialState;
        default:
            return state;
    }
};