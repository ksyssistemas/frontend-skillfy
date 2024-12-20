import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Row, Table } from "reactstrap";
import dynamic from "next/dynamic";
import { handleSelectionEmploymentContractData } from "../../../../../../util/handleSelectionEmploymentContractData";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin that creates an input with badges
import TagsInput from "components/TagsInput/TagsInput.js";
import { useFindAllEmployee } from "../../../../../../hooks/RecordsHooks/employee/useFindAllEmployee";
import EmployeePairsInput from "../EmployeePairsInput";

export function ReviewParticipantSelectionForm() {
    const [isAllEmployeesSelectedToParticipate, setIsAllEmployeesSelectedToParticipate] = useState(false);
    const [listEmployeeDataToReview, setListEmployeeDataToReview] = useState([]);
    const [listLeaderEmployeeDataToReview, setListLeaderEmployeeDataToReview] = useState([]);
    const [listLedEmployeeDataToReview, setListLedEmployeeDataToReview] = useState([]);
    const [employeesSelectedAmount, setEmployeesSelectedAmount] = useState(0);

    const [isRandomSelectionParticipantsToReview, setIsRandomSelectionParticipantsToReview] = useState(false);
    const [isShouldPresentParticipantSelectionButtons, setIsShouldPresentParticipantSelectionButtons] = useState(false);

    const [isSholdPresentNamesSelectedLeaders, setIsSholdPresentNamesSelectedLeaders] = useState(false);
    const [isSholdPresentNamesSelectedSelfReview, setIsSholdPresentNamesSelectedSelfReview] = useState(false);
    const [isSholdPresentNamesSelectedPairs, setIsSholdPresentNamesSelectedPairs] = useState(false);

    const [leadersNumberToDrawn, setleadersNumberToDrawn] = useState(0);
    const [selfReviewsNumberToDrawn, setSelfReviewsNumberToDrawn] = useState(0);
    const [pairsNumberToDrawn, setPairsNumberToDrawn] = useState(0);

    // Verificações para habilitar/desabilitar os botões
    const isLeadersButtonEnabled =
        leadersNumberToDrawn > 0 &&
        leadersNumberToDrawn <= listEmployeeDataToReview.filter((employee) => employee.isLead === true).length;
    const isSelfReviewsButtonEnabled =
        selfReviewsNumberToDrawn > 0 && selfReviewsNumberToDrawn <= listEmployeeDataToReview.length;
    const isPairsButtonEnabled =
        pairsNumberToDrawn > 0 && pairsNumberToDrawn <= listEmployeeDataToReview.length;

    const [listLeaderEmployeeDataSelectedToReview, setListLeaderEmployeeDataSelectedToReview] = useState([]);
    const [leaderTagsInput, setLeaderTagsInput] = useState([]);
    const [listEmployeeDataToSelfReview, setListEmployeeDataToSelfReview] = useState([]);
    const [selfReviewTagsInput, setSelfReviewTagsInput] = useState([]);
    const [listPairEmployeeDataToReview, setListPairEmployeeDataToReview] = useState([]);

    const [isHandPickedSelectionParticipantsToReview, setIsHandPickedSelectionParticipantsToReview] = useState(false);
    const [leaderEmployeeSelected, setLeaderEmployeeSelected] = useState('');
    const [ledEmployeeSelected, setLedEmployeeSelected] = useState('');
    const [pairsEmployeeSelected, setPairsEmployeeSelected] = useState('');

    async function handleSelectionAllRegisteredUsers() {
        setIsAllEmployeesSelectedToParticipate(!isAllEmployeesSelectedToParticipate);
        setEmployeesSelectedAmount(listEmployeeDataToReview.length)
    }

    function handleUnselectionAllRegisteredUsers() {
        setIsAllEmployeesSelectedToParticipate(!isAllEmployeesSelectedToParticipate);
        setEmployeesSelectedAmount(0);
    }

    async function handleRandomSelectionRegisteredUsers() {
        setIsRandomSelectionParticipantsToReview(!isRandomSelectionParticipantsToReview);
        setIsShouldPresentParticipantSelectionButtons(!isShouldPresentParticipantSelectionButtons);
    }

    function handleRandomUnselectionRegisteredUsers() {
        setIsRandomSelectionParticipantsToReview(!isRandomSelectionParticipantsToReview);
        setIsShouldPresentParticipantSelectionButtons(!isShouldPresentParticipantSelectionButtons);
        setIsSholdPresentNamesSelectedLeaders(false);
        setIsSholdPresentNamesSelectedPairs(false);
        setIsSholdPresentNamesSelectedSelfReview(false);
    }

    function handleRandomSelectionLeaderEmployees() {
        if (leadersNumberToDrawn > 0) {
            // Filtrar apenas os colaboradores que possuem "isLead: true"
            const eligibleLeaders = listEmployeeDataToReview.filter(
                (employee) => employee.isLead === true
            );

            // Garantir que não sorteamos mais do que o total disponível
            const drawCount = Math.min(leadersNumberToDrawn, eligibleLeaders.length);

            // Embaralhar a lista de elegíveis
            const shuffledLeaders = [...eligibleLeaders].sort(() => 0.5 - Math.random());

            // Selecionar os primeiros "drawCount" elementos da lista embaralhada
            const selectedLeaders = shuffledLeaders.slice(0, drawCount);

            setLeaderTagsInput(selectedLeaders.map((leader) => leader.name));

            // Atualizar o estado com os líderes sorteados
            setListLeaderEmployeeDataSelectedToReview(selectedLeaders);

            // Atualizar o total de colaboradores selecionados
            setEmployeesSelectedAmount((prevAmount) => prevAmount + selectedLeaders.length);

            setIsSholdPresentNamesSelectedLeaders(true);
        }
    }

    function handleRandomSelectionSelfReviews() {
        if (selfReviewsNumberToDrawn > 0 && selfReviewsNumberToDrawn <= listEmployeeDataToReview.length) {
            // Realiza o sorteio de colaboradores
            const shuffled = [...listEmployeeDataToReview].sort(() => 0.5 - Math.random()); // Embaralha os colaboradores
            const selectedEmployees = shuffled.slice(0, selfReviewsNumberToDrawn); // Seleciona o número solicitado

            // Atualiza a lista de colaboradores para autoavaliação
            setListEmployeeDataToSelfReview(selectedEmployees);

            // Atualiza os nomes no campo de TagsInput
            const selectedNames = selectedEmployees.map((employee) => employee.name);
            setSelfReviewTagsInput(selectedNames);

            // Atualiza a contagem de colaboradores selecionados
            setEmployeesSelectedAmount((prev) => prev + selectedEmployees.length);

            // Torna visível a lista de nomes selecionados
            setIsSholdPresentNamesSelectedSelfReview(true);
        } else {
            console.warn("Número de participantes inválido para autoavaliação.");
        }
    }

    function handleRandomSelectionPairsEmployees() {
        if (pairsNumberToDrawn > 0 && listEmployeeDataToSelfReview.length > 0) {
            let newPairs = [];
            let totalSelected = 0;

            listEmployeeDataToSelfReview.forEach((selfReviewEmployee) => {
                // Filtra os colaboradores do mesmo departamento
                const sameDepartmentEmployees = listEmployeeDataToReview.filter(
                    (employee) => employee.departmentId === selfReviewEmployee.departmentId
                );

                // Embaralha os colaboradores do mesmo departamento
                const shuffled = [...sameDepartmentEmployees].sort(() => 0.5 - Math.random());

                // Seleciona a quantidade de pares solicitada
                const selectedPairs = shuffled.slice(0, pairsNumberToDrawn);

                // Cria a estrutura de dados para o colaborador e seus pares
                const employeeOnSelfReview = {
                    employeeId: selfReviewEmployee.id,
                    employeeName: `${selfReviewEmployee.name} ${selfReviewEmployee.lastName}`,
                    pairs: selectedPairs.map((pair) => ({
                        pairIdOnReview: pair.id,
                        pairNameOnReview: `${pair.name} ${pair.lastName}`,
                    })),
                };

                // Adiciona ao array final
                newPairs.push(employeeOnSelfReview);

                // Incrementa o total selecionado
                totalSelected += selectedPairs.length;
            });

            // Atualiza o estado com os pares sorteados
            setListPairEmployeeDataToReview(newPairs);

            // Atualiza o total de colaboradores selecionados
            setEmployeesSelectedAmount((prev) => prev + totalSelected);

            // Torna visível a lista de pares sorteados
            setIsSholdPresentNamesSelectedPairs(true);
        } else {
            console.warn("Número de pares inválido ou lista de autoavaliação vazia.");
        }
    }

    function handleCleanupRandomSelectionRegisteredUsers() {
        setEmployeesSelectedAmount(0);
        setIsSholdPresentNamesSelectedLeaders(false);
        setIsSholdPresentNamesSelectedSelfReview(false);
        setIsSholdPresentNamesSelectedPairs(false);
        setleadersNumberToDrawn(0);
        setSelfReviewsNumberToDrawn(0);
        setPairsNumberToDrawn(0);
        setListLeaderEmployeeDataSelectedToReview([]);
        setLeaderTagsInput([]);
        setListEmployeeDataToSelfReview([]);
        setSelfReviewTagsInput([]);
        setListPairEmployeeDataToReview([]);
    }

    async function handleHandPickedSelectionParticipantsToReview() {
        setIsHandPickedSelectionParticipantsToReview(!isHandPickedSelectionParticipantsToReview);
        //setIsShouldPresentParticipantSelectionButtons(!isShouldPresentParticipantSelectionButtons);
    }

    async function handleHandPickedUnselectionParticipantsToReview() {
        setIsHandPickedSelectionParticipantsToReview(!isHandPickedSelectionParticipantsToReview);
        //setIsShouldPresentParticipantSelectionButtons(!isShouldPresentParticipantSelectionButtons);
    }

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

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const foundEmployees = await useFindAllEmployee();
                setListEmployeeDataToReview(foundEmployees);

                const leaderData = foundEmployees
                    .filter((employee) => employee.isLead)
                    .map((employee, index) => ({
                        id: (index + 1).toString(),
                        text: `${employee.name} ${employee.lastName}`,
                    }));
                setListLeaderEmployeeDataToReview(leaderData);

                const ledData = foundEmployees
                    .filter((employee) => !employee.isLead)
                    .map((employee, index) => ({
                        id: (index + 1).toString(),
                        text: `${employee.name} ${employee.lastName}`,
                    }));
                setListLedEmployeeDataToReview(ledData);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
        fetchEmployees();
    }, []);

    return (
        <Form>
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Selecionar Participantes</h3>
                </CardHeader>
                <CardBody>
                    <div className="mb-4">
                        <Card>
                            <CardBody>
                                <Row className="align-items-center">
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <p className="font-weight-bold" >
                                                Toda a empresa
                                            </p>
                                        </h4>
                                        <p className="text-sm text-muted mb-3">
                                            Selecione todos os usuários registrados no Skillfy.
                                        </p>
                                        {
                                            isAllEmployeesSelectedToParticipate && (
                                                <span className="text-muted text-md">
                                                    <span className="font-weith-bold text-lg text-dark">
                                                        {employeesSelectedAmount}
                                                    </span>{'  '}
                                                    usuários foram selecionados entre líderes e liderados
                                                </span>
                                            )
                                        }
                                    </div>
                                    <Col className="col-auto">
                                        {
                                            isAllEmployeesSelectedToParticipate ? (
                                                <Button
                                                    color="secondary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleUnselectionAllRegisteredUsers}
                                                >
                                                    Remove
                                                </Button>

                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleSelectionAllRegisteredUsers}
                                                >
                                                    Selecionar
                                                </Button>

                                            )
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Row className="align-items-center">
                                    <div className="col ml--2 mb-3">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Randomicamente
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-3">
                                            Selecione todos os usuários registrados como funcionários na empresa.
                                        </p>
                                        {
                                            isRandomSelectionParticipantsToReview &&
                                            employeesSelectedAmount > 0 && (
                                                <span className="text-muted text-md">
                                                    <span className="font-weith-bold text-lg text-dark">
                                                        {employeesSelectedAmount}
                                                    </span>{'  '}
                                                    usuários foram selecionados entre líderes e liderados
                                                </span>
                                            )
                                        }
                                    </div>
                                    <Col className="col-auto">
                                        {
                                            isRandomSelectionParticipantsToReview ? (
                                                <>
                                                    <Button
                                                        color="secondary"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleRandomSelectionRegisteredUsers}
                                                    >
                                                        Remove
                                                    </Button>
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleCleanupRandomSelectionRegisteredUsers}
                                                    >
                                                        Limpar
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleRandomUnselectionRegisteredUsers}
                                                >
                                                    Selecionar
                                                </Button>

                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        isShouldPresentParticipantSelectionButtons &&
                                        isRandomSelectionParticipantsToReview && (
                                            <Col className="mb-3 d-flex align-items-center justify-content-start" md="4">
                                                <Button
                                                    className="btn-darker"
                                                    color="darker"
                                                    disabled={!isLeadersButtonEnabled}
                                                    onClick={handleRandomSelectionLeaderEmployees}
                                                    size="sm"
                                                    style={{ width: 150, textAlign: "center" }}
                                                >
                                                    Sortear líderes
                                                </Button>
                                                <Input
                                                    id="leadersInput"
                                                    type="number"
                                                    defaultValue="0"
                                                    min="1"
                                                    max={listEmployeeDataToReview.length - 1}
                                                    className="form-control"
                                                    value={leadersNumberToDrawn}
                                                    onChange={(e) => setleadersNumberToDrawn(Number(e.target.value))}
                                                    size="sm"
                                                    style={{ width: 72 }}
                                                />
                                            </Col>
                                        )
                                    }
                                    <Col className="mb-3 d-flex flex-column" md="8">
                                        {
                                            isSholdPresentNamesSelectedLeaders &&
                                            isRandomSelectionParticipantsToReview && (
                                                <>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="validationReviewName"
                                                    >
                                                        Líderes
                                                    </label>
                                                    <TagsInput
                                                        onlyUnique
                                                        className="bootstrap-tagsinput"
                                                        value={leaderTagsInput}
                                                        tagProps={{ className: "tag badge mr-1 bg-orange" }}
                                                        inputProps={{
                                                            className: "",
                                                            placeholder: "",
                                                        }}
                                                        onChange={(updatedTags) => {
                                                            setLeaderTagsInput(updatedTags);

                                                            // Atualizar a lista original com base nos nomes selecionados
                                                            const updatedLeaders = listLeaderEmployeeDataSelectedToReview.filter((leader) =>
                                                                updatedTags.includes(leader.name)
                                                            );
                                                            setListLeaderEmployeeDataSelectedToReview(updatedLeaders);

                                                            // Verificação do tamanho de leaderTagsInput
                                                            if (updatedTags.length < 1) {
                                                                setIsSholdPresentNamesSelectedLeaders(false);
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        isShouldPresentParticipantSelectionButtons &&
                                        isRandomSelectionParticipantsToReview && (
                                            <Col className="mb-3 d-flex align-items-center justify-content-start" md="4">
                                                <Button
                                                    className="btn-darker"
                                                    color="darker"
                                                    disabled={!isSelfReviewsButtonEnabled}
                                                    onClick={handleRandomSelectionSelfReviews}
                                                    size="sm"
                                                    style={{ width: 150, textAlign: "center" }}
                                                >
                                                    Sortear liderados
                                                </Button>
                                                <Input
                                                    id="selfReviewsInput"
                                                    type="number"
                                                    defaultValue="0"
                                                    min="1"
                                                    max={listEmployeeDataToReview.length}
                                                    className="form-control"
                                                    value={selfReviewsNumberToDrawn}
                                                    onChange={(e) => setSelfReviewsNumberToDrawn(Number(e.target.value))}
                                                    size="sm"
                                                    style={{ width: 72 }}
                                                />
                                            </Col>
                                        )
                                    }
                                    <Col className="mb-3 d-flex flex-column" md="8">
                                        {
                                            isSholdPresentNamesSelectedSelfReview &&
                                            isRandomSelectionParticipantsToReview && (
                                                <>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="validationReviewName"
                                                    >
                                                        Autoavaliação
                                                    </label>
                                                    <TagsInput
                                                        onlyUnique
                                                        className="bootstrap-tagsinput"
                                                        onChange={(updatedTags) => {
                                                            // Atualiza o estado dos nomes
                                                            setSelfReviewTagsInput(updatedTags);

                                                            // Atualiza a lista original com base nos nomes selecionados
                                                            const updatedSelfReviewList = listEmployeeDataToSelfReview.filter((employee) =>
                                                                updatedTags.includes(employee.name)
                                                            );
                                                            setListEmployeeDataToSelfReview(updatedSelfReviewList);

                                                            // Verifica se não há mais tags
                                                            if (updatedTags.length < 1) {
                                                                setIsSholdPresentNamesSelectedSelfReview(false);
                                                            }
                                                        }}
                                                        value={selfReviewTagsInput}
                                                        tagProps={{ className: "tag badge mr-1  bg-secondary text-dark" }}
                                                        inputProps={{
                                                            className: "",
                                                            placeholder: "",
                                                        }}
                                                    />
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        isShouldPresentParticipantSelectionButtons &&
                                        isRandomSelectionParticipantsToReview && (
                                            <Col className="mb-3 d-flex align-items-center justify-content-start" md="4">
                                                <Button
                                                    className="btn-darker"
                                                    color="darker"
                                                    disabled={!isPairsButtonEnabled}
                                                    onClick={handleRandomSelectionPairsEmployees}
                                                    size="sm"
                                                    style={{ width: 150, textAlign: "center" }}
                                                >
                                                    Sortear pares
                                                </Button>
                                                <Input
                                                    id="pairsInput"
                                                    type="number"
                                                    defaultValue="0"
                                                    min="1"
                                                    max={listEmployeeDataToReview.length}
                                                    className="form-control"
                                                    value={pairsNumberToDrawn}
                                                    onChange={(e) => setPairsNumberToDrawn(Number(e.target.value))}
                                                    size="sm"
                                                    style={{ width: 72 }}
                                                />
                                            </Col>
                                        )
                                    }
                                    <Col className="mb-3 d-flex flex-column" md="8">
                                        {
                                            isSholdPresentNamesSelectedPairs &&
                                            isRandomSelectionParticipantsToReview && (
                                                <>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="validationReviewName"
                                                    >
                                                        Pares
                                                    </label>
                                                    <EmployeePairsInput
                                                        listPairEmployeeDataToReview={listPairEmployeeDataToReview}
                                                        setListPairEmployeeDataToReview={setListPairEmployeeDataToReview}
                                                    />
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Row className="align-items-center mb-3">
                                    <div className="col ml--2">
                                        <h4 className="mb-0">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Manual
                                            </a>
                                        </h4>
                                        <p className="text-sm text-muted mb-3">
                                            Selecione todos os usuários registrados como funcionários na empresa.
                                        </p>
                                        {
                                            isHandPickedSelectionParticipantsToReview &&
                                            employeesSelectedAmount > 0 && (
                                                <span className="text-muted text-md">
                                                    <span className="font-weith-bold text-lg text-dark">
                                                        {employeesSelectedAmount}
                                                    </span>{'  '}
                                                    usuários foram selecionados entre líderes e liderados
                                                </span>
                                            )
                                        }
                                    </div>
                                    <Col className="col-auto">
                                        {
                                            isHandPickedSelectionParticipantsToReview ? (
                                                <>
                                                    <Button
                                                        color="secondary"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleHandPickedUnselectionParticipantsToReview}
                                                    >
                                                        Remove
                                                    </Button>
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        type="button"
                                                        onClick={handleCleanupRandomSelectionRegisteredUsers}
                                                    >
                                                        Limpar
                                                    </Button>
                                                </>

                                            ) : (
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleHandPickedSelectionParticipantsToReview}
                                                >
                                                    Selecionar
                                                </Button>

                                            )
                                        }
                                    </Col>
                                </Row>
                                {
                                    isHandPickedSelectionParticipantsToReview && (
                                        <Row>
                                            <Col className="mb-3" md="6">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="handPickedLeaderSelectionInput"
                                                >
                                                    Selecionar líderes
                                                </label>
                                                <Select2
                                                    id="handPickedLeaderSelectionInput"
                                                    className="form-control"
                                                    data-minimum-results-for-search="Infinity"
                                                    options={{ placeholder: "Selecionar usuários:" }}
                                                    value={leaderEmployeeSelected}
                                                    data={listLeaderEmployeeDataToReview || []}
                                                // onSelect={(e) => {
                                                //     const selectedValue = e.target.value;
                                                //     handleSelectionEmploymentContractDataWrapper(
                                                //         selectedValue,
                                                //         Array.isArray(state.reviewParticipantsSelectionData.reviewCycleDataList)
                                                //             ? state.reviewParticipantsSelectionData.reviewCycleDataList
                                                //             : [],
                                                //         'SET_SELECTED_CYCLE',
                                                //         'SET_REVIEW_CYCLE',
                                                //         'SET_REVIEW_CYCLE_STATE',
                                                //         null,
                                                //         null,
                                                //         'id'
                                                //     );
                                                // }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                {
                                    isSholdPresentNamesSelectedLeaders &&
                                    isHandPickedSelectionParticipantsToReview && (
                                        <Row>
                                            <Col className="mb-3" md="8">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="validationReviewName"
                                                >
                                                    Líderes
                                                </label>
                                                <TagsInput
                                                    onlyUnique
                                                    className="bootstrap-tagsinput"
                                                    //onChange={(value) => setTagsinput(value)}
                                                    //value={tagsinput}
                                                    tagProps={{ className: "tag badge mr-1 bg-orange" }}
                                                    inputProps={{
                                                        className: "",
                                                        placeholder: "",
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                {
                                    isHandPickedSelectionParticipantsToReview && (
                                        <Row>
                                            <Col className="mb-3" md="6">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="handPickedParticipantsSelectionInput"
                                                >
                                                    Selecionar liderados
                                                </label>
                                                <Select2
                                                    id="handPickedParticipantsSelectionInput"
                                                    className="form-control"
                                                    data-minimum-results-for-search="Infinity"
                                                    options={{ placeholder: "Selecionar usuários:" }}
                                                    value={ledEmployeeSelected}
                                                    data={listLedEmployeeDataToReview || []}
                                                // onSelect={(e) => {
                                                //     const selectedValue = e.target.value;
                                                //     handleSelectionEmploymentContractDataWrapper(
                                                //         selectedValue,
                                                //         Array.isArray(state.reviewIdentityData.reviewCycleDataList)
                                                //             ? state.reviewIdentityData.reviewCycleDataList
                                                //             : [],
                                                //         'SET_SELECTED_CYCLE',
                                                //         'SET_REVIEW_CYCLE',
                                                //         'SET_REVIEW_CYCLE_STATE',
                                                //         null,
                                                //         null,
                                                //         'id'
                                                //     );
                                                // }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                {
                                    isSholdPresentNamesSelectedSelfReview &&
                                    isHandPickedSelectionParticipantsToReview && (
                                        <Row>
                                            <Col className="mb-3" md="8">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="validationReviewName"
                                                >
                                                    Autoavaliação
                                                </label>
                                                <TagsInput
                                                    onlyUnique
                                                    className="bootstrap-tagsinput"
                                                    //onChange={(value) => setTagsinput(value)}
                                                    //value={tagsinput}
                                                    tagProps={{ className: "tag badge mr-1  bg-secondary text-dark" }}
                                                    inputProps={{
                                                        className: "",
                                                        placeholder: "",
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                {
                                    isHandPickedSelectionParticipantsToReview && (
                                        <Row>
                                            <Col className="mb-3" md="6">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="handPickedPairsSelectionInput"
                                                >
                                                    Selecionar pares
                                                </label>
                                                <Select2
                                                    id="handPickedPairsSelectionInput"
                                                    className="form-control"
                                                    data-minimum-results-for-search="Infinity"
                                                    options={{ placeholder: "Selecionar usuários:" }}
                                                // value={state.reviewIdentityData.selectedCycle}
                                                //data={tagsinput || []}
                                                // data={state.reviewIdentityData.reviewCycleDataList || []}
                                                // onSelect={(e) => {
                                                //     const selectedValue = e.target.value;
                                                //     handleSelectionEmploymentContractDataWrapper(
                                                //         selectedValue,
                                                //         Array.isArray(state.reviewIdentityData.reviewCycleDataList)
                                                //             ? state.reviewIdentityData.reviewCycleDataList
                                                //             : [],
                                                //         'SET_SELECTED_CYCLE',
                                                //         'SET_REVIEW_CYCLE',
                                                //         'SET_REVIEW_CYCLE_STATE',
                                                //         null,
                                                //         null,
                                                //         'id'
                                                //     );
                                                // }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                {
                                    isSholdPresentNamesSelectedPairs &&
                                    isHandPickedSelectionParticipantsToReview && (
                                        <Row>
                                            <Col className="mb-3" md="8">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="validationReviewName"
                                                >
                                                    Pares
                                                </label>
                                                <TagsInput
                                                    onlyUnique
                                                    className="bootstrap-tagsinput"
                                                    //onChange={(value) => setTagsinput(value)}
                                                    //value={tagsinput}
                                                    tagProps={{ className: "tag badge mr-1" }}
                                                    inputProps={{
                                                        className: "",
                                                        placeholder: "",
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                            </CardBody>
                        </Card>
                    </div>
                </CardBody>
            </Card>
        </Form>
    );
}