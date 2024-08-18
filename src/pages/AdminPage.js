import React, { useState, useEffect } from "react";
import IpRulesForm from "../components/IpRulesForm";
import IpRulesList from "../components/IpRulesList";
import {
  createRule,
  fetchAllRules,
  deleteRule,
  fetchRule,
  fetchRuleByPeriod,
} from "../api/Api";
import Pagination from "../components/Pagination";

const AdminPage = () => {
  const [rules, setRules] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (isSearching) {
          // 검색 중일 때
          if (searchParams.startTime && searchParams.endTime) {
            response = await fetchRuleByPeriod({
              ...searchParams,
              page: currentPage,
              size: pageSize,
            });
          } else {
            response = await fetchRule(searchParams, currentPage, pageSize);
          }
        } else {
          // IP 규칙 전체 조회
          response = await fetchAllRules(currentPage, pageSize);
        }
        setRules(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching rules :", error);
      }
    };
    fetchData();
  }, [currentPage, pageSize, isSearching, searchParams]);

  // 페이지 변경 시
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSave = (newRule) => {
    createRule(newRule)
      .then((response) => {
        // string 타입을 Date 객체로 변환합니다.
        const startDate = new Date(newRule.startTime);
        const endDate = new Date(newRule.endTime);



        const formattedRule = {
          // 응답에서 받아온 id 사용
          id: response.data.id,

          // 새로 입력된 규칙 데이터
          ...newRule,

          // ISO 형식으로 변환합니다.
          startTime: startDate.toISOString().replace("T", " ").substring(0, 19),
          endTime: endDate.toISOString().replace("T", " ").substring(0, 19),
        };

        setRules([formattedRule, ...rules]); // 새로운 규칙을 규칙 목록에 추가합니다.
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error saving rule :", error);
      });
  };

  const handleDelete = (id) => {
    deleteRule(id)
      .then(() => {
        // 삭제된 규칙을 규칙 목록에서 제외합니다.
        setRules(rules.filter((rule) => rule.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting rule :", error);
      });
  };

  const handleSearch = (params) => {
    setCurrentPage(0);
    setSearchParams(params);
    setIsSearching(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-page">
      <div className="header">
        <h1>IP 접근 설정</h1>
        <button className="add-ip-btn" onClick={() => setShowModal(true)}>
          + IP 추가
        </button>
      </div>
      <IpRulesList
        rules={rules}
        onDelete={handleDelete}
        onSearch={handleSearch}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancel}>
              &times;
            </span>
            <IpRulesForm onSave={handleSave} onCancel={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
