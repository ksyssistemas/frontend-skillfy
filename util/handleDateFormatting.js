export const handleDateFormatting = (dispatch, value, dateAction, stateAction, formattedDateAction) => {
    if (typeof dispatch !== 'function') {
        console.error('Dispatch is not a function:', dispatch);
        return;
    }

    if (value._d && !isNaN(value._d)) {
        const year = value._d.getFullYear();
        const month = String(value._d.getMonth() + 1).padStart(2, '0');
        const day = String(value._d.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        dispatch({ type: dateAction, payload: formattedDate });
        dispatch({ type: stateAction, payload: 'valid' });
        dispatch({ type: formattedDateAction, payload: formattedDate });
    } else {
        dispatch({ type: stateAction, payload: 'invalid' });
    }
};
