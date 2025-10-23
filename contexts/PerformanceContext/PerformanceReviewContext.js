import { createContext, useCallback, useEffect, useState } from 'react';
import { useFindRole } from '../../hooks/RecordsHooks/role/useFindRole';

export const ReviewContext = createContext({});

function PerformanceReviewContext({ children }) {

    const [performanceReviewData, setPerformanceReviewData] = useState(null);
    const [reviewedIdOnPerformanceReview, setReviewedIdOnPerformanceReview] = useState(null);
    const [reviewerIdOnPerformanceReview, setReviewerIdOnPerformanceReview] = useState(null);
    const [performanceReviewParticipationData, setPerformanceReviewParticipationData] = useState(null);

    const [reviewsToExecuteList, setReviewsToExecuteList] = useState([]);
    const [reviewStatus, setReviewStatus] = useState({});
    const [isReadOnlyMode, setIsReadOnlyMode] = useState(false);

    function handleSetReadOnlyMode(value) {
        setIsReadOnlyMode(value);
    }

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

    function handleSaveReviewToExecuteListData(reviewAnswers) {
        setReviewsToExecuteList(reviewAnswers);
    }

    /**
   * Atualiza o status de uma avaliação específica
   * @param {string} key - uniqueKey da avaliação
   * @param {string} status - "completed" | "pending" | etc.
   */
    const updateReviewStatus = useCallback((key, status) => {
        setReviewStatus(prev => ({
            ...prev,
            [key]: status.toLowerCase(),
        }));
    }, []);

    /**
     * Carrega os status iniciais após fetch do backend
     * Idealmente chamado no fetchReviewsToExecute()
     */
    /**
 * Inicializa ou atualiza o status das avaliações com base na lista vinda do backend.
 * - Mantém os status locais mais recentes
 * - Sobrescreve apenas quando não há valor local
 */
    const initializeReviewStatus = useCallback((reviews) => {
        setReviewStatus(prevStatus => {
            const newStatus = { ...prevStatus };

            reviews.forEach(r => {
                if (r.uniqueKey) {
                    const backendStatus = r.reviewStatus?.toLowerCase() || "pending";
                    const localStatus = newStatus[r.uniqueKey];

                    // só atualiza se backend estiver mais "avançado" ou se ainda não existe local
                    if (!localStatus || localStatus !== 'completed') {
                        newStatus[r.uniqueKey] = backendStatus;
                    }
                }

            });

            return newStatus;
        });
    }, []);

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
                reviewsToExecuteList,
                handleSaveReviewToExecuteListData,
                reviewStatus,
                updateReviewStatus,
                initializeReviewStatus,
                isReadOnlyMode,
                handleSetReadOnlyMode
            }}>
            {children}
        </ReviewContext.Provider>
    );
};

export { PerformanceReviewContext };