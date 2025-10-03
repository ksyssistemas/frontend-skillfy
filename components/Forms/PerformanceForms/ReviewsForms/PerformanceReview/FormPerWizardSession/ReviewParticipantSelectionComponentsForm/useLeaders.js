import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import debounce from "lodash.debounce";
import { useFindAllEmployee } from "../../../../../../../hooks/RecordsHooks/employee/useFindAllEmployee";
import { ReviewParticipantSelectionContext } from "../../../../../../../contexts/PerformanceContext/RightSideSummaryPanel/ReviewParticipantSelectionContext";

export function useLeaders(handleHasSelectedLeaders) {

  const { state, dispatch } = useContext(ReviewParticipantSelectionContext);
  const localState = state.reviewParticipantsSelectionData;

  // 🔎 Busca paginada de líderes
  const fetchLeaders = useCallback(async (query, pageNumber = 1, append = false) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      // Exemplo de chamada real
      // const response = await fetch(`/api/leaders?search=${query}&page=${pageNumber}&size=20`);
      // const data = await response.json();
      const foundEmployees = await useFindAllEmployee();
      const leaderData = foundEmployees
        .filter((employee) => employee.isLead)
        .map((employee) => employee);

      const newOptions = leaderData.map((l) => ({
        value: l.id,
        label: `${l.fullName} — ${l.roleName}`,
        fullName: l.fullName,
        rolesId: l.rolesId,
        roleName: l.roleName,
        avatar: null,
        departmentId: l.departmentId,
        departmentName: l.departmentName,
      }));

      const total = leaderData.length;
      const pageSize = 10;

      const newLeaders = append ? [...localState.leaders, ...newOptions] : newOptions;

      dispatch({ type: "SET_LEADERS", payload: newLeaders });
      dispatch({ type: "SET_HAS_MORE", payload: pageNumber * pageSize < total });
    } catch (err) {
      console.error("Erro ao buscar líderes:", err);
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }, [dispatch, localState.leaders]);

  // ⏳ Debounce evita chamadas em excesso
  const debouncedFetch = useMemo(
    () => debounce((query) => fetchLeaders(query, 1, false), 400),
    [fetchLeaders]
  );

  // Carregamento inicial (sem filtro)
  useEffect(() => {
    if (!localState.searchTerm || localState.searchTerm.trim() === "") {
      fetchLeaders("", 1, false);
    }
  }, []);

  // Atualiza lista de líderes ao digitar (apenas se houver texto)
  useEffect(() => {
    if (localState.searchTerm && localState.searchTerm.trim() !== "") {
      debouncedFetch(localState.searchTerm);
    }
  }, [localState.searchTerm, debouncedFetch]);

  // 🧑‍🤝‍🧑 Busca liderados para um líder
  const fetchEmployeesForLeader = async (leaderId) => {
    const foundEmployees = await useFindAllEmployee();

    const ledData = foundEmployees
      .filter((employee) => {
        if (employee.isLead) return false;
        if (!Array.isArray(employee.headedBy)) return false;
        return employee.headedBy.some((h) => Number(h.id) === Number(leaderId));
      })
      .map((employee) => ({
        ...employee,
        selected: true, // 🔹 Marca como selecionado por padrão
      }));

    // 🔹 Apenas um dispatch - o reducer cuida da sincronização
    dispatch({
      type: "SET_LED_EMPLOYEES",
      payload: {
        leaderId,
        employees: ledData
      },
    });
  };

  // Handler para input do usuário
  const handleInputChange = (inputValue) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: inputValue });
  };

  useEffect(() => {
    if (localState.selectedLeaders.length > 0) {
      handleHasSelectedLeaders(true);
    } else {
      handleHasSelectedLeaders(false);
    }
  }, [localState.selectedLeaders, handleHasSelectedLeaders]);

  useEffect(() => {
    localState.selectedLeaders.forEach((leader) => {
      if (!localState.ledEmployees[leader.value]) {
        fetchEmployeesForLeader(leader.value);
      }
    });
  }, [localState.selectedLeaders]);

  // Toggle de seleção individual
  const toggleEmployeeSelection = (leaderId, employeeId) => {
    const employees = localState.ledEmployees[leaderId] || [];
    const currentSelected = localState.selectedLedEmployees[leaderId] || [];

    // Atualiza selectedLedEmployees
    const isCurrentlySelected = currentSelected.includes(employeeId);
    const newSelectedIds = isCurrentlySelected
      ? currentSelected.filter(id => id !== employeeId)
      : [...currentSelected, employeeId];

    dispatch({
      type: "SET_SELECTED_LED_EMPLOYEES",
      payload: { leaderId, employeeIds: newSelectedIds },
    });

    // Atualiza a propriedade selected em ledEmployees
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId ? { ...emp, selected: !emp.selected } : emp
    );

    dispatch({
      type: "SET_LED_EMPLOYEES",
      payload: { leaderId, employees: updatedEmployees }
    });
  };

  const selectAllEmployees = (leaderId) => {
    const employees = localState.ledEmployees[leaderId] || [];
    const updatedEmployees = employees.map((emp) => ({ ...emp, selected: true }));

    dispatch({
      type: "SET_LED_EMPLOYEES",
      payload: { leaderId, employees: updatedEmployees }
    });

    dispatch({
      type: "SET_SELECTED_LED_EMPLOYEES",
      payload: { leaderId, employeeIds: updatedEmployees.map(e => e.id) },
    });
  };

  const clearEmployees = (leaderId) => {
    const employees = localState.ledEmployees[leaderId] || [];
    const updatedEmployees = employees.map((emp) => ({ ...emp, selected: false }));

    dispatch({
      type: "SET_LED_EMPLOYEES",
      payload: { leaderId, employees: updatedEmployees }
    });

    dispatch({
      type: "CLEAR_SELECTED_LED_EMPLOYEES",
      payload: { leaderId },
    });

    // 🔹 limpa pares também
    dispatch({
      type: "SET_SELECTED_PEERS",
      payload: (prev) => {
        const updated = { ...prev };
        employees.forEach((emp) => {
          delete updated[emp.id];
        });
        return updated;
      },
    });
  };

  // Paginação infinita
  const handleMenuScrollToBottom = () => {
    if (localState.hasMore && !localState.isLoading) {
      fetchLeaders(localState.searchTerm, localState.page + 1, true);
      dispatch({ type: "SET_PAGE", payload: localState.page + 1 });
    }
  };

  return {
    toggleEmployeeSelection,
    selectAllEmployees,
    clearEmployees,
    handleMenuScrollToBottom,
    handleInputChange
  };
}