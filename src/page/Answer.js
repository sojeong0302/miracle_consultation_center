import "./Answer.css";
import Button from "../component/Button.js";

const Answer = () => {
  return (
    <div className="answer-container">
      <input className="answer-input" />
      <textarea className="answer-textarea" />
      <div className="answer-button">
        <Button text={"돌아가기"} />
      </div>
    </div>
  );
};

export default Answer;
