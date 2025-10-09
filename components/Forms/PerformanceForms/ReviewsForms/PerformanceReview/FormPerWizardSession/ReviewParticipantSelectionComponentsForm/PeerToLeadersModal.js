import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
} from "reactstrap";
import { ReviewParticipantSelectionContext } from "../../../../../../../contexts/PerformanceContext/RightSideSummaryPanel/ReviewParticipantSelectionContext";
import { useFindAllEmployee } from "../../../../../../../hooks/RecordsHooks/employee/useFindAllEmployee";

export function PeerToLeadersModal({
  leaderIdToAddingPairsToLeader,
  handleOpenModalAddingPeersToLeader,
  handleCleanLeaderIdToAddingPairsToLeader,
  handleStatusChangeModalAddingPeersToLeader,
  isShowModalAddingPeersToLeader,
  onConfirmLeadersPeers
}) {
  const { state, dispatch } = useContext(ReviewParticipantSelectionContext);
  const localState = state.reviewParticipantsSelectionData;

  const [leader, setLeader] = useState(null);
  const [possiblePeers, setPossiblePeers] = useState([]);

  // 🔎 Busca o líder pelo ID
  useEffect(() => {
    async function fetchLeaderAndPeers() {
      if (!leaderIdToAddingPairsToLeader) {
        setLeader(null);
        setPossiblePeers([]);
        return;
      }

      const allEmployees = await useFindAllEmployee();

      // encontra o líder
      const foundLeader = allEmployees.find(
        (emp) => String(emp.id) === String(leaderIdToAddingPairsToLeader)
      );
      setLeader(foundLeader || null);

      if (!foundLeader) {
        setPossiblePeers([]);
        return;
      }

      const peers = allEmployees.filter((emp) => {
        const notLeader = emp.id !== foundLeader.id;
        const isLeader = emp.isLead === true; // 🔹 NOVO: verifica se é líder

        return notLeader && isLeader;
      });

      setPossiblePeers(peers);
    }

    fetchLeaderAndPeers();
  }, [leaderIdToAddingPairsToLeader]);

  // Marca / desmarca pares
  const handleTogglePeer = (peerId) => {
    dispatch({
      type: "SET_SELECTED_LEADER_PEERS",
      payload: (prev) => {
        const current = prev[leaderIdToAddingPairsToLeader] || [];
        const updated = current.includes(peerId)
          ? current.filter((id) => id !== peerId)
          : [...current, peerId];

        return {
          ...prev,
          [leaderIdToAddingPairsToLeader]: updated,
        };
      },
    });
  };

  // Selecionar todos
  const handleSelectAll = () => {
    dispatch({
      type: "SET_SELECTED_LEADER_PEERS",
      payload: (prev) => ({
        ...prev,
        [leaderIdToAddingPairsToLeader]: possiblePeers.map((p) => p.id),
      }),
    });
  };

  // Limpar todos
  const handleClearAll = () => {
    dispatch({
      type: "SET_SELECTED_LEADER_PEERS",
      payload: (prev) => ({
        ...prev,
        [leaderIdToAddingPairsToLeader]: [],
      }),
    });
  };

  // Confirmar seleção
  const handleConfirm = () => {
    if (onConfirmLeadersPeers) {
      onConfirmLeadersPeers(
        leaderIdToAddingPairsToLeader,
        localState.selectedLeaderPeers[leaderIdToAddingPairsToLeader] || []
      );
    }
    handleCloseModalAddingPeersToLeader();
  };

  function handleCloseModalAddingPeersToLeader() {
    handleCleanLeaderIdToAddingPairsToLeader();
    handleStatusChangeModalAddingPeersToLeader();
  }

  return (
    <Modal isOpen={isShowModalAddingPeersToLeader} toggle={handleOpenModalAddingPeersToLeader} size="lg">
      <div className="modal-header">
        <h5 className="modal-title">Selecionar Pares para {leader?.fullName}</h5>
        <button type="button" className="close" onClick={handleCloseModalAddingPeersToLeader}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <ModalBody>
        <Row className="mb-3">
          <Col className="d-flex gap-2">
            <Button color="primary" size="sm" onClick={handleSelectAll}>
              Selecionar Todos
            </Button>
            <Button color="secondary" size="sm" onClick={handleClearAll}>
              Limpar
            </Button>
          </Col>
        </Row>

        <Card>
          <CardHeader>
            <strong>Pares Possíveis</strong>
          </CardHeader>
          <CardBody style={{ maxHeight: "300px", overflowY: "auto" }}>
            {possiblePeers.length === 0 && (
              <p className="text-muted">Nenhum par disponível</p>
            )}

            {possiblePeers.map((peer) => {
              const isSelected =
                (localState.selectedLeaderPeers[leaderIdToAddingPairsToLeader] || []).includes(peer.id);

              return (
                <div key={peer.id} className="custom-control custom-checkbox mb-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`chk-leader-${leaderIdToAddingPairsToLeader}-${peer.id}`}
                    checked={isSelected}
                    onChange={() => handleTogglePeer(peer.id)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`chk-leader-${leaderIdToAddingPairsToLeader}-${peer.id}`}
                  >
                    {peer.fullName} - <small>{peer.roleName}</small>
                  </label>
                </div>
              );
            })}
          </CardBody>
        </Card>

        {/* Revisão */}
        <h6 className="mt-4">Revisão</h6>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Pares Selecionados</th>
            </tr>
          </thead>
          <tbody>
            {(localState.selectedLeaderPeers[leaderIdToAddingPairsToLeader] || []).map((pid) => {
              const peer = possiblePeers.find((p) => p.id === pid);
              return (
                <tr key={pid}>
                  <td>{peer ? peer.fullName : "Indefinido"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleCloseModalAddingPeersToLeader}>
          Cancelar
        </Button>
        <Button color="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
