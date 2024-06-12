import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Auth
const login = async (email, password) => {
  const response = await axios.post("/login", { email, password });
  localStorage.setItem("token", response.data.access_token);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.access_token}`;
  return response.data;
};

const register = async (name, email, password) => {
  const response = await axios.post("/register", { name, email, password });
  localStorage.setItem("token", response.data.access_token);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.access_token}`;
  return response.data;
};

const logout = async () => {
  await axios.post("/logout");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};
export { login, register, logout };
