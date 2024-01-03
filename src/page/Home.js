import "./Home.css";
import Button from "../component/Button.js";
import React from "react";
import login from "../img/login.png";

const Home = () => {
  return (
    <div>
      <div className="upElement">
        <h1>"고민이 있으신가요?"</h1>
        <div className="button-container">
          <Button text={"상담하기"} />
          <Button text={"답변보기"} />
        </div>
      </div>
      <img alt="로그인 버튼" src={login} />
    </div>
  );
};

export default Home;
