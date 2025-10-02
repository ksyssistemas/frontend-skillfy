import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Performance from "../../layouts/Performance";
import AddAppraisalHeader from "../../components/Headers/PerformanceHeader/AddAppraisalHeader"
import { ModelSelectionReview } from "../../components/Forms/PerformanceForms/ReviewsForms/PerformanceReview/ModelSelectionReview";
import { ReviewFormWrapper } from "../../components/Forms/PerformanceForms/ReviewsForms/PerformanceReview/ReviewFormWrapper";
import { ModelSelectionReviewContext } from "../../contexts/PerformanceContext/ModelSelectionReviewContext";
import DynamicLayout from "../../layouts/DynamicLayout";
import RightSideSummaryPanel from "../../components/Forms/PerformanceForms/ReviewsForms/PerformanceReview/FormPerWizardSession/ReviewParticipantSelectionComponentsForm/RightSideSummaryPanel";
import { ReviewParticipantSelectionContext, ReviewParticipantSelectionProvider } from "../../contexts/PerformanceContext/RightSideSummaryPanel/ReviewParticipantSelectionContext";

function AddAppraisal() {

  const {
    selectedReview,
    currentStep,
    handleSelectedReview,
    handleCleanlinessReviewSelection,
    hasSelectedLeaders,
    handleHasSelectedLeaders
  } = useContext(ModelSelectionReviewContext);

  const { state } = useContext(ReviewParticipantSelectionContext);

  const showSummaryPanel =
    selectedReview === "360" && currentStep === 5 && hasSelectedLeaders;

  return (
    <ReviewParticipantSelectionProvider>
      <AddAppraisalHeader name="Adicionar Avaliação" parentName="Desenvolvimento" />
      <Row className="mt--6 mx-0">
        {/* Conteúdo principal */}
        <Col className="p-0" md={showSummaryPanel ? "9" : "12"}>
          <Container fluid>
            {
              selectedReview === null ? (
                <ModelSelectionReview />
              ) : selectedReview === '360' ? (
                <ReviewFormWrapper />
              ) : selectedReview === '180' ? (
                <ReviewFormWrapper />
              ) : selectedReview === 'leader' ? (
                <ReviewFormWrapper />
              ) : null
            }
          </Container>
        </Col>
        {/* Painel lateral condicional */}
        {showSummaryPanel && (
          <Col className="pl-0" md="3">
            <RightSideSummaryPanel />
          </Col>
        )}
      </Row>
    </ReviewParticipantSelectionProvider>
  );
}

AddAppraisal.getLayout = (page) => <DynamicLayout>{page}</DynamicLayout>;

export default AddAppraisal;
