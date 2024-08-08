import axios from "axios";

const API_URL = "http://localhost:8000/api/entries/";

// Cretae new entry
const createEntry = async (entryData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, entryData, config);
  return response.data;
};

// Get user's all  entry
const getEntries = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get user's single  entry
// const getEntry = async (entryId, token)
const getEntry = async (entryId) => {
  const response = await axios.get(API_URL + entryId);
  return response.data;
};

const entryService = {
  createEntry,
  getEntries,
  getEntry,
};

export default entryService;
