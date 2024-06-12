import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// Carts
const getCarts = async () => {
  const response = await axios.get("/carts");
  return response.data;
};

const addToCarts = async (item) => {
  const response = await axios.post("/carts", item);
  return response.data;
};

const updateCarts = async (id, item) => {
  const response = await axios.put(`/carts/${id}`, item);
  return response.data;
};
const clearCarts = async (user_id) => {
  const response = await axios.delete(`/carts/clear/${user_id}`);
  return response.data;
};

const removeFromCarts = async (id) => {
  await axios.delete(`/carts/${id}`);
};
export { getCarts, addToCarts, updateCarts, removeFromCarts, clearCarts };
