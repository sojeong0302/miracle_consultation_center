import "./View.css";
import Button from "../component/Button.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const View = ({ mockData }) => {
  const [anser, setAnswer] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const goBack = () => {
    navigate(-1);
  };
  const { code } = params;
  const selectedItem = mockData?.find((mockData) => mockData.code === code);

  console.log(selectedItem?.isChecked);
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
          defaultValue={
            selectedItem?.isChecked === 1 ? selectedItem?.answer : ""
          }
          readOnly={selectedItem?.isChecked === 1}
        ></textarea>
      </div>
      <div className="view-button">
        <Button text={"취소"} onClick={goBack} />
        {selectedItem?.isChecked === 0 && (
          <Button text={"보내기"} onClick={() => {}} />
        )}
      </div>
    </div>
  );
};

export default View;
