import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Payments
const getPayments = async () => {
  const response = await axios.get("/payments");
  return response.data;
};

const createPayment = async (payment) => {
  const response = await axios.post("/payments", payment);
  return response.data;
};

const updatePayment = async (id, payment) => {
  const response = await axios.put(`/payments/${id}`, payment);
  return response.data;
};

const deletePayment = async (id) => {
  await axios.delete(`/payments/${id}`);
};
export { getPayments, createPayment, updatePayment, deletePayment };
