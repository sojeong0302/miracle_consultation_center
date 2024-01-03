import "./Home.css";
import Button from "../component/Button.js";
import React, { useState } from "react";
import login from "../img/login.png";
import InputModal from "../component/InputModal.js";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      {isModalOpen && <InputModal onClose={closeModal} />}
    </div>
  );
};

export default Home;
