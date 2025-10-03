import { EmployeeRow } from "./EmployeeRow";

export function SimpleEmployeeList({ leaderId, employees, toggleEmployeeSelection, peers = {} }) {
  return (
    <>
      {employees.map((emp) => (
        <EmployeeRow
          key={emp.id}
          leaderId={leaderId}
          employee={emp}
          toggleEmployeeSelection={toggleEmployeeSelection}
          peers={peers}
        />
      ))}
    </>
  );
}
