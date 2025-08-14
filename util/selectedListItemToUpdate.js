import { handleSelectionEmploymentContractDataWithReducer } from "./handleSelectionEmploymentContractDataWithReducer";

export function selectedListItemToUpdate(
  dispatch,
  itemLabel,
  list,
  setSelectedItem,
  setItem,
  setItemState,
  setSelectedDepartmentIdAction = null,
  setHasDepartmentSelectedAction = null,
  savedDataType = 'id'
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
      setSelectedDepartmentIdAction,
      setHasDepartmentSelectedAction,
      savedDataType
    );
  }
};