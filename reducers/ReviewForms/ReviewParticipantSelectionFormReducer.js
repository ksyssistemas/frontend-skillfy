export const initialStateReviewParticipantsSelectionForm = {
    reviewParticipantsSelectionData: {
        leaders: [],
        selectedLeaders: [],
        ledEmployees: {},
        selectedLedEmployees: {},
        leaderPeers: {},
        isLoading: false,
        page: 1,
        hasMore: true,
        searchTerm: "",
        step: 1,
        selectedPeers: {},
        selectedLeaderPeers: {},
        selectedDepartment: null,
        search: "",
        autoSelectCount: 1,
    },
};

export const reviewParticipantsSelectionFormReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_REVIEW_DATA':
            return {
                ...state,
                reviewIdentityData: { ...action.payload },
            };
        case 'LOAD_SAVED_REVIEW_DATA':
            return {
                ...state,
                reviewIdentityData: {
                    ...state.reviewIdentityData,
                    ...action.payload,
                },
            };
        case 'RESET_REVIEW_DATA':
            return initialStateReviewParticipantsSelectionForm;
        case 'SET_LEADERS':
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    leaders: action.payload,
                },
            };
        case "SET_SELECTED_LEADERS": {
            const selectedLeaders = action.payload;

            // IDs dos líderes que permanecem selecionados
            const remainingLeaderIds = selectedLeaders.map((l) => l.value);

            // IDs dos líderes que foram removidos
            const previousLeaderIds = state.reviewParticipantsSelectionData.selectedLeaders.map(l => l.value);
            const removedLeaderIds = previousLeaderIds.filter(id => !remainingLeaderIds.includes(id));

            // 1. Mantém apenas liderados dos líderes ainda selecionados
            const newLedEmployees = Object.fromEntries(
                Object.entries(state.reviewParticipantsSelectionData.ledEmployees)
                    .filter(([leaderId]) => remainingLeaderIds.includes(Number(leaderId)))
            );

            // 2. Mantém apenas selectedLedEmployees dos líderes ainda selecionados
            const newSelectedLedEmployees = Object.fromEntries(
                Object.entries(state.reviewParticipantsSelectionData.selectedLedEmployees)
                    .filter(([leaderId]) => remainingLeaderIds.includes(Number(leaderId)))
            );

            // 3. Pega IDs de todos os liderados que foram removidos
            const removedLedEmployeeIds = removedLeaderIds.flatMap(leaderId => {
                const employees = state.reviewParticipantsSelectionData.ledEmployees[leaderId] || [];
                return employees.map(emp => emp.id);
            });

            // 4. Remove pares dos liderados que foram removidos
            const newSelectedPeers = Object.fromEntries(
                Object.entries(state.reviewParticipantsSelectionData.selectedPeers)
                    .filter(([ledId]) => !removedLedEmployeeIds.includes(Number(ledId)))
            );

            // 5. Remove leaderPeers dos líderes removidos
            const newLeaderPeers = Object.fromEntries(
                Object.entries(state.reviewParticipantsSelectionData.leaderPeers)
                    .filter(([leaderId]) => remainingLeaderIds.includes(Number(leaderId)))
            );

            // 6. Remove selectedLeaderPeers dos líderes removidos
            const newSelectedLeaderPeers = Object.fromEntries(
                Object.entries(state.reviewParticipantsSelectionData.selectedLeaderPeers)
                    .filter(([leaderId]) => remainingLeaderIds.includes(Number(leaderId)))
            );

            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selectedLeaders,
                    ledEmployees: newLedEmployees,
                    selectedLedEmployees: newSelectedLedEmployees,
                    selectedPeers: newSelectedPeers,
                    leaderPeers: newLeaderPeers,
                    selectedLeaderPeers: newSelectedLeaderPeers,
                },
            };
        }
        case "SET_LED_EMPLOYEES": {
            const { leaderId, employees } = action.payload;

            // Pega os IDs dos funcionários que vêm com selected: true
            const selectedIds = employees
                .filter(emp => emp.selected === true)
                .map(emp => emp.id);

            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    ledEmployees: {
                        ...state.reviewParticipantsSelectionData.ledEmployees,
                        [leaderId]: employees
                    },
                    // 🔹 Automaticamente sincroniza selectedLedEmployees
                    selectedLedEmployees: {
                        ...state.reviewParticipantsSelectionData.selectedLedEmployees,
                        [leaderId]: selectedIds
                    }
                }
            };
        }
        case "SET_SELECTED_LED_EMPLOYEES":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selectedLedEmployees: {
                        ...state.reviewParticipantsSelectionData.selectedLedEmployees,
                        [action.payload.leaderId]: action.payload.employeeIds, // array de ids
                    },
                },
            };

        case "CLEAR_SELECTED_LED_EMPLOYEES":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selectedLedEmployees: {
                        ...state.reviewParticipantsSelectionData.selectedLedEmployees,
                        [action.payload.leaderId]: [], // limpa array
                    },
                },
            };

        case "TOGGLE_EMPLOYEE_SELECTION": {
            const { leaderId, employeeId } = action.payload;

            const current = state.reviewParticipantsSelectionData.selectedLedEmployees[leaderId] || [];
            const isAlreadySelected = current.includes(employeeId);

            const updated = isAlreadySelected
                ? current.filter((id) => id !== employeeId)
                : [...current, employeeId];

            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selectedLedEmployees: {
                        ...state.reviewParticipantsSelectionData.selectedLedEmployees,
                        [leaderId]: updated,
                    },
                },
            };
        }
        case "SET_LEADER_PEERS":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    leaderPeers: {
                        ...state.reviewParticipantsSelectionData.leaderPeers,
                        [action.leaderId]: action.peers,
                    },
                },
            };
        case "SET_IS_LOADING":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, isLoading: action.payload
                },
            };
        case "SET_PAGE":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, page: action.payload
                },
            };
        case "SET_HAS_MORE":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, hasMore: action.payload
                },
            };
        case "SET_SEARCH_TERM":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, searchTerm: action.payload
                },
            };
        case "SET_STEP":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, step: action.payload
                },
            };
        case "SET_SELECTED_PEERS": {
            const update = action.payload;

            if (typeof update === "function") {
                return {
                    ...state,
                    reviewParticipantsSelectionData: {
                        ...state.reviewParticipantsSelectionData,
                        selectedPeers: update(state.reviewParticipantsSelectionData.selectedPeers),
                    },
                };
            }

            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selectedPeers: {
                        ...state.reviewParticipantsSelectionData.selectedPeers,
                        ...update,
                    },
                },
            };
        }
        case "SET_SELECTED_LEADER_PEERS": {
            const update = action.payload;
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData,
                    selectedLeaderPeers:
                        typeof update === "function"
                            ? update(state.reviewParticipantsSelectionData.selectedLeaderPeers)
                            : {
                                ...state.reviewParticipantsSelectionData.selectedLeaderPeers,
                                ...update,
                            },
                },
            };
        }
        case "SET_SELECTED_DEPARTMENT":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, selectedDepartment: action.payload
                },
            };
        case "SET_SEARCH":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, search: action.payload
                },
            };
        case "SET_AUTO_SELECT_COUNT":
            return {
                ...state,
                reviewParticipantsSelectionData: {
                    ...state.reviewParticipantsSelectionData, autoSelectCount: action.payload
                },
            };
        default:
            return state;
    }
};