export async function useFindReviewEvidenceRulerPerformanceReview(performanceId) {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_EVIDENCE_RULER}/performanceReview/${performanceId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }

};