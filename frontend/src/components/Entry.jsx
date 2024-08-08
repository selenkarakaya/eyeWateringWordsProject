import Logo from "./image/profile.png";
import { GoCommentDiscussion } from "react-icons/go";
import { Link } from "react-router-dom";

function Entry({ entry, user }) {
  return (
    <div className="bg-lightBeige  p-4 flex flex-col items-start space-y-4">
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
      {user ? (
        <Link to={`/entry/${entry._id}`}>
          <GoCommentDiscussion style={{ fontSize: "1.6rem" }} />
        </Link>
      ) : (
        <Link to={"/login"}>
          <GoCommentDiscussion style={{ fontSize: "1.6rem" }} />
        </Link>
      )}
    </div>
  );
}

export default Entry;
