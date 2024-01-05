import React, { useState, useEffect } from "react";
import { Checkbox, Pagination } from "@mui/material";
import "./WriteList.css";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const WriteList = ({ mockData, code }) => {
  const navigate = useNavigate();

  console.log(mockData);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const notAnswerLength = mockData.filter(
    (item) => item.isChecked === 0
  ).length;

  const CustomCheckbox = styled(Checkbox)({
    color: "#424242",
    "&.Mui-checked": {
      color: "#424242",
    },
  });

  const goDetail = () => {
    navigate(`/View/${code}`);
  };

  return (
    <div className="writeList-container">
      <h1>"답변을 기다리는 상담이 {notAnswerLength}개 있습니다."</h1>
      <div className="list">
        {currentItems.map(({ id, nickName, date, content, isChecked }) => (
          <div key={id} className="item-container" onClick={goDetail}>
            <div className="item">{id}</div>
            <div className="item-nickName">{nickName}</div>
            <div className="item">{date}</div>
            <div className="item-content">{content}</div>
            <div className="item">
              <CustomCheckbox checked={isChecked === 1} />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        count={Math.ceil(mockData.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default WriteList;
