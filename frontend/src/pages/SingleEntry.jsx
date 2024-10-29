import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEntry } from "../features/entry/entrySlice";
import { getComments, createComment } from "../features/comments/commentSlice";
import { getAvatar } from "../features/avatar/avatarSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import CommentItem from "../components/CommentItem";
import { GoPlus } from "react-icons/go";
import { RiCloseLargeLine } from "react-icons/ri";

import Modal from "react-modal";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

function SingleEntry() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { entry, isLoading, isError, message } = useSelector(
    (state) => state.entries
  );
  const { comments, isLoading: commentsIsLoading } = useSelector(
    (state) => state.comments
  );
  const { avatars } = useSelector((state) => state.avatars);

  const dispatch = useDispatch();
  const { entryId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getEntry(entryId));
    dispatch(getComments(entryId));
    dispatch(getAvatar());
  }, [isError, message, entryId, dispatch]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Create note submit
  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ commentText, entryId }));
    closeModal();
    setCommentText("");
  };

  if (isLoading || commentsIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Somethong went wrong</h3>;
  }
  return (
    <>
      <BackButton />
      <div className="flex flex-col items-start space-y-4 my-4 p-4 w-1/2 mx-auto bg-lightBeige borderCSS hover">
        <p>{entry.description}</p>
        <h1 className="text-darkPurple">#{entry.tag}</h1>
        <div className="flex self-end items-center space-x-1">
          <div>
            <h5 className="italic text-end text-darkPurple">
              {entry.username}
            </h5>
            <h5 className="text-sm">
              {new Date(entry.createdAt).toLocaleString("en-UK")}
            </h5>
          </div>

          {avatars.map((avatar) => {
            return (
              entry.user === avatar.user && (
                <img
                  key={avatar._id}
                  src={require(`../components/uploads/${avatar.file}`)}
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
              )
            );
          })}
        </div>
      </div>
      <div className="w-1/2 mx-auto ">
        <button
          onClick={openModal}
          className="flex items-center space-x-1 p-2 border-2 border-darkenGreen rounded-full"
        >
          <GoPlus /> <p>Add a comment</p>
        </button>
      </div>
      <div className="w-1/2 mx-auto">
        <h1 className="text-center">All comments</h1>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} user={entry.user} />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Comment"
      >
        <div className="flex justify-between items-center my-4">
          <h2>Add Comment</h2>
          <button onClick={closeModal} className="hover:scale-105">
            <RiCloseLargeLine
              style={{ color: "darkRed", fontSize: "1.2rem" }}
            />
          </button>
        </div>
        <form onSubmit={onCommentSubmit}>
          <textarea
            name="noteText"
            id="noteText"
            className="w-full pt-2 pl-2 h-24 border border-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            placeholder="Comment text..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-center my-4">
            <button className="bg-darkGreen text-white px-8 py-2 rounded-md  hover:bg-darkenGreen">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SingleEntry;
