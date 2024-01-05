import "./View.css";
import Button from "../component/Button.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const View = ({ mockData, setMockData }) => {
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const goBack = () => {
    navigate(-1);
  };
  const { code } = params;
  const selectedItem = mockData?.find((mockData) => mockData.code === code);

  const handleSendClick = () => {
    if (selectedItem?.isChecked === 0) {
      setMockData((prevData) => {
        const updatedData = prevData.map((item) =>
          item.code === selectedItem.code ? { ...item, answer: answer } : item
        );
        console.log(updatedData);
        return updatedData;
      });
    }
  };

  return (
    <div className="view-container">
      <div className="view-textare">
        <textarea
          className="originalText"
          value={selectedItem?.content}
          readOnly
        ></textarea>
        <textarea
          className="myAnswer"
          value={selectedItem?.isChecked === 0 ? answer : selectedItem?.answer}
          readOnly={selectedItem?.isChecked === 1}
          onChange={(e) => {
            if (!selectedItem?.isChecked) {
              setAnswer(e.target.value);
            }
          }}
        ></textarea>
      </div>
      <div className="view-button">
        <Button text={"취소"} onClick={goBack} />
        {selectedItem?.isChecked === 0 && (
          <Button text={"보내기"} onClick={handleSendClick} />
        )}
      </div>
    </div>
  );
};

export default View;
