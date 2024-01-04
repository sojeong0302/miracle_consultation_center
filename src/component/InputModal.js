import "./InputModal.css";
import React from "react";

const InputModal = ({ inputElement, text, buttonElement }) => {
  return (
    <div className="inputModal-container">
      <div className="inputModal-element">
        <h2>{text}</h2>
        <div>{inputElement}</div>
        <div>{buttonElement}</div>
      </div>
    </div>
  );
};

export default InputModal;
