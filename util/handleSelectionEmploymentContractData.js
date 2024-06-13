export function handleSelectionEmploymentContractData(selectedId, dataList, setItem, setItemState) {
    if (dataList && dataList.length !== 0) {
        const optionType = dataList.filter(option => option.id === selectedId);
        setItem(optionType[0]?.text || '');
        setItemState(optionType.length === 0 ? "invalid" : "valid");
    }
    console.log("Passou por handleSelectionEmploymentContractData = ", selectedId)
}