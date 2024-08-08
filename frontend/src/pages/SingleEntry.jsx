import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEntry } from "../features/entry/entrySlice";
import { getComments, createComment } from "../features/comments/commentSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/image/gel.png";
import CommentItem from "../components/CommentItem";
import Modal from "react-modal";
import { GoPlus } from "react-icons/go";
import { RiCloseLargeLine } from "react-icons/ri";

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
  const { entry, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.entries
  );

  const { comments, isLoading: commentsIsLoading } = useSelector(
    (state) => state.comments
  );

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { entryId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getEntry(entryId));
    dispatch(getComments(entryId));
  }, [isError, message, entryId]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Create note submit
  const onCommentSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault();
    dispatch(createComment({ commentText, entryId }));
    closeModal();
    setCommentText("");
  };
  if (isLoading || commentsIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>went wrong</h3>;
  }

  return (
    <>
      <div className="flex flex-col items-start space-y-4 my-4 p-4 w-1/2 mx-auto bg-lightBeige">
        <h1 className="text-end">{entry.tag}</h1>
        <p>{entry.description}</p>
        <div className="flex self-end items-center space-x-1">
          <div>
            <h5 className="italic text-end">{entry.username}</h5>
            <h5 className="">
              {new Date(entry.createdAt).toLocaleString("en-UK")}
            </h5>
          </div>
          <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
        </div>
      </div>
      <div className="w-1/2 mx-auto ">
        <button
          onClick={openModal}
          className="flex items-center  space-x-1 p-2 border-2 border-slate-600 rounded-full"
        >
          <GoPlus /> <p>Add a comment</p>
        </button>
      </div>
      <div className="w-1/2 mx-auto">
        <h1 className="text-center">All comments </h1>
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
          <button onClick={closeModal}>
            <RiCloseLargeLine
              style={{ color: "darkRed", fontSize: "1.2rem" }}
            />
          </button>
        </div>
        <form onSubmit={onCommentSubmit}>
          <textarea
            name="noteText"
            id="noteText"
            className="w-full h-24 border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            placeholder="comment text..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div className="flex justify-center my-4">
            <button className="bg-darkPink text-white px-8 py-2 rounded-md  hover:opacity-90">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SingleEntry;
