import "./View.css";
import Button from "../component/Button.js";
import { useNavigate, useParams } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();
  const params = useParams();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="view-container">
      <div className="view-textare">
        <textarea className="originalText"></textarea>
        <textarea className="myAnswer"></textarea>
      </div>
      <div className="view-button">
        <Button text={"취소"} onClick={goBack} />
      </div>
    </div>
  );
};

export default View;
