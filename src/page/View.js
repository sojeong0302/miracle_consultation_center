import "./View.css";
import Button from "../component/Button.js";

const View = () => {
  return (
    <div className="view-container">
      <textarea className="originalText"></textarea>
      <textarea className="myAnswer"></textarea>
      <Button text={"취소"} />
    </div>
  );
};

export default View;
