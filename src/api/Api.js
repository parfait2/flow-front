import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_HOST}`,
});

export const fetchIp = () => client.get("/api/rules/ip");

export const createRule = (data) => client.post("/api/rules", data);

export const fetchAllRules = () => client.get("/api/rules");

export const fetchRule = (content) => client.get(`/api/rules/search?content=${content}`);

export const deleteRule = (uuid) => client.delete(`/api/rules/${uuid}`);

export const fetchRuleByPeriod = (data) => client.post("/api/rules", data);
