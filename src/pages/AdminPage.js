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
          response = await fetchAllRules(currentPage, pageSize);
        }
        setRules(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching rules:", error);
      }
    };
    fetchData();
  }, [currentPage, pageSize, isSearching, searchParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSave = (newRule) => {
    createRule(newRule)
      .then((response) => {
        setRules([response.data, ...rules]);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error saving rule:", error);
      });
  };

  const handleDelete = (id) => {
    deleteRule(id)
      .then(() => {
        setRules(rules.filter((rule) => rule.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting rule:", error);
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
