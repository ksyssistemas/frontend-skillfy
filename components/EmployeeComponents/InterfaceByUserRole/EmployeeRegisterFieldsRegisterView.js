// nodejs library to set properties for components
import { Container } from "reactstrap";
import AdminHeader from "../../Headers/AdminHeader"
import CustomerHeader from "../../Headers/CustomerHeader"
import EmployeeRegisterFieldsRegister from "../../Forms/CustomerForms/EmployeeRegisterFieldsRegister"
import { useAuth } from "../../../hooks/useAuth";
import { useContext } from "react";
import { EmployeeContext } from "../../../contexts/RecordsContext/EmployeeContext";


const EmployeeRegisterFieldsRegisterView = () => {
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
                                parentName="Definição dos Campos"
                                newRegistrationButtonText="Retornar à Lista"
                                handleShowEmployeeUserRegister={() => handleShowDynamicEmployeeComponent('employeeList')}
                                employeeRecordEntrySettingsButtonName="Retornar ao Cadastro"
                                handleShowEmployeeRecordEntrySettings={() => handleShowDynamicEmployeeComponent('employeeRegister')}
                            />
                            <Container className="mt--6" fluid>
                                <EmployeeRegisterFieldsRegister />
                            </Container>
                        </>
                    ) : (
                        <>
                            <CustomerHeader
                                name="Colaboradores"
                                parentName="Definição dos Campos"
                                newRegistrationButtonText="Retornar à Lista"
                                handleShowEmployeeUserRegister={() => handleShowDynamicEmployeeComponent('employeeList')}
                                employeeRecordEntrySettingsButtonName="Retornar ao Cadastro"
                                handleShowEmployeeRecordEntrySettings={() => handleShowDynamicEmployeeComponent('employeeRegister')}
                            />
                            <Container className="mt--6" fluid>
                                <EmployeeRegisterFieldsRegister />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

export default EmployeeRegisterFieldsRegisterView;