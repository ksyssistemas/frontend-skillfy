export const initialStateReviewAnswer = {
  reviewAnswerData: {
    performanceAppraisalData: null,
    reviewRulerOfPerformance: [],
    reviewRulerId: null,
    performanceEvidenceData: [],
    performanceSkillTypeData: [],
    performanceEvaluationRoleData: [],
    performanceRuleOptionData: [],
    performanceReviewEvidenceRulerData: [],
    occupationalGroupsData: [],
    skillClassificationsData: [],
    detailedRulerTypeData: [],
  },
}

export const reviewAnswerReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_REVIEW_DATA':
      return {
        ...state,
        reviewAnswerData: { ...action.payload },
      };
    case 'LOAD_SAVED_REVIEW_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          ...action.payload,
        },
      };
    case 'RESET_REVIEW_DATA':
      return initialStateReviewAnswer;
    // 🔹 Casos individuais para cada parte do estado
    case 'SET_PERFORMANCE_APPRAISAL_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          performanceAppraisalData: action.payload,
        },
      };

    case 'SET_REVIEW_RULER_OF_PERFORMANCE':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          reviewRulerOfPerformance: action.payload,
        },
      };

    case 'SET_REVIEW_RULER_ID':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          reviewRulerId: action.payload,
        },
      };

    case 'SET_PERFORMANCE_EVIDENCE_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          performanceEvidenceData: action.payload,
        },
      };

    case 'SET_PERFORMANCE_SKILL_TYPE_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          performanceSkillTypeData: action.payload,
        },
      };

    case 'SET_PERFORMANCE_EVALUATION_ROLE_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          performanceEvaluationRoleData: action.payload,
        },
      };

    case 'SET_PERFORMANCE_RULE_OPTION_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          performanceRuleOptionData: action.payload,
        },
      };

    case 'SET_PERFORMANCE_REVIEW_EVIDENCE_RULER_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          performanceReviewEvidenceRulerData: action.payload,
        },
      };

    case 'SET_OCCUPATIONAL_GROUPS_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          occupationalGroupsData: action.payload,
        },
      };

    case 'SET_SKILL_CLASSIFICATIONS_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          skillClassificationsData: action.payload,
        },
      };

    case 'SET_DETAILED_RULER_TYPE_DATA':
      return {
        ...state,
        reviewAnswerData: {
          ...state.reviewAnswerData,
          detailedRulerTypeData: action.payload,
        },
      };
    default:
      return state;
  }
};