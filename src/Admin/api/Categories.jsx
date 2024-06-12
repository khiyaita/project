import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Categories
const getCategories = async () => {
  const response = await axios.get("/categories");
  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post("/categories", category);
  return response.data;
};

const updateCategory = async (id, category) => {
  const response = await axios.put(`/categories/${id}`, category);
  return response.data;
};

const deleteCategory = async (id) => {
  await axios.delete(`/categories/${id}`);
};
export { getCategories, createCategory, updateCategory, deleteCategory };
