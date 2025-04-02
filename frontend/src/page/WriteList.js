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
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);
    const [dataList, setDataList] = useState([]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // const notAnswerLength = mockData.filter((item) => item.isChecked === 0).length;

    const CustomCheckbox = styled(Checkbox)({
        color: '#424242',
        '&.Mui-checked': {
            color: '#424242',
        },
    });

    // const goDetail = (code) => {
    //     navigate(`/view/${code}`);
    // };

    useEffect(() => {
        const apiUrl = 'http://127.0.0.1:5000/writeList';

        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setDataList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className='writeList-container'>
            {/* <h1>"답변을 기다리는 상담이 {notAnswerLength}개 있습니다."</h1> */}
            <div className='list'>
                {dataList.map((item) => (
                    // <div key={item.id} className='item-container' onClick={() => goDetail(code)}>
                    <div key={item.id} className='item-container'>
                        <div className='item'>{item.id}</div>
                        <div className='item-nickName'>{item.nickName}</div>
                        <div className='item'>{item.date}</div>
                        <div className='item-content'>{item.content}</div>
                        <div className='item'>
                            <CustomCheckbox checked={item.isChecked === 1} />
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                // count={Math.ceil(mockData.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
            />
        </div>
    );
};

export default WriteList;
