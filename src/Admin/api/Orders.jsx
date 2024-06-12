import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// orders
const getOrders = async () => {
  const response = await axios.get("/orders");
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.get(`/orders/${id}`);
  return response.data;
};

const createOrder = async (order) => {
  const response = await axios.post("/orders", order);
  return response.data;
};

const updateOrder = async (id, order) => {
  const response = await axios.put(`/orders/${id}`, order);
  return response.data;
};

const deleteOrder = async (id) => {
  await axios.delete(`/orders/${id}`);
};
export { getOrders, createOrder, updateOrder, deleteOrder ,getOrder};
