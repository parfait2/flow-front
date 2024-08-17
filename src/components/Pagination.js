import React, { useState } from "react";
import "../css/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const groupSize = 10;

  const startPage = currentGroup * groupSize;
  const endPage = Math.min(startPage + groupSize, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentGroup(currentGroup + 1);
      onPageChange(startPage + groupSize);
    }
  };

  const handlePreviousGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
      onPageChange(startPage - groupSize);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePreviousGroup}
        disabled={currentGroup === 0}
      >
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
      <button
        onClick={handleNextGroup}
        disabled={endPage >= totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
