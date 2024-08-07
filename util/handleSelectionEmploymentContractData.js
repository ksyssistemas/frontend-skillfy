export function handleSelectionEmploymentContractData(
    selectedId,
    dataList,
    setSelectedItem,
    setItem,
    setItemState,
    setSelectedDepartmentId = null,
    setHasDepartmentSelected = null,
    savedDataType = ''
) {
    if (dataList && dataList.length !== 0) {
        const optionType = dataList.filter(option => option.id === selectedId);
        setSelectedItem(selectedId);

        if (savedDataType === 'id') {
            setItem(optionType[0]?.id);
        } else {
            setItem(optionType[0]?.text);
        }

        setItemState(optionType.length === 0 ? "invalid" : "valid");

        if (setSelectedDepartmentId) {
            setSelectedDepartmentId(selectedId);
        }
        if (setHasDepartmentSelected) {
            setHasDepartmentSelected(true);
        }
    }
}