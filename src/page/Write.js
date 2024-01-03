import "./Write.css";
import Button from "../component/Button.js";

const Write = () => {
  return (
    <div className="write-container">
      <input placeholder="가명도 괜찮아요" />
      <textarea />
      <div className="button-container">
        <Button text={"취소"} />
        <Button text={"보내기"} />
      </div>
    </div>
  );
};

export default Write;
