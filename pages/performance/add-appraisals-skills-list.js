import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Performance from "../../layouts/Performance";
import AppraisalCycleHeader from "../../components/Headers/PerformanceHeader/AppraisalCycleHeader";
import AppraisalListHeader from "../../components/Headers/PerformanceHeader/AppraisalListHeader";
import AppraisalCycleTable from "../../components/Tables/AppraisalTables/Appraisal/CycleAppraisal ";
// import AppraisalsListTable from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTable";
import AppraisalsListTableCompetencies from "../../components/Tables/AppraisalTables/Appraisal/AppraisalsListTableCompetencies";
import AddAppraisalCycleModal from "../../components/Modals/AppraisalModal/add-appraisal-cycle";
import AppraisalsSkillsRegister from "../../components/Forms/PerformanceForms/AppraisalsSkillsRegister";


function Appraisalsskillslist() {
  const [admins, setAdmins] = useState([]);
  const [appraisalIdToBeShown, setAppraisalIdToBeShown] = useState(null);

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


  const [modalOpen, setModalOpen] = React.useState(false);

  function handleOpenAddAppraisalCycleModal() {
    setModalOpen(!modalOpen)
  }

  const [cycleIdToUpdate, setCycleIdToUpdate] = useState('');

  function handleCycleIdToUpdate() {
    setCycleIdToUpdate('');
  }

  function handleAppraisalCycleUpdate(cycleId) {
    setCycleIdToUpdate(cycleId);
    setModalOpen(true);
  }

  return (
  
    <>
      <AppraisalListHeader name="Avaliações" parentName="Desempenho" />
      <Container className="mt--6" fluid>
        <AppraisalsListTableCompetencies />
      </Container>
    </>
   
  );
}

Appraisalsskillslist.layout = Performance;

export default Appraisalsskillslist;
