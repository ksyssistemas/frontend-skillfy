
import { createContext, ReactNode, useState, useContext } from "react";
// reactstrap components
import { Alert } from 'reactstrap';

const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);

    const showAlert = (color, icon, title, message) => {
        const id = Date.now();
        const newAlert = { id, color, icon, title, message };
        setAlerts([...alerts, newAlert]);

        // Remover o alerta após 5 segundos
        setTimeout(() => removeAlert(id), 5000);
    };

    const removeAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
        <AlertContext.Provider
            value={{
                showAlert,
            }}
        >
            {children}
            <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, width: '80%', maxWidth: '600px' }}>
                {alerts.map(alert => (
                    <Alert color={alert.color} isOpen={true} key={alert.id}>
                        <span className="alert-icon">
                            <i className={alert.icon} />
                        </span>
                        <span className="alert-text">
                            <strong>{alert.title}</strong> {alert.message}
                        </span>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={() => removeAlert(alert.id)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Alert>
                ))}
            </div>
        </AlertContext.Provider>
    );
}

// Custom hook para usar o alerta
export const useAlert = () => useContext(AlertContext);