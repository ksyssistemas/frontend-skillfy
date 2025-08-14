import { useContext } from "react";
import AdminHeader from "components/Headers/AdminHeader.js";
import CustomersUserList from "../../components/Tables/Customer/CustomersUserList";
import { Container } from "reactstrap";
import CustomerUserRegister from "../../components/Forms/CustomerForms/CustomerUserRegister";
import DynamicLayout from "../../layouts/DynamicLayout";
import { CustomerContext } from "../../contexts/RecordsContext/CustomerContext";

function CustomerRecords() {
  const {
    isShouldSubmitCustomerRegistration,
    handleShowCustomerUserRegister
  } = useContext(CustomerContext);

  return (
    <>
      {
        !isShouldSubmitCustomerRegistration
          ? (
            <>
              <AdminHeader
                name="Cliente"
                parentName="Registros"
                newRegistrationButtonText="Adicionar Cliente"
                handleShowCustomerUserRegister={handleShowCustomerUserRegister}
              />
              <Container className="mt--6" fluid>
                <CustomersUserList />
              </Container>
            </>
          )
          : (
            <>
              <AdminHeader
                name="Cliente"
                parentName="Cadastros"
                newRegistrationButtonText="Voltar"
                handleShowAdminUserRegister={handleShowCustomerUserRegister}
              />
              <Container className="mt--6" fluid>
                <CustomerUserRegister />
              </Container>
            </>
          )
      }
    </>
  );
}

CustomerRecords.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default CustomerRecords;
