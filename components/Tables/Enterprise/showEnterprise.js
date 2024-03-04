import React, { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';

import ShowCustomerDetailsModal from "../../Modals/admin/show-customer-details";
import ModalEnterprise from "../../Modals/admin/ModalEnterprise"
import fakeCompanies from '../../../mocks/mockEnterprises'

import useCNPJ from "../../../hooks/useCNPJ"

const EnterpriseList = () => {

  const [cnpj, setCnpj] = useState('19131243000197');
  const { data: enterpriseData, loading, error, setCnpj: setCnpjFromHook } = useCNPJ(cnpj);

  const handleCnpjChange = (event) => {
    // Atualiza o estado local do CNPJ e chama a função setCnpj do hook
    setCnpj(event.target.value);
    setCnpjFromHook(event.target.value);
  };

  const deleteCompany = (companyId) => {
    // Implemente a lógica para deletar a empresa
  };



  {/** Modal  Enterprise*/ }
  const [modalEnterpriseOpen, setModalEnterpriseOpen] = React.useState(false);

  const toggleModalEnterprise = () => {
    setModalEnterpriseOpen(!modalEnterpriseOpen);
  };

  const handleSave = () => {
    toggleModalEnterprise();
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  function handleShowCustomerDetailsModal() {
    setModalOpen(!modalOpen)
  }

  return (
    <Card>
      <CardHeader className="border-0">
        <Row>
          <Col xs="6">
            <h3 className="mb-0">Lista de Clientes</h3>
          </Col>
          {/* <Col className="text-right" xs="6">
            <Button
              className="btn-neutral btn-round btn-icon"
              color="default"
              href="#pablo"
              id="tooltipCadastro"
              onClick={toggleModalEnterprise}
              size="sm"
            >
              <span className="btn-inner--icon mr-1">
                <i className="fas fa-user-plus" />
              </span>
              <span className="btn-inner--text">Cadastrar</span>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltipCadastro">
              Cadastrar Adm
            </UncontrolledTooltip>
            <Button
              className="btn-neutral btn-round btn-icon"
              color="default"
              href="#pablo"
              id="tooltipExport"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              <span className="btn-inner--icon mr-1">
                <i className="fas fa-building" />
              </span>
              <span className="btn-inner--text">Exportar</span>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltipExport">
              Exportar Empresas
            </UncontrolledTooltip>
          </Col> */}
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th className="text-center">Nome</th>
            <th className="text-center">CNPJ</th>
            <th className="text-center">E-mail Titular</th>
            <th className="text-center">Telefone</th>
            <th className="text-center">Plano</th>
            <th className="text-center">Estado</th>
            <th className="text-center">Detalhes</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {fakeCompanies.map((company) => (
            <tr key={company.id}>
              <td className="text-center">{company.name}</td>
              <td className="text-center">{company.cnpj}</td>
              <td className="text-center">{company.accountHolderEmail}</td>
              <td className="text-center">{company.phone}</td>
              <td className="text-center">{company.plan}</td>
              <td className="text-center">
                <Badge className="badge-lg" color="success">
                  Active{company.status}
                </Badge>
              </td>
              <td className="text-center text-muted ">
                <Nav navbar>
                  <NavItem>
                    <NavLink target="_blank">
                      <a href="#" className="text-underline">
                        <span
                          onClick={handleShowCustomerDetailsModal}
                          className="name mb-0 text-sm"
                        >
                          Ver mais
                        </span>
                      </a>
                    </NavLink>
                  </NavItem>
                </Nav>

              </td>
              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    color=""
                    role="button"
                    size="sm"
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <ModalEnterprise
        isOpen={modalEnterpriseOpen}
        toggle={toggleModalEnterprise}
        handleSave={handleSave}
        //formData={formData}
        handleInputChange={handleInputChange}
      />


      {/* <div>
        {enterpriseData && (
          <div>
            <h2>Endereço da Empresa</h2>
            <p>Logradouro: {enterpriseData.logradouro}</p>
            <p>Bairro: {enterpriseData.bairro}</p>
            <p>Município: {enterpriseData.municipio}</p>
            <p>UF: {enterpriseData.uf}</p>
            <p>CEP: {enterpriseData.cep}</p>
            {/* Outros detalhes de endereço, se necessário 
          </div>
        )}
      </div> 
    */}
    <ShowCustomerDetailsModal 
            handleShowCustomerDetailsModal={handleShowCustomerDetailsModal}
            modalOpen={modalOpen}
          />

    </Card>


  );
};

export default EnterpriseList;
