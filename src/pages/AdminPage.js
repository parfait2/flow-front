import React from "react";
import IpRulesForm from "../components/IpRulesForm";
import IpRulesList from "../components/IpRulesList";

const AdminPage = () => {
  return (
    <div>
      <h1>IP 접근 설정</h1>
      <IpRulesList />
      <IpRulesForm />
    </div>
  );
};

export default AdminPage;
