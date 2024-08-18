import React, { useState } from "react";
import "../css/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const [currentGroup, setCurrentGroup] = useState(0); // 현재 페이지의 그룹 상태를 관리합니다.
  const groupSize = 10; // 한 번에 표시할 페이지 수

  const startPage = currentGroup * groupSize; // 현재 그룹의 시작 페이지를 계산합니다.
  const endPage = Math.min(startPage + groupSize, totalPages); // 현재 그룹의 끝 페이지를 계산합니다.

  const pageNumbers = [];
  
  // 페이지 번호 목록을 생성합니다.
  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  // 다음 페이지 그룹으로 이동합니다.
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentGroup(currentGroup + 1);
      onPageChange(startPage + groupSize);
    }
  };

  // 이전 페이지 그룹으로 이동합니다.
  const handlePreviousGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
      onPageChange(startPage - groupSize);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousGroup} disabled={currentGroup === 0}>
        {"<<"}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
      <button onClick={handleNextGroup} disabled={endPage >= totalPages}>
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
