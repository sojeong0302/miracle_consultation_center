import "./InputModal.css";
import React from "react";

const InputModal = ({
  closeModal,
  inputElement,
  text,
  buttonText,
  buttonElement,
}) => {
  return (
    <div className="inputModal-container">
      <div className="inputModal-element">
        <h2>{text}</h2>
        <div>{inputElement}</div>
        <div>
          {buttonElement}
          {/* <button className="InputModalButton">{buttonText}</button> */}
        </div>
      </div>
    </div>
  );
};

export default InputModal;
