import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvatar, reset } from "../features/avatar/avatarSlice";
import { update } from "../features/auth/authSlice";
import { IoCreateOutline } from "react-icons/io5";
import { MdDoneAll } from "react-icons/md";
import BackButton from "../components/BackButton";
import Entries from "./Entries";
import Title from "../components/Title";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { avatars, isSuccess } = useSelector((state) => state.avatars);

  if (user) {
    Title(user.username.toUpperCase());
  }
  const [userData, setUserData] = useState({
    name: "",
    username: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);

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

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    const userId = user._id;
    dispatch(update({ userData, userId }));
    // navigate("/login");
  };

  return (
    <>
      <BackButton />
      <div className="flex flex-col lg:flex-row lg:justify-around lg:space-x-2 mx-2">
        <div className="basis-1/4">
          <h1 className="text-2xl text-center mb-6">My details</h1>
          <div className="rounded-lg p-0.5 bg-gradient-to-b from-partialGreen to-lightestGreen hover:from-lightestGreen hover:to-partialGreen">
            <div className="p-2 rounded-[calc(0.5rem-1px)]">
              <button
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? (
                  <p className="flex items-center space-x-1 lg:px-8 py-2  text-center text-xl text-darkestGreen">
                    <MdDoneAll /> Done •
                  </p>
                ) : (
                  <div className="flex items-center space-x-1 lg:px-8 py-2 text-center text-xl text-darkestGreen">
                    <IoCreateOutline /> <p>Change Details • </p>
                  </div>
                )}
              </button>
              <form className="flex flex-col items-center justify-center mt-2">
                <Link to="/AvatarForm" className="zig-zag">
                  {avatars.map((avatar) => {
                    return (
                      user &&
                      user._id === avatar.user && (
                        <button
                          className="flex justify-center items-center  w-full h-full"
                          key={avatar._id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate("/AvatarForm");
                          }}
                        >
                          <img
                            src={require(`../components/uploads/${avatar.file}`)}
                            alt=""
                            key={avatar._id}
                            className="rounded-full  w-full h-full"
                          />
                        </button>
                      )
                    );
                  })}
                </Link>
                <div className="flex flex-col justify-center">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={user?.name}
                      onChange={onChange}
                      className={!changeDetails ? "profile" : "profileActive"}
                      disabled={!changeDetails}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className={!changeDetails ? "profile" : "profileActive"}
                      disabled={!changeDetails}
                      id="username"
                      name="username"
                      defaultValue={user?.username}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="profile"
                      id="email"
                      name="email"
                      defaultValue={user?.email}
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:basis-2/4">
          <h1 className="text-2xl text-center mb-6">My entries</h1>
          <Entries />
        </div>
      </div>
    </>
  );
}

export default Profile;
