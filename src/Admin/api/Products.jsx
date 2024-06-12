import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// Products
const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};
const getProduct = async (id) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post("/products", product);
  return response.data;
};

const updateProduct = async (id, product) => {
  const response = await axios.put(`/products/${id}`, product);
  return response.data;
};

const deleteProduct = async (id) => {
  await axios.delete(`/products/${id}`);
};
export { getProducts,getProduct, createProduct, updateProduct, deleteProduct };
