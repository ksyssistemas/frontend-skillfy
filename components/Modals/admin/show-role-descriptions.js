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

function ShowRoleDescriptionsModal({ handleShowRoleDescriptionsModal, modalOpen, roleDescription, roleName }) {

  return (
    <Modal
      toggle={handleShowRoleDescriptionsModal}
      isOpen={modalOpen}
      size="md"
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Descrição de {roleName}
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleShowRoleDescriptionsModal}
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
                      {roleDescription}
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

ShowRoleDescriptionsModal.defaultProps = {
  handleShowRoleDescriptionsModal: () => { },
  modalOpen: false,
  roleDescription: "",
  roleName: "",
};

ShowRoleDescriptionsModal.propTypes = {
  handleShowRoleDescriptionsModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  roleDescription: PropTypes.string,
  roleName: PropTypes.string,
};

export default ShowRoleDescriptionsModal;