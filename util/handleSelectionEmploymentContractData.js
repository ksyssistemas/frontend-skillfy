export function handleSelectionEmploymentContractData(
    selectedId,
    dataList,
    setSelectedItem,
    setItem,
    setItemState,
    setSelectedDepartmentId = null,
    setHasDepartmentSelected = null
) {
    if (dataList && dataList.length !== 0) {
        const optionType = dataList.filter(option => option.id === selectedId);
        setSelectedItem(selectedId);
        setItem(optionType[0]?.text);
        setItemState(optionType.length === 0 ? "invalid" : "valid");
        if (setSelectedDepartmentId) {
            setSelectedDepartmentId(selectedId);
        }
        if (setHasDepartmentSelected) {
            setHasDepartmentSelected(true);
        }
    }
}