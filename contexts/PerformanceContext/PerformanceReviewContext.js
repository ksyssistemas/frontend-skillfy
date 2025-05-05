// Contexto para armazenar informações de autenticação
import React, { createContext, useEffect, useState } from 'react';
import { useFindRole } from '../../hooks/RecordsHooks/role/useFindRole';

export const ReviewContext = createContext({});

function PerformanceReviewContext({ children }) {

    const [performanceReviewData, setPerformanceReviewData] = useState(null);
    const [reviewedIdOnPerformanceReview, setReviewedIdOnPerformanceReview] = useState(null);
    const [reviewerIdOnPerformanceReview, setReviewerIdOnPerformanceReview] = useState(null);
    const [performanceReviewParticipationData, setPerformanceReviewParticipationData] = useState(null);

    function handlePerformanceIdStatusCleanupToUpdate() {
        setPerformanceReviewData(null);
        setReviewedIdOnPerformanceReview(null);
        setReviewerIdOnPerformanceReview(null);
        setPerformanceReviewParticipationData(null);
    }

    function handlePerformanceReviewData(reviewData) {
        setPerformanceReviewData(reviewData);
    }

    function handleReviewedIdOnPerformanceReview(reviewedId) {
        setReviewedIdOnPerformanceReview(reviewedId);
    }

    function handleReviewerIdOnPerformanceReview(reviewerId) {
        setReviewerIdOnPerformanceReview(reviewerId);
    }

    function handlePerformanceReviewParticipationData(reviewParticipationData) {
        setPerformanceReviewParticipationData(reviewParticipationData);
    }

    useEffect(() => {
        const fetchReviewerAndReviewedRole = async () => {
            if (reviewedIdOnPerformanceReview && !reviewedIdOnPerformanceReview.roleName && reviewedIdOnPerformanceReview.roleId) {
                try {
                    const foundRoleName = await useFindRole(reviewedIdOnPerformanceReview?.roleId);
                    if (foundRoleName) setReviewedIdOnPerformanceReview(prevState => ({ ...prevState, roleName: foundRoleName.roleName }));
                } catch (error) {
                    console.error(`Error fetching employee role data for employeeId ${reviewedIdOnPerformanceReview?.id}:`, error);
                    setReviewedIdOnPerformanceReview(prevState => ({ ...prevState, roleName: 'Unknown' }));
                }
            }
            if (reviewedIdOnPerformanceReview && !reviewedIdOnPerformanceReview.roleName && reviewedIdOnPerformanceReview.roleId) {
                try {
                    const foundRoleName = await useFindRole(reviewerIdOnPerformanceReview?.roleId);
                    if (foundRoleName) setReviewerIdOnPerformanceReview(prevState => ({ ...prevState, roleName: foundRoleName.roleName }));
                } catch (error) {
                    console.error(`Error fetching employee role data for employeeId ${reviewerIdOnPerformanceReview?.id}:`, error);
                    setReviewerIdOnPerformanceReview(prevState => ({ ...prevState, roleName: 'Unknown' }));
                }
            }
        };

        fetchReviewerAndReviewedRole();
    }, [reviewedIdOnPerformanceReview,
        reviewedIdOnPerformanceReview]);

    return (
        <ReviewContext.Provider
            value={{
                performanceReviewData,
                reviewedIdOnPerformanceReview,
                reviewerIdOnPerformanceReview,
                performanceReviewParticipationData,
                handlePerformanceIdStatusCleanupToUpdate,
                handlePerformanceReviewData,
                handleReviewedIdOnPerformanceReview,
                handleReviewerIdOnPerformanceReview,
                handlePerformanceReviewParticipationData,
            }}>
            {children}
        </ReviewContext.Provider>
    );
};

export { PerformanceReviewContext };