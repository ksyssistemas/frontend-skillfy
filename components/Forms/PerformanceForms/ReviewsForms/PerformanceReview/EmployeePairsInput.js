import React from "react";
import TagsInput from "../../../../TagsInput/TagsInput";

const EmployeePairsInput = ({ listPairEmployeeDataToReview, setListPairEmployeeDataToReview }) => {
  return (
    <div className="d-flex flex-column gap-2">
      {listPairEmployeeDataToReview.map((employeeData, index) => (
        <div key={index} className="mb-2">
          {/* Renderizar o employeeName como rótulo */}
          <p
            id={`tagsinput-${index}`}
            className="text-muted text-sm mb-0"
            //className="form-control-label font-weight-bold mb-2"
          >
            {employeeData.employeeName}
          </p>

          {/* Componente TagsInput para os pares */}
          <TagsInput
            onlyUnique
            className="bootstrap-tagsinput"
            value={employeeData.pairs.map((pair) => pair.pairNameOnReview)} // Apenas os nomes dos pares
            renderInput={() => null} // Não renderizar o campo de entrada
            tagProps={{ className: "tag badge badge-info mr-1 mb-0 mt-0" }}
            inputProps={{
              id: `tagsinput-${index}`,
              //className: "form-control",
              //placeholder: "Adicionar pares...",
            }}
            // onChange={(updatedValues) => {
            //   // Atualizar os pares no estado original
            //   const updatedPairs = updatedValues.map((pairName, pairIndex) => ({
            //     ...employeeData.pairs[pairIndex],
            //     pairNameOnReview: pairName,
            //   }));

            //   const updatedData = [...listPairEmployeeDataToReview];
            //   updatedData[index] = { ...employeeData, pairs: updatedPairs };
            //   setListPairEmployeeDataToReview(updatedData);
            // }}
          />
        </div>
      ))}
    </div>
  );
};

export default EmployeePairsInput;
