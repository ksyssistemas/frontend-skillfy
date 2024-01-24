import React from 'react';
import {
  Card,
  CardBody,
  Table
} from 'reactstrap';

import mockFormData from "../../../Mocks/mockFormData"

const AdminList = () => {

  const headers = Object.keys(mockFormData);

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
              <tr>
                {headers.map((label, index) => (
                  <td key={index}>{mockFormData[label]}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default AdminList;