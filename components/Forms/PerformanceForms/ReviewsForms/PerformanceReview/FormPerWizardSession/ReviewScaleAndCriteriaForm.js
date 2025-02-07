import React, { useState, useEffect, useContext, useRef, useReducer } from "react";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    ListGroupItem,
    Table,
} from "reactstrap";
// import { useSelector } from 'react-redux';
import { ModelSelectionReviewContext } from "../../../../../../contexts/PerformanceContext/ModelSelectionReviewContext";
import { initialState, formReducer } from '../../../../../../reducers/ReviewForms/ReviewScaleAndCriteriaFormReducer';
import PageChange from "../../../../../PageChange/PageChange";
import useCreatePerformanceReview from "../../../../../../hooks/PerformanceReview/useCreatePerformanceReview";
import { handleSelectionEmploymentContractData } from "../../../../../../util/handleSelectionEmploymentContractData";
import { ModalRulerType } from "../../../../../Modals/AppraisalModal/ModalRulerType";
import { useFindCaptionOptionByCaptionId } from "../../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionId";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useFindAllEvidences } from "../../../../../../hooks/DefinitionOptionsReview/AppraisalEvidences/useFindAllEvidences";
import { useFindSkillType } from "../../../../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindSkillType";
import { useFindAllSkillTypes } from '../../../../../../hooks/DefinitionOptionsReview/SkillsTypes/useFindAllSkillTypes';
import { useFindSkillClassification } from '../../../../../../hooks/DefinitionOptionsReview/SkillsClassifications/useFindSkillClassification';
import { useFindOccupationalGroup } from '../../../../../../hooks/DefinitionOptionsReview/OccupationalGroups/useFindOccupationalGroup';
import { employmentContractDataSearchAndProcess } from '../../../../../../util/employmentContractDataSearchAndProcess';
import { useFindCaptionOptionByCaptionType } from "../../../../../../hooks/DefinitionOptionsReview/AppraisalCaptions/useFindCaptionOptionByCaptionType";

export function ReviewScaleAndCriteriaForm() {

    const {
        rulerTypeDataList,
        handleRulerTypeDataList,
        performanceReviewRulerOptionSelected,
        setPerformanceReviewRulerOptionSelected,
        performanceReviewRulerOptionSelectedState,
        setPerformanceReviewRulerOptionSelectedState,
    } = useCreatePerformanceReview();

    const { selectedReview } = useContext(ModelSelectionReviewContext);

    const { SearchBar } = Search;

    const [evidenceDataTable, setEvidenceDataTable] = React.useState();

    const [state, dispatch] = useReducer(formReducer, initialState);

    const latestreviewScaleAndCriteriaData = useRef(state.reviewScaleAndCriteriaData);

    const [isLoadingReviewScaleAndCriteriaData, setIsLoadingReviewScaleAndCriteriaData] = useState(true);

    // Ref para armazenar o estado anterior em formato de string
    const previousStateRef = useRef(null);

    const [modalOpen, setModalOpen] = React.useState(false);

    const SELECTED_RULER_TYPE = state.reviewScaleAndCriteriaData.selectedRulerType;
    const CONFIRMED_RULER_TYPE = state.reviewScaleAndCriteriaData.reviewRulerOptionSelected;

    const [selectedIds, setSelectedIds] = useState([]);

    // Configuração para seleção de linhas
    const selectRow = (competenceId) => {
        // Acesse os dados do reducer através de state
        const selectedEvidenceIds = getSelectedEvidenceIds(
            competenceId,
            state.reviewScaleAndCriteriaData.reviewCompetenceEvidenceData
        );

        return {
            mode: "checkbox",
            clickToSelect: true,
            selected: selectedEvidenceIds, // Linhas que já devem estar selecionadas
            onSelect: (row, isSelected) => {
                console.log(row, isSelected, competenceId);
                if (isSelected) {
                    dispatch({
                        type: "SET_REVIEW_EVIDENCE",
                        payload: { competenceId, evidenceId: row.id },
                    });
                } else {
                    dispatch({
                        type: "REMOVE_REVIEW_EVIDENCE",
                        payload: { competenceId, evidenceId: row.id },
                    });
                }
            },
            onSelectAll: (isSelect, rows) => {
                if (isSelect) {
                    rows.forEach(row => {
                        dispatch({
                            type: "SET_REVIEW_EVIDENCE",
                            payload: { competenceId, evidenceId: row.id },
                        });
                    });
                } else {
                    rows.forEach(row => {
                        dispatch({
                            type: "REMOVE_REVIEW_EVIDENCE",
                            payload: { competenceId, evidenceId: row.id },
                        });
                    });
                }
            },
        };
    };

    const removeCompetence = (competenceId) => {
        dispatch({ type: 'REMOVE_REVIEW_COMPETENCE', payload: { competenceId } });
    };

    // Colunas da tabela de evidências 
    const evidenceColumns = [
        {
            dataField: "description",
            text: "Evidência",
            sort: true,
            headerStyle: { width: "65%", minWidth: "200px" },
            style: { whiteSpace: "normal", wordWrap: "break-word" },
        },
        {
            dataField: "skillTypeName",
            text: "Título",
            sort: true,
            headerStyle: { width: "20%", minWidth: "80px" },
        },
        {
            dataField: "createdAt",
            text: "Adicionada Em",
            sort: true,
            formatter: (cell) => new Date(cell).toLocaleDateString("pt-BR"),
            headerStyle: { width: "10%", minWidth: "40px" },
        },
    ]

    const pagination = paginationFactory({
        page: 1,
        alwaysShowAllBtns: true,
        showTotal: true,
        withFirstAndLast: false,
        sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
            <div className="dataTables_length" id="datatable-basic_length">
                <label>
                    Show{" "}
                    {
                        <select
                            name="datatable-basic_length"
                            aria-controls="datatable-basic"
                            className="form-control form-control-sm"
                            onChange={(e) => onSizePerPageChange(e.target.value)}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    }{" "}
                    entries.
                </label>
            </div>
        ),
        paginationTotalRenderer: (from, to, size) => (
            <span>
                {' '}Exibindo as linhas {from} a {to} de {size}
            </span>
        ),
    });

    const handleSelectionEmploymentContractDataWrapper = (
        selectedId,
        dataList,
        setSelectedAction,
        setFieldAction,
        setStateAction,
        setSelectedDepartmentIdAction = null,
        setHasDepartmentSelectedAction = null,
        savedDataType = 'id'
    ) => {
        // Despache o estado 'valid' antes de iniciar o processo de seleção
        if (setStateAction) dispatch({ type: setStateAction, payload: 'valid' });
        if (setHasDepartmentSelectedAction) dispatch({ type: setHasDepartmentSelectedAction, payload: true });
        console.log("Passou aqui!")
        // Chama a função de processamento de seleção de dados
        handleSelectionEmploymentContractData(
            selectedId,
            dataList,
            (value) => dispatch({ type: setSelectedAction, payload: value }),
            (value) => dispatch({ type: setFieldAction, payload: value }), // Agora definirá o valor correto
            (state) => dispatch({ type: setStateAction, payload: state }),
            (id) => dispatch({ type: setSelectedDepartmentIdAction, payload: id }),
            () => dispatch({ type: setHasDepartmentSelectedAction, payload: true }),
            savedDataType
        );
    };

    function clearSelectedRulerTypeStatus() {
        dispatch({ type: 'RESET_SELECTED_RULER_TYPE' });
    }

    function handleOpenRulerTypeModal() {
        setModalOpen(!modalOpen);
    }

    function handleClosewRulerTypeModal() {
        clearSelectedRulerTypeStatus();
        handleOpenRulerTypeModal();
    }

    // Botão para exibir as opções de legenda
    const handleSelectRulerOptionsButton = () => {
        dispatch({
            type: 'SET_SHOW_SELECT_RULER_OPTIONS_BUTTON',
            payload: false,
        });
    };

    // Selecionar uma opção de legenda
    const handleRulerOptionSelected = (rulerOption) => {
        dispatch({
            type: 'SET_REVIEW_RULER_TYPE_SELECTED',
            payload: rulerOption,
        });
    };

    const commonProps = {
        handleOpenRulerTypeModal,
        handleClosewRulerTypeModal,
        selectedRulerType: SELECTED_RULER_TYPE,
        confirmedRulerType: CONFIRMED_RULER_TYPE,
        modalOpen,
        handleSelectRulerOptionsButton,
        handleRulerOptionSelected
    };

    // Função utilitária para salvar os dados formatados no localStorage
    const saveDataToLocalStorage = (data) => {
        const dataToSave = {
            ...data,
            // weightOfPerformanceReviewOfLeaders: data.weightOfPerformanceReviewOfLeaders || 98,
            // weightOfSelfReviewOfPerformance: data.weightOfSelfReviewOfPerformance || 1,
            // weightOfEvaluatorsPerformanceReview: data.weightOfEvaluatorsPerformanceReview || 1,
            // deadlineToLeadersToRespondToPerformanceReview: moment(data.deadlineToLeadersToRespondToPerformanceReview).format("YYYY-MM-DD"),
            // deadlineToRespondToPerformanceSelfReview: moment(data.deadlineToRespondToPerformanceSelfReview).format("YYYY-MM-DD"),
            // deadlineToEvaluatorsToRespondToPerformanceReview: moment(data.deadlineToEvaluatorsToRespondToPerformanceReview).format("YYYY-MM-DD"),
        };
        localStorage.setItem('reviewScaleAndCriteriaData', JSON.stringify(dataToSave));
    };

    const fetchCaptionOption = async (rulers) => {
        let updatedRulers = [];

        if (!Array.isArray(rulers)) {
            rulers = [rulers];
        }

        updatedRulers = await Promise.all(
            rulers.map(async (ruler) => {
                try {
                    const rulerOptionData = await useFindCaptionOptionByCaptionId(ruler.id);
                    return {
                        ...ruler,
                        options: rulerOptionData
                    };
                } catch (error) {
                    console.error(`Error fetching ruler options data for id ${ruler.id}:`, error);
                    return {
                        ...ruler,
                        options: 'Não registrada',
                    };
                }
            })
        );
        dispatch({ type: 'SET_RULER_OPTION_DATA_LIST', payload: updatedRulers });
        dispatch({
            type: 'SET_REVIEW_RULER_TYPE_SELECTED_STATE',
            payload: updatedRulers === "" ? "invalid" : "valid",
        });
    };

    const fetchCapitons = async () => {
        if (!state.reviewScaleAndCriteriaData.rulerOptionData.length) {
            try {
                // Encontre o objeto no array que corresponde a selectedRulerType
                const foundRuler = rulerTypeDataList.find(ruler =>
                    ruler.id === state.reviewScaleAndCriteriaData.selectedRulerType);
                if (foundRuler) {
                    // Pegue o valor do campo 'text' correspondente
                    const captionType = foundRuler.text;
                    // Use o valor de 'captionType' como parâmetro para o hook
                    const foundCaption = await useFindCaptionOptionByCaptionType(captionType);
                    // Chame fetchCaptionOption com o resultado do hook
                    await fetchCaptionOption(foundCaption);
                } else {
                    console.error('Ruler type not found');
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
    };

    // Fetch de dados para opções de legenda
    useEffect(() => {
        // Executa o fetch apenas se a opção selecionada não for null
        if (state.reviewScaleAndCriteriaData.reviewRulerOptionSelected) {
            fetchCapitons();
        }
    }, [state.reviewScaleAndCriteriaData.reviewRulerOptionSelected]);

    // Atualizar o estado do botão "Selecionar Opções" baseado no tipo de legenda
    useEffect(() => {
        const selectedItem = state.reviewScaleAndCriteriaData.rulerTypeDataList.find(
            (item) => item.id === state.reviewScaleAndCriteriaData.selectedRulerType
        );
        if (selectedItem?.id && selectedItem?.id !== '') {
            dispatch({ type: 'SET_SHOW_SELECT_RULER_OPTIONS_BUTTON', payload: true });
        } else {
            dispatch({ type: 'SET_SHOW_SELECT_RULER_OPTIONS_BUTTON', payload: false });
        }
    }, [state.reviewScaleAndCriteriaData.selectedRulerType]);

    // Execute o carregamento dos dados ao montar o componente
    useEffect(() => {
        // Função para carregar os dados do localStorage
        const loadreviewScaleAndCriteriaData = async () => {
            try {
                const rawData = localStorage.getItem('reviewScaleAndCriteriaData');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && typeof parsedData === 'object') {
                        // Verifique se selectedCycle está presente
                        dispatch({
                            type: 'LOAD_SAVED_REVIEW_DATA',
                            payload: {
                                ...parsedData,
                                // deadlineToLeadersToRespondToPerformanceReview: moment(parsedData.deadlineToLeadersToRespondToPerformanceReview, "YYYY-MM-DD").toDate(),
                                // deadlineToRespondToPerformanceSelfReview: moment(parsedData.deadlineToRespondToPerformanceSelfReview, "YYYY-MM-DD").toDate(),
                                // deadlineToEvaluatorsToRespondToPerformanceReview: moment(parsedData.deadlineToEvaluatorsToRespondToPerformanceReview, "YYYY-MM-DD").toDate(),
                            },
                        });

                        latestreviewScaleAndCriteriaData.current = parsedData;
                        setCompetencies(parsedData.reviewCompetenceEvidenceData.map(c => c.competenceId));

                    }
                } else {
                    dispatch({ type: 'RESET_REVIEW_STATE' }); // Limpa o estado para evitar inconsistências
                }
            } catch (error) {
                console.error('Failed to parse reviewScaleAndCriteriaData from localStorage:', error);
            } finally {
                setIsLoadingReviewScaleAndCriteriaData(false); // Marque como carregado
            }
        };
        loadreviewScaleAndCriteriaData();
    }, []);

    const getSelectedEvidenceIds = (competenceId, reviewCompetenceEvidenceData) => {
        const competenceData = reviewCompetenceEvidenceData.find(item => item.competenceId === competenceId);
        return competenceData ? competenceData.evidence.map(e => e.id) : [];
    };


    // Atualize a lógica de persistência para incluir verificações e evitar sobrescrever valores críticos
    useEffect(() => {
        const currentStateString = JSON.stringify(state.reviewScaleAndCriteriaData);

        if (previousStateRef.current !== currentStateString) {
            // Salva o estado atualizado, preservando o ciclo selecionado
            const dataToSave = {
                ...state.reviewScaleAndCriteriaData,
                // weightOfPerformanceReviewOfLeaders: sliderValues[0],
                // weightOfSelfReviewOfPerformance: sliderValues[1],
                // weightOfEvaluatorsPerformanceReview: sliderValues[2],
            };

            saveDataToLocalStorage(dataToSave);
            latestreviewScaleAndCriteriaData.current = dataToSave;

            previousStateRef.current = currentStateString;
        }

        return () => {
            saveDataToLocalStorage(latestreviewScaleAndCriteriaData.current);
        };
    }, [state.reviewScaleAndCriteriaData]);

    const [competencies, setCompetencies] = useState([]);

    const [competenciesDataList, setCompetenciesDataList] = useState([]);
    const [competenciesDetails, setCompetenciesDetails] = useState([]);

    const [occupationalGroups, setOccupationalGroups] = useState([]);
    const [skillClassifications, setSkillClassifications] = useState([]);
    const [evidenceDataList, setEvidenceDataList] = useState([]);

    const handleCompetenciesDataList = (competencies) => {
        setCompetenciesDataList(competencies);
    };

    useEffect(() => {
        if (competenciesDataList.length === 0) {
            employmentContractDataSearchAndProcess(
                useFindAllSkillTypes,
                handleCompetenciesDataList,
                'skillTypes',
                'CompetenciesUserRegister'
            );
        }
    }, [])

    useEffect(() => {
        if (competencies.length > 0) {
            Promise.all(competencies.map(id => useFindSkillType(id)))
                .then(details => setCompetenciesDetails(details))
                .catch(error => console.error("Erro ao buscar competências:", error));
        } else {
            setCompetenciesDetails([]);
        }
    }, [competencies]);

    const handleCompetenciesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);

        const selectedCompetencies = selectedOptions.length > 0
            ? selectedOptions.map(option => Number(option.value))
            : competenceValue;

        setCompetencies(selectedCompetencies);

        selectedCompetencies.forEach(competenceId => {
            dispatch({ type: 'SET_REVIEW_COMPETENCE', payload: { competenceId } });
        });

        const removedCompetencies = competencies.filter(id => !selectedCompetencies.includes(id));
        removedCompetencies.forEach(competenceId => removeCompetence(competenceId));
    };


    useEffect(() => {
        if (competenciesDetails.length > 0) {
            const occupationalPromises = Promise.all(
                competenciesDetails.map(({ occupationalGroupId }) =>
                    useFindOccupationalGroup(occupationalGroupId)
                )
            );

            const skillPromises = Promise.all(
                competenciesDetails.map(({ skillClassificationId }) =>
                    useFindSkillClassification(skillClassificationId)
                )
            );

            Promise.all([occupationalPromises, skillPromises])
                .then(([occupationalResults, skillResults]) => {
                    setOccupationalGroups(occupationalResults);
                    setSkillClassifications(skillResults);
                })
                .catch((error) =>
                    console.error("Erro ao buscar dados adicionais:", error)
                );
        }
    }, [competenciesDetails]);

    useEffect(() => {
        const fetchEvidences = async () => {
            if (competenciesDetails.length > 0) {
                try {
                    const foundEvidence = await useFindAllEvidences();
                    setEvidenceDataList(foundEvidence);
                } catch (error) {
                    console.error('Error fetching evidences:', error);
                }
            }
        };
        fetchEvidences();
    }, [competenciesDetails]);

    // useEffect(() => {
    //     const fetchSkillTypesName = async (evidences) => {
    //         const updatedEvidences = await Promise.all(
    //             evidences.map(async (evidence) => {
    //                 try {
    //                     const skillTypeData = await useFindSkillType(evidence.evidenceName);
    //                     return {
    //                         ...evidence,
    //                         skillTypeName: skillTypeData.competencieTypeName,
    //                     };
    //                 } catch (error) {
    //                     console.log('Error => ', error);
    //                     //console.error(`Error fetching skill type data. `, error);
    //                     return {
    //                         ...evidence,
    //                         skillTypeName: 'Unknown',
    //                     };
    //                 }
    //             })
    //         );
    //         console.log('UP Evidence: ', updatedEvidences);
    //         setEvidenceDataTable(updatedEvidences);
    //     };
    useEffect(() => {
        const fetchSkillTypesName = async (evidences) => {
            const updatedEvidences = await Promise.all(
                evidences.map(async (evidence) => {
                    try {
                        const skillTypeData = await useFindSkillType(evidence.evidenceName);
                        return {
                            ...evidence,
                            skillTypeName: skillTypeData.competencieTypeName,
                        };
                    } catch (error) {
                        console.log('Error => ', error);
                        //console.error(`Error fetching skill type data. `, error);
                        return {
                            ...evidence,
                            skillTypeName: 'Não há',
                        };
                    }
                })
            );
            setEvidenceDataTable(updatedEvidences);
        };

        const fetchEvidences = async () => {
            try {
                const foundEvidence = await useFindAllEvidences();
                await fetchSkillTypesName(foundEvidence);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchEvidences();
    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString);
        const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

        const day = String(adjustedDate.getDate()).padStart(2, '0');
        const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
        const year = adjustedDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const removeOptionRulerData = (id) => {
        dispatch({ type: 'REMOVE_RULER_OPTION_DATA', payload: { id } });
        dispatch({ type: 'RESET_REVIEW_RULER_TYPE' });
        dispatch({ type: 'RESET_SELECTED_RULER_TYPE' });
    };

    if (isLoadingReviewScaleAndCriteriaData) {
        return (
            <PageChange />
        );
    }
    const competenceValue = competencies ? competencies : latestreviewScaleAndCriteriaData;

    return (
        <>
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Competências</h3>
                </CardHeader>
                <CardBody>
                    <div className="mb-4">
                        <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label className="form-control-label" htmlFor="validationCompetencia">
                                    Selecione a(s) Competência(s)
                                </label>
                                <Select2
                                    id="validationCompetencia"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione uma ou mais competências" }}
                                    value={competencies || competenceValue}
                                    multiple
                                    onChange={handleCompetenciesChange}
                                    data={competenciesDataList || []}
                                />
                            </Col>
                        </div>
                        <div>
                            {competencies.length > 0 && (
                                <>
                                    <h3>Detalhes das Competências:</h3>
                                    {competenciesDetails.map((competency, index) => (
                                        <div key={competency.id}>
                                            <p>
                                                <strong>Nome:</strong> {competency.competencieTypeName ?? "Carregando..."}
                                            </p>
                                            <p>
                                                <strong>Descrição:</strong> {competency.description ?? "Carregando..."}
                                            </p>
                                            <p>
                                                <strong>Grupo Ocupacional:</strong>{" "}
                                                {occupationalGroups[index]?.competencieName ?? "Carregando..."}
                                            </p>
                                            <p>
                                                <strong>Classificação da Habilidade:</strong>{" "}
                                                {skillClassifications[index]?.competenceClassificationName ?? "Carregando..."}
                                            </p>
                                            <h4>Evidências Relacionadas:</h4>
                                            <ToolkitProvider
                                                data={evidenceDataList.filter(evidence => evidence.evidenceName == competency.id)}
                                                keyField="id"
                                                columns={evidenceColumns}
                                                search
                                            >
                                                {(props) => (
                                                    <div className="table-responsive">
                                                        <div id="datatable-basic_filter" className="dataTables_filter pb-1 w-50">
                                                            <SearchBar
                                                                className="form-control-sm"
                                                                style={{
                                                                    height: "40px",
                                                                    width: 564,
                                                                    fontSize: "16px",
                                                                    padding: "10px",
                                                                    borderRadius: "8px",
                                                                }}
                                                                placeholder="Pesquise por alguma evidência específica aqui ..."
                                                                {...props.searchProps}
                                                            />
                                                        </div>
                                                        <BootstrapTable
                                                            {...props.baseProps}
                                                            bootstrap4
                                                            pagination={pagination}
                                                            bordered={false}
                                                            selectRow={selectRow(competency.id)}
                                                        />
                                                    </div>
                                                )}
                                            </ToolkitProvider>
                                            <hr />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Respostas</h3>
                </CardHeader>
                <CardBody>
                    <div className="mb-4">
                        <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationRulerType"
                                >
                                    Tipo de Legenda
                                </label>
                                <Select2
                                    id="validationRulerType"
                                    className="form-control"
                                    data-minimum-results-for-search="Infinity"
                                    options={{ placeholder: "Selecione o tipo de legenda" }}
                                    value={SELECTED_RULER_TYPE && SELECTED_RULER_TYPE !== '' ? SELECTED_RULER_TYPE : null}
                                    data={state.reviewScaleAndCriteriaData.rulerTypeDataList || []}
                                    onSelect={(e) => {
                                        const selectedValue = e.target.value;
                                        handleSelectionEmploymentContractDataWrapper(
                                            selectedValue,
                                            Array.isArray(state.reviewScaleAndCriteriaData.rulerTypeDataList)
                                                ? state.reviewScaleAndCriteriaData.rulerTypeDataList
                                                : [],
                                            'SET_SELECTED_RULER_TYPE',
                                            'SET_REVIEW_RULER_TYPE',
                                            'SET_REVIEW_RULER_TYPE_STATE',
                                            null,
                                            null,
                                            'id'
                                        );
                                    }}
                                />
                                <Button
                                    className="mt-2 w-100"
                                    color="primary"
                                    type="button"
                                    size="md"
                                    disabled={!SELECTED_RULER_TYPE}
                                    onClick={() => {
                                        handleOpenRulerTypeModal();
                                    }}
                                >
                                    Selecionar
                                </Button>
                            </Col>
                            <Col
                                className="mb-3 mt-2"
                                name="draw_lots_peer"
                                md={
                                    !state.reviewScaleAndCriteriaData.showSelectRulerOptionsButton
                                        ? "8" : "6"
                                }
                            >
                                <Row>
                                    {state.reviewScaleAndCriteriaData.reviewRulerOptionSelected ? (
                                        state.reviewScaleAndCriteriaData.rulerOptionData.map((rulerType) => (
                                            <CardBody className="py-1 mx-2" key={rulerType.id}>
                                                <Row>
                                                    <Col className="my-2" md="3">
                                                        <Row className="flex-column">
                                                            <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }}>
                                                                Régua do tipo{' '}

                                                            </h6>
                                                            <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.ruleType}</h5>
                                                        </Row>
                                                        <Row className="flex-column">
                                                            <h6 className="text-uppercase ls-1 mb-1" style={{ color: "#ff623f" }}>
                                                                Alternativas{' '}
                                                            </h6>
                                                            <h5 className="font-weith-bold text-lg text-dark mb-0">{rulerType.optionsCount}</h5>
                                                        </Row>
                                                    </Col>
                                                    <Col className="my-2" md="1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => removeOptionRulerData(rulerType.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </Col>
                                                    <Col className="mb-2 d-flex flex-row justify-content-start align-items-center" md="8">
                                                        {rulerType.options && rulerType.options.length > 0 ? (
                                                            rulerType.options.map((option, index) => (
                                                                <Card key={index} className="bg-orange m-2" style={{ width: 96, height: 96 }}>
                                                                    <CardBody className="d-flex flex-column justify-content-start align-items-center">
                                                                        <div>
                                                                            <h3 className="mb-0 text-lighter text-center">{option.label}</h3>
                                                                        </div>
                                                                        <div className="mb-2 d-flex">
                                                                            <h5 className="text-lighter mr-2">Peso</h5>
                                                                            <h5 className="mb-0 text-lighter">{option.weight}</h5>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            ))
                                                        ) : (
                                                            <Col md="12">
                                                                <small>Nenhuma opção encontrada.</small>
                                                            </Col>
                                                        )}
                                                    </Col>
                                                </Row>


                                            </CardBody>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </Row>
                            </Col>
                        </div>
                    </div>
                </CardBody>
                {
                    modalOpen && (
                        <ModalRulerType {...commonProps} />
                    )
                }
            </Card>
        </>
    );
}