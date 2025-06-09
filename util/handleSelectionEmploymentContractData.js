export function handleSelectionEmploymentContractData(
    selectedId,
    dataList = [],
    setSelectedItem,
    setItem,
    setItemState,
    setSelectedDepartmentId = null,
    setHasDepartmentSelected = null,
    savedDataType = ''
) {
    try {
        if (!Array.isArray(dataList)) {
            console.error("Erro: dataList não é um array.", dataList);
            dataList = [];
        }

        if (selectedId === "") {
            setSelectedItem('');
            setItem("");
            setItemState("valid");
            return;
        }

        if (typeof setSelectedItem !== 'function' || typeof setItem !== 'function' || typeof setItemState !== 'function') {
            console.error("Uma ou mais funções de callback são inválidas.", {
                setSelectedItem,
                setItem,
                setItemState
            });
            return;
        }

        if (selectedId === "") {
            setSelectedItem('');
            setItem("");
            setItemState("valid");
            return;
        }

        // Filtre dataList para encontrar o item correspondente
        const optionType = dataList.filter(option => option.id === selectedId);
        setSelectedItem(selectedId);

        if (optionType.length > 0) {
            const itemValue = savedDataType === 'id' ? optionType[0].id : optionType[0].text;
            console.log(itemValue);
            setItem(itemValue);
            setItemState("valid");
        } else {
            setItemState("invalid");
        }

        if (setSelectedDepartmentId) {
            setSelectedDepartmentId(selectedId);
        }
        if (setHasDepartmentSelected) {
            setHasDepartmentSelected(true);
        }
    } catch (error) {
        console.error("Erro ao executar handleSelectionEmploymentContractData:", error);
    }
}