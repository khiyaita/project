import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// ordersItems
const getOrdersItems = async () => {
  const response = await axios.get("/order_items");
  return response.data;
};

const createOrderItems = async (order_items) => {
  const response = await axios.post("/order_items", order_items);
  return response.data;
};

const updateOrderItems = async (id, order_items) => {
  const response = await axios.put(`/order_items/${id}`, order_items);
  return response.data;
};

const deleteOrderItems = async (id) => {
  await axios.delete(`/order_items/${id}`);
};
export { getOrdersItems, createOrderItems, updateOrderItems, deleteOrderItems };
