import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteEntry } from "../features/entry/entrySlice";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";

function Entry({ entry, user }) {
  const { avatars } = useSelector((state) => state.avatars);
  const dispatch = useDispatch();

  const onDelete = () => {
    const entryId = entry._id;
    dispatch(deleteEntry({ entryId }));
  };

  return (
    <div className="borderCSS">
      <div className="flex flex-col items-start space-y-4 p-4 hover">
        <p className="text-darkestGreen">{entry.description}</p>
        <h1 className="text-darkenGreen">#{entry.tag}</h1>
        <div className="flex self-end items-center space-x-1">
          <div>
            <h5 className="italic text-end text-darkGreen">{entry.username}</h5>
            <h5 className="text-sm">
              {new Date(entry.createdAt).toLocaleString("en-UK")}
            </h5>
          </div>
          {avatars.map((avatar) => {
            return (
              entry.user === avatar.user && (
                <div className="sign-left shape-outer">
                  <img
                    key={avatar._id}
                    src={require(`./uploads/${avatar.file}`)}
                    alt=""
                    className="w-12 h-12 shape-inner sign-left"
                  />
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="flex justify-between mx-4 mb-2">
        {user ? (
          <Link to={`/entry/${entry._id}`}>
            <GoCommentDiscussion style={{ fontSize: "1.6rem" }} />
          </Link>
        ) : (
          <Link to={"/Login"}>
            <GoCommentDiscussion style={{ fontSize: "1.6rem" }} />
          </Link>
        )}
        {user._id === entry.user && (
          <div>
            <button onClick={onDelete} className="hover:scale-110 mr-6">
              <RiDeleteBin3Fill
                style={{ color: "darkRed", fontSize: "1.2rem" }}
              />
            </button>
            <button>
              <Link to={`/EditEntry/${entry._id}`}>
                <AiOutlineEdit />
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Entry;
