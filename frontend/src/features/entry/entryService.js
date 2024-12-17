import axios from "axios";

const API_URL = "/api/entries/";

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
const getEntry = async (entryId) => {
  const response = await axios.get(API_URL + entryId);
  return response.data;
};

// delete entry
const deleteEntry = async (entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + entryId, config);
  if (response.data) {
    return entryId;
  }
};

// update entry

const updateEntry = async (updateData, entryId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + entryId, updateData, config);
  return response.data;
};
const entryService = {
  createEntry,
  getEntries,
  getEntry,
  deleteEntry,
  updateEntry,
};

export default entryService;
