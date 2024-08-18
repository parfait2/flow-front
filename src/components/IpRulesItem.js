import React from "react";
import { convertArrayToUTCDate } from "../utils/time";
import "../css/IpRules.css";

const IpRulesItem = ({ rule, onDelete }) => {
  return (
    <li className="ip-rules-item">
      <p>{rule.ipAddress}</p>
      <p>{rule.description}</p>
      <p>{convertArrayToUTCDate(rule.startTime)}</p>
      <p>{convertArrayToUTCDate(rule.endTime)}</p>
      <button className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default IpRulesItem;
