import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Entries from "./Entries";
import { useSelector } from "react-redux";
import { IoCreateOutline } from "react-icons/io5";
import { getAvatar, reset } from "../features/avatar/avatarSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import logo from "../components/uploads/logo.png";
function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { avatars, isSuccess } = useSelector((state) => state.avatars);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAvatar());
  }, [dispatch]);

  console.log(avatars);
  return (
    <div className="mb-5">
      <header className="flex items-center space-x-8 mt-4">
        <BackButton />
        <Link
          to="/NewEntry"
          className="flex items-center space-x-1 bg-mediumBlue hover:bg-darkBlue text-center my-4 ml-2 text-white px-8 py-2 rounded-md  hover:opacity-90"
        >
          <IoCreateOutline />
          <p>Add entry</p>
        </Link>
        <Link
          to="/AvatarForm"
          className="flex items-center space-x-1 bg-mediumBlue hover:bg-darkBlue text-center my-4 ml-2 text-white px-8 py-2 rounded-md  hover:opacity-90"
        >
          <IoCreateOutline />
          <p>Add avatar</p>
        </Link>
      </header>
      <div className="">
        <h1 className="text-2xl text-center mb-6">My details</h1>
        <form className="flex my-4  p-6 bg-indigo-200 md:w-3/4 mx-auto">
          <h1>selen</h1>

          {avatars
            ? avatars.map((avatar) => {
                return (
                  <div>
                    <img
                      src={require(`../components/uploads/${avatar.file}`)}
                      alt=""
                    />
                    <h1>{avatar.user}</h1>
                  </div>
                );
              })
            : "yok"}
          <div className="w-1/3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              className="block p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
              id="name"
              name="name"
              defaultValue={user ? user.name : ""}
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              className="block p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
              id="username"
              name="username"
              defaultValue={user ? user.username : ""}
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="block  p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
              id="email"
              name="email"
              defaultValue={user ? user.email : ""}
            />
          </div>
        </form>
      </div>
      <Entries />
    </div>
  );
}

export default Profile;
