import "./Write.css";
import Button from "../component/Button.js";
import { useState } from "react";
import NoticeModal from "../component/NoticeModal.js";
import Duplication from "../img/Duplication.png";

const Write = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const noticeElement = (
    <div className="write-noticeModal">
      <div className="notice">
        <h2>
          보내주신 사연이 무사히 접수되었습니다.
          <br /> 모든 사연은 비밀을 보장하고 있습니다. <br />
          답변은 Number를 통해 받을 수 있으며
          <br />
          답변 시기는 사정에 따라 1~3일 정도 <br />
          소요될 수 있음을 양해 부탁드립니다.
        </h2>
      </div>
      <div className="number-element">
        <label htmlFor="number" className="numberLabel">
          Number
        </label>
        <input id="number" className="write-number" />
      </div>
      <div>
        <h4>※ number는 재발급 받을 수 없습니다.</h4>
        <h3 className="write-from">from. 기적의 상담소</h3>
        <div className="noticeButton">
          <Button text={"확인"} onClick={closeModal} route="/" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="write-container">
      <input className="write-input" placeholder="가명도 괜찮아요" />
      <textarea
        className="write-textarea"
        placeholder="고민을 자유롭게 입력해주세요..."
      />
      <div className="write-button">
        <Button text={"취소"} route="/" />
        <Button text={"보내기"} onClick={openModal} />
      </div>
      {isModalOpen && (
        <NoticeModal text={"접수완료"} noticeElement={noticeElement} />
      )}
    </div>
  );
};

export default Write;
