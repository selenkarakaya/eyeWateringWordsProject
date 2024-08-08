import axios from "axios";

const API_URL = "http://localhost:8000/api/allentries/";

// Get  all  entry
const getAllEntries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const allentryService = {
  getAllEntries,
};

export default allentryService;
