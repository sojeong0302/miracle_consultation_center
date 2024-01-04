import "./Home.css";
import Button from "../component/Button.js";
import React, { useState } from "react";
import login from "../img/login.png";
import InputModal from "../component/InputModal.js";

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openAnswerModal = () => {
    setIsAnswerModalOpen(true);
  };

  const closeAnswerModal = () => {
    setIsAnswerModalOpen(false);
  };

  const inputElement = (
    <div className="home-inputElement">
      <div>
        <label> ID </label>
        <input className="home-inputId" />
      </div>
      <div>
        <label> PW </label>
        <input className="home-inputPw" />
      </div>
    </div>
  );

  const buttonElement = (
    <div className="home-buttonElement">
      <button onClick={closeLoginModal}>취소</button>
      <button>입장</button>
    </div>
  );

  const AnserModalElement = (
    <div>
      <label>Number </label>
      <input className="home-inputNumber" />
    </div>
  );

  const AnswerModalButton = (
    <div className="home-AnswerButtonElement">
      <button onClick={closeAnswerModal}>취소</button>
      <button>답변보기</button>
    </div>
  );

  return (
    <div className="home-container">
      <div className="upElement">
        <h1>"고민이 있으신가요?"</h1>
        <div className="home-button">
          <Button text={"상담하기"} route="/write" />
          <Button text={"답변보기"} onClick={openAnswerModal} />
        </div>
      </div>
      <img
        className="home-img"
        alt="로그인 버튼"
        src={login}
        onClick={openLoginModal}
      />
      {isLoginModalOpen && (
        <InputModal
          onClose={closeLoginModal}
          inputElement={inputElement}
          text={"관리자님 어서오세요!"}
          buttonText={"입장"}
          buttonElement={buttonElement}
        />
      )}
      {isAnswerModalOpen && (
        <InputModal
          onClose={closeLoginModal}
          inputElement={AnserModalElement}
          text={"답변을 찾으러 오셨나요?"}
          buttonText={"입장"}
          buttonElement={AnswerModalButton}
        />
      )}
    </div>
  );
};

export default Home;
