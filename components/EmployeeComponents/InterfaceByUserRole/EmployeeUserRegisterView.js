// nodejs library to set properties for components
import { Container } from "reactstrap";
import AdminHeader from "../../Headers/AdminHeader"
import CustomerHeader from "../../Headers/CustomerHeader"
import EmployeeUserRegister from "../../Forms/CustomerForms/EmployeeUserRegister"
import { useAuth } from "../../../hooks/useAuth";
import { useContext } from "react";
import { EmployeeContext } from "../../../contexts/RecordsContext/EmployeeContext";


const EmployeeUserRegisterView = () => {

    const { authenticationDataLoggedInUser } = useAuth();

    const { handleShowDynamicEmployeeComponent } = useContext(EmployeeContext);

    return (
        <>
            {
                authenticationDataLoggedInUser &&
                    authenticationDataLoggedInUser.role === 'administrator'
                    ? (
                        <>
                            <AdminHeader
                                name="Colaboradores"
                                parentName="Cadastros"
                                newRegistrationButtonText="Voltar"
                                handleShowEmployeeUserRegister={() => handleShowDynamicEmployeeComponent('employeeList')}
                                employeeRecordEntrySettingsButtonName="Configurações"
                                handleShowEmployeeRecordEntrySettings={() => handleShowDynamicEmployeeComponent('employeeRegisterSettings')}
                            />
                            <Container className="mt--6" fluid>
                                <EmployeeUserRegister />
                            </Container>
                        </>
                    )
                    : (
                        authenticationDataLoggedInUser &&
                        authenticationDataLoggedInUser.role === 'customer' &&
                        <>
                            <CustomerHeader
                                name="Colaboradores"
                                parentName="Cadastros"
                                newRegistrationButtonText="Voltar"
                                handleShowEmployeeUserRegister={() => handleShowDynamicEmployeeComponent('employeeList')}
                                employeeRecordEntrySettingsButtonName="Configurações"
                                handleShowEmployeeRecordEntrySettings={() => handleShowDynamicEmployeeComponent('employeeRegisterSettings')}
                            />
                            <Container className="mt--6" fluid>
                                <EmployeeUserRegister />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

export default EmployeeUserRegisterView;