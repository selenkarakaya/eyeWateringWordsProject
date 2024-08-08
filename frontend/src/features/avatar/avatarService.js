import axios from "axios";

const API_URL = "http://localhost:8000/api/avatar";

// Cretae new entry
const createImage = async (newImage, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application.json",
    },
  };
  const response = await axios.post(API_URL, newImage, config);
  return response.data;
};

// Get  all  avatar
const getAvatar = async () => {
  const response = await axios.get(API_URL, {
    headers: { "Content-Type": "aplication/json" },
  });
  return response.data;
};

const avatarService = {
  createImage,
  getAvatar,
};

export default avatarService;
