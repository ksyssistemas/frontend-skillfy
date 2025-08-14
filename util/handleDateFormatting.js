export const handleDateFormatting = (dispatch, value, dateAction, stateAction, formattedDateAction) => {
    if (dispatch) {
        if (value._d && !isNaN(value._d)) {
            const year = value._d.getUTCFullYear();
            const month = String(value._d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(value._d.getUTCDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            // Despacha ações para o Reducer
            dispatch({ type: dateAction, payload: formattedDate });
            dispatch({ type: stateAction, payload: 'valid' });
            formattedDateAction(formattedDate);
        } else {
            dispatch({ type: stateAction, payload: 'invalid' });
        }
    } else {
        if (value._d && !isNaN(value._d)) {
            const year = value._d.getUTCFullYear();
            const month = String(value._d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(value._d.getUTCDate()).padStart(2, '0');
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