export const handleDateFormatting = (value, setDate, setDateState, setFormattedDate = null) => {
    console.log(typeof value)
    if (value._d && !isNaN(value._d)) {
        const year = value._d.getFullYear();
        const month = String(value._d.getMonth() + 1).padStart(2, '0');
        const day = String(value._d.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        if (setFormattedDate) {
            setDate(value._d);
            setFormattedDate(formattedDate);
        } else {
            setDate(formattedDate);
        }
    }
    if (value === "") {
        setDateState("invalid");
    } else {
        setDateState("valid");
    }
};
