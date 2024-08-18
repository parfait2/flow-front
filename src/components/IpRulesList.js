import React, { useState } from "react";
import IpRulesItem from "./IpRulesItem";
import "../css/IpRules.css";

const IpRulesList = ({ rules, onDelete, onSearch, noResults }) => {
  const [searchContent, setSearchContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchClick = () => {
    try {
      const content = searchContent.trim();

      if (!content && (!startTime || !endTime)) {
        throw new Error("검색할 내용을 입력해주세요.");
      }

      if (startTime && endTime && new Date(startTime) > new Date(endTime)) {
        throw new Error("시작일과 종료일을 다시 확인해주세요.");
      }

      setErrorMessage("");

      if (startTime && endTime) {
        onSearch({ startTime, endTime }, "period"); // 기간 검색
      } else {
        onSearch(searchContent, "content"); // 내용 검색
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // 초기화 버튼 클릭 시
  const handleResetClick = () => {
    setSearchContent("");
    setStartTime("");
    setEndTime("");
    setErrorMessage("");
    onSearch({}, "reset"); // 초기화 시 전체 조회를 다시 수행
  };

  return (
    <div className="ip-rules-list-container">
      <div className="ip-rules-list">
        <div className="search-group">
          <input
            type="text"
            placeholder="내용 검색"
            className="search-input"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          />
          <input
            type="datetime-local"
            className="search-start"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="datetime-local"
            className="search-end"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearchClick}>
            검색
          </button>
          <button className="reset-btn" onClick={handleResetClick}>
            초기화
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {noResults ? (
          <p className="no-results-message">검색 결과가 없습니다.</p>
        ) : (
          <ul className="ip-rules-list">
            {rules.map((rule) => (
              <IpRulesItem
                key={rule.id} // 고유한 key 값으로 id를 사용합니다.
                rule={rule} // 각 규칙의 데이터를 전달합니다.
                onDelete={() => onDelete(rule.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IpRulesList;
