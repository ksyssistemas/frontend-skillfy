import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';
import useFetchAdmins from '../../hooks/useFetchAdmins';

const AdminList = () => {
  const admins = useFetchAdmins();
  const headers = Object.keys(admins[0] || {});

  return (
    <Card>
      <CardBody>
        <div className="pl-lg-4">
          <Table>
            <thead>
              <tr>
                {headers.map((label, index) => (
                  <th key={index}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((label, colIndex) => (
                    <td key={colIndex}>{admin[label]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default AdminList;
