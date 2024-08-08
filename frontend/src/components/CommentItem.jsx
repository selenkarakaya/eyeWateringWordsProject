import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../features/comments/commentSlice";
import { RiDeleteBin3Fill } from "react-icons/ri";
import Logo from "../components/image/gel.png";

function CommentItem({ comment }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onDelete = () => {
    const commentId = comment._id;
    const entryId = comment.entry;
    dispatch(deleteComment({ entryId, commentId }));
  };
  return (
    <div className="flex flex-col items-start w-5/6 mx-auto space-y-4 my-4 p-4  bg-lightBeige hover:opacity-75">
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
        <h1>{user.username}</h1>
      </div>
      <div>{comment.text}</div>
      <div className="flex w-full justify-between">
        <h5 className="">
          {new Date(comment.createdAt).toLocaleString("en-GB").split(",")[1]}
        </h5>
        {user._id === comment.user ? (
          <button onClick={onDelete} className="hover:scale-110">
            <RiDeleteBin3Fill
              style={{ color: "darkRed", fontSize: "1.2rem" }}
            />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CommentItem;
