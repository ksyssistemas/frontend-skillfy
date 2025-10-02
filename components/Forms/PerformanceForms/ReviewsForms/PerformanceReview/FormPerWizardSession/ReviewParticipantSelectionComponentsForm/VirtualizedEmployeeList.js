import { EmployeeRow } from "./EmployeeRow";
import { FixedSizeList as VirtualizedList } from "react-window";

export function VirtualizedEmployeeList({ leaderId, employees, toggleEmployeeSelection, peers = {}, height }) {
  return (
    <VirtualizedList
      key={`list-${leaderId}`}
      height={height}
      itemCount={employees.length}
      itemSize={40}
      width="100%"
    >
      {({ index, style }) => (
        <EmployeeRow
          leaderId={leaderId}
          employee={employees[index]}
          style={style}
          toggleEmployeeSelection={toggleEmployeeSelection}
          peers={peers}
        />
      )}
    </VirtualizedList>
  );
}
