import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Performance from "../../layouts/Performance";
import AppraisalCycleHeader from "../../components/Headers/PerformanceHeader/AppraisalCycleHeader";
import AppraisalListHeader from "../../components/Headers/PerformanceHeader/AppraisalListHeader";
import AppraisalCycleTable from "../../components/Tables/AppraisalTables/appraisal-cycle-table";
import AppraisalListTable from "../../components/Tables/AppraisalTables/appraisal-list-table";

function AppraisalCycle() {
  const [admins, setAdmins] = useState([]);
  const [ appraisalIdToBeShown, setAppraisalIdToBeShown ] = useState(null);

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

  function handleShowAppraisalList(appraisalId) {
    setAppraisalIdToBeShown(appraisalId);
  } 

  return (
    <>
      {
        appraisalIdToBeShown 
        ? (
          <>
            <AppraisalListHeader name="Lista de Avaliações" parentName="Desenvolvimento" />
            <Container className="mt--6" fluid>
              <AppraisalListTable/>
            </Container>
          </>
          ) 
        : (
          <>
            <AppraisalCycleHeader name="Ciclos de Avaliação" parentName="Desenvolvimento" />
            <Container className="mt--6" fluid>
                <AppraisalCycleTable handleShowAppraisalList={handleShowAppraisalList}/>
            </Container>
          </>
          )
      }
    </>
  );
}

AppraisalCycle.layout = Performance;

export default AppraisalCycle;
