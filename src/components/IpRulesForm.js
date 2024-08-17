import React, { useState, useEffect } from "react";
import { fetchIp } from "../api/Api";
import "../css/IpRules.css";

const IpRulesForm = ({ onSave, onCancel }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    fetchIp()
      .then((response) => {
        setIpAddress(response.data);
      })
      .catch((error) => {
        console.error("Error fetching IP address : ", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      ipAddress,
      description,
      startTime,
      endTime,
    });
    onSave({
      ipAddress,
      description,
      startTime,
      endTime,
    });
  };

  return (
    <div className="ip-rules-form">
      <h3>IP 추가</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>IP 주소</label>
          <input
            type="text"
            placeholder="000.000.000.000"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button className="get-ip-btn">현재 IP 불러오기</button>
        </div>
        <div className="form-group">
          <label>설명</label>
          <input
            type="text"
            maxLength={20}
            placeholder="IP 주소의 설명을 작성해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>허용 시작 시간</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>허용 끝 시간</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-btn">
            저장
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default IpRulesForm;
