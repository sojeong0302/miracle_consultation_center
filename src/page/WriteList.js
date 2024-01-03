import React, { useState } from "react";
import { Checkbox, Pagination } from "@mui/material";
import "./WriteList.css";

const WriteList = ({ mockData }) => {
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

  return (
    <div className="writeList-container">
      <h1>"답변을 기다리는 상담이 {notAnswerLength}개 있습니다."</h1>
      <div className="list">
        {currentItems.map(({ id, nickName, date, content, isChecked }) => (
          <div key={id}>
            {id} {nickName} {date} {content}
            <Checkbox checked={isChecked === 1} />
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
