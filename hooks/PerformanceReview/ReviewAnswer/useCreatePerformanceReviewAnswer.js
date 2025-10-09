import { useContext } from "react";
import { ReviewContext } from "../../../contexts/PerformanceContext/PerformanceReviewContext";

const useCreatePerformanceReviewAnswer = () => {

    const {
        handlePerformanceIdStatusCleanupToUpdate
    } = useContext(ReviewContext);

    async function handleValidateAddReviewAnswerForm(finalData) {
        // validateAddAdminForm();
        // if (firstNameState === "valid" &&
        //     lastNameState === "valid" &&
        //     emailAddressState === "valid" &&
        //     passwordState === "valid" &&
        //     confirmPasswordState === "valid" &&
        //     phoneNumberState === "valid"
        // ) {
        handleSubmit(finalData);
        // } else {
        //     return null;
        // }
    }

    const handleSubmit = async (finalData) => {
        try {
            const payload = {
                performanceReviewId: finalData.performanceReview,
                evaluationRulerId: finalData.evaluationRulerId,
                reviewParticipantId: String(finalData.reviewParticipantId),
                reviewParticipantComment: null,
                answeredAsLeaderOf: {},
                answeredAsSelfEvaluationOf: {},
                answeredAsPairOf: {},
                status: "completed"
            };

            console.log('Final Data to submit: ', finalData);
            console.log('finalData.performanceReview typeof: ', typeof finalData.performanceReview);

            if (finalData.reviewParticipantComment && finalData.reviewParticipantComment !== "") {
                payload.reviewParticipantComment = finalData.reviewParticipantComment
            }

            if (finalData.answeredAsLeaderOf && finalData.answeredAsLeaderOf !== "") {
                payload.answeredAsLeaderOf = finalData.answeredAsLeaderOf
            }

            if (finalData.answeredAsSelfEvaluationOf && finalData.answeredAsSelfEvaluationOf !== "") {
                payload.answeredAsSelfEvaluationOf = finalData.answeredAsSelfEvaluationOf
            }

            if (finalData.answeredAsPairOf && finalData.answeredAsPairOf !== "") {
                payload.answeredAsPairOf = finalData.answeredAsPairOf
            }

            // if (finalData.status && finalData.status === "") {
            //     payload.status = "completed"
            // }

            console.log('Payload: ', payload);
            const response = await fetch(`${process.env.NEXT_PUBLIC_REVIEW_ANSWER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            
            console.log('response: ', response);
            if (response.ok) {
                //reset();
                handlePerformanceIdStatusCleanupToUpdate();
                console.log('Data sent successfully!');
            } else {
                console.error('Error in response:', response.status);
            }
        } catch (error) {
            console.error('Error in request:', error);
        }
    };

    function reset() {
        // setFirstName("");
        // setFirstNameState(null);
        // setLastName("");
        // setLastNameState(null);
        // setEmailAddress("");
        // setEmailAddressState(null);
        // setBirthdate("");
        // setBirthdateState(null);
        // setPhoneNumber("");
        // setPhoneNumberState(null);
        // setAdminStatus("");
        // setAdminStatusState(null);
        // setAdminPrivilege("");
        // setAdminPrivilegeState(null);
    }

    return {
        handleValidateAddReviewAnswerForm
    };
};

export default useCreatePerformanceReviewAnswer;