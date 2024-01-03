import "./View.css";
import Button from "../component/Button.js";

const View = () => {
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
