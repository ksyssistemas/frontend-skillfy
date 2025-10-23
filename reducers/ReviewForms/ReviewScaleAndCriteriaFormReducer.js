export const initialStateReviewScaleAndCriteriaForm = {
    reviewScaleAndCriteriaData: {
        rulerTypeDataList: [
            { id: "1", text: "Conceitual" },
            { id: "2", text: "Numérica" },
            { id: "3", text: "Percentual" },
            // { id: "4", text: "Cor" },
            // { id: "5", text: "Emoji" },
        ],
        selectedRulerType: '',
        reviewRulerType: null,
        reviewRulerTypeState: '',
        showSelectRulerOptionsButton: false,
        rulerOptionData: [],
        rulerOptionSelected: null,
        reviewRulerOptionSelected: null,
        reviewRulerOptionSelectedState: null,
        reviewCompetenceEvidenceData: [],
        reviewCompetenceData: [],
        reviewParticipantComment: '',
        reviewParticipantCommentState: null,
    },
};

export const reviewScaleAndCriteriaFormReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_REVIEW_DATA':
            return {
                ...state,
                reviewScaleAndCriteriaData: { ...action.payload },
            };
        case 'LOAD_SAVED_REVIEW_DATA':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    ...action.payload,
                },
            };
        case 'RESET_REVIEW_DATA':
            return initialStateReviewScaleAndCriteriaForm;
        case 'SET_REVIEW_RULER_TYPE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewRulerType: action.payload,
                },
            };
        case 'RESET_REVIEW_RULER_TYPE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewRulerType: initialStateReviewScaleAndCriteriaForm.reviewScaleAndCriteriaData.reviewRulerType
                }
            };
        case 'SET_REVIEW_RULER_TYPE_STATE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewRulerTypeState: action.payload,
                },
            };
        case 'SET_SELECTED_RULER_TYPE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    selectedRulerType: action.payload
                },
            };
        case 'RESET_SELECTED_RULER_TYPE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    selectedRulerType: initialStateReviewScaleAndCriteriaForm.reviewScaleAndCriteriaData.selectedRulerType
                }
            };
        case 'SET_SHOW_SELECT_RULER_OPTIONS_BUTTON':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    showSelectRulerOptionsButton: action.payload,
                },
            };

        case 'SET_REVIEW_RULER_TYPE_SELECTED':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewRulerOptionSelected: action.payload,
                },
            };
        case 'SET_REVIEW_RULER_TYPE_SELECTED_STATE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewRulerOptionSelectedState: action.payload,
                },
            };
        case 'SET_RULER_TYPE_DATA_LIST':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    rulerTypeDataList: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_RULER_OPTION_DATA_LIST':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    rulerOptionData: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'REMOVE_RULER_OPTION_DATA': {
            const { id } = action.payload;
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    rulerOptionData: state.reviewScaleAndCriteriaData.rulerOptionData
                        .filter(item => item.id !== id), // Agora removerá corretamente
                },
            };
        }
        case 'SET_RULER_OPTION_SELECTED_LIST':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    rulerOptionSelected: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_REVIEW_COMPETENCIE_DATA_LIST':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewCompetenceData: Array.isArray(action.payload) ? action.payload : [],
                },
            };
        case 'SET_REVIEW_COMPETENCE': {
            const { competenceId } = action.payload;

            const exists = state.reviewScaleAndCriteriaData.reviewCompetenceEvidenceData
                .some(item => item.competenceId === competenceId);

            if (!exists) {
                return {
                    ...state,
                    reviewScaleAndCriteriaData: {
                        ...state.reviewScaleAndCriteriaData,
                        reviewCompetenceEvidenceData: [
                            ...state.reviewScaleAndCriteriaData.reviewCompetenceEvidenceData,
                            { competenceId, evidence: [] }
                        ],
                    },
                };
            }
            return state;
        }
        case 'SET_REVIEW_EVIDENCE': {
            const { competenceId, evidenceId } = action.payload;
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewCompetenceEvidenceData: state.reviewScaleAndCriteriaData.reviewCompetenceEvidenceData
                        .map(item =>
                            item.competenceId === competenceId
                                ? {
                                    ...item,
                                    evidence: [...item.evidence, { id: evidenceId }]
                                }
                                : item
                        ),
                },
            };
        }
        case 'REMOVE_REVIEW_EVIDENCE': {
            const { competenceId, evidenceId } = action.payload;
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewCompetenceEvidenceData: state.reviewScaleAndCriteriaData.reviewCompetenceEvidenceData
                        .map(item =>
                            item.competenceId === competenceId
                                ? {
                                    ...item,
                                    evidence: item.evidence.filter(e => e.id !== evidenceId)
                                }
                                : item
                        ),
                },
            };
        }
        case 'REMOVE_REVIEW_COMPETENCE': {
            const { competenceId } = action.payload;
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewCompetenceEvidenceData: state.reviewScaleAndCriteriaData.reviewCompetenceEvidenceData
                        .filter(item => item.competenceId !== competenceId),
                },
            };
        }
        case 'RESET_SELECTED_COMPETENCIE_OPTIONS':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewScaleAndCriteriaData,
                    reviewCompetenceEvidenceData: initialStateReviewScaleAndCriteriaForm.reviewScaleAndCriteriaData.reviewCompetenceEvidenceData
                }
            };
        case 'SET_REVIEW_PARTICIPANT_COMMENT':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewIdentityData,
                    reviewParticipantComment: action.payload,
                },
            };
        case 'SET_REVIEW_PARTICIPANT_COMMENT_STATE':
            return {
                ...state,
                reviewScaleAndCriteriaData: {
                    ...state.reviewIdentityData,
                    reviewParticipantCommentState: action.payload,
                },
            };
        case 'CLEAR_FORM':
            return initialStateReviewScaleAndCriteriaForm;

        default:
            return state;
    }
};