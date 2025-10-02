import { SimpleEmployeeList } from "./SimpleEmployeeList";
import { VirtualizedEmployeeList } from "./VirtualizedEmployeeList";

export function EmployeeList({ leaderId, employees, toggleEmployeeSelection, peers = {} }) {
  if (!employees || employees.length === 0) {
    return <p className="text-muted">Nenhum liderado disponível</p>;
  }

  const listHeight = Math.min(employees.length * 40, 200);

  return employees.length > 10 ? (
    <VirtualizedEmployeeList
      leaderId={leaderId}
      employees={employees}
      toggleEmployeeSelection={toggleEmployeeSelection}
      peers={peers}
      height={listHeight}
    />
  ) : (
    <SimpleEmployeeList
      leaderId={leaderId}
      employees={employees}
      toggleEmployeeSelection={toggleEmployeeSelection}
      peers={peers}
    />
  );
}