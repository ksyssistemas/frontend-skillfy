import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// reactstrap components
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import ReactDatetime from "react-datetime";
import { useFindPdi } from "../../../hooks/RecordsHooks/pdi/useFindPdi";
import { PdiContext } from "../../../contexts/RecordsContext/PdiContext";

function ShowPdiDetailsModal({ handleShowPdiDetailsModal, selectedIdToShowPdiDetails, handleCleaningSelectedIdToShowPdiDetails, handleOpenPdiModal, modalShowDetailsOpen }) {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const year = adjustedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function handleClosePdiDetailsModal() {
    handleCleaningSelectedIdToShowPdiDetails();
    handleOpenPdiModal();
  }

  const [detailedPdiData, setDetailedPdiData] = useState(null);

  useEffect(() => {
    const fetchPdi = async () => {
      if (selectedIdToShowPdiDetails) {
        try {
          const foundPdi = await useFindPdi(selectedIdToShowPdiDetails);
          setDetailedPdiData(foundPdi);
          console.log(foundPdi);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchPdi();
  }, [selectedIdToShowPdiDetails]);


  const commonProps = {
    handleShowPdiDetailsModal,
    handleOpenPdiModal,
    modalShowDetailsOpen,
  };

  return (
    detailedPdiData && detailedPdiData.id ? (
      <Modal
        toggle={handleShowPdiDetailsModal}
        isOpen={modalShowDetailsOpen}
        size="xl"
        key={selectedIdToShowPdiDetails}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {`Informações de ${detailedPdiData.name}`}
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={handleClosePdiDetailsModal}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Row>
            <div className="col">
              <div className="card-wrapper">
                <div className="form-row">
                  <Col className="mb-3" md="4">
                    <label className="form-control-label" htmlFor="validationCustom01">
                      Nome
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">{detailedPdiData.name}</span>
                    </div>
                  </Col>
                  <Col className="mb-3" md="8">
                    <label className="form-control-label" htmlFor="validationCustom05">
                      Descrição
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">{detailedPdiData.description}</span>
                    </div>
                  </Col>
                </div>
                <div className="form-row">
                  <Col className="mb-3" md="4">
                    <label className="form-control-label" htmlFor="validationCustom01">
                      Prazo Inicial
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">{formatDate(detailedPdiData.startDate)}</span>
                    </div>
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label" htmlFor="validationCustom05">
                      Prazo Final
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">{formatDate(detailedPdiData.endDate)}</span>
                    </div>
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label" htmlFor="validationCustom05">
                      Situação
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">{detailedPdiData.status}</span>
                    </div>
                  </Col>
                </div>
                <div className="form-row">
                  <Col className="mb-3" md="4">
                    <label className="form-control-label" htmlFor="validationCustom02">
                      Data em que foi criado
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">{formatDate(detailedPdiData.createdAt)}</span>
                    </div>
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label" htmlFor="validationCustom02">
                      Data da última alteração
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">{formatDate(detailedPdiData.updatedAt)}</span>
                    </div>
                  </Col>
                  <Col className="mb-3" md="4">
                    <label className="form-control-label" htmlFor="validationCustom02">
                      Web Site
                    </label>
                    <div className="mt-1 mb-3">
                      <span className="name text-sm">
                        {/* {userCustomerAccountData.webSite ? userCustomerAccountData.webSite : "N/A"} */}
                      </span>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Row>
          {/* <PdiUserUpdate {...commonProps} /> */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" type="button" onClick={handleClosePdiDetailsModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    ) : null
  );
}

ShowPdiDetailsModal.defaultProps = {
  handleShowPdiDetailsModal: () => { },
  selectedIdToShowPdiDetails: null,
  handleCleaningSelectedIdToShowPdiDetails: () => { },
  handleOpenPdiModal: () => { },
  modalShowDetailsOpen: false,
};

ShowPdiDetailsModal.propTypes = {
  handleShowPdiDetailsModal: PropTypes.func,
  selectedIdToShowpdiDetails: PropTypes.string,
  handleCleaningSelectedIdToShowPdiDetails: PropTypes.func,
  handleOpenPdiModal: PropTypes.func,
  modalShowDetailsOpen: PropTypes.bool,
};

export default ShowPdiDetailsModal;