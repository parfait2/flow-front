import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_HOST}`,
});

export const fetchIp = () => client.get("/api/rules/ip");

export const createRule = (data) => client.post("/api/rules", data);

export const fetchAllRules = (page = 0, size = 10) => {
  return client.get(`/api/rules?page=${page}&size=${size}`);
};

export const fetchRule = (content, page = 0, size = 10) => {
  const params = new URLSearchParams({ content, page, size }).toString();
  return client.get(`/api/rules/search?${params}`);
};

export const deleteRule = (uuid) => client.delete(`/api/rules/${uuid}`);

export const fetchRuleByPeriod = (params) => {
  const query = new URLSearchParams({
    page: params.page,
    size: params.size,
  }).toString();
  return client.post(`/api/rules/period?${query}`, params);
};
