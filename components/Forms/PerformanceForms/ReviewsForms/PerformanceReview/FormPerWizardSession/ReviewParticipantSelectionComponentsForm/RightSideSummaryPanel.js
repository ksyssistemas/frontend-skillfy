import { useContext } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { ReviewParticipantSelectionContext } from "../../../../../../../contexts/PerformanceContext/RightSideSummaryPanel/ReviewParticipantSelectionContext";

function SummaryCard({ title, count }) {
  return (
    <Card className="border-0 shadow-sm mb-3">
      <CardHeader className="bg-light">
        <h4 className="mb-0">{title}</h4>
      </CardHeader>
      <CardBody>
        <h3 className="fw-bold mb-0">Selecionados {count}</h3>
      </CardBody>
    </Card>
  );
}

export default function RightSideSummaryPanel() {
  const { state, dispatch } = useContext(ReviewParticipantSelectionContext);
  const localState = state.reviewParticipantsSelectionData;

  // 🔹 DEBUG - remova depois
  console.log('selectedLedEmployees:', localState.selectedLedEmployees);

  if (!localState?.selectedLeaders?.length) {
    return null;
  }

  const selectedLeaders = Array.isArray(localState.selectedLeaders)
    ? localState.selectedLeaders
    : [];

  // 🔹 CORRIGIDO: Conta apenas os IDs em selectedLedEmployees
  const selectedLedEmployeesCount = Object.values(localState.selectedLedEmployees || {})
    .reduce((total, ids) => total + (Array.isArray(ids) ? ids.length : 0), 0);

  const selectedPeers = Object.values(localState.selectedPeers || {}).flat();
  const selectedLeaderPeers = Object.values(localState.selectedLeaderPeers || {}).flat();

  const counts = {
    leaders: selectedLeaders.length,
    ledEmployees: selectedLedEmployeesCount,
    peers: selectedPeers.length,
    leaderPeers: selectedLeaderPeers.length,
  };


  return (
    <Card className="shadow-sm border-0 rounded-3">
      <CardHeader>
        <h4 className="mb-0">Resumo da Seleção</h4>
      </CardHeader>
      <CardBody className="p-3 bg-lighter">
        <SummaryCard title="Líderes" count={counts.leaders} />
        <SummaryCard title="Pares de Líderes" count={counts.leaderPeers} />
        <SummaryCard title="Liderados" count={counts.ledEmployees} />
        <SummaryCard title="Pares" count={counts.peers} />
      </CardBody>
    </Card>
  );
}