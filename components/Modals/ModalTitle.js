// ModalTitle.js
import React from "react";

const ModalTitle = ({ children }) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        {children}
      </h5>
    </div>
  );
};

export default ModalTitle;
