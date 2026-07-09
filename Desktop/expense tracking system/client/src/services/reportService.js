import api from "./api";

export async function getDashboard() {
  const response = await api.get("/reports/dashboard");
  return response.data;
}

export async function getCategoryReport() {
  const response = await api.get("/reports/categories");
  return response.data;
}

export async function getMonthlyReport() {
  const response = await api.get("/reports/monthly");
  return response.data;
}