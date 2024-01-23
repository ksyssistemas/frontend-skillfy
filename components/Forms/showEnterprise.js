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

const fakeCompanies = [
    {
      id: 1,
      name: 'Empresa A',
      cnpj: '12345678901234',
      phone: '987654321',
      address: 'Rua da Empresa A, 123',
    },
    {
      id: 2,
      name: 'Empresa B',
      cnpj: '56789012345678',
      phone: '876543210',
      address: 'Avenida da Empresa B, 456',
    },

  ];
  

const EnterpriseList = () => {
  const deleteCompany = (companyId) => {

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
            <th>Nome da Empresa</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Criado em</th>
            <th />
          </tr>
        </thead>
        <tbody className="text-center">
          {fakeCompanies.map((company) => (
            <tr key={company.id}>
              <td className="table-user">
                <b>{company.name}</b>
              </td>
              <td>
                <span className="text-muted">{company.cnpj}</span>
              </td>
              <td>
                <span className="text-muted">{company.phone}</span>
              </td>
              <td>
                <span className="text-muted">{company.address}</span>
              </td>
              <td>
                <span className="text-muted">Data de criação fictícia</span>
              </td>
              <td className="table-actions">
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
    </Card>
  );
};

export default EnterpriseList;
