import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Form, Row } from "reactstrap";
import Select, { components } from "react-select";
import { useLeaders } from "./ReviewParticipantSelectionComponentsForm/useLeaders";
import { EmployeeList } from "./ReviewParticipantSelectionComponentsForm/EmployeeList";
import { MenuList } from "./ReviewParticipantSelectionComponentsForm/MenuList";
import PeerToLedEmployeesModal from "./ReviewParticipantSelectionComponentsForm/PeerToLedEmployeesModal";
import { useContext, useEffect, useRef, useState } from "react";
import { ReviewParticipantSelectionContext } from "../../../../../../contexts/PerformanceContext/RightSideSummaryPanel/ReviewParticipantSelectionContext";
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import PageChange from "../../../../../PageChange/PageChange";
import { PeerToLeadersModal } from "./ReviewParticipantSelectionComponentsForm/PeerToLeadersModal";

export function ReviewParticipantSelectionForm() {
    const { state, dispatch } = useContext(ReviewParticipantSelectionContext);

    const localState = state.reviewParticipantsSelectionData;

    const latestReviewParticipantsSelectionData = useRef(localState);

    const [isLoadingReviewParticipantsSelectionData, setIsLoadingReviewParticipantsSelectionData] = useState(true);

    const {
        selectedReview,
        clearStepIndex,
        handleClearStepIndex,
        stateGlobalReviewReducer,
        dispatchGlobalReviewReducer,
        hasSelectedLeaders,
        handleHasSelectedLeaders
    } = useContext(ModelSelectionReviewContext);

    const {
        toggleEmployeeSelection,
        selectAllEmployees,
        clearEmployees,
        handleMenuScrollToBottom,
        handleInputChange
    } = useLeaders(handleHasSelectedLeaders);

    // Ref para armazenar o estado anterior em formato de string
    const previousStateRef = useRef(null);

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem('reviewParticipantsSelectionData', JSON.stringify(data));
    };

    const [isShowModalAddingPeersToLeader, setIsShowModalAddingPeersToLeader] = useState(false);
    const [isShowModalAddingPeersToLed, setIsShowModalAddingPeersToLed] = useState(false);
    const [leaderIdToAddingPairsToLed, setLeaderIdToAddingPairsToLed] = useState('');
    const [leaderIdToAddingPairsToLeader, setLeaderIdToAddingPairsToLeader] = useState('');

    function handleStatusChangeModalAddingPeersToLeader() {
        setIsShowModalAddingPeersToLeader(!isShowModalAddingPeersToLeader);
    }

    function handleStatusChangeModalAddingPeersToLed() {
        setIsShowModalAddingPeersToLed(!isShowModalAddingPeersToLed);
    }

    function handleOpenModalAddingPeersToLeader(leaderId) {
        setLeaderIdToAddingPairsToLeader(leaderId);
        handleStatusChangeModalAddingPeersToLeader();
    }

    function handleOpenModalAddingPeersToLed(leaderId) {
        setLeaderIdToAddingPairsToLed(leaderId);
        handleStatusChangeModalAddingPeersToLed();
    }

    function handleCleanLeaderIdToAddingPairsToLed() {
        setLeaderIdToAddingPairsToLed(null)
    }

    function handleCleanLeaderIdToAddingPairsToLeader() {
        setLeaderIdToAddingPairsToLeader(null)
    }

    function handleConfirmPeers(leaderId, peers) {
        dispatch({
            type: "SET_LEADER_PEERS",
            leaderId,
            peers,
        });
    }

    const onConfirmLeadersPeers = (leaderId, selectedPeers) => {
        dispatchGlobalReviewReducer({
            type: "SET_PEERS_FOR_LEADER",
            payload: {
                leaderId,
                peers: selectedPeers
            }
        });
    };

    const filteredSubordinates = Object.fromEntries(
        Object.entries(localState.ledEmployees).map(([leaderId, allEmployees]) => {
            // 🔹 Filtra apenas os que estão selecionados
            const selectedIds = localState.selectedLedEmployees[leaderId] || [];
            const filtered = allEmployees.filter(emp => selectedIds.includes(emp.id));
            return [leaderId, filtered];
        })
    );

    const commonPeerToLedEmployeeModalProps = {
        handleOpenModalAddingPeersToLed,
        leaderIdToAddingPairsToLed,
        handleCleanLeaderIdToAddingPairsToLed,
        handleStatusChangeModalAddingPeersToLed,
        isShowModalAddingPeersToLed,
        subordinates: filteredSubordinates,
        onConfirm: handleConfirmPeers
    };

    const commonPeerToLeaderModalProps = {
        leaderIdToAddingPairsToLeader,
        handleOpenModalAddingPeersToLeader,
        handleCleanLeaderIdToAddingPairsToLeader,
        handleStatusChangeModalAddingPeersToLeader,
        isShowModalAddingPeersToLeader,
        onConfirmLeadersPeers
    }

    // Execute o carregamento dos dados ao montar o componente
    useEffect(() => {
        // Função para carregar os dados do localStorage
        const loadReviewParticipantsSelectionData = async () => {
            try {
                const rawData = localStorage.getItem('reviewParticipantsSelectionData');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && typeof parsedData === 'object') {
                        // Verifique se selectedCycle está presente
                        dispatch({
                            type: 'LOAD_SAVED_REVIEW_DATA',
                            payload: { ...parsedData },
                        });
                        latestReviewParticipantsSelectionData.current = parsedData; // Atualiza a ref para os dados carregados
                    }
                } else {
                    dispatch({ type: 'RESET_REVIEW_STATE' }); // Limpa o estado para evitar inconsistências
                }
            } catch (error) {
                console.error('Failed to parse reviewParticipantsSelectionData from localStorage:', error);
            } finally {
                setIsLoadingReviewParticipantsSelectionData(false); // Marque como carregado
            }
        };

        loadReviewParticipantsSelectionData();
    }, []);

    // Salvar no Contexto Global antes de sair
    useEffect(() => {
        dispatchGlobalReviewReducer({
            type: "UPDATE_REVIEW_PARTICIPANTS",
            payload: localState,
        });
    }, [localState, dispatchGlobalReviewReducer]);

    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(localState);

        if (previousStateRef.current !== currentStateString) {
            previousStateRef.current = currentStateString;
            latestReviewParticipantsSelectionData.current = { ...localState };

            // 🔹 DEBUG - veja o que está sendo salvo
            console.log('Salvando no localStorage:', localState);

            // Aguarde a atualização do estado antes de salvar
            setTimeout(() => {
                saveDataToLocalStorage(localState);
            }, 0);
        }
    }, [localState]);

    useEffect(() => {
        if (clearStepIndex === 5) {
            resetFormAndLocalStorage(
                true,
                5,
                clearStepIndex,
                'reviewParticipantsSelectionData',
                'RESET_REVIEW_DATA',
                handleClearStepIndex,
                dispatch
            );
        }
    }, [clearStepIndex, dispatch]);

    if (isLoadingReviewParticipantsSelectionData) {
        return (
            <PageChange />
        );
    }

    return (
        <>
            <Form>
                <Card>
                    <CardHeader>
                        <label
                            className="text-uppercase text-muted font-weight-bold"
                            htmlFor="leader-search"
                        >
                            Pesquisar Líderes da [Minha Empresa]
                        </label>
                        <Select
                            inputId="leader-search"
                            isMulti
                            isClearable
                            components={{ MenuList }}
                            options={localState.leaders}
                            value={localState.selectedLeaders}
                            onChange={(selected) =>
                                dispatch({
                                    type: "SET_SELECTED_LEADERS",
                                    payload: selected || []
                                })
                            }
                            onInputChange={handleInputChange}
                            isLoading={localState.isLoading}
                            placeholder="Digite para buscar líderes..."
                            className="mb-3"
                            classNamePrefix="react-select"
                            onMenuScrollToBottom={handleMenuScrollToBottom}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    padding: "0.375rem 0.25rem", // padding Bootstrap
                                    borderRadius: "0.375rem", // borda Bootstrap
                                    borderColor: "#abb6f1",
                                    boxShadow: "none",
                                    "&:hover": { borderColor: "#562f9f" },
                                }),
                            }}
                            noOptionsMessage={() =>
                                localState.isLoading ? "Carregando..." : "Nenhum líder encontrado"
                            }
                        />
                    </CardHeader>

                    <CardBody>
                        <h3 className="mb-4">Líderes Selecionados</h3>
                        <Row className="card-wrapper">
                            {localState.selectedLeaders.map((leader) => {
                                const employees = localState.ledEmployees[leader.value] || [];
                                const selectedCount = employees.filter((e) => e.selected).length;

                                return (
                                    <Col lg="6" key={leader.value} className="mb-3">
                                        <Card>
                                            <CardHeader>
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <a
                                                            className="avatar avatar-md rounded-circle"
                                                            href="#pablo"
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <img
                                                                alt="..."
                                                                src={require("assets/img/theme/team-2.jpg")}
                                                            />
                                                        </a>
                                                    </Col>
                                                    <div className="col ml--2">
                                                        <h4 className="mb-0">{leader.fullName}</h4>
                                                        <p className="text-sm text-muted mb-0">{leader.roleName}</p>
                                                    </div>
                                                    <Col className="col-auto">
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            type="button"
                                                            onClick={() => handleOpenModalAddingPeersToLeader(leader.value)}
                                                        >
                                                            Adicionar Pares
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </CardHeader>

                                            <CardBody>
                                                <Row className="mb-3">
                                                    <Col md="8">
                                                        <CardTitle>
                                                            Liderados selecionados {selectedCount} de {employees.length}
                                                        </CardTitle>
                                                    </Col>
                                                    <Col className="px-0 d-flex align-items-center justify-content-center" md="4">
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            type="button"
                                                            onClick={() => selectAllEmployees(leader.value)}
                                                        >
                                                            Todos
                                                        </Button>
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            type="button"
                                                            onClick={() => clearEmployees(leader.value)}
                                                        >
                                                            Limpar
                                                        </Button>
                                                    </Col>
                                                </Row>

                                                <div style={{ height: "200px" }}>
                                                    <EmployeeList
                                                        leaderId={leader.value}
                                                        employees={employees}
                                                        toggleEmployeeSelection={toggleEmployeeSelection}
                                                        peers={localState.selectedPeers?.[leader.value] || {}}
                                                    />
                                                </div>
                                            </CardBody>

                                            <CardFooter className="justify-content-center d-flex">
                                                <Button
                                                    color="primary"
                                                    href="#pablo"
                                                    onClick={(e) => { e.preventDefault(); handleOpenModalAddingPeersToLed(leader.value) }}
                                                >
                                                    Adicionar Pares aos Liderados
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </CardBody>
                </Card>
            </Form >
            {
                leaderIdToAddingPairsToLed && leaderIdToAddingPairsToLed !== 0 ? (
                    <PeerToLedEmployeesModal {...commonPeerToLedEmployeeModalProps} />
                ) : null
            }
            {
                isShowModalAddingPeersToLeader ? (
                    <PeerToLeadersModal {...commonPeerToLeaderModalProps} />
                ) : null
            }
        </>
    );
}