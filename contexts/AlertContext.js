
import { createContext, ReactNode, useState } from "react";
// reactstrap components
import {
    UncontrolledAlert,
} from "reactstrap";

export const AlertContext = createContext({});

function AlertProvider({ children }) {

    const showAlert = (props) => {
        const { alertComponentTheme, alertComponentIcon, alertMessageTitle, alertMessageText } = props;

        return (
            <UncontrolledAlert className={alertComponentTheme}>
                <span className="alert-icon">
                    <i className={alertComponentIcon} />
                </span>
                <span className="alert-text ml-1">
                    <strong>{alertMessageTitle}</strong>{alertMessageText}
                </span>
            </UncontrolledAlert>
        );
    }

    return (
        <AlertContext.Provider
            value={{
                showAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
}

export { AlertProvider };