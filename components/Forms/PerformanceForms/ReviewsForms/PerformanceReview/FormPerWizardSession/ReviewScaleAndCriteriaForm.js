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
} from "reactstrap";
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

export function ReviewScaleAndCriteriaForm() {

    const {
        rulerTypeDataList,
        handleRulerTypeDataList,
        employeeContractType,
        setEmployeeContractType,
        employeeContractTypeState,
        setEmployeeContractTypeState,
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

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();

    const data = [
        {
            id: 1,
            evidenceName: "Call with Dave",
            createdAt: new Date(y, m, 1),
            status: true,
            className: "bg-red",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum abacaxi sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },

        {
            id: 2,
            evidenceName: "Lunch meeting",
            createdAt: new Date(y, m, d - 1, 10, 30),
            status: true,
            className: "bg-orange",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sorvete sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },

        {
            id: 3,
            evidenceName: "All day conference",
            createdAt: new Date(y, m, d + 7, 12, 0),
            status: true,
            className: "bg-green",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum bolacha sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },
    ]

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
            payload: !state.reviewScaleAndCriteriaData.showSelectRulerOptionsButton,
        });
    };

    // Selecionar uma opção de legenda
    const handleRulerOptionSelected = (rulerOption) => {
        dispatch({
            type: 'SET_PERFORMANCE_REVIEW_RULER_OPTION_SELECTED',
            payload: rulerOption,
        });
    };

    // Fetch de dados para opções de legenda
    const fetchRulerOption = async () => {
        try {
            const rulerData = await useFindCaptionOptionByCaptionId(state.reviewScaleAndCriteriaData.rulerOptionSelected);
            if (rulerData?.msg || rulerData === null) return;

            dispatch({ type: 'SET_RULER_OPTION_DATA_LIST', payload: rulerData });
            dispatch({
                type: 'SET_PERFORMANCE_REVIEW_RULER_OPTION_SELECTED_STATE',
                payload: rulerData === "" ? "invalid" : "valid",
            });
        } catch (error) {
            console.error(`Error fetching ruler options data for id ${state.reviewScaleAndCriteriaData.performanceReviewRulerOptionSelected}:`, error);
        }
    };

    const commonProps = {
        handleOpenRulerTypeModal,
        handleClosewRulerTypeModal,
        selectedRulerType: state.reviewScaleAndCriteriaData.selectedRulerType,
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

    useEffect(() => {
        // Executa o fetch apenas se a opção selecionada não for null
        if (state.reviewScaleAndCriteriaData.rulerOptionSelected) {
            fetchRulerOption();
        }
    }, [state.reviewScaleAndCriteriaData.rulerOptionSelected]);

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

                        latestreviewScaleAndCriteriaData.current = parsedData; // Atualiza a ref para os dados carregados
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
    console.log(competencies);
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
        const selectedValues = Array.from(e.target.selectedOptions).map((option) =>
            Number(option.value)
        );
        setCompetencies(selectedValues);
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

    //     const fetchEvidences = async () => {
    //         try {
    //             const foundEvidence = await useFindAllEvidences();
    //             await fetchSkillTypesName(foundEvidence);
    //         } catch (error) {
    //             console.error('Error fetching types:', error);
    //         }
    //     };

    //     fetchEvidences();
    // }, [])

    if (isLoadingReviewScaleAndCriteriaData) {
        return (
            <PageChange />
        );
    }

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
                                    value={competencies}
                                    multiple
                                    onChange={handleCompetenciesChange}
                                    data={competenciesDataList || []}
                                />
                            </Col>
                        </div>
                        <div>
                            {competencies.length > 0  ? (
                                <>
                                    <h3>Detalhes das Competências:</h3>
                                    {competenciesDetails.map((competency, index) => (
                                        <div key={competency.id}>
                                            <p>
                                                <strong>Nome:</strong> {competency.competencieTypeName || "Carregando..."}
                                            </p>
                                            <p>
                                                <strong>Descrição:</strong> {competency.description || "Carregando..."}
                                            </p>
                                            <p>
                                                <strong>Grupo Ocupacional:</strong>{" "}
                                                {occupationalGroups[index]?.competencieName || "Carregando..."}
                                            </p>
                                            <p>
                                                <strong>Classificação da Habilidade:</strong>{" "}
                                                {skillClassifications[index]?.competenceClassificationName || "Carregando..."}
                                            </p>
                                            <h4>Evidências Relacionadas:</h4>
                                            {evidenceDataList.some(evidence => evidence.evidenceName == competency.id) ? (
                                                <ul>
                                                    {evidenceDataList
                                                        .filter(evidence => evidence.evidenceName == competency.id)
                                                        .map(evidence => (
                                                            <li key={evidence.id}>{evidence.description || "Carregando..."}</li>
                                                        ))}
                                                </ul>
                                            ) : (
                                                <p>Nenhuma evidência encontrada.</p>
                                            )}
                                            <hr />
                                        </div>
                                    ))}
                                </>
                            ) : null}
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
                                            'SET_EMPLOYEE_CONTRACT_TYPE',
                                            'SET_EMPLOYEE_CONTRACT_TYPE_STATE',
                                            null,
                                            null,
                                            'id'
                                        );
                                    }}
                                />
                            </Col>
                            {
                                state.reviewScaleAndCriteriaData.showSelectRulerOptionsButton && (
                                    <Col className="mb-3 mt-2 pt-4" md="3" name="draw_lots_peer">
                                        <Button
                                            color="primary"
                                            type="button"
                                            onClick={() => {
                                                handleOpenRulerTypeModal();
                                            }}
                                        >
                                            Selecionar Legendas
                                        </Button>
                                    </Col>
                                )
                            }
                            <Col
                                className="mb-3 mt-2"
                                name="draw_lots_peer"
                                md={
                                    !state.reviewScaleAndCriteriaData.showSelectRulerOptionsButton
                                        ? "8" : "5"
                                }
                            >
                                {
                                    !state.reviewScaleAndCriteriaData.rulerOptionData && !state.reviewScaleAndCriteriaData.rulerOptionData !== undefined ? (
                                        !state.reviewScaleAndCriteriaData.rulerOptionData.length > 0 ? (
                                            <Row className="">
                                                {
                                                    !state.reviewScaleAndCriteriaData.rulerOptionData.map((option, index) => (
                                                        <Col className="" key={index}>
                                                            <Card className="bg-primary mb-0">
                                                                <CardBody className="py-2 px-2 d-flex flex-column justify-content-center align-items-center">
                                                                    <div className="mb-2">
                                                                        <h5 style={{ fontSize: 14 }} className="mb-0 text-light text-center">{option.label}</h5>
                                                                    </div>
                                                                    <div className="mb-2 d-flex">
                                                                        <small className="text-light mr-2">Peso:</small>
                                                                        <h5 className="mb-0 text-light">{option.weight}</h5>
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        ) : (
                                            !state.reviewScaleAndCriteriaData.rulerOptionData.msg && !state.reviewScaleAndCriteriaData.showSelectRulerOptionsButton && (
                                                <Col md="12">
                                                    <small>Nenhuma opção encontrada.</small>
                                                </Col>
                                            )
                                        )
                                    ) : null
                                }
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
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Evidecias</h3>
                    {/* <p className="text-sm mb-0">
                        This is an exmaple of data table using the well known
                        react-bootstrap-table2 plugin. This is a minimal setup in
                        order to get started fast.
                    </p> */}
                </CardHeader>
                <ToolkitProvider
                    data={data}
                    keyField="id"
                    columns={[
                        {
                            dataField: "description",
                            text: "Evidência",
                            sort: true,
                            headerStyle: { width: "65%", minWidth: "200px" },
                            style: { whiteSpace: "normal", wordWrap: "break-word" },
                        },
                        {
                            dataField: "evidenceName",
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
                        {
                            dataField: "status",
                            text: "Estado",
                            sort: true,
                            formatter: (cell) => (cell ? "Ativo" : "Inativo"),
                            headerStyle: { width: "5%", minWidth: "20px" },
                        },
                    ]}
                    search
                >
                    {(props) => (
                        <div className="table-responsive">
                            <div
                                id="datatable-basic_filter"
                                className="dataTables_filter pb-1 w-50"
                            >
                                <SearchBar
                                    className="form-control-sm"
                                    style={{
                                        height: "40px",
                                        width: 564,
                                        fontSize: "16px",
                                        padding: "10px",
                                        borderRadius: "8px",
                                    }}
                                    placeholder="Pesquise por alguma evidência expecifica aqui ..."
                                    {...props.searchProps}
                                />
                            </div>
                            <BootstrapTable
                                {...props.baseProps}
                                bootstrap4={true}
                                pagination={pagination}
                                bordered={false}
                            />
                        </div>
                    )}
                </ToolkitProvider>
            </Card>
        </>
    );
}