import React from "react";
import "../css/IpRules.css";

const IpRulesItem = ({ rule, onDelete }) => {
  return (
    <li className="ip-rules-item">
      <p>{rule.ipAddress}</p>
      <p>{rule.description}</p>
      <p>{rule.startTime}</p>
      <p>{rule.endTime}</p>
      <button className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default IpRulesItem;
