import "./Answer.css";
import Button from "../component/Button.js";
import { useParams } from "react-router-dom";

const Answer = ({ mockData }) => {
  const params = useParams();

  const { code } = params;
  const selectedItem = mockData?.find((mockData) => mockData.code === code);

  return (
    <div className="answer-container">
      <input className="answer-input" readOnly value={selectedItem?.nickName} />
      <textarea
        className="answer-textarea"
        readOnly
        value={selectedItem?.answer}
      />
      <div className="answer-button">
        <Button text={"취소"} route="/" />
      </div>
    </div>
  );
};

export default Answer;
