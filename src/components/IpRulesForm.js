import React, { useState } from "react";
import { fetchIp } from "../api/Api";
import "../css/IpRules.css";

const IpRulesForm = ({ onSave, onCancel }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  // IP 주소가 유효한 IPv4 형식인지 확인
  const validateIpAddress = (ip) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };

  // 현재 IP 불러오기
  const handleFetchIp = () => {
    fetchIp()
      .then((response) => {
        setIpAddress(response.data.ipAddress);
      })
      .catch((error) => {
        setErrorMessage("IP 주소를 불러오는 중 오류가 발생했습니다.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

    try {
      // 필수 입력 값과 유효한 값을 확인합니다.
      if (!ipAddress || ipAddress.trim() === "") {
        throw new Error("IP 주소를 입력해주세요.");
      }

      if (!validateIpAddress(ipAddress)) {
        throw new Error("유효한 IP 주소를 입력해주세요.");
      }

      if (!description || description.trim() === "") {
        throw new Error("설명을 입력해주세요.");
      }

      if (!startTime || !endTime) {
        throw new Error("허용 시작 시간과 허용 종료 시간을 모두 입력해주세요.");
      }

      if (new Date(startTime) > new Date(endTime)) {
        throw new Error("시작 시간과 종료 시간을 다시 확인해주세요.");
      }

      setErrorMessage("");

      onSave({
        ipAddress,
        description,
        startTime,
        endTime,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="ip-rules-form">
      <h3>IP 추가</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>IP 주소</label>
          <div className="ip-input-group">
            <input
              type="text"
              placeholder="000.000.000.000"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button
              type="button"
              className="get-ip-btn"
              onClick={handleFetchIp}
            >
              현재 IP 불러오기
            </button>
          </div>
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
          <label>허용 종료 시간</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
