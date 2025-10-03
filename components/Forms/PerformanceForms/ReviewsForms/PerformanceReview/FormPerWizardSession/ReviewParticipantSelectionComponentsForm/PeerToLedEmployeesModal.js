import React, { useState, useMemo, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Row,
  Col,
  Table,
  ListGroup,
  ListGroupItem,
  Badge,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import PropTypes from "prop-types";
import { ReviewParticipantSelectionContext } from "../../../../../../../contexts/PerformanceContext/RightSideSummaryPanel/ReviewParticipantSelectionContext";

function PeerToLedEmployeesModal(
  {
    handleOpenModalAddingPeersToLed,
    leaderIdToAddingPairsToLed,
    handleCleanLeaderIdToAddingPairsToLed,
    handleStatusChangeModalAddingPeersToLed,
    isShowModalAddingPeersToLed,
    subordinates = {},
    onConfirm,
  }
) {

  const { state, dispatch } = useContext(ReviewParticipantSelectionContext);
  const localState = state.reviewParticipantsSelectionData;

  // Subordinados já filtrados no parent
  const leaderSubordinates = subordinates[leaderIdToAddingPairsToLed] || [];

  // Filtra peers de acordo com depto e busca
  const filteredPeers = useMemo(() => {
    return leaderSubordinates.filter((p) => {
      const matchDept = !localState.selectedDepartment || p.departmentId === localState.selectedDepartment;
      const matchSearch = p.name.toLowerCase().includes(localState.search.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [leaderSubordinates, localState.selectedDepartment, localState.search]);

  const handleTogglePeer = (ledId, peerId) => {
    const currentPeers = localState.selectedPeers[ledId] || [];
    const updatedPeers = currentPeers.includes(peerId)
      ? currentPeers.filter((id) => id !== peerId)
      : [...currentPeers, peerId];

    dispatch({
      type: "SET_SELECTED_PEERS",
      payload: {
        ...localState.selectedPeers,
        [ledId]: updatedPeers,
      },
    });
  };

  const handleSelectAll = (subordinateId) => {
    dispatch({
      type: "SET_SELECTED_PEERS",
      payload: {
        ...localState.selectedPeers,
        [subordinateId]: filteredPeers.map((p) => p.id),
      },
    });
  };

  const handleClearAll = (subordinateId) => {
    dispatch({
      type: "SET_SELECTED_PEERS",
      payload: {
        ...localState.selectedPeers,
        [subordinateId]: [],
      },
    });
  };

  const handleAutoSelect = () => {
    const updated = {};

    leaderSubordinates.forEach((s) => {
      // pares possíveis: mesmo depto, mas não o próprio
      const deptPeers = leaderSubordinates.filter(
        (p) => p.departmentId === s.departmentId && p.id !== s.id
      );

      // embaralha aleatoriamente
      const shuffled = [...deptPeers].sort(() => Math.random() - 0.5);

      // pega N pares de acordo com autoSelectCount
      updated[s.id] = shuffled
        .slice(0, localState.autoSelectCount)
        .map((p) => p.id);
    });

    dispatch({
      type: "SET_SELECTED_PEERS",
      payload: { ...localState.selectedPeers, ...updated },
    });
    dispatch({ type: "SET_STEP", payload: 3 });
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(leaderIdToAddingPairsToLed, localState.selectedPeers);
    }
    handleSelectionPairsToLedEmployeesModal();
  };

  function handleSelectionPairsToLedEmployeesModal() {
    handleCleanLeaderIdToAddingPairsToLed();
    handleStatusChangeModalAddingPeersToLed();
  }

  return (
    <Modal
      toggle={handleOpenModalAddingPeersToLed}
      isOpen={isShowModalAddingPeersToLed}
      size="xl"
      key={leaderIdToAddingPairsToLed}
    >
      <div className=" modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Selecionar Pares para Liderados
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleSelectionPairsToLedEmployeesModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        {/* Stepper */}
        <Row className="mb-3">
          {["Resumo", "Seleção Automática", "Seleção Manual", "Revisão"].map((label, i) => (
            <Col key={label}>
              <Button
                block
                color={localState.step === i + 1 ? "primary" : "secondary"}
                outline={localState.step !== i + 1}
                onClick={() => dispatch({ type: "SET_STEP", payload: i + 1 })}
              >
                {label}
              </Button>
            </Col>
          ))}
        </Row>

        {/* Step 1: Resumo */}
        {localState.step === 1 && (
          <>
            <h5 className="mb-3">Liderados Selecionados</h5>
            <ListGroup style={{ maxHeight: "250px", overflowY: "auto" }}>
              {leaderSubordinates.map((s) => (
                  <ListGroupItem key={s.id} className="d-flex justify-content-between">
                    <span>{s.fullName}</span>
                    <span>Cargo de {s.roleName}</span>
                    <span>Atuação no departamento {s.departmentName}</span>
                  </ListGroupItem>
                ))}
            </ListGroup>
          </>
        )}

        {/* Step 2: Seleção Automática */}
        {localState.step === 2 && (
          <>
            <h5 className="mb-3">Selecionar Pares Automaticamente</h5>
            <Row className="align-items-center">
              <Col md="6">
                <Input
                  type="number"
                  min={1}
                  value={localState.autoSelectCount}
                  onChange={(e) => dispatch({ type: "SET_AUTO_SELECT_COUNT", payload: Number(e.target.value) })}
                />
              </Col>
              <Col md="6">
                <Button color="primary" onClick={handleAutoSelect}>
                  Sortear Pares
                </Button>
              </Col>
            </Row>
          </>
        )}

        {/* Step 3: Seleção Manual */}
        {localState.step === 3 && (
          <Row>
            <Col md="12">
              {leaderSubordinates.map((subordinate) => {
                  // pares possíveis: mesmo depto, não o próprio
                  const possiblePeers = leaderSubordinates.filter(
                    (p) => p.departmentId === subordinate.departmentId && p.id !== subordinate.id
                  );

                  // filtra por busca
                  const filtered = possiblePeers.filter((p) =>
                    p.fullName.toLowerCase().includes(localState.search.toLowerCase())
                  );

                  return (
                    <Card key={subordinate.id} className="mb-3">
                      <CardHeader>
                        <strong>{subordinate.fullName}</strong>
                        <small className="text-muted ms-2">
                          {` (${subordinate.departmentName})`}
                        </small>
                      </CardHeader>
                      <CardBody style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {filtered.length === 0 && (
                          <p className="text-muted">Nenhum par disponível</p>
                        )}
                        {filtered.map((peer) => {
                          const isSelected = (localState.selectedPeers[subordinate.id] || []).includes(peer.id);

                          return (
                            <div
                              key={peer.id}
                              className="custom-control custom-checkbox mb-2"
                            >
                              <input
                                className="custom-control-input"
                                id={`chk-${subordinate.id}-${peer.id}`}
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleTogglePeer(subordinate.id, peer.id)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`chk-${subordinate.id}-${peer.id}`}
                              >
                                {peer.fullName}
                              </label>
                            </div>
                          );
                        })}
                      </CardBody>
                    </Card>
                  );
                })}
            </Col>
          </Row>
        )}

        {/* Step 4: Revisão */}
        {localState.step === 4 && (
          <>
            <h5>Revisão Final</h5>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Liderado</th>
                  <th>Pares Selecionados</th>
                </tr>
              </thead>
              <tbody>
                {leaderSubordinates.map((s) => {
                    const peers = (localState.selectedPeers[s.id] || [])
                      .map(
                        (pid) =>
                          leaderSubordinates.find(
                            (p) => p.id === pid
                          )?.fullName
                      )
                      .filter(Boolean); // remove undefined caso algum id não seja encontrado

                    return (
                      <tr key={s.id}>
                        <td>{s.fullName} - {s.roleName}</td>
                        <td>{peers.length > 0 ? peers.join(", ") : "Nenhum"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </>
        )}

      </ModalBody>
      <ModalFooter>
        <small className="text-muted">
          {Object.values(localState.selectedPeers).flat().length} pares selecionados
        </small>
        <div>
          <Button
            color="secondary"
            type="button"
            onClick={handleSelectionPairsToLedEmployeesModal}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
      </ModalFooter>
    </Modal >
  );
}

PeerToLedEmployeesModal.defaultProps = {
  handleShowSelectionPairsToLedEmployeesModal: () => { },
  leaderIdToAddingPairsToLed: PropTypes.number,
  handleCleanLeaderIdToAddingPairsToLed: () => { },
  handleStatusChangeModalAddingPeersToLed: () => { },
  isShowModalAddingPeersToLed: false,
};

PeerToLedEmployeesModal.propTypes = {
  handleShowSelectionPairsToLedEmployeesModal: PropTypes.func,
  leaderIdToAddingPairsToLed: PropTypes.number,
  handleCleanLeaderIdToAddingPairsToLed: PropTypes.func,
  handleStatusChangeModalAddingPeersToLed: PropTypes.func,
  isShowModalAddingPeersToLed: PropTypes.bool,
};

export default PeerToLedEmployeesModal;