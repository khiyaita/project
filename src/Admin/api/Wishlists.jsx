import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// Wishlists
const getWishlists = async () => {
  const response = await axios.get("/wishlists");
  return response.data;
};

const addToWishlist = async (item) => {
  const response = await axios.post("/wishlists", item);
  return response.data;
};

const removeFromWishlist = async (id) => {
  await axios.delete(`/wishlists/${id}`);
};
export { getWishlists, addToWishlist, removeFromWishlist };
