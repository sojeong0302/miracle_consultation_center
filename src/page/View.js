import "./View.css";
import Button from "../component/Button.js";
import { useParams } from "react-router-dom";

const View = () => {
  const params = useParams();

  return (
    <div className="view-container">
      <div className="view-textare">
        <textarea className="originalText"></textarea>
        <textarea className="myAnswer"></textarea>
      </div>
      <div className="view-button">
        <Button text={"취소"} />
      </div>
    </div>
  );
};

export default View;
