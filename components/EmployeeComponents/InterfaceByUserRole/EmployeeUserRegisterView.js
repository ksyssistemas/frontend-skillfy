// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import AdminHeader from "../../Headers/AdminHeader"
import CustomerHeader from "../../Headers/CustomerHeader"
import EmployeeUserRegister from "../../Forms/EmployeeUserRegister"


const EmployeeUserRegisterView = ({ handleShowEmployeeUserRegister, authenticationDataLoggedInUser, handleShowEmployeeRecordEntrySettings }) => {
    return (
        <>
            {
                authenticationDataLoggedInUser &&
                    authenticationDataLoggedInUser.role === 'administrator'
                    ? (
                        <>
                            <AdminHeader name="Colaboradores" parentName="Cadastros" employeeRecordEntrySettingsButtonName="Configurações" handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} />
                            <Container className="mt--6" fluid>
                                <EmployeeUserRegister handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} />
                            </Container>
                        </>
                    )
                    : (
                        authenticationDataLoggedInUser &&
                        authenticationDataLoggedInUser.role === 'customer' &&
                        <>
                            <CustomerHeader name="Colaboradores" parentName="Cadastros" employeeRecordEntrySettingsButtonName="Configurações" handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} />
                            <Container className="mt--6" fluid>
                                <EmployeeUserRegister handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} />
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