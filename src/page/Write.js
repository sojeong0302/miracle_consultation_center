import "./Write.css";
import Button from "../component/Button.js";

const Write = () => {
  return (
    <div className="write-container">
      <input className="write-input" placeholder="가명도 괜찮아요" />
      <textarea
        className="write-textarea"
        placeholder="고민을 자유롭게 입력해주세요..."
      />
      <div className="write-button">
        <Button text={"취소"} />
        <Button text={"보내기"} />
      </div>
    </div>
  );
};

export default Write;
