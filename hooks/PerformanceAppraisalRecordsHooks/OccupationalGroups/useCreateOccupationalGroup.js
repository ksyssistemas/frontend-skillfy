import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';

const useCreateOccupationalGroup = () => {

    const { hasNewAppraisalOccupationalGroupCreated, handleCreatedAppraisalOccupationalGroupStatusChange } = useContext(AppraisalSkillsContext);

    const [occupationalGroupName, setOccupationalGroupName] = useState("");
    const [occupationalGroupNameState, setOccupationalGroupNameState] = useState(null);
    const [occupationalGroupDescription, setOccupationalGroupDescription] = useState("");
    const [occupationalGroupDescriptionState, setOccupationalGroupDescriptionState] = useState(null);
    const [occupationalGroupDataList, setOccupationalGroupDataList] = useState([]);
    const handleOccupationalGroupDataList = (occupationalGroupData) => {
        setOccupationalGroupDataList(occupationalGroupData);
    }

    const validateAddDepartmentForm = () => {
        if (departmentName === "") {
            setDepartmentNameState("invalid");
        } else {
            setDepartmentNameState("valid");
        }
        if (departmentDescription === "") {
            if (departmentDescription.length < 10) {
                setEmployeeRoleDescriptionState("invalid");
            } else {
                setEmployeeRoleDescriptionState("valid");
            }
        }
    }

    function handleValidateAddOccupationalGroupForm(handleCloseOccupationalGroupModal) {
        //validateAddDepartmentForm();
        // if (cycleTitleState === "valid" &&
        //   cyclePeriodState === "valid" &&
        //   startDateState === "valid" &&
        //   finishDateState === "valid" &&
        //   cycleObjectiveState === "valid" &&
        //   cycleManagerState === "valid"
        // ) {
        //   handleSubmit(cycleTitle, cyclePeriod, startDate, finishDate, cycleObjective);
        // } else {
        //   return null;
        // }
        handleSubmit(occupationalGroupName, occupationalGroupDescription);
        goBackToAppraisalCycleList(handleCloseOccupationalGroupModal);
    }

    function goBackToAppraisalCycleList(handleCloseOccupationalGroupModal) {
        reset();
        handleCloseOccupationalGroupModal();
        handleCreatedAppraisalOccupationalGroupStatusChange();
    }

    const handleSubmit = async (occupationalGroupName, occupationalGroupDescription) => {
        console.log(occupationalGroupName, occupationalGroupDescription);
        if (occupationalGroupName && occupationalGroupDescription) {
            try {
                const payload = {
                    competencieName: occupationalGroupName,
                    status: true
                };

                if (occupationalGroupDescription && occupationalGroupDescription !== "") {
                    payload.description = occupationalGroupDescription;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_OCCUPATIONAL_GROUP}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log('Data sent successfully!');
                } else {
                    console.error('Error in response:', response.status);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }
        }
    };

    function reset() {
        setOccupationalGroupName('');
        setOccupationalGroupNameState(null);
        setOccupationalGroupDescription('');
        setOccupationalGroupDescriptionState(null);
        setOccupationalGroupDataList([]);
    }

    return {
        occupationalGroupName,
        setOccupationalGroupName,
        occupationalGroupNameState,
        setOccupationalGroupNameState,
        occupationalGroupDescription,
        setOccupationalGroupDescription,
        occupationalGroupDescriptionState,
        setOccupationalGroupDescriptionState,
        occupationalGroupDataList,
        setOccupationalGroupDataList,
        handleOccupationalGroupDataList,
        handleValidateAddOccupationalGroupForm,
        reset
    };
};

export default useCreateOccupationalGroup;
