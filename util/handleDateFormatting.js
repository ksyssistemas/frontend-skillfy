export const handleDateFormatting = (dispatch, value, dateAction, stateAction, formattedDateAction) => {
    if (dispatch) {
        if (value._d && !isNaN(value._d)) {
            const year = value._d.getFullYear();
            const month = String(value._d.getMonth() + 1).padStart(2, '0');
            const day = String(value._d.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            // Despacha ações para o Reducer
            dispatch({ type: dateAction, payload: formattedDate });
            dispatch({ type: stateAction, payload: 'valid' });
            dispatch({ type: formattedDateAction, payload: formattedDate });
        } else {
            dispatch({ type: stateAction, payload: 'invalid' });
        }
    } else {
        if (value._d && !isNaN(value._d)) {
            const year = value._d.getFullYear();
            const month = String(value._d.getMonth() + 1).padStart(2, '0');
            const day = String(value._d.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            if (formattedDateAction) {
                dateAction(value._d);
                formattedDateAction(formattedDate);
            } else {
                dateAction(formattedDate);
            }
        }
        if (stateAction) {
            if (value === "") {
                stateAction("invalid");
            } else {
                stateAction("valid");
            }
        }
    };
};