import './Answer.css';
import Button from '../component/Button.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Answer = () => {
    const params = useParams();
    const { code } = params;
    const [nickName, setNickName] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:5000/getAnswerByCode?code=${code}`;
        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setNickName(response.data.nickName);
                setAnswer(response.data.answer);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className='answer-container' readOnly>
            {/* <input className='answer-input' readOnly value={selectedItem?.nickName} /> */}
            <input className='answer-input' readOnly value={nickName} />
            {/* <textarea className='answer-textarea' readOnly value={selectedItem?.answer} /> */}
            <textarea className='answer-textarea' readOnly value={answer} />
            <div className='answer-button'>
                <Button text={'취소'} route='/' />
            </div>
        </div>
    );
};

export default Answer;
