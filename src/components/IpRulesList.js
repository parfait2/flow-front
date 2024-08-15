import React from "react";
import "../css/IpRules.css";
import IpRulesItem from "./IpRulesItem";

const IpRulesList = () => {
  return (
    <div>
      <div>
        <input type="text" placeholder="내용 검색" />
        <input type="datetime-local" />
        <input type="datetime-local" />
        <button className="search-btn">검색</button>
      </div>
      <div>
        <li>
          <p>IP 주소</p>
          <p>내용</p>
          <p>사용 시작 시간</p>
          <p>사용 끝 시간</p>
        </li>
        <IpRulesItem />
      </div>
    </div>
  );
};

export default IpRulesList;
