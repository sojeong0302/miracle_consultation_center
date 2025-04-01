import React from "react";
import "./Button.css";
import { useNavigate } from "react-router-dom";

const Button = ({ text, route, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (route) {
      navigate(route);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export default Button;
