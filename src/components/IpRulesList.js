import React, { useState } from "react";
import IpRulesItem from "./IpRulesItem";
import "../css/IpRules.css";

const IpRulesList = ({ rules, onDelete, onSearch }) => {
  const [searchContent, setSearchContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSearchClick = () => {
    if (startTime && endTime) {
      onSearch({ startTime, endTime }, "period"); // 기간 검색
    } else {
      onSearch(searchContent, "content"); // 내용 검색
    }
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
        </div>
        <div className="ip-rules-list">
          <li className="ip-rules-item">
            <p>IP 주소</p>
            <p>내용</p>
            <p>사용 시작 시간</p>
            <p>사용 끝 시간</p>
          </li>
        </div>
        <ul className="ip-rules-list">
          {rules.map((rule) => (
            <IpRulesItem
              key={rule.id}
              rule={rule}
              onDelete={() => onDelete(rule.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IpRulesList;
