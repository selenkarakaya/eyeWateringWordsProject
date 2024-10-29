import axios from "axios";

const API_URL = "http://localhost:8000/api/avatar/";

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

const getAvatarS = async (avatarId) => {
  const response = await axios.get(API_URL + avatarId);
  return response.data;
};

const deleteAvatar = async (avatarId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + avatarId, config);
  // return response.data;
  if (response.data) {
    return avatarId;
  }
};
const avatarService = {
  createImage,
  getAvatar,
  deleteAvatar,
  getAvatarS,
};

export default avatarService;
