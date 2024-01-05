import "./View.css";
import Button from "../component/Button.js";
import { useNavigate, useParams } from "react-router-dom";

const View = ({ mockData }) => {
  const navigate = useNavigate();
  const params = useParams();
  const goBack = () => {
    navigate(-1);
  };
  const { code } = params;
  const selectedItem = mockData?.find((mockData) => mockData.code === code);
  console.log("Params:", params);
  console.log("MockData:", mockData);

  return (
    <div className="view-container">
      <div className="view-textare">
        <textarea
          className="originalText"
          value={selectedItem?.content}
          readOnly
        ></textarea>
        <textarea className="myAnswer"></textarea>
      </div>
      <div className="view-button">
        <Button text={"취소"} onClick={goBack} />
      </div>
    </div>
  );
};

export default View;
