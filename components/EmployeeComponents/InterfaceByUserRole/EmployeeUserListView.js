// nodejs library to set properties for components
import { useContext } from "react";
import { Container } from "reactstrap";
import AdminHeader from "../../Headers/AdminHeader"
import CustomerHeader from "../../Headers/CustomerHeader"
import EmployeeUserList from "../../Tables/Customer/EmployeeUserList"
import { useAuth } from '../../../hooks/useAuth';
import { EmployeeContext } from '../../../contexts/RecordsContext/EmployeeContext';

const EmployeeUserListView = () => {
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
                                parentName="Registros"
                                newRegistrationButtonText="Adicionar Colaborador"
                                handleShowEmployeeUserRegister={() => handleShowDynamicEmployeeComponent('employeeRegister')}
                                employeeRecordEntrySettingsButtonName="Configurações"
                                handleShowEmployeeRecordEntrySettings={() => handleShowDynamicEmployeeComponent('employeeRegisterSettings')}
                            />
                            <Container className="mt--6" fluid>
                                <EmployeeUserList />
                            </Container>
                        </>
                    )
                    : (
                        authenticationDataLoggedInUser &&
                        authenticationDataLoggedInUser.role === 'customer' &&
                        <>
                            <CustomerHeader
                                name="Colaboradores"
                                parentName="Registros"
                                newRegistrationButtonText="Adicionar Colaborador"
                                handleShowEmployeeUserRegister={() => handleShowDynamicEmployeeComponent('employeeRegister')}
                                employeeRecordEntrySettingsButtonName="Configurações"
                                handleShowEmployeeRecordEntrySettings={() => handleShowDynamicEmployeeComponent('employeeRegisterSettings')}
                            />
                            <Container className="mt--6" fluid>
                                <EmployeeUserList />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

export default EmployeeUserListView;