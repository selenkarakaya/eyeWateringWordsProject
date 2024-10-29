import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEntries, reset } from "../features/entry/allentrySlice";
import { getAvatar } from "../features/avatar/avatarSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { PiHandPointingLight } from "react-icons/pi";

function Allentries() {
  const dispatch = useDispatch();

  const { entriesAll, isLoading, isSuccess } = useSelector(
    (state) => state.allentry
  );
  const { user } = useSelector((state) => state.auth);
  const { avatars } = useSelector((state) => state.avatars);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllEntries());
    dispatch(getAvatar());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="header my-6 flex items-center">
        <h1 className="my-6 py-2 w-1/2 mx-auto text-2xl text-center text-white">
          Eye Watering Entries
        </h1>
      </div>
      <div className="card-list grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
        {entriesAll.map((entry) => (
          <div className="borderCSS" key={entry._id}>
            <div className="flex flex-col items-start space-y-4 p-4 hover">
              <p className="text-darkestGreen">{entry.description}</p>
              <h1 className="text-darkenGreen">#{entry.tag}</h1>
              <div className="flex self-end items-center space-x-1">
                <div>
                  <h4 className="italic text-end text-darkGreen">
                    {entry.username}
                  </h4>
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
                          src={require(`../components/uploads/${avatar.file}`)}
                          alt=""
                          className="w-12 h-12 shape-inner sign-left"
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between mx-2 mb-2">
              {user ? (
                <Link to={`/entry/${entry._id}`}>
                  <GoCommentDiscussion style={{ fontSize: "1.6rem" }} />
                </Link>
              ) : (
                <Link to={"/login"}>
                  <GoCommentDiscussion />
                </Link>
              )}
              {user && user._id === entry.user && (
                <Link
                  to={"/Profile"}
                  className="hover:scale-125 hover:animate-spin"
                >
                  <PiHandPointingLight style={{ fontSize: "1.6rem" }} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Allentries;
