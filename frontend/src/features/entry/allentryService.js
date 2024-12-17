import axios from "axios";

const API_URL = "/api/allentries/";

// Get  all  entry
const getAllEntries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// Get  all  entry
const searchEntry = async (text) => {
  const response = await axios.get(API_URL + "search/" + text);
  return response.data;
};
const allentryService = {
  getAllEntries,
  searchEntry,
};

export default allentryService;
