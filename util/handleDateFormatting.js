export const handleDateFormatting = (
    dispatch,
    value,
    dateAction,
    stateAction,
    formattedDateAction
) => {
    // Função utilitária para converter em Date de forma segura
    const normalizeToDate = (input) => {
        if (!input) return null;

        if (input instanceof Date) return input;

        if (typeof input === "string") {
            if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                const [year, month, day] = input.split("-").map(Number);
                return new Date(year, month - 1, day); // Local timezone
            }
            return new Date(input); // Para ISO ou outros formatos
        }

        if (input._d instanceof Date) {
            return input._d; // Caso venha do ReactDatetime
        }

        return null;
    };

    const date = normalizeToDate(value);

    if (dispatch) {
        if (date && !isNaN(date)) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            const formattedDate = `${year}-${month}-${day}`;

            // Despacha para o reducer
            dispatch({ type: dateAction, payload: formattedDate });
            dispatch({ type: stateAction, payload: "valid" });

            if (formattedDateAction) formattedDateAction(formattedDate);
        } else {
            dispatch({ type: stateAction, payload: "invalid" });
        }
    } else {
        if (date && !isNaN(date)) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            const formattedDate = `${year}-${month}-${day}`;

            if (formattedDateAction) {
                dateAction(date); // Passa o objeto Date original
                formattedDateAction(formattedDate);
            } else {
                dateAction(formattedDate);
            }
        }

        if (stateAction) {
            stateAction(value ? "valid" : "invalid");
        }
    }
};
