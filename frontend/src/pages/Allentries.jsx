import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEntries, reset } from "../features/entry/allentrySlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import Logo from "../components/image/gel.png";
import { Link } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import Entry from "../components/Entry";

function Entries() {
  const { entriesAll, isLoading, isSuccess } = useSelector(
    (state) => state.allentry
  );

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <h1 className="my-6 py-2 w-1/2 mx-auto text-2xl text-center text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500">
        Eye Watering Entries
      </h1>
      <BackButton />
      <div className="grid grid-cols-3 gap-4 mx-4">
        {entriesAll.map((entry) => (
          <Entry key={entry._id} entry={entry} user={user} />
        ))}
      </div>
    </>
  );
}

export default Entries;

// <div className="bg-lightBeige  p-4 flex flex-col items-start space-y-4">
// <h1 className="text-end">{entry.tag}</h1>
// <p>{entry.description}</p>
// <div className="flex self-end items-center space-x-1">
//   <div>
//     <h5 className="italic text-end">{entry.username}</h5>
//     {new Date(entry.createdAt).toLocaleString("en-UK")}
//   </div>
//   <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
// </div>
// {user ? (
//   <Link to={`/entry/${entry._id}`}>
//     <GoCommentDiscussion style={{ fontSize: "1.6rem" }} />
//   </Link>
// ) : (
//   <Link to={"/login"}>
//     <GoCommentDiscussion />
//   </Link>
// )}
// </div>
