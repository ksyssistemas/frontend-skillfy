import React, { useContext, useState } from 'react';
import { AppraisalSkillsContext } from '../../../contexts/PerformanceContext/AppraisalSkillsContext';

const useCreateSkillType = () => {

    const { hasNewAppraisalSkillTypeCreated, handleCreatedAppraisalSkillTypeStatusChange } = useContext(AppraisalSkillsContext);

    const [skillTypeName, setSkillTypeName] = useState("");
    const [skillTypeNameState, setSkillTypeNameState] = useState(null);
    const [skillTypeDescription, setSkillTypeDescription] = useState("");
    const [skillTypeDescriptionState, setSkillTypeDescriptionState] = useState(null);
    const [classificationOfSkillType, setClassificationOfSkillType] = useState("");
    const [classificationOfSkillTypeState, setClassificationOfSkillTypeState] = useState(null);
    const [skillTypeOccupationalGroup, setskillTypeOccupationalGroup] = useState("");
    const [skillTypeOccupationalGroupState, setskillTypeOccupationalGroupState] = useState(null);
    const [skillTypeDataList, setSkillTypeDataList] = useState([]);
    const handleSkillTypeDataList = (skillTypeData) => {
        setSkillTypeDataList(skillTypeData);
    }
    const [classificationOfSkillTypeDataList, setClassificationOfSkillTypeDataList] = useState([]);
    const handleClassificationOfSkillTypeDataList = (classificationOfSkillTypeData) => {
        setClassificationOfSkillTypeDataList(classificationOfSkillTypeData);
    }
    const [skillTypeOccupationalGroupDataList, setSkillTypeOccupationalGroupDataList] = useState([]);
    const handleSkillTypeOccupationalGroupDataList = (skillTypeOccupationalGroupData) => {
        setSkillTypeOccupationalGroupDataList(skillTypeOccupationalGroupData);
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

    function handleValidateAddSkillTypeForm(handleCloseSkillTipeModal, handleSelectedClassificationOfSkillType, handleSelectedSkillTypeOccupationalGroup) {
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
        handleSubmit(skillTypeName, skillTypeDescription, classificationOfSkillType, skillTypeOccupationalGroup);
        goBackToAppraisalCycleList(handleCloseSkillTipeModal, handleSelectedClassificationOfSkillType, handleSelectedSkillTypeOccupationalGroup);
    }

    function goBackToAppraisalCycleList(handleCloseSkillTipeModal, handleSelectedClassificationOfSkillType, handleSelectedSkillTypeOccupationalGroup) {
        reset();
        handleCloseSkillTipeModal();
        handleSelectedClassificationOfSkillType();
        handleSelectedSkillTypeOccupationalGroup();
        handleCreatedAppraisalSkillTypeStatusChange();
    }

    const handleSubmit = async (skillTypeName, skillTypeDescription, classificationOfSkillType, skillTypeOccupationalGroup) => {
        if (skillTypeName && skillTypeName !== '') {
            try {
                const payload = {
                    competencieTypeName: skillTypeName,
                    status: true
                };

                if (skillTypeDescription && skillTypeDescription !== "") {
                    payload.description = skillTypeDescription;
                }

                // if (classificationOfSkillType && classificationOfSkillType !== "") {
                //     payload.occupationalGroupId = classificationOfSkillType;
                // }

                // if (skillTypeOccupationalGroup && skillTypeOccupationalGroup !== "") {
                //     payload.skilClassificationId = skillTypeOccupationalGroup;
                // }

                const response = await fetch(`${process.env.NEXT_PUBLIC_COMPETENCE_TYPE}`, {
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
        setSkillTypeName('');
        setSkillTypeNameState(null);
        setSkillTypeDescription('');
        setSkillTypeDescriptionState(null);
        setClassificationOfSkillType('');
        setClassificationOfSkillTypeState(null);
        setskillTypeOccupationalGroup('');
        setskillTypeOccupationalGroupState(null);
        setSkillTypeDataList([]);
    }

    return {
        skillTypeName,
        setSkillTypeName,
        skillTypeNameState,
        setSkillTypeNameState,
        skillTypeDescription,
        setSkillTypeDescription,
        skillTypeDescriptionState,
        setSkillTypeDescriptionState,
        classificationOfSkillType,
        setClassificationOfSkillType,
        classificationOfSkillTypeState,
        setClassificationOfSkillTypeState,
        skillTypeOccupationalGroup,
        setskillTypeOccupationalGroup,
        skillTypeOccupationalGroupState,
        setskillTypeOccupationalGroupState,
        skillTypeDataList,
        setSkillTypeDataList,
        handleSkillTypeDataList,
        classificationOfSkillTypeDataList,
        setClassificationOfSkillTypeDataList,
        handleClassificationOfSkillTypeDataList,
        skillTypeOccupationalGroupDataList,
        setSkillTypeOccupationalGroupDataList,
        handleSkillTypeOccupationalGroupDataList,
        handleValidateAddSkillTypeForm,
        reset
    };
};

export default useCreateSkillType;
