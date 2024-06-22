// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import AdminHeader from "../../Headers/AdminHeader"
import CustomerHeader from "../../Headers/CustomerHeader"
import EmployeeRegisterFieldsRegister from "../../Forms/EmployeeRegisterFieldsRegister"


const EmployeeRegisterFieldsRegisterView = ({ authenticationDataLoggedInUser, handleShowEmployeeRecordEntrySettings }) => {
    return (
        <>
            {
                authenticationDataLoggedInUser &&
                    authenticationDataLoggedInUser.role === 'administrator'
                    ? (
                        <>
                            <AdminHeader name="Colaboradores" parentName="Definição dos Campos" employeeRecordEntrySettingsButtonName="Retornar ao Cadastro" handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} />
                            <Container className="mt--6" fluid>
                                <EmployeeRegisterFieldsRegister />
                            </Container>
                        </>
                    ) : (
                        <>
                            <CustomerHeader name="Colaboradores" parentName="Definição dos Campos" employeeRecordEntrySettingsButtonName="Retornar ao Cadastro" handleShowEmployeeRecordEntrySettings={handleShowEmployeeRecordEntrySettings} />
                            <Container className="mt--6" fluid>
                                <EmployeeRegisterFieldsRegister />
                            </Container>
                        </>
                    )
            }
        </>
    );
}

EmployeeRegisterFieldsRegisterView.propTypes = {
    authenticationDataLoggedInUser: PropTypes.object,
};

export default EmployeeRegisterFieldsRegisterView;