import React, { useState, useEffect } from 'react';
import { Checkbox, Pagination } from '@mui/material';
import './WriteList.css';
import { styled, StyledEngineProvider } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WriteList = () => {
    const navigate = useNavigate();

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [notAnswerLength, setNotAnswerLength] = useState(0);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [dataList, setDataList] = useState([]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const CustomCheckbox = styled(Checkbox)({
        color: '#424242',
        '&.Mui-checked': {
            color: '#424242',
        },
    });

    const goDetail = (code) => {
        navigate(`/view/${code}`);
    };

    useEffect(() => {
        const apiUrl = 'http://127.0.0.1:5000/writeList';
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/');
            return;
        }

        axios
            .get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setDataList(response.data);
                const notCheckedCount = response.data.filter((item) => !item.isChecked).length;
                setNotAnswerLength(notCheckedCount);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/');
                }
            });
    }, []);

    const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='writeList-container'>
            <h1>"답변을 기다리는 상담이 {notAnswerLength}개 있습니다."</h1>
            <div className='list'>
                {currentItems.map((item) => (
                    <div key={item.id} className='item-container' onClick={() => goDetail(item.code)}>
                        <div className='item'>{item.id}</div>
                        <div className='item-nickName'>{item.nickName}</div>
                        <div className='item'>{item.date}</div>
                        <div className='item-content'>{item.content}</div>
                        <div className='item'>
                            <CustomCheckbox checked={item.isChecked == 1} />
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                count={Math.ceil(dataList.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
            />
        </div>
    );
};

export default WriteList;
