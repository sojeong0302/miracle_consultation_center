import "./Home.css";
import Button from "../component/Button.js";
import React, { useState } from "react";
import login from "../img/login.png";
import InputModal from "../component/InputModal.js";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const inputElement = (
    <div className="home-inputElement">
      <div>
        <label htmlFor="inputId"> ID </label>
        <input
          id="inputId"
          onChange={(e) => setInputValue(e.target.value)}
          className="home-inputId"
        />
      </div>
      <div>
        <label htmlFor="inputPw"> PW </label>
        <input
          id="inputPw"
          onChange={(e) => setInputValue(e.target.value)}
          className="home-inputPw"
        />
      </div>
    </div>
  );

  const buttonElement = (
    <div className="home-buttonElement">
      <button>취소</button>
      <button>입장</button>
    </div>
  );

  return (
    <div className="home-container">
      <div className="upElement">
        <h1>"고민이 있으신가요?"</h1>
        <div className="home-button">
          <Button text={"상담하기"} />
          <Button text={"답변보기"} />
        </div>
      </div>
      <img
        className="home-img"
        alt="로그인 버튼"
        src={login}
        onClick={openModal}
      />
      {isModalOpen && (
        <InputModal
          onClose={closeModal}
          inputElement={inputElement}
          text={"관리자님 어서오세요!"}
          buttonText={"입장"}
          buttonElement={buttonElement}
        />
      )}
    </div>
  );
};

export default Home;
