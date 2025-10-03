// EmployeeRow.js
export function EmployeeRow({ leaderId, employee, style, toggleEmployeeSelection, peers = {} }) {
  if (!leaderId || !employee?.id) return null;

  const peerCount = peers[employee.id]?.length || 0;
  
  // 🔹 Use employee.selected que agora está sincronizado
  const isChecked = employee.selected === true;

  return (
    <div style={style} className="custom-control custom-checkbox mb-2 d-flex align-items-center">
      <input
        className="custom-control-input"
        id={`chk-${leaderId}-${employee.id}`}
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleEmployeeSelection(leaderId, employee.id)}
      />
      <label
        className="custom-control-label d-flex align-items-center"
        htmlFor={`chk-${leaderId}-${employee.id}`}
      >
        {employee.fullName}
        {peerCount > 0 && (
          <span className="text-muted ml-2">({peerCount} pares)</span>
        )}
      </label>
    </div>
  );
}