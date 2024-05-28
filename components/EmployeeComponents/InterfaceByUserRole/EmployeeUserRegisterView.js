// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import AdminHeader from "../../Headers/AdminHeader"
import CustomerHeader from "../../Headers/CustomerHeader"
import EmployeeUserRegister from "../../Forms/EmployeeUserRegister"


const EmployeeUserRegisterView = ({ authenticationDataLoggedInUser, handleShowEmployeeRecordEntrySettings }) => {
    return (
        <>
            {
                authenticationDataLoggedInUser &&
                    authenticationDataLoggedInUser.role === 'administrator'
                    ? (
                        <>
                            <AdminHeader name="Colaboradores" parentName="Cadastros" employeeRecordEntrySettingsButtonName="Configurações" handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} />
                            <Container className="mt--6" fluid>
                                <EmployeeUserRegister />
                            </Container>
                        </>
                    )
                    : (
                        authenticationDataLoggedInUser &&
                        authenticationDataLoggedInUser.role === 'customer' &&
                        <>
                            <CustomerHeader name="Colaboradores" parentName="Cadastros" employeeRecordEntrySettingsButtonName="Configurações" handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} />
                            <Container className="mt--6" fluid>
                                <EmployeeUserRegister />
                            </Container>
                        </>
                    )
            }
        </>
    );
}


EmployeeUserRegisterView.propTypes = {
    handleShowEmployeeRecordEntrySettings: () => { },
}

EmployeeUserRegisterView.propTypes = {
    authenticationDataLoggedInUser: PropTypes.object,
    handleShowEmployeeRecordEntrySettings: PropTypes.func,
};
export default EmployeeUserRegisterView;