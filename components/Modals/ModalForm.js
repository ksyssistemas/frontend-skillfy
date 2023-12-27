// ModalForm.js
import React from "react";

const ModalForm = ({ children, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type="submit">Salvar alterações</button>
    </form>
  );
};

export default ModalForm;
