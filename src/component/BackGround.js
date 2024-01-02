import BackGroundImg from "../img/BackGroundImg.jpg";
import "./BackGround.css";

const BackGround = () => {
  return (
    <div className="background-container">
      <img alt="배경화면" src={BackGroundImg} />
    </div>
  );
};

export default BackGround;
