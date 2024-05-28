// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import AdminHeader from "../../Headers/AdminHeader"
import CustomerHeader from "../../Headers/CustomerHeader"
import EmployeeUserList from "../../Tables/Customer/EmployeeUserList"

const EmployeeUserListView = ({ authenticationDataLoggedInUser, handleShowEmployeeUserRegister }) => {
    return (
        <>
            {
                authenticationDataLoggedInUser &&
                    authenticationDataLoggedInUser.role === 'administrator'
                    ? (
                        <>
                            <AdminHeader name="Colaboradores" parentName="Registros" newRegistrationButtonText="Adicionar Colaborador" handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} />
                            <Container className="mt--6" fluid>
                                <EmployeeUserList />
                            </Container>
                        </>
                    )
                    : (
                        authenticationDataLoggedInUser &&
                        authenticationDataLoggedInUser.role === 'customer' &&
                        <>
                            <CustomerHeader name="Colaboradores" parentName="Registros" newRegistrationButtonText="Adicionar Colaborador" handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} />
                            <Container className="mt--6" fluid>
                                <EmployeeUserList />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

EmployeeUserListView.propTypes = {
    handleShowEmployeeUserRegister: () => { },
}

EmployeeUserListView.propTypes = {
    authenticationDataLoggedInUser: PropTypes.object,
    handleShowEmployeeUserRegister: PropTypes.func,
};

export default EmployeeUserListView;