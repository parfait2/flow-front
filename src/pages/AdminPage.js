import React, { useState, useEffect } from "react";
import IpRulesForm from "../components/IpRulesForm";
import IpRulesList from "../components/IpRulesList";
import { createRule, fetchAllRules, deleteRule, fetchRule, fetchRuleByPeriod } from "../api/Api";

const AdminPage = () => {
  const [rules, setRules] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllRules().then(response => {
      const fetchedRules = Array.isArray(response.data.ruleList) ? response.data.ruleList : [];
      setRules(fetchedRules); 
    }).catch(error => {
      console.error("Error fetching rules : ", error);
    });
  }, []);

  const handleSave = (newRule) => {
    createRule(newRule)
      .then((response) => {
        setRules([response.data, ...rules]);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error saving rule : ", error);
      });
  };

  const handleDelete = (id) => {
    deleteRule(id)
      .then(() => {
        setRules(rules.filter((rule) => rule.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting rule : ", error);
      });
  };

  const handleSearch = (searchParams, searchType) => {
    if (searchType === "period") {
      fetchRuleByPeriod(searchParams)
        .then(response => {
          setRules(Array.isArray(response.data.ruleList) ? response.data.ruleList : []);
        })
        .catch(error => {
          console.error("Error fetching rule by period :", error);
        });
    } else if (searchType === "content") {
      fetchRule(searchParams)
        .then(response => {
          setRules(Array.isArray(response.data.ruleList) ? response.data.ruleList : []);
        })
        .catch(error => {
          console.error("Error fetching rule by content :", error);
        });
    }
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
      <IpRulesList rules={rules} onDelete={handleDelete} onSearch={handleSearch} />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancel}>&times;</span>
            <IpRulesForm onSave={handleSave} onCancel={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
