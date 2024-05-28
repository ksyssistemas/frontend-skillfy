import React from "react";
import PropTypes from "prop-types";
// reactstrap components
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

function ShowDepartmentDescriptionsModal({ handleShowDepartmentDescriptionsModal, modalOpen, departmentDescription, departmentName }) {

  return (
    <Modal
      toggle={handleShowDepartmentDescriptionsModal}
      isOpen={modalOpen}
      size="md"
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Descrição de {departmentName}
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleShowDepartmentDescriptionsModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Row>
          <div className="col">
            <div className="card-wrapper">
              <div className="form-row">
                <Col className="mb-3" md="12">
                  <div>
                    <span className="name mb-0 text-sm">
                      {departmentDescription}
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </Row>
      </ModalBody>
      <ModalFooter />
    </Modal >
  );
}

ShowDepartmentDescriptionsModal.defaultProps = {
  handleShowDepartmentDescriptionsModal: () => { },
  modalOpen: false,
  departmentDescription: "",
  departmentName: "",
};

ShowDepartmentDescriptionsModal.propTypes = {
  handleShowDepartmentDescriptionsModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  departmentDescription: PropTypes.string,
  departmentName: PropTypes.string,
};

export default ShowDepartmentDescriptionsModal;