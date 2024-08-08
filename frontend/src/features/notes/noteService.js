import axios from "axios";

const API_URL = "http://localhost:8000/api/tickets/";

// Get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + ticketId + "/notes",
    {
      text: noteText,
    },
    config
  );

  return response.data;
};

const updateNote = async (image, noteId, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + ticketId + "/notes/" + noteId,
    {
      photo: image,
    },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
  updateNote,
};

export default noteService;
