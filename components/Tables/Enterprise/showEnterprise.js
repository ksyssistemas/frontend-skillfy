import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';


import ModalEnterprise from "../../Modals/admin/ModalEnterprise"
import fakeCompanies from '../../../Mocks/mockEnterprise';


const EnterpriseList = () => {
  const deleteCompany = (companyId) => {

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

  return (
    <Card>
      <CardHeader className="border-0">
        <Row>
          <Col xs="6">
            <h3 className="mb-0">Empresas Cadastradas</h3>
          </Col>
          <Col className="text-right" xs="6">
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
          </Col>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th className="text-center">Nome da Empresa</th>
            <th className="text-center">CNPJ</th>
            <th className="text-center">Telefone</th>
            <th className="text-center">Endereço</th>
            <th className="text-center">Criado em</th>
            <th className="text-center" />
          </tr>
        </thead>
        <tbody>
          {fakeCompanies.map((company) => (
            <tr key={company.id}>
              <td className="text-center">{company.name}</td>
              <td className="text-center">{company.cnpj}</td>
              <td className="text-center">{company.phone}</td>
              <td className="text-center">{company.address}</td>
              <td className="text-center">Data de criação fictícia</td>
              <td className="text-center table-actions">
                <a
                  className="table-action table-action-delete"
                  href="#pablo"
                  id={`deleteCompany${company.id}`}
                  onClick={() => deleteCompany(company.id)}
                >
                  <i className="fas fa-trash" />
                </a>
                <UncontrolledTooltip delay={0} target={`deleteCompany${company.id}`}>
                  Excluir Empresa
                </UncontrolledTooltip>
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


    </Card>
  );
};

export default EnterpriseList;
