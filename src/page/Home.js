import "./Home.css";
import Button from "../component/Button.js";
import React from "react";
import login from "../img/login.png";

const Home = () => {
  return (
    <div className="home-container">
      <div>
        <h1>"고민이 있으신가요?"</h1>
        <div className="button-container">
          <Button text={"상담하기"} />
          <Button text={"답변보기"} />
        </div>
        <img alt="로그인 버튼" src={login} />
      </div>
    </div>
  );
};

export default Home;
