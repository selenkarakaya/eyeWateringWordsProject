import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteComment,
  updateComment,
  getComments,
} from "../features/comments/commentSlice";
import { getAvatar } from "../features/avatar/avatarSlice";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
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
function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //modal status for add comment
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { avatars } = useSelector((state) => state.avatars);

  const commentId = comment._id;
  const entryId = comment.entry;

  useEffect(() => {
    dispatch(getAvatar());
  }, [dispatch]);

  useEffect(() => {
    setCommentText(comment.text);
  }, [comment]);
  const onChange = (e) => {
    setCommentText(e.target.value);
  };
  // Update comment
  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(updateComment({ commentText, entryId, commentId }));
    navigate(`/entry/${entryId}`);
    getComments(entryId);
  };

  return (
    <div className="flex flex-col items-start w-5/6 mx-auto space-y-4 my-4 p-4  bg-lightBeige hover:opacity-75 borderCSS">
      <div className="flex items-center justify-center hover space-x-2">
        {avatars.map((avatar) => {
          return (
            comment.user === avatar.user && (
              <img
                key={avatar._id}
                src={require(`./uploads/${avatar.file}`)}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            )
          );
        })}
        <h1 className="text-darkPurple">{comment.commentUsername}</h1>
      </div>
      <div>{comment.text}</div>
      <div className="flex w-full justify-between">
        {comment.updatedAt ? (
          <h5 className="text-sm">
            {new Date(comment.updatedAt).toLocaleString("en-GB").split(",")[1]}
          </h5>
        ) : (
          <h5 className="text-sm">
            {new Date(comment.createdAt).toLocaleString("en-GB").split(",")[1]}
          </h5>
        )}
        {user._id === comment.user && (
          <>
            <button
              onClick={() => {
                dispatch(deleteComment({ entryId, commentId }));
              }}
              className="hover:scale-110"
            >
              <RiDeleteBin3Fill
                style={{ color: "darkRed", fontSize: "1.2rem" }}
              />
            </button>
            <button
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              <AiOutlineEdit style={{ color: "#2d6a4f" }} />
            </button>
          </>
        )}
      </div>
      {/* comment edit form */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        style={customStyles}
        contentLabel="Add Comment"
      >
        <div className="flex justify-between items-center my-4">
          <h2>Add Comment</h2>
          <button
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            <RiCloseLargeLine
              style={{ color: "darkRed", fontSize: "1.2rem" }}
            />
          </button>
        </div>
        <form onSubmit={onCommentSubmit}>
          <textarea
            name="noteText"
            id="noteText"
            className="w-full h-24 border border-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            placeholder="comment text..."
            value={commentText}
            onChange={onChange}
            required
          ></textarea>
          <div className="flex justify-center my-4">
            <button className="bg-darkGreen text-white px-8 py-2 rounded-md ">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CommentItem;
