import "./Answer.css";
import Button from "../component/Button.js";

const Answer = () => {
  return (
    <div className="write-container">
      <input />
      <textarea />
      <div className="button-container">
        <Button text={"돌아가기"} />
      </div>
    </div>
  );
};

export default Answer;
