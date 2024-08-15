import React from 'react';
import '../css/IpRules.css'

const IpRulesForm = () => {
  return (
    <div>
    <h3>IP 추가</h3>
      <div>
        <label>IP 주소</label>
        <input type="text" placeholder="000.000.000.000" />
        <button>현재 IP 불러오기</button>
      </div>
      <div>
        <label>설명</label>
        <input type="text" maxLength={20} placeholder="IP 주소의 설명을 작성해주세요" />
      </div>
      <div>
        <label>허용 시작 시간</label>
        <input type="datetime-local" />
      </div>
      <div>
        <label>허용 끝 시간</label>
        <input type="datetime-local" />
      </div>
      <div>
        <button type="submit">저장</button>
        <button type="button">취소</button>
      </div>
    </div>
  );
};

export default IpRulesForm;
