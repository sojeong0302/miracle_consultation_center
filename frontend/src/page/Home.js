import './Home.css';
import Button from '../component/Button.js';
import React, { useState, useEffect } from 'react';
import login from '../img/login.png';
import InputModal from '../component/InputModal.js';
import NoticeModal from '../component/NoticeModal.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
    const [isNoAnswerModalOpen, setIsNoAnswerModalOpen] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [foundItem, setFoundItem] = useState(null);

    const navigate = useNavigate();

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const openAnswerModal = () => {
        setIsAnswerModalOpen(true);
    };

    const closeAnswerModal = () => {
        setIsAnswerModalOpen(false);
    };

    const openNoAnswerModal = () => {
        setIsAnswerModalOpen(false);
        setIsNoAnswerModalOpen(true);
    };

    const closeNoAnswerModal = () => {
        setIsNoAnswerModalOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('https://miracle-consultation-center.onrender.com/ping');
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const adminLogin = async () => {
        try {
            const response = await axios.post(
                'https://miracle-consultation-center.onrender.com/login',
                {
                    adminName: adminName,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log(response.data);
            navigate('/writeList');
        } catch (error) {
            console.log(error);
        }
    };

    const handleAdminNameChange = (e) => {
        setAdminName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const inputElement = (
        <div className='home-inputElement'>
            <div>
                <label> ID </label>
                <input className='home-inputId' value={adminName} onChange={handleAdminNameChange} />
            </div>
            <div>
                <label> PW </label>
                <input className='home-inputPw' value={password} onChange={handlePasswordChange} />
            </div>
        </div>
    );

    const buttonElement = (
        <div className='home-buttonElement'>
            <button onClick={closeLoginModal}>취소</button>
            <button onClick={adminLogin}>입장</button>
        </div>
    );

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const AnswerModalElement = (
        <div>
            <label>Code </label>
            <input className='home-inputNumber' id='codeInput' value={code} onChange={handleCodeChange} />
        </div>
    );

    const AnswerModalButton = (
        <div className='home-AnswerButtonElement'>
            <button onClick={closeAnswerModal}>취소</button>
            <button onClick={() => handleAnswerButtonClick()}>답변보기</button>
        </div>
    );

    const handleAnswerButtonClick = async () => {
        if (!code) {
            alert('코드를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.get(`http://127.0.0.1:5000/writeList`);
            const item = response.data.find((item) => item.code === code);
            setFoundItem(item);

            console.log(response.data);
            if (item) {
                if (item.answer != null) {
                    navigate(`/answer/${code}`);
                } else {
                    openNoAnswerModal();
                }
            } else {
                alert('코드를 다시 확인해주세요!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const noticeElement = (
        <div className='home-noticeModal'>
            <div className='home-notice'>
                <h2>
                    [{foundItem?.nickName}]님의 사연에 대한 답장을 작성중입니다.
                    <br />
                    조금만 기다려 주세요.
                    <br />
                    감사합니다.
                </h2>
            </div>
            <div>
                <h3 className='home-from'>from. 기적의 상담소</h3>
                <div className='home-noticButton'>
                    <Button text={'확인'} onClick={closeNoAnswerModal} />
                </div>
            </div>
        </div>
    );

    return (
        <div className='home-container'>
            <div className='upElement'>
                <h1>"고민이 있으신가요?"</h1>
                <div className='home-button'>
                    <Button text={'상담하기'} route='/write' />
                    <Button text={'답변보기'} onClick={openAnswerModal} />
                </div>
            </div>
            <img className='home-img' alt='로그인 버튼' src={login} onClick={openLoginModal} />
            {isLoginModalOpen && (
                <InputModal
                    onClose={closeLoginModal}
                    inputElement={inputElement}
                    text={'관리자님 어서오세요!'}
                    buttonElement={buttonElement}
                />
            )}
            {isAnswerModalOpen && (
                <InputModal
                    onClose={closeLoginModal}
                    inputElement={AnswerModalElement}
                    text={'답변을 찾으러 오셨나요?'}
                    buttonElement={AnswerModalButton}
                />
            )}
            {isNoAnswerModalOpen && <NoticeModal text={'죄송합니다'} noticeElement={noticeElement} />}
        </div>
    );
};

export default Home;
