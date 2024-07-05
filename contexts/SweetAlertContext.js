
import { createContext, useState, useContext } from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";

const SweetAlertContext = createContext({});

export const SweetAlertProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);

    const addAlert = (alert) => {
        setAlerts((prevAlerts) => [...prevAlerts, alert]);
    };

    const removeAlert = () => {
        setAlerts((prevAlerts) => prevAlerts.slice(1));
    };


    const basicAlert = () => {
        addAlert(
            <ReactBSAlert
                style={{ display: "block", marginTop: "-100px" }}
                title="Here's a message!"
                onConfirm={() => removeAlert()}
                onCancel={() => removeAlert()}
                btnSize=""
                text="A few words about this sweet alert ..."
            >
                A few words about this sweet alert ...
            </ReactBSAlert>
        );
    };

    const infoAlert = () => {
        addAlert(
            <ReactBSAlert
                info
                style={{ display: "block", marginTop: "-100px" }}
                title="Info"
                onConfirm={() => removeAlert()}
                onCancel={() => removeAlert()}
                confirmBtnBsStyle="info"
                confirmBtnText="Ok"
                btnSize=""
            >
                A few words about this sweet alert ...
            </ReactBSAlert>
        );
    };

    const successAlert = () => {
        addAlert(
            <ReactBSAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Success"
                onConfirm={() => removeAlert()}
                onCancel={() => removeAlert()}
                confirmBtnBsStyle="success"
                confirmBtnText="Ok"
                btnSize=""
            >
                A few words about this sweet alert ...
            </ReactBSAlert>
        );
    };

    const warningAlert = (
        title,
        confirmBtnText,
        content,
        btnSize = "",
        onConfirmCallback = () => { }
    ) => {
        const handleConfirm = () => {
            onConfirmCallback();
            removeAlert();
        };
        addAlert(
            <ReactBSAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title={title}
                onConfirm={handleConfirm}
                onCancel={() => removeAlert()}
                confirmBtnBsStyle="warning"
                confirmBtnText={confirmBtnText}
                btnSize={btnSize}
            >
                {content}
            </ReactBSAlert>
        );
    };

    const questionAlert = () => {
        addAlert(
            <ReactBSAlert
                custom
                style={{ display: "block", marginTop: "-100px" }}
                title="Question"
                customIcon={
                    <div
                        className="swal2-icon swal2-question swal2-animate-question-icon"
                        style={{ display: "flex" }}
                    >
                        <span className="swal2-icon-text">?</span>
                    </div>
                }
                onConfirm={() => removeAlert()}
                onCancel={() => removeAlert()}
                confirmBtnBsStyle="default"
                confirmBtnText="Ok"
                btnSize=""
            >
                A few words about this sweet alert ...
            </ReactBSAlert>
        );
    };

    return (
        <SweetAlertContext.Provider
            value={{
                basicAlert,
                infoAlert,
                successAlert,
                warningAlert,
                questionAlert,
            }}
        >
            {children}
            {alerts}
        </SweetAlertContext.Provider>
    );
}

// Custom hook para usar o sweet-alert
export const useSweetAlert = () => useContext(SweetAlertContext);