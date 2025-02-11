import React from "react";
import TagsInput from "../../../../TagsInput/TagsInput";

const EmployeePairsInput = ({ handleTagRandomPairRemoval, state, dispatch }) => {
  const {
    randomPairTagsInput,
    listPairEmployeeDataToReview,
    pairsNumberToDrawn
  } = state.reviewParticipantsSelectionData;

  return (
    <div className="d-flex flex-column gap-2">
      {Object.values(listPairEmployeeDataToReview || {}).map((employeeData) => {
         // Define se deve exibir mensagem de erro/aviso
         const isInsufficient = pairsNumberToDrawn < 0 || employeeData.insufficientPairNumbers;
         // Valor atual das tags para este item:
         const currentTags = isInsufficient
           ? [employeeData.insufficientPairNumbers || "Número inválido de pares"]
           : employeeData.pairs.map(pair => pair.pairNameOnReview);

        return (
          <div key={employeeData.employeeId} className="mb-2">
            <p id={`tagsinput-${employeeData.employeeId}`} className="text-muted text-sm mb-0">
              {employeeData.employeeName}
            </p>
            <TagsInput
              onlyUnique
              className="bootstrap-tagsinput"
              onChange={async (updatedTags) => {
                const removedTag = currentTags.find((tag) => !updatedTags.includes(tag));

                if (removedTag) {
                  await handleTagRandomPairRemoval(
                    employeeData.employeeId,
                    removedTag,
                    state,
                    dispatch
                  );
                } else {
                  dispatch({
                    type: "SET_RANDOM_PAIR_TAGS_INPUT",
                    payload: { [employeeData.employeeId]: updatedTags },
                  });
                }
              }}
              value={currentTags}
              tagProps={{ className: "tag badge badge-info mr-1 mb-0 mt-0" }}
              inputProps={{
                className: "",
                placeholder: "",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EmployeePairsInput;
