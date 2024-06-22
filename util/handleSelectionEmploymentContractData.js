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
        console.log("selectedId: ", selectedId)
        console.log("dataList: ", dataList);
        const optionType = dataList.filter(option => option.id === selectedId);
        console.log("optionType: ", optionType);
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