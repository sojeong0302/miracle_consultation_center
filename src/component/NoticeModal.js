import "./NoticeModal.css";
import React from "react";

const NoticeModal = ({ text, noticeElement, closeModal }) => {
  console.log("모달 열림");
  return (
    <div className="noticeModal-container">
      <div className="noticeModal-element">
        <h1 className="noticeModal-h1">{text}</h1>
        <div>{noticeElement}</div>
      </div>
    </div>
  );
};

export default NoticeModal;
