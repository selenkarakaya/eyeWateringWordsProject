import axios from "axios";

const API_URL = "http://localhost:8000/api/entries/";

// Get entry comments
const getComments = async (entryId) => {
  const response = await axios.get(API_URL + entryId + "/comments");
  return response.data;
};

// create new comment
const createComment = async (commentText, entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + entryId + "/comments",
    {
      text: commentText,
    },
    config
  );

  return response.data;
};

// update comment

const updateComment = async (commentText, commentId, entryId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(
    API_URL + entryId + "/comments/" + commentId,
    {
      text: commentText,
    },
    config
  );
  return response.data;
};

//delete comment

const deleteComment = async (commentId, entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + entryId + "/comments/" + commentId,
    config
  );
  if (response.data) {
    return commentId;
  }
};
const commentService = {
  getComments,
  createComment,
  deleteComment,
  updateComment,
};

export default commentService;
