import { handleSelectionEmploymentContractDataWithReducer } from "./handleSelectionEmploymentContractDataWithReducer";

export function selectedListItemToUpdate(
  dispatch,
  itemLabel,
  list,
  setSelectedItem,
  setItem,
  setItemState,
) {
  const selectedItem = list.find(p => p.id === itemLabel);
  if (selectedItem) {
    handleSelectionEmploymentContractDataWithReducer(
      dispatch,
      selectedItem.id,
      list,
      setSelectedItem,
      setItem,
      setItemState,
      null,
      null,
      'id'
    );
  }
};