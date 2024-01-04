import "./Answer.css";
import Button from "../component/Button.js";
import { useParams } from "react-router-dom";

const Answer = () => {
  const params = useParams();

  return (
    <div className="answer-container">
      <input className="answer-input" />
      <textarea className="answer-textarea" />
      <div className="answer-button">
        <Button text={"취소"} route="/" />
      </div>
    </div>
  );
};

export default Answer;
