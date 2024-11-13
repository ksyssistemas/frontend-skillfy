// ModalComponent.js
import React, { useState, useEffect, useContext } from "react";
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    Col,
    Row
} from "reactstrap";
import PropTypes from "prop-types";
import { PdiContext } from "../../../contexts/RecordsContext/PdiContext";
import useCreatePdi from "../../../hooks/RecordsHooks/pdi/useCreatePdi";
import { useFindPdi } from "../../../hooks/RecordsHooks/pdi/useFindPdi";
import useUpdatePdi from "../../../hooks/RecordsHooks/pdi/useUpdatePdi";
import { handleDateFormatting } from "../../../util/handleDateFormatting";
import { useFindAllClientCompany } from '../../../hooks/RecordsHooks/customer/useFindAllClientCompany';
import { useFindAllAdmin } from '../../../hooks/RecordsHooks/admin/useFindAllAdmin';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import ReactDatetime from "react-datetime";
import dynamic from "next/dynamic";
import moment from 'moment';
const Select2 = dynamic(() => import("react-select2-wrapper"));
function ModalPdi({ handleOpenPdiUpdateModal, handleCleanDetailedPdiAccountData, modalOpen }) {

    const {
        pdiIdToUpdate,
        handlePdiIdStatusCleanupToUpdate,
        handlePdiIdToUpdate,
        hasNewPdiRecordCreated,
        handleCreatedPdiRecordStatusChange,
        hasUpdatedPdiRecord,
        handleUpdatedPdiRecordStatusChange,
        hasDeletedPdiRecord,
        handleDeletedPdiRecordStatusChange,
    } = useContext(PdiContext);

    const {
        Name,
        setName,
        NameState,
        setNameState,
        Description,
        setDescription,
        DescriptionState,
        setDescriptionState,
        StartDate,
        setStartDate,
        StartDateState,
        setStartDateState,
        FinalDate,
        setFinalDate,
        FinalDateState,
        setFinalDateState,
        pdiStatus,
        setPdiStatus,
        pdiStatusState,
        setPdiStatusState,
        appraiser,
        setAppraiser,
        appraiserState,
        setAppraiserState,
        evaluated,
        setEvaluated,
        evaluatedState,
        setEvaluatedState,
        handleValidateAddPDIForm,
        reset
    } = useCreatePdi();

    const {
        handleValidateUpdatePdiForm
    } = useUpdatePdi();

    const handleClosePdiUpdateModal = () => {
        handleOpenPdiUpdateModal();
        reset();
        handleCleanDetailedPdiData();
    };

    function handleUpdatePdi() {
        handleValidateUpdatePdiForm(
            handleClosePdiUpdateModal,
            pdiIdToUpdate,
            Name,
            Description,
            StartDate,
            FinalDate,
            pdiStatus,
            appraiser,
            evaluated,
            handlePdiIdToUpdate,
            handleCleanDetailedPdiAccountData
        )
    }

    const [detailedPdiData, setDetailedPdiData] = useState([]);
    function handleCleanDetailedPdiData() {
        setDetailedPdiData([]);
    };

    useEffect(() => {
        const fetchPdi = async () => {
            if (!detailedPdiData.length) {
                const foundPdi = await useFindPdi(pdiIdToUpdate);
                setDetailedPdiData(foundPdi);
                setName(foundPdi.name);
                setDescription(foundPdi.description);
                setStartDate(foundPdi.startDate);
                setFinalDate(foundPdi.endDate);
                setEvaluated(foundPdi.assessedId);
                setAppraiser(foundPdi.assessorId);
                setPdiStatus(foundPdi.status);
            }
        };

        if (pdiIdToUpdate) {
            fetchPdi();
        }
    }, [pdiIdToUpdate]);

    const [selectedBelongingToClientCompany, setSelectedBelongingToClientCompany] = useState('');
    const [clientCompanyDataList, setClientCompanyDataList] = useState([]);
    const handleClientCompanyDataList = (customerUser) => {
        setClientCompanyDataList(customerUser);
    }

    useEffect(() => {
        if (clientCompanyDataList.length === 0) {
            employmentContractDataSearchAndProcess(useFindAllClientCompany, handleClientCompanyDataList, 'client-company', 'EmployeeUserRegister');
        }
    }, []);

    const [selectedBelongingToAdmin, setSelectedBelongingToAdmin] = useState('');
    const [selectedBelongingToAdminState, setselectedBelongingToAdminState] = React.useState(null);

    const [selectedBelongingToEvaluated, setselectedBelongingToEvaluated] = useState('');
    const [selectedBelongingToEvaluatedState, setselectedBelongingToEvaluatedState] = React.useState(null);

    const [adminDataList, setAdminDataList] = useState([]);
    const handleAdminDataList = (adminUser) => {
        setAdminDataList(adminUser);
    };

    useEffect(() => {
        if (adminDataList.length === 0) {
            employmentContractDataSearchAndProcess(
                useFindAllAdmin,
                handleAdminDataList,
                'admin',
                'AdminUserRegister'
            );
        }
    }, [])

    const handleAppraiserChange = (e) => {
        const value = Number(e.target.value);
        setAppraiser(value);
        if (value) {
            setAppraiserState("valid");
        } else {
            setAppraiserState("invalid");
        }
    };

    const handleEvaluatedChange = (e) => {
        const value = Number(e.target.value);
        setEvaluated(value);
        if (value) {
            setEvaluatedState("valid");
        } else {
            setEvaluatedState("invalid");
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

        const day = String(adjustedDate.getDate()).padStart(2, '0');
        const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
        const year = adjustedDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <Modal toggle={handleOpenPdiUpdateModal} isOpen={modalOpen} size="xl">
            <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                    Editar Competência
                </h5>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleOpenPdiUpdateModal}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Form className="needs-validation" noValidate>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationName"
                            >
                                Nome
                            </label>
                            <Input
                                id="validationName"
                                placeholder="Nome"
                                type="text"
                                valid={NameState === "valid"}
                                invalid={NameState === "invalid"}
                                value={Name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (e.target.value === "") {
                                        setNameState("invalid");
                                    } else {
                                        setNameState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationDescription"
                            >
                                Descrição
                            </label>
                            <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationDescription"
                                placeholder="Descrição da competência"
                                type="text"
                                value={Description}
                                valid={DescriptionState === "valid"}
                                invalid={DescriptionState === "invalid"}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (e.target.value === "") {
                                        setDescriptionState("invalid");
                                    } else {
                                        setDescriptionState("valid");
                                    }
                                }} as
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="3">
                            <label
                                className="form-control-label"
                                htmlFor="validationStartDate"
                            >
                                Data de início
                            </label>
                            <ReactDatetime
                                id="validationStartDate"
                                inputProps={{
                                    placeholder: "__/__/__",
                                }}
                                value={formatDate(StartDate)}
                                timeFormat={false}
                                onChange={(e) => handleDateFormatting(e, setStartDate, setStartDateState)}
                            />
                            <div className="invalid-feedback">
                                É necessário selecionar uma data.
                            </div>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="validationFinalDate"
                                >
                                    Data de Fim
                                </label>
                                <ReactDatetime
                                    id="validationFinalDate"
                                    inputProps={{
                                        placeholder: "__/__/__",
                                    }}
                                    value={formatDate(FinalDate)}
                                    timeFormat={false}
                                    onChange={(e) => handleDateFormatting(e, setFinalDate, setFinalDateState)}
                                />
                                <div className="invalid-feedback">
                                    É necessário selecionar uma data.
                                </div>
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationPDIStatus"
                            >
                                Status
                            </label>
                            <Input
                                id="validationPDIStatus"
                                placeholder="Status do pdi"
                                type="text"
                                valid={pdiStatusState === "valid"}
                                invalid={pdiStatusState === "invalid"}
                                value={pdiStatus}
                                onChange={(e) => {
                                    setPdiStatus(e.target.value);
                                    if (e.target.value === "") {
                                        setPdiStatusState("invalid");
                                    } else {
                                        setPdiStatusState("valid");
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                            <div className="valid-feedback">
                                Parece bom!
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <label
                                className="form-control-label"
                                htmlFor="validationAvaliador"
                            >
                                Avaliador
                            </label>
                            <Select2
                                id="validationAvaliador"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione um Avaliador",
                                }}
                                value={appraiser}
                                onChange={handleAppraiserChange}
                                data={adminDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(
                                    e.target.value,
                                    adminDataList,
                                    setAppraiser,
                                    setSelectedBelongingToAdmin,
                                    setselectedBelongingToAdminState,
                                    null,
                                    null,
                                    'id'
                                )}
                            />
                            <div className="invalid-feedback">
                                É necessário preencher este campo.
                            </div>
                        </Col>
                        <Col className="mb-3" md="6">
                            <label className="form-control-label"
                                htmlFor="validationAvaliado">
                                Avaliado
                            </label>
                            <Select2
                                id="validationAvaliado"
                                className="form-control"
                                data-minimum-results-for-search="Infinity"
                                options={{
                                    placeholder: "Selecione um avaliado",
                                }}
                                value={evaluated}
                                onChange={handleEvaluatedChange}
                                data={clientCompanyDataList}
                                onSelect={(e) => handleSelectionEmploymentContractData(
                                    e.target.value,
                                    clientCompanyDataList,
                                    setEvaluated,
                                    setselectedBelongingToEvaluated,
                                    setselectedBelongingToEvaluatedState,
                                    null,
                                    null,
                                    'id'
                                )}
                            />
                            <div className="invalid-feedback">
                            </div>
                        </Col>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    type="button"
                    onClick={handleOpenPdiUpdateModal}
                >
                    Fechar
                </Button>
                <Button
                    color={'warning'}
                    type="button"
                    onClick={handleUpdatePdi}
                >
                    {'Editar Competência'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ModalPdi.defaultProps = {
    handleOpenPdiUpdateModal: () => { },
    handleCleanDetailedPdiAccountData: () => { },
    modalOpen: false,
};

ModalPdi.propTypes = {
    handleOpenPdiUpdateModal: PropTypes.func,
    handleCleanDetailedPdiAccountData: PropTypes.func,
    modalOpen: PropTypes.bool,
};

export default ModalPdi;
