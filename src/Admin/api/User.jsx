import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// users
const getUsers = async () => {
  const response = await axios.get("/users");
  return response.data;
};
const getUser = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

const createUser = async (user) => {
  const response = await axios.post("/users", user);
  return response.data;
};

const updateUser = async (id, user) => {
  const response = await axios.put(`/users/${id}`, user);
  return response.data;
};

const deleteUser = async (id) => {
  await axios.delete(`/users/${id}`);
};
export { getUsers,getUser, createUser, updateUser, deleteUser };
