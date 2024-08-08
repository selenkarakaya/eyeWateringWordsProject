import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// update user
const update = async (userData) => {
  const response = await axios.put(API_URL, userData);
  if (response.data) {
    localStorage.setItem("userUpdate", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
  update,
};

export default authService;
