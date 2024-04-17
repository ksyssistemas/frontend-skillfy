import React, { useState, useEffect } from "react";
import Admin from "../../layouts/Admin";
import Performance from "../../layouts/Performance";
import AdminHeader from "components/Headers/AdminHeader.js";
import CustomerHeader from "../../components/Headers/CustomerHeader";
import EmployeeUserList from "../../components/Tables/Customer/EmployeeUserList";
import EmployeeUserRegister from "../../components/Forms/EmployeeUserRegister";
import { Container } from "reactstrap";

const authenticationDataLoggedInUser = 'customer';

function EmployeeRecords() {
  const [admins, setAdmins] = useState([]);

  const [isShouldSubmitEmployeeRegistration, setIsShouldSubmitEmployeeRegistration] = useState(false);

  function handleShowEmployeeUserRegister() {
    setIsShouldSubmitEmployeeRegistration(!isShouldSubmitEmployeeRegistration);
  }

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await fetch('http://localhost:4008/administrator/findAll');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }
    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`http://localhost:4008/administrator/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete admin.');
      }
      setAdmins(admins.filter(admin => admin.id !== id));
    } catch (error) {
      console.error('There was a problem deleting the admin:', error);
    }
  };

  const fakeAdmins = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', privileges: 0 },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', privileges: 1 },
  ];


  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    birthdate: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };


  const [formDataEmployee, setFormDataEmployee] = useState({
  });

  const handleInputChangeEmployee = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleModal = () => {

  };


  return (
    <>
      {
        !isShouldSubmitEmployeeRegistration
          ? (
            authenticationDataLoggedInUser &&
              authenticationDataLoggedInUser === 'administrator' ?
              (
                <>
                  <AdminHeader name="Colaboradores" parentName="Registros" newRegistrationButtonText="Adicionar Colaborador" handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} />
                  <Container className="mt--6" fluid>
                    <EmployeeUserList />
                  </Container>
                </>
              ) : (
                authenticationDataLoggedInUser &&
                  authenticationDataLoggedInUser === 'customer' ?
                  (
                    <>
                      <CustomerHeader name="Colaboradores" parentName="Registros" newRegistrationButtonText="Adicionar Colaborador" handleShowEmployeeUserRegister={handleShowEmployeeUserRegister} />
                      <Container className="mt--6" fluid>
                        <EmployeeUserList />
                      </Container>
                    </>
                  ) : null

              )
          )
          : (
            authenticationDataLoggedInUser &&
              authenticationDataLoggedInUser === 'administrator' ?
              (
                <>
                  <AdminHeader name="Colaboradores" parentName="Cadastros" />
                  <Container className="mt--6" fluid>
                    <EmployeeUserRegister />
                  </Container>
                </>
              ) : (
                authenticationDataLoggedInUser &&
                  authenticationDataLoggedInUser === 'customer' ?
                  (
                    <>
                      <CustomerHeader name="Colaboradores" parentName="Cadastros" />
                      <Container className="mt--6" fluid>
                        <EmployeeUserRegister />
                      </Container>
                    </>

                  ) : null
              )
          )
      }
    </>
  );
}


authenticationDataLoggedInUser === 'administrator' ? EmployeeRecords.layout = Admin : (authenticationDataLoggedInUser === 'customer' ? EmployeeRecords.layout = Performance : EmployeeRecords.layout = Admin);

export default EmployeeRecords;
