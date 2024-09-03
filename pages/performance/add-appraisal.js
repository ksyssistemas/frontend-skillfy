import React, { useState, useEffect, useContext } from "react";
import { Container } from "reactstrap";
import Performance from "../../layouts/Performance";
import AddAppraisalHeader from "../../components/Headers/PerformanceHeader/AddAppraisalHeader"
import { ModelSelectionReview } from "../../components/Forms/PerformanceForms/ReviewsForms/PerformanceReview/ModelSelectionReview";
import { ReviewFormWrapper } from "../../components/Forms/PerformanceForms/ReviewsForms/PerformanceReview/ReviewFormWrapper";
import { ModelSelectionReviewContext } from "../../contexts/PerformanceContext/ModelSelectionReviewContext";

function AddAppraisal() {

  const { selectedReview,
    handleSelectedReview,
    handleCleanlinessReviewSelection } = useContext(ModelSelectionReviewContext);

  return (
    <>
      <AddAppraisalHeader name="Adicionar Avaliação" parentName="Desenvolvimento" />
      <Container className="mt--6" fluid>
        {
          selectedReview === null ? (
            <ModelSelectionReview />
          ) : (
            selectedReview === '360' ? (
              <ReviewFormWrapper />
            ) : (
              selectedReview === '180' ? (
                <ReviewFormWrapper />
              ) : (
                selectedReview === 'leader' ? (
                  <ReviewFormWrapper />
                ) : null
              )
            )
          )
        }

      </Container>
    </>
  );
}

AddAppraisal.layout = Performance;

export default AddAppraisal;
