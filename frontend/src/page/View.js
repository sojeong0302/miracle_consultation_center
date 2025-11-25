import "./View.css";
import Button from "../component/Button.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
    const [answer, setAnswer] = useState("");
    const [content, setContent] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const goBack = () => {
        navigate(-1);
    };
    const { code } = params;

    useEffect(() => {
        const apiUrl = `http://3.38.176.127/view/${code}`;
        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setAnswer(response.data.answer);
                setContent(response.data.content);
                setIsChecked(response.data.isChecked);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }, []);

    const handleSendClick = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://3.38.176.127/answer/${code}`,
                { answer },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIsChecked(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="view-container">
            <div className="view-textare">
                <textarea className="originalText" value={content} readOnly></textarea>
                <textarea
                    className="myAnswer"
                    value={answer}
                    readOnly={isChecked === true}
                    onChange={(e) => {
                        if (!isChecked) {
                            setAnswer(e.target.value);
                        }
                    }}
                ></textarea>
            </div>
            <div className="view-button">
                <Button text={"취소"} onClick={goBack} />
                {isChecked === false && <Button text={"보내기"} onClick={handleSendClick} />}
            </div>
        </div>
    );
};

export default View;
